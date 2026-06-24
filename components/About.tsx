"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";

export default function About() {
  const { t } = useLanguage();
  const timeline = t.about.timeline;
  const stats = t.about.stats;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="sobre-mí"
      ref={ref}
      className={`px-6 py-24 flex flex-col items-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="w-full max-w-5xl flex flex-col gap-12">
        {/* Intro + foto (al lado en escritorio, debajo en iPad/móvil) */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
          {/* Encabezado */}
          <div className="flex flex-col gap-2">
          <span className="text-[var(--accent-text)] text-xs tracking-widest font-mono">
            {t.about.kicker}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
            {t.about.title}
          </h2>

          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-lg mt-2">
            {t.about.p1}
          </p>

          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-lg">
            {t.about.p2}
          </p>

          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-lg">
            {t.about.p3}
          </p>

          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-lg">
            {t.about.p4}
          </p>
          </div>

          {/* Foto de perfil */}
          <div className="shrink-0 mx-auto lg:mx-0">
            <img
              src="https://github.com/Alejandrojuarez0105.png"
              alt="Alejandro Emmanuel Juárez Hernández"
              width={320}
              height={320}
              className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full object-cover border-2 border-[var(--border)]"
            />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ num, lbl }) => (
            <div
              key={lbl}
              className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-[var(--accent-text)] font-mono">
                {num}
              </p>
              <p className="text-[var(--text-muted)] text-xs mt-1 tracking-widest">
                {lbl}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-2">
          <span className="text-[var(--accent-text)] text-xs tracking-widest font-mono mb-2">
            {t.about.timelineKicker}
          </span>
          <div className="relative flex flex-col gap-0">
            {/* Línea de la trayectoria: a la izquierda en móvil, centrada en lg */}
            <span
              aria-hidden
              className="absolute top-1 bottom-2 left-1.5 lg:left-1/2 w-px -translate-x-1/2 bg-[var(--border)]"
            />
            {timeline.map((item, i) => {
              // En pantalla grande, los años pares van a la izquierda y los
              // impares a la derecha (efecto zig-zag a ambos lados de la línea).
              const left = i % 2 === 0;
              return (
                <div
                  key={item.year}
                  className="relative group pb-8 last:pb-0 pl-8 lg:pl-0 lg:grid lg:grid-cols-2 lg:gap-x-12"
                >
                  {/* Punto sobre la línea */}
                  <span
                    aria-hidden
                    className="absolute top-1 left-1.5 lg:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[var(--accent)] bg-[var(--bg-base)] group-hover:bg-[var(--accent)] transition-colors z-10"
                  />
                  {/* Contenido (alterna de lado en lg) */}
                  <div
                    className={
                      left
                        ? "lg:col-start-1 lg:text-right"
                        : "lg:col-start-2"
                    }
                  >
                    <span className="text-[var(--accent-text)] text-xs font-mono tracking-widest">
                      {item.year}
                    </span>
                    <p className="text-[var(--text)] text-sm font-bold mt-0.5">
                      {item.title}
                    </p>
                    <p className="text-[var(--text-muted)] text-xs leading-relaxed mt-1 max-w-md lg:max-w-none">
                      {item.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
