#!/usr/bin/env python3
"""One-off generator for small theme cursor PNGs (32×32, RGBA). Run from repo root: python3 scripts/generate-pro-cursors.py"""
from __future__ import annotations

import os
from PIL import Image, ImageDraw

S = 40
MID = S // 2


def rgba_img():
    return Image.new("RGBA", (S, S), (0, 0, 0, 0))


def save(path: str, im: Image.Image) -> None:
    os.makedirs(os.path.dirname(path), exist_ok=True)
    im.save(path, "PNG")
    print("wrote", path)


def inkversepop_spider() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    # Stylized spider chest emblem: red torso, blue center wedge, black legs
    cx, cy = MID, MID + 2
    d.ellipse([cx - 7, cy - 8, cx + 7, cy + 6], fill=(220, 32, 40, 255), outline=(20, 20, 28, 255), width=1)
    d.polygon([(cx, cy - 6), (cx - 4, cy + 2), (cx + 4, cy + 2)], fill=(0, 120, 255, 255))
    for i in (-1, 1):
        d.line([(cx + i * 8, cy - 2), (cx + i * 14, cy - 8)], fill=(20, 20, 28, 255), width=2)
        d.line([(cx + i * 8, cy + 1), (cx + i * 14, cy + 8)], fill=(20, 20, 28, 255), width=2)
    return im


def narnia_lamp() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.rectangle([MID - 1, MID - 4, MID + 1, MID + 16], fill=(55, 55, 62, 255))
    d.ellipse([MID - 8, MID - 14, MID + 8, MID + 2], fill=(255, 235, 160, 255), outline=(120, 100, 60, 255), width=1)
    return im


def sw_lightsaber() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.rectangle([MID - 2, MID - 16, MID + 2, MID + 14], fill=(120, 220, 255, 255))
    d.rectangle([MID - 1, MID - 15, MID + 1, MID + 12], fill=(220, 250, 255, 255))
    d.rectangle([MID - 3, MID + 14, MID + 3, MID + 17], fill=(120, 90, 70, 255))
    return im


def budapest_facade() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([MID - 14, MID - 12, MID + 14, MID + 14], radius=4, fill=(214, 158, 188, 255), outline=(120, 70, 100, 255), width=1)
    d.rectangle([MID - 3, MID + 4, MID + 3, MID + 14], fill=(255, 252, 248, 200))
    return im


def kill_bill_katana() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.line([(MID - 14, MID + 12), (MID + 14, MID - 12)], fill=(255, 240, 200, 255), width=3)
    d.line([(MID - 14, MID + 12), (MID + 14, MID - 12)], fill=(255, 255, 255, 120), width=1)
    return im


def alice_watch() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.ellipse([MID - 11, MID - 11, MID + 11, MID + 9], fill=(240, 215, 120, 255), outline=(100, 70, 30, 255), width=2)
    d.line([(MID, MID - 4), (MID, MID + 2)], fill=(40, 30, 20, 255), width=2)
    d.polygon([(MID - 2, MID + 2), (MID + 2, MID + 2), (MID, MID + 6)], fill=(40, 30, 20, 255))
    return im


def lighthouse_beam() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.polygon([(MID - 3, MID + 12), (MID + 3, MID + 12), (MID + 2, MID - 10), (MID - 2, MID - 10)], fill=(60, 60, 68, 255))
    d.polygon([(MID + 4, MID - 6), (MID + 12, MID - 2), (MID + 4, MID + 2)], fill=(255, 248, 200, 180))
    return im


def ruby_slippers() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.ellipse([MID - 14, MID - 2, MID - 2, MID + 10], fill=(200, 30, 55, 255), outline=(100, 10, 30, 255), width=1)
    d.ellipse([MID + 2, MID - 2, MID + 14, MID + 10], fill=(200, 30, 55, 255), outline=(100, 10, 30, 255), width=1)
    d.point([MID - 8, MID + 3], fill=(255, 200, 220, 255))
    d.point([MID + 8, MID + 3], fill=(255, 200, 220, 255))
    return im


def akira_bike() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.rounded_rectangle([MID - 10, MID - 4, MID + 10, MID + 4], radius=3, fill=(200, 35, 40, 255), outline=(40, 20, 20, 255), width=1)
    d.ellipse([MID - 12, MID + 2, MID - 4, MID + 10], fill=(35, 35, 40, 255), outline=(20, 20, 25, 255), width=1)
    d.ellipse([MID + 4, MID + 2, MID + 12, MID + 10], fill=(35, 35, 40, 255), outline=(20, 20, 25, 255), width=1)
    return im


def shrek_ear() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.polygon([(MID, MID - 14), (MID - 10, MID + 10), (MID + 4, MID + 2)], fill=(110, 160, 80, 255), outline=(45, 85, 35, 255), width=1)
    return im


def straw_hat() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.ellipse([MID - 16, MID - 6, MID + 16, MID + 10], fill=(215, 175, 95, 255), outline=(120, 80, 40, 255), width=1)
    d.arc([MID - 12, MID - 14, MID + 12, MID + 2], 180, 0, fill=(180, 50, 45, 255), width=3)
    return im


def bat_signal() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.ellipse([MID - 16, MID - 14, MID + 16, MID + 14], fill=(255, 230, 120, 60), outline=(255, 220, 90, 200), width=2)
    # minimal bat silh
    bat = [
        (MID - 8, MID + 2),
        (MID - 6, MID - 2),
        (MID - 2, MID),
        (MID, MID - 4),
        (MID + 2, MID),
        (MID + 6, MID - 2),
        (MID + 8, MID + 2),
        (MID + 4, MID + 2),
        (MID + 2, MID + 4),
        (MID - 2, MID + 4),
        (MID - 4, MID + 2),
    ]
    d.polygon(bat, fill=(35, 35, 45, 240))
    return im


