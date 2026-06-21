import { ImageResponse } from "next/og";

// Imagen Open Graph generada dinámicamente (se usa al compartir el link)
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
          justifyContent: "center",
          padding: "80px",
          background: "#020d18",
          backgroundImage:
            "radial-gradient(900px circle at 15% 0%, rgba(255,136,0,0.18), transparent 55%), radial-gradient(700px circle at 100% 100%, rgba(125,211,252,0.10), transparent 55%)",
          color: "#e2f0ff",
          fontFamily: "monospace",
        }}
      >
        {/* Fila superior: badge "A" + dominio */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
          }}
        >
          {/* Badge "A" (mismo estilo que el favicon) */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64,
              height: 64,
              borderRadius: 12,
              background: "#020d18",
              border: "2px solid #1e3a5f",
              color: "#ff8800",
              fontSize: 40,
              fontWeight: 700,
            }}
          >
            A
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              color: "#94a3b8",
              fontSize: 26,
              letterSpacing: 4,
            }}
          >
            <span style={{ color: "#ff8800" }}>{"$"}</span>
            aejhernandez.dev
          </div>
        </div>

        {/* Nombre */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: 32,
            fontSize: 78,
            fontWeight: 700,
            lineHeight: 1.05,
          }}
        >
          <span>Alejandro Emmanuel</span>
          <span style={{ color: "#ff8800" }}>Juárez Hernández</span>
        </div>

        {/* Rol */}
        <div
          style={{
            marginTop: 36,
            fontSize: 34,
            color: "#ff8800",
            letterSpacing: 2,
          }}
        >
          {"// Full Stack Developer & Database Engineer"}
        </div>

        {/* Línea inferior */}
        <div
          style={{
            marginTop: 28,
            fontSize: 26,
            color: "#94a3b8",
            maxWidth: 900,
          }}
        >
          Backend sólido, frontend limpio, datos bien modelados.
        </div>
      </div>
    ),
    { ...size },
  );
}
