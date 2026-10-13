#!/usr/bin/env bash
# Build locally and ship to the VPS. Run from the repo root on your Mac.
set -euo pipefail
VPS=${VPS:-root@201.18.212.223}
DIR=/opt/dc-landing-page

npm ci
npm run build
ssh "$VPS" "mkdir -p $DIR/web $DIR/deploy $DIR/data"
rsync -az docker-compose.yml "$VPS:$DIR/"
rsync -az deploy/nginx.conf "$VPS:$DIR/deploy/"
rsync -az --delete dist/ "$VPS:$DIR/web/"
# Start the tunnel too once data/cloudflared.env exists.
ssh "$VPS" "cd $DIR && if [ -s data/cloudflared.env ]; then docker compose --profile tunnel up -d; else docker compose up -d; fi && docker compose ps"
