"use client"

import { useEffect, useRef } from "react"

const metrics = [
  { label: "Energy State", value: "98%" },
  { label: "Reactive Nodes", value: "240" },
]

const bars = [
  { label: "Forest Sync", value: "96%", width: "w-[96%]", tone: "bg-[#61DAFB]" },
  { label: "Energy Flow", value: "82%", width: "w-[82%]", tone: "bg-[oklch(82%_0.22_150)]" },
  { label: "Virtual Ecology", value: "91%", width: "w-[91%]", tone: "bg-white" },
]

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    document.documentElement.classList.add("dark", "scroll-smooth")
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.14 }
    )

    document.querySelectorAll<HTMLElement>(".bloom").forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    let ticking = false

    const update = () => {
      const scrolled = window.scrollY
      const scale = 1.25 + scrolled * 0.00008
      const translate = scrolled * 0.06
      video.style.transform = `scale(${scale}) translateY(${translate}px)`
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        update()
        ticking = false
      })
    }

    update()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const buttons = document.querySelectorAll<HTMLButtonElement>("button")
    const supportsViewTransition = typeof document.startViewTransition === "function"

    const onClick = () => {
      if (!supportsViewTransition) return
      document.startViewTransition(() => {})
    }

    buttons.forEach((button) => button.addEventListener("click", onClick))
    return () => buttons.forEach((button) => button.removeEventListener("click", onClick))
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#05070b] text-white">
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-[10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(97,218,251,.18),transparent_70%)] blur-3xl" />
        <div className="absolute bottom-0 right-[5%] h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(120,255,180,.1),transparent_70%)] blur-3xl" />
      </div>

      <header className="fixed inset-x-0 top-0 z-50 px-6 py-5 md:px-10">
        <div className="liquid-panel mx-auto flex max-w-[1600px] items-center justify-between rounded-[2rem] px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="grid h-12 w-12 place-items-center rounded-[1.6rem] border border-white/10 bg-white/[0.04]">
              <div className="h-5 w-5 rounded-full bg-[#61DAFB] shadow-[0_0_30px_rgba(97,218,251,.7)]" />
            </div>
            <div>
              <div className="font-sans text-xs uppercase tracking-[0.32em] text-white/45">Terraform OS</div>
              <div className="text-sm text-white/70">Reactive Forest Intelligence</div>
            </div>
          </div>

          <nav className="hidden items-center gap-10 font-sans text-[11px] uppercase tracking-[0.24em] text-white/45 lg:flex">
            {["Virtual DOM", "Forest State", "Reactive Villas", "Biophilic Sync"].map((item) => (
              <a key={item} href="#" className="transition hover:text-[#61DAFB]">
                {item}
              </a>
            ))}
          </nav>

          <button className="dew rounded-[1.8rem] px-6 py-3 font-sans text-[11px] uppercase tracking-[0.24em] text-white">
            Access System
          </button>
        </div>
      </header>

      <main className="relative z-10 overflow-hidden px-6 pt-36 md:px-10">
        <section className="relative mx-auto grid min-h-[92vh] max-w-[1600px] items-center gap-16 lg:grid-cols-[.46fr_.54fr]">
          <div className="relative z-20 max-w-2xl">
            <div className="bloom active inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 font-sans text-[11px] uppercase tracking-[0.3em] text-white/55">
              <div className="pulse-react h-2 w-2 rounded-full bg-[#61DAFB] shadow-[0_0_15px_rgba(97,218,251,.9)]" />
              Biophilic Data Binding Active
            </div>

            <h1 className="mt-8 font-serif text-[4.8rem] leading-[.9] tracking-[-0.08em] text-white md:text-[7rem] xl:text-[8.5rem]">
              <span className="wind-sway">Reactive</span>
              <br />
              Forest Logic
            </h1>

            <p className="mt-8 max-w-xl font-body text-lg leading-9 text-white/50 md:text-xl">
              A React-native operating system for regenerative estates. State-driven architecture powering geothermal villas, photovoltaic envelopes, and intelligent forest equilibrium.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-5">
              <button className="dew rounded-[2rem] px-8 py-5 font-sans text-[12px] uppercase tracking-[0.24em] text-white">
                Launch Ecosystem
              </button>

              <button className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-8 py-5 font-sans text-[12px] uppercase tracking-[0.24em] text-white/65 backdrop-blur-xl transition hover:bg-white/[0.05] hover:text-white">
                Explore Runtime
              </button>
            </div>

            <div className="mt-16 flex flex-wrap gap-5">
              {metrics.map((metric) => (
                <div key={metric.label} className="liquid-panel rounded-[2rem] px-6 py-5">
                  <div className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/40">{metric.label}</div>
                  <div className="mt-3 text-3xl font-semibold">{metric.value}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center lg:justify-end">
            <div className="organic-shell float-core relative aspect-[.95] w-full max-w-[880px] scroll-grow">
              <video ref={heroVideoRef} autoPlay muted loop playsInline className="hero-video h-full w-full object-cover saturate-[1.2] contrast-[1.08] brightness-[.9] mix-blend-screen">
                <source src="/video.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(5,7,11,.65)_100%)]" />
            </div>
          </div>
        </section>

        <section className="relative mx-auto mt-32 max-w-[1600px]">
          <div className="absolute left-[20%] top-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(97,218,251,.12),transparent_70%)] blur-3xl" />

          <div className="flex flex-col gap-16">
            <div className="bloom max-w-4xl">
              <div className="font-sans text-[11px] uppercase tracking-[0.32em] text-white/35">Virtual Ecosystem</div>
              <h2 className="mt-6 font-serif text-5xl leading-[1] tracking-[-0.07em] text-white md:text-7xl">
                Reactivity designed like a living biome.
              </h2>
            </div>

            <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch">
              <article className="liquid-panel bloom flex-1 rounded-[3rem] p-8 md:p-10">
                <div className="flex items-center justify-between">
                  <div className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/35">Component Modularity</div>
                  <div className="pulse-react h-3 w-3 rounded-full bg-[#61DAFB]" />
                </div>

                <h3 className="mt-8 max-w-sm font-serif text-4xl leading-tight tracking-[-0.06em]">
                  Dynamic villa systems powered by reactive state.
                </h3>

                <p className="mt-6 max-w-xl text-lg leading-8 text-white/50">
                  Every villa node synchronizes lighting, geothermal balance, and photovoltaic consumption through a unified component architecture.
                </p>
              </article>

              <article className="liquid-panel bloom rounded-[3rem] p-8 md:w-[32rem]">
                <div className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/35">Hydration Metrics</div>

                <div className="mt-8 space-y-6">
                  {bars.map((bar) => (
                    <div key={bar.label}>
                      <div className="mb-2 flex items-center justify-between text-sm text-white/50">
                        <span>{bar.label}</span>
                        <span>{bar.value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div className={`h-full ${bar.width} rounded-full ${bar.tone}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </div>
          </div>
        </section>
      </main>

      <style jsx global>{`
        :root {
          color-scheme: dark;
        }

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 20% 10%, rgba(97, 218, 251, 0.15), transparent 28%),
            radial-gradient(circle at 80% 40%, rgba(120, 255, 180, 0.08), transparent 24%),
            radial-gradient(circle at 50% 100%, rgba(97, 218, 251, 0.08), transparent 35%),
            #05070b;
          color: white;
          font-family: "PP Neue Montreal", sans-serif;
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.025) 1px, transparent 1px);
          background-size: 110px 110px;
          -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 78%);
          mask-image: radial-gradient(circle at center, black 30%, transparent 78%);
          opacity: 0.45;
          z-index: -1;
        }

        .liquid-panel {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.03));
          backdrop-filter: blur(60px) saturate(1.4);
          -webkit-backdrop-filter: blur(60px) saturate(1.4);
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.08),
            0 30px 120px rgba(0, 0, 0, 0.5),
            0 0 80px rgba(97, 218, 251, 0.06);
        }

        .dew {
          position: relative;
          overflow: hidden;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.05));
          backdrop-filter: blur(30px) saturate(1.8);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.18),
            0 0 40px rgba(97, 218, 251, 0.18);
          transition:
            transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.6s ease;
        }

        .dew:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.2),
            0 0 60px rgba(97, 218, 251, 0.28);
        }

        .wind-sway {
          display: inline-block;
          transform-origin: center bottom;
          animation: wind 8s ease-in-out infinite;
        }

        .organic-shell {
          position: relative;
          overflow: hidden;
          isolation: isolate;
          border-radius: 44% 56% 58% 42% / 42% 36% 64% 58%;
          -webkit-mask-image: radial-gradient(circle at center, black 40%, transparent 74%);
          mask-image: radial-gradient(circle at center, black 40%, transparent 74%);
          filter: drop-shadow(0 0 80px rgba(97, 218, 251, 0.18));
        }

        .organic-shell::before {
          content: "";
          position: absolute;
          inset: -10%;
          background: radial-gradient(circle, rgba(97, 218, 251, 0.2), transparent 60%);
          filter: blur(50px);
          z-index: 2;
          pointer-events: none;
        }

        .telemetry {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.12), rgba(255, 255, 255, 0.03));
          backdrop-filter: blur(60px) contrast(0.85) saturate(1.3);
          -webkit-backdrop-filter: blur(60px) contrast(0.85) saturate(1.3);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .bloom {
          opacity: 0;
          transform: translateY(60px) scale(0.96);
          transition:
            opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bloom.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .pulse-react {
          animation: pulseReact 4s ease-in-out infinite;
        }

        .light-river {
          position: absolute;
          inset: auto 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(97, 218, 251, 0.35), rgba(140, 255, 180, 0.4), transparent);
          filter: blur(0.4px);
        }

        @keyframes wind {
          0%,
          100% {
            transform: rotate(-1deg) translateX(-2px);
          }
          50% {
            transform: rotate(1deg) translateX(2px);
          }
        }

        @keyframes pulseReact {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.03);
            opacity: 1;
          }
        }

        @keyframes drift {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-12px);
          }
          100% {
            transform: translateY(0px);
          }
        }

        .float-core {
          animation: drift 9s ease-in-out infinite;
        }

        @supports (animation-timeline: view()) {
          .scroll-grow {
            animation: grow linear both;
            animation-timeline: view();
            animation-range: entry 10% cover 65%;
          }

          @keyframes grow {
            from {
              transform: scale(0.92);
              opacity: 0.6;
            }
            to {
              transform: scale(1);
              opacity: 1;
            }
          }
        }
      `}</style>
    </main>
  )
}