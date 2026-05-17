"use client";

import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";

type RevealId = "ecosystems" | "craft" | "gallery" | "origin";

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [revealed, setRevealed] = useState<Set<RevealId>>(new Set());
  const heroVideoRef = useRef<HTMLVideoElement | null>(null);

  const particles = useMemo(
    () => [
      {
        left: "10%",
        size: "text-3xl",
        color: "text-amber-400",
        delay: "0s",
        duration: "12s",
      },
      {
        left: "40%",
        size: "text-2xl",
        color: "text-amber-500",
        delay: "2s",
        duration: "7s",
      },
      {
        left: "70%",
        size: "text-4xl",
        color: "text-amber-600",
        delay: "4s",
        duration: "12s",
      },
      {
        left: "85%",
        size: "text-xl",
        color: "text-amber-300",
        delay: "1s",
        duration: "7s",
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
    <main className="min-h-screen overflow-x-hidden bg-[#070a08] text-slate-50 antialiased selection:bg-[#b46b00] selection:text-white">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Outfit:wght@300;400;500;600&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background-color: #070a08;
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
          background: #070a08;
        }

        ::-webkit-scrollbar-thumb {
          background: #5c3500;
          border-radius: 10px;
        }

        .bottle-mask {
          mask-image: radial-gradient(ellipse at center, black 40%, transparent 85%);
          -webkit-mask-image: radial-gradient(ellipse at center, black 40%, transparent 85%);
        }

        .glass-panel {
          background: rgba(255, 255, 255, 0.02);
          backdrop-filter: blur(24px) saturate(1.2);
          -webkit-backdrop-filter: blur(24px) saturate(1.2);
          border: 1px solid rgba(255, 157, 0, 0.15);
          box-shadow: inset 0 0 30px rgba(255, 157, 0, 0.02), 0 20px 40px rgba(0, 0, 0, 0.8);
          position: relative;
          overflow: hidden;
        }

        .glass-panel::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, transparent 40%, rgba(255, 157, 0, 0.05) 100%);
          pointer-events: none;
        }

        .amber-text-glow {
          text-shadow: 0 0 30px rgba(255, 157, 0, 0.6), 0 0 10px rgba(255, 157, 0, 0.4);
        }

        .btn-amber {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255, 157, 0, 0.15), rgba(255, 157, 0, 0.05));
          border: 1px solid rgba(255, 157, 0, 0.4);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-amber:hover {
          background: rgba(255, 157, 0, 0.25);
          box-shadow: 0 0 30px rgba(255, 157, 0, 0.3), inset 0 0 15px rgba(255, 157, 0, 0.2);
          transform: translateY(-2px);
          border-color: rgba(255, 157, 0, 0.8);
        }

        .btn-amber::after {
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

        .particle {
          position: absolute;
          border-radius: 50%;
          background: #ff9d00;
          box-shadow: 0 0 10px #ff9d00, 0 0 20px #ff9d00;
          pointer-events: none;
        }

        @keyframes firefly {
          0% {
            opacity: 0.2;
            transform: scale(0.8);
          }
          100% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        .animate-firefly {
          animation: firefly 4s ease-in-out infinite alternate;
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute left-[-10%] top-[-20%] h-[50vw] w-[50vw] rounded-full bg-[#1a2615]/40 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-[40vw] w-[40vw] rounded-full bg-[#5c3500]/20 blur-[150px]" />
        <div className="absolute inset-0">
          {particles.map((particle, index) => (
            <div
              key={index}
              className="particle animate-firefly"
              style={{
                left: particle.left,
                top: "0",
                width: "3px",
                height: "3px",
                animationDelay: particle.delay,
                animationDuration: particle.duration,
              }}
            />
          ))}
        </div>
      </div>

      <nav
        id="navbar"
        className={[
          "fixed top-0 z-50 w-full transition-all duration-500",
          scrolled ? "border-b border-white/5 bg-[#070a08]/80 shadow-2xl backdrop-blur-lg" : "",
        ].join(" ")}
      >
        <div className="mx-auto flex h-24 max-w-[1800px] items-center justify-between px-6 lg:px-12">
          <a href="#" className="group flex items-center gap-3">
            <Icon
              icon="ph:flask-bold"
              className="text-3xl text-[#ff9d00] transition-transform duration-500 group-hover:rotate-12"
            />
            <span className="font-serif text-2xl font-bold tracking-widest uppercase">Aethelgard</span>
          </a>

          <div className="hidden items-center gap-10 text-xs font-medium uppercase tracking-[0.3em] text-white/60 lg:flex font-sans">
            <a href="#ecosystems" className="transition-colors hover:text-[#ff9d00]">
              Ecosystems
            </a>
            <a href="#craft" className="transition-colors hover:text-[#ff9d00]">
              Craftsmanship
            </a>
            <a href="#gallery" className="transition-colors hover:text-[#ff9d00]">
              Collection
            </a>
            <a href="#origin" className="transition-colors hover:text-[#ff9d00]">
              Origin
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button className="btn-amber rounded-full px-8 py-3 text-xs font-bold uppercase tracking-[0.2em] text-[#ffead0] font-sans">
              Acquire World
            </button>
          </div>
        </div>
      </nav>

      <main>
        <section className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[#070a08]">
            <video
              ref={heroVideoRef}
              autoPlay
              loop
              muted
              playsInline
              className="h-full w-full object-cover"
              style={{ willChange: "transform" }}
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(7,10,8,0.9)_65%,#070a08_100%)]" />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#070a08]" />
          </div>

          <div className="relative z-10 mx-auto mt-20 max-w-5xl px-6 text-center">
            <h1
              className="mb-8 text-[clamp(4rem,12vw,10rem)] font-bold italic leading-[0.85] text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] drop-shadow-[0_0_5px_rgba(0,0,0,0.9)] font-serif"
              style={{ transitionDelay: "0.2s" }}
            >
              Universes in <br />
              <span className="not-italic bg-gradient-to-r from-[#ff9d00] via-[#ff9d00] to-[#b46b00] bg-clip-text text-transparent amber-text-glow">
                Glass.
              </span>
            </h1>

            <p
              className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.9)] md:text-xl font-sans"
              style={{ transitionDelay: "0.3s" }}
            >
              Miniature ecosystems forged with time, moss, and light. A fragment of autumn magic preserved eternally in your space.
            </p>

            <div
              className="flex flex-col items-center justify-center gap-6 sm:flex-row"
              style={{ transitionDelay: "0.4s" }}
            >
              <button className="btn-amber w-full rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white sm:w-auto font-sans">
                Explore Gallery
              </button>
              <button className="flex w-full items-center justify-center gap-3 rounded-full px-10 py-5 text-xs font-bold uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-white sm:w-auto font-sans">
                <Icon icon="ph:play-circle-light" className="text-xl" />
                The Process
              </button>
            </div>
          </div>

          <div
            className="absolute bottom-12 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-4 opacity-40"
            style={{ transitionDelay: "0.6s" }}
          >
            <div className="h-16 w-px bg-gradient-to-b from-[#ff9d00] to-transparent" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-[#ff9d00] font-sans">Dive In</span>
          </div>
        </section>

        <section id="ecosystems" data-reveal-id="ecosystems" className={`${revealClass("ecosystems")} relative bg-[#070a08] px-6 py-32 lg:px-12`}>
          <div className="mx-auto max-w-[1700px]">
            <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.5fr] lg:gap-24">
              <div>
                <span className="mb-6 block text-[11px] uppercase tracking-[0.4em] text-[#ff9d00]/60 font-sans">
                  Anatomy of a World
                </span>
                <h2 className="mb-8 text-5xl font-bold leading-tight md:text-7xl font-serif">
                  Life breathing <br />
                  in the <i className="text-[#ff9d00]">void</i>.
                </h2>
                <p className="mb-10 text-lg font-light leading-relaxed text-white/50 font-sans">
                  Each terrarium is a self-sustaining biome. Tiny cabins house warm light diodes that mimic the glow of a hearth, while living moss purifies its own atmosphere through hand-blown glass.
                </p>
                <div className="grid grid-cols-2 gap-8 border-t border-white/10 pt-10">
                  <div>
                    <div className="mb-2 text-4xl font-serif text-[#ff9d00]">100%</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-sans">Natural Moss</div>
                  </div>
                  <div>
                    <div className="mb-2 text-4xl font-serif text-[#ff9d00]">∞</div>
                    <div className="text-[10px] uppercase tracking-widest text-white/40 font-sans">Water Cycle</div>
                  </div>
                </div>
              </div>

              <div className="relative grid gap-6 sm:grid-cols-2">
                <div className="pointer-events-none absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#ff9d00]/10 blur-[100px]" />

                <div className="glass-panel group rounded-3xl p-8 sm:translate-y-12">
                  <Icon icon="ph:tree-evergreen-light" className="mb-6 text-4xl text-[#ff9d00] transition-transform group-hover:scale-110" />
                  <h3 className="mb-4 text-2xl font-bold font-serif">Perpetual Flora</h3>
                  <p className="text-sm leading-relaxed text-white/50 font-light font-sans">
                    Meticulous selection of flora that thrives in closed environments, creating micro-forests that require zero maintenance.
                  </p>
                </div>

                <div className="glass-panel group rounded-3xl p-8">
                  <Icon icon="ph:house-line-light" className="mb-6 text-4xl text-[#ff9d00] transition-transform group-hover:scale-110" />
                  <h3 className="mb-4 text-2xl font-bold font-serif">Scaled Architecture</h3>
                  <p className="text-sm leading-relaxed text-white/50 font-light font-sans">
                    Hand-carved structures in noble woods, treated to resist moisture and maintain their millimeter precision.
                  </p>
                </div>

                <div className="glass-panel group rounded-3xl p-8 sm:translate-y-12">
                  <Icon icon="ph:drop-light" className="mb-6 text-4xl text-[#ff9d00] transition-transform group-hover:scale-110" />
                  <h3 className="mb-4 text-2xl font-bold font-serif">Micro-Rivers</h3>
                  <p className="text-sm leading-relaxed text-white/50 font-light font-sans">
                    Epoxy resin cast with natural pigments that simulate water currents, reflecting the internal light of the ecosystem.
                  </p>
                </div>

                <div className="glass-panel group rounded-3xl p-8">
                  <Icon icon="ph:sparkle-light" className="mb-6 text-4xl text-[#ff9d00] transition-transform group-hover:scale-110" />
                  <h3 className="mb-4 text-2xl font-bold font-serif">Twilight Glow</h3>
                  <p className="text-sm leading-relaxed text-white/50 font-light font-sans">
                    Integrated lighting with amber temperature (2200K) LED filaments, powered by invisible inductive charging bases.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="gallery" data-reveal-id="gallery" className={`${revealClass("gallery")} relative overflow-hidden bg-[#070a08] px-6 py-32 lg:px-12`}>
          <div className="mx-auto max-w-[1700px] text-center">
            <Icon icon="ph:star-four-fill" className="mb-6 animate-pulse text-xl text-[#ff9d00]" />
            <h2 className="mb-6 text-5xl font-bold italic md:text-7xl font-serif">The Autumn Haven</h2>
            <p className="mx-auto mb-20 max-w-2xl text-lg font-light leading-relaxed text-white/50 font-sans">
              Discover the flagship collection. Each piece is unique, numbered, and contains an unrepeatable landscape.
            </p>
          </div>

          <div className="mx-auto grid max-w-[1700px] gap-8 md:grid-cols-3">
            {[
              {
                image:
                  "https://images.unsplash.com/photo-1542314831-c6a4d14eff50?auto=format&fit=crop&q=80",
                edition: "Edition 01",
                title: "The Valley Mill",
                text: "A mill suspended over a resin river, surrounded by copper foliage.",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1505832018823-50331d70d237?auto=format&fit=crop&q=80",
                edition: "Edition 02",
                title: "The Alchemist's Cabin",
                text: "A steep tower embedded in basalt rock with climbing moss.",
              },
              {
                image:
                  "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&q=80",
                edition: "Edition 03",
                title: "Bridge of Souls",
                text: "A stone arch over dark waters, flanked by golden trees.",
              },
            ].map((item, index) => (
              <div
                key={item.title}
                className="glass-panel group relative aspect-[3/4] overflow-hidden rounded-[2rem] reveal-node"
                style={{ transitionDelay: `${index * 0.2}s` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-40 transition-all duration-700 group-hover:scale-105 group-hover:opacity-60 mix-blend-luminosity"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070a08] via-[#070a08]/50 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full p-8">
                  <div className="mb-2 text-[10px] uppercase tracking-widest text-[#ff9d00] font-sans">
                    {item.edition}
                  </div>
                  <h3 className="mb-2 text-3xl font-bold text-white font-serif">{item.title}</h3>
                  <p className="mb-6 line-clamp-2 text-xs text-white/50 font-sans">{item.text}</p>
                  <button className="rounded-full border border-white/20 px-6 py-2 text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-md transition-colors hover:border-[#ff9d00] hover:bg-[#ff9d00]/10 font-sans">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        <footer className="relative overflow-hidden border-t border-white/5 bg-[#040605] px-6 pb-12 pt-32 lg:px-12">
          <div className="absolute left-1/2 top-0 h-px w-full max-w-[1000px] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#ff9d00]/50 to-transparent" />
          <div className="absolute bottom-0 left-0 h-[50vh] w-full pointer-events-none bg-[#1a2615]/20 blur-[150px]" />

          <div className="relative z-10 mx-auto mb-24 grid max-w-[1700px] gap-16 lg:grid-cols-[1fr_2fr]">
            <div>
              <a href="#" className="mb-6 flex items-center gap-3">
                <Icon icon="ph:flask-bold" className="text-4xl text-[#ff9d00]" />
                <span className="font-serif text-3xl font-bold tracking-widest uppercase text-white">
                  Aethelgard
                </span>
              </a>
              <p className="mb-10 max-w-sm text-sm font-light leading-relaxed text-white/40 font-sans">
                Preserving the magic of the minuscule. Workshops deep in the Black Forest, forging eternal ecosystems.
              </p>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-[#ff9d00] hover:bg-[#ff9d00]/20 hover:text-amber-400"
                >
                  <Icon icon="ph:instagram-logo-light" className="text-xl" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-[#ff9d00] hover:bg-[#ff9d00]/20 hover:text-amber-400"
                >
                  <Icon icon="ph:pinterest-logo-light" className="text-xl" />
                </a>
                <a
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all hover:border-[#ff9d00] hover:bg-[#ff9d00]/20 hover:text-amber-400"
                >
                  <Icon icon="ph:twitter-logo-light" className="text-xl" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-10 lg:grid-cols-3 lg:pl-20">
              <div>
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff9d00] font-sans">
                  Navigation
                </h4>
                <ul className="space-y-4 text-sm font-light text-white/50 font-sans">
                  <li><a href="#" className="transition-colors hover:text-white">The Collection</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Artisanal Process</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Terrarium Care</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Testimonials</a></li>
                </ul>
              </div>
              <div>
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff9d00] font-sans">
                  Support
                </h4>
                <ul className="space-y-4 text-sm font-light text-white/50 font-sans">
                  <li><a href="#" className="transition-colors hover:text-white">Contact</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Secure Shipping</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Glass Warranty</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">FAQ</a></li>
                </ul>
              </div>
              <div className="col-span-2 lg:col-span-1">
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-[#ff9d00] font-sans">
                  The Guild
                </h4>
                <p className="mb-4 text-sm font-light text-white/50 font-sans">
                  Join the inner circle for exclusive releases and limited editions.
                </p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Your digital essence..."
                    className="w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-xs text-white placeholder:text-white/20 focus:border-[#ff9d00]/50 focus:outline-none transition-colors font-sans"
                  />
                  <button className="absolute bottom-1 right-1 top-1 flex w-10 items-center justify-center rounded-full bg-[#ff9d00]/20 text-amber-400 transition-colors hover:bg-[#ff9d00] hover:text-white">
                    <Icon icon="ph:arrow-right-light" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex max-w-[1700px] flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] uppercase tracking-widest text-white/30 md:flex-row font-sans">
            <p>© 2026 Aethelgard. Contained worlds.</p>
            <div className="flex gap-6">
              <a href="#" className="transition-colors hover:text-white">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Terms
              </a>
            </div>
          </div>
        </footer>
      </main>
    </main>
  );
}