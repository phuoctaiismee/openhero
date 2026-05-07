"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { LiquidMetalButton } from "../ui/liquid-metal-button";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-white/10 bg-black/80 backdrop-blur-xl py-0"
          : "border-transparent bg-transparent py-2"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white">
            <Icon icon="solar:play-circle-bold" width="20" className="text-black" />
          </div>
          <span className="hidden text-xl font-black tracking-tighter text-white sm:block">
            AURAMOTION
          </span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-neutral-300 md:flex">
          <a href="#gallery" className="transition-colors hover:text-white">
            Gallery
          </a>
          <a href="#how-it-works" className="transition-colors hover:text-white">
            How it works
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Docs
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LiquidMetalButton
            label="GitHub"
            icon="mdi:github"
            size="md"
          />
          <button className="p-2 text-white md:hidden" aria-label="Open menu">
            <Icon icon="solar:hamburger-menu-linear" width="22" />
          </button>
        </div>
      </div>
    </header>
  );
}
