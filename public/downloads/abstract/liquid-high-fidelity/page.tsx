"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

const mono = JetBrains_Mono({
    subsets: ["latin"],
    display: "swap",
});

type Theme = "dark" | "light";

type Metric = {
    target: number;
    label: string;
    decimals: number;
};

type Particle = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    length: number;
    opacity: number;
    hue: number;
    width: number;
    life: number;
    maxLife: number;
    update: () => void;
    draw: () => void;
    reset: () => void;
};

const METRICS: Metric[] = [
    { target: 847, label: "Nodes Active", decimals: 0 },
    { target: 99.97, label: "Uptime %", decimals: 2 },
    { target: 2.4, label: "Ms Latency", decimals: 1 },
    { target: 412, label: "GWh Routed", decimals: 0 },
];

const BAR_VALUES = [95, 88, 100, 96, 100, 99, 100, 88, 100, 97, 100, 96, 100, 99, 100, 100, 96, 100];

function formatMetric(value: number, decimals: number): string {
    if (decimals === 0) return Math.floor(value).toString();
    return value.toFixed(decimals);
}

function createParticle(ctx: CanvasRenderingContext2D, width: number, height: number): Particle {
    const state: Partial<Particle> = {};

    const reset = () => {
        state.x = Math.random() * width;
        state.y = Math.random() * height;
        state.vx = (Math.random() - 0.5) * 0.6;
        state.vy = -(Math.random() * 3 + 1);
        state.length = Math.random() * 120 + 40;
        state.opacity = Math.random() * 0.6 + 0.1;
        state.hue = Math.random() > 0.5 ? 330 : 250;
        state.width = Math.random() * 1.5 + 0.3;
        state.life = 0;
        state.maxLife = Math.random() * 180 + 60;
    };

    const update = () => {
        state.x = (state.x ?? 0) + (state.vx ?? 0);
        state.y = (state.y ?? 0) + (state.vy ?? 0);
        state.life = (state.life ?? 0) + 1;

        if ((state.life ?? 0) > (state.maxLife ?? 0) || (state.y ?? 0) < -(state.length ?? 0)) {
            reset();
        }
    };

    const draw = () => {
        const x = state.x ?? 0;
        const y = state.y ?? 0;
        const vx = state.vx ?? 0;
        const vy = state.vy ?? 0;
        const length = state.length ?? 0;
        const opacity = state.opacity ?? 0;
        const hue = state.hue ?? 0;
        const widthStroke = state.width ?? 1;
        const life = state.life ?? 0;
        const maxLife = state.maxLife ?? 1;

        const t = life / maxLife;
        const alpha = opacity * Math.sin(t * Math.PI);
        const grad = ctx.createLinearGradient(x, y, x + vx * length, y + (vy * length) / 1.5);
        const h = hue === 330 ? "320" : "195";

        grad.addColorStop(0, `hsla(${h}, 100%, 70%, 0)`);
        grad.addColorStop(0.4, `hsla(${h}, 100%, 70%, ${alpha})`);
        grad.addColorStop(1, `hsla(${h}, 100%, 90%, ${alpha * 0.3})`);

        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + vx * length * 0.3, y + vy * length * 0.3);
        ctx.strokeStyle = grad;
        ctx.lineWidth = widthStroke;
        ctx.lineCap = "round";
        ctx.stroke();
    };

    reset();

    return {
        get x() {
            return state.x ?? 0;
        },
        set x(v: number) {
            state.x = v;
        },
        get y() {
            return state.y ?? 0;
        },
        set y(v: number) {
            state.y = v;
        },
        get vx() {
            return state.vx ?? 0;
        },
        set vx(v: number) {
            state.vx = v;
        },
        get vy() {
            return state.vy ?? 0;
        },
        set vy(v: number) {
            state.vy = v;
        },
        get length() {
            return state.length ?? 0;
        },
        set length(v: number) {
            state.length = v;
        },
        get opacity() {
            return state.opacity ?? 0;
        },
        set opacity(v: number) {
            state.opacity = v;
        },
        get hue() {
            return state.hue ?? 0;
        },
        set hue(v: number) {
            state.hue = v;
        },
        get width() {
            return state.width ?? 0;
        },
        set width(v: number) {
            state.width = v;
        },
        get life() {
            return state.life ?? 0;
        },
        set life(v: number) {
            state.life = v;
        },
        get maxLife() {
            return state.maxLife ?? 0;
        },
        set maxLife(v: number) {
            state.maxLife = v;
        },
        reset,
        update,
        draw,
    };
}

