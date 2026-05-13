"use client"

import { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)

  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth")
  }, [])

  useEffect(() => {
    const heroVideo = heroVideoRef.current
    if (!heroVideo) return

    let ticking = false

    const updateHero = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 1.1), 1)
      const scale = 1.2 + progress * 0.06
      const translate = progress * 18
      heroVideo.style.transform = `scale(${scale}) translateY(${translate}px)`
    }

    const onScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        updateHero()
        ticking = false
      })
    }

    updateHero()
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", onScroll)
    }
  }, [])

  useEffect(() => {
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

    document.querySelectorAll<HTMLElement>(".scroll-assembly").forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleLink = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const target = e.currentTarget.getAttribute("href")
    if (!target || target === "#") return

    if (typeof document.startViewTransition === "function") {
      document.startViewTransition(() => {
        window.location.hash = target
      })
      return
    }

    window.location.hash = target
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[oklch(12%_0.01_240)] text-[oklch(98%_0.01_240)] antialiased selection:bg-[oklch(65%_0.2_260)] selection:text-white">
      <div className="optical-flare" />

      <div className="kinetic-anchor">
        <video ref={heroVideoRef} autoPlay loop muted playsInline>
          <source src="/video.mp4" type="video/mp4" />
        </video>
      </div>

      <nav className="fixed top-0 z-50 flex w-full items-center justify-between bg-gradient-to-b from-[oklch(12%_0.01_240_/_0.8)] to-transparent p-6 transition-all duration-500">
        <div className="flex items-center gap-3">
          <Icon icon="ic:baseline-apple" className="text-3xl" />
          <span className="text-sm font-semibold uppercase tracking-widest">Vision Pro</span>
        </div>

        <div className="flex gap-8 text-sm tracking-wide">
          <a href="#spatial" onClick={handleLink} className="transition-colors hover:text-[oklch(65%_0.2_260)]">
            Spatial Architecture
          </a>
          <a href="#neural" onClick={handleLink} className="transition-colors hover:text-[oklch(65%_0.2_260)]">
            Neural Processing
          </a>
          <a href="#sdk" onClick={handleLink} className="transition-colors hover:text-[oklch(65%_0.2_260)]">
            Immersive SDK
          </a>
        </div>
      </nav>

      <main className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-32 pt-48">
        <section id="spatial" className="flex min-h-[80vh] max-w-4xl flex-col justify-center @container">
          <div className="lens-refraction mb-8 inline-block w-max max-w-full rounded-[40px] p-12 backdrop-blur-3xl">
            <h1 className="bg-gradient-to-br from-white via-gray-300 to-[oklch(65%_0.2_260)] bg-clip-text text-7xl font-light leading-tight tracking-[-0.04em] text-transparent md:text-8xl">
              Spatial Computing.
              <br />
              <span className="font-semibold">Absolute Reality.</span>
            </h1>
          </div>

          <p className="lens-refraction mt-6 max-w-2xl rounded-[40px] p-8 text-xl font-light leading-relaxed text-gray-300 md:text-2xl">
            Experience neural-engine orchestration combined with sub-millisecond inference. The new standard for immersive hardware interfaces.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <button className="photon-glow inline-flex items-center gap-3 px-10 py-5 text-lg font-medium transition-link">
              Initialize Sequence
              <Icon icon="ph:arrow-right-light" className="text-xl" />
            </button>

            <button className="lens-refraction rounded-full px-10 py-5 text-lg font-medium transition-colors hover:bg-white/10">
              View Telemetry
            </button>
          </div>
        </section>

        <section id="neural" className="asymmetric-hub scroll-assembly mt-64 @container">
          <div className="flex flex-col gap-12">
            <div className="lens-refraction scroll-assembly -rotate-1 transform rounded-[40px] p-10 transition-transform duration-700 hover:rotate-0">
              <Icon icon="ph:cpu-light" className="mb-6 text-4xl text-[oklch(65%_0.2_260)]" />
              <h3 className="mb-4 text-3xl font-semibold">Terabit-Scale Throughput</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                Quantum-level data processing enables real-time spatial SKU visualization sin latencia. La geometría de tu mundo, calculada a la velocidad de la luz.
              </p>
            </div>

            <div className="lens-refraction scroll-assembly ml-12 transform rotate-1 rounded-[40px] p-10 transition-transform duration-700 hover:rotate-0">
              <Icon icon="ph:bounding-box-light" className="mb-6 text-4xl text-[oklch(65%_0.2_260)]" />
              <h3 className="mb-4 text-3xl font-semibold">Holographic Optics</h3>
              <p className="text-lg leading-relaxed text-gray-300">
                Custom micro-OLED matrices powered by photonic grids. Precisión óptica absoluta que elimina efectos de malla para una verdadera presencia volumétrica.
              </p>
            </div>
          </div>

          <div id="sdk" className="lens-refraction group flex min-h-[600px] h-full flex-col justify-end overflow-hidden rounded-[40px] p-12 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[oklch(65%_0.2_260_/_0.15)] to-transparent opacity-0 transition-opacity duration-1000 group-hover:opacity-100" />
            <div className="relative z-10">
              <h2 className="mb-6 text-5xl font-light">Fluid Geometry</h2>
              <p className="max-w-md text-xl text-gray-300">
                La interfaz ya no está limitada por el cristal. Responde a la intención fisiológica, ensamblándose y desensamblándose como un organismo digital vivo.
              </p>
            </div>
          </div>
        </section>

        <section className="scroll-assembly mt-64">
          <div className="lens-refraction mx-auto flex max-w-5xl flex-col items-center rounded-[40px] p-16 text-center md:p-24">
            <Icon icon="ph:aperture-light" className="mb-8 animate-pulse text-6xl text-[oklch(65%_0.2_260)]" />
            <h2 className="mb-8 text-5xl font-light md:text-7xl">Enter the Vanguard</h2>
            <p className="mx-auto mb-12 max-w-2xl text-2xl text-gray-300">
              Cero fronteras. Cero restricciones. Arquitecta la próxima dimensión de la simbiosis humano-computadora.
            </p>
            <button className="photon-glow px-12 py-6 text-xl font-medium">Deploy Prototype</button>
          </div>
        </section>
      </main>

      <style jsx global>{`
        :root {
          --obsidian-void: oklch(12% 0.01 240);
          --holo-cyan: oklch(65% 0.2 260);
          --photon-white: oklch(98% 0.01 240);
          --flare-leak: radial-gradient(circle at 50% 50%, oklch(65% 0.2 260 / 0.15), transparent 70%);
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: "Inter", sans-serif;
          background-color: var(--obsidian-void);
          color: var(--photon-white);
          overflow-x: hidden;
          margin: 0;
          padding: 0;
          view-transition-name: root;
        }

        h1,
        h2,
        h3 {
          font-family: "SF Pro Display", sans-serif;
          letter-spacing: -0.04em;
        }

        .kinetic-anchor {
          position: fixed;
          top: 10vh;
          right: -5vw;
          width: 70vw;
          height: 90vh;
          z-index: 0;
          -webkit-mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%);
          mask-image: radial-gradient(ellipse at 50% 50%, black 20%, transparent 70%);
          -webkit-mask-composite: source-in;
          mask-composite: intersect;
          transform-style: preserve-3d;
          animation: float 18s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
          pointer-events: none;
          opacity: 0.95;
        }

        .kinetic-anchor video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: scale(1.2);
        }

        .lens-refraction {
          background: color-mix(in oklch, var(--photon-white) 4%, transparent);
          backdrop-filter: blur(40px) brightness(1.1);
          -webkit-backdrop-filter: blur(40px) brightness(1.1);
          box-shadow:
            0 40px 100px -20px rgba(0, 0, 0, 0.8),
            inset 0 1px 1px 0 rgba(255, 255, 255, 0.15),
            inset 0 -1px 1px 0 rgba(255, 255, 255, 0.05);
          border-radius: 40px;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .photon-glow {
          background: var(--holo-cyan);
          color: #fff;
          position: relative;
          transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
          box-shadow:
            0 0 30px oklch(65% 0.2 260 / 0.3),
            inset 0 2px 4px rgba(255, 255, 255, 0.4);
          border: none;
          border-radius: 9999px;
        }

        .photon-glow:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow:
            0 0 50px oklch(65% 0.2 260 / 0.6),
            inset 0 2px 4px rgba(255, 255, 255, 0.6);
        }

        .optical-flare {
          position: fixed;
          width: 150vw;
          height: 150vh;
          background: var(--flare-leak);
          top: -25vh;
          left: -25vw;
          z-index: -1;
          pointer-events: none;
          filter: blur(100px);
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotateX(2deg) rotateY(-2deg) scale(1);
          }
          100% {
            transform: translateY(-40px) rotateX(-2deg) rotateY(3deg) scale(1.02);
          }
        }

        @keyframes atomic-assembly {
          from {
            opacity: 0;
            transform: translateY(80px) scale(0.95) rotateX(5deg);
            filter: blur(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1) rotateX(0deg);
            filter: blur(0);
          }
        }

        .scroll-assembly {
          animation: atomic-assembly linear both;
          animation-timeline: view();
          animation-range: entry 10% cover 35%;
          transform-style: preserve-3d;
          opacity: 0;
        }

        .scroll-assembly.in {
          opacity: 1;
          transform: none;
          filter: none;
        }

        .asymmetric-hub {
          display: grid;
          grid-template-columns: minmax(300px, 1fr) minmax(400px, 1.5fr);
          gap: 4rem;
          align-items: center;
        }

        @media (max-width: 1024px) {
          .asymmetric-hub {
            grid-template-columns: 1fr;
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