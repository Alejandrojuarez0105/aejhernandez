// Utilidades de email para testimonios. Solo se usan en el servidor
// (route handlers): construyen el HTML de los correos y limpian la entrada.

// Escapa texto del usuario antes de meterlo en el HTML del email.
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Asegura que un enlace tenga protocolo (por si alguien escribe "linkedin.com/...").
export function normalizeUrl(value: string): string {
  return /^https?:\/\//i.test(value) ? value : `https://${value}`;
}

// Correo de DOBLE OPT-IN que recibe el visitante para confirmar su testimonio.
export function verificationEmail({
  name,
  verifyUrl,
  lang,
}: {
  name: string;
  verifyUrl: string;
  lang: "es" | "en";
}): { subject: string; html: string } {
  const es = lang === "es";
  const subject = es ? "Confirma tu testimonio" : "Confirm your testimonial";
  const safeName = escapeHtml(name);

  const t = es
    ? {
        hi: `Hola ${safeName},`,
        body: "Recibimos tu testimonio para el portafolio de Alejandro Juárez. Para publicarlo, primero confirma que esta dirección de correo es tuya:",
        cta: "Confirmar testimonio",
        note: "Tras confirmar, el testimonio quedará pendiente de revisión antes de mostrarse.",
        ignore:
          "Si tú no enviaste ningún testimonio, ignora este correo: no se publicará nada.",
      }
    : {
        hi: `Hi ${safeName},`,
        body: "We received your testimonial for Alejandro Juárez's portfolio. To publish it, please confirm this email address belongs to you:",
        cta: "Confirm testimonial",
        note: "Once confirmed, the testimonial will await review before being shown.",
        ignore:
          "If you didn't submit any testimonial, just ignore this email: nothing will be published.",
      };

  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; background:#020d18; color:#e2f0ff; padding:24px; border-radius:12px; max-width:560px;">
      <p style="color:#ff8800; font-size:12px; letter-spacing:2px; margin:0 0 16px;">// CONFIRMA TU TESTIMONIO</p>
      <p style="margin:0 0 12px; font-size:15px;">${t.hi}</p>
      <p style="color:#c2cfe0; margin:0 0 20px; font-size:14px; line-height:1.6;">${t.body}</p>
      <p style="margin:0 0 20px;">
        <a href="${verifyUrl}" style="display:inline-block; background:#ff8800; color:#020d18; font-weight:bold; text-decoration:none; padding:12px 24px; border-radius:10px; font-size:14px;">${t.cta}</a>
      </p>
      <p style="color:#94a3b8; font-size:12px; line-height:1.6; margin:0 0 8px;">${t.note}</p>
      <p style="color:#94a3b8; font-size:12px; line-height:1.6; margin:0;">${t.ignore}</p>
    </div>
  `;

  return { subject, html };
}

// Correo de AVISO que recibe Alejandro cuando un testimonio queda VERIFICADO.
export function notificationEmail({
  name,
  role,
  message,
  links,
}: {
  name: string;
  role: string;
  message: string;
  links: string[];
}): { subject: string; html: string } {
  const subject = `Nuevo testimonio verificado de ${name}`;
  const html = `
    <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; background:#020d18; color:#e2f0ff; padding:24px; border-radius:12px; max-width:560px;">
      <p style="color:#ff8800; font-size:12px; letter-spacing:2px; margin:0 0 12px;">// TESTIMONIO VERIFICADO · PENDIENTE DE APROBACIÓN</p>
      <h2 style="margin:0 0 4px; font-size:20px;">${escapeHtml(name)}</h2>
      <p style="color:#94a3b8; margin:0 0 16px; font-size:14px;">${escapeHtml(role)}</p>
      <blockquote style="border-left:3px solid #ff8800; margin:0 0 16px; padding:4px 0 4px 16px; color:#e2f0ff; font-size:15px; line-height:1.6;">
        ${escapeHtml(message)}
      </blockquote>
      ${
        links.length
          ? `<p style="color:#7dd3fc; font-size:13px; margin:0 0 16px;">${links
              .map((l) => escapeHtml(l))
              .join("<br>")}</p>`
          : ""
      }
      <p style="color:#94a3b8; font-size:13px; margin:0;">
        Para publicarlo, entra al Table Editor de Supabase y cambia
        <strong style="color:#e2f0ff;">approved</strong> a <strong style="color:#e2f0ff;">true</strong>.
      </p>
    </div>
  `;
  return { subject, html };
}
