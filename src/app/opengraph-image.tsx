import { ImageResponse } from "next/og";

export const alt = "Proactive Medical and Wellness Center";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          position: "relative",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#faf8f4",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -80,
            left: -80,
            width: 360,
            height: 360,
            borderRadius: 180,
            backgroundColor: "#e3ede6",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 420,
            height: 420,
            borderRadius: 210,
            backgroundColor: "#f2e4cd",
          }}
        />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              height: 120,
              borderRadius: 60,
              backgroundColor: "#e3ede6",
              marginBottom: 40,
            }}
          >
            <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
              <path d="M20 33V17" stroke="#46704f" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M20 22c0-5.2 4-8.6 8.5-9-1 5-4.3 8.6-8.5 9Z" fill="#5a8d71" />
              <path d="M20 18c0-4.6-3.6-7.6-7.5-8 .9 4.4 3.9 7.6 7.5 8Z" fill="#c99a5f" />
            </svg>
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 56,
              fontWeight: 700,
              color: "#292521",
              textAlign: "center",
              padding: "0 80px",
            }}
          >
            Proactive Medical and Wellness
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 20,
              fontSize: 30,
              color: "#46704f",
              textAlign: "center",
            }}
          >
            Accessible Care for Mind, Body, &amp; Community
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
