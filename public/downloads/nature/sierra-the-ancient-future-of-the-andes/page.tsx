"use client"

import { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"

export default function Page() {
  const lightCorridorRef = useRef<HTMLDivElement | null>(null)
  const portalVideoRef = useRef<HTMLVideoElement | null>(null)
  const heroTextRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -10% 0px",
      threshold: 0.1,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active")
          observer.unobserve(entry.target)
        }
      })
    }, observerOptions)

    const revealElements = document.querySelectorAll(".reveal-up:not(.active)")
    revealElements.forEach((el) => observer.observe(el))

    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY
          const parallaxCards = document.querySelectorAll(".parallax-card")

          if (lightCorridorRef.current) {
            const hueRotate = Math.min(scrolled * 0.15, 180)
            lightCorridorRef.current.style.filter = `hue-rotate(${hueRotate}deg)`
            lightCorridorRef.current.style.transform = `translateX(-50%) translateY(${scrolled * 0.2}px) scale(${1 + scrolled * 0.0005})`
          }

          if (portalVideoRef.current && scrolled < window.innerHeight * 1.5) {
            portalVideoRef.current.style.transform = `scale(${1.02 + scrolled * 0.0002}) translateY(${scrolled * 0.1}px)`
          }

          if (heroTextRef.current && scrolled < window.innerHeight) {
            heroTextRef.current.style.transform = `translateY(${scrolled * -0.08}px)`
          }

          parallaxCards.forEach((card) => {
            const rect = card.getBoundingClientRect()

            if (rect.top < window.innerHeight && rect.bottom > 0) {
              const yOffset = (window.innerHeight - rect.top) * 0.05
              ;(card as HTMLElement).style.transform = `translateY(-${yOffset}px)`
            }
          })

          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500&family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");

        html,
        body {
          margin: 0;
          padding: 0;
          width: 100%;
          background-color: oklch(12% 0.02 240);
          color: oklch(95% 0.01 240);
          scroll-behavior: smooth;
          overflow-x: hidden;
          font-family: "Inter", sans-serif;
        }

        .vercel-grain {
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
          opacity: 0.04;
          mix-blend-mode: screen;
        }

        .light-corridor {
          position: fixed;
          top: -30vh;
          left: 50%;
          transform: translateX(-50%);
          width: 150vw;
          height: 120vh;
          background: radial-gradient(
            ellipse 60% 50% at 50% 0%,
            oklch(80% 0.25 75 / 0.18) 0%,
            transparent 100%
          );
          pointer-events: none;
          z-index: 0;
          will-change: filter, transform;
        }

        .pristine-header {
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          background: linear-gradient(
            to bottom,
            oklch(12% 0.02 240 / 0.6),
            oklch(12% 0.02 240 / 0)
          );
          border-bottom: 0.5px solid oklch(95% 0.01 240 / 0.05);
        }

        .crystal-btn {
          position: relative;
          background: oklch(95% 0.01 240 / 0.03);
          border: 0.5px solid oklch(95% 0.01 240 / 0.1);
          box-shadow: inset 0 0 10px oklch(80% 0.25 75 / 0.1),
            0 4px 15px rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(10px);
          border-radius: 999px;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .crystal-btn:hover {
          background: oklch(95% 0.01 240 / 0.08);
          box-shadow: inset 0 0 15px oklch(80% 0.25 75 / 0.3),
            0 8px 25px rgba(0, 0, 0, 0.3);
          border-color: oklch(80% 0.25 75 / 0.4);
          transform: translateY(-1px);
        }

        .radial-portal {
          -webkit-mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
          mask-image: radial-gradient(circle at center, black 30%, transparent 75%);
          will-change: transform;
        }

        .sun-bleed {
          background: linear-gradient(
            135deg,
            oklch(80% 0.25 75) 0%,
            oklch(95% 0.01 240) 100%
          );
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 35px oklch(80% 0.25 75 / 0.35),
            0 0 80px oklch(80% 0.25 75 / 0.15);
        }

        .andenes-clip {
          clip-path: polygon(0 3%, 100% 0, 97% 100%, 3% 97%);
          transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .subsurface-glow {
          background: linear-gradient(
            160deg,
            oklch(15% 0.02 240),
            oklch(12% 0.02 240)
          );
          box-shadow: inset 0 0 30px oklch(80% 0.25 75 / 0.08),
            inset 0.5px 0.5px 0px oklch(95% 0.01 240 / 0.2);
        }

        .subsurface-glow:hover {
          box-shadow: inset 0 0 40px oklch(80% 0.25 75 / 0.15),
            inset 0.5px 0.5px 0px oklch(80% 0.25 75 / 0.4);
        }

        .reveal-up {
          opacity: 0;
          transform: translateY(40px);
          transition:
            opacity 1.6s cubic-bezier(0.16, 1, 0.3, 1),
            transform 1.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-up.active {
          opacity: 1;
          transform: translateY(0);
        }

        .delay-100 {
          transition-delay: 0.1s;
        }

        .delay-200 {
          transition-delay: 0.2s;
        }

        .delay-300 {
          transition-delay: 0.3s;
        }
      `}</style>

      <div className="bg-[oklch(12%_0.02_240)] text-[oklch(95%_0.01_240)] antialiased selection:bg-yellow-300/30 selection:text-yellow-300">
        <div className="vercel-grain" />

        <div ref={lightCorridorRef} className="light-corridor" />

        <nav className="pristine-header fixed top-0 z-50 flex w-full items-center justify-between px-8 py-5">
          <div className="group flex cursor-pointer items-center gap-3">
            <Icon
              icon="ph:mountains-light"
              className="text-3xl text-white transition-colors duration-500 group-hover:text-yellow-300"
            />

            <div className="flex flex-col">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/50">
                PROMPERÚ
              </span>

              <span
                className="text-[14px] italic text-white/90"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Sanctuaries
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-10 text-[11px] font-medium uppercase tracking-[0.2em] text-white/70 md:flex">
            <a href="#" className="transition-colors hover:text-yellow-300">
              Cusco
            </a>

            <a href="#" className="transition-colors hover:text-yellow-300">
              Huaraz
            </a>

            <a href="#" className="transition-colors hover:text-yellow-300">
              Puno
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button className="crystal-btn flex items-center gap-2 px-5 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-white">
              <Icon icon="ph:globe-hemisphere-west-light" className="text-[14px]" />
              EN
            </button>
          </div>
        </nav>

        <main className="relative z-10 w-full pt-[12vh]">
          <section className="relative mx-auto grid min-h-[88vh] max-w-[1800px] grid-cols-1 gap-12 overflow-hidden px-8 md:px-16 lg:grid-cols-2">
            <div
              ref={heroTextRef}
              className="z-20 flex max-w-xl flex-col justify-center"
            >
              <div className="reveal-up active mb-8 flex items-center gap-4">
                <div className="h-6 w-[1px] bg-yellow-300/60" />

                <span className="text-[10px] uppercase tracking-[0.4em] text-white/60">
                  4,000 Meters Above
                </span>

                <div className="h-6 w-[1px] bg-yellow-300/60" />
              </div>

              <h1
                className="reveal-up active delay-100 text-6xl leading-[0.9] tracking-tighter md:text-7xl lg:text-[6.5rem]"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                <span className="sun-bleed">Floating</span>

                <br />

                <i className="not-italic text-white/90">Sanctuaries</i>
              </h1>

              <p className="reveal-up active delay-200 mt-10 max-w-md text-sm font-light leading-relaxed tracking-wide text-white/50">
                Experience extreme Andean orography where tectonic levitation
                meets cloud-forest biodiversity. A luxury archeo-tourism
                expedition bridging the ancient stone with infinite light.
              </p>

              <div className="reveal-up active delay-300 mt-14 flex items-center gap-8">
                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Elevation
                  </span>

                  <span
                    className="text-xl text-yellow-300"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    13,123 ft
                  </span>
                </div>

                <div className="h-8 w-[1px] bg-white/10" />

                <div className="flex flex-col gap-1">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-white/40">
                    Atmosphere
                  </span>

                  <span
                    className="text-xl text-yellow-300"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    Pristine
                  </span>
                </div>

                <div className="h-8 w-[1px] bg-white/10" />

                <button className="crystal-btn group flex h-12 w-12 items-center justify-center rounded-full text-white">
                  <Icon
                    icon="ph:arrow-down-light"
                    className="text-lg transition-transform group-hover:translate-y-1"
                  />
                </button>
              </div>
            </div>

            <div className="pointer-events-none relative z-10 flex h-[60vh] w-full items-center justify-center lg:h-full lg:justify-end">
              <div className="radial-portal absolute -left-[20%] -top-[20%] h-[140%] w-[140%]">
                <video
                  ref={portalVideoRef}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-contain contrast-[1.1] saturate-110 sepia-[0.1]"
                >
                  <source src="/video.mp4" type="video/mp4" />
                </video>

                <div className="absolute inset-0 bg-black/20 mix-blend-multiply" />
              </div>
            </div>
          </section>

          <section className="relative z-20 mx-auto w-full max-w-[1800px] border-t border-white/5 px-8 py-40 md:px-16">
            <div className="reveal-up mb-24 flex flex-col justify-between md:flex-row md:items-end">
              <h2
                className="text-4xl leading-[1.1] tracking-tight text-white md:text-6xl"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                Tectonic
                <br />

                <i className="not-italic font-light text-yellow-300">
                  Levitation
                </i>
              </h2>

              <p className="mt-6 max-w-sm text-xs font-light leading-relaxed tracking-wide text-white/40 md:mt-0">
                Glacial runoff dynamics carve through the monolithic stone,
                creating ecosystems suspended between the earth and the Andean
                sky.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-12 lg:gap-24 md:grid-cols-2">
              <div className="andenes-clip subsurface-glow parallax-card reveal-up delay-100 group relative flex min-h-[450px] flex-col justify-between overflow-hidden p-12 md:p-16">
                <div className="absolute right-0 top-0 p-8 opacity-20 transition-opacity duration-700 group-hover:opacity-100">
                  <Icon
                    icon="ph:sun-horizon-light"
                    className="animate-spin text-6xl text-yellow-300"
                    style={{ animationDuration: "40s" }}
                  />
                </div>

                <div>
                  <span className="mb-6 block text-[10px] uppercase tracking-[0.3em] text-green-300">
                    01. Lithic Precision
                  </span>

                  <h3
                    className="mb-4 text-3xl text-white"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    Sacsayhuamán Scale
                  </h3>

                  <p className="max-w-md text-sm font-light leading-relaxed text-white/40">
                    Polygonal masonry engineered with millimeter precision. The
                    massive interlocking blocks required zero mortar, relying on
                    gravity and absolute mathematical exactitude to withstand
                    centuries of seismic activity.
                  </p>
                </div>

                <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-yellow-300/50 to-transparent" />
              </div>

              <div className="andenes-clip subsurface-glow parallax-card reveal-up delay-200 group relative mt-0 flex min-h-[450px] flex-col justify-between overflow-hidden p-12 md:mt-24 md:p-16">
                <div className="absolute right-0 top-0 p-8 text-green-300 opacity-20 transition-opacity duration-700 group-hover:opacity-100">
                  <Icon icon="ph:leaf-light" className="text-6xl" />
                </div>

                <div>
                  <span className="mb-6 block text-[10px] uppercase tracking-[0.3em] text-green-300">
                    02. Biological Altitudes
                  </span>

                  <h3
                    className="mb-4 text-3xl text-white"
                    style={{ fontFamily: '"Playfair Display", serif' }}
                  >
                    Cloud-Forest Flora
                  </h3>

                  <p className="max-w-md text-sm font-light leading-relaxed text-white/40">
                    The agricultural terraces (Andenes) act as vast open-air
                    laboratories. Microclimates generated by the stepped
                    architecture allow exotic biodiversity to thrive in the
                    thinnest of atmospheres.
                  </p>
                </div>

                <div className="mt-12 h-[1px] w-full bg-gradient-to-r from-green-300/50 to-transparent" />
              </div>
            </div>
          </section>
        </main>

        <footer className="relative z-20 w-full overflow-hidden border-t border-white/5 bg-black/80 px-8 py-24 backdrop-blur-xl md:px-16">
          <div className="mx-auto flex max-w-[1800px] flex-col items-start justify-between gap-12 md:flex-row md:items-end">
            <div className="reveal-up">
              <h3
                className="mb-6 text-4xl text-white/80"
                style={{ fontFamily: '"Playfair Display", serif' }}
              >
                PromPerú
              </h3>

              <div className="flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] text-white/40">
                <span className="flex items-center gap-2">
                  <Icon icon="ph:map-pin-light" className="text-yellow-300" />
                  13.1631° S, 72.5450° W
                </span>
              </div>
            </div>

            <div className="reveal-up delay-100 flex flex-wrap gap-8 md:gap-16">
              <div className="flex flex-col gap-4">
                <h4 className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/30">
                  Expeditions
                </h4>

                <a
                  href="#"
                  className="text-[11px] uppercase tracking-widest text-white/60 transition-colors hover:text-yellow-300"
                >
                  Inca Trail
                </a>

                <a
                  href="#"
                  className="text-[11px] uppercase tracking-widest text-white/60 transition-colors hover:text-yellow-300"
                >
                  Ausangate
                </a>

                <a
                  href="#"
                  className="text-[11px] uppercase tracking-widest text-white/60 transition-colors hover:text-yellow-300"
                >
                  Choquequirao
                </a>
              </div>

              <div className="flex flex-col gap-4">
                <h4 className="mb-2 text-[9px] uppercase tracking-[0.3em] text-white/30">
                  Heritage
                </h4>

                <a
                  href="#"
                  className="text-[11px] uppercase tracking-widest text-white/60 transition-colors hover:text-yellow-300"
                >
                  Conservation
                </a>

                <a
                  href="#"
                  className="text-[11px] uppercase tracking-widest text-white/60 transition-colors hover:text-yellow-300"
                >
                  Local Communities
                </a>

                <a
                  href="#"
                  className="text-[11px] uppercase tracking-widest text-white/60 transition-colors hover:text-yellow-300"
                >
                  Archeology
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}