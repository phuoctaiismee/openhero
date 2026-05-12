"use client"

import { useEffect, useRef } from "react"
import { Icon } from "@iconify/react"

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)
  const ctaButtonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const heroVideo = heroVideoRef.current
    const ctaButton = ctaButtonRef.current
    const supportsViewTransitions =
      typeof document !== "undefined" &&
      "startViewTransition" in document

    let raf = 0

    const updateHero = () => {
      const max = window.innerHeight * 1.15
      const progress = Math.min(Math.max(window.scrollY / max, 0), 1)
      const scale = 1.08 + progress * 0.15
      const translateY = progress * 14

      if (heroVideo) {
        heroVideo.style.transform = `scale(${scale}) translateY(${translateY}px)`
      }
    }

    updateHero()

    const onScroll = () => {
      if (raf) return
      raf = window.requestAnimationFrame(() => {
        updateHero()
        raf = 0
      })
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", updateHero)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      { threshold: 0.12 }
    )

    document.querySelectorAll(".bloom").forEach((el) => observer.observe(el))

    document.querySelectorAll("a, button").forEach((el) => {
      const enter = () => {
        el.animate(
          [
            { transform: "translateY(0px)" },
            { transform: "translateY(-2px)" },
          ],
          {
            duration: 220,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "forwards",
          }
        )
      }

      const leave = () => {
        el.animate(
          [
            { transform: "translateY(-2px)" },
            { transform: "translateY(0px)" },
          ],
          {
            duration: 220,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "forwards",
          }
        )
      }

      el.addEventListener("mouseenter", enter)
      el.addEventListener("mouseleave", leave)
    })

    const handleCta = () => {
      if (supportsViewTransitions) {
        ;(document as Document & { startViewTransition?: (cb: () => void) => void }).startViewTransition?.(
          () => {}
        )
      }
    }

    ctaButton?.addEventListener("click", handleCta)

    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", updateHero)
      ctaButton?.removeEventListener("click", handleCta)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600;700;800&family=Cormorant+Garamond:wght@500;600;700&display=swap");

        :root {
          color-scheme: light;
          --cream: #f8f1e6;
          --paper: #f2eadf;
          --ink: #26211c;
          --gold: #d7aa61;
          --amber: #bc8750;
          --blue: #5678a8;
          --blue-deep: #2f466b;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 12% 10%, rgba(235, 196, 126, 0.18), transparent 18%),
            radial-gradient(circle at 82% 14%, rgba(96, 132, 184, 0.14), transparent 16%),
            radial-gradient(circle at 50% 100%, rgba(187, 135, 80, 0.12), transparent 24%),
            linear-gradient(180deg, var(--cream) 0%, var(--paper) 52%, #efe7da 100%);
          color: var(--ink);
          font-family: "Inter Tight", sans-serif;
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          opacity: 0.08;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='280' height='280' viewBox='0 0 280 280'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='280' height='280' filter='url(%23n)' opacity='.6'/%3E%3C/svg%3E");
          z-index: -1;
        }

        .serif {
          font-family: "Cormorant Garamond", serif;
          letter-spacing: -0.055em;
        }

        .paper-panel {
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.62), rgba(255, 255, 255, 0.28));
          border: 1px solid rgba(129, 108, 74, 0.08);
          backdrop-filter: blur(26px) saturate(1.1);
          -webkit-backdrop-filter: blur(26px) saturate(1.1);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.65),
            0 20px 50px rgba(98, 78, 45, 0.08);
        }

        .silk {
          position: relative;
          overflow: hidden;
          border-radius: 999px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.54));
          border: 1px solid rgba(255, 255, 255, 0.6);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.8),
            inset 0 -12px 20px rgba(215, 170, 97, 0.15),
            0 16px 40px rgba(95, 73, 42, 0.08);
          transition:
            transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.5s ease;
        }

        .silk::after {
          content: "";
          position: absolute;
          inset: -120%;
          background: linear-gradient(120deg, transparent 44%, rgba(255, 255, 255, 0.78) 50%, transparent 56%);
          transform: translateX(-140%) rotate(12deg);
          animation: sheen 8s ease-in-out infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }

        .silk:hover {
          transform: translateY(-4px) scale(1.01);
          box-shadow:
            inset 0 1px 0 rgba(255, 255, 255, 0.84),
            inset 0 -12px 20px rgba(215, 170, 97, 0.18),
            0 22px 55px rgba(95, 73, 42, 0.12);
        }

        .bloom {
          opacity: 0;
          transform: translateY(26px) scale(0.98);
          transition:
            opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bloom.active {
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        .scrollbar-hide {
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        @keyframes sheen {
          to {
            transform: translateX(240%) rotate(12deg);
          }
        }

        @keyframes ripple {
          0%,
          100% {
            transform: translateY(0) rotate(-0.5deg);
          }

          50% {
            transform: translateY(-5px) rotate(0.5deg);
          }
        }

        .ripple {
          display: inline-block;
          animation: ripple 8s ease-in-out infinite;
          transform-origin: center bottom;
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation-duration: 0.7s;
          animation-timing-function: cubic-bezier(0.16, 1, 0.3, 1);
        }
      `}</style>

      <div className="relative min-h-screen overflow-x-hidden text-[#26211c]">
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-24 left-[6%] h-[24rem] w-[24rem] rounded-full bg-[radial-gradient(circle,rgba(215,170,97,.14),transparent_72%)] blur-3xl" />
          <div className="absolute bottom-[-10rem] right-[12%] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(86,120,168,.12),transparent_72%)] blur-3xl" />
        </div>

        <header className="fixed left-0 right-0 top-0 z-[70] border-b border-[rgba(95,73,42,.08)] backdrop-blur-[20px] saturate-[1.08]">
          <div className="grid grid-cols-[1fr_auto] items-center gap-5 px-4 py-4 lg:grid-cols-[auto_1fr_auto] lg:px-7">
            <div className="flex min-w-0 items-center gap-4">
              <div className="grid h-[46px] w-[46px] place-items-center rounded-2xl border border-[rgba(95,73,42,.1)] bg-white/50 shadow-[inset_0_1px_0_rgba(255,255,255,.6)]">
                <Icon icon="ph:waves-bold" className="text-2xl text-[#9b7a3d]" />
              </div>

              <div className="min-w-0 leading-tight">
                <div className="text-[11px] uppercase tracking-[0.34em] text-white/90">
                  Autumn Flow
                </div>
                <div className="text-sm text-white/80">
                  Regenerative Landscapes
                </div>
              </div>
            </div>

            <div className="hidden justify-self-center rounded-full border border-[rgba(95,73,42,.08)] bg-white/20 px-4 py-2 text-[10px] uppercase tracking-[0.24em] text-white lg:flex lg:items-center lg:gap-2">
              <span className="h-[7px] w-[7px] rounded-full bg-[#d7aa61] shadow-[0_0_18px_rgba(215,170,97,.55)]" />
              Seasonal equilibrium · Cyclical irrigation
            </div>

            <div className="flex items-center justify-end gap-3">
              <button className="h-11 rounded-full border border-[rgba(95,73,42,.08)] bg-white/20 px-5 text-[10px] uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-1 hover:bg-white/60">
                Harvest Map
              </button>
              <button className="h-11 rounded-full border border-[rgba(95,73,42,.08)] bg-white/20 px-5 text-[10px] uppercase tracking-[0.22em] text-white transition duration-300 hover:-translate-y-1 hover:bg-white/60">
                Visit Estate
              </button>
            </div>
          </div>

          <div className="scrollbar-hide flex items-center justify-start gap-7 overflow-x-auto border-t border-[rgba(95,73,42,.08)] px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white lg:justify-center lg:px-7">
            <a href="#story" className="whitespace-nowrap transition hover:text-[#ac7b3f]">
              Philosophy
            </a>
            <a href="#fields" className="whitespace-nowrap transition hover:text-[#ac7b3f]">
              Cultivation
            </a>
            <a href="#core" className="whitespace-nowrap transition hover:text-[#ac7b3f]">
              Golden Core
            </a>
            <a href="#water" className="whitespace-nowrap transition hover:text-[#ac7b3f]">
              Still Water
            </a>
            <a href="#contact" className="whitespace-nowrap transition hover:text-[#ac7b3f]">
              Contact
            </a>
          </div>
        </header>

        <main>
          <section className="relative min-h-screen overflow-hidden">
            <video
              ref={heroVideoRef}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 h-full w-full object-cover brightness-90 contrast-105 saturate-105"
              style={{ transform: "scale(1.08)" }}
            >
              <source src="/video.mp4" type="video/mp4" />
            </video>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_12%,rgba(0,0,0,.18)_72%,rgba(0,0,0,.3)_100%),linear-gradient(180deg,rgba(0,0,0,.12),rgba(0,0,0,.28))]" />

            <div className="relative z-[3] flex min-h-screen items-center justify-center px-6 pb-10 pt-32 text-center">
              <div className="max-w-[1060px] px-5">
                <h1 className="serif mt-6 text-[clamp(4.5rem,13vw,11rem)] leading-[0.82] tracking-[-.075em] text-white drop-shadow-[0_18px_36px_rgba(0,0,0,.24)]">
                  <span className="ripple block">Autumn</span>
                  <span className="ripple block">Flow</span>
                </h1>

                <p className="bloom mx-auto mt-7 max-w-[760px] rounded-[2rem] border border-white/10 bg-white/10 px-6 py-5 text-[18px] leading-[1.95] text-white/90 backdrop-blur-[30px]">
                  A regenerative landscape for sustainable estates, shaped by paper-light silence, terraced fields, and the slow pulse of water crossing the valley.
                </p>

                <div className="bloom mt-9 flex flex-wrap justify-center gap-4">
                  <button className="h-[58px] rounded-full bg-[linear-gradient(180deg,rgba(255,255,255,.94),rgba(255,255,255,.58))] px-8 text-[10px] uppercase tracking-[0.25em] text-[#33291b] shadow-[inset_0_1px_0_rgba(255,255,255,.76),0_16px_42px_rgba(0,0,0,.15)] transition duration-500 hover:-translate-y-1">
                    Explore the Flow
                  </button>
                  <button className="h-[58px] rounded-full border border-white/20 bg-white/10 px-8 text-[10px] uppercase tracking-[0.25em] text-white transition hover:bg-white/20">
                    Seasonal Overview
                  </button>
                </div>
              </div>
            </div>

            <div className="absolute left-[8%] top-[18%] rounded-full border border-white/20 bg-white/20 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur-2xl">
              Golden fields · Harvest 12
            </div>

            <div className="absolute bottom-[18%] left-[12%] rounded-full border border-white/20 bg-white/20 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur-2xl">
              Riparian restoration active
            </div>

            <div className="absolute right-[8%] top-[26%] rounded-full border border-white/20 bg-white/20 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white backdrop-blur-2xl">
              Irrigation pulse · 87%
            </div>
          </section>

          <section id="story" className="py-[120px]">
            <div className="mx-auto grid w-[min(1440px,calc(100%-48px))] gap-7 lg:grid-cols-[1.08fr_.92fr]">
              <div className="bloom relative flex min-h-[640px] flex-col justify-center overflow-hidden rounded-[42px] border border-[rgba(131,108,74,.08)] bg-[linear-gradient(180deg,rgba(255,255,255,.72),rgba(255,255,255,.28))] p-[70px] shadow-[inset_0_1px_0_rgba(255,255,255,.65),0_22px_60px_rgba(98,78,45,.08)]">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#8a7c69]">
                  Floating Mountain Split
                </div>

                <h2 className="serif mt-4 text-[clamp(2.9rem,5.6vw,6rem)] leading-[0.9] tracking-[-.06em] text-[#2a241c]">
                  Designed to breathe with the river.
                </h2>

                <p className="mt-6 max-w-[680px] text-[16px] leading-[2] text-[#62584d]">
                  The landscape follows the natural movement of the valley, layering soft mountain silhouettes, transparent field notes, and seasonal systems into a calm editorial flow.
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  <div className="rounded-full border border-[rgba(131,108,74,.08)] bg-white/50 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-[#564b3d]">
                    Seasonal equilibrium
                  </div>
                  <div className="rounded-full border border-[rgba(131,108,74,.08)] bg-white/50 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-[#564b3d]">
                    Water rhythm
                  </div>
                  <div className="rounded-full border border-[rgba(131,108,74,.08)] bg-white/50 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-[#564b3d]">
                    Zen-organic harmonics
                  </div>
                </div>
              </div>

              <div className="bloom min-h-[640px] overflow-hidden rounded-[42px] border border-[rgba(131,108,74,.08)]">
                <img
                  src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1800&auto=format&fit=crop"
                  alt="Landscape"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </section>

          <section id="fields" className="pt-0 py-[120px]">
            <div className="mx-auto w-[min(1440px,calc(100%-48px))]">
              <div className="bloom max-w-4xl">
                <div className="text-[10px] uppercase tracking-[0.3em] text-[#8a7c69]">
                  Rice Field Grid
                </div>
                <h2 className="serif mt-4 text-[clamp(2.9rem,5.6vw,6rem)] leading-[0.9] tracking-[-.06em] text-[#2a241c]">
                  Staggered layers like terraced fields.
                </h2>
              </div>

              <div className="mt-[120px] grid grid-cols-1 gap-5">
                <article className="bloom grid min-h-[300px] overflow-hidden rounded-[38px] border border-[rgba(131,108,74,.08)] bg-[linear-gradient(180deg,rgba(255,255,255,.64),rgba(255,255,255,.24))] shadow-[0_18px_50px_rgba(98,78,45,.08)] lg:grid-cols-[.8fr_1.2fr]">
                  <div className="min-h-[300px] bg-[radial-gradient(circle_at_25%_30%,rgba(215,170,97,.26),transparent_20%),radial-gradient(circle_at_70%_35%,rgba(86,120,168,.18),transparent_18%),linear-gradient(180deg,rgba(255,255,255,.18),rgba(0,0,0,.06))]" />
                  <div className="flex flex-col justify-between p-9">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#8a7c69]">
                        Golden-ratio cultivation
                      </div>
                      <h3 className="serif mt-3 text-[42px] leading-[0.95] tracking-[-.05em] text-[#2a241c]">
                        Organic planting geometry
                      </h3>
                      <p className="mt-4 max-w-[640px] text-[15px] leading-[1.9] text-[#64584b]">
                        Crop spacing and field sequencing tuned for airflow, irrigation balance, and a balanced visual cadence across the estate.
                      </p>
                    </div>
                  </div>
                </article>

                <article className="bloom grid min-h-[300px] overflow-hidden rounded-[38px] border border-[rgba(131,108,74,.08)] bg-[linear-gradient(180deg,rgba(255,255,255,.64),rgba(255,255,255,.24))] shadow-[0_18px_50px_rgba(98,78,45,.08)] lg:grid-cols-[.8fr_1.2fr]">
                  <div className="min-h-[300px] bg-[radial-gradient(circle_at_30%_25%,rgba(215,170,97,.22),transparent_18%),radial-gradient(circle_at_70%_35%,rgba(86,120,168,.18),transparent_18%),linear-gradient(180deg,rgba(255,255,255,.12),rgba(255,255,255,.03))]" />
                  <div className="flex flex-col justify-between p-9">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#8a7c69]">
                        Zen-organic harmonics
                      </div>
                      <h3 className="serif mt-3 text-[42px] leading-[0.95] tracking-[-.05em] text-[#2a241c]">
                        Rhythms of water and silence
                      </h3>
                      <p className="mt-4 max-w-[640px] text-[15px] leading-[1.9] text-[#64584b]">
                        Wind, moisture, and reflection systems create a calm sensory cadence throughout the agricultural landscape.
                      </p>
                    </div>
                  </div>
                </article>

                <article className="bloom grid min-h-[300px] overflow-hidden rounded-[38px] border border-[rgba(131,108,74,.08)] bg-[linear-gradient(180deg,rgba(255,255,255,.64),rgba(255,255,255,.24))] shadow-[0_18px_50px_rgba(98,78,45,.08)] lg:grid-cols-[.8fr_1.2fr]">
                  <div className="min-h-[300px] bg-[radial-gradient(circle_at_28%_28%,rgba(86,120,168,.18),transparent_18%),radial-gradient(circle_at_70%_30%,rgba(215,170,97,.28),transparent_20%),linear-gradient(180deg,rgba(255,255,255,.1),rgba(0,0,0,.05))]" />
                  <div className="flex flex-col justify-between p-9">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#8a7c69]">
                        Riparian restoration
                      </div>
                      <h3 className="serif mt-3 text-[42px] leading-[0.95] tracking-[-.05em] text-[#2a241c]">
                        River-edge recovery
                      </h3>
                      <p className="mt-4 max-w-[640px] text-[15px] leading-[1.9] text-[#64584b]">
                        Native vegetation and softer runoff pathways stabilize the terrain while improving biodiversity and water retention.
                      </p>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </section>

          <section id="core" className="py-[120px]">
            <div className="mx-auto grid w-[min(1440px,calc(100%-48px))] justify-items-center gap-9">
              <div className="bloom flex aspect-square w-[min(78vw,42rem)] items-center justify-center rounded-full border border-[rgba(131,108,74,.08)] bg-[radial-gradient(circle_at_center,rgba(255,255,255,.72),rgba(255,255,255,.22)_56%,rgba(255,255,255,.06)_74%,transparent_76%)] shadow-[0_0_120px_rgba(86,120,168,.08),inset_0_0_70px_rgba(255,255,255,.12)]">
                <div className="relative z-[2] w-[min(78vw,620px)] rounded-[2rem] border border-[rgba(131,108,74,.08)] bg-white/30 px-7 py-6 text-center shadow-[0_18px_40px_rgba(98,78,45,.08)]">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[#8a7c69]">
                    Golden Core
                  </div>
                  <h2 className="serif mt-4 text-[clamp(2.6rem,5vw,5.4rem)] leading-[0.92] tracking-[-.06em] text-[#2a241c]">
                    A quiet center for the entire landscape.
                  </h2>
                  <p className="mt-5 leading-[2] text-[#62584d]">
                    Cyclical irrigation, light harvest, and soil balance converge here as a single living system rather than a set of isolated assets.
                  </p>
                  <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <span className="rounded-full border border-[rgba(131,108,74,.08)] bg-white/60 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[#5e5245]">
                      Soil vitality 84%
                    </span>
                    <span className="rounded-full border border-[rgba(131,108,74,.08)] bg-white/60 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[#5e5245]">
                      Water reserve 92%
                    </span>
                    <span className="rounded-full border border-[rgba(131,108,74,.08)] bg-white/60 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[#5e5245]">
                      Harvest pulse stable
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-[120px]">
            <div className="mx-auto w-[min(1440px,calc(100%-48px))]">
              <div className="bloom mb-7 flex items-end justify-between gap-6">
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-[#8a7c69]">
                    Still Water Slider
                  </div>
                  <h2 className="serif mt-4 text-[clamp(2.7rem,5vw,5.4rem)] leading-[0.92] tracking-[-.06em] text-[#2a241c]">
                    Horizontal mission states across the valley.
                  </h2>
                </div>
                <p className="max-w-[400px] leading-[1.9] text-[#62584d]">
                  Each strip captures a different seasonal condition: irrigation, restoration, and reflective calm.
                </p>
              </div>

              <div className="bloom scrollbar-hide grid auto-cols-[minmax(78%,980px)] grid-flow-col gap-4 overflow-x-auto pb-3 snap-x snap-mandatory">
                <article className="grid min-h-[360px] snap-start overflow-hidden rounded-[38px] border border-[rgba(131,108,74,.08)] bg-[linear-gradient(180deg,rgba(255,255,255,.66),rgba(255,255,255,.26))] shadow-[0_18px_50px_rgba(98,78,45,.08)] lg:grid-cols-[.95fr_1.05fr]">
                  <div className="flex flex-col justify-between p-8">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#8a7c69]">
                        Irrigation pulse
                      </div>
                      <h3 className="serif mt-3 text-[44px] leading-[0.95] tracking-[-.05em] text-[#2a241c]">
                        Water arriving with precision.
                      </h3>
                      <p className="mt-4 max-w-[620px] leading-[1.9] text-[#64584b]">
                        The system regulates flow across terraces so each layer receives just enough hydration to remain in balance.
                      </p>
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[#2a241c]">
                      Pulse 07 · AM
                    </div>
                  </div>
                  <div className="min-h-[360px] bg-[radial-gradient(circle_at_30%_25%,rgba(215,170,97,.28),transparent_18%),radial-gradient(circle_at_70%_35%,rgba(86,120,168,.18),transparent_20%),linear-gradient(180deg,rgba(255,255,255,.12),rgba(0,0,0,.06))]" />
                </article>

                <article className="grid min-h-[360px] snap-start overflow-hidden rounded-[38px] border border-[rgba(131,108,74,.08)] bg-[linear-gradient(180deg,rgba(255,255,255,.66),rgba(255,255,255,.26))] shadow-[0_18px_50px_rgba(98,78,45,.08)] lg:grid-cols-[.95fr_1.05fr]">
                  <div className="flex flex-col justify-between p-8">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#8a7c69]">
                        Terrace memory
                      </div>
                      <h3 className="serif mt-3 text-[44px] leading-[0.95] tracking-[-.05em] text-[#2a241c]">
                        The fields hold their own geometry.
                      </h3>
                      <p className="mt-4 max-w-[620px] leading-[1.9] text-[#64584b]">
                        Elevated contours preserve both the visible rhythm of the land and the invisible logic of runoff control.
                      </p>
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[#2a241c]">
                      Contour 12 · PM
                    </div>
                  </div>
                  <div className="min-h-[360px] bg-[radial-gradient(circle_at_30%_25%,rgba(255,206,120,.26),transparent_18%),radial-gradient(circle_at_70%_38%,rgba(86,120,168,.22),transparent_18%),linear-gradient(180deg,rgba(255,255,255,.12),rgba(0,0,0,.04))]" />
                </article>

                <article className="grid min-h-[360px] snap-start overflow-hidden rounded-[38px] border border-[rgba(131,108,74,.08)] bg-[linear-gradient(180deg,rgba(255,255,255,.66),rgba(255,255,255,.26))] shadow-[0_18px_50px_rgba(98,78,45,.08)] lg:grid-cols-[.95fr_1.05fr]">
                  <div className="flex flex-col justify-between p-8">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-[#8a7c69]">
                        Seasonal reflection
                      </div>
                      <h3 className="serif mt-3 text-[44px] leading-[0.95] tracking-[-.05em] text-[#2a241c]">
                        Where the river slows into silence.
                      </h3>
                      <p className="mt-4 max-w-[620px] leading-[1.9] text-[#64584b]">
                        The final layer dissolves into water and sky, leaving the estate in a calm blue afterglow.
                      </p>
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.24em] text-[#2a241c]">
                      Reflection · Dusk
                    </div>
                  </div>
                  <div className="min-h-[360px] bg-[radial-gradient(circle_at_24%_30%,rgba(86,120,168,.24),transparent_18%),radial-gradient(circle_at_72%_40%,rgba(215,170,97,.18),transparent_18%),linear-gradient(180deg,rgba(255,255,255,.08),rgba(0,0,0,.06))]" />
                </article>
              </div>
            </div>
          </section>

          <section id="water" className="pb-[96px]">
            <div className="mx-auto w-[min(1440px,calc(100%-48px))] overflow-hidden rounded-[48px] bg-[radial-gradient(circle_at_18%_18%,rgba(255,197,114,.14),transparent_20%),linear-gradient(180deg,#3f587e_0%,#293754_100%)] text-white shadow-[0_22px_60px_rgba(20,24,34,.18)]">
              <div className="px-[84px] pb-[42px] pt-[82px] max-md:px-7 max-md:pt-12">
                <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                      Still Water
                    </div>
                    <h2 className="serif mt-4 text-[clamp(3rem,5vw,5.2rem)] leading-[0.9] tracking-[-.06em]">
                      Where the river ends, the system quiets.
                    </h2>
                    <p className="mt-5 max-w-[720px] leading-[2] text-white/76">
                      The final zone settles into a deep blue reflection, holding the entire landscape in a soft, suspended calm.
                    </p>
                  </div>

                  <div className="grid gap-4">
                    <div className="rounded-[28px] border border-white/12 bg-white/10 p-7 backdrop-blur-[18px]">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                        Water reserve
                      </div>
                      <div className="serif mt-2 text-[42px] leading-none">84%</div>
                    </div>
                    <div className="rounded-[28px] border border-white/12 bg-white/10 p-7 backdrop-blur-[18px]">
                      <div className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                        Soil vitality
                      </div>
                      <div className="serif mt-2 text-[42px] leading-none">High</div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 flex flex-wrap items-center justify-between gap-5 border-t border-white/12 pt-7 text-[14px] text-white/68 max-md:mt-10">
                  <div>Autumn Flow · Regenerative Landscapes</div>
                  <div className="flex gap-5 text-[10px] uppercase tracking-[0.24em]">
                    <span>Harvest</span>
                    <span>Water</span>
                    <span>Equilibrium</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="contact" className="pt-0 pb-[120px]">
            <div className="mx-auto w-[min(1440px,calc(100%-48px))]">
              <div className="paper-panel rounded-[44px] p-6 md:p-8">
                <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr] lg:items-end">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.3em] text-[#8a7c69]">
                      Contact
                    </div>
                    <h2 className="serif mt-4 text-[clamp(2.9rem,5.6vw,6rem)] leading-[0.9] tracking-[-.06em] text-[#2a241c]">
                      Plan a seasonal visit.
                    </h2>
                    <p className="mt-6 max-w-[680px] text-[16px] leading-[2] text-[#62584d]">
                      Private walks, regenerative estate design, and irrigation planning for sustainable landscapes.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="paper-panel flex items-center gap-3 rounded-full px-4 py-3">
                      <Icon icon="ph:envelope-simple" className="text-xl text-[#84725d]" />
                      <input
                        type="email"
                        placeholder="Email address"
                        className="min-w-0 flex-1 bg-transparent text-[#2d261f] outline-none placeholder:text-[#7f7366]"
                      />
                    </div>

                    <button
                      ref={ctaButtonRef}
                      className="silk w-full rounded-full px-5 py-4 text-sm text-[#2f261a]"
                    >
                      Request a walkthrough
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </>
  )
}