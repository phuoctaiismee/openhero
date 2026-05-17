"use client";

import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";

type TabId = "wind-stance" | "water-stance" | "sun-stance";

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("wind-stance");
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const leaves = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => {
      const width = 8 + ((i * 7) % 16);
      const height = width * (0.6 + ((i * 3) % 5) * 0.08);
      const color = i % 3 === 0 ? "#22c55e" : i % 3 === 1 ? "#84cc16" : "#eab308";
      return {
        id: i,
        width,
        height,
        color,
        left: (i * 13) % 80 - 20,
        top: (i * 9) % 80 - 20,
        duration: 6 + (i % 6),
        delay: -(i % 10) * 1.2,
      };
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 60);
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
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    document.querySelectorAll(".reveal-up").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#07111e] text-slate-50 antialiased select-none">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background-color: #07111e;
          color: #f8fafc;
          font-family: "Plus Jakarta Sans", sans-serif;
        }

        .font-cinzel {
          font-family: "Cinzel", serif;
        }

        .font-jakarta {
          font-family: "Plus Jakarta Sans", sans-serif;
        }

        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.8);
          color: transparent;
        }

        .text-stroke:hover {
          -webkit-text-stroke: 1px transparent;
          color: #ffffff;
          background: linear-gradient(135deg, #38bdf8, #eab308);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .gradient-overlay {
          background: linear-gradient(to bottom, rgba(7, 17, 30, 0.1) 0%, rgba(7, 17, 30, 0.1) 60%, #07111e 100%);
        }

        .sunlight-glow {
          background: radial-gradient(circle at 75% 30%, rgba(234, 179, 8, 0.25) 0%, rgba(56, 189, 248, 0.1) 40%, transparent 70%);
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

        .leaf-particle {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          will-change: transform, opacity;
        }

        @keyframes drift {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0.6);
            opacity: 0;
          }

          10% {
            opacity: 0.8;
          }

          90% {
            opacity: 0.8;
          }

          100% {
            transform: translate(60vw, 80vh) rotate(720deg) scale(1.2);
            opacity: 0;
          }
        }

        .asymmetric-clip {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 0% 100%);
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .glass-card:hover {
          background: rgba(255, 255, 255, 0.03);
          border-color: rgba(56, 189, 248, 0.2);
          transform: translateY(-4px);
        }

        .hero-card {
          background: rgba(255, 255, 255, 0.01);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 sunlight-glow" />
        <div className="absolute right-[-10%] top-[-10%] h-[60vw] w-[60vw] rounded-full bg-sky-400/10 blur-[150px]" />
        <div className="absolute bottom-[-5%] left-[-5%] h-[40vw] w-[40vw] rounded-full bg-emerald-400/5 blur-[120px]" />
        <div className="absolute inset-0 z-10">
          {leaves.map((leaf) => (
            <div
              key={leaf.id}
              className="leaf-particle"
              style={{
                width: `${leaf.width}px`,
                height: `${leaf.height}px`,
                backgroundColor: leaf.color,
                borderRadius: "50% 0 50% 0",
                left: `${leaf.left}vw`,
                top: `${leaf.top}vh`,
                animation: `drift ${leaf.duration}s linear ${leaf.delay}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <nav
        id="main-nav"
        className={[
          "fixed left-0 top-0 z-50 flex h-28 w-full items-center transition-all duration-500",
          scrolled ? "h-20 border-b border-white/5 bg-sky-950/80 backdrop-blur-xl" : "bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-12">
          <a href="#" className="group flex items-center gap-3 text-xl font-bold tracking-[0.3em] text-white font-cinzel">
            ZEPHYR
          </a>

          <div className="hidden items-center gap-12 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/90 md:flex font-jakarta">
            <a href="#philosophy" className="relative transition-colors hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-sky-400 after:transition-all hover:after:w-full">
              Horizon
            </a>
            <a href="#expeditions" className="relative transition-colors hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-sky-400 after:transition-all hover:after:w-full">
              Journeys
            </a>
            <a href="#gear" className="relative transition-colors hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-sky-400 after:transition-all hover:after:w-full">
              Artifacts
            </a>
            <a href="#showcase" className="relative transition-colors hover:text-white after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:w-0 after:bg-sky-400 after:transition-all hover:after:w-full">
              Vistas
            </a>
          </div>

          <button className="group relative overflow-hidden rounded-sm border border-white/30 px-6 py-3 text-[10px] font-bold uppercase tracking-[0.3em] transition-all duration-300 hover:border-sky-400 font-jakarta">
            <span className="absolute inset-0 bg-gradient-to-r from-sky-400 to-lime-400 opacity-0 transition-opacity duration-300 group-hover:opacity-10" />
            Begin Trek
          </button>
        </div>
      </nav>

      <header className="relative flex min-h-screen items-center justify-center overflow-hidden asymmetric-clip">
        <div className="absolute inset-0 z-0">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full scale-105 object-cover transition-transform duration-1000 ease-out"
            style={{ willChange: "transform" }}
          >
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 gradient-overlay" />
          <div className="absolute inset-0 bg-gradient-to-r from-sky-950/40 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-8 px-6 pt-32 md:px-12 lg:grid-cols-12">
          <div className="flex flex-col items-start text-left lg:col-span-8">
            <h1 className="mb-6 text-5xl font-black uppercase leading-[0.9] tracking-tight text-white drop-shadow-[0_0_15px_rgba(0,0,0,0.9)] drop-shadow-[0_0_5px_rgba(0,0,0,0.9)] sm:text-7xl md:text-8xl lg:text-9xl font-cinzel">
              Boundless <br />
              <span className="text-stroke transition-all duration-500">Freedom.</span>
            </h1>

            <p className="mb-10 max-w-xl text-base font-light leading-relaxed text-white/80 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)] sm:text-lg md:text-xl font-jakarta">
              Stand atop the world where the wind speaks in whispers and the horizons extend forever into the golden sun.
            </p>

            <div className="flex w-full flex-col items-stretch gap-4 sm:w-auto sm:flex-row sm:items-center">
              <a
                href="#expeditions"
                className="rounded-sm bg-white px-8 py-4 text-center text-xs font-bold uppercase tracking-[0.2em] text-sky-950 shadow-2xl shadow-sky-400/10 transition-colors duration-300 hover:bg-sky-400 hover:text-white font-jakarta"
              >
                Explore Frontiers
              </a>
              <button className="flex items-center justify-center gap-3 rounded-sm border border-white/20 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-white transition-colors duration-300 hover:border-white font-jakarta">
                <Icon icon="ph:play-fill" className="text-base" />
                Watch Motion
              </button>
            </div>
          </div>

          <div className="hidden flex-col gap-6 border-l border-white/5 pl-12 lg:col-span-4 lg:flex">
            <div className="cursor-pointer group">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">
                Elevation
              </div>
              <div className="text-2xl font-bold drop-shadow-[0_0_8px_rgba(0,0,0,0.9)] transition-colors group-hover:text-lime-400 font-cinzel">
                3,800 METERS
              </div>
            </div>
            <div className="cursor-pointer group">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">
                Atmosphere
              </div>
              <div className="text-2xl font-bold drop-shadow-[0_0_8px_rgba(0,0,0,0.9)] transition-colors group-hover:text-lime-400 font-cinzel">
                PURE ZEPHYR
              </div>
            </div>
            <div className="cursor-pointer group">
              <div className="mb-1 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400 drop-shadow-[0_0_8px_rgba(0,0,0,0.9)]">
                Stance
              </div>
              <div className="text-2xl font-bold drop-shadow-[0_0_8px_rgba(0,0,0,0.9)] transition-colors group-hover:text-lime-400 font-cinzel">
                UNYIELDING
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-6 z-10 flex items-center gap-6 md:left-12">
          <div className="flex gap-4 text-lg text-white/40">
            <a href="#" className="transition-colors hover:text-white">
              <Icon icon="ph:instagram-logo" />
            </a>
            <a href="#" className="transition-colors hover:text-white">
              <Icon icon="ph:youtube-logo" />
            </a>
            <a href="#" className="transition-colors hover:text-white">
              <Icon icon="ph:twitter-logo" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="philosophy" className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-32 md:px-12 lg:grid-cols-12">
          <div className="reveal-up lg:col-span-5">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.4em] text-sky-400">
              The Grand Design
            </span>
            <h2 className="mb-6 text-4xl font-bold uppercase leading-tight tracking-tight text-white sm:text-5xl font-cinzel">
              Where the soul aligns with the <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 to-lime-400">summit.</span>
            </h2>
          </div>

          <div className="reveal-up lg:col-span-7">
            <p className="mb-8 text-lg font-light leading-relaxed text-white/50 font-jakarta">
              Inspired by cinematic vistas and untamed ridge-lines, we design experiences and premium technical apparel made to withstand the forces of nature while embracing the serenity of open spaces. Every thread, every angle, and every breath is calibrated for greatness.
            </p>
            <div className="mb-8 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="mb-1 text-3xl font-bold text-white font-cinzel">01</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Vibrant Skies
                </div>
              </div>
              <div>
                <div className="mb-1 text-3xl font-bold text-white font-cinzel">02</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Wind Forged
                </div>
              </div>
              <div>
                <div className="mb-1 text-3xl font-bold text-white font-cinzel">03</div>
                <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                  Eternal Reach
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="expeditions" className="relative bg-sky-950/20 px-6 py-32 md:px-12">
          <div className="mx-auto mb-16 flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-end reveal-up">
            <div>
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.4em] text-sky-400">
                Curated Odysseys
              </span>
              <h2 className="text-4xl font-bold uppercase tracking-tight text-white md:text-5xl font-cinzel">
                Select Realms
              </h2>
            </div>
            <p className="max-w-sm text-sm font-light text-white/40 font-jakarta">
              Hand-picked destinations crafted for visionaries who seek absolute isolation and unmatched panoramic views.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-3">
            {[
              {
                title: "Emerald Ridges",
                text: "High contrast mountain slopes meeting cloud banks at breakneck velocities.",
                image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
                tag: "Active Trek",
              },
              {
                title: "Azure Basins",
                text: "Crystalline water bodies reflecting intense skies deep within mountain sanctuaries.",
                image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=1200",
                tag: "High Altitude",
              },
              {
                title: "Whispering Groves",
                text: "Lush foliage dancing wildly under intense golden rays and crisp drafts.",
                image: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=1200",
                tag: "Serene Valley",
              },
            ].map((item, index) => (
              <div key={item.title} className="glass-card flex flex-col overflow-hidden rounded-xl reveal-up" style={{ transitionDelay: `${index * 150}ms` }}>
                <div className="group relative h-80 w-full overflow-hidden">
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-sky-950 to-transparent opacity-80" />
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110 mix-blend-luminosity group-hover:mix-blend-normal"
                  />
                  <div className="absolute left-6 top-6 z-20 rounded-sm border border-white/10 bg-white/10 px-3 py-1 text-[9px] font-bold uppercase tracking-widest text-white backdrop-blur-md">
                    {item.tag}
                  </div>
                </div>
                <div className="flex flex-1 flex-col justify-between p-8">
                  <div>
                    <h3 className="mb-2 text-2xl font-bold text-white font-cinzel">{item.title}</h3>
                    <p className="mb-6 text-sm font-light text-white/50 font-jakarta">{item.text}</p>
                  </div>
                  <a href="#" className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-sky-400 transition-colors hover:text-white">
                    Secure Spot
                    <Icon icon="ph:arrow-up-right-bold" className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="gear" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <div className="relative order-2 lg:order-1 lg:col-span-5">
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-sky-400 to-lime-400 opacity-20 blur-[80px] animate-pulse" />
              <div className="relative z-10 grid grid-cols-2 gap-4">
                <div className="hero-card flex h-48 flex-col justify-between rounded-lg p-6">
                  <Icon icon="ph:wind-light" className="text-3xl text-sky-400" />
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-white font-cinzel">AeroShell</h4>
                    <p className="text-[11px] font-light leading-relaxed text-white/40 font-jakarta">
                      Deflects storms while enabling total internal thermal breathing cycles.
                    </p>
                  </div>
                </div>

                <div className="hero-card mt-6 flex h-48 flex-col justify-between rounded-lg p-6">
                  <Icon icon="ph:shield-check-light" className="text-3xl text-lime-400" />
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-white font-cinzel">Kevlar-Weave</h4>
                    <p className="text-[11px] font-light leading-relaxed text-white/40 font-jakarta">
                      High-durability threshold across rocks, dense branches, and high peaks.
                    </p>
                  </div>
                </div>

                <div className="hero-card flex h-48 flex-col justify-between rounded-lg p-6">
                  <Icon icon="ph:feather-light" className="text-3xl text-amber-400" />
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-white font-cinzel">Zero Mass</h4>
                    <p className="text-[11px] font-light leading-relaxed text-white/40 font-jakarta">
                      Ultralight formulation ensures zero drag during vertical ascents.
                    </p>
                  </div>
                </div>

                <div className="hero-card mt-6 flex h-48 flex-col justify-between rounded-lg p-6">
                  <Icon icon="ph:compass-light" className="text-3xl text-white" />
                  <div>
                    <h4 className="mb-1 text-lg font-bold text-white font-cinzel">BioMetrics</h4>
                    <p className="text-[11px] font-light leading-relaxed text-white/40 font-jakarta">
                      Embedded tracking filaments connecting directly with satellite arrays.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="reveal-up order-1 lg:order-2 lg:col-span-7">
              <span className="mb-4 block text-xs font-bold uppercase tracking-[0.4em] text-sky-400">
                Tactical Artifacts
              </span>
              <h2 className="mb-6 text-4xl font-bold uppercase tracking-tight text-white sm:text-5xl font-cinzel">
                Engineered for the <span className="italic font-normal text-stroke">untamed</span> skies.
              </h2>
              <p className="mb-8 text-base font-light leading-relaxed text-white/50 sm:text-lg font-jakarta">
                Our equipment merges traditional silhouette styles with advanced scientific textiles. Designed to mimic the organic flow of nature while offering extreme resilience against elements.
              </p>
              <button className="rounded-sm bg-gradient-to-r from-sky-400 to-lime-400 px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-sky-950 transition-transform duration-300 hover:scale-105 font-jakarta">
                View Technical Catalog
              </button>
            </div>
          </div>
        </section>

        <section id="showcase" className="bg-gradient-to-b from-transparent to-sky-950/40 px-6 py-32 md:px-12">
          <div className="reveal-up mx-auto mb-20 max-w-7xl text-center">
            <span className="mb-4 block text-xs font-bold uppercase tracking-[0.4em] text-sky-400">
              Visual Captures
            </span>
            <h2 className="mb-6 text-4xl font-bold uppercase tracking-tight text-white sm:text-6xl font-cinzel">
              Cinematic Wall
            </h2>
            <p className="mx-auto max-w-xl text-base font-light text-white/40 font-jakarta">
              A glimpse through the lens of travelers who braved the altitudes and stood unified with the mountain wind.
            </p>
          </div>

          <div className="mx-auto grid max-w-7xl grid-cols-12 auto-rows-[240px] gap-4">
            <div className="reveal-up group relative col-span-12 overflow-hidden rounded-lg glass-card md:col-span-8">
              <img
                src="https://images.unsplash.com/photo-1454496522488-7a8e488e8606?auto=format&fit=crop&q=80&w=1200"
                alt="Gallery"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-transparent to-transparent opacity-60" />
            </div>
            <div className="reveal-up group relative col-span-12 overflow-hidden rounded-lg glass-card md:col-span-4" style={{ transitionDelay: "100ms" }}>
              <img
                src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=800"
                alt="Gallery"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-transparent to-transparent opacity-60" />
            </div>
            <div className="reveal-up group relative col-span-12 overflow-hidden rounded-lg glass-card md:col-span-4" style={{ transitionDelay: "200ms" }}>
              <img
                src="https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?auto=format&fit=crop&q=80&w=800"
                alt="Gallery"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-transparent to-transparent opacity-60" />
            </div>
            <div className="reveal-up group relative col-span-12 overflow-hidden rounded-lg glass-card md:col-span-8" style={{ transitionDelay: "300ms" }}>
              <img
                src="https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1200"
                alt="Gallery"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-950 via-transparent to-transparent opacity-60" />
            </div>
          </div>
        </section>

        <footer className="relative overflow-hidden border-t border-white/5 bg-[#040a12] px-6 pb-12 pt-32 md:px-12">
          <div className="absolute left-1/2 top-0 h-px w-full max-w-4xl -translate-x-1/2 bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
          <div className="relative z-10 mx-auto mb-20 grid max-w-7xl items-start gap-16 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <a href="#" className="mb-6 block text-2xl font-bold tracking-[0.3em] text-white font-cinzel">
                ZEPHYR
              </a>
              <p className="mb-8 max-w-sm text-sm font-light leading-relaxed text-white/40 font-jakarta">
                Born from deep mountain ridges, bright blue horizons, and the continuous flow of the high alpine drafts.
              </p>
              <div className="inline-flex items-center gap-2 rounded-sm border border-white/10 bg-white/5 px-4 py-2 text-xs text-white/60">
                <span className="h-2 w-2 rounded-full bg-lime-400" />
                Satellite Terminal Active
              </div>
            </div>

            <div className="grid w-full grid-cols-2 gap-12 md:grid-cols-3 lg:col-span-8">
              <div>
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400 font-jakarta">
                  Frontiers
                </h4>
                <ul className="space-y-4 text-sm font-light text-white/50 font-jakarta">
                  <li><a href="#" className="transition-colors hover:text-white">Ridge Tracks</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Summit Access</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Alpine Camps</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Live Feeds</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400 font-jakarta">
                  Company
                </h4>
                <ul className="space-y-4 text-sm font-light text-white/50 font-jakarta">
                  <li><a href="#" className="transition-colors hover:text-white">Our Stance</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Scientific Textiles</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Sovereign Alliance</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Dispatches</a></li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h4 className="mb-6 text-[10px] font-bold uppercase tracking-[0.3em] text-sky-400 font-jakarta">
                  Ascent Registry
                </h4>
                <p className="mb-4 text-xs font-light leading-relaxed text-white/40 font-jakarta">
                  Subscribe to receive immediate telemetry alerts and launch schedules.
                </p>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="Enter coordinates..."
                    className="w-full rounded-sm border border-white/10 bg-white/5 px-4 py-3 text-xs text-white placeholder:text-white/20 focus:border-sky-400 focus:outline-none font-jakarta"
                  />
                  <button className="absolute bottom-1 right-1 top-1 flex items-center justify-center rounded-sm bg-white px-3 text-sky-950 transition-colors hover:bg-sky-400 hover:text-white">
                    <Icon icon="ph:arrow-right-bold" className="text-sm" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] uppercase tracking-widest text-white/30 sm:flex-row">
            <p>© 2026 ZEPHYR. Horizons Unleashed.</p>
            <div className="flex gap-8">
              <a href="#" className="transition-colors hover:text-white">
                Encryption
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Protocols
              </a>
            </div>
          </div>
        </footer>
      </main>
    </main>
  );
}