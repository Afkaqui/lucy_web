"""
LucyScan - Open Graph image generator
Genera public/og-image.png (1200x630) para previews en Google, WhatsApp,
Facebook, LinkedIn y X/Twitter.

Uso:
    python generate_og.py
"""

import os
from PIL import Image, ImageDraw, ImageFont

THIS_DIR   = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.dirname(THIS_DIR)            # .../public
LOGO_PATH  = os.path.join(THIS_DIR, 'logo-512.png')
OUT_PATH   = os.path.join(PUBLIC_DIR, 'og-image.png')

# Paleta de marca
NAVY       = (13,  27,  45)       # #0d1b2d
NAVY_LIGHT = (18,  36,  60)       # #12243c
BLUE       = (11,  83, 148)       # #0b5394
GREEN      = (16, 185, 129)       # #10b981
WHITE      = (255, 255, 255)


def get_font(size, bold=False):
    win = 'C:/Windows/Fonts/'
    candidates = (
        [win + 'calibrib.ttf', win + 'arialbd.ttf', win + 'verdanab.ttf']
        if bold else
        [win + 'calibri.ttf', win + 'arial.ttf', win + 'verdana.ttf']
    )
    for path in candidates:
        if os.path.exists(path):
            return ImageFont.truetype(path, size)
    return ImageFont.load_default()


def make_og(out_path, w=1200, h=630):
    img  = Image.new('RGB', (w, h), NAVY)
    draw = ImageDraw.Draw(img)

    # Gradiente horizontal suave
    for x in range(w):
        t = x / w
        r = int(NAVY[0] + (NAVY_LIGHT[0] - NAVY[0]) * t)
        g = int(NAVY[1] + (NAVY_LIGHT[1] - NAVY[1]) * t)
        b = int(NAVY[2] + (NAVY_LIGHT[2] - NAVY[2]) * t)
        draw.line([(x, 0), (x, h)], fill=(r, g, b))

    # Punto de luz difuso a la derecha
    glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gd   = ImageDraw.Draw(glow)
    cx, cy = int(w * 0.82), int(h * 0.5)
    for radius in range(420, 0, -4):
        alpha = int(22 * (1 - radius / 420))
        gd.ellipse([cx - radius, cy - radius, cx + radius, cy + radius], fill=(*BLUE, alpha))
    img.paste(glow, (0, 0), glow)

    # Barra verde de acento (izquierda)
    draw.rectangle([80, 250, 84, 250 + 130], fill=GREEN)

    # Logo a la derecha
    logo_px = 300
    logo = Image.open(LOGO_PATH).convert('RGBA').resize((logo_px, logo_px), Image.LANCZOS)
    img.paste(logo, (w - logo_px - 90, (h - logo_px) // 2), logo)

    # Nombre "LucyScan"
    font_name = get_font(96, bold=True)
    name_x, name_y = 110, 235
    n1, n2 = 'Lucy', 'Scan'
    b1 = draw.textbbox((0, 0), n1, font=font_name)
    draw.text((name_x, name_y), n1, font=font_name, fill=GREEN)
    draw.text((name_x + (b1[2] - b1[0]), name_y), n2, font=font_name, fill=WHITE)

    # Tagline
    font_tag = get_font(38, bold=False)
    draw.text((112, 360),
              'Detección temprana de cáncer de piel con IA',
              font=font_tag, fill=(200, 220, 240))

    # Etiqueta superior
    font_kicker = get_font(26, bold=True)
    draw.text((112, 150), 'PRE-DIAGNÓSTICO DERMATOLÓGICO', font=font_kicker, fill=BLUE)

    img.save(out_path, format='PNG', optimize=True)
    print(f'OK  {os.path.relpath(out_path, PUBLIC_DIR)}  ({w}x{h})')


if __name__ == '__main__':
    make_og(OUT_PATH)
    print('Listo:', OUT_PATH)
