export interface TemplateOptions {
  name: string;
  slug: string;
  videoSrc: string;
  category: string;
}

export function getNextjsCode({ name, slug, category }: TemplateOptions): string {
  return `/**
 * Hero – ${name}
 * 
 * Next.js App Router — zero extra dependencies.
 * Drop into: app/page.tsx  (or any route segment)
 *
 * Video: place ${slug}.mp4 at /public/videos/${category}/
 */
"use client";

import { useEffect, useRef } from "react";

const VIDEO_SRC = "/videos/${category}/${slug}.mp4";

function Navbar() {
  return (
    <nav className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-12">
      <a href="/" className="text-xl font-bold tracking-tighter text-white">
        MyApp
      </a>
      <div className="hidden items-center gap-8 text-sm font-medium text-white/70 md:flex">
        <a href="#" className="transition-colors hover:text-white">About</a>
        <a href="#" className="transition-colors hover:text-white">Work</a>
        <a href="#" className="transition-colors hover:text-white">Contact</a>
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

export default function HeroPage() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <>
      <style>{\`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(1.5rem); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up  { opacity: 0; animation: fadeInUp 0.8s ease forwards; }
        .delay-1  { animation-delay: 0.2s; }
        .delay-2  { animation-delay: 0.4s; }
      \`}</style>

      <main className="flex h-dvh items-center justify-center overflow-hidden bg-black p-2 md:p-4">
        <div className="relative h-full w-full overflow-hidden rounded-[2rem]">

          {/* Background video */}
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className="absolute inset-0 h-full w-full object-cover object-bottom pointer-events-none"
            style={{ maskImage: "linear-gradient(to bottom, white 55%, transparent 100%)" }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          {/* Accent colour overlay */}
          <div
            className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
            style={{ background: "linear-gradient(130deg, transparent 40%, #319197 100%)" }}
          />

          <Navbar />

          {/* Hero content */}
          <div className="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-8 p-6 md:p-12 lg:flex-row lg:items-end lg:justify-between">

            <div className="fade-up delay-1 max-w-3xl">
              <h1 className="mb-4 text-5xl font-medium leading-tight text-white md:text-7xl">
                Build something
                <br />
                <span className="text-white/80">extraordinary.</span>
              </h1>
            </div>

            <div className="fade-up delay-2 max-w-sm border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <p className="text-lg font-light text-white/70">
                A cinematic video hero — zero dependencies, ready to ship.
              </p>
              <a
                href="#"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-white/90"
              >
                Get Started →
              </a>
            </div>

          </div>
        </div>
      </main>
    </>
  );
}
`;
}

export function getReactCode({ name, slug, category }: TemplateOptions): string {
  return `/**
 * Hero – ${name}
 * ─────────────────────────────────────────────────────────────────────
 * Pure React — requires React 18+ and Tailwind CSS.
 * No other dependencies needed.
 *
 * Usage:
 *   import Hero from "./Hero.jsx";
 *   root.render(<Hero />);
 *
 * Video: place ${slug}.mp4 at /public/videos/${category}/
 */
import { useEffect, useRef } from "react";

const VIDEO_SRC = "/videos/${category}/${slug}.mp4";

const STYLES = \`
  @keyframes fadeInUp {
    from { opacity: 0; transform: translateY(1.5rem); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .fade-up { opacity: 0; animation: fadeInUp 0.8s ease forwards; }
  .delay-1 { animation-delay: 0.2s; }
  .delay-2 { animation-delay: 0.4s; }
  * { box-sizing: border-box; }
  body { margin: 0; overflow: hidden; height: 100dvh; background: #000; }
\`;

function Navbar() {
  return (
    <nav
      style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 30,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "1.5rem 3rem",
      }}
    >
      <a href="/" style={{ color: "#fff", fontWeight: 700, fontSize: "1.25rem", textDecoration: "none" }}>
        MyApp
      </a>
      <a
        href="#"
        style={{
          background: "#fff", color: "#000", padding: "0.5rem 1rem",
          borderRadius: "0.5rem", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
        }}
      >
        Get Started
      </a>
    </nav>
  );
}

export default function Hero() {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current?.play().catch(() => {});
  }, []);

  return (
    <>
      <style>{STYLES}</style>

      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          height: "100dvh", background: "#000", overflow: "hidden", padding: "0.5rem",
        }}
      >
        <div
          style={{
            position: "relative", width: "100%", height: "100%",
            borderRadius: "2rem", overflow: "hidden",
          }}
        >
          {/* Background video */}
          <video
            ref={videoRef}
            loop muted playsInline
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "bottom", pointerEvents: "none",
              maskImage: "linear-gradient(to bottom, white 55%, transparent 100%)",
            }}
          >
            <source src={VIDEO_SRC} type="video/mp4" />
          </video>

          {/* Accent overlay */}
          <div
            style={{
              position: "absolute", inset: 0, pointerEvents: "none",
              opacity: 0.2, mixBlendMode: "screen",
              background: "linear-gradient(130deg, transparent 40%, #319197 100%)",
            }}
          />

          <Navbar />

          {/* Content */}
          <div
            style={{
              position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 20,
              display: "flex", flexDirection: "column", gap: "2rem", padding: "3rem",
            }}
          >
            <div className="fade-up delay-1">
              <h1
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 4.5rem)", fontWeight: 500,
                  lineHeight: 1.1, color: "#fff", margin: 0, marginBottom: "1rem",
                }}
              >
                Build something<br />
                <span style={{ color: "rgba(255,255,255,0.8)" }}>extraordinary.</span>
              </h1>
            </div>

            <div
              className="fade-up delay-2"
              style={{
                borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "1.5rem", maxWidth: "24rem",
              }}
            >
              <p style={{ fontSize: "1.125rem", fontWeight: 300, color: "rgba(255,255,255,0.7)", margin: "0 0 1.5rem" }}>
                A cinematic video hero — zero dependencies, ready to ship.
              </p>
              <a
                href="#"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "0.5rem",
                  background: "#fff", color: "#000", padding: "0.75rem 1.5rem",
                  borderRadius: "0.75rem", fontSize: "0.875rem", fontWeight: 600, textDecoration: "none",
                }}
              >
                Get Started →
              </a>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
`;
}

