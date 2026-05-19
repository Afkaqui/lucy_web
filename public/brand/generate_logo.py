"""
LucyScan Logo Generator
Genera todos los assets de marca desde una sola fuente.

Uso:
    pip install matplotlib numpy Pillow svgwrite
    python generate_logo.py

Salida (en esta misma carpeta public/brand/):
    logo.svg          → Web (navbar, HTML)
    logo-512.png      → Uso general / og:image base
    logo-256.png      → Uso general
    logo-180.png      → Apple touch icon (app/apple-icon.png)
    logo-64.png       → Favicon hires
    logo-32.png       → Favicon estándar (app/favicon.ico source)
    logo-email.png    → Email (fondo transparente, 200x200)
"""

import os
import numpy as np
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.path import Path
from PIL import Image

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

# ── Paleta ────────────────────────────────────────────────────────────────────
PRIMARY_BLUE  = '#0b5394'
ACCENT_TEAL   = '#4cc9f0'
WHITE         = '#ffffff'

# ── Tamaños a exportar ────────────────────────────────────────────────────────
PNG_SIZES = [
    ('logo-512.png',   512),
    ('logo-256.png',   256),
    ('logo-180.png',   180),
    ('logo-64.png',    64),
    ('logo-32.png',    32),
    ('logo-email.png', 200),
]


def draw_logo(ax):
    """
    Dibuja el logo en los ejes dados.
    Espacio de coordenadas: [0, 1] × [0, 1].
    El diseño ocupa [PAD, 1-PAD] en ambos ejes para padding uniforme.
    """
    PAD = 0.06   # Margen interior uniforme (6 % a cada lado)

    ax.set_xlim(0, 1)
    ax.set_ylim(0, 1)
    ax.set_aspect('equal')
    ax.axis('off')

    t = np.linspace(0, 2 * np.pi, 300)

    # ── 1. CORAZÓN BASE ───────────────────────────────────────────────────────
    xh = 16 * np.sin(t) ** 3
    yh = (13 * np.cos(t)
          - 5  * np.cos(2 * t)
          - 2  * np.cos(3 * t)
          -      np.cos(4 * t))

    # Normalizar a [0, 1]
    xh = (xh - xh.min()) / (xh.max() - xh.min())
    yh = (yh - yh.min()) / (yh.max() - yh.min())

    # Escalar dentro del padding y centrar perfectamente
    sx = 1 - 2 * PAD
    sy = sx * 0.92          # ligeramente más bajo que ancho (corazón estándar)
    cx, cy = 0.5, 0.5       # centro exacto del canvas

    xf = xh * sx + (cx - sx / 2)
    yf = yh * sy + (cy - sy / 2) + 0.02  # +0.02 sube levemente el apex

    ax.fill(xf, yf, color=PRIMARY_BLUE, zorder=1, joinstyle='round')

    # ── 2. MANGO DE LA LUPA (L cursiva) ──────────────────────────────────────
    # Puntos ajustados para que el trazo quede centrado en el corazón
    lens_c  = (0.63, 0.58)   # centro de la lente
    lens_r  = 0.155

    verts_h = [
        (0.34, 0.73),                                                   # inicio arriba-izq
        (0.24, 0.38),                                                   # ctrl 1 (baja y curva)
        (0.52, 0.28),                                                   # ctrl 2 (base de la L)
        (lens_c[0] - lens_r * 0.75, lens_c[1] - lens_r * 0.18),       # une con la lente
    ]
    codes_h = [Path.MOVETO, Path.CURVE4, Path.CURVE4, Path.CURVE4]

    patch_h = patches.PathPatch(
        Path(verts_h, codes_h),
        facecolor='none', edgecolor=WHITE,
        linewidth=18, capstyle='round', joinstyle='round', zorder=2,
    )
    ax.add_patch(patch_h)

    # ── 3. LENTE ──────────────────────────────────────────────────────────────
    # Círculo exterior blanco
    ax.add_patch(patches.Circle(lens_c, lens_r, color=WHITE, zorder=2))
    # Hueco interior azul
    ax.add_patch(patches.Circle(lens_c, lens_r - 0.048, color=PRIMARY_BLUE, zorder=3))

    # ── 4. MINI CORAZÓN TURQUESA (punto focal) ────────────────────────────────
    scale_mh = 0.072
    mhx = 16 * np.sin(t) ** 3
    mhy = (13 * np.cos(t) - 5 * np.cos(2 * t)
           - 2 * np.cos(3 * t) - np.cos(4 * t))
    mhx = (mhx - mhx.min()) / (mhx.max() - mhx.min()) * scale_mh + lens_c[0] - scale_mh / 2
    mhy = (mhy - mhy.min()) / (mhy.max() - mhy.min()) * scale_mh + lens_c[1] - scale_mh / 2
    ax.fill(mhx, mhy, color=ACCENT_TEAL, zorder=4)

    # ── 5. BRILLO EN LA LENTE ─────────────────────────────────────────────────
    ax.add_patch(patches.Ellipse(
        (lens_c[0] - 0.057, lens_c[1] + 0.058),
        0.048, 0.028, angle=45,
        color=WHITE, alpha=0.75, zorder=5,
    ))


def make_figure():
    """Crea figura cuadrada limpia con fondo transparente."""
    fig = plt.figure(figsize=(4, 4), dpi=300)
    ax  = fig.add_axes([0, 0, 1, 1])   # ocupa todo el canvas, sin márgenes matplotlib
    return fig, ax


def export_svg(path):
    fig, ax = make_figure()
    draw_logo(ax)
    fig.savefig(path, format='svg', transparent=True, bbox_inches=None)
    plt.close(fig)
    print(f'  OK {os.path.basename(path)}')


def export_png_master(path, dpi=300):
    """PNG máster a resolución alta (base para redimensionar)."""
    fig, ax = make_figure()
    draw_logo(ax)
    fig.savefig(path, format='png', transparent=True, bbox_inches=None, dpi=dpi)
    plt.close(fig)
    return path


def resize_png(src_path, dest_path, size):
    """Redimensiona el máster a tamaño exacto con Pillow (mejor antialiasing)."""
    img = Image.open(src_path).convert('RGBA')
    img = img.resize((size, size), Image.LANCZOS)
    img.save(dest_path, format='PNG', optimize=True)
    print(f'  OK {os.path.basename(dest_path):25s} ({size}x{size})')


# ── MAIN ──────────────────────────────────────────────────────────────────────
if __name__ == '__main__':
    print('\nGenerando assets de marca LucyScan...')

    # 1. SVG
    svg_path = os.path.join(OUTPUT_DIR, 'logo.svg')
    export_svg(svg_path)

    # 2. Máster PNG a alta resolución (1200×1200 equivalente)
    master_path = os.path.join(OUTPUT_DIR, '_master.png')
    export_png_master(master_path, dpi=300)  # 4in × 300dpi = 1200px

    # 3. Todos los tamaños PNG
    print()
    for filename, size in PNG_SIZES:
        dest = os.path.join(OUTPUT_DIR, filename)
        resize_png(master_path, dest, size)

    # 4. Limpiar máster temporal
    os.remove(master_path)

    print(f'\nListos en: {OUTPUT_DIR}\n')
    print('Archivos para reemplazar en el proyecto (con aprobación):')
    print('  logo-180.png  →  app/apple-icon.png')
    print('  logo-32.png   →  app/favicon.ico  (convertir a .ico primero)')
    print('  logo-512.png  →  app/icon.png  y  public/logo.png')
    print('  logo-email.png → public/logo-email.png  (para lib/email.ts)')
    print('  logo.svg       → public/logo.svg  (para navbar)')
