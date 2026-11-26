---
name: canh-3d-shader-bang-code
description: Build 3D scenes and shader effects in code (Three.js, WebGL2 raymarching, GLSL) inside one HTML file, with offline rendering to MP4. Use when the user wants an interactive 3D scene, demoscene, particles, generative shader art, a rotating product model, or a 3D video exported from the browser.
---

# 3D scenes and shaders in code

Use with `video-bang-code` (the `seek(t)` frame and `render.js`). Common techniques in the community prompt set: Three.js (about 130 of 703 entries), shaders (about 90), fake-3D on Canvas 2D, particles.

## Pick the tool
| Job | Choose |
|---|---|
| Structured model that rotates, zooms, explodes apart | Three.js (single file, CDN or inlined) |
| Continuous generative image, fractals, fluids | One WebGL2 fragment shader (raymarching) |
| Light, no libraries | Canvas 2D with a hand-written projection |
| Particles, smoke, stars | Particles in a shader, or Canvas with a fixed seed |

## Rules
1. **One page is both the live view and the render source:** `?render=1` turns off the auto loop and only calls `seek(t)`.
2. **Deterministic:** all randomness uses a fixed seed; time comes only from `t`.
3. **Camera and lighting are functions of `t`** (no accumulated state).
4. **Performance:** aim for 60 fps live in Chrome; offline render can be much slower (many samples per pixel, motion blur) because frames are captured one by one.
5. **Interaction (when it is a product viewer, not a video):** drag to rotate, scroll to zoom, an "Explode" button that slides parts apart with labels, hover to highlight and show a one-line description.
6. **Load no external assets** if the user needs a self-contained file; make materials and textures in code.
7. Do not claim real physics or numbers without a source; label it "illustration".

## Checks
Capture a few frames (start, middle, end) to confirm no black/white frames, nothing clipped, correct aspect ratio. For shaders, test at low resolution first, then render in high quality.

## Limits
Heavy shaders (path tracing, many samples) can take very long when rendered frame by frame; try 5-10 seconds first.
