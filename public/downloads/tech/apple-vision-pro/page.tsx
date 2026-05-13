"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const featureCards = [
    {
        icon: "mdi:eye-outline",
        title: "Eye Tracking",
        text: "High-performance LEDs project invisible light patterns for ultra-precise optical input without physical controllers.",
    },
    {
        icon: "mdi:volume-high",
        title: "Spatial Audio",
        text: "Acoustic ray tracing calculates physical properties of your environment to match sound precisely to the room.",
    },
    {
        icon: "mdi:shape-outline",
        title: "Infinite Canvas",
        text: "Free your workflow from the physical boundaries of a traditional display with an unlimited spatial workspace.",
    },
];

export default function Page() {
    const heroVideoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const video = heroVideoRef.current;
        if (!video) return;

        let ticking = false;

        const updateHero = () => {
            const progress = Math.min(window.scrollY / (window.innerHeight * 1.15), 1);
            const scale = 1.07 + progress * 0.08;
            const translate = progress * 14;
            video.style.transform = `scale(${scale}) translateY(${translate}px)`;
        };

        updateHero();

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
                updateHero();
                ticking = false;
            });
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", updateHero);

        const revealTargets = document.querySelectorAll<HTMLElement>(".scroll-driven");
        const supportsTimeline = CSS.supports("animation-timeline: view()");

        if (!supportsTimeline) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const target = entry.target as HTMLElement;
                            target.classList.add("scroll-in");
                            observer.unobserve(target);
                        }
                    });
                },
                { threshold: 0.12, rootMargin: "40px" }
            );

            revealTargets.forEach((el) => observer.observe(el));
        }

        return () => {
            window.removeEventListener("scroll", onScroll);
            window.removeEventListener("resize", updateHero);
        };
    }, []);

    return (
        <div className="min-h-screen overflow-x-hidden bg-[#0f1114] text-white antialiased">
            <style jsx global>{`
        :root {
          color-scheme: dark;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background:
            radial-gradient(circle at 50% 0%, oklch(0.2 0.05 250 / 0.5), transparent 70%),
            linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 100% 100%, 4rem 4rem, 4rem 4rem;
          background-position: center top;
        }

        ::selection {
          background: oklch(0.85 0.1 240);
          color: #000;
        }

        @keyframes shine {
          to {
            background-position: 200% center;
          }
        }
@keyframes atomic-assemble {
  0% {
    opacity: 0;
    transform: translateY(60px);
  }

  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

        @keyframes breath {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.012);
          }
        }

        @keyframes sheen {
          to {
            transform: translateX(240%) rotate(10deg);
          }
        }

        .kinetic-breach {
          mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
          -webkit-mask-image: radial-gradient(circle at center, black 20%, transparent 80%);
          filter: saturate(1.2) brightness(0.8);
        }

        .glass-anodized {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            0 20px 40px rgba(0, 0, 0, 0.4),
            inset 0 1px 0 rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(40px) saturate(150%);
          -webkit-backdrop-filter: blur(40px) saturate(150%);
        }

        .photon-glow {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .photon-glow:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: oklch(0.85 0.1 240);
          box-shadow:
            0 0 30px oklch(0.85 0.1 240 / 0.3),
            inset 0 0 10px oklch(0.85 0.1 240 / 0.2);
          transform: scale(1.02);
        }

        .text-gradient {
          background: linear-gradient(180deg, #ffffff 0%, oklch(0.6 0.02 250) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .text-refraction {
          color: transparent;
          -webkit-text-stroke: 1px rgba(255, 255, 255, 0.5);
          background: linear-gradient(90deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.1));
          -webkit-background-clip: text;
          background-clip: text;
          background-size: 200% auto;
          animation: shine 4s linear infinite;
        }

     .scroll-driven {
  animation: atomic-assemble linear both;
  animation-timeline: view();
  animation-range: entry 5% cover 35%;
  will-change: opacity, transform;
}

.scroll-in {
  animation: atomic-assemble 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
      `}</style>

            <nav className="fixed inset-x-0 top-6 z-50 px-6">
                <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-white/10 px-6 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.3)] glass-anodized">
                    <div className="flex items-center gap-2">
                        <div className="text-lg font-bold tracking-tight text-white italic">
                            Vision<span className="font-light opacity-50">Pro</span>
                        </div>
                    </div>

                    <div className="hidden items-center gap-2 md:flex">
                        <a
                            href="#"
                            className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50 transition-all hover:bg-white/5 hover:text-white"
                        >
                            Overview
                        </a>
                        <a
                            href="#"
                            className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50 transition-all hover:bg-white/5 hover:text-white"
                        >
                            Neural Engine
                        </a>
                        <a
                            href="#"
                            className="rounded-full px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/50 transition-all hover:bg-white/5 hover:text-white"
                        >
                            Specs
                        </a>
                    </div>

                    <button className="group relative overflow-hidden rounded-full bg-white px-6 py-2 text-[10px] font-black uppercase tracking-widest text-black transition-transform hover:scale-105 active:scale-95">
                        <span className="relative z-10">Pre-order</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 opacity-0 transition-opacity group-hover:opacity-20" />
                    </button>
                </div>
            </nav>

            <main className="relative flex w-full flex-col items-center pt-32 pb-32 @container">
                <section className="relative z-10 flex min-h-[70vh] w-full max-w-6xl flex-col items-center justify-center px-6">
                    <div className="pointer-events-none absolute inset-0 z-[-1] flex items-center justify-center overflow-hidden">
                        <div className="h-full w-full kinetic-breach">
                            <video ref={heroVideoRef} autoPlay loop muted playsInline className="h-full w-full object-cover">
                                <source src="./video.mp4" type="video/mp4" />
                            </video>
                        </div>
                    </div>

                    <h1 className="flex flex-col items-center text-center text-[clamp(3.5rem,8vw,9rem)] font-bold leading-[0.9] tracking-tighter drop-shadow-[0_10px_30px_rgba(0,0,0,1)] drop-shadow-[0_20px_70px_rgba(0,0,0,1)]">
                        <span className="text-gradient">Spatial</span>
                        <span className="text-refraction">Computing</span>
                    </h1>

                    <p className="mt-10 max-w-2xl text-center text-lg font-light tracking-wide text-white/50 drop-shadow-[0_4px_12px_rgba(0,0,0,1)] md:text-xl">
                        Welcome to the era of absolute immersion. Powered by a dual-chip neural architecture, delivering latency-free volumetric rendering.
                    </p>
                </section>

                <section className="relative z-10 mt-32 grid w-full max-w-6xl grid-cols-1 gap-8 px-6 lg:grid-cols-12">
                    <div className="scroll-driven flex min-h-[400px] flex-col justify-between rounded-[2rem] p-10 lg:col-span-5 glass-anodized">
                        <div>
                            <h3 className="text-2xl font-semibold tracking-tight text-white">Photonic Processing</h3>
                            <p className="mt-4 text-sm leading-relaxed text-white/50 font-light">
                                The dedicated R1 hardware subsystem streams real-time environmental data with unprecedented accuracy, mapping physical space in milliseconds.
                            </p>
                        </div>
                        <div>
                            <div className="my-6 h-px w-full bg-gradient-to-r from-white/20 to-transparent" />
                            <div className="flex items-end justify-between">
                                <span className="text-xs uppercase tracking-widest text-white/40 mono">Photon Latency</span>
                                <span className="text-3xl font-light text-white">
                                    12<span className="text-lg text-white/40">ms</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="scroll-driven relative h-[400px] w-full overflow-hidden rounded-[2rem] p-2 lg:col-span-7 glass-anodized">
                        <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                            <video autoPlay loop muted playsInline className="h-full w-full object-cover opacity-80 mix-blend-screen">
                                <source src="https://assets.codepen.io/3364143/7btrrd.mp4" type="video/mp4" />
                            </video>
                            <div className="absolute bottom-6 left-6 z-20">
                                <div className="mb-1 text-xs uppercase tracking-widest text-white/50 mono">Micro-OLED Display</div>
                                <div className="text-2xl font-medium tracking-tight text-white">23 Million Pixels</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="relative z-10 mt-16 w-full max-w-6xl px-6">
                    <div className="scroll-driven grid grid-cols-1 gap-6 md:grid-cols-3">
                        {featureCards.map((card) => (
                            <div key={card.title} className="rounded-[2rem] p-8 transition-all duration-500 hover:bg-white/[0.05] glass-anodized">
                                <div className="mb-8 flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/5">
                                    <Icon icon={card.icon} className="text-2xl text-white/80" />
                                </div>
                                <h4 className="text-lg font-medium text-white">{card.title}</h4>
                                <p className="mt-3 text-sm leading-relaxed text-white/40 font-light">{card.text}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </main>
        </div>
    );
}