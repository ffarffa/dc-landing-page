# Archived designs (not built)

Design A (`src/`) is the live site. Designs B and C are kept here for reference; nothing in this folder is
bundled or deployed (Vite only builds `src/` and copies `public/`).

| Folder | What |
|---|---|
| `b-src/`, `b-assets/` | Design B: light paper + soft 3D clay art, DM Serif Display + Manrope. Art made with the image-generation connector (session "Destiny Cloud landing page, design B") |
| `c-src/`, `c-assets/` | Design C: edgy, futuristic, starlines. Space Grotesk + IBM Plex Mono. Art from the session "Destiny Cloud landing page, design C" |
| `Root.tsx`, `switcher.css` | The A / B / C / side-by-side switcher |

To bring them back: move `b-src` to `src/b`, `c-src` to `src/c`, `b-assets` to `public/b`, `c-assets` to `public/c`,
`Root.tsx` and `switcher.css` to `src/`, render `<Root />` in `src/main.tsx`, and reinstall the fonts:
`npm i @fontsource/dm-serif-display @fontsource-variable/manrope @fontsource-variable/space-grotesk @fontsource/ibm-plex-mono`.
Side-by-side mode also needs `frame-ancestors 'self'` and `X-Frame-Options SAMEORIGIN` in `deploy/nginx.conf`.
