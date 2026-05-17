"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const contemplationCards = [
  {
    icon: "lucide:eye",
    title: "Unobstructed Sightlines",
    text: "Observe without the scattering effects of the dense lower atmosphere. Pristine visual telemetry extending across terminal vectors.",
    tone: "cyan",
  },
  {
    icon: "lucide:wind",
    title: "Atmospheric Envelope",
    text: "Trace the fragile blue boundaries shielding planetary complexity from deep void environments. A dynamic barrier in permanent evolution.",
    tone: "emerald",
  },
  {
    icon: "lucide:activity",
    title: "Chronostasis Phase",
    text: "Experience a non-linear flow of time. Orbital velocities decouple your perception from typical day-to-night transitions.",
    tone: "indigo",
  },
  {
    icon: "lucide:mountain",
    title: "The Terrestrial Core",
    text: "Connect conceptually with solid landmasses, lithospheric plates, and profound ocean basins breathing synchronously beneath the cloud layers.",
    tone: "purple",
  },
];

const dimensions = [
  {
    value: "6,371",
    suffix: "km",
    title: "Mean Planetary Radius",
    text: "The foundational dimensional constant defining structural gravitational bounds and orbital baseline geometry.",
    dot: "bg-cyan-500",
    glow: "shadow-[0_0_10px_#06b6d4]",
  },
  {
    value: "7.29",
    suffix: "e-5",
    title: "Angular Angular Velocity",
    text: "Radians per second driving atmospheric Coriolis currents, global weather bands, and structural field dynamics.",
    dot: "bg-slate-700",
    hoverDot: "group-hover:bg-cyan-500",
  },
  {
    value: "510.1",
    suffix: "M²",
    title: "Surface Area Horizon",
    text: "Total square kilometers of continuous biological and topographical processes visible from outer perimeter outposts.",
    dot: "bg-slate-700",
    hoverDot: "group-hover:bg-cyan-500",
  },
];

const ecosystemLinks = [
  ["lucide:layers", "Tropospheric Boundary Analytics", "text-cyan-400"],
  ["lucide:globe", "Continental Carbon Sink Tracking", "text-emerald-400"],
  ["lucide:radio", "Electromagnetic Ionosphere Auditing", "text-purple-400"],
];

const stats = [
  ["LON:", "72.5412° W"],
  ["LAT:", "13.6339° S"],
  ["PRES:", "0.004 PA"],
];

