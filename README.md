<h1 align="center">aejhernandez.dev — Portafolio personal</h1>

<p align="center">
  Sitio web personal y CV de <b>Alejandro Emmanuel Juárez Hernández</b> · Full Stack Developer &amp; Database Engineer
</p>

<div align="center">

[![Ver sitio en vivo](https://img.shields.io/badge/Ver_sitio_en_vivo-aejhernandez.dev-FF8800?style=for-the-badge&logo=vercel&logoColor=white)](https://aejhernandez.dev)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![Desplegado en Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com)

</div>

<p align="center">
  <img src="https://aejhernandez.dev/opengraph-image" alt="aejhernandez.dev" width="640">
</p>

---

## ¿Qué es?

Una **web personal de una sola página** que funciona a la vez como portafolio y como currículum interactivo. Presenta mi perfil, mi stack tecnológico, mis proyectos y testimonios reales, con una estética de **terminal/código** (ventanas que se "autoescriben", tipografía monoespaciada y acento naranja sobre fondo oscuro).

Es **bilingüe (español / inglés)**, ofrece **tema claro y oscuro**, permite **descargar el CV** en el idioma activo y deja que cualquier visitante **deje un testimonio** mediante un flujo verificado por correo. Todo el contenido vive en el propio código (sin CMS), salvo los testimonios, que se almacenan en una base de datos.

> En producción: **[aejhernandez.dev](https://aejhernandez.dev)**.

---

## Características

- 🧩 **Una sola página** compuesta por secciones: Inicio, Sobre mí (trayectoria en línea de tiempo), Stack, Proyectos, Testimonios y Contacto.
- 🌐 **Bilingüe ES/EN** — toda la copia centralizada en `lib/i18n.ts`, con persistencia en `localStorage` y detección del idioma del navegador.
- 🌗 **Tema claro / oscuro** — sistema de *tokens* en variables CSS; en la primera visita sigue la preferencia del sistema (`prefers-color-scheme`) y luego recuerda la elección, con script anti-parpadeo.
- 💬 **Testimonios verificados** — los visitantes envían su testimonio y confirman su correo (*double opt-in* vía Resend) antes de que llegue a moderación; aprobación manual antes de publicarse.
- 🛡️ **Anti-spam por capas** — *honeypot*, límite de envíos por IP y tope global de correos (Upstash Redis), y validación de longitudes en el servidor.
- 🔎 **SEO** — favicon e imagen Open Graph generados dinámicamente (`next/og`), `sitemap.xml`, `robots.txt`, datos estructurados *Person* (JSON-LD) y *canonical*.
- 📄 **Descarga de CV** en PDF según el idioma activo, con una hoja de estilos de **impresión** (`Ctrl+P`) optimizada.
- 📈 **Analítica** con Vercel Analytics y Speed Insights.
- ♿ **Accesibilidad y motion** — respeta `prefers-reduced-motion` y usa etiquetas `aria` en los controles.

---

## Stack tecnológico

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

</div>

- **Framework:** [Next.js 16](https://nextjs.org) (App Router) + [React 19](https://react.dev) + [TypeScript](https://www.typescriptlang.org).
- **Estilos:** [Tailwind CSS v4](https://tailwindcss.com) (vía `@tailwindcss/postcss`) con un sistema de *tokens* en variables CSS para el tema claro/oscuro.
- **Testimonios:** [Supabase](https://supabase.com) (PostgreSQL) para el almacenamiento y la moderación.
- **Correo:** [Resend](https://resend.com) para la verificación *double opt-in* y la notificación de moderación.
- **Anti-spam:** [Upstash Redis](https://upstash.com) + `@upstash/ratelimit`.
- **Despliegue y analítica:** [Vercel](https://vercel.com) + `@vercel/analytics` y `@vercel/speed-insights`.

---

## Estructura del repositorio

```
aejhernandez/
├── app/                     ← App Router de Next.js
│   ├── layout.tsx           ← metadatos SEO, JSON-LD, providers (idioma + tema)
│   ├── page.tsx             ← composición de las secciones de la página
│   ├── globals.css          ← reset, tokens de tema y estilos de impresión
│   ├── icon.tsx             ← favicon dinámico (next/og)
│   ├── opengraph-image.tsx  ← imagen Open Graph dinámica (next/og)
│   ├── sitemap.ts · robots.ts · not-found.tsx
│   └── api/testimonials/    ← Route Handlers: envío + verificación de testimonios
├── components/              ← secciones y piezas de UI (Hero, About, Stack, …)
├── lib/                     ← i18n, contextos (idioma/tema), clientes (Supabase, correo)
├── public/cv/               ← CV en PDF (ES / EN)
└── README.md                ← este archivo
```

---

## Inicio rápido

**Requisitos previos:** Node.js. Las integraciones externas (Supabase, Resend, Upstash) son opcionales en local: sin sus variables, la web funciona y el envío de testimonios queda deshabilitado de forma controlada.

```bash
npm install
npm run dev
```

La web queda en `http://localhost:3000`.

### Variables de entorno

Para habilitar los testimonios y el correo, crea un archivo `.env.local` en la raíz:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=          # URL base del proyecto (sin /rest/v1/)
NEXT_PUBLIC_SUPABASE_ANON_KEY=     # clave pública (lecturas)
SUPABASE_SERVICE_ROLE_KEY=         # clave de servicio (solo servidor)

# Resend (verificación + notificación por correo)
RESEND_API_KEY=
TESTIMONIAL_FROM_EMAIL=            # remitente (dominio verificado en Resend)
TESTIMONIAL_NOTIFY_EMAIL=          # destino de las notificaciones de moderación

# Upstash Redis (anti-spam, opcional)
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

> Las variables `NEXT_PUBLIC_*` se incrustan en el *build*: al cambiarlas en Vercel hay que **redesplegar sin caché de build**. El resto son de solo servidor y se aplican en un despliegue normal.

### Scripts

| Script | Acción |
|--------|--------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | *Build* de producción |
| `npm run start` | Sirve el *build* de producción |
| `npm run lint` | Linter (ESLint) |

---

## Despliegue

El sitio está desplegado en **[Vercel](https://vercel.com)** con dominio propio **[aejhernandez.dev](https://aejhernandez.dev)** (DNS en Cloudflare). Cada *push* a `main` genera un despliegue automático.

---

<div align="center">
<i>Hecho por Alejandro Emmanuel Juárez Hernández · Full Stack Developer &amp; Database Engineer</i>
<br>
<a href="https://aejhernandez.dev">aejhernandez.dev</a> ·
<a href="https://github.com/Alejandrojuarez0105">GitHub</a> ·
<a href="https://www.linkedin.com/in/alejandro-emmanuel-juarez-hernandez">LinkedIn</a>
</div>
