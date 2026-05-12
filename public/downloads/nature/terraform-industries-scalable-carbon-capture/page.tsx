"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const auraRef = useRef<HTMLDivElement | null>(null);
  const scrollLineRef = useRef<HTMLDivElement | null>(null);
  const lightCorridorRef = useRef<HTMLDivElement | null>(null);
  const portalVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const dustCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const circValRef = useRef<HTMLDivElement | null>(null);
  const c1Ref = useRef<HTMLSpanElement | null>(null);
  const c2Ref = useRef<HTMLSpanElement | null>(null);
  const c3Ref = useRef<HTMLSpanElement | null>(null);
  const fallbackRef = useRef<HTMLDivElement | null>(null);

  const tickerItems = [
    ["Atmospheric O₂", "+340 ppm"],
    ["Regolith pH", "6.8 optimal"],
    ["Photon density", "1,240 μmol/m²/s"],
    ["Growth sync", "Circadian 98.2%"],
    ["CO₂ scrub rate", "14.2 t/day"],
    ["Biomass yield", "340% above baseline"],
    ["Lunar soil enrichment", "Phase III active"],
  ];

  const scrubberBars = [45, 62, 38, 78, 55, 85, 42, 70, 58, 88, 44, 66, 52, 80, 48, 72, 60, 90, 38, 68];

  const regolithItems = [
    {
      icon: "material-symbols:light-mode-outline-rounded",
      className: "ri-gold",
      name: "Photosynthetic Rate",
      value: "2,400×",
    },
    {
      icon: "material-symbols:eco-outline-rounded",
      className: "ri-green",
      name: "Biomass Conversion",
      value: "94.8%",
    },
    {
      icon: "material-symbols:water-drop-outline-rounded",
      className: "ri-silver",
      name: "Water Use Efficiency",
      value: "−82%",
    },
  ];

  const cards = [
    {
      icon: "material-symbols:biotech-outline-rounded",
      title: "Lunar-Regolith\nEnrichment",
      text: "Iron-depleted regolith inoculated with nitrogen-fixing archaeal strains. Achieves agricultural-grade soil in 8 lunar cycles.",
      metric: "8",
      metricSuffix: " cycles",
      metricLabel: "To fertile soil",
      progress: "73%",
      iconStyle: {},
    },
    {
      icon: "material-symbols:forest-outline-rounded",
      title: "Synthetic Crop\nGenome",
      text: "CRISPR-optimised C4 photosynthesis pathway embedded in staple crops, tolerant of 0.3 atm pressure and −40°C diurnal variance.",
      metric: "340",
      metricSuffix: "%",
      metricLabel: "Yield uplift",
      progress: "91%",
      iconStyle: {
        background: "oklch(72% 0.14 145 / 0.1)",
        borderColor: "oklch(72% 0.14 145 / 0.2)",
        color: "var(--leaf-green)",
      },
    },
    {
      icon: "material-symbols:satellite-alt-outline-rounded",
      title: "Photon\nOptimisation",
      text: "Spectral tuning of supplemental grow-light arrays to match chlorophyll-a/b absorption maxima at 680nm and 700nm.",
      metric: "99.4",
      metricSuffix: "%",
      metricLabel: "Photon capture",
      progress: "99%",
      iconStyle: {
        background: "oklch(88% 0.03 100 / 0.08)",
        borderColor: "oklch(88% 0.03 100 / 0.15)",
        color: "var(--moon-silver)",
      },
    },
  ];

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    let auraX = 0;
    let auraY = 0;
    let ticking = false;

    const cursor = cursorRef.current;
    const aura = auraRef.current;
    const scrollLine = scrollLineRef.current;
    const lightCorridor = lightCorridorRef.current;
    const portalVideo = portalVideoRef.current;
    const heroText = heroTextRef.current;
    const hero = heroRef.current;
    const canvas = dustCanvasRef.current;
    const circVal = circValRef.current;
    const c1 = c1Ref.current;
    const c2 = c2Ref.current;
    const c3 = c3Ref.current;
    const fallback = fallbackRef.current;

    const animateCount = (
      el: HTMLSpanElement | null,
      target: number,
      duration: number,
      decimals = 0
    ) => {
      if (!el) return;

      const start = performance.now();

      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 4);
        const value = target * eased;
        el.textContent = decimals ? value.toFixed(decimals) : String(Math.round(value));

        if (progress < 1) requestAnimationFrame(step);
      };

      requestAnimationFrame(step);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursor) {
        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
      }
    };

    const animateAura = () => {
      auraX += (mouseX - auraX) * 0.1;
      auraY += (mouseY - auraY) * 0.1;

      if (aura) {
        aura.style.left = `${auraX}px`;
        aura.style.top = `${auraY}px`;
      }

      requestAnimationFrame(animateAura);
    };

    const handleMouseDown = () => {
      if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(0.5)";
    };

    const handleMouseUp = () => {
      if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const hoverables = document.querySelectorAll<HTMLElement>(
      ".btn-dew, .cta-submit, .bio-card, .regolith-item, a, button"
    );

    hoverables.forEach((el) => {
      el.addEventListener("mouseenter", () => aura?.classList.add("hovering"));
      el.addEventListener("mouseleave", () => aura?.classList.remove("hovering"));

      el.addEventListener("mousemove", (ev: Event) => {
        const e = ev as MouseEvent;
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
      });
    });

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        const maxScroll =
          document.body.scrollHeight - window.innerHeight || 1;
        const pct = (scrolled / maxScroll) * 100;

        if (scrollLine) scrollLine.style.width = `${pct}%`;

        if (lightCorridor) {
          const hueRotate = Math.min(scrolled * 0.15, 180);
          lightCorridor.style.filter = `hue-rotate(${hueRotate}deg)`;
          lightCorridor.style.transform = `translateX(-50%) translateY(${scrolled * 0.2}px) scale(${1 + scrolled * 0.0005})`;
        }

        if (portalVideo && scrolled < window.innerHeight * 1.5) {
          portalVideo.style.transform = `scale(${1.02 + scrolled * 0.0002}) translateY(${scrolled * 0.1}px)`;
        }

        if (heroText && scrolled < window.innerHeight) {
          heroText.style.transform = `translateY(${scrolled * -0.08}px)`;
        }

        const parallaxCards = document.querySelectorAll<HTMLElement>(".parallax-card");
        parallaxCards.forEach((card) => {
          const rect = card.getBoundingClientRect();
          if (rect.top < window.innerHeight && rect.bottom > 0) {
            const yOffset = (window.innerHeight - rect.top) * 0.05;
            card.style.transform = `translateY(-${yOffset}px)`;
          }
        });

        ticking = false;
      });
    };

    const heroObserver = new IntersectionObserver(
      (entries, obs) => {
        if (entries[0]?.isIntersecting) {
          setTimeout(() => animateCount(c1, 94, 2200), 1400);
          setTimeout(() => animateCount(c2, 14200, 2400), 1500);
          setTimeout(() => animateCount(c3, 34, 2000), 1600);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (hero) heroObserver.observe(hero);

    const bloomObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("bloomed");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".bloom-reveal").forEach((el) => bloomObserver.observe(el));

    const barsWrap = document.getElementById("scrubber-bars");
    if (barsWrap) {
      barsWrap.innerHTML = "";
      scrubberBars.forEach((h, i) => {
        const bar = document.createElement("div");
        bar.className = "scrubber-bar";
        bar.style.height = `${h}%`;
        bar.style.animationDelay = `${i * 0.15}s`;
        bar.style.animationDuration = `${2.5 + Math.random()}s`;
        barsWrap.appendChild(bar);
      });
    }

    const updateClock = () => {
      if (!circVal) return;
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      circVal.textContent = `${h}:${m}`;
    };

    updateClock();
    const clockTimer = window.setInterval(updateClock, 1000);

    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const particles: Array<{
          x: number;
          y: number;
          vx: number;
          vy: number;
          size: number;
          alpha: number;
          warm: boolean;
        }> = [];

        const resize = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        for (let i = 0; i < 80; i++) {
          particles.push({
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            vx: (Math.random() - 0.5) * 0.25,
            vy: -Math.random() * 0.4 - 0.05,
            size: Math.random() * 2 + 0.5,
            alpha: Math.random() * 0.35 + 0.05,
            warm: Math.random() > 0.3,
          });
        }

        const draw = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach((p) => {
            p.x += p.vx + Math.sin(Date.now() * 0.0003 + p.y * 0.01) * 0.2;
            p.y += p.vy;

            if (p.y < -5) {
              p.y = canvas.height + 5;
              p.x = Math.random() * canvas.width;
            }

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fillStyle = p.warm
              ? `oklch(88% 0.14 85 / ${p.alpha})`
              : `oklch(72% 0.14 145 / ${p.alpha * 0.5})`;
            ctx.fill();
          });

          requestAnimationFrame(draw);
        };

        draw();

        const handleResizeCleanup = () => window.removeEventListener("resize", resize);

        return () => {
          handleResizeCleanup();
        };
      }
    }

    if (portalVideo && fallback) {
      const handleCanPlay = () => {
        fallback.style.opacity = "0";
        fallback.style.transition = "opacity 1s";
      };

      const handleError = () => {
        portalVideo.style.display = "none";
      };

      portalVideo.addEventListener("canplay", handleCanPlay);
      portalVideo.addEventListener("error", handleError);

      animateAura();
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mousedown", handleMouseDown);
      window.addEventListener("mouseup", handleMouseUp);
      window.addEventListener("scroll", handleScroll, { passive: true });

      handleScroll();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("scroll", handleScroll);
        window.clearInterval(clockTimer);
        heroObserver.disconnect();
        bloomObserver.disconnect();
        portalVideo.removeEventListener("canplay", handleCanPlay);
        portalVideo.removeEventListener("error", handleError);
      };
    }

    animateAura();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", handleScroll, { passive: true });

    handleScroll();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
      window.clearInterval(clockTimer);
      heroObserver.disconnect();
      bloomObserver.disconnect();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300..700;1,300..700&family=DM+Sans:ital,opsz,wght@0,9..40,100..900;1,9..40,100..900&display=swap");

        :root {
          --gold-bright: oklch(88% 0.14 85);
          --gold-mid: oklch(75% 0.16 80);
          --gold-warm: oklch(65% 0.18 75);
          --gold-deep: oklch(52% 0.15 72);
          --gold-root: oklch(38% 0.12 68);
          --amber-glow: oklch(82% 0.13 88);
          --cream-light: oklch(96% 0.05 90);
          --cream-mid: oklch(92% 0.08 88);
          --soil-dark: oklch(22% 0.06 65);
          --soil-mid: oklch(32% 0.08 70);
          --soil-surface: oklch(42% 0.1 72);
          --leaf-green: oklch(72% 0.14 145);
          --moon-silver: oklch(88% 0.03 100);
          --dew-glass: oklch(100% 0 0 / 0.1);
          --dew-border: oklch(100% 0 0 / 0.2);
          --dew-shine: oklch(100% 0 0 / 0.4);
          --bokeh-warm: oklch(92% 0.12 85 / 0.4);
          --font-display: "Cormorant Garamond", Georgia, serif;
          --font-body: "DM Sans", system-ui, sans-serif;
        }

        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        body {
          font-family: var(--font-body);
          font-weight: 300;
          background: var(--soil-dark);
          color: var(--cream-light);
          min-height: 100vh;
          overflow-x: hidden;
          cursor: none;
        }

        .cursor {
          position: fixed;
          width: 8px;
          height: 8px;
          background: var(--gold-bright);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          mix-blend-mode: screen;
          transition: transform 0.1s ease;
        }

        .cursor-aura {
          position: fixed;
          width: 36px;
          height: 36px;
          border: 1px solid oklch(88% 0.14 85 / 0.45);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .cursor-aura.hovering {
          width: 52px;
          height: 52px;
          border-color: var(--gold-warm);
          background: oklch(75% 0.16 80 / 0.06);
        }

        .noise {
          position: fixed;
          inset: 0;
          z-index: 5;
          pointer-events: none;
          opacity: 0.04;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 256px 256px;
        }

        .bg-soil {
          position: fixed;
          inset: 0;
          z-index: 0;
          background: radial-gradient(
              ellipse 90% 70% at 50% 100%,
              oklch(38% 0.12 68 / 0.8) 0%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 60% 50% at 20% 50%,
              oklch(32% 0.1 75 / 0.5) 0%,
              transparent 60%
            ),
            radial-gradient(
              ellipse 70% 60% at 80% 30%,
              oklch(28% 0.08 65 / 0.6) 0%,
              transparent 60%
            ),
            oklch(18% 0.05 65);
        }

        .light-corridor {
          position: fixed;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 80vw;
          height: 100vh;
          z-index: 1;
          pointer-events: none;
          background: radial-gradient(
            circle at center,
            oklch(92% 0.12 85 / 0.4) 0%,
            transparent 70%
          );
          backdrop-filter: blur(120px) saturate(1.5);
          -webkit-backdrop-filter: blur(120px) saturate(1.5);
          animation: corridor-breathe 12s ease-in-out infinite;
        }

        @keyframes corridor-breathe {
          0%,
          100% {
            opacity: 0.8;
            transform: translateX(-50%) scaleY(1);
          }
          50% {
            opacity: 1;
            transform: translateX(-50%) scaleY(1.05);
          }
        }

        .dust-canvas {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }

        .nav-brand {
          display: flex;
          align-items: center;
          gap: 0.875rem;
          text-decoration: none;
        }

        .nav-glyph {
          width: 32px;
          height: 32px;
          position: relative;
          flex-shrink: 0;
        }

        .nav-glyph svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 0 8px oklch(88% 0.14 85 / 0.6));
        }

        .nav-wordmark {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--cream-light);
        }

        .nav-tagline {
          font-size: 0.6rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--gold-mid);
          margin-top: 0.1rem;
        }

        .nav-links {
          display: flex;
          gap: 2.5rem;
          list-style: none;
        }

        .nav-links a {
          font-size: 0.75rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: oklch(88% 0.05 90 / 0.7);
          text-decoration: none;
          transition: color 0.4s ease;
          font-weight: 400;
        }

        .nav-links a:hover {
          color: var(--gold-bright);
        }

        .btn-dew {
          position: relative;
          padding: 0.65rem 1.75rem;
          background: var(--dew-glass);
          border: 1px solid var(--dew-border);
          border-radius: 100px;
          color: var(--cream-light);
          font-family: var(--font-body);
          font-size: 0.72rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          cursor: none;
          backdrop-filter: blur(20px) saturate(1.3);
          overflow: hidden;
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          font-weight: 400;
        }

        .btn-dew::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 50%;
          background: linear-gradient(180deg, var(--dew-shine) 0%, transparent 100%);
          border-radius: 100px 100px 0 0;
          pointer-events: none;
        }

        .btn-dew::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--mx, 50%) var(--my, 50%),
            oklch(92% 0.12 85 / 0.25) 0%,
            transparent 55%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
          border-radius: 100px;
        }

        .btn-dew:hover::after {
          opacity: 1;
        }

        .btn-dew:hover {
          border-color: oklch(88% 0.14 85 / 0.4);
          box-shadow: 0 8px 40px oklch(75% 0.16 80 / 0.2),
            inset 0 0 20px oklch(92% 0.12 85 / 0.08);
        }

        .btn-dew-gold {
          background: oklch(75% 0.16 80 / 0.2);
          border-color: oklch(88% 0.14 85 / 0.35);
          color: var(--gold-bright);
        }

        .btn-dew-gold:hover {
          background: oklch(75% 0.16 80 / 0.32);
          box-shadow: 0 8px 50px oklch(75% 0.16 80 / 0.3),
            inset 0 0 30px oklch(92% 0.12 85 / 0.12);
        }

        .scene {
          position: relative;
          z-index: 10;
          padding: 0 clamp(2rem, 6vw, 5rem);
        }

        .hero {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding-top: clamp(6rem, 14vh, 10rem);
          padding-bottom: 4rem;
          position: relative;
        }

        .hero-flow {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .hero-text-column {
          position: relative;
          will-change: transform;
        }

        .eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 2rem;
          opacity: 0;
          animation: petal-unfold 1s cubic-bezier(0.16, 1, 0.3, 1) 0.3s forwards;
        }

        .eyebrow-leaf {
          width: 24px;
          height: 1px;
          background: linear-gradient(90deg, var(--gold-warm), transparent);
        }

        .eyebrow-text {
          font-size: 0.65rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--gold-mid);
          font-weight: 500;
        }

        .hero-title {
          font-family: var(--font-display);
          font-size: clamp(3.2rem, 7vw, 6.5rem);
          font-weight: 300;
          letter-spacing: -0.025em;
          line-height: 0.92;
          margin-bottom: 1.75rem;
          color: var(--cream-light);
        }

        .hero-title-line {
          display: block;
          overflow: hidden;
        }

        .hero-title-line span {
          display: inline-block;
          opacity: 0;
          transform: translateY(110%) rotate(2deg);
          animation: petal-rise 1.1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .hero-title-line:nth-child(1) span {
          animation-delay: 0.5s;
        }

        .hero-title-line:nth-child(2) span {
          animation-delay: 0.68s;
        }

        .hero-title-line:nth-child(3) span {
          animation-delay: 0.86s;
        }

        .hero-title .italic {
          font-style: italic;
          color: var(--gold-bright);
          font-weight: 300;
        }

        .hero-subtitle {
          font-size: clamp(0.85rem, 1.1vw, 1rem);
          color: oklch(88% 0.05 90 / 0.65);
          line-height: 1.75;
          max-width: 42ch;
          margin-bottom: 2.5rem;
          font-weight: 300;
          opacity: 0;
          animation: petal-unfold 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.2s forwards;
        }

        .hero-actions {
          display: flex;
          gap: 1rem;
          align-items: center;
          opacity: 0;
          animation: petal-unfold 0.9s cubic-bezier(0.16, 1, 0.3, 1) 1.4s forwards;
        }

        .lunar-portal-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          animation: petal-unfold 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.6s forwards;
        }

        .lunar-portal {
          position: relative;
          width: clamp(300px, 42vw, 560px);
          aspect-ratio: 4 / 5;
          border-radius: 60% 40% 55% 45% / 50% 55% 45% 50%;
          overflow: hidden;
          mask-image: radial-gradient(
            ellipse 85% 88% at 50% 50%,
            black 40%,
            transparent 100%
          );
          -webkit-mask-image: radial-gradient(
            ellipse 85% 88% at 50% 50%,
            black 40%,
            transparent 100%
          );
          animation: portal-morph 20s ease-in-out infinite;
        }

        @keyframes portal-morph {
          0%,
          100% {
            border-radius: 60% 40% 55% 45% / 50% 55% 45% 50%;
          }
          25% {
            border-radius: 50% 50% 45% 55% / 55% 45% 55% 45%;
          }
          50% {
            border-radius: 45% 55% 60% 40% / 45% 55% 50% 50%;
          }
          75% {
            border-radius: 55% 45% 50% 50% / 50% 50% 45% 55%;
          }
        }

        .lunar-portal-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: saturate(1.3) brightness(0.9) sepia(0.2);
        }

        .lunar-portal-fallback {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              ellipse 60% 70% at 50% 30%,
              oklch(88% 0.14 85 / 0.8) 0%,
              oklch(75% 0.16 80 / 0.5) 30%,
              transparent 70%
            ),
            radial-gradient(
              ellipse 80% 60% at 30% 80%,
              oklch(52% 0.15 72 / 0.8) 0%,
              oklch(38% 0.12 68 / 0.6) 50%,
              transparent 80%
            ),
            radial-gradient(
              ellipse 50% 50% at 70% 60%,
              oklch(72% 0.14 145 / 0.3) 0%,
              transparent 60%
            ),
            oklch(28% 0.08 68);
          animation: harvest-shimmer 10s ease-in-out infinite;
        }

        @keyframes harvest-shimmer {
          0%,
          100% {
            filter: brightness(0.9) hue-rotate(0deg);
          }
          50% {
            filter: brightness(1.08) hue-rotate(8deg);
          }
        }

        .lunar-portal-glow {
          position: absolute;
          inset: -20%;
          border-radius: inherit;
          background: radial-gradient(
            ellipse at center,
            oklch(88% 0.14 85 / 0.25) 0%,
            oklch(75% 0.16 80 / 0.1) 50%,
            transparent 80%
          );
          filter: blur(40px);
          z-index: -1;
          animation: portal-morph 20s ease-in-out infinite;
        }

        .portal-overlay {
          position: absolute;
          inset: 0;
          background: radial-gradient(
              ellipse 40% 40% at 50% 25%,
              oklch(96% 0.05 90 / 0.15) 0%,
              transparent 70%
            ),
            linear-gradient(180deg, transparent 50%, oklch(18% 0.05 65 / 0.6) 100%);
          pointer-events: none;
        }

        .moon-badge {
          position: absolute;
          top: 12%;
          right: -5%;
          width: 80px;
          height: 80px;
          background: oklch(88% 0.03 100 / 0.15);
          backdrop-filter: blur(20px);
          border: 1px solid oklch(88% 0.03 100 / 0.25);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 0.2rem;
          animation: badge-float 6s ease-in-out infinite;
        }

        @keyframes badge-float {
          0%,
          100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-8px) rotate(3deg);
          }
        }

        .moon-badge-val {
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 600;
          color: var(--moon-silver);
          letter-spacing: -0.03em;
          line-height: 1;
        }

        .moon-badge-label {
          font-size: 0.5rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: oklch(88% 0.03 100 / 0.7);
          text-align: center;
        }

        .stats-river {
          display: flex;
          gap: 0;
          margin-top: clamp(3rem, 8vh, 6rem);
          position: relative;
        }

        .stats-river::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            oklch(88% 0.14 85 / 0.3) 20%,
            oklch(88% 0.14 85 / 0.15) 80%,
            transparent
          );
        }

        .stat-pod {
          flex: 1;
          padding: 2rem 2rem 2rem 0;
          border-right: 1px solid oklch(88% 0.14 85 / 0.08);
          margin-right: 2rem;
        }

        .stat-pod:last-child {
          border-right: none;
        }

        .stat-num {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.5vw, 3rem);
          font-weight: 300;
          letter-spacing: -0.05em;
          color: var(--cream-light);
          line-height: 1;
          margin-bottom: 0.4rem;
        }

        .stat-num .unit {
          font-size: 0.5em;
          color: var(--gold-mid);
          vertical-align: super;
          font-weight: 400;
        }

        .stat-label {
          font-size: 0.65rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: oklch(75% 0.05 85 / 0.55);
          line-height: 1.5;
        }

        .rhizo-section {
          padding: clamp(5rem, 12vh, 10rem) 0;
          position: relative;
        }

        .rhizo-flow {
          display: flex;
          flex-direction: column;
          gap: clamp(5rem, 10vh, 8rem);
        }

        .rhizo-row {
          display: grid;
          align-items: start;
          position: relative;
        }

        .rhizo-row.left {
          grid-template-columns: 1fr 1.4fr;
          gap: 5rem;
        }

        .rhizo-row.right {
          grid-template-columns: 1.4fr 1fr;
          gap: 5rem;
        }

        .rhizo-row.center {
          grid-template-columns: 1fr 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }

        .rhizo-connector {
          position: absolute;
          left: 50%;
          top: -4rem;
          width: 1px;
          height: 4rem;
          background: linear-gradient(
            180deg,
            transparent,
            oklch(88% 0.14 85 / 0.2)
          );
          transform: translateX(-50%);
        }

        .section-eyebrow {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1.25rem;
        }

        .leaf-stem {
          width: 30px;
          height: 1px;
          background: linear-gradient(90deg, var(--gold-warm), transparent);
        }

        .section-tag {
          font-size: 0.62rem;
          letter-spacing: 0.38em;
          text-transform: uppercase;
          color: var(--gold-mid);
          font-weight: 500;
        }

        .section-title {
          font-family: var(--font-display);
          font-size: clamp(2rem, 3.5vw, 3.2rem);
          font-weight: 300;
          letter-spacing: -0.02em;
          line-height: 1.1;
          color: var(--cream-light);
          margin-bottom: 1.25rem;
        }

        .section-title .italic {
          font-style: italic;
          color: var(--gold-bright);
        }

        .section-body {
          font-size: 0.875rem;
          color: oklch(88% 0.05 90 / 0.6);
          line-height: 1.8;
          font-weight: 300;
          max-width: 46ch;
        }

        .amber-leak {
          width: 100%;
          height: 1px;
          background: radial-gradient(
            ellipse 60% 100% at 30% 50%,
            oklch(88% 0.14 85 / 0.35) 0%,
            oklch(75% 0.16 80 / 0.15) 50%,
            transparent 100%
          );
          margin: 0.5rem 0;
          position: relative;
        }

        .amber-leak::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 40%;
          height: 100%;
          background: linear-gradient(90deg, oklch(88% 0.14 85 / 0.5), transparent);
          filter: blur(4px);
        }

        .bio-card {
          position: relative;
          padding: 2rem 2rem 2rem 2.25rem;
          background: oklch(28% 0.07 70 / 0.5);
          border: 1px solid oklch(88% 0.14 85 / 0.1);
          border-radius: 24px 8px 24px 8px;
          overflow: hidden;
          backdrop-filter: blur(40px) saturate(1.3);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1),
            box-shadow 0.5s ease;
          cursor: none;
        }

        .bio-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            oklch(92% 0.12 85 / 0.25) 40%,
            transparent
          );
        }

        .bio-card::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 40%;
          background: linear-gradient(180deg, var(--gold-warm), transparent);
          border-radius: 0 0 3px 3px;
        }

        .bio-card:hover {
          transform: translateY(-6px) rotate(-0.5deg);
          box-shadow: 0 40px 80px oklch(15% 0.06 65 / 0.5),
            0 0 0 1px oklch(88% 0.14 85 / 0.12);
        }

        .bio-card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at var(--mx, 50%) var(--my, 50%),
            oklch(92% 0.12 85 / 0.08) 0%,
            transparent 55%
          );
          opacity: 0;
          transition: opacity 0.4s ease;
          pointer-events: none;
        }

        .bio-card:hover .bio-card-glow {
          opacity: 1;
        }

        .bio-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: oklch(88% 0.14 85 / 0.1);
          border: 1px solid oklch(88% 0.14 85 / 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.25rem;
          font-size: 1.2rem;
          color: var(--gold-bright);
        }

        .bio-card-title {
          font-family: var(--font-display);
          font-size: 1.2rem;
          font-weight: 400;
          letter-spacing: -0.01em;
          color: var(--cream-light);
          margin-bottom: 0.6rem;
          line-height: 1.25;
        }

        .bio-card-text {
          font-size: 0.78rem;
          color: oklch(80% 0.05 85 / 0.55);
          line-height: 1.75;
          font-weight: 300;
        }

        .metric-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.25rem;
          padding-top: 1.25rem;
          border-top: 1px solid oklch(88% 0.14 85 / 0.08);
        }

        .metric-val {
          font-family: var(--font-display);
          font-size: 1.6rem;
          font-weight: 300;
          letter-spacing: -0.04em;
          color: var(--gold-bright);
          line-height: 1;
        }

        .metric-label {
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: oklch(75% 0.05 85 / 0.5);
          line-height: 1.4;
        }

        .progress-vine {
          width: 100%;
          height: 2px;
          background: oklch(40% 0.08 70 / 0.4);
          border-radius: 1px;
          margin-top: 0.5rem;
          overflow: hidden;
          position: relative;
        }

        .progress-vine-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--gold-warm), var(--gold-bright));
          border-radius: 1px;
          transition: width 1.8s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
        }

        .progress-vine-fill::after {
          content: "";
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold-bright);
          box-shadow: 0 0 8px var(--gold-warm);
        }

        .circadian-display {
          background: oklch(22% 0.06 65 / 0.7);
          border: 1px solid oklch(88% 0.14 85 / 0.12);
          border-radius: 28px;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(60px);
        }

        .circadian-ring {
          position: relative;
          width: 160px;
          height: 160px;
          margin: 0 auto 2rem;
        }

        .circadian-ring svg {
          width: 100%;
          height: 100%;
          transform: rotate(-90deg);
          filter: drop-shadow(0 0 12px oklch(88% 0.14 85 / 0.4));
        }

        .circadian-ring-center {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          gap: 0.25rem;
        }

        .circadian-ring-val {
          font-family: var(--font-display);
          font-size: 2.2rem;
          font-weight: 300;
          letter-spacing: -0.04em;
          color: var(--gold-bright);
          line-height: 1;
        }

        .circadian-ring-label {
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: oklch(75% 0.05 85 / 0.5);
        }

        .circadian-phases {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
        }

        .phase-item {
          padding: 0.75rem;
          background: oklch(28% 0.07 70 / 0.5);
          border-radius: 12px;
          border: 1px solid oklch(88% 0.14 85 / 0.08);
        }

        .phase-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 0.4rem;
          vertical-align: middle;
        }

        .phase-name {
          font-size: 0.68rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: oklch(75% 0.05 85 / 0.6);
          margin-bottom: 0.3rem;
        }

        .phase-val {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 400;
          color: var(--cream-light);
          letter-spacing: -0.02em;
        }

        .scrubber-viz {
          position: relative;
          padding: 2rem;
          background: oklch(25% 0.07 70 / 0.6);
          border: 1px solid oklch(88% 0.14 85 / 0.1);
          border-radius: 8px 28px 8px 28px;
          backdrop-filter: blur(50px);
          overflow: hidden;
        }

        .scrubber-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 300;
          letter-spacing: -0.02em;
          color: var(--cream-light);
          margin-bottom: 0.4rem;
        }

        .scrubber-sub {
          font-size: 0.7rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--gold-mid);
          margin-bottom: 1.5rem;
        }

        .scrubber-bars {
          display: flex;
          align-items: flex-end;
          gap: 4px;
          height: 80px;
        }

        .scrubber-bar {
          flex: 1;
          border-radius: 3px 3px 0 0;
          background: linear-gradient(180deg, var(--gold-bright), var(--gold-warm));
          animation: scrub-pulse 3s ease-in-out infinite;
          transform-origin: bottom;
          opacity: 0.7;
        }

        @keyframes scrub-pulse {
          0%,
          100% {
            transform: scaleY(1);
            opacity: 0.7;
          }
          50% {
            transform: scaleY(1.15);
            opacity: 1;
          }
        }

        .regolith-stream {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }

        .regolith-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem 1.25rem;
          background: oklch(28% 0.07 70 / 0.4);
          border: 1px solid oklch(88% 0.14 85 / 0.08);
          border-radius: 100px;
          backdrop-filter: blur(30px);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          cursor: none;
        }

        .regolith-item:hover {
          background: oklch(32% 0.09 72 / 0.6);
          border-color: oklch(88% 0.14 85 / 0.2);
          transform: translateX(8px);
        }

        .regolith-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1rem;
          flex-shrink: 0;
        }

        .ri-gold {
          background: oklch(88% 0.14 85 / 0.12);
          color: var(--gold-bright);
        }

        .ri-green {
          background: oklch(72% 0.14 145 / 0.12);
          color: var(--leaf-green);
        }

        .ri-silver {
          background: oklch(88% 0.03 100 / 0.1);
          color: var(--moon-silver);
        }

        .regolith-name {
          font-size: 0.82rem;
          font-weight: 400;
          color: var(--cream-light);
          flex: 1;
        }

        .regolith-pct {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 400;
          color: var(--gold-mid);
          letter-spacing: -0.02em;
        }

        .biotech-ticker {
          display: flex;
          overflow: hidden;
          position: relative;
          padding: 1rem 0;
          margin: 2rem 0;
          border-top: 1px solid oklch(88% 0.14 85 / 0.08);
          border-bottom: 1px solid oklch(88% 0.14 85 / 0.08);
        }

        .ticker-track {
          display: flex;
          gap: 4rem;
          animation: ticker-scroll 28s linear infinite;
          white-space: nowrap;
        }

        @keyframes ticker-scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.68rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: oklch(75% 0.05 85 / 0.5);
          flex-shrink: 0;
        }

        .ticker-dot {
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--gold-warm);
          opacity: 0.6;
        }

        .ticker-val {
          color: var(--gold-mid);
          font-weight: 500;
        }

        .cta-organism {
          padding: clamp(5rem, 12vh, 10rem) 0;
          position: relative;
        }

        .cta-pod {
          position: relative;
          padding: clamp(3rem, 6vw, 5rem);
          background: oklch(26% 0.08 70 / 0.6);
          border: 1px solid oklch(88% 0.14 85 / 0.12);
          border-radius: 40px 12px 40px 12px;
          overflow: hidden;
          backdrop-filter: blur(80px) saturate(1.4);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: center;
        }

        .cta-pod::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            oklch(92% 0.12 85 / 0.3) 40%,
            oklch(88% 0.1 88 / 0.15) 70%,
            transparent
          );
        }

        .cta-glow-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }

        .cta-title {
          font-family: var(--font-display);
          font-size: clamp(2.2rem, 4vw, 3.8rem);
          font-weight: 300;
          letter-spacing: -0.03em;
          line-height: 1.05;
          color: var(--cream-light);
          margin-bottom: 1.25rem;
        }

        .cta-title .italic {
          font-style: italic;
          color: var(--gold-bright);
        }

        .cta-body {
          font-size: 0.875rem;
          color: oklch(80% 0.05 85 / 0.55);
          line-height: 1.8;
          font-weight: 300;
          max-width: 42ch;
          margin-bottom: 2.5rem;
        }

        .cta-form-side {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .field-pod {
          position: relative;
        }

        .field-input {
          width: 100%;
          padding: 0.875rem 1.5rem;
          background: oklch(22% 0.05 65 / 0.5);
          border: 1px solid oklch(88% 0.14 85 / 0.12);
          border-radius: 100px;
          color: var(--cream-light);
          font-family: var(--font-body);
          font-size: 0.8rem;
          letter-spacing: 0.05em;
          outline: none;
          transition: all 0.4s ease;
          backdrop-filter: blur(20px);
        }

        .field-input::placeholder {
          color: oklch(70% 0.05 80 / 0.4);
        }

        .field-input:focus {
          border-color: oklch(88% 0.14 85 / 0.3);
          box-shadow: 0 0 0 3px oklch(88% 0.14 85 / 0.06),
            inset 0 0 20px oklch(92% 0.12 85 / 0.04);
        }

        .field-select {
          width: 100%;
          padding: 0.875rem 1.5rem;
          background: oklch(22% 0.05 65 / 0.5);
          border: 1px solid oklch(88% 0.14 85 / 0.12);
          border-radius: 100px;
          color: oklch(70% 0.05 80 / 0.8);
          font-family: var(--font-body);
          font-size: 0.8rem;
          outline: none;
          cursor: none;
          appearance: none;
        }

        .cta-submit {
          position: relative;
          padding: 0.95rem 2.5rem;
          background: linear-gradient(
            135deg,
            oklch(75% 0.16 80 / 0.3),
            oklch(65% 0.18 75 / 0.2)
          );
          border: 1px solid oklch(88% 0.14 85 / 0.3);
          border-radius: 100px;
          color: var(--gold-bright);
          font-family: var(--font-body);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          cursor: none;
          backdrop-filter: blur(20px);
          transition: all 0.45s cubic-bezier(0.16, 1, 0.3, 1);
          font-weight: 500;
          overflow: hidden;
          align-self: flex-start;
        }

        .cta-submit::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 45%;
          background: linear-gradient(
            180deg,
            oklch(100% 0 0 / 0.12) 0%,
            transparent 100%
          );
          border-radius: 100px 100px 0 0;
        }

        .cta-submit:hover {
          background: linear-gradient(
            135deg,
            oklch(75% 0.16 80 / 0.45),
            oklch(65% 0.18 75 / 0.35)
          );
          box-shadow: 0 12px 50px oklch(75% 0.16 80 / 0.3);
          transform: translateY(-2px);
        }

        footer {
          position: relative;
          z-index: 10;
          padding: 2.5rem clamp(2rem, 6vw, 5rem);
          border-top: 1px solid oklch(88% 0.14 85 / 0.07);
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 1rem;
        }

        .footer-copy {
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: oklch(65% 0.05 80 / 0.5);
        }

        .footer-links {
          display: flex;
          gap: 2rem;
        }

        .footer-links a {
          font-size: 0.68rem;
          letter-spacing: 0.1em;
          color: oklch(65% 0.05 80 / 0.45);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: var(--gold-mid);
        }

        .scroll-line {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            var(--gold-warm),
            var(--gold-bright),
            var(--leaf-green)
          );
          z-index: 200;
          width: 0%;
          transition: width 0.15s linear;
          box-shadow: 0 0 10px var(--gold-warm);
        }

        @keyframes petal-unfold {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes petal-rise {
          from {
            opacity: 0;
            transform: translateY(110%) rotate(2deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotate(0deg);
          }
        }

        .wind-sway {
          display: inline-block;
          animation: wind-sway 8s ease-in-out infinite;
        }

        @keyframes wind-sway {
          0%,
          100% {
            transform: rotate(0deg) skewX(0deg);
          }
          25% {
            transform: rotate(0.4deg) skewX(0.3deg);
          }
          75% {
            transform: rotate(-0.3deg) skewX(-0.2deg);
          }
        }

        .bloom-reveal {
          opacity: 0;
          transform: translateY(28px) scale(0.98);
          transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1),
            transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bloom-reveal.bloomed {
          opacity: 1;
          transform: none;
        }

        .bloom-d1 {
          transition-delay: 0.1s;
        }

        .bloom-d2 {
          transition-delay: 0.2s;
        }

        .bloom-d3 {
          transition-delay: 0.3s;
        }

        .bloom-d4 {
          transition-delay: 0.4s;
        }

        @media (max-width: 900px) {
          .hero-flow {
            grid-template-columns: 1fr;
            gap: 3rem;
          }

          .rhizo-row.left,
          .rhizo-row.right {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .rhizo-row.center {
            grid-template-columns: 1fr;
          }

          .cta-pod {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .nav-links {
            display: none;
          }
        }
      `}</style>

      <div className="min-h-screen overflow-x-hidden bg-[var(--soil-dark)] text-[var(--cream-light)] antialiased">
        <div ref={cursorRef} className="cursor" />
        <div ref={auraRef} className="cursor-aura" />
        <div ref={scrollLineRef} className="scroll-line" />
        <div className="noise" />
        <div className="bg-soil" />
        <div ref={lightCorridorRef} className="light-corridor" />
        <canvas ref={dustCanvasRef} className="dust-canvas" />

        <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between border-b border-[oklch(88%_0.14_85_/_0.08)] bg-[oklch(18%_0.05_65_/_0.5)] px-[clamp(2rem,6vw,5rem)] py-6 backdrop-blur-[60px] saturate-150">
          <a className="nav-brand" href="#">
            <div className="nav-glyph">
              <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle
                  cx="16"
                  cy="16"
                  r="14"
                  stroke="oklch(88% 0.14 85 / 0.6)"
                  strokeWidth="0.75"
                />
                <path
                  d="M16 4 C16 4 10 10 10 16 C10 22 16 28 16 28 C16 28 22 22 22 16 C22 10 16 4 16 4Z"
                  stroke="oklch(88% 0.14 85)"
                  strokeWidth="0.75"
                  fill="none"
                />
                <path
                  d="M4 16 C4 16 10 13 16 13 C22 13 28 16 28 16"
                  stroke="oklch(88% 0.14 85 / 0.5)"
                  strokeWidth="0.75"
                />
                <circle cx="16" cy="16" r="2.5" fill="oklch(88% 0.14 85)" />
              </svg>
            </div>
            <div>
              <div className="nav-wordmark">Terraform Industries</div>
              <div className="nav-tagline">Scalable Carbon Capture</div>
            </div>
          </a>

          <ul className="nav-links">
            <li><a href="#">Astra-Botany</a></li>
            <li><a href="#">Regolith</a></li>
            <li><a href="#">Photosynthetics</a></li>
            <li><a href="#">Research</a></li>
          </ul>

          <button className="btn-dew btn-dew-gold">Apply for Access</button>
        </nav>

        <div className="scene">
          <section ref={heroRef} className="hero">
            <div className="hero-flow">
              <div ref={heroTextRef} className="hero-text-column" id="hero-text">
                <div className="eyebrow">
                  <div className="eyebrow-leaf" />
                  <span className="eyebrow-text">Lunar-Regolith Cycle · Phase III</span>
                </div>

                <h1 className="hero-title">
                  <span className="hero-title-line">
                    <span className="wind-sway">Grow Beyond</span>
                  </span>
                  <span className="hero-title-line">
                    <span>
                      <span className="italic">Earth&apos;s</span>
                    </span>
                  </span>
                  <span className="hero-title-line">
                    <span>Horizon</span>
                  </span>
                </h1>

                <p className="hero-subtitle">
                  Next-generation bioluminescent agriculture for off-world environments. Atmospheric scrubbers, photosynthetic optimization, and circadian growth-sync engineered for lunar soil.
                </p>

                <div className="hero-actions">
                  <button className="btn-dew btn-dew-gold">Explore Systems</button>
                  <button className="btn-dew">
                    <Icon
                      icon="material-symbols:play-circle-outline-rounded"
                      className="mr-2 align-[-3px]"
                    />
                    Watch Film
                  </button>
                </div>

                <div className="stats-river">
                  <div className="stat-pod">
                    <div className="stat-num">
                      <span ref={c1Ref}>0</span>
                      <span className="unit">%</span>
                    </div>
                    <div className="stat-label">
                      O₂ yield
                      <br />
                      efficiency
                    </div>
                  </div>

                  <div className="stat-pod">
                    <div className="stat-num">
                      <span ref={c2Ref}>0</span>
                      <span className="unit">t</span>
                    </div>
                    <div className="stat-label">
                      CO₂ captured
                      <br />
                      annually
                    </div>
                  </div>

                  <div className="stat-pod">
                    <div className="stat-num">
                      <span ref={c3Ref}>0</span>
                      <span className="unit">×</span>
                    </div>
                    <div className="stat-label">
                      Crop yield
                      <br />
                      multiplier
                    </div>
                  </div>
                </div>
              </div>

              <div className="lunar-portal-wrap">
                <div className="lunar-portal-glow" />
                <div className="lunar-portal" id="lunar-portal">
                  <div ref={fallbackRef} className="lunar-portal-fallback" id="lp-fallback" />
                  <video
                    ref={portalVideoRef}
                    id="portal-video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="lunar-portal-video"
                  >
                    <source src="/video.mp4" type="video/mp4" />
                  </video>
                  <div className="portal-overlay" />
                </div>

                <div className="moon-badge">
                  <div className="moon-badge-val">L1</div>
                  <div className="moon-badge-label">
                    Lunar
                    <br />
                    Station
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="biotech-ticker">
            <div className="ticker-track">
              {[...tickerItems, ...tickerItems].map(([label, value], index) => (
                <span className="ticker-item" key={`${label}-${index}`}>
                  <span className="ticker-dot" />
                  {label} <span className="ticker-val">{value}</span>
                </span>
              ))}
            </div>
          </div>

          <section className="rhizo-section">
            <div className="rhizo-flow">
              <div className="rhizo-row left bloom-reveal">
                <div>
                  <div className="section-eyebrow">
                    <div className="leaf-stem" />
                    <span className="section-tag">Atmospheric Systems</span>
                  </div>

                  <h2 className="section-title">
                    Carbon Scrubbers
                    <br />
                    <span className="italic">at scale</span>
                  </h2>

                  <div className="amber-leak" />

                  <p className="section-body">
                    Our proprietary atmospheric scrubbers leverage engineered algal biofilms operating at 2,400× the natural photosynthetic rate. Zero-energy passive capture sustained by bioluminescent colonies embedded in the regolith membrane.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-4">
                    <button className="btn-dew">Technical Brief</button>
                    <button className="btn-dew text-[var(--gold-mid)]">
                      <Icon
                        icon="material-symbols:arrow-forward-rounded"
                        className="mr-1 align-[-2px]"
                      />
                      Data Models
                    </button>
                  </div>
                </div>

                <div>
                  <div className="scrubber-viz">
                    <div className="scrubber-title">CO₂ → O₂ Flux</div>
                    <div className="scrubber-sub">Real-time Scrubber Array · Module 7</div>

                    <div className="scrubber-bars" id="scrubber-bars">
                      {scrubberBars.map((height, index) => (
                        <div
                          key={index}
                          className="scrubber-bar"
                          style={{
                            height: `${height}%`,
                            animationDelay: `${index * 0.15}s`,
                            animationDuration: `${2.5 + (index % 4) * 0.18}s`,
                          }}
                        />
                      ))}
                    </div>

                    <div className="mt-6">
                      <div className="section-eyebrow mb-2">
                        <span className="section-tag" style={{ fontSize: "0.58rem" }}>
                          Capture efficiency
                        </span>
                      </div>

                      <div className="progress-vine">
                        <div className="progress-vine-fill" style={{ width: "87%" }} />
                      </div>

                      <div className="mt-2 flex justify-between">
                        <span className="text-[0.6rem] tracking-[0.1em] text-[oklch(70%_0.05_80_/_0.4)]">
                          0%
                        </span>
                        <span className="font-[var(--font-display)] text-[0.68rem] tracking-[0.1em] text-[var(--gold-mid)]">
                          87%
                        </span>
                        <span className="text-[0.6rem] tracking-[0.1em] text-[oklch(70%_0.05_80_/_0.4)]">
                          100%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div className="bio-card p-5">
                      <div className="bio-card-glow" />
                      <div className="metric-val">
                        14.2<span style={{ fontSize: "0.5em", color: "var(--gold-warm)" }}> t/day</span>
                      </div>
                      <div className="metric-label mt-1">Scrub Rate</div>
                    </div>

                    <div className="bio-card p-5">
                      <div className="bio-card-glow" />
                      <div className="metric-val">
                        99.4<span style={{ fontSize: "0.5em", color: "var(--gold-warm)" }}>%</span>
                      </div>
                      <div className="metric-label mt-1">Purity Output</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rhizo-row right bloom-reveal bloom-d1">
                <div>
                  <div className="circadian-display">
                    <div className="section-eyebrow mb-6">
                      <div className="leaf-stem" />
                      <span className="section-tag">Growth Synchronisation</span>
                    </div>

                    <div className="circadian-ring">
                      <svg viewBox="0 0 160 160">
                        <circle
                          cx="80"
                          cy="80"
                          r="68"
                          stroke="oklch(88% 0.14 85 / 0.08)"
                          strokeWidth="8"
                          fill="none"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="68"
                          stroke="url(#circGrad)"
                          strokeWidth="8"
                          fill="none"
                          strokeDasharray="427"
                          strokeDashoffset="89"
                          strokeLinecap="round"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="52"
                          stroke="oklch(72% 0.14 145 / 0.15)"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="80"
                          cy="80"
                          r="52"
                          stroke="var(--leaf-green)"
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray="327"
                          strokeDashoffset="82"
                          strokeLinecap="round"
                        />
                        <defs>
                          <linearGradient id="circGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="oklch(75% 0.16 80)" />
                            <stop offset="100%" stopColor="oklch(88% 0.14 85)" />
                          </linearGradient>
                        </defs>
                      </svg>

                      <div className="circadian-ring-center">
                        <div ref={circValRef} className="circadian-ring-val">
                          14:32
                        </div>
                        <div className="circadian-ring-label">Growth Cycle</div>
                      </div>
                    </div>

                    <div className="circadian-phases">
                      <div className="phase-item">
                        <div className="phase-name">
                          <span
                            className="phase-dot"
                            style={{ background: "var(--gold-bright)" }}
                          />
                          Photonic
                        </div>
                        <div className="phase-val">16h active</div>
                      </div>

                      <div className="phase-item">
                        <div className="phase-name">
                          <span
                            className="phase-dot"
                            style={{ background: "oklch(55% 0.12 240)" }}
                          />
                          Rest phase
                        </div>
                        <div className="phase-val">8h dormant</div>
                      </div>

                      <div className="phase-item">
                        <div className="phase-name">
                          <span
                            className="phase-dot"
                            style={{ background: "var(--leaf-green)" }}
                          />
                          Chlorophyll
                        </div>
                        <div className="phase-val">Peak 98.2%</div>
                      </div>

                      <div className="phase-item">
                        <div className="phase-name">
                          <span
                            className="phase-dot"
                            style={{ background: "var(--gold-warm)" }}
                          />
                          Nutrient
                        </div>
                        <div className="phase-val">Auto-cycle</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="section-eyebrow">
                    <div className="leaf-stem" />
                    <span className="section-tag">Circadian Architecture</span>
                  </div>

                  <h2 className="section-title">
                    <span className="italic">Biological</span>
                    <br />
                    time-keeping
                  </h2>

                  <div className="amber-leak" />

                  <p className="section-body">
                    Synthetic circadian oscillators derived from cyanobacterial clock proteins regulate photosynthetic output across a 24-hour lunar equivalent cycle. Yield improvements of 340% over static-light agriculture.
                  </p>

                  <div className="regolith-stream mt-6">
                    {regolithItems.map((item) => (
                      <div className="regolith-item" key={item.name}>
                        <div className={`regolith-icon ${item.className}`}>
                          <Icon icon={item.icon} className="text-[18px]" />
                        </div>
                        <span className="regolith-name">{item.name}</span>
                        <span className="regolith-pct">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="rhizo-row center bloom-reveal bloom-d2">
                {cards.map((card, index) => (
                  <div
                    className={`bio-card ${index === 1 ? "translate-y-8" : ""}`}
                    key={card.title}
                  >
                    <div className="bio-card-glow" />
                    <div className="bio-card-icon" style={card.iconStyle as React.CSSProperties}>
                      <Icon icon={card.icon} className="text-[22px]" />
                    </div>
                    <div className="bio-card-title">
                      {card.title.split("\n").map((line) => (
                        <span key={line}>
                          {line}
                          <br />
                        </span>
                      ))}
                    </div>
                    <div className="bio-card-text">{card.text}</div>
                    <div className="metric-row">
                      <div>
                        <div className="metric-val">
                          {card.metric}
                          <span style={{ fontSize: "0.5em", color: "var(--gold-warm)" }}>
                            {card.metricSuffix}
                          </span>
                        </div>
                        <div className="metric-label">{card.metricLabel}</div>
                      </div>
                      <div className="flex-1">
                        <div className="progress-vine">
                          <div className="progress-vine-fill" style={{ width: card.progress }} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="cta-organism">
            <div className="cta-pod bloom-reveal">
              <div
                className="cta-glow-orb"
                style={{
                  width: "400px",
                  height: "400px",
                  background: "oklch(82% 0.13 88 / 0.1)",
                  top: "-150px",
                  left: "-100px",
                }}
              />
              <div
                className="cta-glow-orb"
                style={{
                  width: "250px",
                  height: "250px",
                  background: "oklch(72% 0.14 145 / 0.08)",
                  bottom: "-80px",
                  right: "10%",
                }}
              />

              <div>
                <div className="section-eyebrow mb-5">
                  <div className="leaf-stem" />
                  <span className="section-tag">Pioneer Programme</span>
                </div>

                <h2 className="cta-title">
                  Cultivate the
                  <br />
                  <span className="italic">next frontier</span>
                </h2>

                <p className="cta-body">
                  Join fourteen planetary research institutions currently piloting our astra-botanical systems. Applications for the 2026 lunar deployment cohort are now open.
                </p>

                <div className="flex flex-wrap gap-4">
                  <button className="cta-submit">Apply for Phase IV</button>
                  <button className="btn-dew">Download Prospectus</button>
                </div>
              </div>

              <div className="cta-form-side">
                <input className="field-input" type="text" placeholder="Organisation name" />
                <input className="field-input" type="email" placeholder="Research director email" />
                <select className="field-select" defaultValue="">
                  <option value="">Programme track…</option>
                  <option>Lunar Regolith Enrichment</option>
                  <option>Atmospheric Scrubbers</option>
                  <option>Circadian Growth Systems</option>
                  <option>Photosynthetic Optimisation</option>
                </select>
                <input className="field-input" type="text" placeholder="Deployment timeline (Earth years)" />
              </div>
            </div>
          </section>
        </div>

        <footer>
          <div className="footer-copy">
            © 2025 Terraform Industries. Advancing extraterrestrial life sciences.
          </div>
          <div className="footer-links">
            <a href="#">Research</a>
            <a href="#">Ethics</a>
            <a href="#">Partners</a>
            <a href="#">Contact</a>
          </div>
        </footer>
      </div>
    </>
  );
}