'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/lib/language-context'

// Metadatos que no se traducen (nombres de repo, tags, enlaces)
const projectMeta = [
  {
    name: 'Davidario',
    tags: ['PlantUML', 'Markdown', 'UML', 'Análisis de requisitos'],
    github: 'https://github.com/Alejandrojuarez0105/Davidario',
    demo: null,
    highlight: true,
  },
  {
    name: 'SnackSmasher',
    tags: ['React', 'TypeScript', 'Vite', 'C#', 'SQL Server', 'Markdown'],
    github: 'https://github.com/Alejandrojuarez0105/SnackSmasher',
    demo: null,
    highlight: false,
  },
  {
    name: 'aehernandez.dev',
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    github: 'https://github.com/Alejandrojuarez0105/ajhernandez',
    demo: null,
    highlight: false,
  },
  {
    name: null,
    tags: [],
    github: null,
    demo: null,
    highlight: false,
  },
]

const statusColors: Record<string, string> = {
  done: 'text-[var(--ok)] border-[var(--ok)]',
  wip: 'text-[var(--accent-text)] border-[var(--accent)]',
  soon: 'text-[var(--text-muted)] border-[#475569]',
}

export default function Projects() {
  const { t } = useLanguage()
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  // Combina los metadatos con el texto traducido
  const projects = projectMeta.map((m, i) => {
    const item = t.projects.items[i]
    const itemName = "name" in item ? item.name : null
    return {
      ...m,
      name: itemName ?? m.name,
      role: item.role,
      desc: item.desc,
      status: t.projects.statuses[item.status as keyof typeof t.projects.statuses],
      statusColor: statusColors[item.status],
    }
  })

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
          <span className="text-[var(--accent-text)] text-xs tracking-widest font-mono">{t.projects.kicker}</span>
          <h2 className="text-3xl md:text-4xl font-bold text-[var(--text)]">{t.projects.title}</h2>
          <p className="text-[var(--text-muted)] text-sm leading-relaxed max-w-lg mt-1">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Grid de proyectos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <div
              key={p.name}
              className={`bg-[var(--bg-card)] border rounded-xl p-6 flex flex-col gap-4 transition-colors duration-300 group
                ${p.highlight
                  ? 'border-[var(--accent)]'
                  : 'border-[var(--border)] hover:border-[var(--accent)]'
                }
                ${!p.role ? 'opacity-50 hover:opacity-70' : ''}
              `}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {p.highlight && (
                      <span className="text-[10px] bg-[var(--accent)] text-[var(--on-accent)] font-bold px-2 py-0.5 rounded font-mono tracking-widest">
                        {t.projects.highlight}
                      </span>
                    )}
                    <span className={`text-[10px] border px-2 py-0.5 rounded font-mono tracking-widest ${p.statusColor}`}>
                      {p.status}
                    </span>
                  </div>
                  <h3 className="text-[var(--text)] font-bold text-lg mt-1">{p.name}</h3>
                  {p.role && (
                    <span className="text-[var(--text-muted)] text-xs font-mono tracking-widest">// {p.role}</span>
                  )}
                </div>

                {/* Links */}
                <div className="flex gap-3 shrink-0">
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors text-xs font-mono border border-[var(--border)] hover:border-[var(--accent)] px-3 py-1.5 rounded-lg"
                    >
                      GitHub ↗
                    </a>
                  )}
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--on-accent)] bg-[var(--accent)] hover:bg-[#ffaa33] transition-colors text-xs font-mono px-3 py-1.5 rounded-lg font-bold"
                    >
                      Demo ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Descripción */}
              <p className="text-[var(--text-muted)] text-xs leading-relaxed flex-1">{p.desc}</p>

              {/* Tags */}
              {p.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-[var(--border)]">
                  {p.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[var(--pill)] text-[10px] font-mono bg-[var(--bg-base)] border border-[var(--border)] px-2 py-1 rounded"
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
                  className="text-[var(--accent-text)] text-xs font-mono tracking-widest hover:underline mt-auto"
                >
                  {t.projects.talk}
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
            className="flex items-center gap-2 text-[var(--text-muted)] hover:text-[var(--accent-text)] transition-colors text-xs font-mono border border-[var(--border)] hover:border-[var(--accent)] px-6 py-3 rounded-xl"
          >
            {t.projects.viewAll}
          </a>
        </div>

      </div>
    </section>
  )
}