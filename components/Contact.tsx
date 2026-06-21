"use client";

import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import TypingCode, { type Line } from "@/components/TypingCode";

// Colores de sintaxis
const O = "text-[#ff8800]"; // naranja (palabras clave, símbolos)
const W = "text-[#e2f0ff]"; // claro (valores)
const G = "text-[#94a3b8]"; // gris (comentarios)
const C = "text-[#7dd3fc]"; // cyan (claves)

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

  const terminalLines: Line[] = [
    [["const", O], [" contact", W], [" = {", O]],
    [
      ["  name", C],
      [":", O],
      [' "Alejandro Emmanuel Juárez Hernández"', W],
      [",", O],
    ],
    [
      ["  role", C],
      [":", O],
      [' "Full Stack Developer & DB Engineer"', W],
      [",", O],
    ],
    [["  email", C], [":", O], [' "aejhernandezdev@gmail.com"', W], [",", O]],
    [["  github", C], [":", O], [' "Alejandrojuarez0105"', W], [",", O]],
    [["  available", C], [":", O], [" true", O], [",", O]],
    [
      ["  responseTime", C],
      [":", O],
      [" " + t.contact.terminal.responseTime, W],
    ],
    [["}", O]],
    [["", G]],
    [[t.contact.terminal.prompt, G]],
    [
      ["sendMessage", O],
      ["(contact) ", W],
      [t.contact.terminal.availableComment + " ", G],
    ],
  ];

  const links = [
    {
      label: t.contact.links[0].label,
      handle: "@Alejandrojuarez0105",
      url: "https://github.com/Alejandrojuarez0105",
      desc: t.contact.links[0].desc,
    },
    {
      label: t.contact.links[1].label,
      handle: "Alejandro Emmanuel Juárez Hernández",
      url: "https://www.linkedin.com/in/alejandro-emmanuel-juarez-hernandez",
      desc: t.contact.links[1].desc,
    },
    {
      label: t.contact.links[2].label,
      handle: "aejhernandezdev@gmail.com",
      url: `https://mail.google.com/mail/?view=cm&fs=1&to=aejhernandezdev@gmail.com&su=${encodeURIComponent(t.contact.emailSubject)}`,
      desc: t.contact.links[2].desc,
    },
  ];

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

  const handleCopy = () => {
    navigator.clipboard.writeText("aejhernandezdev@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contacto"
      ref={ref}
      className={`px-6 py-24 flex flex-col items-center justify-center transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="w-full max-w-5xl flex flex-col gap-12">
        {/* Encabezado */}
        <div className="flex flex-col gap-2">
          <span className="text-[#ff8800] text-xs tracking-widest font-mono">
            {t.contact.kicker}
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e2f0ff]">
            {t.contact.title1}
            <br />
            <span className="text-[#ff8800]">{t.contact.title2}</span>
          </h2>
          <p className="text-[#94a3b8] text-sm leading-relaxed max-w-lg mt-1">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Contenido en dos columnas en pantallas grandes */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Izquierda: terminal de contacto (se escribe al entrar en pantalla) */}
          <div className="lg:w-1/2">
            <TypingCode title="contact.ts" lines={terminalLines} showPrompt />
          </div>

          {/* Derecha: links de contacto */}
          <div className="lg:w-1/2 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.label}
                href={l.url}
                target={l.url.startsWith("http") ? "_blank" : "_self"}
                rel="noopener noreferrer"
                className="bg-[#0d1525] border border-[#1e3a5f] rounded-xl p-5 flex items-center justify-between gap-4 hover:border-[#ff8800] transition-colors duration-300 group"
              >
                <div className="flex flex-col gap-1">
                  <span className="text-[#ff8800] text-xs font-mono tracking-widest">
                    {l.label}
                  </span>
                  <span className="text-[#e2f0ff] text-sm font-bold">
                    {l.handle}
                  </span>
                  <span className="text-[#94a3b8] text-xs">{l.desc}</span>
                </div>
                <span className="text-[#1e3a5f] group-hover:text-[#ff8800] transition-colors text-lg">
                  ↗
                </span>
              </a>
            ))}

            {/* Copiar email */}
            <button
              onClick={handleCopy}
              className="bg-[#0d1525] border border-[#1e3a5f] rounded-xl p-5 flex items-center justify-between gap-4 hover:border-[#ff8800] transition-colors duration-300 group text-left w-full"
            >
              <div className="flex flex-col gap-1">
                <span className="text-[#ff8800] text-xs font-mono tracking-widest">
                  {t.contact.quickLabel}
                </span>
                <span className="text-[#e2f0ff] text-sm font-bold">
                  {t.contact.quickTitle}
                </span>
                <span className="text-[#94a3b8] text-xs">
                  aejhernandezdev@gmail.com
                </span>
              </div>
              <span className="text-[#1e3a5f] group-hover:text-[#ff8800] transition-colors text-sm font-mono">
                {copied ? t.contact.copied : t.contact.copy}
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-3 pt-8 border-t border-[#1e3a5f]">
          <p className="text-[#94a3b8] text-xs font-mono tracking-widest">
            {t.contact.footerBuilt}
          </p>
          <p className="text-[#64748b] text-xs font-mono">
            {t.contact.footerCopyright}
          </p>
        </div>
      </div>
    </section>
  );
}
