# Favicons from the Monument symbol

The live favicon set, matching the mark in the site header (`public/logo-nav.svg`).

- `fav_monument.js` (node + @resvg/resvg-js): the 180/192/512 icons and `favicon.svg`, drawn from the exact symbol.
- `hint_fav.py` (Pillow): the 16/32/48 favicons and `favicon.ico`. It uses `sym-prof.json`, the arc and base
  profile measured from a high-resolution render of the symbol, and keeps strokes at a minimum pixel thickness so
  the flat arch survives at tab size. Corners are rounded 2px at 16px.

Replaces `../favicons_rebuilt`, which was drawn from the taller follow-up symbol.
