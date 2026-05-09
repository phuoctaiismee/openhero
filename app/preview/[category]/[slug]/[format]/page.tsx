import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { slugToName } from "@/lib/utils";
import Link from "next/link";

type Format = "nextjs" | "react" | "html";

interface PreviewPageProps {
  params: Promise<{
    category: string;
    slug: string;
    format: Format;
  }>;
}

const VALID_FORMATS: Format[] = ["nextjs", "react", "html"];

export default async function PreviewPage({ params }: PreviewPageProps) {
  const { category, slug, format } = await params;

  if (!VALID_FORMATS.includes(format)) {
    return notFound();
  }

  const htmlPath = path.join(
    process.cwd(),
    "public",
    "downloads",
    category,
    slug,
    "index.html"
  );

  if (!fs.existsSync(htmlPath)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="max-w-md text-center">
          <h1 className="mb-4 text-2xl font-bold">Preview Not Available</h1>
          <p className="mb-6 text-white/60">
            No se encontró{" "}
            <code className="rounded bg-white/10 px-2 py-1">index.html</code>{" "}
            para este hero.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-white/90"
          >
            ← Back to Gallery
          </Link>
        </div>
      </div>
    );
  }

  const name = slugToName(slug);

  return (
    <div className="relative h-screen w-full bg-black">
      <div className="absolute left-4 top-1 z-50 flex items-center gap-3 rounded-xl border border-white/10 bg-black/80 px-4 py-2 backdrop-blur-md">
        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
        <span className="text-xs font-medium text-white">
          Live Preview: {name}
        </span>
      </div>
      
      <iframe
        src={`/downloads/${category}/${slug}/index.html`}
        className="h-full w-full border-0"
        title={`Preview: ${name}`}
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
