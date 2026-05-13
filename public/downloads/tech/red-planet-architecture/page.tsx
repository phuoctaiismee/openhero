"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { Cormorant_Garamond, Inter_Tight } from "next/font/google";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = heroVideoRef.current;
    if (!video) return;

    const updateHero = () => {
      const max = window.innerHeight * 1.2;
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1);
      
      const scale = 1.08 + progress * 0.16;
      const translateY = progress * 16;
      
      video.style.transform = `scale(${scale}) translateY(${translateY}px)`;
    };

    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        updateHero();
        raf = 0;
      });
    };

    updateHero();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateHero);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("active");
        });
      },
      { threshold: 0.16 }
    );

    document.querySelectorAll(".bloom").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateHero);
      observer.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      className={`${interTight.className} relative min-h-screen overflow-x-hidden bg-[radial-gradient(circle_at_20%_10%,rgba(255,148,70,.14),transparent_18%),radial-gradient(circle_at_80%_15%,rgba(125,88,255,.11),transparent_18%),linear-gradient(180deg,oklch(8%_0.02_280)_0%,oklch(6%_0.02_280)_50%,oklch(5%_0.02_280)_100%)] text-white`}
    >
      {/* Background Ambience */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[8%] top-[-10rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(255,148,70,.14),transparent_72%)] blur-3xl" />
        <div className="absolute bottom-[-12rem] right-[10%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(125,88,255,.12),transparent_72%)] blur-3xl" />
        <div className="grid-noise absolute inset-0" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8">
        <div className="hud mx-auto grid max-w-[1700px] grid-cols-[1fr_auto_1fr] items-center rounded-[2rem] px-5 py-4">
          <div className="flex items-center gap-4">
            <div className="hex grid h-12 w-12 place-items-center">
              <Icon icon="ph:rocket-launch-bold" className="text-2xl text-[#ff9b52]" />
            </div>
            <div className="leading-tight">
              <div className="text-[11px] uppercase tracking-[0.34em] text-white/45">Ares Logistics</div>
              <div className="text-sm text-white/72">Red Planet Infrastructure</div>
            </div>
          </div>

          <div className="orbtag hidden items-center gap-3 rounded-full px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/55 md:flex">
            <span className="h-2 w-2 rounded-full bg-[#ff9b52] shadow-[0_0_18px_rgba(255,155,82,.8)]" />
            Orbital resonance stable · Ion-propulsion telemetry live
          </div>

          <div className="flex items-center justify-end gap-3">
            <button type="button" className="aero px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] text-white/90">
              <span className="aero-shine" aria-hidden="true" />
              Mission feed
            </button>
            <button type="button" className="aero px-5 py-2.5 text-[11px] uppercase tracking-[0.24em] text-white/90">
              <span className="aero-shine" aria-hidden="true" />
              Launch window
            </button>
          </div>
        </div>
      </header>

      <main className="relative pt-[94px]">
        <section className="relative min-h-[100svh] overflow-hidden">
          <div className="absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_35%,rgba(255,255,255,.02),rgba(0,0,0,.12)_44%,rgba(0,0,0,.38)_100%)]" />
          <div className="hero-shell absolute inset-0 z-0">
            <video
              ref={heroVideoRef}
              autoPlay
              muted
              loop
              playsInline
              className="hero-video absolute inset-0 h-full w-full object-cover brightness-[0.8]"
              style={{ willChange: "transform" }}
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative z-10 mx-auto flex min-h-[calc(100svh-94px)] max-w-[1700px] items-center px-6 md:px-10">
            <div className="max-w-3xl">
              <div className="bloom inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] uppercase tracking-[0.3em] text-white/65 backdrop-blur-[40px] contrast-[1.1]">
                <span className="h-2 w-2 rounded-full bg-[#ff9b52] shadow-[0_0_18px_rgba(255,155,82,.8)]" />
                Martian habitation systems online
              </div>

              <h1 className={`${cormorant.className} bloom mega-title mt-8 text-[clamp(4rem,10vw,9rem)] leading-[.84] text-white`}>
                <span className="pulse-text block">Ares <br /></span>
                <span className="pulse-text block">Logistics</span>
              </h1>

              <p className="bloom mt-8 max-w-2xl rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 text-lg leading-9 text-white/70 backdrop-blur-[40px] contrast-[1.1]">
                An interplanetary operations platform for regolith 3D printing, atmospheric scrubbers, perchlorate
                remediation, and ion-propulsion telemetry.
              </p>

              <div className="bloom mt-10 flex flex-wrap gap-4">
                <button type="button" className="aero rounded-full px-8 py-5 text-[11px] uppercase tracking-[0.25em] text-white">
                  <span className="aero-shine" aria-hidden="true" />
                  Deploy habitat
                </button>
                <button type="button" className="rounded-full border border-white/10 bg-white/[0.03] px-8 py-5 text-[11px] uppercase tracking-[0.25em] text-white/75 backdrop-blur-[40px] transition hover:bg-white/[0.05]">
                  View logistics map
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="ridges relative px-6 py-24 md:px-10">
          <div className="mx-auto grid max-w-[1700px] gap-10 lg:grid-cols-[.88fr_1.12fr] lg:items-start">
            <div className="bloom sticky top-28 self-start">
              <div className="text-[11px] uppercase tracking-[0.32em] text-white/40">Side-scrub</div>
              <h2 className={`${cormorant.className} mt-5 max-w-lg text-[clamp(2.7rem,5vw,5.2rem)] leading-[.9] text-white`}>
                Edge-fed telemetry for long-duration Martian operations.
              </h2>
              <p className="mt-6 max-w-md text-base leading-8 text-white/66">
                The first terrain layer focuses on critical logistics: air, water, power, and fabrication across
                unstable orbital windows.
              </p>
            </div>

            <div className="relative">
              <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(255,148,70,.16),transparent_70%)] blur-3xl" />
              <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(125,88,255,.14),transparent_70%)] blur-3xl" />

              <div className="mt-8 grid gap-4 lg:grid-cols-2">
                <article className="bloom hex overflow-hidden p-0 lg:col-span-2">
                  <div className="grid gap-0 lg:grid-cols-[.95fr_1.05fr]">
                    <div className="p-6 lg:p-8">
                      <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Perchlorate remediation</div>
                      <h3 className="mt-4 text-3xl font-semibold text-white">Soil recovery systems</h3>
                      <p className="mt-4 text-sm leading-7 text-white/65">
                        Restoring local terrain for safe cultivation, surface work, and modular settlement expansion.
                      </p>
                    </div>
                    <div className="min-h-[220px] rounded-b-[1.5rem] rounded-r-[1.5rem] bg-[radial-gradient(circle_at_30%_30%,rgba(255,148,70,.28),transparent_18%),radial-gradient(circle_at_70%_40%,rgba(125,88,255,.22),transparent_20%),linear-gradient(180deg,rgba(255,255,255,.04),rgba(0,0,0,.22))] lg:rounded-l-none lg:rounded-tr-[1.5rem]" />
                  </div>
                </article>

                <article className="bloom fracture overflow-hidden p-6">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Habitat pressure</div>
                  <div className="mt-5 text-5xl font-semibold text-[#ff9b52]">1.2 bar</div>
                  <p className="mt-4 text-sm leading-7 text-white/65">
                    A stable interior climate for sealed living volumes and industrial corridors.
                  </p>
                </article>

                <article className="bloom fracture overflow-hidden p-6">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/45">Water reserve</div>
                  <div className="mt-5 text-5xl font-semibold text-white">86%</div>
                  <p className="mt-4 text-sm leading-7 text-white/65">
                    Closed-loop storage with scrubbed intake and monitored redistribution.
                  </p>
                </article>
              </div>
            </div>
          </div>
        </section>

        <section className="ridges relative px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[1700px]">
            <div className="bloom mx-auto flex max-w-4xl flex-col items-center text-center">
              <div className="mt-4 text-[11px] uppercase tracking-[0.32em] text-white/40">Core-focus</div>
              <h2 className={`${cormorant.className} mt-5 text-[clamp(2.8rem,5vw,5.8rem)] leading-[.9] text-white`}>
                Central systems with a circular reveal.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/66">
                A single habitat core orchestrates energy, logistics, and atmospheric support through a focused radial
                interface.
              </p>
            </div>

            <div className="mt-14 flex justify-center">
              <div className="core-ring bloom">
                <div className="absolute inset-0 grid place-items-center p-8">
                  <div className="hud w-full rounded-[999px] p-8 text-center">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">Habitat Core 03</div>
                    <div className={`${cormorant.className} mt-4 text-5xl text-white`}>Central Command</div>
                    <div className="mt-4 grid gap-3 sm:grid-cols-3">
                      <div className="orbtag rounded-full px-4 py-3 text-sm text-white/75">Oxygen 99.8%</div>
                      <div className="orbtag rounded-full px-4 py-3 text-sm text-white/75">Thermal 21°C</div>
                      <div className="orbtag rounded-full px-4 py-3 text-sm text-white/75">Resonance stable</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ridges relative px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[1700px]">
            <div className="bloom flex items-end justify-between gap-6">
              <div>
                <div className="text-[11px] uppercase tracking-[0.32em] text-white/40">Telemetric-slider</div>
                <h2 className={`${cormorant.className} mt-5 text-[clamp(2.6rem,5vw,5rem)] leading-[.9] text-white`}>
                  Horizontal mission states across the planet’s surface.
                </h2>
              </div>
              <div className="hidden max-w-sm text-right leading-7 text-white/60 md:block">
                Each terrain slice communicates a different operational layer: supply, maintenance, and launch cadence.
              </div>
            </div>

            <div className="scroll-strip mt-10 pb-4">
              <article className="strip-card bloom rounded-[3rem] border border-white/10 bg-white/[0.03] p-6 backdrop-blur-[30px]">
                <div className="grid h-full gap-4 lg:grid-cols-[.8fr_1.2fr]">
                  <div className="hex flex items-center justify-center p-6">
                    <div className="text-center">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">Ion telemetry</div>
                      <div className="mt-4 text-5xl font-semibold text-[#ff9b52]">07</div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-white/45">Launch corridor</div>
                      <h3 className={`${cormorant.className} mt-4 text-4xl text-white`}>
                        Supply pulse across the equatorial ridge.
                      </h3>
                    </div>
                    <p className="max-w-2xl text-sm leading-7 text-white/65">
                      Cargo streams aligned to orbital resonance, with automation tuned for dust storm contingencies and
                      fuel economy.
                    </p>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section className="px-6 py-24 md:px-10">
          <div className="mx-auto max-w-[1700px] rounded-[3rem] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-[30px]">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr] lg:items-center">
              <div>
                <div className="text-[11px] uppercase tracking-[0.32em] text-white/40">Mission statement</div>
                <h2 className={`${cormorant.className} mt-5 text-[clamp(3rem,5vw,5.4rem)] leading-[.9] text-white`}>
                  Built on Mars, for Mars.
                </h2>
              </div>
              <div className="hidden h-40 w-px bg-white/10 lg:block" />
              <div className="max-w-2xl text-lg leading-9 text-white/68">
                The interface behaves like terrain: ridges overlap, craters open into systems, and every operational
                layer reads like a piece of the planet rather than a generic web page.
              </div>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        :root { color-scheme: dark; }
        html { scroll-behavior: smooth; }

        .grid-noise {
          background-image: linear-gradient(rgba(255, 255, 255, 0.028) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.028) 1px, transparent 1px);
          background-size: 112px 112px;
          mask-image: radial-gradient(circle at center, black 30%, transparent 84%);
          opacity: 0.28;
        }

        .hud {
          background: rgba(255, 255, 255, 0.035);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(40px) contrast(1.1);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 60px rgba(0, 0, 0, 0.46);
        }

        .aero {
          position: relative;
          overflow: hidden;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.04));
          border: 1px solid rgba(255, 255, 255, 0.12);
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s ease;
        }

        .aero-shine {
          position: absolute;
          inset: -120%;
          background: linear-gradient(120deg, transparent 44%, rgba(255, 255, 255, 0.32) 50%, transparent 56%);
          transform: translateX(-140%) rotate(12deg);
          animation: sheen 8s ease-in-out infinite;
        }

        .hex, .fracture {
          border-radius: 1.5rem;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.02));
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .orbtag {
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(26px);
        }

        .hero-shell {
          position: relative;
          overflow: hidden;
          /* Eliminamos la clase hero-scale de aquí para que no choque con el JS */
        }

        .hero-video {
          transform-origin: center center;
          will-change: transform;
        }

        .bloom {
          opacity: 0;
          transform: translateY(22px) scale(0.98);
        }

        .bloom.active {
          animation: bloom 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes bloom {
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes sheen {
          to { transform: translateX(240%) rotate(12deg); }
        }

        .pulse-text {
          display: inline-block;
          animation: pulsar 7s ease-in-out infinite;
        }

        @keyframes pulsar {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.02); }
        }
        
        .scroll-strip {
          display: grid;
          grid-auto-flow: column;
          grid-auto-columns: 84%;
          gap: 1rem;
          overflow-x: auto;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}