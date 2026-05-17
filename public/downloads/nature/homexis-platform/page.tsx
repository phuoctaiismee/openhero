"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

const stats = [
  {
    icon: "lucide:users",
    value: "20k+",
    label: "Teams worldwide",
  },
  {
    icon: "lucide:check-circle",
    value: "99.99%",
    label: "Enterprise uptime",
  },
  {
    icon: "lucide:lock",
    value: "Enterprise-grade",
    label: "Security & compliance",
  },
  {
    icon: "lucide:globe",
    value: "150+",
    label: "Countries served",
  },
];

const featureCards = [
  {
    icon: "lucide:zap",
    title: "Intelligent Automation",
    text: "Automate repetitive tasks across your departments with AI-driven workflows that learn from your team's habits.",
    accent: false,
  },
  {
    icon: "lucide:shield-check",
    title: "Bank-Grade Security",
    text: "Your data is protected by AES-256 encryption, SOC 2 Type II compliance, and granular role-based access controls.",
    accent: true,
    extraIcon: "lucide:shield",
  },
  {
    icon: "lucide:bar-chart-3",
    title: "Real-time Analytics",
    text: "Turn raw data into actionable insights instantly with customizable dashboards and predictive reporting.",
    accent: false,
  },
];

const trusted = [
  ["simple-icons:databricks", "Braina"],
  ["simple-icons:nextdotjs", "Nexivo"],
  ["simple-icons:framer", "Fluxenta"],
  ["simple-icons:supabase", "Synthcra"],
];

const footerColumns = {
  Product: ["Features", "Integrations", "Pricing", "Changelog"],
  Resources: ["Documentation", "Blog", "Help Center", "Webinars"],
  Company: ["About Us", "Careers", "Privacy Policy", "Terms of Service"],
};

