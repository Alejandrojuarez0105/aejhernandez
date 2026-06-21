import { ImageResponse } from "next/og";

// Favicon generado dinámicamente con el tema del sitio
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020d18",
          color: "#ff8800",
          fontSize: 24,
          fontWeight: 700,
          borderRadius: 6,
          border: "1px solid #1e3a5f",
        }}
      >
        A
      </div>
    ),
    { ...size },
  );
}
