import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "SASHA General Contracting — building contractor and site crews in Abu Dhabi";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const mark = await readFile(join(process.cwd(), "public/sasha-mark-light.png"));
  const src = `data:image/png;base64,${mark.toString("base64")}`;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#121214",
          color: "#F4F3F0",
          padding: "72px 80px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={src} width={78} height={101} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: 4 }}>SASHA</div>
            <div style={{ fontSize: 22, color: "#A1A1A8", letterSpacing: 3 }}>GENERAL CONTRACTING</div>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ width: 96, height: 8, background: "#F26B1D" }} />
          <div style={{ fontSize: 64, fontWeight: 800, lineHeight: 1.08, maxWidth: 980 }}>
            Building works and skilled site crews for Abu Dhabi projects.
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "#A1A1A8" }}>
          <div>Licensed: All Kind Building Projects Contracting</div>
          <div>sashagc.com</div>
        </div>
      </div>
    ),
    size,
  );
}
