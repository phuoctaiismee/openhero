"use client";

import { useState } from "react";
import type { HeroVideo } from "@/lib/videos";
import CategoryFilter from "./CategoryFilter";
import EmptyState from "./EmptyState";
import VideoCard from "./VideoCard";

interface HeroGalleryProps {
  videos: HeroVideo[];
  categories: string[];
}

export default function HeroGallery({ videos, categories }: HeroGalleryProps) {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewMode, setViewMode] = useState<"desktop" | "mobile">("desktop");

  const filtered =
    activeCategory === "all"
      ? videos
      : videos.filter((v) => v.category === activeCategory);

  return (
    <section
      id="gallery"
      className="min-h-screen px-6 pb-24 pt-8 font-sans text-white"
    >
      <div className="mb-8 flex items-center justify-between gap-4">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />
      </div>

      {filtered.length > 0 ? (
        <div
          className={`grid gap-x-4 gap-y-6 transition-all duration-300 ${
            viewMode === "desktop"
              ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
          }`}
        >
          {filtered.map((video) => (
            <VideoCard key={`${video.category}-${video.slug}`} video={video} />
          ))}
        </div>
      ) : (
        <EmptyState category={activeCategory} />
      )}
    </section>
  );
}
