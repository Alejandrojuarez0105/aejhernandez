"use client";

import { useEffect, useState } from "react";
import TypingTerminal from "@/components/TypingTerminal";
import { useLanguage } from "@/lib/language-context";

export default function Hero() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-start md:justify-center px-6 pt-24 pb-20 md:pt-28 md:pb-24 font-mono"
    >
      <div
        className={`w-full max-w-5xl flex flex-col items-center gap-6 md:gap-7 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Badge disponible */}
        <div className="flex items-center gap-2 bg-[#0d1525] border border-[#1e3a5f] rounded-full px-4 py-1.5 text-[#ff8800] text-xs tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#ff8800] animate-pulse" />
          {t.hero.available}
        </div>

        {/* Nombre */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#e2f0ff] text-center leading-tight">
          Alejandro Emmanuel
          <br />
          <span className="text-[#ff8800]">Juárez Hernández</span>
        </h1>

        <p className="text-[#ff8800] text-sm tracking-widest">
          {t.hero.role}
        </p>

        {/* Terminal (se escribe sola) */}
        <TypingTerminal />

        {/* Tagline */}
        <p className="text-[var(--text-muted)] text-sm text-center leading-relaxed max-w-2xl">
          {t.hero.tagline1}
          <br />
          {t.hero.tagline2}
          <br />
          {t.hero.tagline3}
        </p>

        {/* Botones */}
        <div className="flex gap-5 flex-wrap justify-center mt-2">
          <a
            href="#contacto"
            className="bg-[#ff8800] text-[#020d18] font-bold px-10 py-4 rounded-xl text-sm tracking-wide flex items-center justify-center min-w-[180px] shadow-lg hover:scale-105 hover:shadow-[0_0_20px_#ff8800] transition-all duration-300"
          >
            {t.hero.ctaContact}
          </a>
          <a
            href="#proyectos"
            className="text-[#ff8800] border border-[#1e3a5f] px-10 py-4 rounded-xl text-sm tracking-wide flex items-center justify-center min-w-[180px] hover:border-[#ff8800] hover:scale-105 transition-all duration-300"
          >
            {t.hero.ctaProjects}
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-8 flex-wrap justify-center pt-6 border-t border-[#1e3a5f] w-full">
          {t.hero.stats.map(({ num, lbl }) => (
            <div key={lbl} className="text-center">
              <p className="text-xl font-bold text-[#ff8800]">{num}</p>
              <p className="text-[var(--text-muted)] text-xs mt-1 tracking-widest">
                {lbl}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
