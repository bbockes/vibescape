#!/usr/bin/env python3
"""
Remove backgrounds (rembg) + normalize to 128×128 transparent PNGs for CSS cursors.

Requires: scripts/.venv with `pip install "rembg[cpu]" pillow`
Run from repo root:
  scripts/.venv/bin/python scripts/process-cursor-imports.py

Defaults:
  --in   assets/cursors/raw
  --out  assets/cursors/processed
  --size 128
"""
from __future__ import annotations

import argparse
import io
import os
import re
import sys
from pathlib import Path

from PIL import Image

try:
    from rembg import remove
except ImportError:
    print('Install rembg in this repo venv: scripts/.venv/bin/pip install "rembg[cpu]" pillow', file=sys.stderr)
    sys.exit(1)

# After normalizing to --size×--size, optional extra linear scale (square output; matches newtab cursor hotspots).
POST_FIT_LINEAR_SCALE: dict[str, float] = {
    "spirited-away-cursor.png": 0.5,
    "alice-in-wonderland-cursor.png": 0.7,
    "blade-runner-cursor.png": 0.75,
    "frozen-cursor.png": 0.5625,
    "lord-of-the-rings-cursor.png": 0.7,
    "shrek-cursor.png": 0.6,
    "stranger-things-cursor.png": 0.65,
}

# Uniform zoom then crop back to the current square (Chrome 128px cap). Tuple: (zoom, vertical: "center"|"top"|"bottom").
ZOOM_SQUARE_CROP: dict[str, tuple[float, str]] = {
    "scissorhands-cursor.png": (1.2, "bottom"),
}


def slug_output_name(path: Path) -> str:
    base = path.stem.lower()
    base = re.sub(r"[^a-z0-9]+", "-", base)
    return (base.strip("-") or "cursor") + ".png"


def fit_square_rgba(im: Image.Image, size: int) -> Image.Image:
    im = im.convert("RGBA")
    w, h = im.size
    if w == 0 or h == 0:
        return Image.new("RGBA", (size, size), (0, 0, 0, 0))
    scale = min(size / w, size / h)
    nw = max(1, int(round(w * scale)))
    nh = max(1, int(round(h * scale)))
    im = im.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    ox = (size - nw) // 2
    oy = (size - nh) // 2
    canvas.paste(im, (ox, oy), im)
    return canvas


def zoom_square_crop(im: Image.Image, zoom: float, vertical: str = "center") -> Image.Image:
    """Scale a square RGBA by `zoom`, then crop to the original side length (horizontal center)."""
    im = im.convert("RGBA")
    w, h = im.size
    if w != h or w <= 0:
        return im
    out_side = w
    w2 = max(1, round(w * zoom))
    h2 = max(1, round(h * zoom))
    scaled = im.resize((w2, h2), Image.Resampling.LANCZOS)
    left = (w2 - out_side) // 2
    if vertical == "bottom":
        top = max(0, h2 - out_side)
    elif vertical == "top":
        top = 0
    else:
        top = (h2 - out_side) // 2
    return scaled.crop((left, top, left + out_side, top + out_side))


def main() -> None:
    root = Path(__file__).resolve().parent.parent
    ap = argparse.ArgumentParser()
    ap.add_argument("--in", dest="in_dir", default=str(root / "assets" / "cursors" / "raw"))
    ap.add_argument("--out", dest="out_dir", default=str(root / "assets" / "cursors" / "processed"))
    ap.add_argument("--size", type=int, default=128)
    args = ap.parse_args()

    inp = Path(args.in_dir)
    out = Path(args.out_dir)
    out.mkdir(parents=True, exist_ok=True)

    if not inp.is_dir():
        print(f"Input dir missing: {inp}", file=sys.stderr)
        sys.exit(1)

    exts = {".png", ".jpg", ".jpeg", ".jpe", ".webp", ".bmp", ".gif"}
    files = sorted(p for p in inp.iterdir() if p.is_file() and p.suffix.lower() in exts)
    if not files:
        print(f"No images in {inp}")
        return

    for src in files:
        dest = out / slug_output_name(src)
        raw = src.read_bytes()
        cut = remove(raw)
        im = Image.open(io.BytesIO(cut))
        im = fit_square_rgba(im, args.size)
        scale = POST_FIT_LINEAR_SCALE.get(dest.name)
        if scale is not None:
            n = max(1, round(args.size * scale))
            im = im.resize((n, n), Image.Resampling.LANCZOS)
        zt = ZOOM_SQUARE_CROP.get(dest.name)
        if zt is not None:
            zf, v_anchor = zt
            im = zoom_square_crop(im, zf, v_anchor)
        im.save(dest, "PNG", optimize=True)
        print("wrote", dest.relative_to(root))


if __name__ == "__main__":
    main()
