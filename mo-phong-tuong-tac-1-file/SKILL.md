---
name: mo-phong-tuong-tac-1-file
description: Build interactive simulations, small games and visual toys in ONE self-contained HTML file (Canvas, SVG, plain JS): zen gardens, rocket models, pianos, playable games. Use when the user wants an interactive demo, a simulation, a single-file HTML game, or a web toy that needs no server.
---

# Single-file simulations and games

The "interactive" group in the community prompt set (about 100 of 703 entries) shares one pattern. This skill collects it.

## The prompt / technique pattern
1. **One self-contained `index.html`**: no external libraries, no external image or audio files (draw in code, make sound with Web Audio) unless the user allows them.
2. **State concrete numbers** so results are stable (for example a 440x440 grid, 5 rake lines per drag, 5 stones, 420 leaves).
3. **Core interaction:** drag / hover / click must change the world immediately; add one or two mode buttons (for example golden hour, explode).
4. **Insure against common failures:** list in advance what must not happen (objects leaving the frame, ugly boxy shapes, overlapping text).
5. **Support pause / replay** and a URL parameter such as `?t=90` to jump to a moment (handy for testing).
6. **Sync to one timeline** if there is music: the hands press exactly the key that is sounding.

## Workflow
1. Ask once: subject, style (line art, colors), device (desktop or phone), sound or not.
2. Write the file; test with Playwright (open the page, simulate drag/click, screenshot) to be sure there are no errors.
3. Check: no console errors, objects stay in frame, interaction works on touch screens (pointer events).
4. For a preview video, use `video-bang-code` with a fixed interaction script.

## Notes
No personal data and no unnecessary network calls. Scientific models are illustrations only; say so if they are not accurate.
