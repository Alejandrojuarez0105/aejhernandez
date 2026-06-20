"use client";

import { useEffect, useState } from "react";
import TypingTerminal from "@/components/TypingTerminal";

export default function Hero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-24 font-mono"
    >
      <div
        className={`w-full max-w-5xl flex flex-col items-center gap-7 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
      >
        {/* Badge disponible */}
        <div className="flex items-center gap-2 bg-[#0d1525] border border-[#1e3a5f] rounded-full px-4 py-1.5 text-[#ff8800] text-xs tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#ff8800] animate-pulse" />
          Disponible para proyectos
        </div>

        {/* Nombre */}
        <h1 className="text-4xl md:text-5xl font-bold text-[#e2f0ff] text-center leading-tight">
          Alejandro Emmanuel
          <br />
          <span className="text-[#ff8800]">Juárez Hernández</span>
        </h1>

        <p className="text-[#ff8800] text-sm tracking-widest">
          // Full Stack Developer & Database Engineer
        </p>

        {/* Terminal (se escribe sola) */}
        <TypingTerminal />

        {/* Tagline */}
        <p className="text-[#94a3b8] text-sm text-center leading-relaxed max-w-md">
          Construyo soluciones completas: desde la base de datos hasta la
          interfaz.
          <br />
          Backend sólido, frontend limpio, datos bien modelados.
        </p>

        {/* Botones */}
        <div className="flex gap-5 flex-wrap justify-center mt-2">
          <a
            href="#contacto"
            className="bg-[#ff8800] text-[#020d18] font-bold px-10 py-4 rounded-xl text-sm tracking-wide flex items-center justify-center min-w-[180px] shadow-lg hover:scale-105 hover:shadow-[0_0_20px_#ff8800] transition-all duration-300"
          >
            Hablemos →
          </a>
          <a
            href="#proyectos"
            className="text-[#ff8800] border border-[#1e3a5f] px-10 py-4 rounded-xl text-sm tracking-wide flex items-center justify-center min-w-[180px] hover:border-[#ff8800] hover:scale-105 transition-all duration-300"
          >
            Ver proyectos ↓
          </a>
        </div>

        {/* Stats */}
        <div className="flex gap-8 flex-wrap justify-center pt-6 border-t border-[#1e3a5f] w-full">
          {[
            { num: "4+", lbl: "años programando" },
            { num: "6+", lbl: "motores de BD" },
            { num: "20+", lbl: "repos en GitHub" },
            { num: "10+", lbl: "tecnologías" },
          ].map(({ num, lbl }) => (
            <div key={lbl} className="text-center">
              <p className="text-xl font-bold text-[#ff8800]">{num}</p>
              <p className="text-[#94a3b8] text-xs mt-1 tracking-widest">
                {lbl}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
