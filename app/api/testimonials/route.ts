import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { normalizeUrl, verificationEmail } from "@/lib/testimonial-mail";

// El SDK de Resend necesita el runtime de Node (no Edge).
export const runtime = "nodejs";

// Variables del email (las defino en .env.local y en Vercel).
const resendApiKey = process.env.RESEND_API_KEY;
const fromEmail = process.env.TESTIMONIAL_FROM_EMAIL ?? "onboarding@resend.dev";

// Rate limiting con Upstash. Si faltan las variables, queda desactivado
// (p. ej. en local sin claves) y el endpoint sigue funcionando.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis =
  redisUrl && redisToken ? new Redis({ url: redisUrl, token: redisToken }) : null;

// 1) Límite por IP: máximo 3 envíos cada 10 minutos.
const ipRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(3, "10 m"),
      prefix: "ratelimit:testimonials",
    })
  : null;

// 2) Tope GLOBAL anti-abuso: como un atacante puede rotar IPs (VPN) y saltarse
//    el límite por IP, capamos el total de correos de verificación a 30 por hora
//    en todo el sitio. Así protegemos la cuota de Resend de un flood masivo.
const globalRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(30, "1 h"),
      prefix: "ratelimit:testimonials:global",
    })
  : null;

// Límites de longitud para evitar payloads abusivos.
const MAX = { name: 100, role: 100, message: 1000, url: 300, email: 200 };

// Validación sencilla de email (formato básico; la confirmación real es el
// doble opt-in por correo).
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  // 1) Rate limit por IP, lo antes posible para soltar tráfico abusivo.
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";
  if (ipRatelimit) {
    const { success } = await ipRatelimit.limit(ip);
    if (!success) {
      return NextResponse.json({ error: "rate-limited" }, { status: 429 });
    }
  }
  // 2) Tope global (protege Resend frente a floods con IPs rotadas).
  if (globalRatelimit) {
    const { success } = await globalRatelimit.limit("global");
    if (!success) {
      return NextResponse.json({ error: "rate-limited" }, { status: 429 });
    }
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid-json" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const role = typeof body.role === "string" ? body.role.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const linkedin = typeof body.linkedin === "string" ? body.linkedin.trim() : "";
  const github = typeof body.github === "string" ? body.github.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";
  const honeypot = typeof body.honeypot === "string" ? body.honeypot : "";
  const lang = body.lang === "en" ? "en" : "es";

  // Anti-bots: si el honeypot viene relleno, fingimos éxito sin guardar nada.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !role || !message || !email) {
    return NextResponse.json({ error: "missing-fields" }, { status: 400 });
  }

  if (!EMAIL_RE.test(email) || email.length > MAX.email) {
    return NextResponse.json({ error: "invalid-email" }, { status: 400 });
  }

  // Validación de longitud: corta payloads abusivos.
  if (
    name.length > MAX.name ||
    role.length > MAX.role ||
    message.length > MAX.message ||
    linkedin.length > MAX.url ||
    github.length > MAX.url ||
    website.length > MAX.url
  ) {
    return NextResponse.json({ error: "too-long" }, { status: 400 });
  }

  if (!supabaseAdmin) {
    return NextResponse.json({ error: "server-misconfigured" }, { status: 500 });
  }

  const cleanLinkedin = linkedin ? normalizeUrl(linkedin) : null;
  const cleanGithub = github ? normalizeUrl(github) : null;
  const cleanWebsite = website ? normalizeUrl(website) : null;

  // 3) Guardar el testimonio SIN verificar, con un token de confirmación.
  //    Usamos el cliente admin (service role) para fijar el token de forma
  //    segura; el testimonio queda verified=false y approved=false.
  const token = randomUUID();
  const { error } = await supabaseAdmin.from("testimonials").insert({
    name,
    role,
    message,
    email,
    linkedin: cleanLinkedin,
    github: cleanGithub,
    website: cleanWebsite,
    verification_token: token,
    verified: false,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "insert-failed" }, { status: 500 });
  }

  // 4) Enviar al VISITANTE el correo de doble opt-in. El aviso a Alejandro NO
  //    se manda aquí: se manda en /verify, una vez confirmado (así un bot que
  //    mete correos ajenos nunca llega a la bandeja del dueño).
  if (resendApiKey) {
    try {
      const base = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;
      const verifyUrl = `${base}/api/testimonials/verify?token=${token}&lang=${lang}`;
      const { subject, html } = verificationEmail({ name, verifyUrl, lang });
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: `Portfolio <${fromEmail}>`,
        to: email,
        subject,
        html,
      });
    } catch (e) {
      // Si el email falla, el testimonio igual quedó guardado sin verificar.
      console.error("Resend verification email error:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
