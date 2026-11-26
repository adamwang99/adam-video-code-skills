#!/usr/bin/env node
// Render mot trang HTML co window.seek(t) thanh mp4. Can: node, playwright (chromium), ffmpeg.
// Dung: node render.js <video.html> <ra.mp4> [--w 1280] [--h 720] [--fps 30] [--dur 8] [--audio nhac.wav] [--mau 1] [--giu-khung]
// --mau N : ve N khung con moi khung hinh roi tron (tmix) de co mo chuyen dong (motion blur). Mac dinh 1 (tat).
const { chromium } = require('playwright'); const { spawnSync } = require('child_process');
const fs = require('fs'), path = require('path'), os = require('os');
const a = process.argv.slice(2); const html = a[0], out = a[1];
if (!html || !out) { console.error('Dung: node render.js <video.html> <ra.mp4> [tuy chon]'); process.exit(1); }
const opt = (k, d) => { const i = a.indexOf('--' + k); return i > -1 ? a[i + 1] : d; };
const W = +opt('w', 1280), H = +opt('h', 720), FPS = +opt('fps', 30), SUB = Math.max(1, +opt('mau', 1)), AUDIO = opt('audio', '');
(async () => {
  const br = await chromium.launch(); const pg = await br.newPage({ viewport: { width: W, height: H } });
  await pg.goto('file://' + path.resolve(html) + '?render=1'); await pg.waitForFunction(() => typeof window.seek === 'function');
  const DUR = +opt('dur', await pg.evaluate(() => window.DURATION || 0)); if (!DUR) { console.error('Thieu --dur hoac window.DURATION'); process.exit(1); }
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'khung-')); const N = Math.round(DUR * FPS), TOTAL = N * SUB;
  for (let i = 0; i < TOTAL; i++) {
    const t = (i / SUB) / FPS; await pg.evaluate(t => window.seek(t), t);
    await pg.screenshot({ path: path.join(dir, String(i).padStart(6, '0') + '.png') });
  }
  await br.close();
  const vf = SUB > 1 ? ['-vf', `tmix=frames=${SUB},select='not(mod(n\\,${SUB}))'`] : [];
  const args = ['-y', '-framerate', String(FPS * SUB), '-i', path.join(dir, '%06d.png'), ...(AUDIO ? ['-i', AUDIO] : []), ...vf,
    '-r', String(FPS), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-preset', 'veryfast', '-crf', '18', ...(AUDIO ? ['-c:a', 'aac', '-shortest'] : []), out];
  const r = spawnSync('ffmpeg', args, { stdio: 'inherit' }); if (!opt('giu-khung', '') && !a.includes('--giu-khung')) fs.rmSync(dir, { recursive: true, force: true });
  process.exit(r.status);
})();
