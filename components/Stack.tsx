"use client";

import { useEffect, useRef, useState } from "react";

const stack = [
  {
    category: "Frontend",
    icon: "▢",
    items: [
      "React",
      "TypeScript",
      "JavaScript",
      "Vite",
      "Tailwind CSS",
      "HTML",
      "CSS",
    ],
  },
  {
    category: "Backend",
    icon: "⬡",
    items: ["Node.js", "NestJS", "Python", "Java", "C#", "C", "C++"],
  },
  {
    category: "Bases de datos",
    icon: "◈",
    items: [
      "MySQL",
      "PostgreSQL",
      "SQL Server",
      "MongoDB",
      "Neo4j",
      "Supabase",
      "Prisma",
    ],
  },
  {
    category: "Herramientas",
    icon: "◎",
    items: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "Linux",
      "Windows",
      "Markdown",
      "Visual Studio 2022",
    ],
  },
];

export default function Stack() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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

  return (
    <section
      id="stack"
      ref={ref}
      className={`px-6 py-24 flex flex-col items-center transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <div className="w-full max-w-5xl flex flex-col gap-10">
        {/* Encabezado */}
        <div className="flex flex-col gap-2">
          <span className="text-[#ff8800] text-xs tracking-widest font-mono mb-2">
            // tecnologías
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e2f0ff]">
            Stack tecnológico
          </h2>
          <p className="text-[#94a3b8] text-sm leading-relaxed max-w-lg mt-1">
            Herramientas y lenguajes con los que trabajo. Desde el modelo de
            datos hasta la interfaz.
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stack.map(({ category, icon, items }) => (
            <div
              key={category}
              className="bg-[#0d1525] border border-[#1e3a5f] rounded-xl p-6 flex flex-col gap-5 hover:border-[#ff8800] transition-colors duration-300 group items-center"
            >
              {/* Header de categoría */}
              <div className="flex items-center gap-3 justify-center">
                <span className="text-[#ff8800] text-2xl">{icon}</span>
                <span className="text-[#e2f0ff] text-lg md:text-xl font-bold tracking-widest">
                  {category}
                </span>
                <span className="ml-2 text-[#1e3a5f] text-sm font-mono group-hover:text-[#ff8800] transition-colors">
                  {items.length}
                </span>
              </div>

              {/* PILLS */}
              <div className="flex flex-wrap gap-3 justify-center">
                {items.map((item) => (
                  <span
                    key={item}
                    className="bg-[#020d18] border border-[#1e3a5f] text-[#7dd3fc] text-lg px-5 py-2 rounded-lg font-mono tracking-wide hover:border-[#ff8800] hover:text-[#ff8800] transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal resumen */}
        <div className="bg-[#060d18] border border-[#1e3a5f] rounded-xl overflow-hidden w-full">
          <div className="flex items-center gap-2 bg-[#0d1525] border-b border-[#1e3a5f] px-4 py-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            <span className="text-[#94a3b8] text-xs ml-2 tracking-widest">
              stack.config.ts
            </span>
          </div>

          <div className="p-5 text-xs leading-loose font-mono">
            {/* RESUMEN */}
            <p>
              <span className="text-[#ff8800]">export const</span>{" "}
              <span className="text-[#e2f0ff]"> stack</span>{" "}
              <span className="text-[#ff8800]">= {"{"}</span>
            </p>
            <p>
              &nbsp;&nbsp;<span className="text-[#7dd3fc]">languages</span>
              <span className="text-[#ff8800]">:</span>{" "}
              <span className="text-[#e2f0ff]">7</span>
            </p>
            <p>
              &nbsp;&nbsp;<span className="text-[#7dd3fc]">databases</span>
              <span className="text-[#ff8800]">:</span>{" "}
              <span className="text-[#e2f0ff]">7</span>
              <span className="text-[#94a3b8]">
                , // relacional, documental, grafos, ORM
              </span>
            </p>
            <p>
              &nbsp;&nbsp;<span className="text-[#7dd3fc]">specialty</span>
              <span className="text-[#ff8800]">:</span>{" "}
              <span className="text-[#e2f0ff]">
                "database design & full stack"
              </span>
            </p>
            <p>
              <span className="text-[#ff8800]">{"}"}</span>
            </p>

            {/* SEPARADOR */}
            <p className="text-[#94a3b8] mt-4">// detailed stack ↓</p>

            {/* DETALLE */}
            <p>
              <span className="text-[#ff8800]">const</span>{" "}
              <span className="text-[#e2f0ff]">stackDetails</span>{" "}
              <span className="text-[#ff8800]">= {"["}</span>
            </p>

            {/* Frontend */}
            <p>&nbsp;&nbsp;{"{"}</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;category:{" "}
              <span className="text-[#a3e635]">"Frontend"</span>,
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;items:{" "}
              <span className="text-[#e2f0ff]">
                [React, TypeScript, JavaScript, Vite, Tailwind CSS, HTML, CSS]
              </span>
            </p>
            <p>&nbsp;&nbsp;{"},"}</p>

            {/* Backend */}
            <p>&nbsp;&nbsp;{"{"}</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;category:{" "}
              <span className="text-[#a3e635]">"Backend"</span>,
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;items:{" "}
              <span className="text-[#e2f0ff]">
                [Node.js, NestJS, Python, Java, C#, C, C++]
              </span>
            </p>
            <p>&nbsp;&nbsp;{"},"}</p>

            {/* DB */}
            <p>&nbsp;&nbsp;{"{"}</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;category:{" "}
              <span className="text-[#a3e635]">"Bases de datos"</span>,
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;items:{" "}
              <span className="text-[#e2f0ff]">
                [MySQL, PostgreSQL, SQL Server, MongoDB, Neo4j, Supabase, Prisma]
              </span>
            </p>
            <p>&nbsp;&nbsp;{"},"}</p>

            {/* Tools */}
            <p>&nbsp;&nbsp;{"{"}</p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;category:{" "}
              <span className="text-[#a3e635]">"Herramientas"</span>,
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;items:{" "}
              <span className="text-[#e2f0ff]">
                [Git, GitHub, VS Code, Postman, Linux, Windows, Markdown, Visual
                Studio 2022]
              </span>
            </p>
            <p>&nbsp;&nbsp;{"}"}</p>

            <p>
              <span className="text-[#ff8800]">{" ]"}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
