"use client";

import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";

type RevealId = "horizons" | "ecosystem" | "vantage" | "expeditions";

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState<Set<RevealId>>(new Set());
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const leaves = useMemo(
    () => [
      {
        left: "10%",
        className: "animate-leaf-fall-slow text-emerald-400 opacity-40",
        iconClassName: "text-3xl rotate-45",
        delay: "0s",
      },
      {
        left: "40%",
        className: "animate-leaf-fall-fast text-emerald-500 opacity-30",
        iconClassName: "text-2xl -rotate-12",
        delay: "2s",
      },
      {
        left: "70%",
        className: "animate-leaf-fall-slow text-amber-400 opacity-20",
        iconClassName: "text-4xl rotate-90",
        delay: "4s",
      },
      {
        left: "85%",
        className: "animate-leaf-fall-fast text-emerald-300 opacity-40",
        iconClassName: "text-xl rotate-180",
        delay: "1s",
      },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      const progress = Math.min(Math.max(y / window.innerHeight, 0), 1);
      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${1.05 + progress * 0.15}) translateY(${progress * 40}px)`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          const next = new Set(prev);
          for (const entry of entries) {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("data-reveal-id") as RevealId | null;
              if (id) next.add(id);
              observer.unobserve(entry.target);
            }
          }
          return next;
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll("[data-reveal-id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const revealClass = (id: RevealId) => (revealed.has(id) ? "reveal-up active" : "reveal-up");

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#05090e] text-slate-50 antialiased selection:bg-sky-500 selection:text-white">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background-color: #05090e;
          color: #f8fafc;
          font-family: "Plus Jakarta Sans", sans-serif;
        }

        .font-display {
          font-family: "Syne", sans-serif;
        }

        .font-sans-ui {
          font-family: "Plus Jakarta Sans", sans-serif;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #05090e;
        }

        ::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #334155;
        }

        .cinematic-vignette {
          background: radial-gradient(circle at 50% 50%, transparent 10%, rgba(5, 9, 14, 0.3) 50%, #05090e 95%);
        }

        .glass-card {
          background: rgba(12, 20, 31, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.06);
        }

        .glass-card:hover {
          border-color: rgba(56, 189, 248, 0.2);
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .text-gradient-sun {
          background: linear-gradient(135deg, #fff 30%, #f59e0b 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .leaf-particle {
          position: absolute;
          pointer-events: none;
          z-index: 1;
        }

        @keyframes leafFall {
          0% {
            transform: translateY(-10vh) translateX(-5vw) rotate(0deg) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(110vh) translateX(25vw) rotate(720deg) scale(1);
            opacity: 0;
          }
        }

        .animate-leaf-fall-slow {
          animation: leafFall 12s linear infinite;
        }

        .animate-leaf-fall-fast {
          animation: leafFall 7s linear infinite;
        }

        .reveal-up {
          opacity: 0;
          transform: translateY(50px);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-up.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover opacity-60 transition-transform duration-1000 ease-out"
          style={{ willChange: "transform" }}
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 cinematic-vignette" />

        {leaves.map((leaf, index) => (
          <div
            key={index}
            className={`leaf-particle ${leaf.className}`}
            style={{
              top: "0",
              left: leaf.left,
              animationDelay: leaf.delay,
            }}
          >
            <Icon icon="ph:leaf-fill" className={leaf.iconClassName} />
          </div>
        ))}
      </div>

      <nav
        id="main-nav"
        className={[
          "fixed top-0 z-50 w-full border-b border-white/5 bg-[#0c141f]/20 backdrop-blur-md transition-all duration-300",
          scrolled ? "bg-[#0c141f]/80 shadow-xl" : "",
        ].join(" ")}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#" className="group flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-sky-500 to-emerald-400 shadow-lg shadow-sky-500/20">
              <Icon icon="roentgen:wind-turbine" className="text-xl text-[#0c141f]" />
            </div>
            <span className="bg-gradient-to-r from-white to-white/70 bg-clip-text text-xl font-extrabold tracking-wider text-transparent font-display uppercase">
              Aetheris
            </span>
          </a>

          <div className="hidden items-center gap-8 text-xs font-semibold uppercase tracking-[0.2em] text-slate-300 md:flex font-sans-ui">
            <a href="#horizons" className="transition-colors hover:text-sky-400">
              Horizons
            </a>
            <a href="#ecosystem" className="transition-colors hover:text-sky-400">
              Ecosystem
            </a>
            <a href="#vantage" className="transition-colors hover:text-sky-400">
              Vantage Points
            </a>
            <a href="#expeditions" className="transition-colors hover:text-sky-400">
              Expeditions
            </a>
          </div>

          <div>
            <button className="rounded-full border border-white/10 bg-white/10 px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-white hover:text-[#0c141f] font-sans-ui">
              Launch Odyssey
            </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10">
        <section className="mx-auto flex min-h-screen max-w-7xl items-center justify-start px-6 pt-20">
          <div className="max-w-3xl space-y-8">
            <h1 className="text-5xl font-black uppercase leading-[0.9] tracking-tight sm:text-7xl font-display text-gradient-sun">
              Where the winds <br />
              <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">
                meet tranquility.
              </span>
            </h1>

            <p className="max-w-xl text-base font-light leading-relaxed text-slate-300/80 sm:text-lg font-sans-ui">
              Immerse yourself in wide open spaces framed by rolling ridges, high mountain passes, and sweeping emerald lakes. Watch the world unfold as elements drift naturally across the sky.
            </p>

            <div className="flex flex-col gap-4 pt-4 sm:flex-row">
              <a
                href="#horizons"
                className="rounded-full bg-gradient-to-r from-sky-500 to-emerald-500 px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-white shadow-xl shadow-sky-500/10 transition-all duration-300 hover:from-sky-600 hover:to-emerald-600 font-sans-ui"
              >
                Explore Frontiers
              </a>
              <button className="flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-widest text-white transition-all hover:bg-white/10 font-sans-ui">
                <Icon icon="ph:play-fill" className="text-base text-emerald-400" />
                Watch Stream
              </button>
            </div>
          </div>
        </section>

        <section id="horizons" data-reveal-id="horizons" className={`${revealClass("horizons")} mx-auto max-w-7xl px-6 py-32`}>
          <div className="mb-20 grid items-end gap-12 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <span className="block text-xs font-bold uppercase tracking-[0.4em] text-sky-400 font-sans-ui">
                Vast Dimensions
              </span>
              <h2 className="text-4xl font-extrabold uppercase text-white sm:text-5xl font-display">
                The Anatomy of Scale
              </h2>
            </div>
            <div className="lg:col-span-5">
              <p className="text-sm font-light leading-relaxed text-slate-400 font-sans-ui">
                Every valley is constructed around dynamic fluid grids. Terrains respond directly to atmospheric criteria, balancing pristine mountain topology with dense, whispering tree lines.
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="glass-card group rounded-3xl p-8 transition-all duration-500">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-500/20 bg-sky-500/10 transition-transform group-hover:scale-110">
                <Icon icon="ph:mountains-fill" className="text-2xl text-sky-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold uppercase text-white font-display">
                Ridge Formations
              </h3>
              <p className="text-sm font-light leading-relaxed text-slate-400 font-sans-ui">
                High-altitude peaks generated using noise metrics that replicate tectonic pressures, creating sheer drop-offs and jagged, striking profiles.
              </p>
            </div>

            <div className="glass-card group rounded-3xl p-8 transition-all duration-500">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 transition-transform group-hover:scale-110">
                <Icon icon="ph:waves-fill" className="text-2xl text-emerald-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold uppercase text-white font-display">
                Resin Lakes
              </h3>
              <p className="text-sm font-light leading-relaxed text-slate-400 font-sans-ui">
                Expansive internal reservoirs utilizing screen-space reflections to mirror clouds, sweeping slopes, and shifting environmental illumination.
              </p>
            </div>

            <div className="glass-card group rounded-3xl p-8 transition-all duration-500">
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/20 bg-amber-500/10 transition-transform group-hover:scale-110">
                <Icon icon="ph:wind-fill" className="text-2xl text-amber-400" />
              </div>
              <h3 className="mb-3 text-xl font-bold uppercase text-white font-display">
                Aether Currents
              </h3>
              <p className="text-sm font-light leading-relaxed text-slate-400 font-sans-ui">
                Real-time vector forces tracking leaf-drift and moisture dispersion, ensuring that every natural entity reacts predictably to background wind speed.
              </p>
            </div>
          </div>
        </section>

        <section id="ecosystem" data-reveal-id="ecosystem" className={`${revealClass("ecosystem")} relative overflow-hidden border-y border-white/5 bg-[#0c141f]/30 py-20`}>
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-sky-600/5 to-emerald-500/5" />
          <div className="mx-auto grid max-w-7xl gap-16 px-6 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                <Icon icon="ph:tree-evergreen-fill" className="text-lg text-emerald-400" />
              </div>
              <h2 className="text-4xl font-extrabold uppercase leading-tight text-white sm:text-5xl font-display">
                Environmental <br />
                Cohesion Layer
              </h2>
              <p className="font-light leading-relaxed text-slate-300 font-sans-ui">
                The interface behaves like terrain: ridges overlap, valleys frame focus, and every element is integrated directly into the greater ecosystem. Content scales with wide landscapes, anchoring components gracefully against cinematic backdrops.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="border-l-2 border-emerald-500 pl-4">
                  <div className="text-2xl font-bold font-display text-white">94.2%</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate-400 font-sans-ui">
                    Biotope Density
                  </div>
                </div>
                <div className="border-l-2 border-sky-400 pl-4">
                  <div className="text-2xl font-bold font-display text-white">0.03ms</div>
                  <div className="mt-1 text-xs uppercase tracking-wider text-slate-400 font-sans-ui">
                    Wind Vector Latency
                  </div>
                </div>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="group relative h-80 w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-tr from-sky-600/20 to-emerald-500/20 p-6 shadow-2xl backdrop-blur-xl">
                <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-transparent to-[#0c141f]" />
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-sky-400 animate-ping" />
                    <span className="font-mono text-xs text-sky-300">Live Horizon Feed</span>
                  </div>
                  <Icon icon="ph:activity-fill" className="animate-pulse text-slate-400" />
                </div>
                <div className="relative z-20 space-y-4 font-mono text-xs text-slate-400">
                  <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                    <span className="text-emerald-400">root@aetheris:~$</span> wind-vector --analyze
                    <p className="mt-1 text-slate-500">Velocity matches standard alpine draft (14kn)</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-black/40 p-3">
                    <span className="text-emerald-400">root@aetheris:~$</span> terrain-render --status
                    <p className="mt-1 text-sky-400">Lake reflection cache optimized (1080p stream)</p>
                  </div>
                  <div className="rounded-xl border border-white/5 bg-black/40 p-3 text-center text-[10px] font-bold uppercase tracking-widest text-amber-400 animate-pulse font-sans-ui">
                    Horizon Matrix Steady
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="vantage" data-reveal-id="vantage" className={`${revealClass("vantage")} mx-auto max-w-7xl px-6 py-32`}>
          <div className="mx-auto mb-20 max-w-2xl space-y-4 text-center">
            <span className="block text-xs font-bold uppercase tracking-[0.4em] text-emerald-400 font-sans-ui">
              Curated Viewports
            </span>
            <h2 className="text-4xl font-extrabold uppercase text-white sm:text-5xl font-display">
              Vantage Points
            </h2>
            <p className="text-sm font-light text-slate-400 font-sans-ui">
              Select a geographical node to recalibrate the atmospheric overlay. Each sector presents distinct cloud configurations and unique lighting parameters.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                sector: "Sector 01",
                title: "Emerald Basin",
                description: "Deep shoreline focus flanked by ancient copper forests under high-contrast skies.",
                coords: "42° N, 19° E",
                accent: "text-sky-400",
              },
              {
                sector: "Sector 02",
                title: "Solis Ridge",
                description: "Peak configuration optimized for golden hour saturation and intense lens bloom.",
                coords: "35° N, 112° W",
                accent: "text-emerald-400",
              },
              {
                sector: "Sector 03",
                title: "Aether Pass",
                description: "High-velocity wind lane featuring constant particle density and active leaf-drift vectors.",
                coords: "12° S, 74° W",
                accent: "text-amber-400",
              },
              {
                sector: "Sector 04",
                title: "Basalt Terraces",
                description: "Dark layered volcanic rock shelves meeting misty lowlands with minimal color grading.",
                coords: "64° N, 21° W",
                accent: "text-white/40",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="glass-card flex h-96 flex-col justify-between overflow-hidden rounded-2xl p-6 transition-all duration-300"
              >
                <div>
                  <div className={`mb-1 text-[10px] font-bold uppercase tracking-widest ${item.accent} font-sans-ui`}>
                    {item.sector}
                  </div>
                  <h3 className="mb-2 text-xl font-bold uppercase text-white font-display">
                    {item.title}
                  </h3>
                  <p className="text-xs font-light leading-relaxed text-slate-400 font-sans-ui">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-6">
                  <span className="font-mono text-xs text-slate-500">{item.coords}</span>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-white transition-all hover:bg-white hover:text-[#0c141f]">
                    <Icon icon="ph:arrow-up-right-bold" className="text-sm" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="expeditions" data-reveal-id="expeditions" className={`${revealClass("expeditions")} relative overflow-hidden bg-[#0c141f]/20 py-20`}>
          <div className="relative z-10 mx-auto max-w-5xl space-y-8 px-6 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 animate-bounce">
              <Icon icon="ph:sketch-logo-fill" className="text-xl text-sky-400" />
            </div>
            <h2 className="mx-auto max-w-3xl text-4xl font-black uppercase leading-tight text-white sm:text-6xl font-display">
              Synchronize with <br />
              the mountain core.
            </h2>
            <p className="mx-auto max-w-xl text-base font-light leading-relaxed text-slate-400 font-sans-ui">
              Subscribe to receive vector adjustments, geographical telemetry updates, and exclusive entry credentials to high-altitude sandbox enclaves.
            </p>

            <div className="mx-auto max-w-md pt-4">
              <form className="flex flex-col gap-3 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter proxy destination email..."
                  className="w-full rounded-full border border-white/10 bg-[#0c141f]/60 px-6 py-4 text-xs text-white placeholder:text-slate-500 backdrop-blur-md focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 font-sans-ui"
                />
                <button
                  type="submit"
                  className="rounded-full bg-white px-8 py-4 text-xs font-bold uppercase tracking-wider text-[#0c141f] shadow-lg transition-all duration-300 hover:bg-sky-400 hover:text-white font-sans-ui"
                >
                  Secure Entry
                </button>
              </form>
            </div>
          </div>
          <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-full max-w-5xl -translate-x-1/2 bg-gradient-to-t from-sky-500/10 to-transparent blur-3xl" />
        </section>

        <footer className="border-t border-white/5 bg-[#03060a] px-6 pb-12 pt-24">
          <div className="mx-auto mb-16 grid max-w-7xl gap-16 md:grid-cols-[1.5fr_2fr]">
            <div className="space-y-6">
              <a href="#" className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-sky-500 to-emerald-400">
                  <Icon icon="ph:compass-safari-fill" className="text-base text-[#0c141f]" />
                </div>
                <span className="text-lg font-extrabold tracking-wider text-white font-display uppercase">
                  Aetheris
                </span>
              </a>
              <p className="max-w-sm text-xs font-light leading-relaxed text-slate-400 font-sans-ui">
                Building responsive, highly-immersive macro environments. Formed along the ridge lines where wind current vector logic models meet absolute clarity.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:bg-white/5 hover:text-sky-400"
                >
                  <Icon icon="ph:instagram-logo-light" className="text-lg" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:bg-white/5 hover:text-sky-400"
                >
                  <Icon icon="ph:discord-logo-light" className="text-lg" />
                </a>
                <a
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-slate-400 transition-colors hover:bg-white/5 hover:text-sky-400"
                >
                  <Icon icon="ph:github-logo-light" className="text-lg" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Topography</h4>
                <ul className="space-y-2.5 text-xs font-light text-slate-400 font-sans-ui">
                  <li><a href="#" className="transition-colors hover:text-white">Ridge Builder</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Resin Vectors</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Noise Generation</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Elevation API</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Atmosphere</h4>
                <ul className="space-y-2.5 text-xs font-light text-slate-400 font-sans-ui">
                  <li><a href="#" className="transition-colors hover:text-white">Leaf Physics</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Cloud Coverage</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Solis Shaders</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Vector Maps</a></li>
                </ul>
              </div>
              <div className="col-span-2 space-y-4 sm:col-span-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-display">Odyssey</h4>
                <ul className="space-y-2.5 text-xs font-light text-slate-400 font-sans-ui">
                  <li><a href="#" className="transition-colors hover:text-white">Alpine Nodes</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Basalt Basins</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Grid Protocols</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] uppercase tracking-widest text-slate-500 sm:flex-row font-sans-ui">
            <p>&copy; 2026 Aetheris Dynamics. All horizons preserved.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-slate-300">
                Telemetry Node
              </a>
              <a href="#" className="transition-colors hover:text-slate-300">
                Atmospheric Law
              </a>
            </div>
          </div>
        </footer>
      </main>
    </main>
  );
}