export default function LiquidHighFidelityArchitecturePage(): React.JSX.Element {
    const [theme, setTheme] = useState<Theme>("dark");
    const [metricValues, setMetricValues] = useState<number[]>(METRICS.map(() => 0));

    const rootRef = useRef<HTMLDivElement | null>(null);
    const portalRef = useRef<HTMLDivElement | null>(null);
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const heroTitleRef = useRef<HTMLHeadingElement | null>(null);
    const velocityTextRef = useRef<HTMLDivElement | null>(null);
    const metricsBarRef = useRef<HTMLDivElement | null>(null);
    const metricsAnimatedRef = useRef(false);
    const cursorTargetRef = useRef({ x: 0, y: 0 });
    const cursorRenderRef = useRef({ x: 0, y: 0 });
    const trailRef = useRef<HTMLDivElement | null>(null);
    const cursorRef = useRef<HTMLDivElement | null>(null);

    const barData = useMemo(() => BAR_VALUES, []);

    const animateCounters = useCallback(() => {
        if (metricsAnimatedRef.current) return;
        metricsAnimatedRef.current = true;

        const start = performance.now();
        const duration = 1600;

        const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

        const tick = (now: number) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = easeOutCubic(progress);

            setMetricValues(METRICS.map((metric) => metric.target * eased));

            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                setMetricValues(METRICS.map((metric) => metric.target));
            }
        };

        requestAnimationFrame(tick);
    }, []);

    const toggleTheme = useCallback(() => {
        const nextTheme: Theme = theme === "dark" ? "light" : "dark";
        const apply = () => {
            flushSync(() => setTheme(nextTheme));
        };

        const doc = document as Document & {
            startViewTransition?: (callback: () => void) => void;
        };

        if (doc.startViewTransition) {
            doc.startViewTransition(apply);
        } else {
            apply();
        }
    }, [theme]);

    useEffect(() => {
        const root = rootRef.current;
        const portal = portalRef.current;
        const heroTitle = heroTitleRef.current;
        const velocityText = velocityTextRef.current;
        const metricsBar = metricsBarRef.current;
        const cursor = cursorRef.current;
        const trail = trailRef.current;

        if (!root || !portal || !cursor || !trail) return;

        const interactiveSurfaces = Array.from(root.querySelectorAll<HTMLElement>(".interactive-surface"));

        const updateMousePosition = (clientX: number, clientY: number) => {
            root.style.setProperty("--mouse-x", `${clientX}px`);
            root.style.setProperty("--mouse-y", `${clientY}px`);

            interactiveSurfaces.forEach((el) => {
                const rect = el.getBoundingClientRect();
                el.style.setProperty("--mouse-x", `${clientX - rect.left}px`);
                el.style.setProperty("--mouse-y", `${clientY - rect.top}px`);
            });
        };

        const onMouseMove = (event: MouseEvent) => {
            cursorTargetRef.current = { x: event.clientX, y: event.clientY };
            cursor.style.left = `${event.clientX}px`;
            cursor.style.top = `${event.clientY}px`;
            updateMousePosition(event.clientX, event.clientY);
        };

        const onPointerOver = (event: Event) => {
            const target = event.target as HTMLElement | null;
            if (!target?.closest("button, a")) return;
            cursor.style.width = "20px";
            cursor.style.height = "20px";
            cursor.style.background = "var(--electric-cyan)";
            cursor.style.boxShadow = "0 0 20px 4px oklch(60% 0.2 250 / 0.8)";
        };

        const onPointerOut = (event: Event) => {
            const target = event.target as HTMLElement | null;
            if (!target?.closest("button, a")) return;
            cursor.style.width = "12px";
            cursor.style.height = "12px";
            cursor.style.background = "var(--neon-magenta)";
            cursor.style.boxShadow = "0 0 20px 4px oklch(65% 0.3 330 / 0.6)";
        };

        const onClick = (event: MouseEvent) => {
            for (let i = 0; i < 6; i++) {
                const line = document.createElement("div");
                line.className = "light-trail";
                const angle = (i / 6) * Math.PI * 2;

                line.style.left = `${event.clientX}px`;
                line.style.top = `${event.clientY}px`;
                line.style.transform = `rotate(${angle}rad)`;
                line.style.height = "0px";

                document.body.appendChild(line);

                requestAnimationFrame(() => {
                    line.style.transition = "height 0.4s ease-out, opacity 0.4s ease-out";
                    line.style.height = "60px";
                    line.style.opacity = "0.6";
                    setTimeout(() => {
                        line.style.opacity = "0";
                        setTimeout(() => line.remove(), 400);
                    }, 300);
                });
            }
        };

        const onScroll = () => {
            if (scrollTicking) return;
            scrollTicking = true;

            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                portal.style.transform = `translate3d(0, ${scrollY * -0.15}px, 0) scale(${1 + scrollY * 0.0002})`;

                if (heroTitle) {
                    const velocity = Math.abs(scrollY - lastScrollRef.current);
                    const weight = Math.min(900, 800 + velocity * 2);
                    const width = Math.min(110, 100 + velocity * 0.3);
                    heroTitle.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}`;
                }

                if (velocityText) {
                    const velocity = Math.abs(scrollY - lastScrollRef.current);
                    velocityText.style.fontVariationSettings = `'wght' ${Math.min(950, 900 + velocity * 3)}`;
                }

                lastScrollRef.current = scrollY;
                scrollTicking = false;
            });
        };

        const lastScrollRef = { current: window.scrollY };
        let scrollTicking = false;

        const animTrail = () => {
            const { x, y } = cursorTargetRef.current;
            cursorRenderRef.current.x += (x - cursorRenderRef.current.x) * 0.12;
            cursorRenderRef.current.y += (y - cursorRenderRef.current.y) * 0.12;

            trail.style.left = `${cursorRenderRef.current.x}px`;
            trail.style.top = `${cursorRenderRef.current.y}px`;

            requestAnimationFrame(animTrail);
        };

        const metricsObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) animateCounters();
                });
            },
            { threshold: 0.3 }
        );

        if (metricsBar) metricsObserver.observe(metricsBar);

        const revealObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) entry.target.classList.add("active");
                });
            },
            { threshold: 0.12 }
        );

        root.querySelectorAll<HTMLElement>(".reveal-block, .reveal-scroll").forEach((el) => revealObserver.observe(el));

        document.addEventListener("mousemove", onMouseMove, { passive: true });
        document.addEventListener("pointerover", onPointerOver);
        document.addEventListener("pointerout", onPointerOut);
        document.addEventListener("click", onClick);
        window.addEventListener("scroll", onScroll, { passive: true });
        onScroll();
        requestAnimationFrame(animTrail);

        return () => {
            document.removeEventListener("mousemove", onMouseMove);
            document.removeEventListener("pointerover", onPointerOver);
            document.removeEventListener("pointerout", onPointerOut);
            document.removeEventListener("click", onClick);
            window.removeEventListener("scroll", onScroll);
            metricsObserver.disconnect();
            revealObserver.disconnect();
        };
    }, [animateCounters]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let width = 0;
        let height = 0;
        let particles: Particle[] = [];
        let raf = 0;

        const resize = () => {
            const rect = canvas.getBoundingClientRect();
            const dpr = window.devicePixelRatio || 1;
            width = rect.width;
            height = rect.height;
            canvas.width = Math.floor(rect.width * dpr);
            canvas.height = Math.floor(rect.height * dpr);
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            if (particles.length === 0) {
                particles = Array.from({ length: 80 }, () => {
                    const p = createParticle(ctx, width, height);
                    p.life = Math.random() * p.maxLife;
                    return p;
                });
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = "rgba(4,4,12,0.08)";
            ctx.fillRect(0, 0, width, height);

            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            raf = requestAnimationFrame(animate);
        };

        resize();
        animate();
        window.addEventListener("resize", resize);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(raf);
        };
    }, []);

    return (
        <div
            ref={rootRef}
            data-theme={theme}
            className={`${inter.className} min-h-screen overflow-x-hidden bg-[var(--bg-pure)] text-[var(--text-primary)] antialiased`}
        >
            <style jsx global>{`
        :root {
          --bg-pure: oklch(0.05 0 0);
          --nebula-blue: oklch(65% 0.25 280);
          --cosmic-violet: oklch(60% 0.2 310);
          --surface-base: oklch(0.15 0.02 280 / 0.4);
          --surface-highlight: oklch(0.9 0.02 280 / 0.08);
          --text-primary: oklch(0.98 0 0);
          --text-muted: oklch(0.6 0.05 280);
          --mouse-x: 50%;
          --mouse-y: 50%;
          color-scheme: dark light;
        }

        [data-theme="light"] {
          --bg-pure: oklch(0.98 0.01 280);
          --surface-base: oklch(0.95 0.02 280 / 0.6);
          --surface-highlight: oklch(1 0 0 / 0.5);
          --text-primary: oklch(0.1 0.02 280);
          --text-muted: oklch(0.4 0.05 280);
        }

        html {
          scroll-behavior: smooth;
          overflow-x: hidden;
        }

        body {
          background-color: var(--bg-pure);
          color: var(--text-primary);
          font-family: "Inter", sans-serif;
          overflow-x: hidden;
          overscroll-behavior: none;
          -webkit-font-smoothing: antialiased;
          transition: background-color 0.8s ease;
        }

        ::view-transition-old(root),
        ::view-transition-new(root) {
          animation: 1s cubic-bezier(0.16, 1, 0.3, 1) both blend-fade;
        }

        @keyframes blend-fade {
          0% {
            opacity: 0;
            filter: blur(20px) saturate(0);
          }
          100% {
            opacity: 1;
            filter: blur(0) saturate(100%);
          }
        }

        @keyframes scroll-shimmer {
          to {
            background-position: 200% center;
          }
        }

        @keyframes reveal-keyframe {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0);
          }
        }

        .atmospheric-portal {
          position: fixed;
          bottom: -20vh;
          right: -15vw;
          width: 90vw;
          height: 90vw;
          border-radius: 50%;
          overflow: hidden;
          opacity: 1;
          mix-blend-mode: normal;
          pointer-events: none;
          z-index: -1;
          will-change: transform;
          transform: translate3d(0, 0, 0);
        }

        [data-theme="light"] .atmospheric-portal {
          mix-blend-mode: normal;
          opacity: 1;
        }

        .atmospheric-portal video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform: none;
        }

        .kinetic-text {
          background: linear-gradient(
            110deg,
            var(--text-primary) 0%,
            var(--nebula-blue) 25%,
            var(--text-primary) 50%,
            var(--cosmic-violet) 75%,
            var(--text-primary) 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: scroll-shimmer linear;
          animation-timeline: scroll(root block);
        }

        .liquid-obsidian {
          background: var(--surface-base);
          backdrop-filter: blur(40px) saturate(180%);
          -webkit-backdrop-filter: blur(40px) saturate(180%);
          box-shadow:
            inset 0 1px 1px var(--surface-highlight),
            inset 0 -2px 10px rgba(0, 0, 0, 0.4),
            0 30px 60px rgba(0, 0, 0, 0.4);
          border-radius: 2rem;
          position: relative;
          isolation: isolate;
        }

        .liquid-obsidian::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(800px circle at var(--mouse-x) var(--mouse-y), var(--nebula-blue), transparent 40%);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.3;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }

        .liquid-obsidian:hover::before {
          opacity: 1;
        }

        .frosted-ether {
          background: radial-gradient(circle at top left, var(--surface-highlight), transparent 70%);
          backdrop-filter: blur(60px);
          -webkit-backdrop-filter: blur(60px);
          box-shadow:
            inset 0 2px 4px rgba(255, 255, 255, 0.1),
            inset 0 -2px 20px rgba(0, 0, 0, 0.5),
            0 15px 35px rgba(0, 0, 0, 0.3);
          border-radius: 1.5rem;
          position: relative;
          overflow: hidden;
        }

        .mercury-btn {
          position: relative;
          overflow: hidden;
          border-radius: 999px;
          padding: 1.2rem 2.5rem;
          color: #000;
          font-weight: 600;
          letter-spacing: -0.01em;
          background: linear-gradient(180deg, #ffffff, #c8c8dc);
          box-shadow:
            inset 0 2px 2px rgba(255, 255, 255, 1),
            inset 0 -4px 8px rgba(0, 0, 0, 0.2),
            0 10px 20px rgba(0, 0, 0, 0.3),
            0 0 0 1px rgba(255, 255, 255, 0.2);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border: none;
        }

        [data-theme="light"] .mercury-btn {
          background: linear-gradient(180deg, #111, #333);
          color: #fff;
          box-shadow:
            inset 0 2px 2px rgba(255, 255, 255, 0.2),
            inset 0 -4px 8px rgba(0, 0, 0, 0.8),
            0 10px 20px rgba(0, 0, 0, 0.1);
        }

        .mercury-btn::after {
          content: "";
          position: absolute;
          inset: -50%;
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.8), transparent 50%);
          opacity: 0;
          transition: opacity 0.3s ease;
          mix-blend-mode: overlay;
          pointer-events: none;
        }

        .mercury-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow:
            inset 0 2px 2px rgba(255, 255, 255, 1),
            inset 0 -4px 8px rgba(0, 0, 0, 0.1),
            0 20px 40px var(--nebula-blue),
            0 0 0 1px rgba(255, 255, 255, 0.5);
        }

        [data-theme="light"] .mercury-btn:hover {
          box-shadow:
            inset 0 2px 2px rgba(255, 255, 255, 0.2),
            inset 0 -4px 8px rgba(0, 0, 0, 0.8),
            0 20px 40px var(--nebula-blue);
        }

        .mercury-btn:hover::after {
          opacity: 1;
        }

        .bento-grid {
          container-type: inline-size;
          container-name: bento;
        }

        .micro-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.3em;
          color: var(--text-muted);
          font-weight: 500;
        }

        .theme-trigger {
          width: 48px;
          height: 24px;
          border-radius: 999px;
          background: var(--surface-highlight);
          backdrop-filter: blur(10px);
          position: relative;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: border-color 0.3s;
        }

        .theme-trigger::before {
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: var(--text-primary);
          transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
        }

        [data-theme="light"] .theme-trigger::before {
          transform: translateX(24px);
        }

        .reveal-block,
        .reveal-scroll {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          filter: blur(10px);
        }

        .reveal-block.active,
        .reveal-scroll.active {
          animation: reveal-keyframe 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .light-trail {
          position: absolute;
          width: 1px;
          background: linear-gradient(180deg, transparent, var(--nebula-blue), transparent);
          pointer-events: none;
          opacity: 0;
          animation: trail-appear 0.6s ease-out forwards;
        }

        @keyframes trail-appear {
          from {
            opacity: 0;
            height: 0;
          }
          to {
            opacity: 0.4;
            height: 80px;
          }
        }

        .hero-title-line {
          display: block;
        }

        .portal-wrap {
          position: fixed;
          inset: 0;
          z-index: -1;
        }

        @media (max-width: 1024px) {
          .atmospheric-portal {
            width: 120vw;
            height: 120vw;
            right: -40vw;
            bottom: -35vh;
          }
        }

        @media (max-width: 768px) {
          .mercury-btn {
            width: 100%;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }

          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

            <div className="pointer-events-none fixed inset-0 z-0">
                <div className="absolute left-[-12rem] top-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(73,141,255,.12),transparent_68%)] blur-3xl" />
                <div className="absolute bottom-[-10rem] right-[-8rem] h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(162,92,255,.12),transparent_68%)] blur-3xl" />
            </div>

            <div ref={portalRef} className="atmospheric-portal">
                <video autoPlay muted loop playsInline className="h-full w-full object-cover">
                    <source src="/video.mp4" type="video/mp4" />
                </video>
            </div>

            <div
                ref={cursorRef}
                className="pointer-events-none fixed left-0 top-0 z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--neon-magenta)] shadow-[0_0_20px_4px_oklch(65%_0.3_330_/_0.6)] mix-blend-plus-lighter transition-[width,height,background,box-shadow] duration-300"
                aria-hidden="true"
            />
            <div
                ref={trailRef}
                className="pointer-events-none fixed left-0 top-0 z-[9998] h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[oklch(60%_0.2_250_/_0.4)] mix-blend-plus-lighter transition-opacity duration-300"
                aria-hidden="true"
            />

            <nav className="fixed top-0 z-50 w-full px-6 py-8 mix-blend-difference text-white">
                <div className="mx-auto flex max-w-screen-2xl items-center justify-between">
                    <div className={`${mono.className} text-xl font-bold tracking-tighter`}>
                        LIQUID <span className="text-white/40">O.S.</span>
                    </div>
                    <button
                        type="button"
                        onClick={toggleTheme}
                        className="theme-trigger"
                        aria-label="Toggle theme"
                    />
                </div>
            </nav>

            <main className="relative z-10 mx-auto max-w-screen-2xl px-6 pb-32 pt-48">
                <header className="reveal-block mb-32 max-w-5xl relative active">
                    <span className={`${mono.className} micro-label mb-6 block`}>Sensory Architecture</span>
                    <h1 className="kinetic-text mb-8 text-7xl font-light leading-[0.9] tracking-tighter md:text-9xl" ref={heroTitleRef}>
                        Fluid<br />Dynamics.
                    </h1>
                    <p className={`${mono.className} max-w-2xl text-xl font-light leading-relaxed text-[var(--text-muted)] md:text-2xl`}>
                        A zero-edge spatial interface. Digital debossing and perceptual OKLCH fusion eliminate structural rigidity.
                    </p>
                    <div className="mt-14">
                        <button type="button" className={`${mono.className} mercury-btn interactive-surface`}>
                            Initialize Sequence
                        </button>
                    </div>
                </header>

                <section className="reveal-scroll bento-grid grid grid-cols-1 gap-6 auto-rows-[minmax(320px,auto)] md:grid-cols-12">
                    <div className="liquid-obsidian interactive-surface reveal-block md:col-span-8 flex flex-col justify-between p-10 md:p-16">
                        <div className="flex items-start justify-between">
                            <span className={`${mono.className} micro-label`}>01 // Volumetric Space</span>
                            <div className="h-3 w-3 rounded-full bg-[var(--nebula-blue)] shadow-[0_0_20px_var(--nebula-blue)] mix-blend-screen" />
                        </div>
                        <div className="mt-24">
                            <h2 className="mb-6 text-4xl font-light tracking-tight md:text-5xl">Predictable edges have failed.</h2>
                            <p className={`${mono.className} max-w-lg text-lg leading-relaxed text-[var(--text-muted)]`}>
                                Refractive depth overrides solid borders. Inner shadow hierarchies construct digital materials mimicking liquid obsidian reacting to atmospheric luminance.
                            </p>
                        </div>
                    </div>

                    <div className="frosted-ether interactive-surface reveal-block md:col-span-4 flex flex-col justify-between p-10 group">
                        <span className={`${mono.className} micro-label`}>Telemetry</span>
                        <div className="mt-12">
                            <div className="mb-2 text-6xl font-light tracking-tighter transition-transform duration-700 group-hover:scale-105 origin-left md:text-7xl">
                                120<span className={`${mono.className} ml-1 text-2xl text-[var(--text-muted)]`}>fps</span>
                            </div>
                            <p className={`${mono.className} text-sm leading-relaxed text-[var(--text-muted)]`}>
                                Native hardware acceleration via Scroll-Timeline and View Transitions API. Zero external runtime logic.
                            </p>
                        </div>
                    </div>

                    <div className="frosted-ether interactive-surface reveal-block md:col-span-5 relative overflow-hidden p-10">
                        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[var(--cosmic-violet)] mix-blend-screen opacity-40 blur-[80px]" />
                        <div className="relative z-10 flex h-full flex-col justify-between">
                            <span className={`${mono.className} micro-label`}>Spectrum Engine</span>
                            <div className="mt-auto">
                                <h3 className="mb-4 text-3xl font-light">OKLCH Perception</h3>
                                <div className="flex gap-4">
                                    <div className="h-1 w-1/2 rounded-full bg-[var(--nebula-blue)] shadow-[0_0_15px_var(--nebula-blue)]" />
                                    <div className="h-1 w-1/4 rounded-full bg-[var(--cosmic-violet)] shadow-[0_0_15px_var(--cosmic-violet)]" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="liquid-obsidian interactive-surface reveal-block md:col-span-7 flex items-center overflow-hidden p-10 md:p-16">
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent to-[var(--surface-highlight)] opacity-50 mix-blend-overlay" />
                        <h3 className="relative z-10 text-3xl font-light leading-tight md:text-5xl">
                            Seek luxury through absolute cleanliness and depth.
                        </h3>
                    </div>
                </section>

                <section className="reveal-block mt-24 grid gap-6 rounded-[2rem] border border-white/10 bg-white/[0.02] p-6 md:grid-cols-4 md:p-8">
                    <div className="frosted-ether interactive-surface p-6 md:p-8">
                        <span className={`${mono.className} micro-label`}>Nodes</span>
                        <div className="mt-4 text-5xl font-light">847</div>
                        <p className={`${mono.className} mt-3 text-sm text-[var(--text-muted)]`}>Active relays across the visual mesh.</p>
                    </div>

                    <div className="frosted-ether interactive-surface p-6 md:p-8">
                        <span className={`${mono.className} micro-label`}>Latency</span>
                        <div className="mt-4 text-5xl font-light">2.4</div>
                        <p className={`${mono.className} mt-3 text-sm text-[var(--text-muted)]`}>Milliseconds on average at peak load.</p>
                    </div>

                    <div className="frosted-ether interactive-surface p-6 md:p-8">
                        <span className={`${mono.className} micro-label`}>SLA</span>
                        <div className="mt-4 text-5xl font-light">99.97</div>
                        <p className={`${mono.className} mt-3 text-sm text-[var(--text-muted)]`}>Availability across the last 30 days.</p>
                    </div>

                    <div className="frosted-ether interactive-surface p-6 md:p-8">
                        <span className={`${mono.className} micro-label`}>Output</span>
                        <div className="mt-4 text-5xl font-light">412</div>
                        <p className={`${mono.className} mt-3 text-sm text-[var(--text-muted)]`}>GWh routed through the current fabric.</p>
                    </div>
                </section>

                <section className="reveal-block mt-24 rounded-[2rem] border border-white/10 bg-white/[0.02] p-8 md:p-12">
                    <div className="flex items-end justify-between gap-4">
                        <div>
                            <div className={`${mono.className} micro-label`}>Signal Profile</div>
                            <h2 className="mt-3 text-3xl font-light md:text-5xl">Dynamic bars rendered from data.</h2>
                        </div>
                        <div className={`${mono.className} text-xs uppercase tracking-[0.25em] text-[var(--text-muted)]`}>Live Matrix</div>
                    </div>

                    <div className="mt-10 flex h-8 items-end gap-1">
                        {barData.map((value, index) => (
                            <div
                                key={`${value}-${index}`}
                                style={{
                                    flex: 1,
                                    height: `${value * 0.32}px`,
                                    background: "linear-gradient(180deg, oklch(60% 0.2 250), oklch(65% 0.3 330))",
                                    borderRadius: "1px",
                                    opacity: 0.7,
                                }}
                            />
                        ))}
                    </div>
                </section>

                <section className="reveal-block mt-24 grid gap-6 md:grid-cols-[1.2fr_.8fr]">
                    <div className="liquid-obsidian interactive-surface p-8 md:p-12">
                        <div className={`${mono.className} micro-label`}>Architecture Notes</div>
                        <h3 className="mt-4 text-3xl font-light md:text-4xl">The surface stays thin, the depth stays rich.</h3>
                        <p className={`${mono.className} mt-6 max-w-xl text-sm leading-7 text-[var(--text-muted)]`}>
                            This build keeps the motion language, the portal video, the hover glow, and the view-transition theme switch while using Tailwind for layout and only a small amount of global CSS where it is actually needed.
                        </p>
                    </div>

                    <div className="frosted-ether interactive-surface p-8 md:p-12">
                        <span className={`${mono.className} micro-label`}>Control</span>
                        <div className="mt-8 flex items-center justify-between rounded-full border border-white/10 bg-white/[0.03] px-5 py-4">
                            <div>
                                <div className="text-lg font-medium">Theme</div>
                                <div className={`${mono.className} text-xs text-[var(--text-muted)]`}>{theme === "dark" ? "Dark mode" : "Light mode"}</div>
                            </div>
                            <button
                                type="button"
                                onClick={toggleTheme}
                                className="theme-trigger"
                                aria-label="Toggle theme"
                            />
                        </div>
                    </div>
                </section>

                <footer className="reveal-block mt-24 border-t border-white/10 pt-10 pb-4">
                    <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
                        <div className="footer-brand text-2xl font-semibold tracking-tighter">
                            Liquid <span className="text-white/40">High-Fidelity Architecture</span>
                        </div>
                        <div className={`${mono.className} text-[0.58rem] uppercase tracking-[0.2em] text-[var(--text-muted)]`}>
                            © 2026 · All systems nominal
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}