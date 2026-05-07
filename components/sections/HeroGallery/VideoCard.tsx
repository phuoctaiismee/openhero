"use client";

import { useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { capitalize } from "@/lib/utils";
import type { HeroVideo } from "@/lib/videos";
import { VideoModal } from "./VideoModal";

export default function VideoCard({ video }: { video: HeroVideo }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showModal, setShowModal] = useState(false);

  function handleMouseEnter() {
    videoRef.current?.play().catch(() => { });
  }

  return (
    <>
      <article className="group flex flex-col gap-2.5">
        <div
          className="relative aspect-video cursor-pointer overflow-hidden bg-neutral-900 border border-neutral-900 squircle"
          onMouseEnter={handleMouseEnter}
          onClick={() => setShowModal(true)}
        >
          <video
            ref={videoRef}
            src={video.videoSrc}
            muted
            loop
            playsInline
            autoPlay
            preload="metadata"
            className="h-full w-full squircle object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          <div className="absolute right-2 top-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <button
              onClick={() => setShowModal(true)}
              className="rounded p-1 text-neutral-500 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Preview fullscreen"
            >
              <Icon icon="solar:maximize-square-linear" width="16" />
            </button>
          </div>

        </div>

        <div className="flex items-center justify-between px-0.5">
          <div className="flex items-baseline gap-1.5">
            <span className="text-[13px] font-semibold leading-none text-white">
              {video.name}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <span className="rounded-full bg-black/50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/80 backdrop-blur-sm border border-white/15">
              {capitalize(video.category)}
            </span>
          </div>
        </div>
      </article>

      {showModal && (
        <VideoModal video={video} onClose={() => setShowModal(false)} />
      )}
    </>
  );
}
