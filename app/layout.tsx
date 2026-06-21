import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import BackToTop from "@/components/BackToTop";
import { LanguageProvider } from "@/lib/language-context";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://aejhernandez.dev"),
  title: "Alejandro Emmanuel Juárez Hernández — Full Stack Developer",
  description:
    "Full Stack Developer & Database Engineer. Construyo soluciones completas: backend sólido, frontend limpio y bases de datos bien modeladas.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Full Stack Developer",
    "Database Engineer",
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "PostgreSQL",
    "MongoDB",
    "Alejandro Juárez Hernández",
  ],
  authors: [{ name: "Alejandro Emmanuel Juárez Hernández" }],
  openGraph: {
    title: "Alejandro Emmanuel Juárez Hernández — Full Stack Developer",
    description:
      "Full Stack Developer & Database Engineer. Backend, frontend y bases de datos.",
    url: "https://aejhernandez.dev",
    siteName: "aejhernandez.dev",
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejandro Emmanuel Juárez Hernández — Full Stack Developer",
    description:
      "Full Stack Developer & Database Engineer. Backend, frontend y bases de datos.",
  },
};

// Datos estructurados (JSON-LD) — le dicen a Google que esto es una persona
// (desarrollador) con sus enlaces, habilidades y formación.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Alejandro Emmanuel Juárez Hernández",
  url: "https://aejhernandez.dev",
  image: "https://avatars.githubusercontent.com/u/144958850?v=4",
  jobTitle: "Full Stack Developer & Database Engineer",
  email: "aejhernandezdev@gmail.com",
  description:
    "Full Stack Developer & Database Engineer. Construyo soluciones completas: desde la ingeniería de requisitos y el modelado de datos hasta el backend y la interfaz.",
  sameAs: [
    "https://github.com/Alejandrojuarez0105",
    "https://www.linkedin.com/in/alejandro-emmanuel-juarez-hernandez",
  ],
  knowsAbout: [
    "Full Stack Development",
    "Database Design",
    "Software Analysis & Design",
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "PostgreSQL",
    "MongoDB",
    "Neo4j",
    "UML",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Santander",
    addressRegion: "Cantabria",
    addressCountry: "ES",
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Universidad Europea del Atlántico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <LanguageProvider>
          <Navbar />
          {children}
          <BackToTop />
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
