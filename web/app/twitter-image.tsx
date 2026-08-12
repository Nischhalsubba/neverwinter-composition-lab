import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Neverwinter Composition Lab social preview";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function TwitterImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "56px",
          background: "#CAF0F8",
          color: "#03045E",
          fontFamily: "Inter, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
          }}
        >
          <div style={{ flex: 1, background: "#03045E" }} />
          <div style={{ flex: 1, background: "#0077B6" }} />
          <div style={{ flex: 1, background: "#00B4D8" }} />
          <div style={{ flex: 1, background: "#90E0EF" }} />
          <div style={{ flex: 1, background: "#CAF0F8" }} />
        </div>

        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(202,240,248,0.78) 0%, rgba(202,240,248,0.62) 35%, rgba(144,224,239,0.4) 100%)",
          }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
            }}
          >
            <div
              style={{
                width: "72px",
                height: "72px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "3px solid #03045E",
                background: "#90E0EF",
                fontSize: "30px",
                fontWeight: 800,
              }}
            >
              NW
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
              }}
            >
              <div
                style={{
                  fontSize: "18px",
                  letterSpacing: "0.28em",
                  textTransform: "uppercase",
                  opacity: 0.88,
                }}
              >
                Endgame Team Planner
              </div>
              <div
                style={{
                  fontSize: "62px",
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.06em",
                  textTransform: "uppercase",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <span>Neverwinter</span>
                <span>Composition Lab</span>
              </div>
            </div>
          </div>

          <div
            style={{
              maxWidth: "900px",
              fontSize: "28px",
              lineHeight: 1.4,
              color: "#03045E",
            }}
          >
            Plan stronger dungeon and trial teams with transparent buff, debuff, artifact, companion, and mount coverage.
          </div>
        </div>

        <div
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "14px",
              flexWrap: "wrap",
            }}
          >
            {["Team Builder", "Boss Debuffs", "Artifacts", "Companions", "Mounts"].map((label) => (
              <div
                key={label}
                style={{
                  border: "2px solid #03045E",
                  background: "#BDE0FE",
                  padding: "10px 16px",
                  fontSize: "20px",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                {label}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            neverwinter-composition-lab.vercel.app
          </div>
        </div>
      </div>
    ),
    size,
  );
}
