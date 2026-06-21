import { ImageResponse } from "next/og";

// Imagen Open Graph generada dinámicamente (se usa al compartir el link).
// Diseño CENTRADO: aunque WhatsApp recorte a un cuadrado central, el recorte
// captura el badge "A" + nombre limpiamente, igual que el favicon.
export const alt =
  "Alejandro Emmanuel Juárez Hernández — Full Stack Developer & Database Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "60px",
          background: "#020d18",
          backgroundImage:
            "radial-gradient(700px circle at 50% -5%, rgba(255,136,0,0.18), transparent 60%), radial-gradient(600px circle at 50% 105%, rgba(125,211,252,0.08), transparent 60%)",
          color: "#e2f0ff",
          fontFamily: "monospace",
        }}
      >
        {/* Badge "A" — elemento central (mismo estilo que el favicon) */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 130,
            height: 130,
            borderRadius: 26,
            background: "#020d18",
            border: "3px solid #1e3a5f",
            color: "#ff8800",
            fontSize: 84,
            fontWeight: 700,
            boxShadow: "0 0 60px rgba(255,136,0,0.25)",
          }}
        >
          A
        </div>

        {/* Dominio */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginTop: 26,
            color: "#94a3b8",
            fontSize: 26,
            letterSpacing: 4,
          }}
        >
          <span style={{ color: "#ff8800" }}>{"$"}</span>
          aejhernandez.dev
        </div>

        {/* Nombre */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginTop: 28,
            fontSize: 58,
            fontWeight: 700,
            lineHeight: 1.1,
          }}
        >
          <span>Alejandro Emmanuel</span>
          <span style={{ color: "#ff8800" }}>Juárez Hernández</span>
        </div>

        {/* Rol */}
        <div
          style={{
            marginTop: 26,
            fontSize: 28,
            color: "#ff8800",
            letterSpacing: 1,
          }}
        >
          {"// Full Stack Developer & Database Engineer"}
        </div>
      </div>
    ),
    { ...size },
  );
}
