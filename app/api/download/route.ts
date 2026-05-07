import { NextRequest, NextResponse } from "next/server";
import JSZip from "jszip";
import fs from "fs";
import path from "path";
import { getNextjsCode, getReactCode, getHtmlCode } from "@/lib/hero-templates";
import { slugToName } from "@/lib/utils";

type Format = "nextjs" | "react" | "html";

const FORMAT_CONFIG: Record<Format, { filename: string; staticFile: string }> = {
  nextjs: { filename: "page.tsx",   staticFile: "page.tsx"   },
  react:  { filename: "Hero.jsx",   staticFile: "app.jsx"    },
  html:   { filename: "index.html", staticFile: "index.html" },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category") ?? "";
  const slug     = searchParams.get("slug") ?? "";
  const format   = (searchParams.get("format") ?? "nextjs") as Format;

  if (!category || !slug || !FORMAT_CONFIG[format]) {
    return NextResponse.json({ error: "Invalid parameters" }, { status: 400 });
  }

  const name      = slugToName(slug);
  const videoPath = path.join(process.cwd(), "public", "videos", category, `${slug}.mp4`);
  const isLocal   = fs.existsSync(videoPath);
  const videoSrc  = isLocal ? `/videos/${category}/${slug}.mp4` : "";

  const { filename, staticFile } = FORMAT_CONFIG[format];

  const staticFilePath = path.join(process.cwd(), "public", "downloads", category, slug, staticFile);
  let code: string;
  if (fs.existsSync(staticFilePath)) {
    code = fs.readFileSync(staticFilePath, "utf-8");
  } else {
    const opts = { name, slug, videoSrc, category };
    code = format === "html" ? getHtmlCode(opts)
         : format === "react" ? getReactCode(opts)
         : getNextjsCode(opts);
  }

  const zip = new JSZip();
  const folder = zip.folder(`${slug}-${format}`) as JSZip;
  folder.file(filename, code);

  if (isLocal) {
    const videoBuffer = fs.readFileSync(videoPath);
    folder.file(`${slug}.mp4`, videoBuffer);
  } else {
    folder.file(
      "README.txt",
      [
        `Hero: ${name}`,
        `Category: ${category}`,
        ``,
        `To use:`,
        `  1. Obtain a video file (e.g., from a stock site)`,
        `  2. Rename it to: ${slug}.mp4`,
        `  3. Place it at: public/videos/${category}/${slug}.mp4`,
        `  4. The VIDEO_SRC constant in the code already points there.`,
      ].join("\n"),
    );
  }

  const buffer = await zip.generateAsync({ type: "arraybuffer", compression: "DEFLATE" });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/zip",
      "Content-Disposition": `attachment; filename="${slug}-${format}.zip"`,
      "Cache-Control": "no-store",
    },
  });
}

