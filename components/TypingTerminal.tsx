"use client";

import { useEffect, useMemo, useState } from "react";
import { useLanguage } from "@/lib/language-context";

// Colores de sintaxis
const O = "text-[var(--accent-text)]"; // naranja (palabras clave, símbolos)
const W = "text-[var(--text)]"; // claro (valores)

// Construye las líneas (la etiqueta de herramientas/análisis y los items de
// análisis cambian según el idioma)
function buildLines(
  toolsLabel: string,
  analysisLabel: string,
  analysisItems: readonly string[],
): [string, string][][] {
  return [
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
      [toolsLabel, O],
      [
        ' ["Git", "GitHub", "VS Code", "Postman", "Linux", "Windows", "Markdown", "Visual Studio 2022"]',
        W,
      ],
      [",", O],
    ],
    [
      [analysisLabel, O],
      [" [" + analysisItems.map((i) => `"${i}"`).join(", ") + "]", W],
      [",", O],
    ],
    [
      ["  available:", O],
      [" true", O],
    ],
    [["}", O]],
  ];
}

const DURATION = 5000; // duración total objetivo (ms)
const STEP = 2; // caracteres por tick

const Cursor = () => (
  <span className="inline-block w-2 h-3.5 bg-[var(--accent)] ml-0.5 animate-pulse align-middle" />
);

export default function TypingTerminal() {
  const { lang, t } = useLanguage();

  const lines = useMemo(
    () => buildLines(t.typing.tools, t.typing.analysis, t.stack.analysisItems),
    [t.typing.tools, t.typing.analysis, t.stack.analysisItems],
  );

  // Total de caracteres + 1 por línea (pequeña pausa al saltar de línea)
  const TOTAL = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + line.reduce((s, [text]) => s + text.length, 0) + 1,
        0,
      ),
    [lines],
  );
  const TICK = (DURATION * STEP) / TOTAL; // ms por tick para cuadrar la duración

  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Reinicia la animación al cambiar de idioma
    setTyped(0);
    setDone(false);

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
  }, [lang, TOTAL, TICK]);

  // Calcula en qué línea va el cursor mientras escribe
  let consumed = 0;
  let caretLine = -1;
  if (!done) {
    for (let i = 0; i < lines.length; i++) {
      const lineLen = lines[i].reduce((s, [text]) => s + text.length, 0);
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
    <div className="w-full bg-[var(--bg-card-alt)] border border-[var(--border)] rounded-xl overflow-hidden print:hidden">
      {/* Barra superior */}
      <div className="flex items-center gap-2 bg-[var(--bg-card)] border-b border-[var(--border)] px-4 py-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="text-[var(--text-muted)] text-xs ml-2 tracking-widest">
          terminal — aehernandez.dev
        </span>
      </div>

      {/* Cuerpo: se "escribe" línea por línea */}
      <div className="p-4 md:p-5 text-[11px] md:text-sm leading-loose font-mono whitespace-pre-wrap">
        {lines.map((line, li) => {
          const lineStart = acc;
          const lineLen = line.reduce((s, [text]) => s + text.length, 0);
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
              {line.map(([text, c], ti) => {
                const show = Math.max(0, Math.min(rem, text.length));
                rem -= text.length;
                return (
                  <span key={ti} className={c}>
                    {text.slice(0, show)}
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
