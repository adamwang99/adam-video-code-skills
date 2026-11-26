#!/usr/bin/env node
// Xuat MOT anh moi nhip de tu cham truoc khi render ca phim. Dung: node kiem-tra-theo-nhip.js <video.html> <thu-muc-ra> [--bpm 120] [--dur 8]
const { chromium } = require('playwright'); const fs = require('fs'), path = require('path');
const a = process.argv.slice(2); const opt = (k, d) => { const i = a.indexOf('--' + k); return i > -1 ? a[i + 1] : d; };
(async () => {
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: 1280, height: 720 } });
  await pg.goto('file://' + path.resolve(a[0]) + '?render=1'); await pg.waitForFunction(() => typeof window.seek === 'function');
  const dur = +opt('dur', await pg.evaluate(() => window.DURATION)), bpm = +opt('bpm', 120); fs.mkdirSync(a[1], { recursive: true });
  for (let b = 0; b * 60 / bpm < dur; b++) { await pg.evaluate(t => window.seek(t), b * 60 / bpm); await pg.screenshot({ path: path.join(a[1], 'nhip-' + String(b).padStart(3, '0') + '.png') }); }
  await br.close(); console.log('Xong. Xem tung anh, cham 1-10, sua cai thap nhat, lap lai.');
})();
