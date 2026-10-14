# Favicons (rebuilt)

The supplier's follow-up favicon files (`../followup/favicons_as_supplied`) scaled the symbol to about a fifth of the tile and
placed it in the top-left corner, and their `favicon.ico` held only the 16px size. These files rebuild the set from the
supplier's own small-symbol artwork (`../followup/small_symbol`):

- `favicon-16/32/48.png` and `favicon.ico` (16, 32, 48): the supplier's hand-tuned pixel PNGs, unchanged.
- `favicon.svg`, `icon-192.png`, `icon-512.png`: Ink rounded tile, symbol centred at 70% of the width.
- `apple-touch-icon.png`: same, square (iOS rounds the corners itself).
- `icon-maskable-512.*`: full-bleed square, symbol at 56% so it stays inside Android's 80% safe circle.

`build.js` regenerates the SVG/PNG files (`npm i @resvg/resvg-js@2.6.2`, then `node build.js <out-dir>`).
