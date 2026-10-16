# Small favicons from the Monument symbol profile: the real curve and taper, with strokes held at a minimum
# pixel thickness and the base line snapped to a pixel row so it stays crisp.
import json, sys
from PIL import Image, ImageDraw
p = json.load(open('sym-prof.json'))
ORANGE, CREAM, BG = (255, 122, 61, 255), (236, 233, 226, 255), (11, 13, 16, 255)
def make(size, frac, min_arc, min_base, radius, lift):
    SS = 16; S = size * SS; w = size * frac
    x0 = (size - w) / 2
    mid = p['base'][len(p['base']) // 2]; base_c = (mid[1] + mid[2]) / 2
    # centre the symbol's height, then nudge so the base centreline sits on a pixel centre
    top = (size - p['h'] * w) / 2
    yb = top + base_c * w; top += (round(yb - 0.5) + 0.5) - yb
    im = Image.new('RGBA', (S, S), (0, 0, 0, 0)); d = ImageDraw.Draw(im)
    d.rounded_rectangle([0, 0, S - 1, S - 1], radius=radius * SS, fill=BG)
    def band(prof, tmin, col, taper_ends, dy=0):
        n = len(prof); up, dn = [], []
        for i, (fx, a, b) in enumerate(prof):
            c = (a + b) / 2 * w + top - dy; t = (b - a) * w
            k = min(1, min(i, n - 1 - i) / (n * taper_ends)) if taper_ends else 1
            t = max(t, tmin * (0.35 + 0.65 * k))
            X = (x0 + fx * w) * SS
            up.append((X, (c - t / 2) * SS)); dn.append((X, (c + t / 2) * SS))
        d.polygon(up + dn[::-1], fill=col)
    band(p['base'], min_base, CREAM, 0.12)
    band(p['arc'], min_arc, ORANGE, 0.18, lift)  # lift keeps the gap above the base once strokes thicken
    return im.resize((size, size), Image.BOX)
spec = {16: (0.9, 1.7, 1.2, 2, 0.5), 32: (0.86, 2.6, 1.7, 4, 1.0), 48: (0.84, 3.4, 2.2, 6, 1.3)}
out = {s: make(s, *v) for s, v in spec.items()}
d = sys.argv[1]
out[16].save(f'{d}/favicon-16.png'); out[32].save(f'{d}/favicon-32.png'); out[48].save(f'{d}/favicon-48.png')
out[48].save(f'{d}/favicon.ico', sizes=[(16, 16), (32, 32), (48, 48)], append_images=[out[16], out[32]])
W = Image.new('RGBA', (16 * 12 + 32 * 6 + 48 * 4 + 60 + 120, 230), (60, 60, 60, 255)); x = 10
for s, z in [(16, 12), (32, 6), (48, 4)]:
    i = out[s].resize((s * z, s * z), Image.NEAREST); W.paste(i, (x, 10), i); x += s * z + 10
for s in (16, 32):
    W.paste(out[s], (x, 20 + s * 2), out[s]); x += s + 14
W.save('fav-preview2.png')
