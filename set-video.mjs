import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { youtubeLink } from "./src/data/legacyVideoLinks.js";
import { videoLibrary } from "./src/data/videoLibrary.js";
const root = path.dirname(fileURLToPath(import.meta.url));
const [id, input, ...extra] = process.argv.slice(2),
  ids = Object.keys(videoLibrary);
const usage = 'Gunakan: node set-video.mjs foundations "PAUTAN_YOUTUBE"\nPilihan: --clear (sembunyikan video utama), --reset (guna pilihan asal), --default (guna video cadangan EQUILAB).\nModul: ' + ids.join(', ');
if (!ids.includes(id) || !input || extra.length) throw Error(usage);
const target = path.join(root, "src/data/videoOverrides.json");
const settings = fs.existsSync(target) ? JSON.parse(fs.readFileSync(target, 'utf8').replace(/^\uFEFF/, '')) : {};
if (!settings || Array.isArray(settings) || typeof settings !== 'object' || Object.entries(settings).some(([key, value]) => !ids.includes(key) || value !== null && value !== '' && !youtubeLink(value))) throw Error('Tetapan video tidak sah. Tiada fail diubah.');
let value;
if (input === '--clear') value = null;else if (input === '--default') value = videoLibrary[id][0].url;else if (input !== '--reset') {
  value = youtubeLink(input);
  if (!value) throw Error('Pautan tidak sah. Gunakan pautan HTTPS bagi satu video YouTube. Tiada fail diubah.');
}
if (input === '--reset') delete settings[id];else settings[id] = value;
const next = JSON.stringify(settings, null, 2) + '\n';
if (fs.existsSync(target) && fs.readFileSync(target, 'utf8') === next) {
  console.log('Tetapan sama; tiada perubahan.');
  process.exit(0);
}
const backup = target + '.backup-' + Date.now(),
  temp = target + '.tmp-' + process.pid;
if (fs.existsSync(target)) fs.copyFileSync(target, backup);
try {
  fs.writeFileSync(temp, next, {
    flag: 'wx'
  });
  fs.renameSync(temp, target);
} finally {
  if (fs.existsSync(temp)) fs.unlinkSync(temp);
}
console.log('BERJAYA: video utama ' + id + ' dikemas kini. Video tambahan dikekalkan.');
console.log('Sandaran: ' + backup + '\nMuat semula tab EQUILAB.');
