"use client";

import Link from "next/dist/client/link";
import { useEffect, useRef } from "react";

const VIDEO_SRC = "/videos/dark-forest-misty-morning.mp4";

function Navbar() {
  return (
    <nav className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-12">
      <Link href="/" className="text-xl font-bold tracking-tighter text-white">
        openheros
      </Link>
        <div className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex border border-white/20 rounded-full bg-white/10 px-8 py-4">
        <a href="#" className="transition-colors hover:text-white">Gallery</a>
        <a href="#" className="transition-colors hover:text-white">Docs</a>
        <a href="https://github.com/cristianolivera1/openmotion" target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
          GitHub
        </a>
      </div>
      <a
        href="#"
        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
      >
        Get Started
      </a>
    </nav>
  );
}

function AnimatedUnderline() {
  return (
    <svg
      className="absolute -bottom-1 left-0 w-full [stroke-dasharray:220] [stroke-dashoffset:220] [animation:draw-underline_0.7s_ease_1s_forwards]"
      viewBox="0 0 100 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path
        d="M0 6 Q25 1 50 5 Q75 9 100 4"
        stroke="#319197"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default function HeroPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(1.5rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes draw-underline {
          from { stroke-dashoffset: 220; }
          to   { stroke-dashoffset: 0; }
        }
        .anim-fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease forwards;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>

      <main className="flex h-dvh items-center justify-center overflow-hidden bg-black p-2 md:p-4">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem]">

          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover object-bottom pointer-events-none [mask-image:linear-gradient(to_bottom,white_50%,transparent_99%)]"
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          <div
            className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen"
            style={{
              background:
                "linear-gradient(130deg, transparent 40%, transparent 50%, #319197 76.05%)",
            }}
          />

          <Navbar />

          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col justify-between gap-8 p-6 md:p-12 lg:flex-row lg:items-end">

            <div className="anim-fade-in-up delay-200 max-w-3xl">
              <h1 className="mb-6 text-5xl font-medium leading-[1.1] text-white md:text-7xl">
                Pushing talent
                <br />
                <span className="text-white/90">to new heights.</span>
              </h1>
            </div>

            <div className="anim-fade-in-up delay-400 flex w-full flex-col items-start gap-6 border-t border-white/10 pt-6 sm:flex-row sm:items-center lg:w-auto lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="max-w-sm text-lg font-light text-white/80">
                Build your project and show your talent in{" "}
                <span className="relative inline-block whitespace-nowrap text-white">
                  3 weeks.
                  <AnimatedUnderline />
                </span>
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
