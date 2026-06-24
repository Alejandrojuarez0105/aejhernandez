"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { useTheme } from "@/lib/theme-context";

// Toggle claro/oscuro. Antes de montar muestra la luna (coincide con el
// default oscuro del SSR → sin desajuste de hidratación); ya en cliente
// refleja el tema real (sol = claro activo, luna = oscuro activo).
function ThemeToggle({ label }: { label: string }) {
  const { theme, toggle, mounted } = useTheme();
  const isLight = mounted && theme === "light";
  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={label}
      className="flex items-center justify-center w-[34px] h-[30px] text-[var(--text-muted)] border border-[var(--border)] rounded-lg hover:border-[var(--accent)] hover:text-[var(--accent-text)] transition-colors"
    >
      {isLight ? (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4" />
        </svg>
      ) : (
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
        </svg>
      )}
    </button>
  );
}

export default function Navbar() {
  const { lang, toggle, t } = useLanguage();
  const [active, setActive] = useState("inicio");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  const sections = [
    { id: "inicio", label: t.nav.inicio },
    { id: "sobre-mí", label: t.nav.sobreMi },
    { id: "stack", label: t.nav.stack },
    { id: "proyectos", label: t.nav.proyectos },
    { id: "testimonios", label: t.nav.testimonios },
    { id: "contacto", label: t.nav.contacto },
  ];

  // CV según el idioma activo
  const cvHref =
    lang === "es"
      ? "/cv/CV_Alejandro_Emmanuel_Juarez_Hernandez.pdf"
      : "/cv/CV_English_Alejandro_Emmanuel_Juarez_Hernandez.pdf";

  // Fondo del navbar al hacer scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Scroll-spy: resalta la sección visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 print:hidden ${
        scrolled
          ? "bg-[var(--bg-base)]/80 backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4 font-mono">
        <a
          href="#inicio"
          className="text-[var(--accent-text)] text-sm tracking-widest hover:opacity-80 transition-opacity"
        >
          aejhernandez.dev
        </a>

        {/* Links escritorio */}
        <div className="hidden md:flex items-center gap-6">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              className={`text-xs tracking-widest transition-colors ${
                active === id
                  ? "text-[var(--accent-text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--accent-text)]"
              }`}
            >
              {label}
            </a>
          ))}

          {/* Toggle claro/oscuro */}
          <ThemeToggle label={t.nav.themeLabel} />

          {/* Toggle de idioma */}
          <button
            onClick={toggle}
            aria-label={t.nav.toggleLabel}
            className="flex items-center gap-1 text-xs tracking-widest font-mono text-[var(--text-muted)] border border-[var(--border)] rounded-lg px-2.5 py-1 hover:border-[var(--accent)] hover:text-[var(--accent-text)] transition-colors"
          >
            <span className={lang === "es" ? "text-[var(--accent-text)]" : ""}>ES</span>
            <span className="text-[var(--border)]">/</span>
            <span className={lang === "en" ? "text-[var(--accent-text)]" : ""}>EN</span>
          </button>

          {/* Botón descargar CV */}
          <a
            href={cvHref}
            download
            aria-label={t.nav.cv}
            className="flex items-center gap-1.5 text-xs tracking-widest font-mono bg-[var(--accent)] text-[var(--on-accent)] font-bold rounded-lg px-3 py-1.5 hover:bg-[#ffaa33] transition-colors"
          >
            CV ↓
          </a>
        </div>

        {/* Controles móvil */}
        <div className="md:hidden flex items-center gap-3">
          {/* Toggle claro/oscuro */}
          <ThemeToggle label={t.nav.themeLabel} />

          {/* Toggle de idioma */}
          <button
            onClick={toggle}
            aria-label={t.nav.toggleLabel}
            className="flex items-center gap-1 text-xs tracking-widest font-mono text-[var(--text-muted)] border border-[var(--border)] rounded-lg px-2.5 py-1 hover:border-[var(--accent)] hover:text-[var(--accent-text)] transition-colors"
          >
            <span className={lang === "es" ? "text-[var(--accent-text)]" : ""}>ES</span>
            <span className="text-[var(--border)]">/</span>
            <span className={lang === "en" ? "text-[var(--accent-text)]" : ""}>EN</span>
          </button>

          {/* Botón descargar CV (siempre visible en móvil) */}
          <a
            href={cvHref}
            download
            aria-label={t.nav.cv}
            className="flex items-center gap-1 text-xs tracking-widest font-mono bg-[var(--accent)] text-[var(--on-accent)] font-bold rounded-lg px-2.5 py-1 hover:bg-[#ffaa33] transition-colors"
          >
            CV ↓
          </a>

          {/* Botón menú */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-1.5 p-1"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
          >
          <span
            className={`block h-px w-6 bg-[var(--accent)] transition-transform duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-[var(--accent)] transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-[var(--accent)] transition-transform duration-300 ${
              open ? "-translate-y-[7px] -rotate-45" : ""
            }`}
          />
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-300 ${
          open ? "max-h-72" : "max-h-0"
        }`}
      >
        <div className="flex flex-col px-6 pb-4 font-mono bg-[var(--bg-base)]/95 backdrop-blur-md border-b border-[var(--border)]">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`py-2.5 text-xs tracking-widest transition-colors ${
                active === id
                  ? "text-[var(--accent-text)]"
                  : "text-[var(--text-muted)] hover:text-[var(--accent-text)]"
              }`}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
