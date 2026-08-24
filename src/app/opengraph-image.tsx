import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
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
          background: "#0F172A",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#2563EB",
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            PE
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, letterSpacing: 2, color: "#94A3B8" }}>
            PRIMEEDGE SOFTWARE INSTITUTE
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, marginTop: 48, lineHeight: 1.1 }}>
          Build Skills.
        </div>
        <div style={{ display: "flex", fontSize: 72, fontWeight: 700, color: "#2563EB", lineHeight: 1.1 }}>
          Build Careers.
        </div>
      </div>
    ),
    { ...size },
  );
}
