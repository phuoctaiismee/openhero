"use client"

import { useEffect, useRef, useState } from "react"
import { Icon } from "@iconify/react"

const manifestoLines = [
  "Nocturnal code cycles are a craft, not a constraint.",
  "Atmospheric deployment should feel like turning on a lantern in a quiet room.",
  "Artisanal digital architecture rewards patience, material contrast, and sharp editorial focus.",
  "Low-latency tranquility keeps interfaces calm even when systems move fast.",
  "Twilight-logic engineering balances warmth, speed, and precision.",
]

const projectCards = [
  {
    tag: "Digital Architecture",
    title: "Midnight journal for a quiet luxury brand.",
    description:
      "Typography-led landing pages that feel hand-assembled, with precise rhythm and velvet-toned transitions.",
    wide: true,
    tall: true,
  },
  {
    tag: "Creator Studio",
    title: "Editorial toolkits for founders.",
    description:
      "Systems for storytelling, product launches, and ambient portfolio pages with nocturnal restraint.",
  },
  {
    tag: "Luxury Commerce",
    title: "High-trust boutique storefronts.",
    description:
      "Warm, tactile shopping experiences that balance focus, softness, and conversion clarity.",
  },
  {
    tag: "Atmospheric System",
    title: "Dark-mode design infrastructure for modern teams.",
    description:
      "Reusable motion, layout, and content primitives built to feel cohesive under late-night creative pressure.",
    wide: true,
  },
  {
    tag: "Motion Language",
    title: "Soft flicker, branch sway, and lantern glow.",
    description: "A motion layer that behaves like a city at dusk, not a dashboard at noon.",
  },
  {
    tag: "Product Strategy",
    title: "Quiet systems for sharp operators.",
    description:
      "Strategic landing experiences that turn complex services into warm, navigable spaces.",
  },
]

