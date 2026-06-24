"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24">
      <div className="w-full max-w-lg">
        {/* Ventana de terminal falsa (mismo estilo que el resto del sitio) */}
        <div className="bg-[var(--bg-card)] border border-[var(--border)] rounded-xl overflow-hidden shadow-2xl">
          {/* Barra superior con los 3 puntos tipo macOS */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border)]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-[var(--text-muted)] text-xs font-mono">~/404</span>
          </div>

          {/* Contenido */}
          <div className="p-8 flex flex-col gap-5">
            <span className="text-[var(--accent-text)] text-xs font-mono tracking-widest">
              {t.notFound.code}
            </span>
            <h1 className="text-6xl md:text-7xl font-bold font-mono text-[var(--text)] leading-none">
              404
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-[var(--text)]">
              {t.notFound.title}
            </h2>
            <p className="text-[var(--text-muted)] text-sm leading-relaxed">
              {t.notFound.description}
            </p>
            <Link
              href="/"
              className="self-start mt-2 bg-[var(--accent)] text-[var(--on-accent)] font-bold px-6 py-3 rounded-xl text-sm tracking-wide flex items-center gap-2 shadow-lg hover:scale-105 hover:shadow-[0_0_20px_#ff8800] transition-all duration-300"
            >
              ← {t.notFound.back}
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
