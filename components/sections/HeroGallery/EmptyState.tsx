import { Icon } from "@iconify/react";
import { capitalize } from "@/lib/utils";

interface EmptyStateProps {
  category: string;
}

export default function EmptyState({ category }: EmptyStateProps) {
  const isAll = category === "all";
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-900">
        <Icon
          icon="solar:video-library-linear"
          width="28"
          className="text-neutral-600"
        />
      </div>
      <h3 className="text-base font-semibold text-neutral-300">
        No heroes yet in {isAll ? "any category" : capitalize(category)}
      </h3>
      <p className="mt-2 max-w-xs text-sm text-neutral-600">
        Add{" "}
        <code className="rounded bg-neutral-800 px-1 text-neutral-300">.mp4</code>{" "}
        files to{" "}
        <code className="rounded bg-neutral-800 px-1 text-neutral-300">
          public/videos/{isAll ? "[category]" : category}/
        </code>{" "}
        and they will appear here automatically.
      </p>
    </div>
  );
}
