"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
  const [showPreloader, setShowPreloader] = useState(true);
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const trailRef = useRef<HTMLDivElement | null>(null);
  const scrollLineRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);
  const portalVideoRef = useRef<HTMLVideoElement | null>(null);
  const heroTextRef = useRef<HTMLDivElement | null>(null);
  const heroRef = useRef<HTMLElement | null>(null);
  const projectTrackRef = useRef<HTMLDivElement | null>(null);
  const circValRef = useRef<HTMLDivElement | null>(null);
  const c1Ref = useRef<HTMLSpanElement | null>(null);
  const c2Ref = useRef<HTMLSpanElement | null>(null);
  const c3Ref = useRef<HTMLSpanElement | null>(null);
  const preloaderTimerRef = useRef<number | null>(null);
  const projectIndexRef = useRef(0);
  const projectCardGap = 24;

  const tickerItems = [
    ["Atmospheric Equilibrium", "Biophilic Integration"],
    ["Carbon-Negative Structuralism", "Regenerative Ecosystems"],
    ["Living Facade Systems", "Hydro-Responsive Architecture"],
    ["Mycorrhizal Networks", "Atmospheric Equilibrium"],
  ];

  const pillarCards = [
    {
      tag: "01 · Atmosphere",
      title: "Atmospheric Equilibrium",
      text: "Every structure is calibrated to restore the thermal, hydrological, and gaseous balance of its immediate biome—a self-correcting climate engine embedded in form.",
      icon: "ph:star-four-light",
      color: "var(--amber)",
    },
    {
      tag: "02 · Biology",
      title: "Biophilic Integration",
      text: "Living systems do not ornament our buildings—they constitute them. Root structures, fungal webs, and photosynthetic surfaces are load-bearing elements of the new vernacular.",
      icon: "ph:leaf-light",
      color: "var(--sage)",
    },
    {
      tag: "03 · Carbon",
      title: "Carbon-Negative Structuralism",
      text: "Net negative from groundbreaking to centennial. Mass timber, hempcrete, and algae-seeded concrete sequester more than the entire construction footprint generates.",
      icon: "ph:bolt-light",
      color: "oklch(75% 0.1 340)",
    },
    {
      tag: "04 · Ecology",
      title: "Regenerative Ecosystems",
      text: "Each project increases local biodiversity by minimum 3×. Corridors of continuous habitat connect structure to landscape, so wildlife navigates the city as seamlessly as water.",
      icon: "ph:globe-light",
      color: "oklch(72% 0.1 250)",
    },
  ];

  const projectCards = [
    {
      kv: "Vertical Forest · 2024",
      title: "The Verdant Tower",
      loc: "Singapore, SG — 87 Storeys",
    },
    {
      kv: "Wetland Campus · 2024",
      title: "Aquifer House",
      loc: "Rotterdam, NL — 4.2 Ha",
    },
    {
      kv: "Desert Terraforming · 2023",
      title: "Dune Meridian",
      loc: "Al Ula, SA — 220 Ha",
    },
    {
      kv: "Urban Rewilding · 2023",
      title: "The Hollow City",
      loc: "Oslo, NO — 14 Districts",
    },
  ];

  useEffect(() => {
    preloaderTimerRef.current = window.setTimeout(() => {
      setShowPreloader(false);
    }, 1400);

    const cursor = cursorRef.current;
    const trail = trailRef.current;
    const scrollLine = scrollLineRef.current;
    const nav = navRef.current;
    const portalVideo = portalVideoRef.current;
    const heroText = heroTextRef.current;
    const hero = heroRef.current;
    const circVal = circValRef.current;
    const c1 = c1Ref.current;
    const c2 = c2Ref.current;
    const c3 = c3Ref.current;

    let mouseX = 0;
    let mouseY = 0;
    let trailX = 0;
    let trailY = 0;
    let ticking = false;

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

    const animateTrail = () => {
      trailX += (mouseX - trailX) * 0.12;
      trailY += (mouseY - trailY) * 0.12;
      if (trail) {
        trail.style.left = `${trailX}px`;
        trail.style.top = `${trailY}px`;
      }
      requestAnimationFrame(animateTrail);
    };

    const handleMouseDown = () => {
      if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(0.5)";
    };

    const handleMouseUp = () => {
      if (cursor) cursor.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const interactiveSelectors = ".btn-liquid, .cta-submit, .bio-card, .project-card, .metric-orb, a, button";
    const interactiveElements = document.querySelectorAll<HTMLElement>(interactiveSelectors);

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => {
        if (trail) {
          trail.style.width = "60px";
          trail.style.height = "60px";
        }
      });

      el.addEventListener("mouseleave", () => {
        if (trail) {
          trail.style.width = "40px";
          trail.style.height = "40px";
        }
      });

      el.addEventListener("mousemove", (ev) => {
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
        const maxScroll = document.body.scrollHeight - window.innerHeight || 1;
        const pct = (scrolled / maxScroll) * 100;

        if (scrollLine) scrollLine.style.width = `${pct}%`;

        if (nav) {
          nav.classList.toggle("scrolled", scrolled > 80);
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

    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );

    document.querySelectorAll(".reveal-up").forEach((el) => revealObserver.observe(el));

    const updateProjectTrack = () => {
      const track = projectTrackRef.current;
      if (!track) return;
      const firstCard = track.querySelector<HTMLElement>(".project-card");
      if (!firstCard) return;
      const cardWidth = firstCard.getBoundingClientRect().width;
      track.style.transform = `translateX(-${projectIndexRef.current * (cardWidth + projectCardGap)}px)`;
    };

    const handleResize = () => {
      updateProjectTrack();
    };

    updateProjectTrack();
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    const circTimer = window.setInterval(() => {
      if (!circVal) return;
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      circVal.textContent = `${h}:${m}`;
    }, 1000);

    let canvasCleanup: (() => void) | undefined;
    const canvas = document.getElementById("dust") as HTMLCanvasElement | null;
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

        const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

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

        const drawDust = () => {
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

          requestAnimationFrame(drawDust);
        };

        drawDust();

        canvasCleanup = () => {
          window.removeEventListener("resize", resizeCanvas);
        };
      }
    }

    if (portalVideo) {
      const fallback = document.getElementById("lp-fallback");
      const handleCanPlay = () => {
        if (fallback) {
          fallback.style.opacity = "0";
          fallback.style.transition = "opacity 1s";
        }
      };
      const handleError = () => {
        portalVideo.style.display = "none";
      };

      portalVideo.addEventListener("canplay", handleCanPlay);
      portalVideo.addEventListener("error", handleError);

      return () => {
        if (preloaderTimerRef.current) window.clearTimeout(preloaderTimerRef.current);
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mousedown", handleMouseDown);
        window.removeEventListener("mouseup", handleMouseUp);
        window.removeEventListener("scroll", handleScroll);
        window.removeEventListener("resize", handleResize);
        window.clearInterval(circTimer);
        heroObserver.disconnect();
        revealObserver.disconnect();
        portalVideo.removeEventListener("canplay", handleCanPlay);
        portalVideo.removeEventListener("error", handleError);
        canvasCleanup?.();
      };
    }

    return () => {
      if (preloaderTimerRef.current) window.clearTimeout(preloaderTimerRef.current);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      window.clearInterval(circTimer);
      heroObserver.disconnect();
      revealObserver.disconnect();
      canvasCleanup?.();
    };
  }, []);

  const moveProjects = (direction: number) => {
    const track = projectTrackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>(".project-card");
    if (!firstCard) return;
    const maxIndex = Math.max(projectCards.length - 2, 0);

    projectIndexRef.current = Math.min(
      Math.max(projectIndexRef.current + direction, 0),
      maxIndex
    );

    const cardWidth = firstCard.getBoundingClientRect().width;
    track.style.transform = `translateX(-${projectIndexRef.current * (cardWidth + projectCardGap)}px)`;
  };

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Instrument+Serif:ital@0;1&family=Syne:wght@300;400;500;600;700;800&family=Space+Grotesk:wght@300;400;500;600&display=swap");

        :root {
          --amber: oklch(85% 0.1 45);
          --amber-glow: oklch(80% 0.12 42 / 0.4);
          --rose: oklch(75% 0.1 340);
          --rose-glow: oklch(75% 0.1 340 / 0.25);
          --sage: oklch(72% 0.08 160);
          --sage-glow: oklch(72% 0.08 160 / 0.2);
          --pearl: oklch(96% 0.02 80);
          --deep: oklch(12% 0.02 260);
          --midnight: oklch(8% 0.015 260);
          --text-primary: oklch(94% 0.01 60);
          --text-secondary: oklch(78% 0.02 50);
          --text-muted: oklch(60% 0.02 50);
          --glass-bg: oklch(18% 0.03 260 / 0.55);
          --glass-border: oklch(85% 0.05 60 / 0.12);
          --glass-border-hover: oklch(85% 0.08 45 / 0.3);
          --serif: "DM Serif Display", serif;
          --serif-alt: "Instrument Serif", serif;
          --sans: "Syne", sans-serif;
          --data: "Space Grotesk", sans-serif;
        }

        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        body {
          background: var(--midnight);
          color: var(--text-primary);
          font-family: var(--sans);
          min-height: 100vh;
          overflow-x: hidden;
          cursor: none;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        ::-webkit-scrollbar {
          width: 3px;
        }

        ::-webkit-scrollbar-track {
          background: transparent;
        }

        ::-webkit-scrollbar-thumb {
          background: oklch(85% 0.08 45 / 0.4);
          border-radius: 99px;
        }

        .cursor {
          position: fixed;
          width: 12px;
          height: 12px;
          background: var(--amber);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.1s ease, width 0.3s ease, height 0.3s ease, opacity 0.3s ease;
          mix-blend-mode: screen;
        }

        .cursor-trail {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 1px solid oklch(85% 0.1 45 / 0.3);
          border-radius: 50%;
          pointer-events: none;
          z-index: 9998;
          transform: translate(-50%, -50%);
          transition: transform 0.25s ease, width 0.4s ease, height 0.4s ease;
        }

        .hero {
          position: relative;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .video-portal {
          position: absolute;
          inset: 0;
          z-index: 0;
        }

        .video-portal video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: brightness(0.75);
        }

        .video-portal::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 100% at 50% 60%, transparent 45%, var(--midnight) 92%);
          pointer-events: none;
        }

        .atmospheric-mask {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 75vw;
          height: 65vh;
          z-index: 1;
          border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%;
          mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 75%);
          -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 40%, transparent 75%);
          animation: blob-drift 18s ease-in-out infinite;
          overflow: hidden;
        }

        .atmospheric-mask video {
          width: 130%;
          height: 130%;
          object-fit: cover;
          margin: -15%;
        }

        @keyframes blob-drift {
          0%,
          100% {
            border-radius: 60% 40% 55% 45% / 45% 55% 40% 60%;
            transform: translate(-50%, -50%) scale(1);
          }
          33% {
            border-radius: 40% 60% 45% 55% / 55% 40% 65% 35%;
            transform: translate(-50%, -50%) scale(1.03);
          }
          66% {
            border-radius: 55% 45% 60% 40% / 40% 65% 35% 60%;
            transform: translate(-50%, -50%) scale(0.97);
          }
        }

        .light-corridor {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background: radial-gradient(ellipse at 50% 50%, oklch(85% 0.08 30 / 0.18) 0%, oklch(75% 0.1 340 / 0.07) 40%, transparent 80%);
        }

        .hero-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 900px;
          padding: 0 2rem;
        }

        .hero-eyebrow,
        .hero-title,
        .hero-subtitle,
        .hero-cta-group,
        .scroll-hint {
          opacity: 0;
        }

        .hero-eyebrow {
          font-family: var(--data);
          font-size: 0.72rem;
          font-weight: 400;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 2rem;
          animation: fade-rise 1.2s 0.4s ease forwards;
        }

        .hero-title {
          font-family: var(--serif);
          font-size: clamp(3.2rem, 8vw, 8rem);
          line-height: 0.9;
          margin-bottom: 1.5rem;
          animation: fade-rise 1.4s 0.6s ease forwards;
        }

        .hero-title em {
          font-style: italic;
          color: var(--amber);
          display: block;
        }

        .hero-subtitle {
          font-family: var(--data);
          font-size: 0.9rem;
          font-weight: 300;
          color: var(--text-secondary);
          letter-spacing: 0.08em;
          max-width: 480px;
          margin: 0 auto 3rem;
          line-height: 1.7;
          animation: fade-rise 1.4s 0.9s ease forwards;
        }

        .hero-cta-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1.5rem;
          animation: fade-rise 1.2s 1.2s ease forwards;
        }

        .btn-liquid {
          position: relative;
          padding: 1rem 2.5rem;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          border: 1px solid var(--glass-border-hover);
          background: oklch(85% 0.08 45 / 0.08);
          color: var(--text-primary);
          font-family: var(--data);
          font-size: 0.82rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          cursor: none;
          overflow: hidden;
          transition: border-radius 0.6s ease, border-color 0.3s ease, background 0.3s ease;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
        }

        .btn-liquid::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mx, 50%) var(--my, 50%), oklch(85% 0.1 45 / 0.25) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .btn-liquid::after {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: conic-gradient(transparent 30%, oklch(85% 0.1 45 / 0.15) 40%, transparent 50%);
          animation: shimmer-spin 4s linear infinite;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .btn-liquid:hover {
          border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
          border-color: oklch(85% 0.1 45 / 0.5);
          background: oklch(85% 0.08 45 / 0.15);
        }

        .btn-liquid:hover::before,
        .btn-liquid:hover::after {
          opacity: 1;
        }

        @keyframes shimmer-spin {
          to {
            transform: rotate(360deg);
          }
        }

        .btn-ghost {
          padding: 1rem 2rem;
          background: transparent;
          border: none;
          color: var(--text-muted);
          font-family: var(--data);
          font-size: 0.82rem;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: none;
          transition: color 0.3s ease;
          text-decoration: none;
        }

        .btn-ghost:hover {
          color: var(--text-secondary);
        }

        @keyframes fade-rise {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .scroll-hint {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.75rem;
          animation: fade-rise 1s 2s ease forwards;
        }

        .scroll-hint span {
          font-family: var(--data);
          font-size: 0.65rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .scroll-line {
          width: 1px;
          height: 48px;
          background: linear-gradient(to bottom, var(--amber-glow), transparent);
          animation: scroll-pulse 2s ease-in-out infinite;
        }

        @keyframes scroll-pulse {
          0%,
          100% {
            opacity: 0.3;
            transform: scaleY(1);
          }
          50% {
            opacity: 1;
            transform: scaleY(1.2);
          }
        }

        nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          padding: 1.75rem 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          transition: background 0.5s ease, backdrop-filter 0.5s ease, border-color 0.5s ease;
        }

        nav.scrolled {
          background: oklch(10% 0.02 260 / 0.7);
          backdrop-filter: blur(20px) saturate(1.2);
          border-bottom: 1px solid var(--glass-border);
        }

        .nav-logo {
          font-family: var(--serif);
          font-size: 1.2rem;
          color: var(--text-primary);
          letter-spacing: 0.02em;
          text-decoration: none;
        }

        .nav-logo span {
          color: var(--amber);
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 3rem;
          list-style: none;
        }

        .nav-links a {
          font-family: var(--data);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 0.3s ease;
          position: relative;
        }

        .nav-links a::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          right: 0;
          height: 1px;
          background: var(--amber);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }

        .nav-links a:hover {
          color: var(--text-primary);
        }

        .nav-links a:hover::after {
          transform: scaleX(1);
        }

        .section-divider {
          height: 1px;
          background: radial-gradient(ellipse 60% 100% at 50% 50%, oklch(85% 0.1 45 / 0.4), transparent);
          margin: 0 8vw;
        }

        section {
          padding: 8rem 0;
        }

        .container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 4rem;
        }

        .section-label {
          font-family: var(--data);
          font-size: 0.65rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1rem;
        }

        .manifesto {
          background: transparent;
          position: relative;
        }

        .manifesto::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 70vw;
          height: 100%;
          background: radial-gradient(ellipse 100% 80% at 50% 30%, oklch(85% 0.08 45 / 0.06), transparent 70%);
          pointer-events: none;
        }

        .manifesto-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 8rem;
          align-items: center;
        }

        .manifesto-text h2 {
          font-family: var(--serif);
          font-size: clamp(2.4rem, 4vw, 4.2rem);
          line-height: 1.05;
          margin-bottom: 2rem;
        }

        .manifesto-text h2 em {
          font-style: italic;
          color: oklch(80% 0.1 340);
        }

        .manifesto-text p {
          font-family: var(--data);
          font-size: 0.92rem;
          font-weight: 300;
          line-height: 1.85;
          color: var(--text-secondary);
          margin-bottom: 1.5rem;
        }

        .manifesto-metrics {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .metric-orb {
          padding: 2.5rem 2rem;
          border-radius: 40% 60% 55% 45% / 50% 40% 60% 50%;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          backdrop-filter: blur(20px);
          text-align: center;
          transition: border-radius 0.8s ease, border-color 0.4s ease, transform 0.4s ease;
          animation: float-orb var(--dur, 6s) ease-in-out infinite;
          animation-delay: var(--delay, 0s);
        }

        .metric-orb:hover {
          border-radius: 60% 40% 45% 55% / 40% 60% 50% 60%;
          border-color: oklch(85% 0.1 45 / 0.35);
          transform: translateY(-4px);
        }

        @keyframes float-orb {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .metric-value {
          font-family: var(--serif);
          font-size: 3rem;
          color: var(--amber);
          line-height: 1;
          margin-bottom: 0.5rem;
        }

        .metric-value span {
          font-size: 1.4rem;
        }

        .metric-label {
          font-family: var(--data);
          font-size: 0.72rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .pillars {
          padding: 8rem 0;
          position: relative;
        }

        .pillars::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 60% at 20% 50%, oklch(72% 0.08 160 / 0.06), transparent 60%),
            radial-gradient(ellipse 60% 80% at 80% 60%, oklch(75% 0.1 340 / 0.05), transparent 60%);
          pointer-events: none;
        }

        .pillars-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .pillars-header h2 {
          font-family: var(--serif);
          font-size: clamp(2rem, 3.5vw, 3.5rem);
          line-height: 1.1;
        }

        .pillars-header h2 em {
          font-style: italic;
          color: var(--sage);
        }

        .pillars-header p {
          font-family: var(--data);
          font-size: 0.9rem;
          font-weight: 300;
          color: var(--text-muted);
          max-width: 500px;
          margin: 1.5rem auto 0;
          line-height: 1.7;
        }

        .pillars-flow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }

        .pillar-card {
          padding: 3rem 2rem;
          position: relative;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          background: oklch(16% 0.02 260 / 0.6);
          border: 1px solid var(--glass-border);
          margin: 0.75rem;
          backdrop-filter: blur(16px);
          transition: border-radius 0.9s ease, transform 0.4s ease, background 0.4s ease, border-color 0.4s ease;
          overflow: hidden;
        }

        .pillar-card::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, var(--card-glow, oklch(85% 0.1 45 / 0.1)) 0%, transparent 60%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .pillar-card:hover {
          border-radius: 60% 40% 30% 70% / 50% 60% 40% 50%;
          transform: translateY(-8px) rotate(-0.5deg);
          background: oklch(18% 0.03 260 / 0.75);
          border-color: var(--glass-border-hover);
        }

        .pillar-card:hover::before {
          opacity: 1;
        }

        .pillar-card:nth-child(2) {
          --card-glow: oklch(72% 0.08 160 / 0.12);
        }

        .pillar-card:nth-child(3) {
          --card-glow: oklch(75% 0.1 340 / 0.1);
        }

        .pillar-card:nth-child(4) {
          --card-glow: oklch(75% 0.12 250 / 0.1);
        }

        .pillar-icon {
          width: 48px;
          height: 48px;
          margin-bottom: 1.75rem;
          border-radius: 50%;
          background: oklch(85% 0.08 45 / 0.08);
          border: 1px solid var(--glass-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pillar-icon svg {
          width: 22px;
          height: 22px;
          stroke-width: 1.5;
        }

        .pillar-tag {
          font-family: var(--data);
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 0.75rem;
        }

        .pillar-title {
          font-family: var(--serif-alt);
          font-size: 1.4rem;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }

        .pillar-body {
          font-family: var(--data);
          font-size: 0.82rem;
          line-height: 1.8;
          color: var(--text-muted);
          font-weight: 300;
        }

        .projects {
          padding: 8rem 0;
          position: relative;
        }

        .projects-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          margin-bottom: 4rem;
        }

        .projects-header h2 {
          font-family: var(--serif);
          font-size: clamp(2.2rem, 3.5vw, 3.8rem);
          line-height: 1;
          max-width: 500px;
        }

        .projects-header h2 em {
          font-style: italic;
          color: var(--amber);
        }

        .projects-nav {
          display: flex;
          gap: 0.75rem;
        }

        .proj-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: transparent;
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          cursor: none;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: border-color 0.3s ease, background 0.3s ease, color 0.3s ease;
          font-size: 1.1rem;
        }

        .proj-btn:hover {
          border-color: var(--glass-border-hover);
          background: oklch(85% 0.08 45 / 0.08);
          color: var(--text-primary);
        }

        .projects-track-wrapper {
          overflow: hidden;
        }

        .projects-track {
          display: flex;
          gap: 1.5rem;
          transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .project-card {
          flex: 0 0 calc(50% - 0.75rem);
          border-radius: 40% 60% 50% 50% / 50% 40% 60% 50%;
          overflow: hidden;
          position: relative;
          aspect-ratio: 16 / 10;
          transition: border-radius 0.9s ease, transform 0.5s ease;
          background: oklch(15% 0.03 260);
          border: 1px solid var(--glass-border);
          cursor: none;
        }

        .project-card:hover {
          border-radius: 55% 45% 40% 60% / 40% 60% 50% 50%;
          transform: scale(1.02);
        }

        .project-bg {
          position: absolute;
          inset: 0;
          background: var(--project-bg);
          filter: saturate(1.2) brightness(0.6);
          transition: filter 0.5s ease, transform 0.7s ease;
        }

        .project-card:hover .project-bg {
          filter: saturate(1.4) brightness(0.7);
          transform: scale(1.05);
        }

        .project-card:nth-child(1) {
          --project-bg: radial-gradient(ellipse at 30% 60%, oklch(65% 0.15 160), oklch(20% 0.05 200));
        }

        .project-card:nth-child(2) {
          --project-bg: radial-gradient(ellipse at 70% 40%, oklch(60% 0.12 340), oklch(18% 0.04 280));
        }

        .project-card:nth-child(3) {
          --project-bg: radial-gradient(ellipse at 50% 70%, oklch(70% 0.1 45), oklch(20% 0.06 260));
        }

        .project-card:nth-child(4) {
          --project-bg: radial-gradient(ellipse at 40% 50%, oklch(55% 0.1 250), oklch(15% 0.04 280));
        }

        .project-info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 2.5rem;
          background: linear-gradient(to top, oklch(8% 0.02 260 / 0.9) 0%, transparent 100%);
        }

        .project-kv {
          font-family: var(--data);
          font-size: 0.62rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: var(--amber);
          margin-bottom: 0.6rem;
        }

        .project-title {
          font-family: var(--serif);
          font-size: 1.8rem;
          margin-bottom: 0.4rem;
        }

        .project-loc {
          font-family: var(--data);
          font-size: 0.78rem;
          color: var(--text-muted);
          letter-spacing: 0.08em;
        }

        .data-strip {
          padding: 5rem 0;
          position: relative;
          overflow: hidden;
        }

        .data-strip::before {
          content: "";
          position: absolute;
          inset: 0;
          background: oklch(14% 0.025 260 / 0.8);
          backdrop-filter: blur(2px);
        }

        .data-strip::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: radial-gradient(ellipse 50% 100% at 50% 0%, oklch(85% 0.1 45 / 0.3), transparent);
        }

        .data-row {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 1px;
        }

        .data-cell {
          padding: 2.5rem 2rem;
          text-align: center;
          border-right: 1px solid var(--glass-border);
          position: relative;
        }

        .data-cell:last-child {
          border-right: none;
        }

        .data-cell-num {
          font-family: var(--serif);
          font-size: 2.8rem;
          color: var(--text-primary);
          line-height: 1;
          margin-bottom: 0.4rem;
        }

        .data-cell-num span {
          font-size: 1.4rem;
          color: var(--amber);
        }

        .data-cell-label {
          font-family: var(--data);
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .philosophy {
          padding: 8rem 0;
          position: relative;
        }

        .philosophy::before {
          content: "";
          position: absolute;
          right: -20%;
          top: 10%;
          width: 60vw;
          height: 60vw;
          border-radius: 50%;
          background: radial-gradient(circle, oklch(75% 0.1 340 / 0.04) 0%, transparent 65%);
          pointer-events: none;
        }

        .philosophy-inner {
          display: grid;
          grid-template-columns: 2fr 3fr;
          gap: 8rem;
          align-items: start;
        }

        .philosophy-sticky {
          position: sticky;
          top: 10rem;
        }

        .philosophy-sticky h2 {
          font-family: var(--serif);
          font-size: clamp(2rem, 3vw, 3.2rem);
          line-height: 1.05;
          margin-bottom: 2rem;
        }

        .philosophy-sticky h2 em {
          font-style: italic;
          color: oklch(80% 0.1 340);
        }

        .philosophy-sticky p {
          font-family: var(--data);
          font-size: 0.85rem;
          font-weight: 300;
          line-height: 1.8;
          color: var(--text-secondary);
          margin-bottom: 2.5rem;
        }

        .phil-line-item {
          display: flex;
          gap: 1.25rem;
          align-items: start;
          padding: 2rem 0;
          border-top: 1px solid var(--glass-border);
          position: relative;
        }

        .phil-line-item::after {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: radial-gradient(ellipse 30% 100% at 50% 0%, oklch(85% 0.1 45 / 0.25), transparent);
        }

        .phil-number {
          font-family: var(--serif-alt);
          font-size: 1rem;
          color: var(--amber);
          font-style: italic;
          min-width: 2rem;
          margin-top: 0.1rem;
        }

        .phil-content h3 {
          font-family: var(--sans);
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          letter-spacing: 0.02em;
        }

        .phil-content p {
          font-family: var(--data);
          font-size: 0.82rem;
          line-height: 1.75;
          color: var(--text-muted);
          font-weight: 300;
        }

        .ecology-ticker {
          padding: 2.5rem 0;
          overflow: hidden;
          position: relative;
          border-top: 1px solid var(--glass-border);
          border-bottom: 1px solid var(--glass-border);
        }

        .ecology-ticker::before,
        .ecology-ticker::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 15vw;
          z-index: 2;
        }

        .ecology-ticker::before {
          left: 0;
          background: linear-gradient(to right, var(--midnight), transparent);
        }

        .ecology-ticker::after {
          right: 0;
          background: linear-gradient(to left, var(--midnight), transparent);
        }

        .ticker-inner {
          display: flex;
          gap: 4rem;
          animation: ticker 30s linear infinite;
          white-space: nowrap;
        }

        .ticker-item {
          display: flex;
          align-items: center;
          gap: 1rem;
          font-family: var(--data);
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--text-muted);
        }

        .ticker-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: var(--amber);
          flex-shrink: 0;
        }

        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .contact-section {
          padding: 10rem 0 8rem;
          position: relative;
          text-align: center;
        }

        .contact-section::before {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse 80% 100% at 50% 50%, oklch(85% 0.08 45 / 0.05), transparent 70%);
        }

        .contact-eyebrow {
          font-family: var(--data);
          font-size: 0.68rem;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 1.5rem;
        }

        .contact-h {
          font-family: var(--serif);
          font-size: clamp(3rem, 6vw, 6.5rem);
          line-height: 0.95;
          margin-bottom: 2.5rem;
          position: relative;
          z-index: 1;
        }

        .contact-h em {
          font-style: italic;
          color: var(--amber);
        }

        .contact-sub {
          font-family: var(--data);
          font-size: 0.9rem;
          color: var(--text-muted);
          max-width: 420px;
          margin: 0 auto 3.5rem;
          line-height: 1.7;
          font-weight: 300;
        }

        .contact-form {
          max-width: 560px;
          margin: 0 auto;
          display: grid;
          gap: 1rem;
          position: relative;
          z-index: 1;
        }

        .input-shell {
          position: relative;
        }

        .input-shell input,
        .input-shell textarea {
          width: 100%;
          padding: 1.2rem 1.75rem;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          background: oklch(16% 0.025 260 / 0.6);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          font-family: var(--data);
          font-size: 0.88rem;
          outline: none;
          transition: border-radius 0.6s ease, border-color 0.3s ease, background 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .input-shell textarea {
          resize: none;
          height: 120px;
          border-radius: 30% 70% 50% 50% / 50% 30% 70% 50%;
        }

        .input-shell input::placeholder,
        .input-shell textarea::placeholder {
          color: var(--text-muted);
          letter-spacing: 0.08em;
          font-size: 0.82rem;
        }

        .input-shell input:focus {
          border-radius: 60% 40% 30% 70% / 50% 60% 40% 60%;
          border-color: oklch(85% 0.1 45 / 0.4);
          background: oklch(18% 0.03 260 / 0.7);
        }

        .input-shell textarea:focus {
          border-radius: 50% 50% 60% 40% / 40% 60% 50% 50%;
          border-color: oklch(85% 0.1 45 / 0.4);
          background: oklch(18% 0.03 260 / 0.7);
        }

        footer {
          padding: 3rem 4rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-top: 1px solid var(--glass-border);
        }

        .footer-logo {
          font-family: var(--serif);
          font-size: 1.1rem;
          color: var(--text-muted);
        }

        .footer-logo span {
          color: var(--amber);
        }

        .footer-copy {
          font-family: var(--data);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          color: oklch(40% 0.01 60);
        }

        .footer-links {
          display: flex;
          gap: 2rem;
          list-style: none;
        }

        .footer-links a {
          font-family: var(--data);
          font-size: 0.7rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: oklch(40% 0.01 60);
          text-decoration: none;
          transition: color 0.3s;
        }

        .footer-links a:hover {
          color: var(--text-muted);
        }

        .breeze-word {
          display: inline-block;
          transition: transform 0.1s ease;
        }

        .reveal-up {
          opacity: 0;
          transform: translateY(40px);
          transition: opacity 0.9s ease, transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal-up.visible {
          opacity: 1;
          transform: none;
        }

        .ambient-orbs {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          overflow: hidden;
        }

        .amb-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          animation: orb-drift var(--dur) ease-in-out infinite;
          animation-delay: var(--delay);
        }

        @keyframes orb-drift {
          0%,
          100% {
            transform: translate(0, 0);
          }
          33% {
            transform: translate(80px, 60px);
          }
          66% {
            transform: translate(-40px, 120px);
          }
        }

        .preloader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: var(--midnight);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: opacity 0.8s ease;
        }

        .preloader.hidden {
          opacity: 0;
          pointer-events: none;
        }

        .pre-logo {
          font-family: var(--serif);
          font-size: 2rem;
          animation: pre-pulse 1.5s ease-in-out infinite;
        }

        .pre-logo em {
          color: var(--amber);
          font-style: italic;
        }

        @keyframes pre-pulse {
          0%,
          100% {
            opacity: 0.3;
          }
          50% {
            opacity: 1;
          }
        }

        .grain-overlay {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 200px 200px;
        }

        @media (max-width: 1100px) {
          .manifesto-grid,
          .philosophy-inner {
            grid-template-columns: 1fr;
          }

          .pillars-flow {
            grid-template-columns: repeat(2, 1fr);
          }

          .data-row {
            grid-template-columns: repeat(2, 1fr);
          }

          .project-card {
            flex-basis: calc(100% - 0.75rem);
          }

          .projects-header {
            align-items: flex-start;
            flex-direction: column;
            gap: 1rem;
          }

          nav {
            padding: 1.25rem 1.5rem;
          }

          .nav-links {
            display: none;
          }
        }

        @media (max-width: 720px) {
          section {
            padding: 5rem 0;
          }

          .container {
            padding: 0 1.25rem;
          }

          .pillars-flow,
          .manifesto-metrics {
            grid-template-columns: 1fr;
          }

          .data-row {
            grid-template-columns: 1fr;
          }

          .philosophy-sticky {
            position: static;
          }

          .footer-links {
            flex-wrap: wrap;
            gap: 1rem;
          }

          footer {
            padding: 2rem 1.25rem;
            flex-direction: column;
            align-items: flex-start;
          }

          .hero-cta-group {
            flex-direction: column;
          }

          .hero-content {
            padding: 0 1rem;
          }
        }
      `}</style>

      {showPreloader && (
        <div className="preloader" id="preloader">
          <div className="pre-logo">
            The Line <em>&</em> Living
          </div>
        </div>
      )}

      <div className="grain-overlay" />
      <div className="ambient-orbs">
        <div
          className="amb-orb"
          style={{
            width: 600,
            height: 600,
            top: -200,
            left: -150,
            background: "oklch(72% 0.08 160 / 0.03)",
            ["--dur" as any]: "22s",
            ["--delay" as any]: "0s",
          }}
        />
        <div
          className="amb-orb"
          style={{
            width: 500,
            height: 500,
            bottom: -100,
            right: -100,
            background: "oklch(75% 0.1 340 / 0.04)",
            ["--dur" as any]: "28s",
            ["--delay" as any]: "-8s",
          }}
        />
        <div
          className="amb-orb"
          style={{
            width: 400,
            height: 400,
            top: "40%",
            left: "60%",
            background: "oklch(85% 0.08 45 / 0.025)",
            ["--dur" as any]: "18s",
            ["--delay" as any]: "-4s",
          }}
        />
      </div>

      <div ref={cursorRef} className="cursor" aria-hidden="true" />
      <div ref={trailRef} className="cursor-trail" aria-hidden="true" />

      <nav ref={navRef} id="mainNav">
        <a href="#" className="nav-logo">
          The Line <span>|</span> Living Architecture
        </a>

        <ul className="nav-links">
          <li><a href="#manifesto">Philosophy</a></li>
          <li><a href="#pillars">Pillars</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <a href="#contact" className="btn-liquid" style={{ padding: "0.7rem 1.5rem", fontSize: "0.7rem" }}>
          Inquire
        </a>
      </nav>

      <section ref={heroRef} className="hero">
        <div className="video-portal">
          <video autoPlay muted loop playsInline>
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="atmospheric-mask">
          <video autoPlay muted loop playsInline>
            <source src="/video.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="light-corridor" />

        <div ref={heroTextRef} className="hero-content">
          <div className="hero-eyebrow">Atmospheric Equilibrium · Biophilic Integration · Est. 2024</div>
          <h1 className="hero-title">
            Living
            <em>Architecture</em>
          </h1>
          <p className="hero-subtitle">
            Where carbon-negative structuralism meets the quiet rhythm of regenerative ecosystems. Buildings that breathe.
          </p>
          <div className="hero-cta-group">
            <a href="#manifesto" className="btn-liquid">
              <Icon icon="ph:arrow-down-light" className="text-lg" />
              Explore Doctrine
            </a>
            <a href="#projects" className="btn-ghost">
              View Projects →
            </a>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      <div className="section-divider" />

      <section className="manifesto" id="manifesto">
        <div className="container">
          <div className="manifesto-grid">
            <div className="manifesto-text reveal-up">
              <div className="section-label">Our Philosophy</div>
              <h2>
                Structure is
                <br />
                <em>ecology</em>, not
                <br />
                its antonym
              </h2>
              <p>
                In the symbiosis of biophilic integration and engineered living systems, we find a new grammar of form—where every facade is a lung, every surface a meadow in waiting. The atmosphere is not a byproduct of construction. It is the material itself.
              </p>
              <p>
                The Line operates at the intersection of atmospheric equilibrium and carbon-negative structuralism, designing environments that actively sequester, regenerate, and return.
              </p>
              <a href="#pillars" className="btn-liquid" style={{ marginTop: "1rem" }}>
                Our Principles
              </a>
            </div>

            <div className="manifesto-metrics reveal-up">
              <div className="metric-orb" style={{ ["--dur" as any]: "7s", ["--delay" as any]: "0s" }}>
                <div className="metric-value">
                  −94<span>%</span>
                </div>
                <div className="metric-label">Carbon Reduction</div>
              </div>
              <div className="metric-orb" style={{ ["--dur" as any]: "8s", ["--delay" as any]: "-2s" }}>
                <div className="metric-value">
                  3.2<span>×</span>
                </div>
                <div className="metric-label">Biodiversity Index</div>
              </div>
              <div className="metric-orb" style={{ ["--dur" as any]: "6s", ["--delay" as any]: "-1s" }}>
                <div className="metric-value">
                  180<span>k</span>
                </div>
                <div className="metric-label">Species Restored</div>
              </div>
              <div className="metric-orb" style={{ ["--dur" as any]: "9s", ["--delay" as any]: "-3s" }}>
                <div className="metric-value">
                  47<span>%</span>
                </div>
                <div className="metric-label">Water Regenerated</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="ecology-ticker">
        <div className="ticker-inner">
          {[...tickerItems, ...tickerItems].map((item, index) => (
            <div className="ticker-item" key={`${item[0]}-${item[1]}-${index}`}>
              <div className="ticker-dot" />
              <span>{item[0]}</span>
              <span>{item[1]}</span>
            </div>
          ))}
        </div>
      </div>

      <section className="pillars" id="pillars">
        <div className="container">
          <div className="pillars-header reveal-up">
            <div className="section-label">The Four Pillars</div>
            <h2>
              Doctrine of <em>Living</em> Form
            </h2>
            <p>
              Four principles that form the backbone of every intervention—from single dwellings to the terraforming of entire urban districts.
            </p>
          </div>

          <div className="pillars-flow">
            {pillarCards.map((card) => (
              <div className="pillar-card reveal-up" key={card.title}>
                <div className="pillar-icon">
                  <Icon icon={card.icon} className="text-[22px]" style={{ color: card.color }} />
                </div>
                <div className="pillar-tag">{card.tag}</div>
                <div className="pillar-title">{card.title}</div>
                <p className="pillar-body">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="data-strip">
        <div className="container">
          <div className="data-row">
            <div className="data-cell">
              <div className="data-cell-num">
                28<span>+</span>
              </div>
              <div className="data-cell-label">Projects Realised</div>
            </div>
            <div className="data-cell">
              <div className="data-cell-num">
                14<span>mn</span>
              </div>
              <div className="data-cell-label">m² of Living Surface</div>
            </div>
            <div className="data-cell">
              <div className="data-cell-num">
                430<span>k</span>
              </div>
              <div className="data-cell-label">Tonnes CO₂ Sequestered</div>
            </div>
            <div className="data-cell">
              <div className="data-cell-num">
                62<span>+</span>
              </div>
              <div className="data-cell-label">Species Re-established</div>
            </div>
            <div className="data-cell">
              <div className="data-cell-num">
                9<span>×</span>
              </div>
              <div className="data-cell-label">Industry Water Efficiency</div>
            </div>
          </div>
        </div>
      </div>

      <section className="projects" id="projects">
        <div className="container">
          <div className="projects-header reveal-up">
            <h2>
              Selected
              <br />
              <em>Works</em>
            </h2>
            <div className="projects-nav">
              <button className="proj-btn" onClick={() => moveProjects(-1)} aria-label="Previous project">
                <Icon icon="ph:arrow-left-light" />
              </button>
              <button className="proj-btn" onClick={() => moveProjects(1)} aria-label="Next project">
                <Icon icon="ph:arrow-right-light" />
              </button>
            </div>
          </div>

          <div className="projects-track-wrapper">
            <div className="projects-track" ref={projectTrackRef}>
              {projectCards.map((card) => (
                <div className="project-card" key={card.title}>
                  <div className="project-bg" />
                  <div className="project-info">
                    <div className="project-kv">{card.kv}</div>
                    <div className="project-title">{card.title}</div>
                    <div className="project-loc">{card.loc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" style={{ margin: "2rem 8vw" }} />

      <section className="philosophy" id="philosophy">
        <div className="container">
          <div className="philosophy-inner">
            <div className="philosophy-sticky reveal-up">
              <div className="section-label">Design Doctrine</div>
              <h2>
                The quiet <em>intelligence</em> of organic form
              </h2>
              <p>
                The built environment of the 21st century must not merely coexist with the living world. It must be indistinguishable from it.
              </p>
              <a href="#contact" className="btn-liquid">
                Begin a Project
              </a>
            </div>

            <div>
              <div className="phil-line-item reveal-up">
                <div className="phil-number">I</div>
                <div className="phil-content">
                  <h3>No form without ecological purpose</h3>
                  <p>
                    Every curve, every aperture, every structural decision is evaluated first by its ecological contribution. Aesthetics and function are inseparable from biological performance.
                  </p>
                </div>
              </div>

              <div className="phil-line-item reveal-up">
                <div className="phil-number">II</div>
                <div className="phil-content">
                  <h3>The building as a living organism</h3>
                  <p>
                    Our structures inhale, metabolise, and exhale. Moisture cycles, nutrient flows, and photosynthetic activity are integrated into the mechanical and structural systems at the design phase—not applied as afterthought.
                  </p>
                </div>
              </div>

              <div className="phil-line-item reveal-up">
                <div className="phil-number">III</div>
                <div className="phil-content">
                  <h3>Luxury is regeneration, not consumption</h3>
                  <p>
                    The highest expression of design is a space that grows more beautiful, more biodiverse, and more efficient with each passing decade. A building that improves the world is the only true luxury.
                  </p>
                </div>
              </div>

              <div className="phil-line-item reveal-up">
                <div className="phil-number">IV</div>
                <div className="phil-content">
                  <h3>Rhizomatic urbanism</h3>
                  <p>
                    Cities are networks, not nodes. Every intervention we design strengthens the connective tissue of urban ecosystems—mycelial infrastructure, pollinator corridors, and hydrological webs that treat the metropolis as a single, continuous biome.
                  </p>
                </div>
              </div>

              <div className="phil-line-item reveal-up">
                <div className="phil-number">V</div>
                <div className="phil-content">
                  <h3>Atmospheric stewardship</h3>
                  <p>
                    We are accountable to the air. Particulate capture, humidity regulation, and the reduction of the urban heat island are not ambitious extras. They are the minimum viable standard for any structure bearing The Line insignia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      <section className="contact-section" id="contact">
        <div className="container">
          <div className="contact-eyebrow">Begin Collaboration</div>
          <h2 className="contact-h reveal-up">
            Shape the
            <br />
            <em>Living</em> World
          </h2>
          <p className="contact-sub reveal-up">
            We work with clients who understand that the greatest act of luxury is leaving the earth more alive than you found it.
          </p>

          <div className="contact-form reveal-up">
            <div className="input-shell">
              <input type="text" placeholder="Your Name" />
            </div>
            <div className="input-shell">
              <input type="email" placeholder="Email Address" />
            </div>
            <div className="input-shell">
              <textarea placeholder="Describe your vision..." />
            </div>
            <button className="btn-liquid" style={{ width: "100%", justifyContent: "center", padding: "1.2rem" }}>
              <Icon icon="ph:paper-plane-right-light" className="text-lg" />
              Transmit Inquiry
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-logo">
          The Line <span>|</span> L.A.
        </div>
        <div className="footer-copy">© 2024 The Line · Living Architecture. All rights reserved.</div>
        <ul className="footer-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Doctrine</a></li>
          <li><a href="#">Careers</a></li>
        </ul>
      </footer>
    </>
  );
}