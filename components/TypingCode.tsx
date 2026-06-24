"use client";

import { useEffect, useMemo, useRef, useState } from "react";

// Terminal de código que se "escribe sola" al entrar en pantalla.
// Reutilizable: recibe el título y las líneas (tokens [texto, claseColor]).
// (El Hero usa su propio TypingTerminal; este es para Stack y Contacto.)

export type Token = [string, string];
export type Line = Token[];

const STEP = 2; // caracteres por tick

const Cursor = () => (
  <span className="inline-block w-2 h-3.5 bg-[var(--accent)] ml-0.5 animate-pulse align-middle" />
);

export default function TypingCode({
  title,
  lines,
  durationMs = 5000,
  showPrompt = false,
}: {
  title: string;
  lines: Line[];
  durationMs?: number;
  showPrompt?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);
  const [started, setStarted] = useState(false);

  // Total de caracteres + 1 por línea (pausa al saltar de línea)
  const TOTAL = useMemo(
    () =>
      lines.reduce(
        (sum, line) => sum + line.reduce((s, [t]) => s + t.length, 0) + 1,
        0,
      ),
    [lines],
  );
  const TICK = (durationMs * STEP) / TOTAL; // ms por tick para cuadrar la duración

  // Empieza a escribir cuando la terminal entra en pantalla
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setStarted(true);
      },
      { threshold: 0.25 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  // Anima (y reinicia al cambiar de idioma, ya que cambian las líneas)
  useEffect(() => {
    if (!started) return;

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
  }, [started, TOTAL, TICK]);

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
    <div
      ref={ref}
      className="bg-[var(--bg-card-alt)] border border-[var(--border)] rounded-xl overflow-hidden w-full print:hidden"
    >
      {/* Barra superior */}
      <div className="flex items-center gap-2 bg-[var(--bg-card)] border-b border-[var(--border)] px-4 py-2.5">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="text-[var(--text-muted)] text-xs ml-2 tracking-widest">
          {title}
        </span>
      </div>

      {/* Cuerpo: se "escribe" línea por línea */}
      <div className="p-5 text-xs leading-loose font-mono whitespace-pre-wrap">
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
              {/* zero-width space: mantiene la altura aunque la línea esté vacía */}
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

        {/* Prompt final opcional */}
        {showPrompt && (
          <div className="mt-2">
            <span className="text-[#334155]">$ </span>
            {done && <Cursor />}
          </div>
        )}
      </div>
    </div>
  );
}
