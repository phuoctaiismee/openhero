"use client";

import { useState, useRef, useEffect } from "react";
import { Icon } from "@iconify/react";

interface DownloadMenuProps {
  slug: string;
  category: string;
}

const CODE_FORMATS = [
  {
    label: "HTML + Tailwind CDN",
    file: "index.html",
    icon: "simple-icons:html5",
    description: "Single file, no build step",
  },
  {
    label: "React",
    file: "app.jsx",
    icon: "simple-icons:react",
    description: "Pure React, no extra deps",
  },
  {
    label: "Next.js",
    file: "page.tsx",
    icon: "simple-icons:nextdotjs",
    description: "App Router, no extra deps",
  },
] as const;

export default function DownloadMenu({ slug, category }: DownloadMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={menuRef}
      className="relative"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-1.5 rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <Icon icon="solar:code-linear" width="13" />
        Code
        <Icon
          icon="solar:alt-arrow-down-linear"
          width="11"
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 z-50 mb-2 w-52 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 shadow-2xl">
          <div className="border-b border-neutral-800 px-3 py-2">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
              Download Source
            </p>
          </div>
          {CODE_FORMATS.map(({ label, file, icon, description }) => (
            <a
              key={file}
              href={`/downloads/${category}/${slug}/${file}`}
              download
              className="flex items-center gap-2.5 px-3 py-2.5 text-xs text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
            >
              <Icon icon={icon} width="14" className="shrink-0 text-neutral-300" />
              <span className="flex flex-col">
                <span className="font-medium leading-none">{label}</span>
                <span className="mt-0.5 text-[10px] text-neutral-600">
                  {description}
                </span>
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