export default function Page() {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      if (window.scrollY > 40) {
        nav.classList.add("nav-fixed", "py-4");
        nav.classList.remove("py-6");
      } else {
        nav.classList.remove("nav-fixed", "py-4");
        nav.classList.add("py-6");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020617] text-[#f8fafc] antialiased selection:bg-cyan-500 selection:text-slate-950">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Cinzel:wght@400;600;700&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #020617;
          color: #f8fafc;
          font-family: "Plus Jakarta Sans", sans-serif;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        .font-serif {
          font-family: "Cinzel", serif;
        }

        .blur-pill {
          background: rgba(255, 255, 255, 0.03);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .nav-fixed {
          background: rgba(2, 6, 23, 0.4);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.04);
        }

        .ambient-glow {
          box-shadow: 0 0 60px -15px rgba(6, 182, 212, 0.15);
        }

        .sidebar-indicator {
          height: 1px;
          width: 24px;
          background-color: rgba(255, 255, 255, 0.2);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .sidebar-item:hover .sidebar-indicator,
        .sidebar-item.active .sidebar-indicator {
          width: 48px;
          background-color: #06b6d4;
        }

        .metric-dot {
          position: absolute;
          left: -33px;
          top: 0;
          width: 0.5rem;
          height: 0.5rem;
          border-radius: 9999px;
          transition: background-color 0.3s ease;
        }

        @media (min-width: 768px) {
          .metric-dot {
            left: -49px;
          }
        }
      `}</style>

      <nav ref={navRef} id="navbar" className="fixed left-0 top-0 z-50 w-full py-6 transition-all duration-300">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8">
          <a href="#" className="flex items-center gap-2.5">
            <Icon icon="lucide:compass" className="text-2xl text-cyan-400" />
            <span className="font-serif text-lg font-semibold tracking-[0.25em] uppercase">Aura</span>
          </a>

          <div className="hidden items-center gap-10 text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400 lg:flex">
            <a href="#contemplate" className="transition-colors hover:text-white">Contemplate</a>
            <a href="#dimensions" className="transition-colors hover:text-white">Dimensions</a>
            <a href="#ecosystem" className="transition-colors hover:text-white">Ecosystem</a>
            <a href="#summit" className="transition-colors hover:text-white">Summit</a>
          </div>

          <div>
            <a href="#" className="blur-pill rounded-full px-6 py-2.5 text-xs font-semibold uppercase tracking-widest text-slate-200 transition-all duration-300 hover:border-white hover:bg-white hover:text-slate-950">
              Ascend
            </a>
          </div>
        </div>
      </nav>

      <div className="fixed right-8 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-6 mix-blend-difference md:flex">
        {[
          ["Origin", "active"],
          ["Altitude", ""],
          ["Metrics", ""],
          ["Sphere", ""],
        ].map(([label, active]) => (
          <a key={label} href={`#${label.toLowerCase() === "origin" ? "" : label.toLowerCase()}`} className={`sidebar-item ${active} flex items-center justify-end gap-3 group`}>
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300 opacity-0 transition-opacity group-hover:opacity-100">{label}</span>
            <div className="sidebar-indicator" />
          </a>
        ))}
      </div>

      <header className="relative flex min-h-screen items-center justify-start overflow-hidden px-6 lg:px-32">
        <video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/40" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-slate-950 via-transparent to-transparent" />

        <div className="relative z-20 mt-12 max-w-4xl">
          <div className="mb-8 flex items-center gap-3">
            <div className="h-px w-8 bg-cyan-500" />
            <span className="text-xs font-bold uppercase tracking-[0.4em] text-cyan-400">Altitude 400,000M</span>
          </div>

          <h1 className="mb-8 text-5xl font-light leading-[1.05] tracking-tight text-white md:text-7xl lg:text-8xl font-serif">
            Sit above <br />
            <span className="bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text font-sans text-transparent font-extrabold uppercase tracking-tighter">
              The tumult
            </span>
          </h1>

          <p className="mb-12 max-w-xl text-base leading-relaxed text-slate-300 font-light md:text-lg">
            A solitary summit overlooking infinite atmospheres. Transcend standard reference frames and observe the terrestrial architecture as a singular living consciousness.
          </p>

          <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
            <a href="#contemplate" className="bg-white px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-950 transition-colors duration-300 hover:bg-cyan-400">
              Begin Isolation
            </a>
            <a href="#dimensions" className="blur-pill px-8 py-4 text-center text-xs font-semibold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-white/10">
              Analyze Stratum
            </a>
          </div>
        </div>

        <div className="absolute bottom-12 left-6 z-20 flex flex-wrap items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-slate-500 sm:gap-12 lg:left-40">
          {stats.map(([label, value]) => (
            <div key={label} className="flex items-center gap-2">
              <span className="text-slate-300">{label}</span> {value}
            </div>
          ))}
        </div>
      </header>

      <section id="contemplate" className="relative border-t border-slate-900 bg-slate-950 px-6 py-36 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-start gap-16 lg:grid-cols-12">
            <div className="lg:sticky lg:top-32 lg:col-span-4">
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-cyan-500">01 / Contemplation</span>
              <h2 className="mb-6 text-3xl font-normal tracking-tight text-white md:text-5xl font-serif">The stillness of hyper-presence.</h2>
              <p className="mb-8 font-light leading-relaxed text-slate-400">
                Detached from temporal friction, the mind aligns with global phenomena. Watch cyclonic formations, city filaments, and celestial auroras emerge seamlessly along the curve of the horizon.
              </p>
              <div className="h-px w-16 bg-slate-800" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:col-span-8">
              {contemplationCards.map((card) => (
                <div key={card.title} className={`blur-pill rounded-2xl p-10 ${card.tone === "cyan" ? "ambient-glow" : ""}`}>
                  <div className={`mb-8 flex h-10 w-10 items-center justify-center rounded-xl border ${card.tone === "cyan" ? "border-cyan-500/20 bg-cyan-500/10" : card.tone === "emerald" ? "border-emerald-500/20 bg-emerald-500/10" : card.tone === "indigo" ? "border-indigo-500/20 bg-indigo-500/10" : "border-purple-500/20 bg-purple-500/10"}`}>
                    <Icon icon={card.icon} className={`text-lg ${card.tone === "cyan" ? "text-cyan-400" : card.tone === "emerald" ? "text-emerald-400" : card.tone === "indigo" ? "text-indigo-400" : "text-purple-400"}`} />
                  </div>
                  <h3 className="mb-4 text-lg font-bold tracking-tight">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400 font-light">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="dimensions" className="relative overflow-hidden bg-[#040817] px-6 py-32 lg:px-16">
        <div className="pointer-events-none absolute -right-48 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-500/5 blur-[125px]" />

        <div className="mx-auto max-w-7xl">
          <div className="mb-20">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-slate-500">02 / Telemetric Coordinates</span>
            <h2 className="max-w-2xl text-3xl font-normal tracking-tight text-white md:text-5xl font-serif">Quantifying the structural grandeur.</h2>
          </div>

          <div className="grid grid-cols-1 gap-12 border-l border-slate-800 pl-8 md:grid-cols-3 md:pl-12">
            {dimensions.map((item, index) => (
              <div key={item.title} className="group relative">
                <div className={`metric-dot ${item.dot} ${item.hoverDot ?? ""} ${item.glow ?? ""}`} />
                <p className="mb-4 text-6xl font-light tracking-tight text-white font-serif">
                  {item.value}<span className="ml-1 text-xl font-medium text-cyan-400 font-sans">{item.suffix}</span>
                </p>
                <h4 className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-400">{item.title}</h4>
                <p className="text-xs leading-relaxed text-slate-500 font-light">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="ecosystem" className="bg-slate-950 px-6 py-36 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div className="relative">
              <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-emerald-500/5 blur-[100px]" />
              <div className="relative z-10 rounded-2xl border border-slate-800 bg-slate-900/40 p-3 backdrop-blur-md">
                <div className="group relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-950">
                  <img src="https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=1200&auto=format&fit=crop" alt="Satellite view" className="h-full w-full object-cover opacity-40 brightness-90 transition duration-1000 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  <div className="absolute bottom-6 left-6 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-slate-400">
                    <span className="h-1.5 w-1.5 animate-ping rounded-full bg-cyan-400" />
                    Mapping Interface :: Active
                  </div>
                </div>
              </div>
            </div>

            <div>
              <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-emerald-400">03 / Structural Cohesion</span>
              <h2 className="mb-6 text-3xl font-normal tracking-tight text-white md:text-5xl font-serif">A biosphere bound by light and vacuum.</h2>
              <p className="mb-8 font-light leading-relaxed text-slate-400">
                From high coordinates, national lines disappear completely. What remains is a deeply integrated physiological machine—oceanic thermohaline conveyors processing heat, cloud patterns balancing incoming radiation, and massive forest expanses breathing carbon.
              </p>
              <div className="space-y-4">
                {ecosystemLinks.map(([icon, label, color]) => (
                  <div key={label} className="flex items-center gap-4 border-b border-slate-900 py-3 last:border-b-0">
                    <Icon icon={icon} className={`text-xl ${color}`} />
                    <span className="text-sm font-medium text-slate-200">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="summit" className="border-t border-slate-900 bg-slate-950 px-6 py-24 lg:px-16">
        <div className="mx-auto max-w-7xl">
          <div className="blur-pill relative overflow-hidden rounded-3xl border-slate-800/60 p-12 text-center md:p-24">
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-cyan-500/5 blur-[120px]" />
            <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-emerald-500/5 blur-[120px]" />

            <span className="mb-6 block text-xs font-bold uppercase tracking-[0.4em] text-cyan-400">Terminal Node Initiate</span>
            <h2 className="mx-auto mb-6 max-w-2xl text-4xl font-normal leading-tight tracking-tight text-white md:text-6xl font-serif">Secure your isolation vector.</h2>
            <p className="mx-auto mb-12 max-w-lg text-sm leading-relaxed text-slate-400 font-light md:text-base">
              Gain root level entry into the global telemetry matrix. Real-time satellite integration streams directly to your terminal.
            </p>

            <div className="mx-auto flex w-full max-w-md flex-col gap-3 sm:flex-row sm:items-stretch">
              <input
                type="email"
                placeholder="Enter terminal identifier"
                className="flex-1 border border-slate-800 bg-slate-900/60 px-5 py-3.5 text-center font-sans text-xs uppercase tracking-widest text-white transition-colors placeholder:text-slate-600 focus:border-cyan-500 focus:outline-none sm:text-left"
              />
              <button className="whitespace-nowrap bg-white px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-950 transition-colors duration-300 hover:bg-cyan-400">
                Initialize Feed
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-900 bg-slate-950 px-6 py-16 text-xs font-sans lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 text-slate-600 md:flex-row">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 font-serif font-bold uppercase tracking-[0.2em] text-slate-400">
              <Icon icon="lucide:compass" className="text-lg text-cyan-500" /> Aura
            </a>
            <span className="hidden h-4 w-px bg-slate-900 md:inline" />
            <p>&copy; 2026 Aura Observatories. Non-governmental Telemetry.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 font-semibold uppercase tracking-widest text-slate-500">
            <a href="#" className="transition-colors hover:text-cyan-400">Privacy Core</a>
            <a href="#" className="transition-colors hover:text-cyan-400">Data Protocol</a>
            <a href="#" className="transition-colors hover:text-cyan-400">Sat Nodes</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
