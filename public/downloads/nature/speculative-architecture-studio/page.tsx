"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "@iconify/react";

const visionCards = [
  {
    number: "01 /",
    title: "Morphological Hardening",
    text: "Using smart crystalline matrix materials to build adaptive barriers that strengthen when subjected to intense structural pressure or atmospheric fluctuations.",
  },
  {
    number: "02 /",
    title: "Chronos Mapping",
    text: "Structural layouts engineered around chronological solar trajectories, ensuring internal lighting balances adapt instantly across shifting seasonal matrices.",
  },
  {
    number: "03 /",
    title: "Passive Isolation Nodes",
    text: "Acoustic and electromagnetic shield layers implemented natively into spatial framing blocks to offer complete offline containment units.",
  },
  {
    number: "04 /",
    title: "Generative Synthesis",
    text: "Algorithmic architectural generation parameters customized dynamically via connected data nodes before actual hardware modular structural assembly.",
  },
] as const;

const portfolioCards = [
  {
    code: "[ DES-MOD // 09 ]",
    title: "Colosseum Engineering & Empire Dynamics",
    text: "An extreme scale computational model merging classical stadium geometries with speculative floating acoustic ring elements designed for open plains.",
    tags: ["Solaris-Linked", "Concrete Poly"],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    span: "md:col-span-8",
    minHeight: "min-h-[500px]",
  },
  {
    code: "[ DES-MOD // 12 ]",
    title: "Adaptive High Fidelity Architecture",
    text: "Ultra minimalist living system using smart carbon compounds responding to wind vectors.",
    tags: ["Kinetic"],
    image:
      "https://images.unsplash.com/photo-1518005020951-eccb494ad742?q=80&w=800&auto=format&fit=crop",
    span: "md:col-span-4",
    minHeight: "min-h-[500px]",
  },
  {
    code: "[ DES-MOD // 14 ]",
    title: "Radically Different Banking Vaults",
    text: "Subterranean physical node structures engineered inside hyper-isolated granite formations.",
    tags: ["Crypto-Dense"],
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
    span: "md:col-span-4",
    minHeight: "min-h-[500px]",
  },
  {
    code: "[ DES-MOD // 21 ]",
    title: "Living Architecture & Atmospheric Observatories",
    text: "High altitude habitats matching cloud formations, providing absolute visual synthesis between users and planetary upper horizons.",
    tags: ["Bortle-Class 1", "Titanium Matrix"],
    image:
      "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop",
    span: "md:col-span-8",
    minHeight: "min-h-[500px]",
  },
] as const;

const telemetryNodes = [
  {
    label: "Node Alpha (Atacama)",
    status: "ONLINE // 99.4%",
    statusClass: "text-emerald-400",
    dotClass: "bg-emerald-400 animate-ping",
  },
  {
    label: "Node Beta (Svalbard)",
    status: "ONLINE // 98.1%",
    statusClass: "text-emerald-400",
    dotClass: "bg-emerald-400 animate-ping",
  },
  {
    label: "Node Gamma (Altiplano)",
    status: "CALIBRATING",
    statusClass: "text-cyan-400",
    dotClass: "bg-cyan-400",
  },
] as const;

const labOptions = {
  alt: ["Low", "Mid", "Extreme"],
  mat: ["Poly", "Titanium"],
  shd: ["Active", "Null"],
} as const;

