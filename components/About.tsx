"use client";

import { useEffect, useRef, useState } from "react";

const timeline = [
  {
    year: "2022",
    title: "Primer contacto con la programación",
    desc: "Inicio en C y C++, desarrollando lógica de programación y comprendiendo estructuras básicas. Primeros programas y contacto real con el funcionamiento del software.",
  },
  {
    year: "2023",
    title: "Fundamentos sólidos en Java",
    desc: "Aprendizaje de Java enfocado en programación orientada a objetos (POO) y programación estructurada. Desarrollo de una base sólida en diseño, organización del código y buenas prácticas.",
  },
  {
    year: "2024",
    title: "Backend y modelado de datos",
    desc: "Desarrollo de aplicaciones con Python y Java. Diseño y gestión de bases de datos en MySQL, PostgreSQL y MongoDB, centrándome en la estructura, relaciones y eficiencia de los datos. Consolidación del enfoque backend.",
  },
  {
    year: "2025",
    title: "Transición a Full Stack",
    desc: "Integración del frontend con React, TypeScript, Vite y Tailwind. Construcción de interfaces modernas conectadas a backend. Exploración de bases de datos más avanzadas como Neo4j y uso de plataformas como Supabase.",
  },
  {
    year: "2026",
    title: "Proyectos reales y stack completo",
    desc: "Desarrollo full stack con Node.js, trabajando con un stack completo: frontend (React, TypeScript, Vite, Tailwind), backend (Node.js, Python, Java, C#, C, C++) y bases de datos (MySQL, PostgreSQL, MongoDB, Neo4j, Supabase). Construcción de aplicaciones completas y proyectos publicables, incluyendo este portfolio, aplicando buenas prácticas y arquitectura escalable.",
  },
];

const stats = [
  { num: "4+", lbl: "años programando" },
  { num: "6+", lbl: "motores de BD" },
  { num: "10+", lbl: "lenguajes y frameworks" },
  { num: "20+", lbl: "repos en GitHub" },
];

export default function About() {
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
        {/* Encabezado */}
        <div className="flex flex-col gap-2">
          <span className="text-[#ff8800] text-xs tracking-widest font-mono">
            // sobre mí
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e2f0ff]">
            Cómo empezó todo
          </h2>

          <p className="text-[#94a3b8] text-sm leading-relaxed max-w-lg mt-2">
            Desde pequeño me preguntaba cómo era posible que una televisión
            pudiera transmitir imágenes o cómo funcionaban los teléfonos. Todo
            empezó como curiosidad, pero con el tiempo se convirtió en algo más.
            Los videojuegos y los juegos móviles despertaron en mí no solo ganas
            de jugar, sino de entender cómo estaban hechos… e incluso de crear
            los míos propios.
          </p>

          <p className="text-[#94a3b8] text-sm leading-relaxed max-w-lg">
            En 2021 tuve la oportunidad de estudiar un bachillerato orientado a
            programación. En 2022 empecé con lenguajes como C y C++ y me adentré
            de lleno en este mundo, desarrollando proyectos y aprendiendo de
            forma constante. Incluso antes de eso, ya experimentaba modificando
            videojuegos, instalando mods o investigando fallos, sin darme cuenta
            de que estaba dando mis primeros pasos en el ámbito de la tecnología
            y la seguridad.
          </p>

          <p className="text-[#94a3b8] text-sm leading-relaxed max-w-lg">
            Con el tiempo, fui ampliando mis conocimientos: desde bases de datos
            hasta desarrollo backend y frontend. Hoy disfruto trabajando en todo
            el stack, ya que me permite tener una visión completa y control
            total de lo que construyo.
          </p>

          <p className="text-[#94a3b8] text-sm leading-relaxed max-w-lg">
            Me especializo en diseñar sistemas donde los datos fluyen de forma
            eficiente, desde el modelo de base de datos hasta la interfaz que
            los presenta. Trabajo con bases de datos relacionales, documentales
            y de grafos, adaptándome siempre a las necesidades del problema.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ num, lbl }) => (
            <div
              key={lbl}
              className="bg-[#0d1525] border border-[#1e3a5f] rounded-xl p-4 text-center"
            >
              <p className="text-2xl font-bold text-[#ff8800] font-mono">
                {num}
              </p>
              <p className="text-[#94a3b8] text-xs mt-1 tracking-widest">
                {lbl}
              </p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-2">
          <span className="text-[#ff8800] text-xs tracking-widest font-mono mb-2">
            // trayectoria
          </span>
          <div className="flex flex-col gap-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="flex gap-6 group">
                {/* Línea vertical */}
                <div className="flex flex-col items-center">
                  <div className="w-3 h-3 rounded-full border-2 border-[#ff8800] bg-[#020d18] mt-1 group-hover:bg-[#ff8800] transition-colors" />
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 bg-[#1e3a5f] my-1" />
                  )}
                </div>
                {/* Contenido */}
                <div className="pb-8">
                  <span className="text-[#ff8800] text-xs font-mono tracking-widest">
                    {item.year}
                  </span>
                  <p className="text-[#e2f0ff] text-sm font-bold mt-0.5">
                    {item.title}
                  </p>
                  <p className="text-[#94a3b8] text-xs leading-relaxed mt-1 max-w-md">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
