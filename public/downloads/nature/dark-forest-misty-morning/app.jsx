import Link from "next/link";
import { useEffect, useRef } from "react";

const VIDEO_SRC = "./video.mp4";

const CSS = `
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(1.5rem); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes drawUnderline {
    from { stroke-dashoffset: 220; }
    to   { stroke-dashoffset: 0; }
  }
  .anim-fade-in-up {
    opacity: 0;
    animation: fadeInUp 0.8s ease forwards;
  }
  .delay-200 { animation-delay: 0.2s; }
  .delay-400 { animation-delay: 0.4s; }
  .underline-path {
    stroke-dasharray: 220;
    stroke-dashoffset: 220;
    animation: drawUnderline 0.7s ease 1s forwards;
  }
  .video-mask {
    -webkit-mask-image: linear-gradient(to bottom, white 50%, transparent 99%);
    mask-image: linear-gradient(to bottom, white 50%, transparent 99%);
  }
  body { margin: 0; background: #000; overflow: hidden; height: 100dvh; }
`;

function Navbar() {
  return (
    <nav
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.5rem 3rem",
      }}
    >
      <Link href="/" style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem", textDecoration: "none" }}>
        openheros
      </Link>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        fontSize: '0.875rem',
        fontWeight: '500', 
        color: 'rgba(255, 255, 255, 0.7)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '9999px',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        padding: '1rem 2rem',
        backdropFilter: 'blur(8px)',
      }}>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Gallery</a>
        <a href="#" style={{ color: "inherit", textDecoration: "none" }}>Docs</a>
        <a href="https://github.com/cristianolivera1/openmotion" target="_blank" rel="noreferrer" style={{ color: "inherit", textDecoration: "none" }}>GitHub</a>
      </div>
      <a
        href="#"
        style={{
          background: "#fff",
          color: "#000",
          padding: "0.5rem 1rem",
          borderRadius: "0.5rem",
          fontSize: "0.875rem",
          fontWeight: 600,
          textDecoration: "none",
        }}
      >
        Get Started
      </a>
    </nav>
  );
}

function AnimatedUnderline() {
  return (
    <svg
      className="underline-path"
      style={{
        position: "absolute",
        bottom: "-0.25rem",
        left: 0,
        width: "100%",
      }}
      viewBox="0 0 100 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        className="underline-path"
        d="M0 6 Q25 1 50 5 Q75 9 100 4"
        stroke="#319197"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => { });
  }, []);

  return (
    <>
      <style>{CSS}</style>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100dvh",
          padding: "0.5rem",
          background: "#000",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", width: "100%", height: "100%", borderRadius: "2rem", overflow: "hidden" }}>

          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="video-mask"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "bottom",
              pointerEvents: "none",
            }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          <div
            style={{
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              opacity: 0.25,
              background: "linear-gradient(130deg, transparent 40%, transparent 50%, #319197 76.05%)",
              mixBlendMode: "screen",
            }}
          />

          <Navbar />

          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              zIndex: 20,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: "2rem",
              padding: "3rem",
            }}
          >
            <div className="anim-fade-in-up delay-200">
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
                  fontWeight: 500,
                  lineHeight: 1.1,
                  color: "#fff",
                  marginBottom: "1.5rem",
                }}
              >
                Pushing talent
                <br />
                <span style={{ color: "rgba(255,255,255,0.9)" }}>to new heights.</span>
              </h1>
            </div>

            <div
              className="anim-fade-in-up delay-400"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)",
                paddingTop: "1.5rem",
              }}
            >
              <p style={{ fontSize: "1.125rem", fontWeight: 300, color: "rgba(255,255,255,0.8)", maxWidth: "24rem" }}>
                Build your project and show your talent in{" "}
                <span style={{ position: "relative", display: "inline-block", whiteSpace: "nowrap", color: "#fff" }}>
                  3 weeks.
                  <AnimatedUnderline />
                </span>
              </p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
