"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";

// Botón flotante que aparece al hacer scroll y lleva al inicio de la página.
export default function BackToTop() {
  const { t } = useLanguage();
  const [visible, setVisible] = useState(false);

  // Aparece tras bajar un poco
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    // Respeta a quien prefiere menos movimiento
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label={t.nav.backToTop}
      className={`fixed bottom-6 right-6 z-50 flex items-center justify-center w-11 h-11 rounded-full bg-[#ff8800] text-[#020d18] shadow-lg hover:bg-[#ffaa33] hover:scale-110 transition-all duration-300 print:hidden ${
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <span className="text-lg font-bold leading-none">↑</span>
    </button>
  );
}
