import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

export function OgCard({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#2a0910",
        color: "#fbf7f5",
        padding: "72px",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 28,
          letterSpacing: 4,
          color: "#f2709c",
        }}
      >
        {eyebrow}
      </div>
      <div
        style={{
          display: "flex",
          fontSize: title.length > 70 ? 52 : 68,
          lineHeight: 1.05,
          maxWidth: 980,
        }}
      >
        {title}
      </div>
      <div style={{ display: "flex", fontSize: 32, color: "#f6d6dc" }}>
        SUGARMENU · Indulge Yourself.
      </div>
    </div>
  );
}

export function ogImage(eyebrow: string, title: string) {
  return new ImageResponse(<OgCard eyebrow={eyebrow} title={title} />, ogSize);
}