export default function Page() {
  const navRef = useRef<HTMLElement | null>(null);
  const [params, setParams] = useState({
    alt: "Low",
    mat: "Poly",
    shd: "Active",
  });

  const vectorSpec = useMemo(() => {
    return `${params.alt.toUpperCase()}_${params.mat.toUpperCase()}_${params.shd.toUpperCase()}_CORE`;
  }, [params]);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const updateNav = () => {
      if (window.scrollY > 60) {
        nav.classList.add("bg-black/80", "backdrop-blur-md", "py-5", "border-white/5");
        nav.classList.remove("py-8", "border-white/0");
      } else {
        nav.classList.remove("bg-black/80", "backdrop-blur-md", "py-5", "border-white/5");
        nav.classList.add("py-8", "border-white/0");
      }
    };

    updateNav();
    window.addEventListener("scroll", updateNav, { passive: true });

    return () => window.removeEventListener("scroll", updateNav);
  }, []);

  const setLabParam = (category: keyof typeof params, value: string) => {
    setParams((current) => ({
      ...current,
      [category]: value,
    }));
  };

  return (
    <div className="overflow-x-hidden bg-[#030303] text-[#f4f4f5] antialiased selection:bg-cyan-500 selection:text-black">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700&family=Syne:wght@400;500;700;800&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background: #030303;
          color: #f4f4f5;
          font-family: "Plus Jakarta Sans", sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .font-display {
          font-family: "Syne", sans-serif;
        }

        .bento-item {
          background: linear-gradient(135deg, rgba(24, 24, 27, 0.7) 0%, rgba(9, 9, 11, 0.9) 100%);
          border: 1px solid rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bento-item:hover {
          border-color: rgba(6, 182, 212, 0.3);
          transform: translateY(-4px);
          box-shadow: 0 30px 60px -15px rgba(0, 0, 0, 0.8), 0 0 50px -10px rgba(6, 182, 212, 0.05);
        }

        ::-webkit-scrollbar {
          width: 6px;
        }

        ::-webkit-scrollbar-track {
          background: #030303;
        }

        ::-webkit-scrollbar-thumb {
          background: #27272a;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #06b6d4;
        }
      `}</style>

      <nav
        ref={navRef}
        id="navbar"
        className="fixed left-0 top-0 z-50 w-full border-b border-white/0 px-8 py-8 transition-all duration-500 lg:px-20"
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between">
          <a href="#" className="flex items-center gap-4">
            <span className="font-display text-2xl font-black tracking-tighter uppercase text-white">KØ//</span>
          </a>

          <div className="hidden items-center gap-16 font-display text-[11px] font-medium uppercase tracking-[0.35em] text-white md:flex">
            <a href="#vision" className="transition-colors hover:text-white">
              Vision
            </a>
            <a href="#works" className="transition-colors hover:text-white">
              Works
            </a>
            <a href="#telemetry" className="transition-colors hover:text-white">
              Telemetry
            </a>
            <a href="#lab" className="transition-colors hover:text-white">
              Lab Workspace
            </a>
          </div>

          <div>
            <a
              href="#connect"
              className="bg-white px-6 py-3.5 font-display text-[11px] font-bold uppercase tracking-[0.35em] text-black transition-colors hover:bg-cyan-400"
            >
              Initialize
            </a>
          </div>
        </div>
      </nav>

      <header className="relative flex h-screen w-full items-center overflow-hidden">
        <div className="absolute inset-0 z-0 h-full w-full">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#030303] via-[#030303]/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-[#030303]/40" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-[1600px] grid-cols-1 items-center gap-12 px-8 lg:grid-cols-12 lg:px-20">
          <div className="space-y-8 lg:col-span-8">
            <h1 className="font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-white md:text-8xl">
              Spaces <br />
              <span className="bg-gradient-to-r from-cyan-400 via-teal-200 to-white bg-clip-text text-transparent">
                That Breathe.
              </span>
            </h1>

            <p className="max-w-xl text-base leading-relaxed text-white font-light [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,0.9),0_0_32px_rgba(0,0,0,0.6)] md:text-lg">
              We engineer physical landscapes governed by digital frameworks. Discover high-fidelity speculative installations designed for radical isolation, planetary transcendence, and extreme permanence.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#works"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-5 font-display text-xs font-bold uppercase tracking-[0.35em] text-black shadow-lg shadow-cyan-500/15 transition-all hover:brightness-110"
              >
                Explore Showcases
              </a>
              <a
                href="#vision"
                className="border border-white/10 px-8 py-5 font-display text-xs font-medium uppercase tracking-[0.35em] text-white backdrop-blur-md transition-colors hover:border-white/30"
              >
                Read Philosophy
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-8 z-20 flex items-center gap-12 font-display text-[10px] uppercase tracking-[0.35em] text-zinc-200 lg:left-20">
          <div>[ ARCH TYPE : SPECULATIVE ]</div>
          <div>[ COORD : 77.0092° N ]</div>
        </div>
      </header>

      <section id="vision" className="relative mx-auto max-w-[1600px] border-t border-white/5 px-8 py-40 lg:px-20">
        <div className="grid items-start gap-16 lg:grid-cols-12">
          <div className="space-y-6 lg:sticky lg:top-32 lg:col-span-4">
            <span className="block font-display text-xs font-bold uppercase tracking-[0.35em] text-cyan-400">
              {/* 01 CORE STRUCT */}
            </span>
            <h2 className="font-display text-4xl font-black uppercase leading-none text-white md:text-6xl">
              The Framework Manifesto
            </h2>
            <p className="leading-relaxed text-white font-light">
              Traditional design binds structure to coordinates. We design spaces that fluctuate dynamically with environmental parameters, transforming walls into environmental monitors and structures into alive objects.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {visionCards.map((item) => (
              <div key={item.title} className="border border-white/5 bg-zinc-900/20 p-12 transition-colors hover:border-zinc-800">
                <span className="mb-8 block font-display text-5xl font-black text-zinc-800">{item.number}</span>
                <h3 className="mb-8 font-display text-xl font-bold uppercase text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-white font-light">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="works" className="relative border-y border-white/5 bg-[#09090b] py-40">
        <div className="mx-auto max-w-[1600px] px-8 lg:px-20">
          <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <span className="mb-2 block font-display text-xs font-bold uppercase tracking-[0.35em] text-cyan-400">
                {/* 02 PORTFOLIO INDEX */}
              </span>
              <h2 className="font-display text-4xl font-black uppercase leading-none text-white md:text-7xl">
                Selected Render Modules
              </h2>
            </div>

            <div className="flex gap-4 font-display text-[10px] uppercase tracking-[0.35em] text-white">
              <button className="border border-white/10 bg-white/5 px-4 py-2 text-white">All Files</button>
              <button className="border border-white/5 px-4 py-2 transition-colors hover:border-white/20">Monolithic</button>
              <button className="border border-white/5 px-4 py-2 transition-colors hover:border-white/20">Subterranean</button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
            {portfolioCards.map((card) => (
              <div
                key={card.code}
                className={`bento-item relative flex flex-col justify-between overflow-hidden p-8 md:p-12 ${card.span} ${card.minHeight} group`}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale opacity-10 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-20"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
                <div className="relative z-10 flex items-start justify-between">
                  <span className="font-mono text-xs tracking-widest text-cyan-400">{card.code}</span>
                  <Icon
                    icon="lucide:arrow-up-right"
                    className="text-2xl text-zinc-600 transition-all duration-500 group-hover:rotate-45 group-hover:text-cyan-400"
                  />
                </div>

                <div className="relative z-10 max-w-xl space-y-4">
                  <h3 className="font-display text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
                    {card.title}
                  </h3>
                  <p className="text-sm font-light text-white">{card.text}</p>
                  <div className="flex flex-wrap gap-3 pt-4 text-[9px] font-mono uppercase tracking-wider text-zinc-500">
                    {card.tags.map((tag) => (
                      <span key={tag} className="border border-white/10 px-2 py-1">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="telemetry" className="relative mx-auto max-w-[1600px] px-8 py-40 lg:px-20">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-5">
            <div>
              <span className="mb-2 block font-display text-xs font-bold uppercase tracking-[0.35em] text-cyan-400">
                {/* 03 SYSTEM LIVE METRICS */}
              </span>
              <h2 className="font-display text-4xl font-black uppercase leading-none text-white md:text-6xl">
                Active Environmental Nodes
              </h2>
            </div>

            <p className="leading-relaxed text-white font-light">
              Track the structural deployment parameters across our global specimen fields. These modules report environmental density vectors, local wind coefficients, and system autonomy health values.
            </p>

            <div className="space-y-4 pt-4">
              {telemetryNodes.map((node) => (
                <div key={node.label} className="flex items-center justify-between border border-white/5 bg-zinc-900/10 p-4">
                  <span className="text-xs uppercase tracking-wider text-white">{node.label}</span>
                  <span className={`flex items-center gap-2 text-xs font-mono ${node.statusClass}`}>
                    <span className={`h-1.5 w-1.5 rounded-full ${node.dotClass}`} />
                    {node.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden border border-white/10 bg-gradient-to-br from-zinc-900/40 to-black p-8 backdrop-blur-md lg:col-span-7 md:p-12">
            <div className="absolute right-0 top-0 p-4 font-mono text-[9px] text-zinc-600">SYS_DIAG_V4.0</div>
            <h3 className="mb-8 flex items-center gap-3 font-display text-lg font-bold uppercase tracking-wider text-white">
              <Icon icon="lucide:cpu" className="text-cyan-400" /> Spatial Simulation Readout
            </h3>

            <div className="space-y-6">
              <div>
                <div className="mb-2 flex justify-between text-xs font-mono text-white">
                  <span>ATMOSPHERIC ISOLATION INDEX</span>
                  <span className="text-cyan-400">87%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500" style={{ width: "87%" }} />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-xs font-mono text-white">
                  <span>STRUCTURAL INTEGRITY COEFFICIENT</span>
                  <span>94.2%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" style={{ width: "94.2%" }} />
                </div>
              </div>

              <div>
                <div className="mb-2 flex justify-between text-xs font-mono text-white">
                  <span>LIGHT REGISTRATION DEPTH</span>
                  <span>BORTLE 1</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-800">
                  <div className="h-full rounded-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: "100%" }} />
                </div>
              </div>
            </div>

            <div className="mt-12 rounded border border-white/5 bg-white/5 p-4 font-mono text-[11px] leading-relaxed text-white">
              <span className="text-cyan-400">SYSTEM LOG:</span> Speculative vector sequences have initialized cleanly. Structural modules maintain load-bearing optimization against atmospheric cross-winds. Ready for external deployment simulation sequences.
            </div>
          </div>
        </div>
      </section>

      <section id="lab" className="relative border-t border-white/5 bg-zinc-950 py-40">
        <div className="mx-auto max-w-4xl px-8 text-center">
          <div className="space-y-12">
            <div>
              <span className="mb-2 block font-display text-xs font-bold uppercase tracking-[0.35em] text-cyan-400">
                {/* 04 INTERACTIVE CORE */}
              </span>
              <h2 className="font-display text-4xl font-black uppercase text-white md:text-6xl">
                Lab Space Parameters
              </h2>
            </div>

            <p className="mx-auto max-w-xl text-sm leading-relaxed text-white md:text-base font-light">
              Alter the parameters below to test structural adaptability thresholds across virtual environment configurations.
            </p>

            <div className="grid gap-8 border border-white/5 bg-black/40 p-8 text-left sm:grid-cols-3">
              <div className="space-y-3">
                <label className="block font-display text-[10px] uppercase tracking-wider text-white">Altitude Layer</label>
                <div className="flex gap-2">
                  {labOptions.alt.map((option) => {
                    const active = params.alt === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setLabParam("alt", option)}
                        className={`px-3 py-1.5 font-mono text-[11px] border transition-colors ${active ? "border-white/10 bg-white/10 text-white" : "border-white/5 text-zinc-500 hover:text-white"
                          }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block font-display text-[10px] uppercase tracking-wider text-white">Material Core</label>
                <div className="flex gap-2">
                  {labOptions.mat.map((option) => {
                    const active = params.mat === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setLabParam("mat", option)}
                        className={`px-3 py-1.5 font-mono text-[11px] border transition-colors ${active ? "border-white/10 bg-white/10 text-white" : "border-white/5 text-zinc-500 hover:text-white"
                          }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block font-display text-[10px] uppercase tracking-wider text-white">Shielding Matrix</label>
                <div className="flex gap-2">
                  {labOptions.shd.map((option) => {
                    const active = params.shd === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setLabParam("shd", option)}
                        className={`px-3 py-1.5 font-mono text-[11px] border transition-colors ${active ? "border-white/10 bg-white/10 text-white" : "border-white/5 text-zinc-500 hover:text-white"
                          }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="border border-dashed border-zinc-800 bg-zinc-900/30 p-6 font-mono text-xs text-zinc-500">
              CALCULATED VECTOR SPECIFICATION: <span className="text-white">{vectorSpec}</span>
            </div>
          </div>
        </div>
      </section>

      <section id="connect" className="relative mx-auto max-w-[1600px] border-t border-white/5 px-8 py-40 lg:px-20">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div className="space-y-6">
            <span className="block font-display text-xs font-bold uppercase tracking-[0.35em] text-cyan-400">
              {/* 05 CONNECT INTERFACE */}
            </span>
            <h2 className="font-display text-4xl font-black uppercase leading-none text-white md:text-7xl">
              Initiate Core Spatial Brief
            </h2>
            <p className="max-w-md leading-relaxed text-white font-light">
              Submit your parameters to request vector files, blueprint readouts, or spatial engineering collaboration sequences.
            </p>
          </div>

          <div className="relative border border-white/5 bg-zinc-900/10 p-8 md:p-12">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                window.alert("Broadcasting telemetry signal request packet downrange... Connection successful.");
              }}
              className="space-y-8"
            >
              <div className="relative">
                <input
                  type="text"
                  required
                  id="identity"
                  className="w-full border-b border-zinc-800 bg-transparent py-4 font-mono text-xs uppercase tracking-wider text-white placeholder-zinc-700 focus:border-cyan-400 focus:outline-none"
                  placeholder="IDENTITY / COMPANY"
                />
              </div>

              <div className="relative">
                <input
                  type="email"
                  required
                  id="comms"
                  className="w-full border-b border-zinc-800 bg-transparent py-4 font-mono text-xs uppercase tracking-wider text-white placeholder-zinc-700 focus:border-cyan-400 focus:outline-none"
                  placeholder="SECURE_COMMUNICATION_ROUTE@HOST"
                />
              </div>

              <div className="relative">
                <textarea
                  id="brief"
                  rows={3}
                  className="w-full resize-none border-b border-zinc-800 bg-transparent py-4 font-mono text-xs uppercase tracking-wider text-white placeholder-zinc-700 focus:border-cyan-400 focus:outline-none"
                  placeholder="PROJECT PARAMETERS AND COORD BRIEF"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white py-5 font-display text-xs font-bold uppercase tracking-[0.35em] text-black transition-colors hover:bg-cyan-400"
              >
                Broadcast Request
              </button>
            </form>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-black px-8 py-20 text-xs text-zinc-600 lg:px-20 font-mono">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-12 md:flex-row">
          <div className="flex flex-wrap items-center justify-center gap-8 md:justify-start">
            <span className="font-display text-lg font-black tracking-tighter text-white uppercase">KØ//</span>
            <span>&copy; 2026 KRONOS LABS INC. SPECULATIVE ARCHITECTURE SYNTHESIS.</span>
          </div>

          <div className="flex gap-8 text-[10px] uppercase tracking-wider text-zinc-500">
            <a href="#" className="transition-colors hover:text-cyan-400">
              DIAGNOSTICS
            </a>
            <a href="#" className="transition-colors hover:text-cyan-400">
              CORE_API
            </a>
            <a href="#" className="transition-colors hover:text-cyan-400">
              NETWORK_LEGAL
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}