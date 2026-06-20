"use client";

import { useEffect, useRef, useState } from "react";

// Colores de sintaxis
const O = "text-[#ff8800]"; // naranja (palabras clave, símbolos)
const W = "text-[#e2f0ff]"; // claro (valores)

// Cada línea es una lista de tokens [texto, color]
const lines: [string, string][][] = [
  [
    ["const", O],
    [" alejandro", W],
    [" = {", O],
  ],
  [
    ["  role:", O],
    [' "Full Stack Developer & DB Engineer"', W],
    [",", O],
  ],
  [
    ["  frontend:", O],
    [' ["React", "TypeScript", "JavaScript", "Vite", "Tailwind", "HTML", "CSS"]', W],
    [",", O],
  ],
  [
    ["  backend:", O],
    [' ["Node.js", "NestJS", "Python", "Java", "C#", "C", "C++"]', W],
    [",", O],
  ],
  [
    ["  databases:", O],
    [
      ' ["MySQL", "PostgreSQL", "SQL Server", "MongoDB", "Neo4j", "Supabase", "Prisma"]',
      W,
    ],
    [",", O],
  ],
  [
    ["  herramientas:", O],
    [
      ' ["Git", "GitHub", "VS Code", "Postman", "Linux", "Windows", "Markdown", "Visual Studio 2022"]',
      W,
    ],
    [",", O],
  ],
  [
    ["  available:", O],
    [" true", O],
  ],
  [["}", O]],
];

// Total de caracteres + 1 por línea (pequeña pausa al saltar de línea)
const TOTAL = lines.reduce(
  (sum, line) => sum + line.reduce((s, [t]) => s + t.length, 0) + 1,
  0,
);

const DURATION = 5000; // duración total objetivo (ms)
const STEP = 2; // caracteres por tick
const TICK = (DURATION * STEP) / TOTAL; // ms por tick para cuadrar la duración

const Cursor = () => (
  <span className="inline-block w-2 h-3.5 bg-[#ff8800] ml-0.5 animate-pulse align-middle" />
);

export default function TypingTerminal() {
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;

    // Accesibilidad: si se prefiere menos movimiento, mostrar todo de golpe
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce) {
      setTyped(TOTAL);
      setDone(true);
      return;
    }

    const id = setInterval(() => {
      setTyped((prev) => {
        const next = prev + STEP;
        if (next >= TOTAL) {
          clearInterval(id);
          setDone(true);
          return TOTAL;
        }
        return next;
      });
    }, TICK);

    return () => clearInterval(id);
  }, []);

  // Calcula en qué línea va el cursor mientras escribe
  let consumed = 0;
  let caretLine = -1;
  if (!done) {
    for (let i = 0; i < lines.length; i++) {
      const lineLen = lines[i].reduce((s, [t]) => s + t.length, 0);
      if (typed <= consumed + lineLen) {
        caretLine = i;
        break;
      }
      consumed += lineLen + 1;
    }
    if (caretLine === -1) caretLine = lines.length - 1;
  }

  // Caracteres revelados por línea
  let acc = 0;

  return (
    <div className="w-full bg-[#060d18] border border-[#1e3a5f] rounded-xl overflow-hidden">
      {/* Barra superior */}
      <div className="flex items-center gap-2 bg-[#0d1525] border-b border-[#1e3a5f] px-4 py-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="text-[#94a3b8] text-xs ml-2 tracking-widest">
          terminal — aehernandez.dev
        </span>
      </div>

      {/* Cuerpo: se "escribe" línea por línea */}
      <div className="p-5 text-sm leading-loose font-mono whitespace-pre-wrap">
        {lines.map((line, li) => {
          const lineStart = acc;
          const lineLen = line.reduce((s, [t]) => s + t.length, 0);
          const lineRevealed = Math.max(
            0,
            Math.min(typed - lineStart, lineLen),
          );
          acc += lineLen + 1;

          let rem = lineRevealed;
          return (
            <div key={li}>
              {/* zero-width space: mantiene la altura de la línea aunque esté vacía */}
              {"​"}
              {line.map(([t, c], ti) => {
                const show = Math.max(0, Math.min(rem, t.length));
                rem -= t.length;
                return (
                  <span key={ti} className={c}>
                    {t.slice(0, show)}
                  </span>
                );
              })}
              {!done && caretLine === li && <Cursor />}
            </div>
          );
        })}

        {/* Prompt final */}
        <div className="mt-2">
          <span className="text-[#334155]">$ </span>
          {done && <Cursor />}
        </div>
      </div>
    </div>
  );
}
