"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const contemplationItems = [
  {
    icon: "lucide:eye",
    title: "Unobstructed Sightlines",
    text: "Observe without the scattering effects of the dense lower atmosphere. Pristine visual telemetry extending across terminal vectors.",
    border: "border-[#06b6d4]/20",
    iconBg: "bg-[#06b6d4]/10",
    iconColor: "text-[#06b6d4]",
  },
  {
    icon: "lucide:wind",
    title: "Atmospheric Envelope",
    text: "Trace the fragile blue boundaries shielding planetary complexity from deep void environments. A dynamic barrier in permanent evolution.",
    border: "border-[#10b981]/20",
    iconBg: "bg-[#10b981]/10",
    iconColor: "text-[#10b981]",
  },
  {
    icon: "lucide:activity",
    title: "Chronostasis Phase",
    text: "Experience a non-linear flow of time. Orbital velocities decouple your perception from typical day-to-night transitions.",
    border: "border-[#818cf8]/20",
    iconBg: "bg-[#818cf8]/10",
    iconColor: "text-[#818cf8]",
  },
  {
    icon: "lucide:mountain",
    title: "The Terrestrial Core",
    text: "Connect conceptually with solid landmasses, lithospheric plates, and profound ocean basins breathing synchronously beneath the cloud layers.",
    border: "border-[#a855f7]/20",
    iconBg: "bg-[#a855f7]/10",
    iconColor: "text-[#a855f7]",
  },
];

const dimensions = [
  {
    value: "6,371",
    suffix: "km",
    title: "Mean Planetary Radius",
    text: "The foundational dimensional constant defining structural gravitational bounds and orbital baseline geometry.",
    dot: "bg-[#06b6d4]",
    glow: "shadow-[0_0_10px_#06b6d4]",
  },
  {
    value: "7.29",
    suffix: "e-5",
    title: "Angular Angular Velocity",
    text: "Radians per second driving atmospheric Coriolis currents, global weather bands, and structural field dynamics.",
    dot: "bg-slate-700",
    hoverDot: "group-hover:bg-[#06b6d4]",
  },
  {
    value: "510.1",
    suffix: "M²",
    title: "Surface Area Horizon",
    text: "Total square kilometers of continuous biological and topographical processes visible from outer perimeter outposts.",
    dot: "bg-slate-700",
    hoverDot: "group-hover:bg-[#06b6d4]",
  },
];

const ecosystemLinks = [
  ["lucide:layers", "Tropospheric Boundary Analytics", "text-[#06b6d4]"],
  ["lucide:globe", "Continental Carbon Sink Tracking", "text-[#10b981]"],
  ["lucide:radio", "Electromagnetic Ionosphere Auditing", "text-[#a855f7]"],
] as const;

const stats = [
  ["LON:", "72.5412° W"],
  ["LAT:", "13.6339° S"],
  ["PRES:", "0.004 PA"],
] as const;

