"use client";

import { useEffect, useRef, useState } from "react";

const links = [
  {
    label: "GitHub",
    handle: "@Alejandrojuarez0105",
    url: "https://github.com/Alejandrojuarez0105",
    desc: "Mis repositorios y proyectos",
  },
  {
    label: "LinkedIn",
    handle: "Alejandro Emmanuel Juárez Hernández",
    url: "https://www.linkedin.com/in/alejandro-emmanuel-juarez-hernandez",
    desc: "Mi perfil profesional",
  },
  {
    label: "Email",
    handle: "aejhernandezdev@gmail.com",
    url: "https://mail.google.com/mail/?view=cm&fs=1&to=aejhernandezdev@gmail.com&su=Contacto desde tu portfolio",
    desc: "Escríbeme directamente",
  },
];

export default function Contact() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);

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
            // contacto
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e2f0ff]">
            Construyamos algo
            <br />
            <span className="text-[#ff8800]">juntos</span>
          </h2>
          <p className="text-[#94a3b8] text-sm leading-relaxed max-w-lg mt-1">
            Abierto a proyectos freelance, colaboraciones y oportunidades
            laborales. Si tienes una idea o un proyecto en mente, hablemos.
          </p>
        </div>

        {/* Contenido en dos columnas en pantallas grandes */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Izquierda: terminal de contacto */}
          <div className="lg:w-1/2 bg-[#060d18] border border-[#1e3a5f] rounded-xl overflow-hidden">
            <div className="flex items-center gap-2 bg-[#0d1525] border-b border-[#1e3a5f] px-4 py-2.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
              <span className="text-[#94a3b8] text-xs ml-2 tracking-widest">
                contact.ts
              </span>
            </div>
            <div className="p-5 text-xs leading-loose font-mono">
              <p>
                <span className="text-[#ff8800]">const</span>{" "}
                <span className="text-[#e2f0ff]"> contact</span>{" "}
                <span className="text-[#ff8800]">= {"{"}</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">name</span>
                <span className="text-[#ff8800]">:</span>{" "}
                <span className="text-[#e2f0ff]">
                  "Alejandro Emmanuel Juárez Hernández"
                </span>
                <span className="text-[#ff8800]">,</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">role</span>
                <span className="text-[#ff8800]">:</span>{" "}
                <span className="text-[#e2f0ff]">
                  "Full Stack Developer & DB Engineer"
                </span>
                <span className="text-[#ff8800]">,</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">email</span>
                <span className="text-[#ff8800]">:</span>{" "}
                <span className="text-[#e2f0ff]">
                  "aejhernandezdev@gmail.com"
                </span>
                <span className="text-[#ff8800]">,</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">github</span>
                <span className="text-[#ff8800]">:</span>{" "}
                <span className="text-[#e2f0ff]">"Alejandrojuarez0105"</span>
                <span className="text-[#ff8800]">,</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">available</span>
                <span className="text-[#ff8800]">:</span>{" "}
                <span className="text-[#ff8800]">true</span>
                <span className="text-[#ff8800]">,</span>
              </p>
              <p>
                &nbsp;&nbsp;<span className="text-[#7dd3fc]">responseTime</span>
                <span className="text-[#ff8800]">:</span>{" "}
                <span className="text-[#e2f0ff]">"menos de 48h"</span>
              </p>
              <p>
                <span className="text-[#ff8800]">{"}"}</span>
              </p>
              <p className="mt-4 text-[#94a3b8]">
                // ¿tienes un proyecto en mente?
              </p>
              <p>
                <span className="text-[#ff8800]">sendMessage</span>
                <span className="text-[#e2f0ff]">(contact)</span>{" "}
                <span className="text-[#94a3b8]">// estaré encantado de trabajar juntos </span>
              </p>
              <p className="mt-2">
                <span className="text-[#334155]">$ </span>
                <span className="inline-block w-2 h-3.5 bg-[#ff8800] ml-0.5 animate-pulse align-middle" />
              </p>
            </div>
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
                  Email rápido
                </span>
                <span className="text-[#e2f0ff] text-sm font-bold">
                  Copiar al portapapeles
                </span>
                <span className="text-[#94a3b8] text-xs">
                  aejhernandezdev@gmail.com
                </span>
              </div>
              <span className="text-[#1e3a5f] group-hover:text-[#ff8800] transition-colors text-sm font-mono">
                {copied ? "✓ copiado" : "copiar"}
              </span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-3 pt-8 border-t border-[#1e3a5f]">
          <p className="text-[#94a3b8] text-xs font-mono tracking-widest">
            // construido con Next.js, TypeScript y Tailwind CSS
          </p>
          <p className="text-[#64748b] text-xs font-mono">
            © 2026 Alejandro Emmanuel Juárez Hernández
          </p>
        </div>
      </div>
    </section>
  );
}