def monolith() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.rectangle([MID - 6, MID - 14, MID + 6, MID + 16], fill=(14, 14, 18, 255), outline=(60, 60, 70, 255), width=1)
    return im


def mad_wheel_fix() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.ellipse([MID - 14, MID - 14, MID + 14, MID + 14], fill=(70, 55, 45, 255), outline=(40, 30, 25, 255), width=2)
    import math

    for ang in range(0, 360, 45):
        rad = math.radians(ang)
        x1 = MID + int(10 * math.cos(rad))
        y1 = MID + int(10 * math.sin(rad))
        x2 = MID + int(16 * math.cos(rad))
        y2 = MID + int(16 * math.sin(rad))
        d.line([(x1, y1), (x2, y2)], fill=(200, 95, 45, 255), width=2)
    d.ellipse([MID - 4, MID - 4, MID + 4, MID + 4], fill=(90, 70, 55, 255))
    return im


def jp_rex() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.polygon(
        [
            (MID, MID - 14),
            (MID + 12, MID + 10),
            (MID + 4, MID + 6),
            (MID - 4, MID + 6),
            (MID - 12, MID + 10),
        ],
        fill=(190, 140, 60, 255),
        outline=(60, 45, 25, 255),
        width=1,
    )
    d.ellipse([MID - 6, MID - 8, MID + 2, MID - 2], fill=(40, 35, 30, 255))
    return im


def barbie_heel() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.polygon([(MID - 2, MID + 12), (MID + 10, MID - 10), (MID + 6, MID - 8), (MID - 2, MID + 6)], fill=(255, 105, 180, 255), outline=(180, 40, 120, 255), width=1)
    return im


def bowler() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.ellipse([MID - 14, MID - 2, MID + 14, MID + 10], fill=(30, 30, 34, 255), outline=(10, 10, 12, 255), width=1)
    d.arc([MID - 10, MID - 12, MID + 10, MID + 2], 200, -20, fill=(20, 20, 24, 255), width=8)
    # Clockwork eyelash flair
    d.line([(MID + 8, MID - 6), (MID + 12, MID - 10)], fill=(245, 245, 250, 255), width=2)
    return im


def snowflake() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    c = (170, 220, 255, 255)
    for dx, dy in [(0, -12), (10, 6), (-10, 6)]:
        d.line([(MID, MID), (MID + dx, MID + dy)], fill=c, width=2)
    for dx, dy in [(0, 12), (-10, -6), (10, -6)]:
        d.line([(MID, MID), (MID + dx, MID + dy)], fill=c, width=2)
    d.ellipse([MID - 2, MID - 2, MID + 2, MID + 2], fill=(230, 248, 255, 255))
    return im


def lala_lamp() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.rectangle([MID - 1, MID - 6, MID + 1, MID + 14], fill=(75, 75, 82, 255))
    d.ellipse([MID - 10, MID - 12, MID + 10, MID - 2], fill=(255, 235, 190, 255), outline=(120, 90, 60, 255), width=1)
    return im


def heart_ocean() -> Image.Image:
    im = rgba_img()
    d = ImageDraw.Draw(im)
    d.polygon([(MID, MID + 10), (MID - 12, MID - 4), (MID - 6, MID - 10), (MID, MID - 4), (MID + 6, MID - 10), (MID + 12, MID - 4)], fill=(90, 190, 220, 255), outline=(40, 100, 150, 255), width=1)
    d.polygon([(MID, MID + 6), (MID - 6, MID - 2), (MID, MID - 6), (MID + 6, MID - 2)], fill=(200, 240, 255, 200))
    return im


def main() -> None:
    root = os.path.join(os.path.dirname(__file__), "..", "assets")
    root = os.path.abspath(root)
    items = [
        ("inkversepop/cursor.png", inkversepop_spider(), 16, 20),
        ("narnia/cursor-lamppost.png", narnia_lamp(), 20, 22),
        ("openingcrawl/cursor-lightsaber.png", sw_lightsaber(), 20, 18),
        ("mendlpastel/cursor-facade.png", budapest_facade(), 20, 20),
        ("bridesvengeance/cursor-katana.png", kill_bill_katana(), 20, 20),
        ("rabbitholedream/cursor-watch.png", alice_watch(), 20, 18),
        ("wickiesmono/cursor-lighthouse.png", lighthouse_beam(), 20, 22),
        ("emeraldmyth/cursor-slippers.png", ruby_slippers(), 20, 20),
        ("kanedared/cursor-bike.png", akira_bike(), 20, 22),
        ("swampfable/cursor-ear.png", shrek_ear(), 18, 12),
        ("grandlinesea/cursor-strawhat.png", straw_hat(), 20, 16),
        ("gothamvigil/cursor-batsignal.png", bat_signal(), 20, 18),
        ("discoverywhite/cursor-monolith.png", monolith(), 20, 20),
        ("furyroadheat/cursor-wheel.png", mad_wheel_fix(), 20, 20),
        ("islasplice/cursor-rex.png", jp_rex(), 20, 14),
        ("dreamhousepop/cursor-heel.png", barbie_heel(), 12, 18),
        ("droogclockwork/cursor-bowler.png", bowler(), 20, 14),
        ("frozenheart/cursor-snowflake.png", snowflake(), 20, 20),
        ("lalaland/cursor-lamp.png", lala_lamp(), 20, 18),
        ("titanicvow/cursor-heart.png", heart_ocean(), 20, 18),
    ]
    for rel, im, _hx, _hy in items:
        p = os.path.join(root, rel)
        save(p, im)


if __name__ == "__main__":
    main()
