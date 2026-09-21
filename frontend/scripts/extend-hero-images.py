"""Extend hero photos vertically so the mobile hero stops magnifying them.

Usage: python scripts/extend-hero-images.py [out_dir]
Writes <name>-tall.jpg next to the sources (or into out_dir) at 1024x1024.

object-cover scales by containerH/imageH, so a 1024x548 photo is blown up ~1.54x
on a phone and only a quarter of its width survives. Making the file taller cuts
that scale factor. The added area is an edge-clamp smear -- each column keeps
its own edge colour and runs outward -- progressively blurred and darkened so it
reads as vignette. Mirroring was tried first and duplicated the subject.
Nothing inside the original frame is altered.
"""
import sys, os
from PIL import Image, ImageFilter

SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'images', 'hero')
OUT = sys.argv[1] if len(sys.argv) > 1 else SRC
TARGET_H = 1024
TOP_SHARE = 0.55       # default split: a little more headroom than floor

# Per-image overrides, keyed by filename prefix.
#   top_share 1.0 puts the whole extension above the horizon (all sky, no floor)
#   skip      leaves the photo at its native size — the slide uses the original
PER_IMAGE = {
    'oil_': {'top_share': 1.0},
    # The shopper reads best right-anchored at its native size on mobile, so it
    # gets no extension; Hero.tsx points that slide at the untouched file.
    'istockphoto-2155498776': {'skip': True},
}


def config(name):
    for prefix, cfg in PER_IMAGE.items():
        if name.startswith(prefix):
            return cfg
    return {}
SAMPLE_ROWS = 8        # averaged so sensor noise doesn't become stripes
BLUR_NEAR, BLUR_FAR = 9, 40
MAX_DARKEN = 0.55      # brightness multiplier at the outermost row

def band(img, px, from_top):
    w, h = img.size
    edge = img.crop((0, 0, w, SAMPLE_ROWS)) if from_top else img.crop((0, h - SAMPLE_ROWS, w, h))
    smear = edge.resize((w, 1), Image.BOX).resize((w, px), Image.BILINEAR)
    # Row 0 is the seam while we build the ramps; flip back afterwards for the top.
    if from_top:
        smear = smear.transpose(Image.FLIP_TOP_BOTTOM)
    near = smear.filter(ImageFilter.GaussianBlur(BLUR_NEAR))
    far = smear.filter(ImageFilter.GaussianBlur(BLUR_FAR))
    ramp = Image.linear_gradient('L').resize((w, px))           # 0 at seam -> 255 outward
    out = Image.composite(far, near, ramp)
    out = Image.composite(Image.new('RGB', (w, px)), out,
                          ramp.point(lambda v: int(v * MAX_DARKEN)))
    return out.transpose(Image.FLIP_TOP_BOTTOM) if from_top else out

os.makedirs(OUT, exist_ok=True)
for name in sorted(os.listdir(SRC)):
    if not name.endswith('.jpg') or name.endswith('-tall.jpg'):
        continue
    cfg = config(name)
    if cfg.get('skip'):
        print(f'{name}: skipped (slide uses the original)'); continue
    img = Image.open(os.path.join(SRC, name)).convert('RGB')
    w, h = img.size
    pad = TARGET_H - h
    if pad <= 0:
        print(f'{name}: already {w}x{h}, skipped'); continue
    top = int(pad * cfg.get('top_share', TOP_SHARE)); bot = pad - top
    canvas = Image.new('RGB', (w, TARGET_H))
    if top:
        canvas.paste(band(img, top, True), (0, 0))
    canvas.paste(img, (0, top))
    if bot:
        canvas.paste(band(img, bot, False), (0, top + h))
    dst = os.path.join(OUT, name[:-4] + '-tall.jpg')
    canvas.save(dst, 'JPEG', quality=86, optimize=True, progressive=True)
    print(f'{name}: {w}x{h} -> {w}x{TARGET_H} (+{top}/-{bot}) {os.path.getsize(dst)//1024}KB')
