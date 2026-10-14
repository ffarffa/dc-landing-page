// Rebuild the favicon set from the supplier's small-symbol paths (small_symbol/svg), centred and scaled.
const fs = require('fs'), path = require('path')
const { Resvg } = require('@resvg/resvg-js')
const out = process.argv[2]
const ARC = 'M 5.5 29.5 C 10.2 21.2 16.5 14.1 23.3 13.0 C 30.8 11.7 37.0 18.1 42.5 29.0 C 36.8 22.3 30.3 17.0 23.8 17.0 C 17.3 17.0 11.0 23.0 5.5 29.5 Z'
const BASE = 'M 4.0 34.0 C 13.0 33.0 31.0 33.2 44.0 34.0 C 31.0 35.0 13.0 35.2 4.5 35.5 C 3.2 35.5 3.0 34.3 4.0 34.0 Z'
// Symbol bounds in its 48-unit box: x 3.0..44.5, y 11.7..35.5
const cx = (3.0 + 44.5) / 2, cy = (11.7 + 35.5) / 2, w = 44.5 - 3.0
function tile(fraction, rounded = true) {
  const s = (512 * fraction) / w
  const tx = (256 - cx * s).toFixed(2), ty = (256 - cy * s).toFixed(2)
  return `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
<rect width="512" height="512"${rounded ? ' rx="112.64"' : ''} fill="#0B0D10"/>
<g transform="translate(${tx} ${ty}) scale(${s.toFixed(4)})">
<path d="${ARC}" fill="#FF7A3D"/>
<path d="${BASE}" fill="#ECE9E2"/>
</g></svg>
`
}
const png = (svg, size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng()
const icon = tile(0.70)            // standard tile: symbol 70% of the width
const maskable = tile(0.56, false) // full-bleed square; symbol inside the 80% safe circle
fs.writeFileSync(path.join(out, 'favicon.svg'), icon)
fs.writeFileSync(path.join(out, 'icon-maskable-512.svg'), maskable)
fs.writeFileSync(path.join(out, 'apple-touch-icon.png'), png(tile(0.70, false), 180)) // iOS rounds the corners itself
fs.writeFileSync(path.join(out, 'icon-192.png'), png(icon, 192))
fs.writeFileSync(path.join(out, 'icon-512.png'), png(icon, 512))
fs.writeFileSync(path.join(out, 'icon-maskable-512.png'), png(maskable, 512))
console.log('ok')
