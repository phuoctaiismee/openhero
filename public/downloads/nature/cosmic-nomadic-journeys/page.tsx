"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const philosophyCards = [
  {
    icon: "lucide:moon",
    title: "Zero Light Leakage",
    text: "Guaranteed placement in protected dark sky reserves. Experience the raw depth of the Milky Way with bare vision.",
  },
  {
    icon: "lucide:battery-charging",
    title: "Total Autonomy",
    text: "High-efficiency closed-loop solar arrays, water purification, and biomass management. Independent from any structural grid.",
  },
  {
    icon: "lucide:compass",
    title: "Nomadic Vectoring",
    text: "Vehicles move organically according to cosmic seasons and weather currents, maximizing unobstructed sky clarity all year.",
  },
  {
    icon: "lucide:eye-off",
    title: "Digital Silencing",
    text: "Optional signal dampening field within the cabin to completely prevent intrusive notification streams and network pings.",
  },
];

const expeditionCards = [
  {
    image:
      "https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?q=80&w=800&auto=format&fit=crop",
    station: "Station Alpha",
    coords: "22.9087° S, 67.7876° W",
    title: "Atacama Highlands",
    text: "Absolute dry atmosphere with near-zero atmospheric water vapor. Ideal for viewing deep-space infrared spectrum formations.",
    footLeft: "Elevation: 4,200m",
    footRight: "Bortle Class 1",
  },
  {
    image:
      "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=800&auto=format&fit=crop",
    station: "Station Beta",
    coords: "64.1265° N, 21.8174° W",
    title: "Icelandic Outwash",
    text: "Positioned directly under the primary auroral oval. Experience massive solar wind ionization curtains from absolute quietude.",
    footLeft: "Elevation: 120m",
    footRight: "Bortle Class 2",
  },
  {
    image:
      "https://images.unsplash.com/photo-1475274047050-1d0c0975c63e?q=80&w=800&auto=format&fit=crop",
    station: "Station Gamma",
    coords: "36.9980° N, 109.0452° W",
    title: "High Plateau Basin",
    text: "Massive geological horizontal boundaries blocking external light grids. Pristine dark sky conditions across deep canyons.",
    footLeft: "Elevation: 2,100m",
    footRight: "Bortle Class 1",
  },
];

const telemetryLogs = [
  {
    date: "08.24",
    title: "Magellanic Clouds Intercept",
    text: "Satellite verification shows zero cloud deck within a 400km radius. Absolute clarity verified over Southern vector.",
    status: "COMPLETED",
    icon: "lucide:check-circle",
    tone: "text-emerald-500",
  },
  {
    date: "08.19",
    title: "Perseid Core Tracking Peak",
    text: "Observed 85 events per hour via automated external capture nodes. Vessel energy state steady at 94% configuration capacity.",
    status: "ARCHIVED",
    icon: "lucide:archive",
    tone: "text-amber-500",
  },
  {
    date: "08.11",
    title: "Barometric Balancing Sequence",
    text: "System shifted elevation coordinates from 2,100 to 3,400 meters to escape sudden localized pressure differentials.",
    status: "ARCHIVED",
    icon: "lucide:archive",
    tone: "text-amber-500",
  },
];

const stats = [
  ["1,847", "Animals Tagged"],
  ["94.2%", "Signal Uptime"],
  ["3.2M", "km² Monitored"],
  ["48", "Acoustic Arrays"],
  ["0.0%", "Invasive Sampling"],
];

