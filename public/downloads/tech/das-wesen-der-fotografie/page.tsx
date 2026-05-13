"use client"

import { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"

const featureCards = [
  {
    icon: "ph:aperture-thin",
    title: "Optical resolution",
    description:
      "Edge-to-edge algorithmic sharpness. Micro-contrast optimized for anomalous dispersion glass variants.",
  },
  {
    icon: "ph:faders-thin",
    title: "Mechanical tolerance",
    description:
      "Machined to 0.001mm variance. Tactile feedback generated through solid brass helicoids.",
    offset: true,
  },
  {
    icon: "ph:cube-thin",
    title: "Light-path architecture",
    description:
      "Non-linear spatial plotting ensures geometric fidelity prior to digital conversion.",
  },
  {
    icon: "ph:cpu-thin",
    title: "Image signal processing",
    description:
      "Maestro III silicon running parallel vector math to render photorealistic grain density at 120fps.",
    offset: true,
  },
]

export default function Page() {
  const manifestoRef = useRef<HTMLDivElement | null>(null)
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    const root = document.documentElement
    root.classList.add("scroll-smooth", "dark")
  }, [])

  useEffect(() => {
    const targets = document.querySelectorAll<HTMLElement>(".assemble-on-scroll")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in")
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18 }
    )

    targets.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const video = heroVideoRef.current
    if (!video) return

    const update = () => {
      const scrollY = window.scrollY
      const progress = Math.min(scrollY / (window.innerHeight * 0.9), 1)
      const scale = 1 + progress * 0.08
      const translate = progress * 10
      video.style.transform = `scale(${scale}) translateY(${translate}px)`
    }

    let ticking = false
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
    const el = manifestoRef.current
    if (!el) return

    const text = "Absolute fidelity. Zero refraction loss. An interface forged from the mathematical boundaries of light gathering."
    el.textContent = ""
    let i = 0
    let cancelled = false

    const type = () => {
      if (cancelled) return
      el.textContent = text.slice(0, i + 1)
      i += 1
      if (i < text.length) {
        window.setTimeout(type, 12)
      }
    }

    type()

    return () => {
      cancelled = true
    }
  }, [])

  const handleViewTransition = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === "#") {
      e.preventDefault()
      return
    }

    if (typeof document.startViewTransition !== "function") {
      return
    }

    e.preventDefault()
    document.startViewTransition(() => {
      window.location.hash = href
    })
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[oklch(98%_0.01_240)] text-[oklch(12%_0.01_240)] antialiased selection:bg-black selection:text-white">
      <nav className="hub-nav fixed left-0 top-0 z-50 flex w-full items-start justify-between px-8 pb-16 pt-8 backdrop-blur-[10px] md:px-16">
        <div className="text-xl font-medium tracking-tight md:text-2xl">LEICA</div>
        <div className="hidden gap-12 text-xs font-medium uppercase tracking-widest text-[oklch(30%_0.01_240)] md:flex">
          {["Architecture", "Optics", "Telemetry"].map((item) => (
            <a
              key={item}
              href="#"
              onClick={(e) => handleViewTransition(e, "#")}
              className="transition-colors hover:text-black"
            >
              {item}
            </a>
          ))}
        </div>
      </nav>

      <main className="relative flex h-screen w-full flex-col justify-end overflow-hidden px-8 pb-16 md:px-16">
        <video ref={heroVideoRef} autoPlay muted loop playsInline className="geometric-breach">
          <source src="/video.mp4" type="video/mp4" />
        </video>
        <div className="light-corridor" />

        <div className="relative z-10 mx-auto flex w-full max-w-7xl justify-start">
          <div className="glass-morphism-2 assemble-on-scroll w-full max-w-3xl transform-gpu rounded-[2rem] p-10 md:p-14">
            <h1 className="mb-6 text-5xl font-medium leading-[1.05] tracking-tighter md:text-7xl">
              Das Wesen der Fotografie.
            </h1>
            <div
              ref={manifestoRef}
              className="tech-spec max-w-xl text-lg font-light leading-relaxed text-[oklch(25%_0.02_240)] md:text-xl"
            />
          </div>
        </div>
      </main>

      <section className="mx-auto w-full max-w-7xl px-8 py-32 md:px-16 md:py-48">
        <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12 lg:gap-8">
          <div className="assemble-on-scroll lg:sticky lg:top-40 lg:col-span-5">
            <h2 className="mb-6 text-4xl font-medium tracking-tight md:text-5xl">Hardware Topology</h2>
            <p className="tech-spec text-lg font-light leading-relaxed text-[oklch(35%_0.01_240)]">
              The optical block is uncompromised. Every module exists to serve the signal path, creating a sensory experience of technical disruption mapped directly to human perception.
            </p>
          </div>

          <div className="flex flex-col gap-8 lg:col-span-6 lg:col-start-7">
            {featureCards.map((card) => (
              <div
                key={card.title}
                className={[
                  "glass-morphism-2 assemble-on-scroll flex items-start gap-6 rounded-3xl p-8 transition-transform duration-500 hover:scale-[1.02] md:p-10",
                  card.offset ? "md:translate-x-12" : "",
                ].join(" ")}
              >
                <Icon icon={card.icon} className="shrink-0 text-4xl text-black md:text-[44px]" />
                <div>
                  <h3 className="mb-3 text-xl font-medium md:text-2xl">{card.title}</h3>
                  <p className="tech-spec text-sm font-light leading-relaxed text-[oklch(40%_0.01_240)] md:text-base">
                    {card.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        @font-face {
          font-family: "PP Neue Montreal";
          src: local("-apple-system"), local("BlinkMacSystemFont"), local("Helvetica Neue"), local("Arial");
          font-weight: 400;
        }

        :root {
          color-scheme: light;
          --hyper-light: oklch(98% 0.01 240 / 0.65);
          --anodized-silver: oklch(94% 0.01 240 / 0.4);
          --industrial-edge: oklch(20% 0.02 240 / 0.15);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          font-family: "PP Neue Montreal", sans-serif;
          background-color: oklch(98% 0.01 240);
          color: oklch(12% 0.01 240);
        }

        .tech-spec {
          font-family: "Inter Tight", sans-serif;
          letter-spacing: -0.02em;
        }

        .light-corridor {
          position: absolute;
          left: 0;
          top: 0;
          z-index: 1;
          height: 100vh;
          width: 100vw;
          pointer-events: none;
          background: radial-gradient(circle at 70% 40%, transparent 0%, oklch(98% 0.01 240 / 0.8) 80%, oklch(98% 0.01 240 / 1) 100%);
        }

        .geometric-breach {
          position: absolute;
          inset: 0;
          z-index: 0;
          height: 100vh;
          width: 100vw;
          object-fit: cover;
          filter: grayscale(15%) contrast(1.1) brightness(0.95);
          will-change: transform;
        }

        .glass-morphism-2 {
          background: linear-gradient(135deg, var(--hyper-light), var(--anodized-silver));
          backdrop-filter: blur(20px) saturate(1.2);
          -webkit-backdrop-filter: blur(20px) saturate(1.2);
          border: 1px solid var(--industrial-edge);
          box-shadow:
            inset 0 1px 0 0 rgba(255, 255, 255, 0.6),
            0 24px 40px -8px rgba(0, 0, 0, 0.05);
        }

        .hub-nav {
          background: linear-gradient(to bottom, oklch(98% 0.01 240 / 0.9) 0%, transparent 100%);
        }

        .assemble-on-scroll {
          animation: atomic-assemble linear both;
          animation-timeline: view();
          animation-range: entry 10% cover 30%;
          opacity: 0;
          transform: translateY(60px) scale(0.96);
          filter: blur(8px);
        }

        .assemble-on-scroll.in {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        @keyframes atomic-assemble {
          0% {
            opacity: 0;
            transform: translateY(60px) scale(0.96);
            filter: blur(8px);
          }
          100% {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 0.8s;
          animation-timing-function: cubic-bezier(0.22, 1, 0.36, 1);
        }
      `}</style>
    </main>
  )
}