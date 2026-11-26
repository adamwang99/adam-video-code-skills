---
name: video-bang-code
description: Make motion-graphics videos entirely in code (one HTML file with a pure seek(t) function), then export MP4 with Playwright and ffmpeg. Use when the user wants a video made in code, a product intro in motion, HTML Canvas/SVG/GSAP animation, an MP4 exported from HTML, or pastes a prompt like "make a motion graphics video in code".
---

# Video in code (one HTML file to MP4)

The community popularized this method with Claude Opus 5.5: write the whole film as **one HTML page**, compute every frame from time `t`, then screenshot each frame and stitch them into a video. This skill collects the workflow and the tools that were tested.

## When to use
Videos of 5-90 seconds: product intros, explainers, motion showreels, kinetic type, light 2D/3D animation. Not for filmed footage or editing an existing video file.

## Workflow

1. **Ask what is missing, once, before coding:** real subject/content, length, aspect ratio (16:9, 9:16, 1:1), colors and fonts, music/sound or not. Never invent numbers; if real data is missing, ask.
2. **List the state of every beat first** (for example 120 BPM = 0.5 s per beat): what happens on each beat. Show the list before writing code.
3. **Write one HTML file** based on `mau/video.html`:
   - Everything is drawn inside `seek(t)`. No timers, no CSS transitions, no unseeded `Math.random()`, no state carried between frames. The same `t` always gives the same picture.
   - Set `window.seek = seek` and `window.DURATION = <seconds>`.
   - Drive motion with closed-form springs (see skill `chuyen-dong-spring-nhip-beat`).
4. **Self-grade before rendering the whole film:** `node cong-cu/kiem-tra-theo-nhip.js video.html ./beats` writes one image per beat. Look at each, score 1-10 (on the beat, enough air, text readable on a phone), fix the lowest, repeat.
5. **Render:** `node cong-cu/render.js video.html out.mp4 --w 1920 --h 1080 --fps 30 --dur 12`
   - `--mau 4` draws 4 sub-frames per frame and blends them for real motion blur (about 4x slower).
   - `--audio music.wav` muxes sound (see skill `am-thanh-tong-hop-bang-code`).
6. **Verify with ffprobe** (size, fps, duration) and look at a few frames from the start, middle and end. The last frame should match the first if you want a seamless loop.

## Design rules that work
- One main idea per beat; nothing is ever fully still (give held scenes a slow push).
- Enter fast, settle softly: each frame covers 12-19% of the remaining distance.
- Stagger group elements by 2-4 frames; use blur only on fast moves.
- Text large enough to read on a phone; few colors (background + ink + one accent).
- When content inside a morphing shape changes: old text leaves before the shape changes, new text arrives after it starts changing, so text never overlaps.
- No `will-change` on elements the camera zooms into (text turns blurry).

## Setup
Node.js, the `playwright` package with Chromium, and `ffmpeg`: `npm i playwright && npx playwright install chromium`.

## Limits
Frame-by-frame capture is slow (a 30 s 1080p video can take minutes). No heavy path-tracing unless you write a shader (see `canh-3d-shader-bang-code`).

Inspired by the community collection "awesome-opus5-5-videos" (MIT, yihui-dev); per-video authors are credited in skill `thu-vien-prompt-video-opus`. This text was rewritten by Adam Uses AI and does not copy any original prompt.