export default function Page() {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const opacity = Math.min(0.85, 0.4 + window.scrollY / 400);

      if (navRef.current) {
        navRef.current.style.background = `oklch(12% 0.03 40 / ${opacity})`;
        if (window.scrollY > 50) {
          navRef.current.classList.add("py-4", "backdrop-blur-md", "border-b", "border-white/5");
          navRef.current.classList.remove("py-6");
        } else {
          navRef.current.classList.remove("py-4", "backdrop-blur-md", "border-b", "border-white/5");
          navRef.current.classList.add("py-6");
        }
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    window.alert("Transmission received. Vector calculation protocol initiated.");
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#020612] text-[#f8fafc] antialiased selection:bg-amber-400 selection:text-[#020612]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=DM+Sans:wght@200;300;400;500;700&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background: #020612;
          color: #f8fafc;
          font-family: "DM Sans", sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #020612;
        }

        ::-webkit-scrollbar-thumb {
          background: #1c2541;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #facc15;
        }

        .font-serif {
          font-family: "Cormorant Garamond", serif;
        }

        .font-sans {
          font-family: "DM Sans", sans-serif;
        }

        .glass-card {
          background: linear-gradient(180deg, rgba(11, 19, 43, 0.6) 0%, rgba(2, 6, 18, 0.8) 100%);
          border: 1px solid rgba(250, 204, 21, 0.08);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
        }

        .glass-card:hover {
          border-color: rgba(250, 204, 21, 0.25);
          box-shadow: 0 0 30px -10px rgba(250, 204, 21, 0.1);
        }

        .amber-glow-text {
          text-shadow: 0 0 20px rgba(245, 158, 11, 0.4);
        }

        .stardust-border {
          border-image: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(250, 204, 21, 0.3), rgba(255, 255, 255, 0.1)) 1;
        }

        .reveal-up {
          opacity: 0;
          transform: translateY(24px);
          animation: fade-up 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }

        .delay-700 {
          animation-delay: 0.7s;
        }

        .delay-800 {
          animation-delay: 0.8s;
        }

        .delay-900 {
          animation-delay: 0.9s;
        }

        .delay-1000 {
          animation-delay: 1s;
        }

        @keyframes fade-up {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse-live {
          0%,
          100% {
            transform: scale(1);
            opacity: 1;
          }

          50% {
            transform: scale(1.6);
            opacity: 0.4;
          }
        }

        @keyframes scroll-pulse {
          0% {
            transform: scaleY(0);
            transform-origin: top;
            opacity: 0;
          }

          50% {
            transform: scaleY(1);
            opacity: 1;
          }

          100% {
            transform: scaleY(0);
            transform-origin: bottom;
            opacity: 0;
          }
        }

        @keyframes orb-float {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
          }

          100% {
            transform: translateY(-20px) rotate(3deg) scale(1.04);
          }
        }

        @keyframes fill-expand {
          from {
            transform: scaleX(0);
          }

          to {
            transform: scaleX(1);
          }
        }
      `}</style>

      <nav
        ref={navRef}
        id="main-nav"
        className="fixed left-0 top-0 z-50 w-full py-6 px-6 transition-all duration-500 lg:px-16"
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="#" className="group flex items-center gap-3">
            <Icon icon="lucide:sparkles" className="text-xl text-amber-400 transition-transform duration-500 group-hover:rotate-45" />
            <span className="font-serif text-2xl font-light tracking-widest uppercase">Stargazer</span>
          </a>

          <div className="hidden items-center gap-12 text-xs font-medium uppercase tracking-[0.25em] text-slate-100 lg:flex">
            <a href="#philosophy" className="transition-colors hover:text-amber-400">
              Philosophy
            </a>
            <a href="#vessel" className="transition-colors hover:text-amber-400">
              The Vessel
            </a>
            <a href="#expeditions" className="transition-colors hover:text-amber-400">
              Expeditions
            </a>
            <a href="#journal" className="transition-colors hover:text-amber-400">
              Logs
            </a>
          </div>

          <div>
            <a
              href="#join"
              className="group relative inline-flex items-center justify-center overflow-hidden border border-amber-400/30 px-7 py-3 text-xs font-medium uppercase tracking-widest text-white"
            >
              <span className="absolute inset-0 -z-10 h-full w-full translate-x-full transform bg-gradient-to-r from-amber-500 to-[#f59e0b] transition-all duration-500 ease-out group-hover:translate-x-0 group-hover:scale-102" />
              <span className="transition-colors duration-300 group-hover:text-[#020612]">Book Orbit</span>
            </a>
          </div>
        </div>
      </nav>

      <header className="relative flex h-screen w-full items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 h-full w-full">
          <video autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source src="./video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#020612] via-[#020612]/30 to-[#020612]/45" />
        </div>

        <div className="relative z-10 mx-auto mt-20 max-w-5xl px-6 text-center">
          <h1 className="mb-8 text-5xl font-bold leading-tight tracking-tight text-white md:text-8xl font-serif filter [filter:drop-shadow(0_0_15px_rgba(0,0,0,0.3))_drop-shadow(0_0_30px_rgba(0,0,0,0.2))]">
            Leave the map. <br />
            <span className="amber-glow-text font-semibold italic text-amber-400">Follow the sky.</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-base font-light leading-relaxed text-slate-200 md:text-lg [text-shadow:0_0_8px_rgba(0,0,0,1),0_0_16px_rgba(0,0,0,0.9),0_0_32px_rgba(0,0,0,0.6)]">
            A solitary escape vehicle parked beneath a billion systems. Reclaim silence, connect with deep cosmic intervals, and redefine modern wandering from the comfort of an isolated, custom-engineered stellar cabin.
          </p>

          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row">
            <a href="#vessel" className="w-full bg-amber-400 px-8 py-4 text-center text-xs font-bold uppercase tracking-widest text-[#020612] transition-colors duration-300 hover:bg-white sm:w-auto shadow-lg shadow-amber-400/10">
              Inspect Living Space
            </a>
            <a href="#philosophy" className="w-full border border-white/10 bg-white/5 px-8 py-4 text-center text-xs font-medium uppercase tracking-widest text-white backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 sm:w-auto">
              Read Manifesto
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-6 z-20 hidden items-center gap-8 text-[11px] font-mono tracking-widest text-slate-400 xl:flex lg:left-16">
          <div className="flex items-center gap-2">
            <span className="text-amber-400">SKY CON:</span> Bortle Class 1
          </div>
          <div className="flex items-center gap-2">
            <span className="text-amber-400">ALT:</span> 3,400 MASL
          </div>
        </div>

        <div className="absolute bottom-10 right-6 z-20 hidden items-center gap-4 xl:flex lg:right-16">
          <span className="text-[10px] font-medium uppercase tracking-widest text-slate-400">Scroll to drift</span>
          <div className="h-12 w-px bg-gradient-to-b from-amber-400 to-transparent" />
        </div>
      </header>

      <section id="philosophy" className="relative overflow-hidden bg-[#020612] py-32 px-6">
        <div className="pointer-events-none absolute -left-64 top-1/4 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[150px]" />

        <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-5">
            <span className="block text-xs font-bold uppercase tracking-[0.3em] text-amber-500">01 // Core Ideal</span>
            <h2 className="font-serif text-4xl font-light leading-tight text-white md:text-6xl">
              The luxury of complete <br />
              <span className="italic">disconnection.</span>
            </h2>
            <div className="my-6 h-px w-20 bg-amber-400/40" />
            <p className="font-light leading-relaxed text-slate-300">
              True wealth is not accumulation; it is the space between objects. Our nomadic outposts are strategically placed in high-altitude, low-interference zones where civilization disappears into a thin line below the ridge.
            </p>
            <p className="text-sm font-light leading-relaxed text-slate-400">
              Here, time is modulated by the transit of Orion rather than alarms. Wake up to golden high-altitude grasses, spend nights charting unknown nebulae through premium integrated optics.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {philosophyCards.map((card, index) => (
              <div key={card.title} className="glass-card flex flex-col justify-between p-10 transition-all duration-500 group">
                <div>
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/20 bg-amber-400/5 transition-colors group-hover:bg-amber-400/10">
                    <Icon icon={card.icon} className="text-xl text-amber-400" />
                  </div>
                  <h3 className="mb-4 font-serif text-2xl font-light text-white">{card.title}</h3>
                </div>
                <p className="text-sm font-light leading-relaxed text-slate-400">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vessel" className="relative border-y border-white/5 bg-[#0b132b]/30 py-32">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mx-auto mb-20 max-w-3xl text-center">
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-amber-500">02 // The Machine</span>
            <h2 className="font-serif text-4xl font-light text-white md:text-6xl">Anatomy of the Mobile Observatory</h2>
            <p className="mt-4 text-sm font-light text-slate-400">Blending warm retro aesthetics with structural space-grade telemetry.</p>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-3">
            <div className="space-y-12">
              <div className="space-y-2 text-right">
                <span className="font-serif text-lg italic text-amber-400">01 / Panoramic Dome</span>
                <h4 className="text-xs font-medium uppercase tracking-wider text-white">Reinforced Quartz Ceiling</h4>
                <p className="text-xs font-light leading-relaxed text-slate-400">180-degree overhead structural viewing window treated with anti-reflective coating for pristine astronomical observations from bed.</p>
              </div>
              <div className="space-y-2 text-right">
                <span className="font-serif text-lg italic text-amber-400">02 / Thermal Envelope</span>
                <h4 className="text-xs font-medium uppercase tracking-wider text-white">Aerogel Insulation Layers</h4>
                <p className="text-xs font-light leading-relaxed text-slate-400">Maintains a consistent, optimized internal climate even when exterior sub-zero temperatures drop rapidly in mountain passes.</p>
              </div>
            </div>

            <div className="relative flex justify-center py-12 lg:py-0">
              <div className="pointer-events-none absolute inset-0 rounded-full bg-amber-400/5 blur-3xl" />
              <div className="group relative flex h-96 w-72 flex-col justify-between overflow-hidden rounded-t-full border border-amber-400/20 bg-[#020612]/60 p-3 backdrop-blur-md">
                <div className="flex h-full w-full flex-col items-center justify-center rounded-t-full border border-dashed border-amber-400/10 p-6 text-center">
                  <Icon icon="lucide:truck" className="mb-6 text-5xl text-amber-400/40 transition-all duration-700 group-hover:scale-110 group-hover:text-amber-400" />
                  <span className="mb-2 font-serif text-2xl font-light text-white">Chassis V-01</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">Cruiser Configuration</span>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent" />
              </div>
            </div>

            <div className="space-y-12">
              <div className="space-y-2">
                <span className="font-serif text-lg italic text-amber-400">03 / Navigation Deck</span>
                <h4 className="text-xs font-medium uppercase tracking-wider text-white">Analog Core Diagnostics</h4>
                <p className="text-xs font-light leading-relaxed text-slate-400">Solid brass and warm wood panel interfaces combined with active digital tracking for localized barometric data, coordinates, and star mapping.</p>
              </div>
              <div className="space-y-2">
                <span className="font-serif text-lg italic text-amber-400">04 / Energy Module</span>
                <h4 className="text-xs font-medium uppercase tracking-wider text-white">Solid State Storage</h4>
                <p className="text-xs font-light leading-relaxed text-slate-400">Stores up to 14 days of full functional power back-up without solar replenishment, protecting operational systems through storms.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="expeditions" className="mx-auto max-w-7xl px-6 py-32">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 block text-xs font-bold uppercase tracking-[0.3em] text-amber-500">03 // Chosen Latitude</span>
            <h2 className="font-serif text-4xl font-light text-white md:text-6xl">Stellar Coordinates</h2>
          </div>
          <div className="flex gap-3">
            <button className="flex h-12 w-12 items-center justify-center border border-white/10 text-slate-400 transition-colors hover:border-amber-400 hover:text-amber-400">
              <Icon icon="lucide:arrow-left" />
            </button>
            <button className="flex h-12 w-12 items-center justify-center border border-white/10 text-slate-400 transition-colors hover:border-amber-400 hover:text-amber-400">
              <Icon icon="lucide:arrow-right" />
            </button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {expeditionCards.map((card, index) => (
            <div key={card.title} className="glass-card group overflow-hidden">
              <div className="relative h-64 overflow-hidden">
                <img src={card.image} alt={card.title} className="h-full w-full object-cover opacity-40 grayscale transition-transform duration-1000 group-hover:scale-105 group-hover:opacity-60 group-hover:grayscale-0" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#020612] to-transparent" />
                <span className="absolute left-6 top-6 bg-amber-400 px-2 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#020612]">
                  {card.station}
                </span>
              </div>
              <div className="space-y-4 p-8">
                <span className="text-xs font-mono tracking-widest text-amber-400">{card.coords}</span>
                <h3 className="font-serif text-2xl font-light text-white">{card.title}</h3>
                <p className="text-xs font-light leading-relaxed text-slate-400">{card.text}</p>
                <div className="flex items-center justify-between border-t border-white/5 pt-4 text-xs text-slate-400">
                  <span>{card.footLeft}</span>
                  <span className="font-medium text-amber-400">{card.footRight}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="journal" className="relative overflow-hidden border-t border-white/5 bg-[#020612] py-32">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <span className="mb-2 block text-xs font-bold uppercase tracking-[0.3em] text-amber-500">04 // Operational Transmissions</span>
            <h2 className="font-serif text-4xl font-light text-white">Telemetry & Log Entries</h2>
          </div>

          <div className="space-y-4">
            {telemetryLogs.map((log) => (
              <div key={log.date} className="flex flex-col justify-between gap-4 border border-white/5 bg-[#0b132b]/10 p-6 transition-colors hover:bg-[#0b132b]/20 md:flex-row md:items-center">
                <div className="flex items-start gap-6">
                  <span className="font-serif text-xl italic text-amber-400 pt-1">{log.date}</span>
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wider text-white">{log.title}</h4>
                    <p className="mt-1 text-xs font-light text-slate-400">{log.text}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6 self-end font-mono text-[11px] text-slate-400 md:self-center">
                  <span>STATUS: {log.status}</span>
                  <Icon icon={log.icon} className={`text-base ${log.tone}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="relative overflow-hidden border-t border-white/5 px-6 py-36">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#04091a] opacity-40" />
          <div className="absolute inset-0 bg-[radial-gradient(#facc15_1px,transparent_1px)] [background-size:24px_24px] opacity-10" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl space-y-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-amber-400/30 bg-amber-400/5">
            <Icon icon="lucide:radio" className="animate-pulse text-lg text-amber-400" />
          </div>

          <h2 className="font-serif text-4xl font-light leading-tight text-white md:text-7xl">
            Align your trajectory. <br />
            <span className="italic text-amber-400">Secure isolation.</span>
          </h2>

          <p className="mx-auto max-w-lg text-sm font-light leading-relaxed text-slate-400 md:text-base">
            Enter your secure communication parameters. Our automated tracking node will broadcast vector availability parameters back to your device.
          </p>

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-md flex-col gap-3 pt-4 sm:flex-row">
            <input
              type="email"
              required
              placeholder="SECURE_EMAIL_ROUTE@DOMAIN"
              className="h-14 w-full rounded-none border border-white/10 bg-[#020612]/90 px-5 font-mono text-xs uppercase tracking-widest text-white transition-colors placeholder:text-slate-700 focus:outline-none focus:border-amber-400"
            />
            <button type="submit" className="h-14 w-full whitespace-nowrap rounded-none bg-amber-400 px-8 text-xs font-bold uppercase tracking-widest text-[#020612] transition-colors duration-300 hover:bg-white sm:w-auto">
              Request Vector
            </button>
          </form>
        </div>
      </section>

      <footer className="border-t border-white/5 bg-[#020612] px-6 py-16 text-xs text-slate-600 lg:px-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex items-center gap-6">
            <a href="#" className="flex items-center gap-2 font-serif text-lg font-light uppercase tracking-wider text-white">
              <Icon icon="lucide:sparkles" className="text-amber-400" /> Stargazer
            </a>
            <span className="hidden h-4 w-px bg-white/10 md:inline" />
            <p>&copy; 2026 Stargazer Labs. Closed Loop Autonomous Vehicles.</p>
          </div>

          <div className="flex gap-8 font-mono text-[10px] uppercase tracking-widest text-slate-400">
            <a href="#" className="transition-colors hover:text-amber-400">
              System Status
            </a>
            <a href="#" className="transition-colors hover:text-amber-400">
              Telemetry API
            </a>
            <a href="#" className="transition-colors hover:text-amber-400">
              Privacy Nodes
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
