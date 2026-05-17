"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const navigationItems = [
  { label: "Elevation", href: "#elevation" },
  { label: "Perception", href: "#perceptions" },
  { label: "Telemetry", href: "#metrics" },
  { label: "Isolation", href: "#isolation" },
] as const;

const elevationCards = [
  {
    icon: "lucide:mountain-snow",
    title: "Apex Architecture",
    text: "Solid rock foundations engineered naturally to provide permanent grounding amidst shifting aerial and cosmic currents.",
  },
  {
    icon: "lucide:cloud",
    title: "Cloud Diffusion",
    text: "A permanent natural visual dampener isolating your lower line of sight from urbanization and structural activity.",
  },
  {
    icon: "lucide:sparkles",
    title: "Cosmic Alignment",
    text: "Direct, unaltered exposure to deep star fields and solar transitions without light distortion or dust scattering.",
  },
  {
    icon: "lucide:maximize-2",
    title: "Scale Shift",
    text: "Recalibrate personal cognitive importance by visually cross-referencing your presence with planetary geometry.",
  },
] as const;

const perceptionStages = [
  {
    stage: "Stage I",
    title: "Visual Decompression",
    text: "The eye shifts focal distance from immediate micro-screens to multi-kilometer horizons. Ciliary muscles relax entirely as structural layouts give way to atmospheric curvature.",
  },
  {
    stage: "Stage II",
    title: "Acoustic Erasure",
    text: "Low-frequency machinery hums and atmospheric reflection drop to absolute zero. Sounds are limited to immediate wind currents passing across high mountain geometry.",
  },
  {
    stage: "Stage III",
    title: "Noetic Expansion",
    text: "The observer experiences raw integration with structural cosmos patterns. Thought processes streamline as systemic terrestrial constraints become visually insignificant.",
  },
] as const;

const telemetryRows = [
  ["Zenith Peak", "8,848m", "0.31 atm", "Optimal", "Active"],
  ["Horizon Spine", "6,268m", "0.44 atm", "Optimal", "Active"],
  ["Apex Ridge", "5,895m", "0.49 atm", "Stable", "Active"],
  ["Stratum Point", "4,810m", "0.57 atm", "Turbulent", "Standby"],
] as const;

const footerColumns = {
  "Grid Networks": ["Summit Nodes", "Barometric Arrays", "Optical Feeds"],
  Protocols: ["Isolation Loop", "Altitude Bounds", "Core Systems"],
} as const;

