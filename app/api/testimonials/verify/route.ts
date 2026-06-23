import { Resend } from "resend";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { notificationEmail } from "@/lib/testimonial-mail";

export const runtime = "nodejs";

const resendApiKey = process.env.RESEND_API_KEY;
const notifyEmail =
  process.env.TESTIMONIAL_NOTIFY_EMAIL ?? "aejhernandezdev@gmail.com";
const fromEmail = process.env.TESTIMONIAL_FROM_EMAIL ?? "onboarding@resend.dev";

const SITE = "https://aejhernandez.dev";

// Página de confirmación con el tema oscuro del portafolio (terminal).
function resultPage(lang: "es" | "en", ok: boolean): Response {
  const es = lang === "es";
  const t = ok
    ? {
        kicker: es ? "// testimonio confirmado" : "// testimonial confirmed",
        title: es ? "¡Gracias! 🎉" : "Thank you! 🎉",
        body: es
          ? "Tu testimonio quedó confirmado y pendiente de revisión. Aparecerá en el sitio una vez aprobado."
          : "Your testimonial is confirmed and pending review. It will appear on the site once approved.",
      }
    : {
        kicker: es ? "// enlace no válido" : "// invalid link",
        title: es ? "Enlace caducado o ya usado" : "Link expired or already used",
        body: es
          ? "Este enlace de confirmación no es válido o ya se utilizó. Si crees que es un error, vuelve a enviar tu testimonio."
          : "This confirmation link is invalid or has already been used. If you think this is a mistake, submit your testimonial again.",
      };
  const back = es ? "← Volver al sitio" : "← Back to the site";

  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex" />
<title>${t.title}</title>
<style>
  body { margin:0; min-height:100vh; display:flex; align-items:center; justify-content:center;
         background:#020d18; color:#e2f0ff; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; padding:24px; }
  .card { width:100%; max-width:460px; background:#0d1525; border:1px solid #1e3a5f; border-radius:16px; overflow:hidden; }
  .bar { display:flex; gap:8px; align-items:center; background:#060d18; border-bottom:1px solid #1e3a5f; padding:12px 16px; }
  .dot { width:10px; height:10px; border-radius:50%; }
  .body { padding:28px 24px; }
  .kicker { color:#ff8800; font-size:12px; letter-spacing:2px; margin:0 0 12px; }
  h1 { font-size:22px; margin:0 0 12px; color:#e2f0ff; }
  p { color:#c2cfe0; font-size:14px; line-height:1.6; margin:0 0 24px; }
  a { display:inline-block; color:#ff8800; text-decoration:none; font-size:13px; letter-spacing:1px;
      border:1px solid #1e3a5f; border-radius:10px; padding:10px 18px; }
  a:hover { border-color:#ff8800; }
</style>
</head>
<body>
  <div class="card">
    <div class="bar">
      <span class="dot" style="background:#ff5f57"></span>
      <span class="dot" style="background:#febc2e"></span>
      <span class="dot" style="background:#28c840"></span>
    </div>
    <div class="body">
      <p class="kicker">${t.kicker}</p>
      <h1>${t.title}</h1>
      <p>${t.body}</p>
      <a href="${SITE}/#testimonios">${back}</a>
    </div>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: ok ? 200 : 400,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token") ?? "";
  const lang = searchParams.get("lang") === "en" ? "en" : "es";

  if (!token || !supabaseAdmin) {
    return resultPage(lang, false);
  }

  // Buscar el testimonio por token (solo si aún no está verificado).
  const { data: row } = await supabaseAdmin
    .from("testimonials")
    .select("id, name, role, message, linkedin, github, website")
    .eq("verification_token", token)
    .maybeSingle();

  if (!row) {
    // Token inválido o ya usado (lo limpiamos tras verificar).
    return resultPage(lang, false);
  }

  // Marcar verificado y anular el token (un solo uso).
  const { error } = await supabaseAdmin
    .from("testimonials")
    .update({
      verified: true,
      verified_at: new Date().toISOString(),
      verification_token: null,
    })
    .eq("id", row.id);

  if (error) {
    console.error("Supabase verify update error:", error);
    return resultPage(lang, false);
  }

  // Ahora sí: avisar a Alejandro (testimonio real, confirmado por su dueño).
  if (resendApiKey) {
    try {
      const links = [
        row.linkedin ? `LinkedIn: ${row.linkedin}` : null,
        row.github ? `GitHub: ${row.github}` : null,
        row.website ? `Web: ${row.website}` : null,
      ].filter(Boolean) as string[];
      const { subject, html } = notificationEmail({
        name: row.name,
        role: row.role ?? "",
        message: row.message,
        links,
      });
      const resend = new Resend(resendApiKey);
      await resend.emails.send({
        from: `Portfolio <${fromEmail}>`,
        to: notifyEmail,
        subject,
        html,
      });
    } catch (e) {
      console.error("Resend notification email error:", e);
    }
  }

  return resultPage(lang, true);
}
