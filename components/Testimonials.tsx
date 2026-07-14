"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLanguage } from "@/lib/language-context";
import { supabase, type Testimonial } from "@/lib/supabase";

// Cuántos testimonios se muestran antes de pulsar "Ver más".
const INITIAL_COUNT = 6;

export default function Testimonials() {
  const { t, lang } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(false); // "Ver más" / "Ver menos"
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false); // para el portal (solo cliente)

  // Estado del formulario
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [honeypot, setHoneypot] = useState(""); // anti-bots (oculto)
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState("");

  // Fade-in al entrar en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Carga los testimonios aprobados
  useEffect(() => {
    let active = true;
    (async () => {
      if (!supabase) {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("testimonials")
        .select(
          "name, role, message, linkedin, github, website, featured, created_at",
        )
        .eq("approved", true)
        .order("featured", { ascending: false }) // destacados primero
        .order("created_at", { ascending: false });
      if (active) {
        setItems((data as Testimonial[]) ?? []);
        setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Cierra el modal con Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // El portal solo puede montarse en el cliente (necesita document)
  useEffect(() => {
    setMounted(true);
  }, []);

  const resetForm = () => {
    setName("");
    setRole("");
    setEmail("");
    setMessage("");
    setLinkedin("");
    setGithub("");
    setWebsite("");
    setHoneypot("");
    setStatus("idle");
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Si el honeypot está lleno, es un bot: fingimos éxito sin guardar
    if (honeypot) {
      setStatus("success");
      return;
    }

    if (!name.trim() || !role.trim() || !email.trim() || !message.trim()) {
      setStatus("error");
      setErrorMsg(t.testimonials.form.required);
      return;
    }

    // Validación básica de email en el cliente (la real es el doble opt-in).
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setStatus("error");
      setErrorMsg(t.testimonials.form.invalidEmail);
      return;
    }

    setStatus("sending");
    setErrorMsg("");

    try {
      // Enviamos al servidor: inserta en Supabase y manda el correo de
      // verificación al visitante (doble opt-in).
      const res = await fetch("/api/testimonials", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          email: email.trim(),
          message: message.trim(),
          linkedin: linkedin.trim(),
          github: github.trim(),
          website: website.trim(),
          honeypot,
          lang,
        }),
      });

      if (res.status === 429) {
        setStatus("error");
        setErrorMsg(t.testimonials.form.rateLimited);
        return;
      }
      if (res.status === 400) {
        const data = await res.json().catch(() => null);
        setStatus("error");
        setErrorMsg(
          data?.error === "invalid-email"
            ? t.testimonials.form.invalidEmail
            : t.testimonials.form.required,
        );
        return;
      }
      if (!res.ok) {
        throw new Error("request-failed");
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg(t.testimonials.form.error);
    }
  };

  const closeModal = () => {
    setOpen(false);
    // Reinicia el formulario un momento después (para no ver el cambio al cerrar)
    setTimeout(resetForm, 300);
  };

  // Solo mostramos los primeros INITIAL_COUNT hasta que se pulse "Ver más".
  // Como la query ya ordena los destacados primero, esos entran por defecto.
  const visibleItems = expanded ? items : items.slice(0, INITIAL_COUNT);

  return (
    <section
      id="testimonios"
      ref={ref}
      className={`px-6 py-24 flex flex-col items-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="w-full max-w-6xl flex flex-col gap-10">
        {/* Encabezado */}
        <div className="flex flex-col gap-2">
          <span className="text-[var(--accent-text)] text-xs tracking-widest font-mono">
            {t.testimonials.kicker}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
            {t.testimonials.title}
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-lg mt-1">
            {t.testimonials.subtitle}
          </p>
        </div>

        {/* Lista de testimonios */}
        {!loading && items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {visibleItems.map((item, i) => (
              <div
                key={i}
                className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-4"
              >
                <p className="text-[var(--accent-text)] text-2xl leading-none font-mono">
                  &ldquo;
                </p>
                <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1">
                  {item.message}
                </p>
                <div className="flex items-end justify-between gap-3 pt-2 border-t border-[var(--border)]">
                  <div className="flex flex-col">
                    <span className="text-[var(--text)] text-sm font-bold">
                      {item.name}
                    </span>
                    {item.role && (
                      <span className="text-[var(--text-muted)] text-xs">
                        {item.role}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-3 shrink-0">
                    {item.linkedin && (
                      <a
                        href={item.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors text-[10px] font-mono"
                      >
                        LinkedIn ↗
                      </a>
                    )}
                    {item.github && (
                      <a
                        href={item.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors text-[10px] font-mono"
                      >
                        GitHub ↗
                      </a>
                    )}
                    {item.website && (
                      <a
                        href={item.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors text-[10px] font-mono"
                      >
                        Web ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Ver más / Ver menos */}
        {!loading && items.length > INITIAL_COUNT && (
          <div className="flex justify-center -mt-2 print:hidden">
            <button
              onClick={() => setExpanded((v) => !v)}
              className="text-[var(--text-muted)] text-xs font-mono tracking-widest border border-[var(--border)] rounded-lg px-5 py-2.5 hover:border-[var(--accent)] hover:text-[var(--accent-text)] transition-colors"
            >
              {expanded ? t.testimonials.showLess : t.testimonials.showMore}
            </button>
          </div>
        )}

        {/* Estado vacío */}
        {!loading && items.length === 0 && (
          <p className="text-[var(--text-muted)] text-sm font-mono text-center py-6">
            {t.testimonials.empty}
          </p>
        )}

        {/* Botón para dejar testimonio */}
        <div className="flex justify-center print:hidden">
          <button
            onClick={() => setOpen(true)}
            className="bg-[var(--accent)] text-[var(--on-accent)] font-bold px-8 py-3.5 rounded-xl text-sm tracking-wide flex items-center gap-2 shadow-lg hover:scale-105 hover:shadow-[0_0_20px_#ff8800] transition-all duration-300"
          >
            {t.testimonials.leaveButton} →
          </button>
        </div>
      </div>

      {/* Modal con el formulario (portal al <body> para escapar del transform de la sección) */}
      {mounted &&
        open &&
        createPortal(
          <div
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={closeModal}
            role="dialog"
            aria-modal="true"
          aria-label={t.testimonials.form.title}
        >
          <div
            className="w-full max-w-md bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-4 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {status === "success" ? (
              <div className="flex flex-col items-center gap-4 py-6 text-center">
                <span className="text-4xl">✓</span>
                <p className="text-[var(--text)] text-sm leading-relaxed">
                  {t.testimonials.form.success}
                </p>
                <p className="text-[var(--text-muted)] text-xs leading-relaxed -mt-2">
                  {t.testimonials.form.successSpamNote}
                </p>
                <button
                  onClick={closeModal}
                  className="text-[var(--accent-text)] text-xs font-mono tracking-widest hover:underline mt-2"
                >
                  {t.testimonials.form.cancel}
                </button>
              </div>
            ) : (
              <>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[var(--text)] font-bold text-lg">
                    {t.testimonials.form.title}
                  </h3>
                  <p className="text-[var(--text-muted)] text-xs leading-relaxed">
                    {t.testimonials.form.intro}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Honeypot anti-bots (oculto) */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="hidden"
                  />

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[var(--accent-text)] text-xs font-mono tracking-widest">
                      {t.testimonials.form.name}
                    </span>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={t.testimonials.form.namePlaceholder}
                      required
                      maxLength={100}
                      className="bg-[var(--bg-base)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[var(--accent-text)] text-xs font-mono tracking-widest">
                      {t.testimonials.form.role}
                    </span>
                    <input
                      type="text"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder={t.testimonials.form.rolePlaceholder}
                      required
                      maxLength={100}
                      className="bg-[var(--bg-base)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[var(--accent-text)] text-xs font-mono tracking-widest">
                      {t.testimonials.form.email}
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.testimonials.form.emailPlaceholder}
                      required
                      maxLength={200}
                      className="bg-[var(--bg-base)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                    <span className="text-[var(--text-muted)] text-[11px] leading-snug">
                      {t.testimonials.form.emailNote}
                    </span>
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[var(--accent-text)] text-xs font-mono tracking-widest">
                      {t.testimonials.form.message}
                    </span>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={t.testimonials.form.messagePlaceholder}
                      required
                      maxLength={1000}
                      rows={4}
                      className="bg-[var(--bg-base)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none transition-colors resize-none"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[var(--text-muted)] text-xs font-mono tracking-widest">
                      {t.testimonials.form.linkedin}
                    </span>
                    <input
                      type="text"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                      placeholder={t.testimonials.form.linkedinPlaceholder}
                      maxLength={300}
                      className="bg-[var(--bg-base)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[var(--text-muted)] text-xs font-mono tracking-widest">
                      {t.testimonials.form.github}
                    </span>
                    <input
                      type="text"
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      placeholder={t.testimonials.form.githubPlaceholder}
                      maxLength={300}
                      className="bg-[var(--bg-base)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                  </label>

                  <label className="flex flex-col gap-1.5">
                    <span className="text-[var(--text-muted)] text-xs font-mono tracking-widest">
                      {t.testimonials.form.website}
                    </span>
                    <input
                      type="text"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      placeholder={t.testimonials.form.websitePlaceholder}
                      maxLength={300}
                      className="bg-[var(--bg-base)] border border-[var(--border)] rounded-lg px-3 py-2 text-[var(--text)] text-sm focus:border-[var(--accent)] focus:outline-none transition-colors"
                    />
                  </label>

                  {status === "error" && (
                    <p className="text-[#ff5f57] text-xs">{errorMsg}</p>
                  )}

                  <div className="flex gap-3 justify-end pt-1">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="text-[var(--text-muted)] text-xs font-mono tracking-widest border border-[var(--border)] rounded-lg px-4 py-2.5 hover:border-[var(--accent)] hover:text-[var(--accent-text)] transition-colors"
                    >
                      {t.testimonials.form.cancel}
                    </button>
                    <button
                      type="submit"
                      disabled={status === "sending"}
                      className="bg-[var(--accent)] text-[var(--on-accent)] font-bold text-xs font-mono tracking-widest rounded-lg px-5 py-2.5 hover:bg-[#ffaa33] transition-colors disabled:opacity-60"
                    >
                      {status === "sending"
                        ? t.testimonials.form.sending
                        : t.testimonials.form.submit}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>,
          document.body,
        )}
    </section>
  );
}