export function getHtmlCode({ name, slug, category }: TemplateOptions): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Hero — ${name}</title>

  <!-- Tailwind CSS via CDN — no build step required -->
  <script src="https://cdn.tailwindcss.com"><\/script>

  <style>
    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(1.5rem); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .fade-up { opacity: 0; animation: fadeInUp 0.8s ease forwards; }
    .delay-1 { animation-delay: 0.2s; }
    .delay-2 { animation-delay: 0.4s; }
    body { margin: 0; overflow: hidden; height: 100dvh; background: #000; }
  </style>
</head>
<body>

  <!--
    Video: place ${slug}.mp4 at /videos/${category}/${slug}.mp4
    or update the <source src="..."> below.
  -->

  <div class="flex h-screen items-center justify-center overflow-hidden bg-black p-2 md:p-4">
    <div class="relative h-full w-full overflow-hidden rounded-[2rem]">

      <!-- Background video -->
      <video autoplay loop muted playsinline
        style="mask-image: linear-gradient(to bottom, white 55%, transparent 100%);"
        class="absolute inset-0 h-full w-full object-cover object-bottom pointer-events-none">
        <source src="/videos/${category}/${slug}.mp4" type="video/mp4" />
        Your browser does not support HTML5 video.
      </video>

      <!-- Accent colour overlay -->
      <div class="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
        style="background: linear-gradient(130deg, transparent 40%, #319197 100%);">
      </div>

      <!-- Navbar -->
      <nav class="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-6 md:px-12">
        <a href="/" class="text-xl font-bold tracking-tighter text-white no-underline">MyApp</a>
        <div class="hidden md:flex items-center gap-8 text-sm font-medium text-white/70">
          <a href="#" class="hover:text-white transition-colors">About</a>
          <a href="#" class="hover:text-white transition-colors">Work</a>
          <a href="#" class="hover:text-white transition-colors">Contact</a>
        </div>
        <a href="#"
          class="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black no-underline hover:bg-white/90 transition-colors">
          Get Started
        </a>
      </nav>

      <!-- Hero content -->
      <div class="absolute inset-x-0 bottom-0 z-20 flex flex-col gap-8 p-6 md:p-12 lg:flex-row lg:items-end lg:justify-between">

        <div class="fade-up delay-1 max-w-3xl">
          <h1 class="mb-4 text-5xl md:text-7xl font-medium leading-tight text-white">
            Build something<br />
            <span class="text-white/80">extraordinary.</span>
          </h1>
        </div>

        <div class="fade-up delay-2 max-w-sm border-t border-white/10 pt-6 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
          <p class="text-lg font-light text-white/70">
            A cinematic video hero — zero dependencies, ready to ship.
          </p>
          <a href="#"
            class="mt-6 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black no-underline hover:bg-white/90 transition-colors">
            Get Started →
          </a>
        </div>

      </div>
    </div>
  </div>

</body>
</html>
`;
}
