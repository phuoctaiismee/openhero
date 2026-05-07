import { Icon } from "@iconify/react";

export default function Hero() {
    return (
        <div className="relative overflow-hidden font-sans ">
            <div
                className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-72 opacity-25"
            />
            <section className="mx-auto max-w-7xl px-6 pt-28 pb-16 sm:pt-36 sm:pb-20 lg:px-8">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                        Stunning {" "}
                        <span className="relative inline-block">
                            Hero
                            <span className="absolute -top-3 -right-8 flex h-6 w-auto items-center justify-center rounded-full bg-accent px-2 text-[10px] font-bold text-accent-foreground border border-white/20 shadow-[0_0_10px_rgba(255,255,255,0.15)] sm:-top-4 sm:-right-10 sm:text-xs">
                                50+
                            </span>
                        </span>
                        <br />
                        <span className="text-neutral-500">Sections.</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-neutral-300">
                        Browse cinematic video backgrounds paired with polished hero layouts. Preview in real-time, and download in <span className="font-medium text-neutral-200">HTML</span>,{" "}
                        <span className="font-medium text-neutral-200">React</span>, or{" "}
                        <span className="font-medium text-neutral-200">Next.js</span> - zero dependencies.
                    </p>
                    <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                        <a href="#gallery" className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-neutral-950 shadow-lg transition-colors hover:bg-neutral-100">
                            <Icon icon="solar:play-circle-bold" width="16" />
                            Browse Gallery
                        </a>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-xl border border-neutral-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-neutral-500 hover:bg-neutral-900">
                            <Icon icon="mdi:github" width="16" />
                            View on GitHub
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
