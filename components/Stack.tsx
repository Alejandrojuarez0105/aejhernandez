"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import TypingCode, { type Line } from "@/components/TypingCode";

// Colores de sintaxis
const O = "text-[var(--accent-text)]"; // naranja (palabras clave, símbolos)
const W = "text-[var(--text)]"; // claro (valores)
const G = "text-[var(--text-muted)]"; // gris (comentarios)
const C = "text-[var(--pill)]"; // cyan (claves)
const GR = "text-[var(--syntax-str)]"; // verde (valores de categoría)

export default function Stack() {
  const { t } = useLanguage();

  const terminalLines: Line[] = [
    [["export const", O], [" stack", W], [" = {", O]],
    [["  languages", C], [":", O], [" 7", W]],
    [["  databases", C], [":", O], [" 7", W], [t.stack.terminal.dbComment, G]],
    [["  specialty", C], [":", O], [" " + t.stack.terminal.specialty, W]],
    [["}", O]],
    [["", G]],
    [[t.stack.terminal.detailed, G]],
    [["const", O], [" stackDetails", W], [" = [", O]],
    [["  {", W]],
    [["    category: ", W], [`"${t.stack.categories.frontend}"`, GR], [",", W]],
    [
      ["    items: ", W],
      ["[React, TypeScript, JavaScript, Vite, Tailwind CSS, HTML, CSS]", W],
    ],
    [["  },", W]],
    [["  {", W]],
    [["    category: ", W], [`"${t.stack.categories.backend}"`, GR], [",", W]],
    [["    items: ", W], ["[Node.js, NestJS, Python, Java, C#, C, C++]", W]],
    [["  },", W]],
    [["  {", W]],
    [["    category: ", W], [`"${t.stack.categories.databases}"`, GR], [",", W]],
    [
      ["    items: ", W],
      ["[MySQL, PostgreSQL, SQL Server, MongoDB, Neo4j, Supabase, Prisma]", W],
    ],
    [["  },", W]],
    [["  {", W]],
    [["    category: ", W], [`"${t.stack.categories.tools}"`, GR], [",", W]],
    [
      ["    items: ", W],
      [
        "[Git, GitHub, VS Code, Postman, Linux, Windows, Markdown, Visual Studio 2022]",
        W,
      ],
    ],
    [["  },", W]],
    [["  {", W]],
    [["    category: ", W], [`"${t.stack.categories.analysis}"`, GR], [",", W]],
    [["    items: ", W], [`[${t.stack.analysisItems.join(", ")}]`, W]],
    [["  }", W]],
    [[" ]", O]],
  ];

  const stack: {
    category: string;
    icon: string;
    items: readonly string[];
    wide?: boolean;
  }[] = [
    {
      category: t.stack.categories.frontend,
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
      category: t.stack.categories.backend,
      icon: "⬡",
      items: ["Node.js", "NestJS", "Python", "Java", "C#", "C", "C++"],
    },
    {
      category: t.stack.categories.databases,
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
      category: t.stack.categories.tools,
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
    {
      category: t.stack.categories.analysis,
      icon: "◇",
      items: t.stack.analysisItems,
      wide: true,
    },
  ];

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
          <span className="text-[var(--accent-text)] text-xs tracking-widest font-mono mb-2">
            {t.stack.kicker}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">
            {t.stack.title}
          </h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-lg mt-1">
            {t.stack.subtitle}
          </p>
        </div>

        {/* Grid de categorías */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {stack.map(({ category, icon, items, wide }) => (
            <div
              key={category}
              className={`bg-[var(--bg-card)] border border-[var(--border)] rounded-xl p-6 flex flex-col gap-5 hover:border-[var(--accent)] transition-colors duration-300 group items-center ${
                wide ? "md:col-span-2" : ""
              }`}
            >
              {/* Header de categoría */}
              <div className="flex items-center gap-3 justify-center">
                <span className="text-[var(--accent-text)] text-2xl">{icon}</span>
                <span className="text-[var(--text)] text-lg md:text-xl font-bold tracking-widest">
                  {category}
                </span>
                <span className="ml-2 text-[var(--border)] text-sm font-mono group-hover:text-[var(--accent-text)] transition-colors">
                  {items.length}
                </span>
              </div>

              {/* PILLS */}
              <div className="flex flex-wrap gap-3 justify-center">
                {items.map((item) => (
                  <span
                    key={item}
                    className="bg-[var(--bg-base)] border border-[var(--border)] text-[var(--pill)] text-lg px-5 py-2 rounded-lg font-mono tracking-wide hover:border-[var(--accent)] hover:text-[var(--accent-text)] transition-colors cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Terminal resumen (se escribe al entrar en pantalla) */}
        <TypingCode title="stack.config.ts" lines={terminalLines} />
      </div>
    </section>
  );
}