export default function Page() {
  const navRef = useRef<HTMLElement | null>(null);
  const sequenceFormRef = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      if (window.scrollY > 40) {
        nav.classList.add("bg-apex-base/80", "py-2");
        nav.classList.remove("py-4");
      } else {
        nav.classList.remove("bg-apex-base/80", "py-2");
        nav.classList.add("py-4");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    const form = sequenceFormRef.current;
    const onSubmit = (event: Event) => {
      event.preventDefault();
      window.alert("Sequence parameters integrated into current spatial vector.");
    };

    form?.addEventListener("submit", onSubmit);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      form?.removeEventListener("submit", onSubmit);
    };
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#02040a] text-slate-50 antialiased selection:bg-sky-400 selection:text-slate-950 custom-scrollbar">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Syne:wght@400;500;700;800&family=Plus+Jakarta+Sans:wght@200;300;400;500;600&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #02040a;
          color: #f8fafc;
          font-family: "Plus Jakarta Sans", sans-serif;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        .font-heading {
          font-family: "Syne", sans-serif;
        }

        .text-stroke {
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
          color: transparent;
        }

        .glass-panel {
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #02040a;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #38bdf8;
        }
      `}</style>

      <nav
        ref={navRef}
        id="top-navigation"
        className="fixed left-0 top-0 z-50 w-full border-b border-white/5 bg-apex-base/20 py-4 backdrop-blur-md transition-all duration-300"
      >
        <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-6">
          <a href="#" className="group flex items-center gap-4">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10 transition-colors group-hover:border-sky-400">
              <Icon icon="lucide:unfold-horizontal" className="text-lg text-sky-400" />
            </div>
            <span className="font-heading text-xl font-bold tracking-tight uppercase">Vertex</span>
          </a>

          <div className="hidden items-center gap-12 text-xs font-medium uppercase tracking-[0.2em] md:flex font-heading">
            {navigationItems.map((item) => (
              <a key={item.label} href={item.href} className="text-slate-400 transition-colors hover:text-white">
                {item.label}
              </a>
            ))}
          </div>

          <div>
            <button className="rounded-none border border-white/10 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 hover:bg-white hover:text-[#02040a] font-heading">
              Connect System
            </button>
          </div>
        </div>
      </nav>

      <header className="relative flex h-screen items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 h-full w-full">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[#02040a]/80 via-transparent to-[#02040a]/20" />
        </div>

        <div className="relative z-10 mx-auto mt-16 grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-sky-400" />
              <span className="font-heading text-[10px] font-bold uppercase tracking-widest text-slate-300">
                Observation Vector Active
              </span>
            </div>

            <h1 className="mb-8 text-4xl font-black uppercase leading-none tracking-tighter md:text-6xl font-heading lg:text-7xl">
              The Edge <br />
              <span className="text-stroke">Of Absolute</span> <br />
              Stillness
            </h1>

            <p className="mb-10 max-w-xl text-lg leading-relaxed text-slate-300 font-light">
              Detach completely from the lower architectural framework. Stand elevated above structural cloud ceilings to interpret planetary movement in pure isolation.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <a href="#elevation" className="bg-sky-400 px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#02040a] transition-colors duration-300 hover:bg-white font-heading">
                Explore Altitude
              </a>
              <a href="#metrics" className="bg-white/5 px-8 py-4 text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white/10 font-heading border border-white/10">
                Live Matrix
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-12 left-1/2 z-20 -translate-x-1/2">
          <a href="#elevation" className="group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 transition-colors duration-300 hover:border-sky-400">
            <Icon icon="lucide:chevron-down" className="text-slate-400 transition-colors group-hover:text-sky-400" />
          </a>
        </div>
      </header>

      <section id="elevation" className="mx-auto max-w-7xl border-t border-white/5 px-6 py-32">
        <div className="grid items-center gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-sky-400 font-heading">
              01 / Stratum
            </span>
            <h2 className="mb-8 text-4xl font-extrabold uppercase tracking-tight md:text-5xl font-heading">
              Above the structural friction.
            </h2>
            <p className="mb-6 leading-relaxed text-slate-400 font-light">
              Humanity spends its lifecycles inside dense atmospheric envelopes, trapped by architectural density and local noise. Vertex shifts the anchor point upward, establishing a platform where external space and interior focus intersect cleanly.
            </p>
            <p className="mb-8 leading-relaxed text-slate-400 font-light">
              By scaling the highest summits of the mind, cloud tiers become placeholders for the noise you leave behind.
            </p>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="font-heading text-3xl font-bold text-white">4.2K</span>
                <span className="text-xs uppercase tracking-wider text-slate-500">Vertical Anchor Points</span>
              </div>
              <div className="h-10 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="font-heading text-3xl font-bold text-white">Zero</span>
                <span className="text-xs uppercase tracking-wider text-slate-500">Terrestrial Distraction</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {elevationCards.map((card) => (
              <div key={card.title} className="group border border-white/5 bg-[#090d16]/50 p-8 transition-all duration-300 hover:border-sky-400/30">
                <div className="mb-6 flex h-12 w-12 items-center justify-center bg-white/5 transition-colors group-hover:bg-sky-400/10">
                  <Icon icon={card.icon} className="text-2xl text-slate-400 transition-colors group-hover:text-sky-400" />
                </div>
                <h3 className="mb-4 text-lg font-bold uppercase tracking-tight text-white font-heading">{card.title}</h3>
                <p className="text-sm leading-relaxed text-slate-400 font-light">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="perceptions" className="relative overflow-hidden border-y border-white/5 bg-[#090d16] py-32">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500/5 blur-[160px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-6">
          <div className="mb-20 max-w-3xl">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-sky-400 font-heading">
              02 / Theoretical Modality
            </span>
            <h2 className="text-4xl font-extrabold uppercase leading-none tracking-tight text-white md:text-6xl font-heading">
              Decouple from temporal sequences.
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {perceptionStages.map((item) => (
              <div key={item.stage} className="border-t border-white/10 pt-8">
                <span className="mb-4 block text-xs font-bold text-slate-500 font-heading">{item.stage}</span>
                <h4 className="mb-4 text-xl font-bold uppercase tracking-tight text-white font-heading">{item.title}</h4>
                <p className="text-sm leading-relaxed text-slate-400 font-light">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="metrics" className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-20 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-sky-400 font-heading">
              03 / Structural Telemetry
            </span>
            <h2 className="text-4xl font-extrabold uppercase tracking-tight font-heading">Observational Constants</h2>
          </div>
          <div className="border-b border-white/10 pb-2 text-xs uppercase tracking-widest text-slate-400 font-heading">
            Real-Time Outpost Matrix
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <table className="min-w-[600px] w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-widest text-slate-500 font-heading">
                <th className="pb-6">Station Alpha</th>
                <th className="pb-6">Altitude (M)</th>
                <th className="pb-6">Atmospheric Index</th>
                <th className="pb-6">Cohesion Factor</th>
                <th className="pb-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm font-light">
              {telemetryRows.map((row) => {
                const [station, altitude, atmosphere, factor, status] = row;
                const factorClass = factor === "Stable" ? "text-emerald-400" : factor === "Turbulent" ? "text-amber-400" : "text-sky-400";
                const statusClass = status === "Standby" ? "bg-white/5 text-slate-400" : "bg-sky-400/10 text-sky-400";
                return (
                  <tr key={station} className="transition-colors hover:bg-white/[0.02]">
                    <td className="py-6 font-heading font-bold uppercase tracking-wider text-white">{station}</td>
                    <td className="py-6 font-mono text-slate-300">{altitude}</td>
                    <td className="py-6 font-mono text-slate-300">{atmosphere}</td>
                    <td className={factorClass}>{factor}</td>
                    <td className="py-6 text-right">
                      <span className={`px-2 py-1 text-[10px] font-heading font-bold uppercase tracking-widest ${statusClass}`}>
                        {status}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      <section id="isolation" className="relative overflow-hidden border-t border-white/5 bg-[#04060e] py-40">
        <div className="absolute inset-0 mix-blend-color-dodge opacity-20">
          <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-10 flex h-16 w-16 items-center justify-center rounded-full border border-sky-400/30 bg-sky-400/5 shadow-[0_0_30px_rgba(56,189,248,0.1)]">
            <Icon icon="lucide:terminal" className="text-2xl text-sky-400" />
          </div>

          <h2 className="mb-6 text-4xl font-black uppercase tracking-tight text-white md:text-6xl font-heading">
            Initiate Separation Sequence
          </h2>

          <p className="mx-auto mb-12 max-w-xl text-base leading-relaxed text-slate-400 font-light md:text-lg">
            Provide your terminal configuration to synchronize with elevated structural grids. Clearance level alpha validation enforced automatically.
          </p>

          <form ref={sequenceFormRef} id="sequence-form" className="mx-auto grid max-w-md grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="sm:col-span-2">
              <input
                type="email"
                required
                placeholder="TERMINAL_IDENTIFIER@DOMAIN"
                className="h-14 w-full rounded-none border border-white/10 bg-apex-base/80 px-6 font-mono text-xs uppercase tracking-widest text-white transition-colors placeholder:text-slate-600 focus:border-sky-400 focus:outline-none"
              />
            </div>
            <div>
              <button
                type="submit"
                className="h-14 w-full rounded-none bg-white text-xs font-bold uppercase tracking-widest text-[#02040a] transition-colors duration-300 hover:bg-sky-400 font-heading"
              >
                Execute
              </button>
            </div>
          </form>

          <div className="mt-8 text-[10px] uppercase tracking-[0.25em] text-slate-500 font-mono">
            End-to-end data isolation routing active.
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-apex-base px-6 py-20">
        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-sky-400/30 bg-sky-400/10">
                <Icon icon="lucide:unfold-horizontal" className="text-lg text-sky-400" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight uppercase">Vertex</span>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-slate-500 font-light">
              Non-terrestrial observatory platform monitoring biological cohesion from spatial coordinates.
            </p>
          </div>

          <div className="md:col-span-3">
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-white font-heading">Grid Networks</h5>
            <ul className="space-y-3 text-[11px] uppercase tracking-wider text-slate-500 font-mono">
              {footerColumns["Grid Networks"].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-sky-400">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-white font-heading">Protocols</h5>
            <ul className="space-y-3 text-[11px] uppercase tracking-wider text-slate-500 font-mono">
              {footerColumns.Protocols.map((item) => (
                <li key={item}>
                  <a href="#" className="transition-colors hover:text-sky-400">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h5 className="mb-6 text-xs font-bold uppercase tracking-widest text-white font-heading">Interface</h5>
            <div className="flex items-center gap-3">
              <a href="#" className="flex h-9 w-9 items-center justify-center border border-white/10 text-slate-400 transition-all hover:border-sky-400 hover:text-sky-400">
                <Icon icon="lucide:terminal" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center border border-white/10 text-slate-400 transition-all hover:border-sky-400 hover:text-sky-400">
                <Icon icon="lucide:cpu" />
              </a>
              <a href="#" className="flex h-9 w-9 items-center justify-center border border-white/10 text-slate-400 transition-all hover:border-sky-400 hover:text-sky-400">
                <Icon icon="lucide:activity" />
              </a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[11px] text-slate-600 font-mono sm:flex-row">
          <div>VERTEX GLOBAL OVERLOOK &copy; 2026</div>
          <div className="flex items-center gap-2 uppercase tracking-widest text-[10px]">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            Node Connected
          </div>
        </div>
      </footer>
    </div>
  );
}
