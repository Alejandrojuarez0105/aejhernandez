import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";

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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
