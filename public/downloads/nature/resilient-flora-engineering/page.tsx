"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export default function Page() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const threadRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const thread = threadRef.current;

    const moveCursor = (e: MouseEvent) => {
      if (!cursor) return;
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };

    const updateThread = () => {
      if (!thread) return;
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
      thread.style.width = `${scrolled}%`;
    };

    const interactiveElements = document.querySelectorAll(
      ".interactive, a, button"
    );

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("scroll", updateThread, { passive: true });
    updateThread();

    interactiveElements.forEach((el) => {
      el.addEventListener("mouseenter", () => cursor?.classList.add("hovering"));
      el.addEventListener("mouseleave", () =>
        cursor?.classList.remove("hovering")
      );
    });

    document.querySelectorAll(".magnetic-btn").forEach((btn) => {
      btn.addEventListener("mousemove", (e: Event) => {
        const ev = e as MouseEvent;
        const rect = (btn as HTMLElement).getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;

        (btn as HTMLElement).style.setProperty("--x", `${x}px`);
        (btn as HTMLElement).style.setProperty("--y", `${y}px`);

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const deltaX = (x - centerX) * 0.1;
        const deltaY = (y - centerY) * 0.1;

        (btn as HTMLElement).style.transform = `translate(${deltaX}px, ${deltaY}px)`;
      });

      btn.addEventListener("mouseleave", () => {
        (btn as HTMLElement).style.transform = "translate(0px, 0px)";
      });
    });

    document.querySelectorAll(".spotlight-card").forEach((card) => {
      card.addEventListener("mousemove", (e: Event) => {
        const ev = e as MouseEvent;
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = ev.clientX - rect.left;
        const y = ev.clientY - rect.top;

        (card as HTMLElement).style.setProperty("--mouse-x", `${x}px`);
        (card as HTMLElement).style.setProperty("--mouse-y", `${y}px`);
      });
    });

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: "0px", threshold: 0.15 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("scroll", updateThread);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap");

        html {
          scroll-behavior: smooth;
          background-color: black;
        }

        body {
          margin: 0;
          overflow-x: hidden;
          color: white;
          background: black;
          min-height: 100vh;
          font-family: "Inter", ui-sans-serif, system-ui, -apple-system,
            BlinkMacSystemFont, sans-serif;
        }

        ::selection {
          background: rgba(255, 191, 0, 0.18);
          color: rgb(255, 191, 0);
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: black;
        }

        ::-webkit-scrollbar-thumb {
          background: rgba(255, 191, 0, 0.45);
          border-radius: 999px;
        }

        .radial-mask-video {
          -webkit-mask-image: radial-gradient(
            circle at center,
            black 30%,
            transparent 90%
          );
          mask-image: radial-gradient(
            circle at center,
            black 30%,
            transparent 90%
          );
          mix-blend-mode: screen;
          opacity: 0.9;
        }

        .lab-glass {
          background: linear-gradient(145deg, rgba(20, 20, 25, 0.4), rgba(10, 10, 15, 0.1));
          backdrop-filter: blur(40px) brightness(1.1);
          -webkit-backdrop-filter: blur(40px) brightness(1.1);
          border-radius: 2.5rem;
          box-shadow: inset 0 0 1px 1px rgba(255, 255, 255, 0.05),
            0 20px 40px rgba(0, 0, 0, 0.4);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          position: relative;
          overflow: hidden;
        }

        .lab-glass::before {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: linear-gradient(
            135deg,
            rgba(255, 255, 255, 0.15),
            rgba(255, 255, 255, 0.02)
          );
          -webkit-mask: linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          pointer-events: none;
        }

        .bioluminescent-btn {
          background: linear-gradient(
            135deg,
            rgba(255, 191, 0, 0.2),
            rgba(255, 191, 0, 0.05)
          );
          border-radius: 999px;
          position: relative;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 191, 0, 0.3);
          box-shadow: inset 0 0 20px rgba(255, 191, 0, 0.1),
            0 0 15px rgba(255, 191, 0, 0.05);
        }

        .bioluminescent-btn:hover {
          transform: scale(1.04);
          box-shadow: inset 0 0 40px rgba(255, 191, 0, 0.4),
            0 0 40px rgba(255, 191, 0, 0.2);
          border-color: rgba(255, 191, 0, 0.6);
        }

        .light-bleed {
          text-shadow: 0 0 25px rgba(255, 191, 0, 0.5),
            0 0 60px rgba(255, 191, 0, 0.3);
        }

        .golden-thread {
          position: fixed;
          top: 0;
          left: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            rgb(255, 191, 0),
            rgb(255, 82, 196),
            transparent
          );
          box-shadow: 0 0 15px rgb(255, 191, 0);
          z-index: 100;
          width: 0%;
          transition: width 0.1s ease-out;
        }

        @keyframes float {
          0% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(1deg);
          }
          100% {
            transform: translateY(0px) rotate(0deg);
          }
        }

        .floating-element {
          animation: float 8s ease-in-out infinite;
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px) scale(0.98);
          filter: blur(15px);
          transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }

        .petal-accent {
          color: rgb(255, 82, 196);
          text-shadow: 0 0 20px rgba(255, 82, 196, 0.4);
        }
      `}</style>

      <div
        ref={threadRef}
        className="golden-thread"
        id="scrollThread"
        aria-hidden="true"
      />

      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[10000] mix-blend-screen bg-[radial-gradient(circle,_rgb(255,191,0)_0%,_transparent_80%)] shadow-[0_0_20px_rgba(255,191,0,0.6)] transition-[width,height,background] duration-300 translate-x-[-50%] translate-y-[-50%]"
        aria-hidden="true"
      />

      <nav className="fixed top-6 inset-x-0 z-50 flex justify-center w-full px-6">
        <div className="rounded-full px-8 py-4 flex items-center gap-12 text-sm tracking-wide font-medium bg-white/5 backdrop-blur-lg border border-white/20 shadow-2xl">
          <a
            href="#vision"
            className="hover:text-[rgb(255,191,0)] transition-colors duration-300 mix-blend-plus-lighter"
          >
            Vision
          </a>
          <a
            href="#engineering"
            className="hover:text-[rgb(255,191,0)] transition-colors duration-300 mix-blend-plus-lighter"
          >
            Engineering
          </a>
          <div className="w-1.5 h-1.5 rounded-full bg-[rgb(255,191,0)] shadow-[0_0_10px_rgb(255,191,0)]" />
          <a
            href="#methodology"
            className="hover:text-[rgb(255,191,0)] transition-colors duration-300 mix-blend-plus-lighter"
          >
            Methodology
          </a>
          <a
            href="#contact"
            className="hover:text-[rgb(255,191,0)] transition-colors duration-300 mix-blend-plus-lighter"
          >
            Initiate
          </a>
        </div>
      </nav>

      <main>
        <section
          id="vision"
          className="min-h-screen relative flex items-center justify-center px-6 pt-24"
        >
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
            <video autoPlay loop muted playsInline className="radial-mask-video w-full h-full object-cover">
              <source src="/video.mp4" type="video/mp4" />
            </video>
          </div>

          <div className="relative z-10 text-center max-w-5xl mx-auto flex flex-col items-center">
            <span className="font-serif italic text-white text-xl md:text-2xl mb-6 tracking-wide reveal floating-element filter [filter:drop-shadow(0_2px_10px_rgba(0,0,0,1))]">
              The Living Field
            </span>

            <h1 className="font-serif text-6xl md:text-8xl lg:text-[7rem] leading-[1.1] mb-8 light-bleed reveal delay-[100ms] filter [filter:drop-shadow(0_10px_30px_rgba(0,0,0,1))_drop-shadow(0_0_10px_rgba(0,0,0,0.8))]">
              Resilient Flora <br />
              <span className="font-sans font-light tracking-tighter opacity-90">
                Engineering.
              </span>
            </h1>

            <p className="text-white/60 text-lg md:text-xl font-light max-w-2xl leading-relaxed mb-12 reveal delay-[200ms] filter [filter:drop-shadow(0_4px_10px_rgba(0,0,0,1))_drop-shadow(0_10px_30px_rgba(0,0,0,1))_drop-shadow(0_0_50px_rgba(0,0,0,0.8))]">
              We synthesize nature and computational architecture. Cultivating
              environments where organic structures and digital logic flourish
              synchronously through spectral optimization.
            </p>

            <button className="bioluminescent-btn px-10 py-5 text-white tracking-widest text-sm uppercase reveal delay-[300ms] flex items-center gap-3 interactive">
              Enter the Laboratory
              <Icon icon="ph:arrow-right-light" className="text-xl" />
            </button>
          </div>
        </section>

        <section id="engineering" className="py-32 px-6 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center reveal">
              <h2 className="font-serif text-4xl md:text-5xl mb-6 light-bleed">
                Bioarchitecture Protocols
              </h2>
              <div className="w-px h-16 bg-gradient-to-b from-[rgb(255,191,0)] to-transparent mx-auto" />
            </div>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              <div className="lab-glass p-10 md:p-14 group hover:bg-white/[0.03] reveal interactive">
                <div className="w-14 h-14 rounded-full bg-[rgb(255,191,0)]/10 flex items-center justify-center text-[rgb(255,191,0)] mb-8 shadow-[inset_0_0_20px_rgba(255,191,0,0.2)] group-hover:scale-110 transition-transform duration-700">
                  <Icon icon="ph:plant-light" className="text-[28px]" />
                </div>
                <h3 className="font-serif text-3xl mb-4 group-hover:text-[rgb(255,191,0)] transition-colors duration-500">
                  Phytoholography
                </h3>
                <p className="text-white/50 font-light leading-relaxed mb-6">
                  Mapping cellular structures using advanced light-field
                  captures. We record the vibrance of botanical life to
                  recreate its structural integrity within digital membranes.
                </p>
                <div className="h-0.5 w-0 bg-[rgb(255,191,0)] group-hover:w-full transition-all duration-700 ease-in-out opacity-50 rounded-full" />
              </div>

              <div className="lab-glass p-10 md:p-14 group hover:bg-white/[0.03] reveal delay-[100ms] interactive">
                <div className="w-14 h-14 rounded-full bg-[rgb(255,82,196)]/10 flex items-center justify-center text-[rgb(255,82,196)] mb-8 shadow-[inset_0_0_20px_rgba(255,82,196,0.2)] group-hover:scale-110 transition-transform duration-700">
                  <Icon icon="ph:drop-light" className="text-[28px]" />
                </div>
                <h3 className="font-serif text-3xl mb-4 group-hover:text-[rgb(255,82,196)] transition-colors duration-500">
                  Ethylene Management
                </h3>
                <p className="text-white/50 font-light leading-relaxed mb-6">
                  Controlling the algorithmic decay of interfaces. Through
                  dynamic state management, our environments age gracefully,
                  shedding unused nodes like autumn leaves.
                </p>
                <div className="h-0.5 w-0 bg-[rgb(255,82,196)] group-hover:w-full transition-all duration-700 ease-in-out opacity-50 rounded-full" />
              </div>

              <div className="lab-glass p-10 md:p-14 group hover:bg-white/[0.03] reveal interactive">
                <div className="w-14 h-14 rounded-full bg-white/5 flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-700 group-hover:text-[rgb(255,191,0)]">
                  <Icon icon="ph:sun-light" className="text-[28px]" />
                </div>
                <h3 className="font-serif text-3xl mb-4 group-hover:text-[rgb(255,191,0)] transition-colors duration-500">
                  Spectral Optimization
                </h3>
                <p className="text-white/50 font-light leading-relaxed mb-6">
                  Calibrating the exact wavelength of pixel emission to mimic
                  the golden hour. Reducing digital eye strain by simulating
                  the ambient scatter of natural sunlight.
                </p>
                <div className="h-0.5 w-0 bg-white group-hover:w-full transition-all duration-700 ease-in-out opacity-20 rounded-full" />
              </div>

              <div className="lab-glass p-10 md:p-14 group hover:bg-white/[0.03] reveal delay-[100ms] interactive">
                <div className="w-14 h-14 rounded-full bg-[rgb(255,191,0)]/10 flex items-center justify-center text-[rgb(255,191,0)] mb-8 shadow-[inset_0_0_20px_rgba(255,191,0,0.2)] group-hover:scale-110 transition-transform duration-700">
                  <Icon icon="ph:dna-light" className="text-[28px]" />
                </div>
                <h3 className="font-serif text-3xl mb-4 group-hover:text-[rgb(255,191,0)] transition-colors duration-500">
                  Genetic Vibrance
                </h3>
                <p className="text-white/50 font-light leading-relaxed mb-6">
                  Embedding adaptive color spaces that shift based on user
                  circadian rhythms. The interface breathes, expanding and
                  contracting its typography naturally.
                </p>
                <div className="h-0.5 w-0 bg-[rgb(255,191,0)] group-hover:w-full transition-all duration-700 ease-in-out opacity-50 rounded-full" />
              </div>
            </div>
          </div>
        </section>

        <section className="py-40 px-6 relative z-10 flex justify-center">
          <div className="lab-glass max-w-4xl w-full p-12 md:p-20 text-center reveal interactive">
            <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-[rgb(255,191,0)]/20 to-[rgb(255,82,196)]/20 border border-white/10 mb-10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)] flex items-center justify-center" />
            <h2 className="font-serif text-4xl md:text-6xl mb-8 light-bleed">
              Cultivate with Us
            </h2>
            <p className="text-white/60 font-light text-lg max-w-xl mx-auto mb-12">
              Join the laboratory. Experience interfaces grown from the ground
              up, nurtured by design logic and natural philosophy.
            </p>
            <button className="bioluminescent-btn px-12 py-6 text-white tracking-widest text-sm uppercase interactive">
              Request Access
            </button>
          </div>
        </section>
      </main>

      <footer className="py-12 px-6 text-center text-white/30 font-light text-sm relative z-10">
        <p>© 2026 Apeel Laboratories. All living rights reserved.</p>
      </footer>
    </>
  );
}