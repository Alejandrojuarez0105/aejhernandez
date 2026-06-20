'use client'

import { useEffect, useRef, useState } from 'react'

const projects = [
  {
    name: 'Davidario',
    status: 'Terminado',
    statusColor: 'text-[#22c55e] border-[#22c55e]',
    role: 'Analista de sistemas',
    desc: 'Generador de fechas de exámenes desarrollado para un cliente real. Incluye modelo del dominio, actores y casos de uso, prototipos, priorización y documentación completa de sesiones en UML y Markdown.',
    tags: ['PlantUML', 'Markdown', 'UML', 'Análisis de requisitos'],
    github: 'https://github.com/Alejandrojuarez0105/Davidario',
    demo: null,
    highlight: true,
  },
  {
    name: 'SnackSmasher',
    status: 'En desarrollo',
    statusColor: 'text-[#ff8800] border-[#ff8800]',
    role: 'Full Stack Developer',
    desc: 'Plataforma web para un restaurante con sistema de reservas de mesas y videojuegos, reseñas de usuarios y gestión de eventos. Backend en C# con SQL Server, frontend en React + TypeScript + Vite.',
    tags: ['React', 'TypeScript', 'Vite', 'C#', 'SQL Server', 'Markdown'],
    github: 'https://github.com/Alejandrojuarez0105/SnackSmasher',
    demo: null,
    highlight: false,
  },
  {
    name: 'aehernandez.dev',
    status: 'En desarrollo',
    statusColor: 'text-[#ff8800] border-[#ff8800]',
    role: 'Full Stack Developer',
    desc: 'Este portfolio. Diseñado y construido desde cero con Next.js, TypeScript y Tailwind CSS. Enfocado en rendimiento, diseño oscuro y experiencia de usuario limpia.',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/Alejandrojuarez0105/ajhernandez',
    demo: null,
    highlight: false,
  },
  {
    name: '¿Próximo proyecto?',
    status: 'Próximamente',
    statusColor: 'text-[#94a3b8] border-[#475569]',
    role: null,
    desc: 'Siempre hay algo en construcción. Si tienes una idea o un proyecto en mente, hablemos.',
    tags: [],
    github: null,
    demo: null,
    highlight: false,
  },
]

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="proyectos"
      ref={ref}
      className={`px-6 py-24 flex flex-col items-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
    >
      <div className="w-full max-w-5xl flex flex-col gap-10">

        {/* Encabezado */}
        <div className="flex flex-col gap-2">
          <span className="text-[#ff8800] text-xs tracking-widest font-mono">// proyectos</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#e2f0ff]">Proyectos destacados</h2>
          <p className="text-[#94a3b8] text-sm leading-relaxed max-w-lg mt-1">
            Desde análisis de sistemas para clientes reales hasta aplicaciones full stack en construcción.
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.name}
              className={`bg-[#0d1525] border rounded-xl p-6 flex flex-col gap-4 transition-colors duration-300 group
                ${p.highlight
                  ? 'border-[#ff8800]'
                  : 'border-[#1e3a5f] hover:border-[#ff8800]'
                }
                ${!p.role ? 'opacity-50 hover:opacity-70' : ''}
              `}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {p.highlight && (
                      <span className="text-[10px] bg-[#ff8800] text-[#020d18] font-bold px-2 py-0.5 rounded font-mono tracking-widest">
                        Destacado
                      </span>
                    )}
                    <span className={`text-[10px] border px-2 py-0.5 rounded font-mono tracking-widest ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-[#e2f0ff] font-bold text-lg mt-1">{p.name}</h3>
                  {p.role && (
                    <span className="text-[#94a3b8] text-xs font-mono tracking-widest">// {p.role}</span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3 shrink-0">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#94a3b8] hover:text-[#ff8800] transition-colors text-xs font-mono border border-[#1e3a5f] hover:border-[#ff8800] px-3 py-1.5 rounded-lg"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#020d18] bg-[#ff8800] hover:bg-[#ffaa33] transition-colors text-xs font-mono px-3 py-1.5 rounded-lg font-bold"
                    >
                      Demo ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <p className="text-[#94a3b8] text-xs leading-relaxed flex-1">{p.desc}</p>

              {/* Tags */}
              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[#1e3a5f]">
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[#7dd3fc] text-[10px] font-mono bg-[#020d18] border border-[#1e3a5f] px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* CTA para el placeholder */}
              {!p.role && (
                <a
                  href="#contacto"
                  className="text-[#ff8800] text-xs font-mono tracking-widest hover:underline mt-auto"
                >
                  Hablemos →
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Link a GitHub */}
        <div className="flex justify-center pt-4">
          <a
            href="https://github.com/Alejandrojuarez0105?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#94a3b8] hover:text-[#ff8800] transition-colors text-xs font-mono border border-[#1e3a5f] hover:border-[#ff8800] px-6 py-3 rounded-xl"
          >
            Ver todos los repositorios en GitHub ↗
          </a>
        </div>

      </div>
    </section>
  )
}