// Assembles www/ (the folder the desktop app loads) from the exact web assets —
// single source of truth: desktop ships the same files as the web/Pages build.
const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const www = path.join(root, 'www');
const ASSETS = ['index.html', 'lifecyclecompass.html', 'icon.svg', 'pwa-icon.svg', 'pwa-icon-192.png', 'pwa-icon-512.png'];
fs.rmSync(www, { recursive: true, force: true });
fs.mkdirSync(www, { recursive: true });
for (const a of ASSETS) {
  const src = path.join(root, a);
  if (!fs.existsSync(src)) { console.error('make-www: missing', a); process.exit(1); }
  fs.cpSync(src, path.join(www, a), { recursive: true });
}
console.log('make-www: assembled www/');
