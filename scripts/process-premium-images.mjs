#!/usr/bin/env node
/**
 * Batch-resize theme PNGs/JPEGs → WebP (3840×2160 by default), targeting a max file size.
 *
 * Usage (from repo root):
 *   npm install --prefix scripts
 *   node scripts/process-premium-images.mjs
 *
 * Options:
 *   --input <dir>     default: "new theme images"
 *   --out <dir>       default: "assets/premium-import-staging" (copy into assets/backgrounds/<theme>/bg.webp after)
 *   --width 3840 --height 2160
 *   --max-kb 800
 *   --min-quality 35  minimum WebP quality if budget can't be met (warns)
 *   --keep-names      keep base filename (still adds .webp); spaces stay as spaces
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

function parseArgs(argv) {
  const out = {
    inputDir: path.join(REPO_ROOT, "new theme images"),
    outputDir: path.join(REPO_ROOT, "assets", "premium-import-staging"),
    width: 3840,
    height: 2160,
    maxKb: 800,
    minQuality: 35,
    keepNames: false,
  };
  for (let i = 2; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--input" && argv[i + 1]) out.inputDir = path.resolve(argv[++i]);
    else if (a === "--out" && argv[i + 1]) out.outputDir = path.resolve(argv[++i]);
    else if (a === "--width" && argv[i + 1]) out.width = Number(argv[++i]);
    else if (a === "--height" && argv[i + 1]) out.height = Number(argv[++i]);
    else if (a === "--max-kb" && argv[i + 1]) out.maxKb = Number(argv[++i]);
    else if (a === "--min-quality" && argv[i + 1]) out.minQuality = Number(argv[++i]);
    else if (a === "--keep-names") out.keepNames = true;
    else if (a === "--help" || a === "-h") {
      console.log(`Usage: node scripts/process-premium-images.mjs [options]
  --input <dir>   --out <dir>   --width 3840 --height 2160
  --max-kb 800   --min-quality 35   --keep-names`);
      process.exit(0);
    }
  }
  return out;
}

function slugBase(name) {
  return name
    .replace(/\.[^.]+$/, "")
    .normalize("NFKD")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "image";
}

async function webpUnderBudget(absInput, { width, height, maxBytes, minQuality }) {
  let lo = minQuality;
  let hi = 95;
  let best = null;
  let bestQ = minQuality;

  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    const buf = await sharp(absInput)
      .rotate()
      .resize(width, height, { fit: "cover", position: "centre" })
      .webp({
        quality: mid,
        alphaQuality: Math.min(100, mid + 5),
        effort: 6,
        smartSubsample: true,
      })
      .toBuffer();
    if (buf.length <= maxBytes) {
      best = buf;
      bestQ = mid;
      lo = mid + 1;
    } else {
      hi = mid - 1;
    }
  }

  if (!best) {
    const buf = await sharp(absInput)
      .rotate()
      .resize(width, height, { fit: "cover", position: "centre" })
      .webp({
        quality: minQuality,
        alphaQuality: Math.min(100, minQuality + 5),
        effort: 6,
        smartSubsample: true,
      })
      .toBuffer();
    return { buf, quality: minQuality, underBudget: buf.length <= maxBytes };
  }
  return { buf: best, quality: bestQ, underBudget: true };
}

async function main() {
  const cfg = parseArgs(process.argv);
  const maxBytes = Math.round(cfg.maxKb * 1024);

  await fs.mkdir(cfg.outputDir, { recursive: true });

  let entries;
  try {
    entries = await fs.readdir(cfg.inputDir, { withFileTypes: true });
  } catch (e) {
    console.error(`Cannot read input dir: ${cfg.inputDir}\n${e.message}`);
    process.exit(1);
  }

  const files = entries
    .filter((d) => d.isFile())
    .map((d) => d.name)
    .filter((n) => /\.(png|jpe?g|tif{1,2}|webp)$/i.test(n));

  if (!files.length) {
    console.error(`No images found in ${cfg.inputDir}`);
    process.exit(1);
  }

  console.log(`Input:  ${cfg.inputDir}`);
  console.log(`Output: ${cfg.outputDir}`);
  console.log(`Size:   ${cfg.width}×${cfg.height}  max: ${cfg.maxKb} KB  min Q: ${cfg.minQuality}`);
  console.log("---");

  for (const name of files.sort()) {
    const absIn = path.join(cfg.inputDir, name);
    const base = cfg.keepNames ? path.parse(name).name : slugBase(name);
    const outName = `${base}.webp`;
    const absOut = path.join(cfg.outputDir, outName);

    const { buf, quality, underBudget } = await webpUnderBudget(absIn, {
      width: cfg.width,
      height: cfg.height,
      maxBytes,
      minQuality: cfg.minQuality,
    });
    await fs.writeFile(absOut, buf);
    const kb = (buf.length / 1024).toFixed(1);
    const flag = underBudget ? "✓" : "⚠ over budget";
    console.log(`${flag}  ${name} → ${outName}   ${kb} KB   Q=${quality}`);
  }

  console.log("---\nDone.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
