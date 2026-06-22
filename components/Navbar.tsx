"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

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
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#020d18]/80 backdrop-blur-md border-b border-[#1e3a5f]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4 font-mono">
        <a
          href="#inicio"
          className="text-[#ff8800] text-sm tracking-widest hover:opacity-80 transition-opacity"
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
                  ? "text-[#ff8800]"
                  : "text-[#94a3b8] hover:text-[#ff8800]"
              }`}
            >
              {label}
            </a>
          ))}

          {/* Toggle de idioma */}
          <button
            onClick={toggle}
            aria-label={t.nav.toggleLabel}
            className="flex items-center gap-1 text-xs tracking-widest font-mono text-[#94a3b8] border border-[#1e3a5f] rounded-lg px-2.5 py-1 hover:border-[#ff8800] hover:text-[#ff8800] transition-colors"
          >
            <span className={lang === "es" ? "text-[#ff8800]" : ""}>ES</span>
            <span className="text-[#1e3a5f]">/</span>
            <span className={lang === "en" ? "text-[#ff8800]" : ""}>EN</span>
          </button>

          {/* Botón descargar CV */}
          <a
            href={cvHref}
            download
            aria-label={t.nav.cv}
            className="flex items-center gap-1.5 text-xs tracking-widest font-mono bg-[#ff8800] text-[#020d18] font-bold rounded-lg px-3 py-1.5 hover:bg-[#ffaa33] transition-colors"
          >
            CV ↓
          </a>
        </div>

        {/* Controles móvil */}
        <div className="md:hidden flex items-center gap-3">
          {/* Toggle de idioma */}
          <button
            onClick={toggle}
            aria-label={t.nav.toggleLabel}
            className="flex items-center gap-1 text-xs tracking-widest font-mono text-[#94a3b8] border border-[#1e3a5f] rounded-lg px-2.5 py-1 hover:border-[#ff8800] hover:text-[#ff8800] transition-colors"
          >
            <span className={lang === "es" ? "text-[#ff8800]" : ""}>ES</span>
            <span className="text-[#1e3a5f]">/</span>
            <span className={lang === "en" ? "text-[#ff8800]" : ""}>EN</span>
          </button>

          {/* Botón descargar CV (siempre visible en móvil) */}
          <a
            href={cvHref}
            download
            aria-label={t.nav.cv}
            className="flex items-center gap-1 text-xs tracking-widest font-mono bg-[#ff8800] text-[#020d18] font-bold rounded-lg px-2.5 py-1 hover:bg-[#ffaa33] transition-colors"
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
            className={`block h-px w-6 bg-[#ff8800] transition-transform duration-300 ${
              open ? "translate-y-[7px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-[#ff8800] transition-opacity duration-300 ${
              open ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-[#ff8800] transition-transform duration-300 ${
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
        <div className="flex flex-col px-6 pb-4 font-mono bg-[#020d18]/95 backdrop-blur-md border-b border-[#1e3a5f]">
          {sections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`py-2.5 text-xs tracking-widest transition-colors ${
                active === id
                  ? "text-[#ff8800]"
                  : "text-[#94a3b8] hover:text-[#ff8800]"
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