export default function Page() {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      if (window.scrollY > 50) {
        nav.classList.add("nav-scrolled", "py-3");
        nav.classList.remove("py-4");
      } else {
        nav.classList.remove("nav-scrolled", "py-3");
        nav.classList.add("py-4");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#030712] text-slate-50 antialiased selection:bg-[#00f2fe] selection:text-[#030712]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;700;900&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background: #030712;
          color: #f8fafc;
          font-family: "Outfit", sans-serif;
        }

        * {
          box-sizing: border-box;
        }

        .font-serif {
          font-family: "Outfit", sans-serif;
        }

        .font-mono {
          font-family: "Space Mono", monospace;
        }

        .nav-scrolled {
          background: rgba(3, 7, 18, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .tech-border {
          position: relative;
        }

        .tech-border::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 10px;
          height: 10px;
          border-top: 2px solid #00f2fe;
          border-left: 2px solid #00f2fe;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .tech-border::after {
          content: "";
          position: absolute;
          bottom: 0;
          right: 0;
          width: 10px;
          height: 10px;
          border-bottom: 2px solid #00f2fe;
          border-right: 2px solid #00f2fe;
          transition: all 0.3s ease;
          pointer-events: none;
        }

        .group:hover .tech-border::before,
        .group:hover .tech-border::after {
          width: 100%;
          height: 100%;
          opacity: 0.3;
        }

        .text-glow {
          text-shadow: 0 0 30px rgba(0, 242, 254, 0.5);
        }

        .grid-bg {
          background-size: 40px 40px;
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
        }
      `}</style>

      <nav ref={navRef} id="navbar" className="fixed top-0 z-50 w-full py-4 transition-all duration-500">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-3">
            <Icon icon="lucide:orbit" className="text-3xl text-[#00f2fe] animate-[spin_10s_linear_infinite]" />
            <span className="text-2xl font-black uppercase tracking-tighter">Celestia</span>
          </a>

          <div className="hidden items-center gap-10 text-xs font-bold uppercase tracking-widest text-slate-400 md:flex">
            <a href="#mission" className="transition-colors hover:text-[#00f2fe]">Mission</a>
            <a href="#technology" className="transition-colors hover:text-[#00f2fe]">Technology</a>
            <a href="#data" className="transition-colors hover:text-[#00f2fe]">Telemetry</a>
            <a href="#explore" className="transition-colors hover:text-[#00f2fe]">Explore</a>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono uppercase tracking-widest">
            <a href="#" className="hidden text-slate-400 transition-colors hover:text-white lg:block">
              Terminal Login
            </a>
            <a href="#" className="bg-white px-5 py-2.5 font-bold uppercase tracking-widest text-[#030712] shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-colors hover:bg-[#00f2fe] hover:text-[#030712]">
              Initiate Sequence
            </a>
          </div>
        </div>
      </nav>

      <header className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden">
        <video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#030712]/20 via-transparent to-[#030712]" />
        <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,transparent_0%,#030712_100%)] opacity-50" />

        <div className="relative z-20 mx-auto max-w-5xl px-4 text-center">
          <h1 className="mb-6 bg-gradient-to-b from-white to-slate-500 bg-clip-text text-6xl font-black uppercase tracking-tighter text-transparent md:text-8xl lg:text-9xl">
            Expand <br /> <span className="text-white text-glow">The Horizon</span>
          </h1>

          <p className="mx-auto mb-12 max-w-2xl text-lg font-light leading-relaxed text-slate-300 md:text-xl">
            Observe the planetary ecosystem from a perspective previously reserved for the stars. Monitor, analyze, and preserve terrestrial biomes in real-time.
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            <a href="#explore" className="flex w-full items-center justify-center gap-2 bg-[#00f2fe] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#030712] transition-colors hover:bg-white sm:w-auto">
              Enter the Atlas <Icon icon="lucide:arrow-right" />
            </a>
            <a href="#mission" className="flex w-full items-center justify-center gap-2 border border-slate-700 bg-[#0b1120]/50 px-8 py-4 text-xs font-mono uppercase tracking-widest text-white backdrop-blur-sm transition-colors hover:border-[#00f2fe] hover:text-[#00f2fe] sm:w-auto">
              <Icon icon="lucide:satellite" /> View Telemetry
            </a>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2">
          <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300">Scroll to descend</span>
          <Icon icon="lucide:chevron-down" className="text-xl text-[#00f2fe]" />
        </div>
      </header>

      <section id="mission" className="relative border-t border-slate-800/50 bg-[#030712] px-6 py-32">
        <div className="absolute inset-0 grid-bg opacity-30" />
        <div className="pointer-events-none absolute right-0 top-0 h-[800px] w-[800px] rounded-full bg-[#00f2fe]/5 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-sm font-mono uppercase tracking-[0.2em] text-[#00f2fe]">Phase 01 / Overview</h2>
              <h3 className="mb-8 text-4xl font-bold tracking-tight md:text-6xl">
                The Macro <br />Perspective.
              </h3>
              <p className="mb-8 text-lg leading-relaxed text-slate-400">
                To understand the delicate balance of our world, we must step back. Celestia provides continuous, high-fidelity topographical and atmospheric data, merging orbital imaging with ground-level sensors to create a living digital twin of the Earth.
              </p>
              <ul className="space-y-6 text-sm text-slate-300 font-mono">
                <li className="flex items-start gap-4">
                  <span className="mt-1 text-[#00f2fe]"><Icon icon="lucide:scan" /></span>
                  <span>Sub-meter resolution imaging across all biomes.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 text-[#00f2fe]"><Icon icon="lucide:waves" /></span>
                  <span>Atmospheric and oceanic current mapping in real-time.</span>
                </li>
                <li className="flex items-start gap-4">
                  <span className="mt-1 text-[#00f2fe]"><Icon icon="lucide:cpu" /></span>
                  <span>Quantum-processed predictive ecological modeling.</span>
                </li>
              </ul>
            </div>

            <div className="group relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00f2fe]/20 to-[#4facfe]/20 opacity-50 blur-xl transition duration-1000 group-hover:opacity-100" />
              <div className="tech-border relative aspect-square overflow-hidden border border-slate-700 bg-[#0b1120] p-2">
                <img src="https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?q=80&w=1000&auto=format&fit=crop" alt="Earth from space" className="h-full w-full object-cover opacity-70 grayscale transition duration-700 group-hover:grayscale-0 group-hover:opacity-100" />
                <div className="absolute right-6 top-6 border border-[#00f2fe]/30 bg-[#030712]/80 px-2 py-1 text-[10px] uppercase text-[#00f2fe] font-mono">
                  Live Feed :: Sector 7G
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="technology" className="relative border-t border-slate-800/50 bg-[#060a14] px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <h2 className="mb-4 text-sm font-mono uppercase tracking-[0.2em] text-[#00f2fe]">Systems Architecture</h2>
              <h3 className="text-3xl font-bold tracking-tight md:text-5xl">Engineered for the absolute unknown.</h3>
            </div>
            <a href="#" className="flex items-center gap-2 border-b border-slate-800 pb-2 text-sm text-slate-400 transition-colors hover:border-[#00f2fe] hover:text-[#00f2fe] font-mono">
              View Technical Specs <Icon icon="lucide:arrow-right" />
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="group relative overflow-hidden border border-slate-800 bg-[#030712] p-10 transition-colors hover:border-[#00f2fe]/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Icon icon="lucide:radar" className="mb-8 block text-4xl text-[#00f2fe]" />
              <h4 className="mb-4 text-xl font-bold">Lidar Penetration</h4>
              <p className="text-sm leading-relaxed text-slate-400">Map sub-canopy topography and subterranean structures with deep-penetrating orbital lidar sweeps, ignoring cloud cover and foliage.</p>
            </div>

            <div className="group relative overflow-hidden border border-slate-800 bg-[#030712] p-10 transition-colors hover:border-[#00f2fe]/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Icon icon="lucide:globe-2" className="mb-8 block text-4xl text-[#00f2fe]" />
              <h4 className="mb-4 text-xl font-bold">Geospatial Mapping</h4>
              <p className="text-sm leading-relaxed text-slate-400">Construct hyper-accurate 3D models of shifting biomes, rendering tectonic movements and glacial recessions in real-time.</p>
            </div>

            <div className="group relative overflow-hidden border border-slate-800 bg-[#030712] p-10 transition-colors hover:border-[#00f2fe]/50">
              <div className="absolute inset-0 bg-gradient-to-br from-[#00f2fe]/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <Icon icon="lucide:zap" className="mb-8 block text-4xl text-[#00f2fe]" />
              <h4 className="mb-4 text-xl font-bold">Energy Signature Analysis</h4>
              <p className="text-sm leading-relaxed text-slate-400">Detect minute thermal and electromagnetic anomalies across the surface, identifying ecological stressors before they become visible.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="data" className="border-t border-slate-800/50 bg-[#030712] px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 divide-x divide-y border border-slate-800 md:grid-cols-4 md:divide-y-0">
            <div className="bg-[#0b1120]/30 p-8 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-[#00f2fe] font-mono">Active Satellites</p>
              <p className="font-mono text-4xl font-black md:text-5xl">1,402</p>
            </div>
            <div className="bg-[#0b1120]/30 p-8 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-[#00f2fe] font-mono">Data Processed</p>
              <p className="font-mono text-4xl font-black md:text-5xl">84<span className="text-2xl text-slate-500">PB/s</span></p>
            </div>
            <div className="bg-[#0b1120]/30 p-8 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-[#00f2fe] font-mono">Surface Mapped</p>
              <p className="font-mono text-4xl font-black md:text-5xl">99.8<span className="text-2xl text-slate-500">%</span></p>
            </div>
            <div className="bg-[#0b1120]/30 p-8 text-center">
              <p className="mb-2 text-xs uppercase tracking-widest text-[#00f2fe] font-mono">Uptime Core</p>
              <p className="font-mono text-4xl font-black md:text-5xl">100<span className="text-2xl text-slate-500">%</span></p>
            </div>
          </div>
        </div>
      </section>

      <section id="explore" className="relative overflow-hidden px-6 py-40">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop" alt="Deep Space Background" className="h-full w-full object-cover opacity-30 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-[#030712]" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Icon icon="lucide:hexagon" className="mx-auto mb-6 block text-6xl text-[#00f2fe]" />
          <h2 className="mb-8 text-4xl font-black uppercase tracking-tighter md:text-6xl">Access The Archive</h2>
          <p className="mb-10 text-lg font-light text-slate-300">Join the coalition of researchers, engineers, and visionaries mapping the future of our pale blue dot.</p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <input type="email" placeholder="ENTER CLEARANCE EMAIL" className="w-full border border-slate-700 bg-[#0b1120]/80 px-6 py-4 text-center font-mono text-sm uppercase tracking-widest text-white placeholder-slate-500 backdrop-blur-md focus:border-[#00f2fe] focus:outline-none sm:w-96 sm:text-left" />
            <button className="bg-[#00f2fe] px-8 py-4 text-sm font-bold uppercase tracking-widest text-[#030712] transition-colors hover:bg-white">
              Request Access
            </button>
          </div>
          <p className="mt-6 text-[10px] uppercase tracking-widest text-slate-500 font-mono">Level 4 Clearance Required. Encryption standard AES-256 active.</p>
        </div>
      </section>

      <footer className="border-t border-slate-800 bg-[#03050a] px-6 pb-10 pt-20 text-sm font-mono">
        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <a href="#" className="mb-6 flex items-center gap-3">
              <Icon icon="lucide:orbit" className="text-2xl text-[#00f2fe]" />
              <span className="text-xl font-bold tracking-tighter uppercase font-sans">Celestia</span>
            </a>
            <p className="mb-6 text-xs leading-relaxed text-slate-500">Monitoring the fragile horizon. Data belongs to humanity.</p>
          </div>

          <div>
            <h4 className="mb-6 uppercase tracking-widest text-white">Modules</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">Atmospheric Scanners</a></li>
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">Oceanic Telemetry</a></li>
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">Tectonic Sensors</a></li>
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">Biosphere Tracking</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 uppercase tracking-widest text-white">Operations</h4>
            <ul className="space-y-3 text-xs text-slate-500">
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">Command Center</a></li>
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">Orbital Mechanics</a></li>
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">Data Archives</a></li>
              <li><a href="#" className="transition-colors hover:text-[#00f2fe]">API Endpoint</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 uppercase tracking-widest text-white">Transmit</h4>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center border border-slate-800 bg-[#030712] text-slate-400 transition-all hover:border-[#00f2fe] hover:text-[#00f2fe]"><Icon icon="lucide:twitter" /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center border border-slate-800 bg-[#030712] text-slate-400 transition-all hover:border-[#00f2fe] hover:text-[#00f2fe]"><Icon icon="lucide:github" /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center border border-slate-800 bg-[#030712] text-slate-400 transition-all hover:border-[#00f2fe] hover:text-[#00f2fe]"><Icon icon="lucide:globe" /></a>
            </div>
          </div>
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-slate-800 pt-8 text-xs text-slate-600 md:flex-row">
          <p>CELESTIA GLOBAL DIRECTIVE &copy; 2026</p>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#00f2fe]" />
            SYSTEMS NOMINAL
          </div>
        </div>
      </footer>
    </div>
  );
}