export default function Page() {
  const heroVideoRef = useRef<HTMLVideoElement | null>(null)
  const manifestoRef = useRef<HTMLPreElement | null>(null)
  const [manifestoText, setManifestoText] = useState("")
  const [revealReady, setRevealReady] = useState(false)

  useEffect(() => {
    document.documentElement.classList.add("dark")
  }, [])

  useEffect(() => {
    let cancelled = false
    let lineIndex = 0
    let charIndex = 0
    let completedText = ""

    const tick = () => {
      if (cancelled) return

      if (lineIndex >= manifestoLines.length) return

      const currentLine = manifestoLines[lineIndex]
      const currentProgress = currentLine.slice(0, charIndex + 1)
      setManifestoText(`${completedText}${lineIndex > 0 ? "\n\n" : ""}${currentProgress}`)

      charIndex += 1

      if (charIndex < currentLine.length) {
        window.setTimeout(tick, 25)
      } else {
        completedText += `${lineIndex > 0 ? "\n\n" : ""}${currentLine}`
        lineIndex += 1
        charIndex = 0
        window.setTimeout(tick, 800)
      }
    }

    tick()

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const heroVideo = heroVideoRef.current
    if (!heroVideo) return

    let ticking = false

    const updateHero = () => {
      const progress = Math.min(window.scrollY / (window.innerHeight * 1.15), 1)
      const scale = 1.07 + progress * 0.1
      const translate = progress * 14
      heroVideo.style.transform = `scale(${scale}) translateY(${translate}px)`
    }

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateHero()
          ticking = false
        })
        ticking = true
      }
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
      { threshold: 0.16 }
    )

    const nodes = document.querySelectorAll<HTMLElement>(".reveal")

    nodes.forEach((node) => {
      observer.observe(node)
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-[#0b0e12] text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[10%] top-[12%] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(255,180,102,.18),transparent_70%)] blur-3xl" />
        <div className="absolute right-[6%] bottom-[10%] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(62,145,139,.12),transparent_70%)] blur-3xl" />
      </div>

      <section className="hero relative min-h-[100svh] overflow-hidden bg-[linear-gradient(180deg,rgba(255,153,84,.3)_0%,rgba(18,21,28,.86)_52%,rgba(11,14,18,.95)_100%)]">
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="hero-video absolute inset-0 h-full w-full object-cover"
        >
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,189,98,.14),transparent_18%),radial-gradient(circle_at_center,rgba(0,0,0,.15),rgba(0,0,0,.22)_55%,rgba(0,0,0,.38)_100%)]" />

        <div className="relative z-10 flex min-h-[100svh] items-center justify-center px-6 pb-10 pt-[110px] text-center">
          <div className="max-w-[980px] rounded-[2.2rem] px-3 py-7 sm:px-8 sm:py-8">
            <div className="reveal inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/8 px-4 py-3 text-[10px] uppercase tracking-[0.3em] text-white/80 shadow-[0_8px_8px_rgba(0,0,0,1)] backdrop-blur-[20px]">
              <span className="h-2 w-2 rounded-full bg-[#f0c06b] shadow-[0_0_18px_rgba(255,193,103,.55)]" />
              Nocturnal code cycles · atmospheric deployment
            </div>

            <h1 className="reveal mt-6 text-[clamp(3.4rem,10vw,9.2rem)] font-serif leading-[.82] tracking-[-.09em] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)]">
              Aether House
            </h1>

            <p className="reveal mx-auto mt-6 max-w-[760px] pb-24 text-[15px] leading-[1.95] text-white/84 sm:text-[18px]">
              Crafting the nocturnal web through artisanal digital architecture, low-latency tranquility, and twilight-logic engineering.
            </p>

            <div className="reveal flex flex-wrap justify-center gap-3">
              <button className="group inline-flex h-14 items-center gap-3 rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(20,22,24,.94),rgba(11,13,16,.9))] px-7 text-[11px] uppercase tracking-[0.26em] text-white shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_18px_60px_rgba(0,0,0,.28)] transition-transform duration-300 hover:-translate-y-1">
                <Icon icon="mdi:launch" className="text-xl text-[#f0c06b]" />
                Open the Studio
              </button>

              <button className="inline-flex h-14 items-center gap-3 rounded-full border border-white/10 bg-white/8 px-7 text-[11px] uppercase tracking-[0.26em] text-white/80 backdrop-blur-[20px] transition-transform duration-300 hover:-translate-y-1 hover:bg-white/12">
                <Icon icon="mdi:file-document-outline" className="text-xl text-white/80" />
                View Manifesto
              </button>
            </div>

            <div className="reveal mt-6 flex flex-wrap justify-center gap-2">
              {["Teal Wood", "Amber Glow", "Twilight Blue"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full border border-white/10 bg-white/9 px-3 py-2 text-[10px] uppercase tracking-[0.2em] text-white/90 shadow-[0_2px_4px_rgba(0,0,0,0.9)]"
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-0 py-[92px] sm:py-[124px]">
        <div className="mx-auto w-[min(1600px,calc(100%-32px))]">
          <div className="reveal mb-8 flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50">
                The Code Window
              </div>
              <h2 className="mt-5 text-[clamp(3rem,6vw,6.2rem)] font-serif leading-[.9] tracking-[-.07em] text-white">
                A manifesto written in real time.
              </h2>
            </div>
            <p className="max-w-[470px] leading-[1.9] text-white/70">
              The studio’s principles appear as a live terminal, floating inside a rounded liquid window with warm glass edges and lantern-like glow.
            </p>
          </div>

          <div className="reveal mx-auto w-full overflow-hidden rounded-[2.6rem] border border-white/8 bg-[linear-gradient(180deg,rgba(22,38,40,.9),rgba(10,16,18,.92))] shadow-[0_26px_80px_rgba(0,0,0,.38)]">
            <div className="flex items-center justify-between gap-4 border-b border-white/8 bg-white/[0.03] px-5 py-[18px]">
              <div className="flex gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-white/16" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/16" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/16" />
              </div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                Nocturnal logic console
              </div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                LIVE
              </div>
            </div>

            <div className="grid gap-7 p-6 md:grid-cols-[1fr_.72fr] md:p-8">
              <div className="relative min-h-[320px] overflow-hidden rounded-[2rem] border border-white/8 bg-white/[0.04] p-6">
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.04),transparent_24%),repeating-linear-gradient(180deg,rgba(255,255,255,.04)_0_1px,transparent_1px_28px)] opacity-25" />
                <div className="relative z-10 mb-4 text-[10px] uppercase tracking-[0.28em] text-white/58">
                  Manifesto
                </div>
                <pre
                  ref={manifestoRef}
                  className="relative z-10 whitespace-pre-wrap break-words font-mono text-[12px] leading-[1.9] text-white/80"
                >
                  {manifestoText}
                </pre>
                <span className="relative z-10 inline-block h-[1.2em] w-px align-[-3px] bg-[#ffcd7f] animate-pulse" />
              </div>

              <div className="flex flex-col gap-4">
                <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.05] p-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/58">
                    Deployment rhythm
                  </div>
                  <div className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-serif leading-none tracking-[-.06em] text-white">
                    24/7
                  </div>
                  <div className="mt-3 text-sm leading-8 text-white/72">
                    Atmospheric releases, quiet handoffs, and calm production cycles.
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.05] p-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/58">
                    Latency posture
                  </div>
                  <div className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-serif leading-none tracking-[-.06em] text-white">
                    Low
                  </div>
                  <div className="mt-3 text-sm leading-8 text-white/72">
                    Interfaces tuned for speed without abandoning warmth or editorial focus.
                  </div>
                </div>

                <div className="rounded-[1.8rem] border border-white/8 bg-white/[0.05] p-5">
                  <div className="text-[10px] uppercase tracking-[0.28em] text-white/58">
                    Creative signal
                  </div>
                  <div className="mt-3 text-[clamp(2rem,4vw,3.4rem)] font-serif leading-none tracking-[-.06em] text-white">
                    High
                  </div>
                  <div className="mt-3 text-sm leading-8 text-white/72">
                    A craft-first studio for creators, founders, and digital builders.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_10%_0%,rgba(255,179,109,.12),transparent_16%),linear-gradient(180deg,rgba(26,35,42,.92),rgba(11,14,18,1))] px-0 py-[92px] sm:py-[124px]">
        <div className="mx-auto w-[min(1600px,calc(100%-32px))]">
          <div className="reveal mb-8 flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50">
                City-Lights Grid
              </div>
              <h2 className="mt-5 text-[clamp(3rem,6vw,6.2rem)] font-serif leading-[.9] tracking-[-.07em] text-white">
                Projects that light up only when they are approached.
              </h2>
            </div>
            <p className="max-w-[470px] leading-[1.9] text-white/70">
              Hover to reveal each project as a lit apartment window in the city below. Every tile carries a different atmosphere, tone, and craft note.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
            {projectCards.map((project, index) => (
              <article
                key={`${project.tag}-${index}`}
                className={[
                  "project reveal group relative min-h-[240px] overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,.05),rgba(255,255,255,.02))] shadow-[0_18px_50px_rgba(0,0,0,.24)] transition-all duration-500",
                  project.wide ? "lg:col-span-8" : "lg:col-span-4",
                  project.tall ? "lg:min-h-[320px]" : "",
                  revealReady ? "opacity-100" : "opacity-0",
                ].join(" ")}
                style={{
                  transform: revealReady ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,.05),transparent_32%),radial-gradient(circle_at_70%_28%,rgba(255,197,113,.12),transparent_18%)]" />
                <div className="absolute inset-auto -right-12 -bottom-12 h-60 w-60 rounded-full bg-[radial-gradient(circle,rgba(255,164,72,.18),transparent_68%)] blur-[20px]" />
                <div className="relative z-10 flex h-full flex-col justify-between p-6">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-white/62">
                      {project.tag}
                    </div>
                    <h3 className="mt-4 max-w-xl text-[clamp(1.8rem,3vw,3rem)] font-serif leading-[.95] tracking-[-.05em] text-white">
                      {project.title}
                    </h3>
                    <p className="mt-3 max-w-[36ch] leading-[1.9] text-white/72">
                      {project.description}
                    </p>
                  </div>
                  <div className="translate-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-[#ffcd7f] opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                    Open window
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-0 py-[92px] sm:py-[124px]">
        <div className="mx-auto w-[min(1600px,calc(100%-32px))]">
          <div className="reveal mb-8 flex flex-col items-start justify-between gap-5 lg:flex-row lg:items-end">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/50">
                Sunset-to-Night Transition
              </div>
              <h2 className="mt-5 text-[clamp(3rem,6vw,6.2rem)] font-serif leading-[.9] tracking-[-.07em] text-white">
                A background that deepens as the page descends.
              </h2>
            </div>
            <p className="max-w-[470px] leading-[1.9] text-white/70">
              Warm sunset notes drift into indigo as the page moves downward, keeping the interface human, soft, and focused.
            </p>
          </div>

          <div className="grid gap-8 xl:grid-cols-[1.1fr_.9fr]">
            <div className="reveal rounded-[2.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(20,36,38,.88),rgba(12,21,24,.78)),linear-gradient(135deg,rgba(255,185,102,.08),transparent_38%)] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_26px_80px_rgba(0,0,0,.34)] backdrop-blur-[24px] xl:p-10">
              <div className="text-[10px] uppercase tracking-[0.34em] text-white/50">
                Branch-level deployment
              </div>
              <h3 className="mt-6 max-w-4xl text-[clamp(2.4rem,5vw,4.8rem)] font-serif leading-[.92] tracking-[-.06em] text-white">
                The studio’s operating rhythm is built for quiet focus.
              </h3>
              <p className="mt-6 max-w-2xl leading-8 text-white/72">
                Aether House combines nocturnal code cycles, slow atmospheric motion, and warm digital surfaces to create a premium environment for creators.
              </p>
            </div>

            <div className="reveal rounded-[2.2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(20,36,38,.88),rgba(12,21,24,.78)),linear-gradient(135deg,rgba(255,185,102,.08),transparent_38%)] p-8 shadow-[inset_0_1px_0_rgba(255,255,255,.06),0_26px_80px_rgba(0,0,0,.34)] backdrop-blur-[24px] xl:p-10">
              <div className="text-[10px] uppercase tracking-[0.34em] text-white/50">
                Low-latency tranquility
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                  <span className="text-white/74">Strategy</span>
                  <span className="text-[10px] uppercase tracking-[0.26em] text-white/55">
                    Editorial systems
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/8 pb-4">
                  <span className="text-white/74">Motion</span>
                  <span className="text-[10px] uppercase tracking-[0.26em] text-white/55">
                    120fps feel
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/74">Tone</span>
                  <span className="text-[10px] uppercase tracking-[0.26em] text-white/55">
                    Warm, nocturnal
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-[radial-gradient(circle_at_20%_12%,rgba(255,171,89,.1),transparent_16%),linear-gradient(180deg,rgba(7,10,14,1),rgba(11,13,16,1))] px-0 pb-[72px] pt-[92px] sm:pb-[94px] sm:pt-[120px]">
        <div className="relative mx-auto w-[min(1600px,calc(100%-32px))] overflow-hidden border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,.03),rgba(255,255,255,.015))] p-9 shadow-[0_24px_80px_rgba(0,0,0,.34)]">
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[120px] opacity-50 [clip-path:polygon(0_100%,6%_72%,14%_80%,20%_54%,28%_70%,35%_46%,42%_58%,50%_38%,60%_64%,70%_44%,79%_62%,88%_50%,96%_70%,100%_100%)] bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,.04)_100%),linear-gradient(90deg,transparent_0_8%,rgba(255,255,255,.08)_8%_8.6%,transparent_8.6%_15%,rgba(255,255,255,.08)_15%_15.4%,transparent_15.4%_24%,rgba(255,255,255,.08)_24%_24.6%,transparent_24.6%_100%)]" />

          <div className="relative z-10 grid gap-8 xl:grid-cols-[1.15fr_.85fr] xl:items-end">
            <div>
              <div className="text-[10px] uppercase tracking-[0.35em] text-white/40">
                The Rooftop Footer
              </div>
              <h2 className="mt-5 text-[clamp(3rem,6vw,6.2rem)] font-serif leading-[.9] tracking-[-.07em] text-white">
                A panoramic city edge for star-mapped navigation.
              </h2>
              <p className="mt-4 max-w-[760px] leading-[1.95] text-white/68">
                The final view opens wide, like a rooftop above the city, with a minimalist list of links suspended under the night sky.
              </p>
            </div>

            <div className="flex flex-wrap justify-start gap-3 xl:justify-end">
              {[
                { label: "Studio", icon: "mdi:home-city-outline" },
                { label: "Services", icon: "mdi:briefcase-outline" },
                { label: "Projects", icon: "mdi:view-grid-outline" },
                { label: "Contact", icon: "mdi:email-outline" },
              ].map((item) => (
                <a
                  key={item.label}
                  href="#"
                  className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/5 px-4 py-3 text-[10px] uppercase tracking-[0.22em] text-white/72 transition-colors duration-300 hover:bg-white/9 hover:text-white"
                >
                  <Icon icon={item.icon} className="text-lg" />
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          <div className="relative z-10 mt-9 flex flex-wrap justify-between gap-3 border-t border-white/8 pt-6 text-[12px] uppercase tracking-[0.22em] text-white/52">
            <div>Aether House</div>
            <div>Amber Gold · Teal Wood · Twilight Blue</div>
            <div>Crafting the nocturnal web</div>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        :root {
          color-scheme: dark;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 50% 0%, rgba(255, 154, 90, 0.26), transparent 24%),
            radial-gradient(circle at 20% 14%, rgba(61, 145, 142, 0.16), transparent 20%),
            linear-gradient(180deg, oklch(18% 0.05 28) 0%, oklch(15% 0.04 220) 42%, oklch(13% 0.04 240) 100%);
        }

        body::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px);
          background-size: 104px 104px;
          opacity: 0.18;
          -webkit-mask-image: radial-gradient(circle at center, black 35%, transparent 88%);
          mask-image: radial-gradient(circle at center, black 35%, transparent 88%);
          z-index: -2;
        }

        .font-serif {
          font-family: "Cormorant Garamond", serif;
        }

        .reveal {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.8s ease, transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.in {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-video {
          will-change: transform;
          -webkit-mask-image: radial-gradient(circle at center, black 0 52%, rgba(0, 0, 0, 0.92) 64%, rgba(0, 0, 0, 0.62) 78%, transparent 94%);
          mask-image: radial-gradient(circle at center, black 0 52%, rgba(0, 0, 0, 0.92) 64%, rgba(0, 0, 0, 0.62) 78%, transparent 94%);
        }

        @keyframes blink {
          50% {
            opacity: 0;
          }
        }

        .animate-pulse {
          animation: blink 1s steps(2, end) infinite;
        }
      `}</style>
    </main>
  )
}