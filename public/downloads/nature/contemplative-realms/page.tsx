"use client";

import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";

type RevealId = "vision" | "media" | "process" | "origin";

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState<Set<RevealId>>(new Set());
  const navbarRef = useRef<HTMLElement | null>(null);
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  const leaves = useMemo(
    () => [
      {
        left: "12%",
        size: "text-3xl",
        color: "text-[#ffb7c5]/40",
        delay: "0s",
        animation: "animate-drift-slow",
        rotate: "rotate-45",
      },
      {
        left: "38%",
        size: "text-2xl",
        color: "text-[#ff9d00]/25",
        delay: "2s",
        animation: "animate-drift-fast",
        rotate: "-rotate-12",
      },
      {
        left: "71%",
        size: "text-4xl",
        color: "text-[#c2818c]/30",
        delay: "4s",
        animation: "animate-drift-slow",
        rotate: "rotate-90",
      },
      {
        left: "86%",
        size: "text-xl",
        color: "text-[#ffb7c5]/35",
        delay: "1s",
        animation: "animate-drift-fast",
        rotate: "rotate-180",
      },
    ],
    []
  );

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 50);

      const progress = Math.min(Math.max(y / window.innerHeight, 0), 1);
      if (heroVideoRef.current) {
        heroVideoRef.current.style.transform = `scale(${1 + progress * 0.1}) translateY(${progress * 20}px)`;
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
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("data-reveal-id") as RevealId | null;
              if (id) next.add(id);
              observer.unobserve(entry.target);
            }
          });
          return next;
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll("[data-reveal-id]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const revealClass = (id: RevealId) => (revealed.has(id) ? "reveal-node visible" : "reveal-node");

  return (
    <div className="dark min-h-screen overflow-x-hidden bg-[#0a0a0c] text-slate-50 antialiased selection:bg-[#c2818c] selection:text-white">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background-color: #0a0a0c;
          color: #f8fafc;
          font-family: "Outfit", sans-serif;
        }

        .font-serif {
          font-family: "Cormorant Garamond", serif;
        }

        .font-sans {
          font-family: "Outfit", sans-serif;
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #0a0a0c;
        }

        ::-webkit-scrollbar-thumb {
          background: #522b31;
          border-radius: 10px;
        }

        .cinematic-overlay {
          background: radial-gradient(circle at 50% 35%, transparent 20%, rgba(10, 10, 12, 0.4) 60%, #0a0a0c 100%);
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(24px) saturate(1.2);
          -webkit-backdrop-filter: blur(24px) saturate(1.2);
          border: 1px solid rgba(255, 183, 197, 0.1);
          box-shadow: inset 0 0 30px rgba(255, 183, 197, 0.02), 0 20px 40px rgba(0, 0, 0, 0.8);
          position: relative;
          overflow: hidden;
        }

        .glass-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 40%, rgba(255, 183, 197, 0.02) 100%);
          pointer-events: none;
        }

        .btn-cherry {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255, 183, 197, 0.1), rgba(255, 183, 197, 0.05));
          border: 1px solid rgba(255, 183, 197, 0.2);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-cherry:hover {
          background: rgba(255, 183, 197, 0.2);
          box-shadow: 0 0 30px rgba(255, 183, 197, 0.3), inset 0 0 15px rgba(255, 183, 197, 0.2);
          transform: translateY(-2px);
          border-color: rgba(255, 183, 197, 0.6);
        }

        .btn-cherry::after {
          content: "";
          position: absolute;
          inset: -120%;
          background: linear-gradient(120deg, transparent 40%, rgba(255, 255, 255, 0.4) 50%, transparent 60%);
          transform: translateX(-140%) rotate(25deg);
          animation: sheen 6s ease-in-out infinite;
          pointer-events: none;
        }

        @keyframes sheen {
          0% {
            transform: translateX(-140%) rotate(25deg);
          }
          20%,
          100% {
            transform: translateX(150%) rotate(25deg);
          }
        }

        .reveal-node {
          opacity: 0;
          transform: translateY(40px) scale(0.95);
          transition: all 1s cubic-bezier(0.23, 1, 0.32, 1);
        }

        .reveal-node.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .keyhole-mask {
          mask-image: radial-gradient(ellipse at center, black 15%, transparent 60%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 15%, transparent 60%);
        }

        .giyu-gradient {
          background: linear-gradient(135deg, rgba(255, 105, 180, 1) 0%, rgba(237, 72, 150, 1) 50%, rgba(219, 39, 119, 1) 100%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        @keyframes drift {
          0% {
            transform: translateX(-5vw) translateY(5vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateX(105vw) translateY(-5vh) rotate(360deg);
            opacity: 0;
          }
        }

        .animate-drift-slow {
          animation: drift 15s linear infinite;
        }

        .animate-drift-fast {
          animation: drift 8s linear infinite;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute inset-0">
          <video ref={heroVideoRef} autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="absolute inset-0 cinematic-overlay" />
        <div className="absolute left-[-10%] top-[-20%] h-[50vw] w-[50vw] rounded-full bg-[#522b31]/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[40vw] w-[40vw] rounded-full bg-[#1a2615]/30 blur-[150px]" />
        {leaves.map((leaf, index) => (
          <div
            key={index}
            className={`leaf-particle ${leaf.animation} ${leaf.color}`}
            style={{
              left: leaf.left,
              top: "0",
              animationDelay: leaf.delay,
            }}
          >
            <Icon icon="ph:leaf-fill" className={`${leaf.size} ${leaf.rotate}`} />
          </div>
        ))}
      </div>

      <nav
        ref={navbarRef}
        id="navbar"
        className={[
          "fixed top-0 z-50 w-full transition-all duration-500",
          scrolled ? "border-b border-white/5 bg-[#0a0a0c]/80 shadow-2xl backdrop-blur-lg" : "",
        ].join(" ")}
      >
        <div className="mx-auto flex h-24 max-w-[1800px] items-center justify-between px-6 lg:px-12">
          <a href="#" className="group flex items-center gap-3">
            <Icon
              icon="ph:wind-bold"
              className="text-3xl text-[#ffb7c5] transition-all duration-500 group-hover:translate-x-1 group-hover:rotate-12"
            />
            <span className="font-serif text-2xl font-bold tracking-widest uppercase">Gale & Key</span>
          </a>

          <div className="hidden items-center gap-10 text-xs font-medium uppercase tracking-[0.3em] text-white/60 md:flex font-sans">
            <a href="#vision" className="transition-colors hover:text-[#ffb7c5]">
              Vision
            </a>
            <a href="#media" className="transition-colors hover:text-[#ffb7c5]">
              Collection
            </a>
            <a href="#process" className="transition-colors hover:text-[#ffb7c5]">
              Journey
            </a>
            <a href="#origin" className="transition-colors hover:text-[#ffb7c5]">
              Origin
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button className="btn-cherry rounded-full px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ffb7c5] font-sans">
              Discover Realms
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative flex min-h-[100svh] flex-col items-start justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <video autoPlay loop muted playsInline className="h-full w-full object-cover keyhole-mask" style={{ willChange: "transform" }}>
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 cinematic-overlay" />
          </div>

          <div className="relative z-10 mx-auto mt-20 grid max-w-7xl gap-16 px-6 py-20 lg:grid-cols-2 lg:px-12">
            <div
              data-reveal-id="vision"
              className={`${revealClass("vision")} max-w-3xl`}
              style={{ transitionDelay: "0.1s" }}
            >
              <h1 className="mb-10 text-[clamp(4rem,10vw,8rem)] font-bold italic leading-[0.85] text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] drop-shadow-[0_0_5px_rgba(0,0,0,0.9)] font-serif">
                Preserving the
                <span className="not-italic giyu-gradient">Magic.</span>
              </h1>

              <p className="mb-12 max-w-2xl text-lg font-light leading-relaxed text-white/70 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)] md:text-xl font-sans">
                Enclosed development sandbox for architectural contemplative worlds. Forged deep below the macro hardware arrays. Where minimalist ambient desk lamps meet infinite arrays of raw compiling intelligence.
              </p>

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
                <button className="btn-cherry w-full rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white sm:w-auto font-sans">
                  Explore Realms
                </button>
                <button className="flex w-full items-center justify-center gap-3 rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white/80 transition-colors hover:text-white sm:w-auto font-sans">
                  <Icon icon="ph:play-circle-light" className="text-xl" />
                  The Journey
                </button>
              </div>
            </div>
          </div>

          <div
            className="reveal-node absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 opacity-40"
            style={{ transitionDelay: "0.6s" }}
          >
            <div className="h-16 w-px bg-gradient-to-b from-[#ffb7c5] to-transparent" />
            <span className="text-[9px] uppercase tracking-[0.4em] font-sans">Sumerge Within</span>
          </div>
        </section>

        <section id="vision" data-reveal-id="vision" className={`${revealClass("vision")} relative bg-[#0a0a0c] px-6 py-32 lg:px-12`}>
          <div className="pointer-events-none absolute left-1/2 top-0 h-64 w-full max-w-4xl -translate-x-1/2 rounded-full bg-[#ffb7c5]/10 blur-[120px]" />
          <div className="mx-auto grid max-w-[1700px] items-center gap-16 lg:grid-cols-[1.2fr_1fr] lg:gap-24">
            <div className="relative order-2 grid gap-6 sm:grid-cols-2 lg:order-1">
              <div className="glass-panel group rounded-3xl p-8 sm:translate-y-12">
                <Icon icon="ph:brain-light" className="mb-6 text-4xl text-[#ffb7c5] transition-all group-hover:scale-110" />
                <h3 className="mb-4 text-2xl font-bold text-[#ffb7c5] font-serif">Localized Focus</h3>
                <p className="text-sm leading-relaxed text-white/50 font-light font-sans">
                  By physicalizing dev terminals beneath hardware arrays, operations are shielded from larger system overhead.
                </p>
              </div>

              <div className="glass-panel group rounded-3xl p-8" style={{ transitionDelay: "0.2s" }}>
                <Icon icon="ph:shield-warning-light" className="mb-6 text-4xl text-[#ffb7c5] transition-all group-hover:scale-110" />
                <h3 className="mb-4 text-2xl font-bold text-[#ffb7c5] font-serif">Matrix Isolation</h3>
                <p className="text-sm leading-relaxed text-white/50 font-light font-sans">
                  Enclosed sandbox stops malicious executions from breaking out into external grid channels or larger networks.
                </p>
              </div>

              <div className="glass-panel group rounded-3xl p-8 sm:translate-y-12" style={{ transitionDelay: "0.1s" }}>
                <Icon icon="ph:key-light" className="mb-6 text-4xl text-[#ffb7c5] transition-all group-hover:scale-110" />
                <h3 className="mb-4 text-2xl font-bold text-[#ffb7c5] font-serif">Sovereign Access</h3>
                <p className="text-sm leading-relaxed text-white/50 font-light font-sans">
                  Direct physical mapping links switches with multi-tier conditional programming macros instantly below the workspace platform.
                </p>
              </div>

              <div className="glass-panel group rounded-3xl p-8" style={{ transitionDelay: "0.3s" }}>
                <Icon icon="ph:cube-light" className="mb-6 text-4xl text-[#ffb7c5] transition-all group-hover:scale-110" />
                <h3 className="mb-4 text-2xl font-bold text-[#ffb7c5] font-serif">Micro Worlds</h3>
                <p className="text-sm leading-relaxed text-white/50 font-light font-sans">
                  Complete segmentation of file structures unaffected by the greater operating ecosystem overhead and infinite compiling arrays.
                </p>
              </div>
            </div>

            <div
              data-reveal-id="vision"
              className={`${revealClass("vision")} order-1 lg:order-2`}
            >
              <span className="mb-6 block text-[11px] uppercase tracking-[0.4em] text-[#ffb7c5] font-sans">
                Visionary Protocol
              </span>
              <h2 className="mb-8 text-5xl leading-[0.9] font-bold md:text-7xl font-serif">
                The architecture of <i className="text-[#ffb7c5]">compilation</i> enclaves.
              </h2>
              <p className="mb-12 max-w-xl text-lg font-light leading-relaxed text-white/50 font-sans">
                Great applications are not born on expansive arrays, but written inside localized pockets of absolute clarity. Own your inputs. Perfect your contemplative keycaps deep beneath hardware arrays. Where minimalist ambient desk lamps meet infinite arrays of raw compiling intelligence.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <button className="btn-cherry w-full rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white hover:border-emerald-500 hover:bg-emerald-500 sm:w-auto">
                  Compile Space
                </button>
                <button className="flex w-full items-center justify-center gap-3 rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white sm:w-auto font-sans">
                  <Icon icon="ph:play-circle-light" className="text-xl" />
                  The Journey
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="media" data-reveal-id="media" className={`${revealClass("media")} relative overflow-hidden bg-[#0a0a0c] px-6 py-32 lg:px-12`}>
          <div className="mx-auto mb-24 max-w-[1700px] text-center">
            <span className="mb-6 block text-[11px] uppercase tracking-[0.4em] text-[#ffb7c5]/60 font-sans">
              Visual Artifacts
            </span>
            <h2 className="mb-6 text-4xl font-bold italic text-white sm:text-6xl font-serif">
              The Contemplative Wall
            </h2>
            <p className="mx-auto max-w-2xl text-lg font-light leading-relaxed text-white/50 font-sans">
              A curated stream of micro-environments, hardware protocols, and compiled outputs captured from secluded developer sanctuaries.
            </p>
          </div>

          <div className="mx-auto grid max-w-[1700px] grid-cols-12 auto-rows-[280px] gap-6">
            {[
              {
                col: "col-span-12 md:col-span-8",
                title: "Isolated Basin Mill",
                module: "Module 01",
                image:
                  "https://images.unsplash.com/photo-1542314831-c6a4d14eff50?auto=format&fit=crop&q=80&w=1200",
                text: "A mill suspended over a resin river, surrounded by copper foliage deep beneath hardware arrays.",
              },
              {
                col: "col-span-12 md:col-span-4",
                title: "Compiler's Tower",
                module: "Module 02",
                image:
                  "https://images.unsplash.com/photo-1505832018823-50331d70d237?auto=format&fit=crop&q=80&w=800",
                text: "A steep tower embedded in basalt rock with climbing moss deep beneath hardware arrays.",
              },
              {
                col: "col-span-12 md:col-span-4",
                title: "Vortex Gateway",
                module: "Module 03",
                image:
                  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80&w=800",
                text: "A stone arch over dark waters, flanked by golden trees deep beneath hardware arrays.",
              },
              {
                col: "col-span-12 md:col-span-8",
                title: "Summit Access Node",
                module: "Module 04",
                image:
                  "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=1200",
                text: "A high-clearance key capsule on a mossy ridge, flanked by golden leaves deep beneath hardware arrays.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className={`glass-card relative group overflow-hidden rounded-[2rem] ${item.col} reveal-node`}
                style={{ transitionDelay: `${index * 0.15}s` }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-luminosity"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="mb-2 text-[10px] uppercase tracking-widest text-[#ffb7c5] font-sans">
                    {item.module}
                  </div>
                  <h3 className="mb-2 text-3xl font-bold text-white font-serif">{item.title}</h3>
                  <p className="mb-6 line-clamp-2 text-xs text-white/50 font-sans">{item.text}</p>
                  <button className="rounded-full border border-white/20 px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:border-[#ffb7c5] hover:bg-[#ffb7c5]/10 font-sans">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="process" data-reveal-id="process" className={`${revealClass("process")} relative overflow-hidden bg-[#0d0d0f] py-32`}>
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-12 lg:grid-cols-[1fr_auto_1fr]">
            <div>
              <span className="mb-6 block text-[11px] uppercase tracking-[0.4em] text-[#ffb7c5] font-sans">
                Artisanal Pipeline
              </span>
              <h2 className="mb-8 text-5xl font-bold md:text-7xl font-serif">
                Forgetting the <i className="text-[#ffb7c5]">Macro</i> failsafe.
              </h2>
              <p className="mb-12 max-w-xl leading-relaxed text-white/50 font-light font-sans">
                By structurally integrating dev terminals inside high-clearance physical key capsules, operations are permanently shielded from larger system wide failures. Contemplation and micro spaces maximize compilation efficiency.
              </p>
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <button className="btn-cherry w-full rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white sm:w-auto">
                  The Blueprints
                </button>
                <button className="flex w-full items-center justify-center gap-3 rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white sm:w-auto font-sans">
                  <Icon icon="ph:play-circle-light" className="text-xl" />
                  Watch Pipeline
                </button>
              </div>
            </div>

            <div className="hidden h-64 w-px bg-gradient-to-b from-transparent via-[#ffb7c5] to-transparent lg:block" />

            <div className="glass-panel rounded-3xl p-8">
              <Icon icon="ph:git-commit-light" className="mb-8 text-3xl text-[#ffb7c5] animate-pulse" />
              <div className="mb-6 space-y-3 font-mono text-xs text-white/70">
                <p>
                  <span className="text-[#ffb7c5]">$</span> <span className="text-white">init</span> --world_gen=<span className="text-[#ffb7c5]">true</span> --type=micro_basin
                </p>
                <p className="text-[#ffb7c5]/60">[ OK ] Localized file matrix allocated.</p>
                <p className="text-[#ffb7c5]/60">[ OK ] LED array configuration set to 2700K.</p>
                <p>
                  <span className="text-[#ffb7c5]">$</span> world_contemplation --focus=max --lux=dim
                </p>
                <p>
                  <span className="text-[#ffb7c5]">$</span> Compile the <i>Realms</i>
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 pt-6">
                <div className="text-[10px] uppercase tracking-widest text-[#ffb7c5] animate-pulse font-sans">
                  Running Contemplation...
                </div>
                <Icon icon="ph:command-light" className="text-xl text-white/60 transition-colors hover:text-white" />
              </div>
            </div>
          </div>
        </section>

        <section id="origin" data-reveal-id="origin" className={`${revealClass("origin")} relative mx-auto grid max-w-[1700px] items-center gap-20 px-6 py-32 lg:grid-cols-2 lg:px-12`}>
          <div>
            <span className="mb-6 block text-[11px] uppercase tracking-[0.4em] text-[#ffb7c5] font-sans">
              Contemplative Roots
            </span>
            <h2 className="mb-8 text-5xl font-bold leading-[0.9] italic text-white md:text-7xl font-serif">
              Built deep inside the <span className="not-italic giyu-gradient">Micro Matrix.</span>
            </h2>
            <p className="mb-12 text-lg font-light leading-relaxed text-white/50 font-sans">
              The interface behaves like terrain: ridges overlap, craters open into systems, and every operational layer reads like a piece of the planet rather than a generic web page. Preservation deep beneath hardware arrays. Where minimalist ambient desk lamps meet infinite arrays of raw compiling intelligence. Own your inputs.
            </p>
            <button className="btn-cherry w-full rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white sm:w-auto">
              The Blueprint Docs
            </button>
          </div>

          <div className="relative h-[400px] overflow-hidden rounded-[2.5rem] border border-white/10">
            <video autoPlay loop muted playsInline className="keyhole-mask h-full w-full object-cover">
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 keyhole-mask bg-[#0a0a0c]/60" />
          </div>
        </section>

        <section className="relative mx-auto max-w-4xl overflow-hidden px-6 py-32 text-center">
          <div className="pointer-events-none absolute inset-0 rounded-full bg-[#ffb7c5]/5 blur-3xl" />
          <div className="relative z-10 space-y-8">
            <Icon icon="ph:key-light" className="text-4xl text-[#ffb7c5] animate-pulse" />
            <h2 className="mb-6 text-5xl font-bold italic md:text-7xl font-serif">
              Contemplate your Inputs
            </h2>
            <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-white/50 sm:text-base font-sans">
              Own your micro Contemplation deep beneath hardware arrays. Where minimalist ambient desk lamps meet infinite arrays of raw compiling intelligence.
            </p>
            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
              <button className="btn-cherry w-full rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white sm:w-auto">
                Requests Blueprints
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white sm:w-auto font-sans">
                <Icon icon="ph:terminal-window-light" className="text-xl" />
                Initialize Matrix
              </button>
            </div>
          </div>
        </section>

        <footer className="relative overflow-hidden border-t border-white/5 bg-[#08080a] px-6 pb-12 pt-32 selection:bg-[#522b31]">
          <div className="absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ffb7c5]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[50vh] w-full pointer-events-none bg-[#1a2615]/10 blur-[150px]" />

          <div className="relative z-10 mx-auto mb-20 grid max-w-[1700px] gap-20 md:grid-cols-[1fr_2fr] items-start">
            <div>
              <a href="#" className="mb-6 flex items-center gap-3">
                <Icon icon="ph:wind-bold" className="text-3xl text-[#ffb7c5]" />
                <span className="font-serif text-2xl font-bold tracking-widest uppercase text-white">
                  Gale & Key
                </span>
              </a>
              <p className="mb-10 max-w-sm text-sm font-light leading-relaxed text-white/40 font-sans">
                Preserving contemplative worlds beneath hardware arrays. Where minimalist ambient desk lamps meet infinite arrays of raw compiling intelligence. Own your inputs. Perfect your contemplative keycaps.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-[#ffb7c5] hover:bg-[#ffb7c5]/20 hover:text-[#ffb7c5]"
                >
                  <Icon icon="ph:instagram-logo-light" className="text-xl" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-[#ffb7c5] hover:bg-[#ffb7c5]/20 hover:text-[#ffb7c5]"
                >
                  <Icon icon="ph:github-logo-light" className="text-xl" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-[#ffb7c5] hover:bg-[#ffb7c5]/20 hover:text-[#ffb7c5]"
                >
                  <Icon icon="ph:twitter-logo-light" className="text-xl" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-12 md:grid-cols-4 lg:pl-20">
              <div>
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffb7c5]/80 font-sans">
                  Contemplate
                </h4>
                <ul className="space-y-4 text-sm font-light text-white/50 font-sans">
                  <li><a href="#" className="transition-colors hover:text-white">Visionary Docs</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Blueprint Core</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Lux Modulator</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Macro Overlays</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffb7c5]/80 font-sans">
                  Hardware
                </h4>
                <ul className="space-y-4 text-sm font-light text-white/50 font-sans">
                  <li><a href="#" className="transition-colors hover:text-white">Micro Basin</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Compiler Tower</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Vortex Gateway</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Blueprint Docs</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffb7c5]/80 font-sans">
                  Pipeline
                </h4>
                <ul className="space-y-4 text-sm font-light text-white/50 font-sans">
                  <li><a href="#" className="transition-colors hover:text-white">Gale ascension</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Mirror Reflection</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Clan border</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Matrix Isolation</a></li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ffb7c5]/80 font-sans">
                  The Chronicle
                </h4>
                <p className="mb-4 text-xs font-light text-white/50 font-sans">
                  Subscribe for localized dispatches from secluded sanctuaries.
                </p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Mail your Inputs..."
                    className="w-full border border-white/10 bg-white/5 px-5 py-3 text-xs text-white placeholder:text-white/20 focus:border-[#ffb7c5]/50 focus:outline-none transition-colors font-sans"
                  />
                  <button className="absolute bottom-1 right-1 top-1 flex items-center justify-center rounded-full bg-[#ffb7c5]/20 px-3 text-[#ffb7c5] transition-colors hover:bg-[#ffb7c5] hover:text-white">
                    <Icon icon="ph:command-light" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] uppercase tracking-widest text-white/30 sm:flex-row font-sans">
            <p>© 2026 Gale & Key. Contained Contemplation.</p>
            <div className="flex gap-6 text-[10px] uppercase tracking-widest text-white/30">
              <a href="#" className="transition-colors hover:text-white">
                Isolation Protocol
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Kernel Modules
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}