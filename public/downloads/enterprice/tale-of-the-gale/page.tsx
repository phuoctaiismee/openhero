"use client";

import { Icon } from "@iconify/react";
import { useEffect, useMemo, useRef, useState } from "react";

type TabId = "wind-stance" | "water-stance" | "sun-stance";

export default function Page() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>("wind-stance");
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const revealRefs = useRef<Array<HTMLElement | null>>([]);

  const leaves = useMemo(() => {
    return Array.from({ length: 40 }, (_, i) => {
      const size = 10 + ((i * 7) % 16);
      const left = (i * 13.7) % 100;
      const bottom = (i * 9.2) % 100;
      const duration = 5 + (i % 7) * 0.7;
      const delay = -(i % 10) * 1.3;
      const rot = (i * 37) % 360;
      return { size, left, bottom, duration, delay, rot, i };
    });
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 80);
      const progress = Math.min(Math.max(y / window.innerHeight, 0), 1);
      if (videoRef.current) {
        videoRef.current.style.transform = `scale(${1.02 + progress * 0.12}) translateY(${progress * 50}px)`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setRevealed((prev) => {
          const next = new Set(prev);
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute("data-reveal-id");
              if (id) next.add(id);
              observer.unobserve(entry.target);
            }
          });
          return next;
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const setRevealRef = (el: HTMLElement | null, index: number) => {
    revealRefs.current[index] = el;
  };

  const revealClass = (id: string) => (revealed.has(id) ? "scroll-reveal active" : "scroll-reveal");

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#030708] text-slate-100 antialiased">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Marcellus&family=Montserrat:wght@300;400;500;600;700&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          background-color: #030708;
          color: #f1f5f9;
          font-family: "Montserrat", sans-serif;
        }

        .font-decorative {
          font-family: "Cinzel Decorative", serif;
        }

        .font-marcellus {
          font-family: "Marcellus", serif;
        }

        .font-montserrat {
          font-family: "Montserrat", sans-serif;
        }

        .gale-overlay {
          background: linear-gradient(180deg, rgba(3, 7, 8, 0.3) 0%, rgba(3, 7, 8, 0.7) 70%, #030708 100%);
        }

        .sun-bloom {
          background: radial-gradient(circle at 80% 20%, rgba(251, 191, 36, 0.15) 0%, rgba(2, 132, 199, 0.08) 35%, transparent 70%);
        }

        .scroll-reveal {
          opacity: 0;
          transform: scale(0.97) translateY(30px);
          transition: all 1.4s cubic-bezier(0.19, 1, 0.22, 1);
        }

        .scroll-reveal.active {
          opacity: 1;
          transform: scale(1) translateY(0);
        }

        .leaf-vortex {
          position: absolute;
          pointer-events: none;
          opacity: 0;
          will-change: transform, opacity;
        }

        @keyframes swirl {
          0% {
            transform: translate(0, 0) rotate(0deg) scale(0.4);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          85% {
            opacity: 0.7;
          }
          100% {
            transform: translate(-50vw, -80vh) rotate(-1080deg) scale(1.5);
            opacity: 0;
          }
        }

        .clan-border {
          border: 1px solid rgba(74, 222, 128, 0.1);
          background: linear-gradient(135deg, rgba(11, 19, 22, 0.6) 0%, rgba(3, 7, 8, 0.8) 100%);
        }

        .clan-border:hover {
          border-color: rgba(251, 191, 36, 0.3);
          box-shadow: 0 0 40px rgba(74, 222, 128, 0.03);
        }

        .tab-btn.active {
          color: #fbbf24;
          border-color: #fbbf24;
          background: rgba(251, 191, 36, 0.05);
        }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 sun-bloom" />
        <div className="absolute inset-0 z-10">
          {leaves.map((leaf) => (
            <div
              key={leaf.i}
              className="leaf-vortex"
              style={{
                width: `${leaf.size}px`,
                height: `${leaf.size * 0.62}px`,
                left: `${leaf.left}vw`,
                bottom: `${leaf.bottom}vh`,
                backgroundColor: "#4ade80",
                borderRadius: "80% 0 80% 0",
                boxShadow: "0 0 12px rgba(74, 222, 128, 0.4)",
                transform: `rotate(${leaf.rot}deg)`,
                animation: `swirl ${leaf.duration}s linear ${leaf.delay}s infinite`,
              }}
            />
          ))}
        </div>
      </div>

      <nav
        className={[
          "fixed left-0 top-0 z-50 flex h-24 w-full items-center border-b transition-all duration-700",
          scrolled ? "h-20 border-white/5 bg-[#030708]/90 backdrop-blur-xl" : "border-white/0 bg-transparent",
        ].join(" ")}
      >
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 md:px-12">
          <a href="#" className="group flex items-center gap-3 text-xl tracking-[0.2em] text-white font-decorative">
            <Icon icon="ri:compass-discover-line" className="text-2xl text-emerald-400 transition-transform duration-1000 group-hover:rotate-180" />
            SUSHIMA
          </a>

          <div className="hidden items-center gap-10 text-sm uppercase tracking-[0.3em] text-white/60 lg:flex font-marcellus">
            <a href="#chronicles" className="transition-colors hover:text-amber-400">
              Chronicles
            </a>
            <a href="#stances" className="transition-colors hover:text-amber-400">
              Stances
            </a>
            <a href="#landscapes" className="transition-colors hover:text-amber-400">
              Landscapes
            </a>
            <a href="#armory" className="transition-colors hover:text-amber-400">
              Armory
            </a>
          </div>

          <button className="relative overflow-hidden rounded-none border border-emerald-400/30 px-6 py-3 text-xs uppercase tracking-[0.2em] font-marcellus">
            <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-amber-400 opacity-0 transition-opacity duration-500 group-hover:opacity-20" />
            Enter Sanctuary
          </button>
        </div>
      </nav>

      <header className="relative flex min-h-screen items-end justify-center overflow-hidden pb-24 md:pb-32">
        <div className="absolute inset-0 z-0">
          <video ref={videoRef} autoPlay loop muted playsInline className="h-full w-full object-cover">
            <source src="/video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 gale-overlay" />
        </div>

        <div className="relative z-10 mx-auto grid w-full max-w-7xl items-end gap-12 px-6 md:px-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-9">
            <h1 className="text-4xl font-normal uppercase leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-7xl font-marcellus">
              Where the storm <br />
              <span className="bg-gradient-to-r from-emerald-400 via-amber-400 to-sky-500 bg-clip-text text-transparent font-decorative">
                Meets the blade.
              </span>
            </h1>

            <p className="max-w-xl text-sm font-light leading-relaxed text-white/70 sm:text-base font-montserrat">
              Embrace the quiet fury of nature. Stand upon the precipice of legend, where swirling verdant leaves carry the ancient whispers of guardians past.
            </p>
          </div>

          <div className="flex lg:col-span-3 lg:justify-end">
            <a
              href="#chronicles"
              className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 text-xl text-white transition-all duration-500 hover:border-amber-400 hover:text-amber-400 animate-bounce"
            >
              <Icon icon="ph:arrow-down-light" />
            </a>
          </div>
        </div>
      </header>

      <main className="relative z-10 bg-[#030708]">
        <section id="chronicles" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
          <div className="grid items-center gap-16 lg:grid-cols-12">
            <div
              ref={(el) => setRevealRef(el, 0)}
              data-reveal-id="chronicles-left"
              className={`${revealClass("chronicles-left")} space-y-6 lg:col-span-5`}
            >
              <span className="block text-xs uppercase tracking-[0.4em] text-emerald-400 font-marcellus">
                Ancient Pathways
              </span>
              <h2 className="text-4xl uppercase leading-tight tracking-tight text-white sm:text-5xl font-marcellus">
                The world breathes in perfect <span className="italic text-amber-400">harmony</span>.
              </h2>
              <p className="text-sm leading-relaxed text-white/60 font-light sm:text-base">
                To walk the path of the gale is to realize that the sword is not merely a weapon of steel, but an extension of the wind. Every rustle of the forest and every ripple across the summit lake dictates the rhythm of the warrior&apos;s soul.
              </p>
              <div className="pt-4">
                <div className="flex items-center gap-6 border-l-2 border-emerald-400 pl-6">
                  <p className="text-sm italic font-medium text-white/90">
                    &quot;The wind does not break the tree that bends. It sweeps away the shadow of doubt.&quot;
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
              {[
                {
                  key: "gale",
                  icon: "ph:wind-bold",
                  bg: "bg-emerald-400/10",
                  color: "text-emerald-400",
                  title: "Gale Ascension",
                  body: "Harness dynamic atmospheric pressure to elevate agility and outpace opponents through shifting wind streams.",
                },
                {
                  key: "mirror",
                  icon: "ph:waves-bold",
                  bg: "bg-sky-400/10",
                  color: "text-sky-400",
                  title: "Mirror Reflection",
                  body: "Attune inner focus to the pristine tranquility of alpine lake surfaces, neutralizing aggressive stances instantly.",
                },
                {
                  key: "sun",
                  icon: "ph:sun-dim-bold",
                  bg: "bg-amber-400/10",
                  color: "text-amber-400",
                  title: "Solar Radiance",
                  body: "Strike precisely when gold light pierces cloud barriers, weaponizing blinding horizons to secure strategic dominance.",
                },
                {
                  key: "stone",
                  icon: "ph:mountains-bold",
                  bg: "bg-white/5",
                  color: "text-white/80",
                  title: "Stone Endurance",
                  body: "Ground all focus deep into ancient tectonic roots, maintaining absolute defensive balance against violent assaults.",
                },
              ].map((item, index) => (
                <div
                  key={item.key}
                  ref={(el) => setRevealRef(el, index + 1)}
                  data-reveal-id={item.key}
                  className={`${revealClass(item.key)} clan-border space-y-4 p-8`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className={`flex h-12 w-12 items-center justify-center text-2xl ${item.bg} ${item.color}`}>
                    <Icon icon={item.icon} />
                  </div>
                  <h3 className="text-xl uppercase tracking-wider text-white font-marcellus">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-white/50 font-light">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="stances" className="border-y border-white/5 bg-[#0b1316]/40 py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-12">
            <div
              ref={(el) => setRevealRef(el, 5)}
              data-reveal-id="stances-title"
              className={`${revealClass("stances-title")} mx-auto mb-16 max-w-2xl text-center`}
            >
              <span className="mb-3 block text-xs uppercase tracking-[0.4em] text-amber-400 font-marcellus">
                Martial Philosophy
              </span>
              <h2 className="text-3xl uppercase tracking-tight text-white sm:text-5xl font-marcellus">
                Stances of the Elements
              </h2>
            </div>

            <div className={`${revealClass("stances-tabs")} mx-auto mb-12 flex max-w-md justify-center border-b border-white/10`}>
              {[
                { id: "wind-stance", label: "Wind" },
                { id: "water-stance", label: "Water" },
                { id: "sun-stance", label: "Sun" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={`tab-btn flex-1 border-b-2 border-transparent pb-4 text-xs uppercase tracking-widest text-white/40 font-marcellus ${activeTab === tab.id ? "active" : ""}`}
                  onClick={() => setActiveTab(tab.id as TabId)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="mx-auto max-w-5xl">
              {activeTab === "wind-stance" && (
                <div className="grid items-center gap-12 md:grid-cols-2">
                  <div className="space-y-6">
                    <h3 className="text-3xl uppercase text-white font-marcellus">The Zephyr Flow</h3>
                    <p className="text-sm leading-relaxed text-white/60 font-light">
                      A highly dynamic stance dedicated to deflecting incoming projectiles and piercing armored defenses. By synchronizing bodily movement with low-altitude wind drafts, the warrior flows effortlessly around threats, leaving glowing green leaf trails behind each rapid stride.
                    </p>
                    <ul className="space-y-3 text-xs text-white/80 font-montserrat">
                      <li className="flex items-center gap-3">
                        <Icon icon="ph:check-circle" className="text-lg text-emerald-400" />
                        Increased evasion against long-range kinetic weaponry
                      </li>
                      <li className="flex items-center gap-3">
                        <Icon icon="ph:check-circle" className="text-lg text-emerald-400" />
                        Seamless counter-attacks initiated straight from side-steps
                      </li>
                    </ul>
                  </div>
                  <div className="h-80 border border-white/10 bg-[url('https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 grayscale contrast-125" />
                </div>
              )}

              {activeTab === "water-stance" && (
                <div className="grid items-center gap-12 md:grid-cols-2">
                  <div className="space-y-6">
                    <h3 className="text-3xl uppercase text-white font-marcellus">The Torrent Surge</h3>
                    <p className="text-sm leading-relaxed text-white/60 font-light">
                      Fluid and relentless. Designed specifically to shatter the defensive shields of heavy combatants. Like water channeling down alpine valleys, this stance builds crushing forward momentum that cannot be blocked.
                    </p>
                    <ul className="space-y-3 text-xs text-white/80 font-montserrat">
                      <li className="flex items-center gap-3">
                        <Icon icon="ph:check-circle" className="text-lg text-sky-400" />
                        Heavy shield-breaking strike sequences
                      </li>
                      <li className="flex items-center gap-3">
                        <Icon icon="ph:check-circle" className="text-lg text-sky-400" />
                        Multi-target continuous fluid strikes
                      </li>
                    </ul>
                  </div>
                  <div className="h-80 border border-white/10 bg-[url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 grayscale contrast-125" />
                </div>
              )}

              {activeTab === "sun-stance" && (
                <div className="grid items-center gap-12 md:grid-cols-2">
                  <div className="space-y-6">
                    <h3 className="text-3xl uppercase text-white font-marcellus">The Solstice Flare</h3>
                    <p className="text-sm leading-relaxed text-white/60 font-light">
                      Uncompromising precision. Executed when the light angles flawlessly over the mountain horizon. It capitalizes on structural vulnerabilities, trading heavy movement for instantaneous lethal counters.
                    </p>
                    <ul className="space-y-3 text-xs text-white/80 font-montserrat">
                      <li className="flex items-center gap-3">
                        <Icon icon="ph:check-circle" className="text-lg text-amber-400" />
                        Critical strike multipliers against staggered foes
                      </li>
                      <li className="flex items-center gap-3">
                        <Icon icon="ph:check-circle" className="text-lg text-amber-400" />
                        Blinding aura generation upon successful parries
                      </li>
                    </ul>
                  </div>
                  <div className="h-80 border border-white/10 bg-[url('https://images.unsplash.com/photo-1470252649358-9646cbe843e7?auto=format&fit=crop&q=80&w=1200')] bg-cover bg-center opacity-40 grayscale contrast-125" />
                </div>
              )}
            </div>
          </div>
        </section>

        <section id="landscapes" className="mx-auto max-w-7xl px-6 py-32 md:px-12">
          <div
            ref={(el) => setRevealRef(el, 6)}
            data-reveal-id="landscapes-header"
            className={`${revealClass("landscapes-header")} mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end`}
          >
            <div>
              <span className="mb-3 block text-xs uppercase tracking-[0.4em] text-emerald-400 font-marcellus">
                Boundless Refuge
              </span>
              <h2 className="text-4xl uppercase tracking-tight text-white sm:text-5xl font-marcellus">
                The Sacrificial Vistas
              </h2>
            </div>
            <p className="max-w-xs text-sm font-light text-white/40">
              Witness the geographic realms where the elements congregate to test the limits of ancient steel.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                key: "azure",
                tag: "The Lower Basin",
                title: "The Azure Veil",
                body: "A mirrors-edge lake suspended thousands of feet high, capturing mountain reflections and cooling heavy winds instantly.",
                image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=1200",
                color: "text-sky-400",
              },
              {
                key: "crest",
                tag: "The Highest Peak",
                title: "Crest of Solitude",
                body: "Where sunlight punctures dense cloud mass, blinding uninvited guests and offering pristine clarity to master ronins.",
                image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
                color: "text-amber-400",
              },
              {
                key: "verdant",
                tag: "The Ancient Woods",
                title: "Verdant Vortex",
                body: "Deep foliage zones dominated by high-speed swirling currents, detaching thousands of emerald leaves simultaneously.",
                image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&q=80&w=1200",
                color: "text-emerald-400",
              },
            ].map((item, index) => (
              <div
                key={item.key}
                ref={(el) => setRevealRef(el, 7 + index)}
                data-reveal-id={item.key}
                className={`${revealClass(item.key)} group relative flex h-[450px] items-end overflow-hidden border border-white/5 bg-[#0b1316] p-8`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center opacity-30 transition-all duration-700 group-hover:scale-105 group-hover:opacity-50 mix-blend-luminosity"
                  style={{ backgroundImage: `url(${item.image})` }}
                />
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#030708] via-[#030708]/40 to-transparent" />
                <div className="relative z-20 space-y-3">
                  <span className={`block text-[10px] uppercase tracking-[0.3em] font-marcellus ${item.color}`}>
                    {item.tag}
                  </span>
                  <h3 className="text-2xl uppercase text-white font-marcellus">{item.title}</h3>
                  <p className="text-xs font-light leading-relaxed text-white/50">{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="armory" className="border-t border-white/5 bg-[#0b1316]/20 py-32">
          <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-12 lg:grid-cols-12">
            <div className="relative order-2 lg:col-span-6 lg:order-1">
              <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-400/10 blur-[90px]" />
              <div className="relative z-10 space-y-8 border border-white/10 bg-[#030708]/90 p-12">
                {[
                  ["Blade Length", "73.4 cm"],
                  ["Steel Composition", "Tamahagane / Folded 16x"],
                  ["Hamon Pattern", "Midareba (Wild Wave)"],
                  ["Total Mass", "1.18 kg"],
                ].map(([label, value]) => (
                  <div key={label} className="flex items-center justify-between border-b border-white/5 pb-4 last:border-0 last:pb-0">
                    <span className="text-sm uppercase tracking-wider text-white/60 font-marcellus">{label}</span>
                    <span className="text-sm font-medium text-amber-400 font-montserrat">{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div
              ref={(el) => setRevealRef(el, 10)}
              data-reveal-id="armory-text"
              className={`${revealClass("armory-text")} order-1 space-y-6 lg:col-span-6 lg:order-2`}
            >
              <span className="block text-xs uppercase tracking-[0.4em] text-amber-400 font-marcellus">
                Forged Immortality
              </span>
              <h2 className="text-4xl uppercase leading-tight tracking-tight text-white sm:text-5xl font-marcellus">
                Steel tempered within the <span className="text-emerald-400 font-decorative">vortex</span>.
              </h2>
              <p className="text-sm leading-relaxed text-white/60 font-light sm:text-base">
                Every katana crafted under the Sushima lineage goes through arduous volcanic tempering, followed by high-altitude cooling exposures. This allows the edge to maintain absolute micro-alignment, splitting air molecules effortlessly as you dance along windward horizons.
              </p>
              <div className="pt-4">
                <button className="bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] text-[#030708] transition-colors duration-300 hover:bg-amber-400 font-marcellus">
                  Request Commissions
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="relative mx-auto max-w-4xl overflow-hidden px-6 py-32 text-center md:px-12">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-emerald-400/5 via-amber-400/5 to-transparent blur-3xl" />
          <div ref={(el) => setRevealRef(el, 11)} data-reveal-id="guild" className={`${revealClass("guild")} relative z-10 space-y-8`}>
            <Icon icon="ri:sword-line" className="animate-pulse text-4xl text-amber-400" />
            <h2 className="text-4xl uppercase tracking-tight text-white sm:text-6xl font-marcellus">
              Join the Wanderer&apos;s Guild
            </h2>
            <p className="mx-auto max-w-xl text-sm font-light leading-relaxed text-white/50 sm:text-base">
              Receive direct dispatches regarding seasonal stances, landscape mappings, and legendary blade drops from our masters.
            </p>
            <div className="mx-auto flex max-w-md flex-col items-center gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="Enter ancestral signature (Email)..."
                className="w-full rounded-none border border-white/10 bg-[#0b1316] px-6 py-4 text-xs text-white placeholder:text-white/30 focus:border-emerald-400 focus:outline-none font-montserrat"
              />
              <button className="w-full whitespace-nowrap rounded-none bg-emerald-400 px-8 py-4 text-xs font-bold uppercase tracking-widest text-[#030708] transition-colors duration-300 hover:bg-amber-400 sm:w-auto font-marcellus">
                Bind Soul
              </button>
            </div>
          </div>
        </section>

        <footer className="relative overflow-hidden border-t border-white/5 bg-[#0b1316] px-6 pb-12 pt-24 md:px-12">
          <div className="relative z-10 mx-auto mb-16 grid max-w-7xl gap-16 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-5">
              <a href="#" className="block text-2xl tracking-[0.2em] text-white font-decorative">
                SUSHIMA
              </a>
              <p className="max-w-sm text-sm font-light leading-relaxed text-white/40">
                Honoring the ancestral connection between martial precision and the raw kinetic forces of the high mountains.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-12 md:grid-cols-3 lg:col-span-7">
              <div>
                <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-amber-400 font-marcellus">
                  Explore
                </h4>
                <ul className="space-y-4 text-sm font-light text-white/40 font-montserrat">
                  <li><a href="#" className="transition-colors hover:text-white">Tactical Stances</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Saga Chronicles</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Summit Topography</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Blade Profiles</a></li>
                </ul>
              </div>

              <div>
                <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-amber-400 font-marcellus">
                  Sanctuary
                </h4>
                <ul className="space-y-4 text-sm font-light text-white/40 font-montserrat">
                  <li><a href="#" className="transition-colors hover:text-white">Clans Alliance</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Forging Masters</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Code of Conduct</a></li>
                  <li><a href="#" className="transition-colors hover:text-white">Dispatches</a></li>
                </ul>
              </div>

              <div className="col-span-2 md:col-span-1">
                <h4 className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-amber-400 font-marcellus">
                  Connections
                </h4>
                <div className="flex gap-4 text-xl text-white/40">
                  <a href="#" className="transition-colors hover:text-white">
                    <Icon icon="ph:instagram-logo-light" />
                  </a>
                  <a href="#" className="transition-colors hover:text-white">
                    <Icon icon="ph:discord-logo-light" />
                  </a>
                  <a href="#" className="transition-colors hover:text-white">
                    <Icon icon="ph:youtube-logo-light" />
                  </a>
                  <a href="#" className="transition-colors hover:text-white">
                    <Icon icon="ph:telegram-logo-light" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 text-[10px] uppercase tracking-widest text-white/20 sm:flex-row">
            <p>© 2026 SUSHIMA. Gale Unleashed.</p>
            <div className="flex gap-8">
              <a href="#" className="transition-colors hover:text-white">
                Spirit Laws
              </a>
              <a href="#" className="transition-colors hover:text-white">
                Tectonic Protocol
              </a>
            </div>
          </div>
        </footer>
      </main>
    </main>
  );
}