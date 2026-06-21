import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { LanguageProvider } from "@/lib/language-context";

export const metadata: Metadata = {
  metadataBase: new URL("https://aejhernandez.vercel.app"),
  title: "Alejandro Emmanuel Juárez Hernández — Full Stack Developer",
  description:
    "Full Stack Developer & Database Engineer. Construyo soluciones completas: backend sólido, frontend limpio y bases de datos bien modeladas.",
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
    url: "https://aejhernandez.vercel.app",
    siteName: "aehernandez.dev",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
