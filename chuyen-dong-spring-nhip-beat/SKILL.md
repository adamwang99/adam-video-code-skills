---
name: chuyen-dong-spring-nhip-beat
description: Motion rules for code-made video and UI - closed-form springs, a BPM beat grid, stagger, enter-fast-settle-soft, seamless loops. Use when you want premium motion instead of default easing, when making video in code, or when animating Canvas/SVG/GSAP.
---

# Spring motion and the beat grid

Use with `video-bang-code`. Goal: motion that looks designed by a motion designer, not the default AI easing.

## 1. Closed-form springs (no simulation)
The step response of a damped spring has a closed form, so a value depends only on time `t` (perfect for `seek(t)`):

```js
function step(t,w=14,z=0.62){ if(t<=0)return 0; const wd=w*Math.sqrt(1-z*z);
  return 1-Math.exp(-z*w*t)*(Math.cos(wd*t)+(z*w/wd)*Math.sin(wd*t)); }
// A value whose target changes several times: sum one spring per change
function spring(t,keys,w,z){ let v=keys[0][1];
  for(let i=1;i<keys.length;i++) v+=(keys[i][1]-keys[i-1][1])*step(t-keys[i][0],w,z); return v; }
```
- `w` (frequency) 10-20: higher is faster. `z` (damping) 0.5-0.8 gives a light bounce; 0.95 or more barely bounces.
- Default to a very small overshoot. Strong bounce only for playful characters.

## 2. The beat grid
- Pick a BPM (120 suits short videos). `BEAT = 60/BPM`. Every big change lands on a beat; every beat has something happening.
- With real music: analyze it first (for example with numpy) to get beat positions, start on the first beat of a bar, and place action sounds on measured peaks.

## 3. Feel
- **Enter fast, settle soft:** each frame covers 12-19% of the remaining distance.
- **Never fully still:** held scenes still get a slow push (zoom or drift).
- **Stagger:** group elements offset by 2-4 frames.
- **Motion blur only on fast moves.** Render with `--mau 4` in `render.js` for real blur.
- **Selection bar / tabs:** animate the two edges (left, right) with two separate springs; the leading edge overshoots the trailing one.
- **Drag and drop:** while held, the value follows the pointer; on release a spring pulls it home.
- Never cut straight from black to the accent color; bring in an accent element first.

## 4. Seamless loop
The last frame must match the first, including pointer position and velocity, or the loop will jump.

## 5. Self-grading scale (one still per beat)
On the beat? Enough air? Readable on a phone? Anything overlapping? Fix the lowest score, repeat.
