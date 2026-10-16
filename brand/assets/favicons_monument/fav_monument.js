// Favicon set from the Monument symbol in public/logo-nav.svg (the exact mark in the site header).
const fs = require('fs'), path = require('path')
const { Resvg } = require('@resvg/resvg-js')
const [, , navSvg, outDir, previewDir] = process.argv
const src = fs.readFileSync(navSvg, 'utf8')
const sym = src.match(/<g transform="translate\(-0\.49 88\.12\) scale\(0\.49031\)">.*?<\/g><\/g>/)[0]
const probe = new Resvg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-20 0 1000 120" width="1000" height="120">${sym}</svg>`)
const b = probe.getBBox(); console.log('bbox', b)
function tile(size, frac, rx) {
  const s = (size * frac) / b.width
  const tx = size / 2 - (b.x + b.width / 2) * s, ty = size / 2 - (b.y + b.height / 2) * s
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">` +
    (rx === null ? '' : `<rect width="${size}" height="${size}" rx="${rx}" fill="#0B0D10"/>`) +
    `<g transform="translate(${tx.toFixed(3)} ${ty.toFixed(3)}) scale(${s.toFixed(5)})">${sym}</g></svg>`
}
const png = (svg, size) => new Resvg(svg, { fitTo: { mode: 'width', value: size } }).render().asPng()
const set = {
  'favicon-16.png': [16, 0.88, 2], 'favicon-32.png': [32, 0.84, 4], 'favicon-48.png': [48, 0.82, 6],
  'icon-192.png': [192, 0.74, 42.24], 'icon-512.png': [512, 0.74, 112.64],
  'apple-touch-icon.png': [180, 0.72, 0], 'icon-maskable-512.png': [512, 0.6, 0],
}
for (const [f, [size, frac, rx]] of Object.entries(set)) {
  fs.writeFileSync(path.join(outDir, f), png(tile(size, frac, rx), size))
  if (previewDir) fs.writeFileSync(path.join(previewDir, f), png(tile(size, frac, rx), size))
}
fs.writeFileSync(path.join(outDir, 'favicon.svg'), tile(512, 0.74, 112.64))
console.log('ok')
