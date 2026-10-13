# Destiny Cloud — landing page

React 19 + Vite + TypeScript. Static site, no backend. Fonts are bundled (`@fontsource`), so the page loads nothing from third parties.

All copy lives in [`src/content.ts`](src/content.ts) (services, process, engagements, principles, contact email).
Layout is in [`src/App.tsx`](src/App.tsx), styles in [`src/index.css`](src/index.css).

## Develop

```bash
npm ci
npm run dev
```

`npm run build` type-checks and writes `dist/`. `npm run lint` runs oxlint.

## Deploy

Runs on the VPS in `/opt/dc-landing-page`: an `nginx-unprivileged` container (`dc-web`) serving `web/` on port 8080
inside its own Docker network, and its own Cloudflare tunnel (`cloudflared`). No port is opened on the VPS.

```bash
./deploy/deploy.sh
```

builds, rsyncs `dist/` to `/opt/dc-landing-page/web/` and brings the stack up. Content updates need no restart.

**One-time tunnel setup:** Cloudflare Zero Trust → Networks → Tunnels → Create (Cloudflared), name `dc-landing-page`.
Add a public hostname → service `HTTP` `dc-web:8080`. Copy the token, then on the VPS:

```bash
cd /opt/dc-landing-page && read -rs -p 'Tunnel token: ' T; echo; printf 'TUNNEL_TOKEN=%s\n' "$T" > data/cloudflared.env; chmod 600 data/cloudflared.env; unset T
docker compose --profile tunnel up -d
```
