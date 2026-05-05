#!/usr/bin/env node
/**
 * Edit a local image with fal-ai/nano-banana-2/edit, then normalize to target WxH (default 3840×2160).
 *
 * Usage (from repo root, FAL_KEY in env):
 *   node scripts/fal-nano-banana-edit.mjs --input "assets/backgrounds/..." --prompt "..." [--out path]
 *
 * By default normalizes to 3840×2160 webp to match extension backgrounds.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { fal } from "@fal-ai/client";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

/** Load FAL_KEY from repo root .env.fal (optional): single line FAL_KEY=... */
async function tryLoadFalKeyFromFile() {
  if (process.env.FAL_KEY) return;
  const p = path.join(REPO_ROOT, ".env.fal");
  try {
    const t = await fs.readFile(p, "utf8");
    const m = t.match(/^\s*FAL_KEY\s*=\s*(.+)$/m);
    if (m) {
      let v = m[1].trim();
      if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'")))
        v = v.slice(1, -1);
      process.env.FAL_KEY = v;
    }
  } catch {
    // ignore
  }
}

function parseArgs(argv) {
  const out = {
    input: null,
    output: null,
    prompt: null,
    promptFile: null,
    width: 3840,
    height: 2160,
    aspectRatio: "16:9",
    /** @type {"0.5K"|"1K"|"2K"|"4K"} */
    resolution: "4K",
    /** @type {"webp"|"png"} */
    outputFormat: "webp",
    /** @type {"cover"|"contain"} */
    fit: "cover",
    numImages: 1,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--input" && argv[i + 1]) out.input = argv[++i];
    else if (a === "--out" && argv[i + 1]) out.output = path.resolve(argv[++i]);
    else if (a === "--prompt" && argv[i + 1]) out.prompt = argv[++i];
    else if (a === "--prompt-file" && argv[i + 1]) out.promptFile = path.resolve(argv[++i]);
    else if (a === "--width" && argv[i + 1]) out.width = Number(argv[++i]);
    else if (a === "--height" && argv[i + 1]) out.height = Number(argv[++i]);
    else if (a === "--aspect-ratio" && argv[i + 1]) out.aspectRatio = argv[++i];
    else if (a === "--resolution" && argv[i + 1]) out.resolution = argv[++i];
    else if (a === "--output-format" && argv[i + 1]) out.outputFormat = argv[++i];
    else if (a === "--fit" && argv[i + 1]) out.fit = argv[++i];
    else if (a === "--num-images" && argv[i + 1]) out.numImages = Math.min(4, Math.max(1, Number(argv[++i])));
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/fal-nano-banana-edit.mjs --input <file> --prompt "..." | --prompt-file <file> [--out <file>]

  --out              default: <input-stem>.fal-out.webp next to input
  --width/--height   default 3840 2160 (output normalized with sharp cover)
  --aspect-ratio     passed to Fal (default 16:9)
  --resolution       Fal: 0.5K | 1K | 2K | 4K (default 4K)
  --output-format    webp | png (default webp)
  --fit              cover | contain (default cover)
  --num-images       1-4 (default 1) — first image is used for --out
FAL_KEY: env, or repo root .env.fal (see .gitignore)`);
      process.exit(0);
    }
  }
  if (!out.input) {
    console.error("Required: --input");
    process.exit(1);
  }
  if (!out.prompt && !out.promptFile) {
    console.error("Required: --prompt and/or --prompt-file");
    process.exit(1);
  }
  out.input = path.isAbsolute(out.input) ? out.input : path.join(REPO_ROOT, out.input);
  if (out.promptFile) out.promptFile = path.isAbsolute(out.promptFile) ? out.promptFile : path.join(REPO_ROOT, out.promptFile);
  if (!out.output) {
    const d = path.dirname(out.input);
    const base = path.basename(out.input, path.extname(out.input));
    out.output = path.join(d, `${base}.fal-out.${out.outputFormat}`);
  }
  if (out.outputFormat !== "webp" && out.outputFormat !== "png") {
    console.error('Invalid --output-format. Use "webp" or "png".');
    process.exit(1);
  }
  if (out.fit !== "cover" && out.fit !== "contain") {
    console.error('Invalid --fit. Use "cover" or "contain".');
    process.exit(1);
  }
  return out;
}

/** Resolve --prompt-file into prompt text if needed. */
async function loadPromptText(args) {
  if (args.promptFile) {
    const t = (await fs.readFile(args.promptFile, "utf8")).trim();
    if (t) args.prompt = t;
  }
  if (!args.prompt) {
    console.error("Empty prompt. Use --prompt or a non-empty --prompt-file.");
    process.exit(1);
  }
}

async function uploadLocalFile(absPath) {
  const ext = path.extname(absPath).toLowerCase();
  const mime =
    ext === ".webp"
      ? "image/webp"
      : ext === ".png"
        ? "image/png"
        : ext === ".jpg" || ext === ".jpeg"
          ? "image/jpeg"
          : "application/octet-stream";
  const buffer = await fs.readFile(absPath);
  const blob = new Blob([buffer], { type: mime });
  const name = path.basename(absPath);
  const file = new File([blob], name, { type: mime });
  return fal.storage.upload(file);
}

async function main() {
  const args = parseArgs(process.argv);
  await loadPromptText(args);
  await tryLoadFalKeyFromFile();
  if (!process.env.FAL_KEY) {
    console.error(
      "Set FAL_KEY in the environment, or add repo root .env.fal with one line: FAL_KEY=your_key"
    );
    process.exit(1);
  }
  fal.config({ credentials: process.env.FAL_KEY });

  const imageUrl = await uploadLocalFile(args.input);
  console.error("Uploaded source to Fal CDN.");

  const result = await fal.subscribe("fal-ai/nano-banana-2/edit", {
    input: {
      prompt: args.prompt,
      image_urls: [imageUrl],
      num_images: args.numImages,
      aspect_ratio: args.aspectRatio,
      resolution: args.resolution,
      output_format: args.outputFormat,
      safety_tolerance: "4",
      enable_web_search: false,
      limit_generations: true,
    },
    logs: true,
  });

  const images = result.data?.images;
  if (!images?.length) {
    console.error("No images in response:", JSON.stringify(result.data, null, 2));
    process.exit(1);
  }
  const first = images[0].url;
  const res = await fetch(first);
  if (!res.ok) {
    console.error("Failed to download result:", res.status);
    process.exit(1);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const pipeline = sharp(buf)
    .rotate()
    .resize(args.width, args.height, {
      fit: args.fit,
      position: "centre",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    });
  const normalized =
    args.outputFormat === "png"
      ? await pipeline.png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer()
      : await pipeline.webp({ quality: 88, effort: 6, alphaQuality: 100 }).toBuffer();
  await fs.writeFile(args.output, normalized);
  const meta = await sharp(normalized).metadata();
  console.log(JSON.stringify({ output: args.output, width: meta.width, height: meta.height, requestId: result.requestId }, null, 0));
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
