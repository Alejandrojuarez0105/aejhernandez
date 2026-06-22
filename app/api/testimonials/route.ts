import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// El SDK de Resend necesita el runtime de Node (no Edge).
export const runtime = "nodejs";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Variables del email (las defino en .env.local y en Vercel).
const resendApiKey = process.env.RESEND_API_KEY;
const notifyEmail =
  process.env.TESTIMONIAL_NOTIFY_EMAIL ?? "aejhernandezdev@gmail.com";
const fromEmail = process.env.TESTIMONIAL_FROM_EMAIL ?? "onboarding@resend.dev";

// Rate limiting con Upstash. Si faltan las variables, queda desactivado
// (p. ej. en local sin claves) y el endpoint sigue funcionando.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;
const ratelimit =
  redisUrl && redisToken
    ? new Ratelimit({
        redis: new Redis({ url: redisUrl, token: redisToken }),
        // Máximo 3 envíos por IP cada 10 minutos (ventana deslizante).
        limiter: Ratelimit.slidingWindow(3, "10 m"),
        prefix: "ratelimit:testimonials",
      })
    : null;

// Límites de longitud para evitar payloads abusivos.
const MAX = { name: 100, role: 100, message: 1000, url: 300 };

// Asegura que un enlace tenga protocolo (por si alguien escribe "linkedin.com/...").
function normalizeUrl(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

// Escapa texto del usuario antes de meterlo en el HTML del email.
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  // 1) Rate limit por IP, lo antes posible para soltar tráfico abusivo.
  if (ratelimit) {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const { success } = await ratelimit.limit(ip);
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
  const linkedin = typeof body.linkedin === "string" ? body.linkedin.trim() : "";
  const github = typeof body.github === "string" ? body.github.trim() : "";
  const website = typeof body.website === "string" ? body.website.trim() : "";
  const honeypot = typeof body.honeypot === "string" ? body.honeypot : "";

  // Anti-bots: si el honeypot viene relleno, fingimos éxito sin guardar nada.
  if (honeypot) {
    return NextResponse.json({ ok: true });
  }

  if (!name || !role || !message) {
    return NextResponse.json({ error: "missing-fields" }, { status: 400 });
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

  if (!supabaseUrl || !supabaseAnonKey) {
    return NextResponse.json({ error: "server-misconfigured" }, { status: 500 });
  }

  const cleanLinkedin = linkedin ? normalizeUrl(linkedin) : null;
  const cleanGithub = github ? normalizeUrl(github) : null;
  const cleanWebsite = website ? normalizeUrl(website) : null;

  // 2) Guardar el testimonio en Supabase (queda con approved=false por RLS).
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  const { error } = await supabase.from("testimonials").insert({
    name,
    role,
    message,
    linkedin: cleanLinkedin,
    github: cleanGithub,
    website: cleanWebsite,
  });

  if (error) {
    console.error("Supabase insert error:", error);
    return NextResponse.json({ error: "insert-failed" }, { status: 500 });
  }

  // 3) Avisar por email. Si falla, NO rompemos el éxito: el testimonio ya se
  //    guardó; el email es solo una notificación para moderarlo.
  if (resendApiKey) {
    try {
      const resend = new Resend(resendApiKey);
      const links = [
        cleanLinkedin ? `LinkedIn: ${cleanLinkedin}` : null,
        cleanGithub ? `GitHub: ${cleanGithub}` : null,
        cleanWebsite ? `Web: ${cleanWebsite}` : null,
      ].filter(Boolean);

      await resend.emails.send({
        from: `Portfolio <${fromEmail}>`,
        to: notifyEmail,
        subject: `Nuevo testimonio de ${name}`,
        html: `
          <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; background:#020d18; color:#e2f0ff; padding:24px; border-radius:12px; max-width:560px;">
            <p style="color:#ff8800; font-size:12px; letter-spacing:2px; margin:0 0 12px;">// NUEVO TESTIMONIO PENDIENTE DE REVISIÓN</p>
            <h2 style="margin:0 0 4px; font-size:20px;">${escapeHtml(name)}</h2>
            <p style="color:#94a3b8; margin:0 0 16px; font-size:14px;">${escapeHtml(role)}</p>
            <blockquote style="border-left:3px solid #ff8800; margin:0 0 16px; padding:4px 0 4px 16px; color:#e2f0ff; font-size:15px; line-height:1.6;">
              ${escapeHtml(message)}
            </blockquote>
            ${
              links.length
                ? `<p style="color:#7dd3fc; font-size:13px; margin:0 0 16px;">${links
                    .map((l) => escapeHtml(l as string))
                    .join("<br>")}</p>`
                : ""
            }
            <p style="color:#94a3b8; font-size:13px; margin:0;">
              Para publicarlo, entra al Table Editor de Supabase y cambia
              <strong style="color:#e2f0ff;">approved</strong> a <strong style="color:#e2f0ff;">true</strong>.
            </p>
          </div>
        `,
      });
    } catch (e) {
      console.error("Resend email error:", e);
    }
  }

  return NextResponse.json({ ok: true });
}