export default function Page() {
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const nav = navRef.current;
      if (!nav) return;

      if (window.scrollY > 50) {
        nav.classList.add("scrolled", "py-2");
        nav.classList.remove("py-6");
      } else {
        nav.classList.remove("scrolled", "py-2");
        nav.classList.add("py-6");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden bg-black text-white antialiased selection:bg-brand selection:text-white">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap");

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #000;
          color: #fff;
          font-family: "Inter", sans-serif;
          overflow-x: hidden;
        }

        * {
          box-sizing: border-box;
        }

        .font-serif {
          font-family: "Playfair Display", serif;
        }

        .glass-panel {
          background: rgba(30, 41, 59, 0.4);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .glass-nav {
          background: transparent;
          transition: all 0.3s ease;
        }

        .glass-nav.scrolled {
          background: rgba(15, 23, 42, 0.8);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .text-glow {
          text-shadow: 0 0 20px rgba(249, 115, 22, 0.3);
        }

        .chart-bar {
          animation: growUp 1.5s ease-out forwards;
          transform-origin: bottom;
        }

        @keyframes growUp {
          from {
            transform: scaleY(0);
          }

          to {
            transform: scaleY(1);
          }
        }
      `}</style>

      <nav ref={navRef} id="navbar" className="glass-nav fixed top-0 z-50 w-full">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
          <a href="#" className="flex items-center gap-2">
            <Icon icon="lucide:hexagon" className="text-3xl text-white" />
            <span className="text-xl font-bold tracking-tight">Orexis</span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-gray-300 md:flex">
            <a href="#" className="transition-colors hover:text-white">About</a>
            <a href="#features" className="transition-colors hover:text-white">Pricing</a>
            <a href="#" className="transition-colors hover:text-white">Articles</a>
            <a href="#" className="transition-colors hover:text-white">Contact</a>
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="hidden text-sm font-medium text-gray-300 transition-colors hover:text-white sm:block">
              Sign in
            </a>
            <a href="#" className="flex items-center gap-2 rounded-lg border border-white/20 px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white hover:text-black">
              Book a Demo <Icon icon="lucide:arrow-right" />
            </a>
          </div>
        </div>
      </nav>

      <header className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-20">
        <video autoPlay loop muted playsInline className="absolute inset-0 z-0 h-full w-full object-cover">
          <source src="/video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/45 via-black/25 to-transparent" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

        <div className="relative z-20 flex flex-1 items-center">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12">
            <div className="flex flex-col items-start pt-10 lg:col-span-7">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3 py-1.5 backdrop-blur-md">
                <Icon icon="lucide:cpu" className="text-sm text-gray-300" />
                <span className="text-xs font-medium tracking-wide text-gray-300">AI Enterprise Platform</span>
              </div>

              <h1 className="mb-6 text-5xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
                Built for teams that <br />
                <span className="font-serif italic text-brand text-glow font-medium">Grow with clarity</span>
              </h1>

              <p className="mb-10 max-w-lg text-lg leading-relaxed text-gray-300 font-light">
                Streamline operations, connect your teams, and make confident decisions everyday.
              </p>

              <div className="mb-16 flex flex-wrap items-center gap-4">
                <a href="#" className="flex items-center gap-2 rounded-lg bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-gray-200">
                  Start free trial <Icon icon="lucide:arrow-right" />
                </a>
                <a href="#" className="flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3 font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10">
                  Book a demo <Icon icon="lucide:play-circle" />
                </a>
              </div>

              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-gray-400">Trusted by leading organizations</p>
                <div className="flex flex-wrap items-center gap-6 opacity-70">
                  {trusted.map(([icon, label]) => (
                    <span key={label} className="flex items-center gap-1.5 text-sm font-bold">
                      <Icon icon={icon} /> {label}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="hidden lg:block lg:col-span-5">
              <div className="glass-panel relative overflow-hidden rounded-2xl p-6 shadow-2xl group">
                <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-brand/10 blur-[80px] transition-all duration-700 group-hover:bg-brand/20" />

                <div className="relative z-10 mb-8 flex items-center justify-between">
                  <h3 className="font-medium text-white">Operations overview</h3>
                  <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Live
                  </div>
                </div>

                <div className="relative z-10 mb-8 grid grid-cols-2 gap-6">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">Workflows</p>
                    <p className="mb-2 text-4xl font-semibold text-white">128</p>
                    <p className="flex items-center gap-1 text-xs text-emerald-400">
                      <Icon icon="lucide:arrow-up" /> 24% <span className="text-gray-500">vs last month</span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-400">Team Activity</p>
                    <p className="mb-2 text-4xl font-semibold text-white">3,420</p>
                    <p className="flex items-center gap-1 text-xs text-emerald-400">
                      <Icon icon="lucide:arrow-up" /> 18% <span className="text-gray-500">vs last month</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-20">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="grid grid-cols-2 gap-8 divide-x divide-white/10 md:grid-cols-4">
              {stats.map((item) => (
                <div key={item.label} className="flex items-center gap-4 px-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/10">
                    <Icon icon={item.icon} className={`text-xl ${item.icon === "lucide:check-circle" || item.icon === "lucide:globe" ? "text-brand" : "text-gray-400"}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-white">{item.value}</p>
                    <p className="text-sm text-gray-400">{item.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section id="features" className="relative bg-zinc-950 px-6 py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[1000px] -translate-x-1/2 rounded-full bg-brand/5 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-5xl">Unify your entire workflow</h2>
            <p className="mx-auto max-w-2xl text-lg text-gray-400">Replace fragmented tools with a single, intelligent platform designed to scale with your organization&apos;s needs.</p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {featureCards.map((card) => (
              <div key={card.title} className={`glass-panel rounded-2xl p-8 transition-colors hover:bg-zinc-900 border-zinc-800 ${card.accent ? "relative overflow-hidden" : ""}`}>
                {card.accent ? <div className="absolute right-0 top-0 p-4 opacity-10"><Icon icon={card.extraIcon ?? "lucide:shield"} className="text-8xl" /></div> : null}
                <div className={`mb-6 flex h-12 w-12 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 ${card.accent ? "relative z-10" : ""}`}>
                  <Icon icon={card.icon} className={`text-xl ${card.accent ? "text-white" : "text-brand"}`} />
                </div>
                <h3 className={`mb-3 text-xl font-semibold ${card.accent ? "relative z-10" : ""}`}>{card.title}</h3>
                <p className={`leading-relaxed text-gray-400 ${card.accent ? "relative z-10" : ""}`}>{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-900 bg-black px-6 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 p-8 md:flex md:items-center md:justify-between md:gap-10 md:p-16">
            <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-brand/10 blur-[100px]" />

            <div className="relative z-10 max-w-xl">
              <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to transform your operations?</h2>
              <p className="mb-8 text-lg text-gray-400">Join thousands of enterprise teams already using Orexis to drive growth and clarity across their organizations.</p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center gap-3 text-gray-300"><Icon icon="lucide:check" className="text-brand" /> 14-day free trial</li>
                <li className="flex items-center gap-3 text-gray-300"><Icon icon="lucide:check" className="text-brand" /> Personalized onboarding</li>
                <li className="flex items-center gap-3 text-gray-300"><Icon icon="lucide:check" className="text-brand" /> 24/7 priority support</li>
              </ul>
            </div>

            <div className="relative z-10 flex w-full flex-col gap-4 md:w-auto">
              <a href="#" className="rounded-xl bg-brand px-8 py-4 text-center font-semibold text-white transition-all hover:bg-brand-light hover:text-black">
                Get Started Now
              </a>
              <a href="#" className="rounded-xl border border-zinc-700 bg-zinc-800 px-8 py-4 text-center font-semibold text-white transition-all hover:bg-zinc-700">
                Talk to Sales
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-900 bg-zinc-950 px-6 pb-10 pt-20">
        <div className="mx-auto mb-16 grid max-w-7xl grid-cols-2 gap-10 md:grid-cols-5">
          <div className="col-span-2">
            <a href="#" className="mb-6 flex items-center gap-2">
              <Icon icon="lucide:hexagon" className="text-2xl text-white" />
              <span className="text-xl font-bold tracking-tight">Orexis</span>
            </a>
            <p className="mb-8 max-w-xs text-gray-500">The AI-native enterprise platform built for teams that demand clarity, speed, and scalable growth.</p>
            <div className="flex gap-4">
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-gray-400 transition-all hover:border-zinc-600 hover:text-white"><Icon icon="lucide:linkedin" /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-gray-400 transition-all hover:border-zinc-600 hover:text-white"><Icon icon="lucide:twitter" /></a>
              <a href="#" className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-800 bg-zinc-900 text-gray-400 transition-all hover:border-zinc-600 hover:text-white"><Icon icon="lucide:github" /></a>
            </div>
          </div>

          {Object.entries(footerColumns).map(([title, items]) => (
            <div key={title}>
              <h4 className="mb-6 font-semibold text-white">{title}</h4>
              <ul className="space-y-4 text-sm text-gray-500">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-brand">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 border-t border-zinc-900 pt-8 text-sm text-gray-600 md:flex-row">
          <p>&copy; 2026 Orexis Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <select className="cursor-pointer border-none bg-transparent outline-none transition-colors hover:text-gray-300">
              <option value="en">English (US)</option>
              <option value="es">Espa&ntilde;ol</option>
            </select>
          </div>
        </div>
      </footer>
    </div>
  );
}
