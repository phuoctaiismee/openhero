"use client";

import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import type { HeroVideo } from "@/lib/videos";
import CategoryFilter from "./CategoryFilter";
import EmptyState from "./EmptyState";
import VideoCard from "./VideoCard";
import VideoCardSkeleton from "./VideoCardSkeleton";

const PAGE_SIZES = {
  sm: 6,
  md: 8,
  lg: 12,
} as const;

function usePageSize(): number {
  const [size, setSize] = useState<number>(PAGE_SIZES.lg);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640)  setSize(PAGE_SIZES.sm);
      else if (window.innerWidth < 1024) setSize(PAGE_SIZES.md);
      else setSize(PAGE_SIZES.lg);
    };
    update();
    window.addEventListener("resize", update, { passive: true });
    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
}

interface HeroGalleryProps {
  videos: HeroVideo[];
  categories: string[];
}

export default function HeroGallery({ videos, categories }: HeroGalleryProps) {
  const pageSize = usePageSize();

  const [activeCategory, setActiveCategory] = useState("all");
  const [displayCount, setDisplayCount]     = useState<number>(PAGE_SIZES.lg);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLoadingMore, setIsLoadingMore]     = useState(false);

  const sentinelRef   = useRef<HTMLDivElement>(null);
  const observerRef   = useRef<IntersectionObserver | null>(null);
  const loadingRef    = useRef(false);

  const filtered = useMemo(
    () =>
      activeCategory === "all"
        ? videos
        : videos.filter((v) => v.category === activeCategory),
    [videos, activeCategory],
  );

  const displayed = useMemo(
    () => filtered.slice(0, displayCount),
    [filtered, displayCount],
  );

  const hasMore = displayCount < filtered.length;

  const nextBatchSize = Math.min(pageSize, filtered.length - displayCount);

  const handleCategoryChange = useCallback(
    (cat: string) => {
      if (cat === activeCategory) return;
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveCategory(cat);
        setDisplayCount(pageSize);
        setIsTransitioning(false);
      }, 250);
    },
    [activeCategory, pageSize],
  );

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    if (!hasMore || isTransitioning) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || loadingRef.current) return;
        loadingRef.current = true;

        setIsLoadingMore(true);

        setTimeout(() => {
          setDisplayCount((c) => Math.min(c + pageSize, filtered.length));
          setIsLoadingMore(false);
          loadingRef.current = false;
        }, 350);
      },
      {
        rootMargin: "0px 0px 80% 0px",
      },
    );

    observerRef.current.observe(sentinel);

    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [hasMore, isTransitioning, pageSize, filtered.length]);

  const skeletonGrid = (count: number) =>
    Array.from({ length: count }, (_, i) => (
      <VideoCardSkeleton key={`sk-${i}`} />
    ));

  return (
    <section
      id="gallery"
      className="min-h-screen px-6 pb-24 pt-6 font-sans text-white animate-fade-in"
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />
      </div>

      {isTransitioning ? (
        <div className="grid gap-x-4 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {skeletonGrid(pageSize)}
        </div>
      ) : filtered.length === 0 ? (
        <EmptyState category={activeCategory} />
      ) : (
        <>
          <div className="grid gap-x-4 gap-y-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {displayed.map((video) => (
              <VideoCard key={`${video.category}-${video.slug}`} video={video} />
            ))}

            {isLoadingMore && skeletonGrid(nextBatchSize)}
          </div>

          {hasMore && (
            <div
              ref={sentinelRef}
              className="h-px w-full"
              aria-hidden="true"
            />
          )}

          {!hasMore && filtered.length > PAGE_SIZES.sm && (
            <p className="mt-10 text-center text-xs text-neutral-600">
              {filtered.length} video{filtered.length !== 1 ? "s" : ""}
            </p>
          )}
        </>
      )}
    </section>
  );
}

