---
name: explainer-san-pham-bang-code
description: Make product explainer / intro videos in code as one shape that morphs through 8-12 real UI states, with a cursor that clicks, types and drags, a 120 BPM grid and several aspect ratios. Use for app/SaaS/feature intros, article-summary motion posts, or any explainer video.
---

# Product explainer in code

Use with `video-bang-code` and `chuyen-dong-spring-nhip-beat`. Built for explainers: real UI, real data, one continuous story.

## Ask first (required, one round)
- The product and its URL; the real content to show.
- The 8-12 UI states that tell the story (for example: logo, button, typing a name, loading, map, result, booking, search, logo).
- Real data in each state (no placeholders).
- Colors, fonts, accent color; the aspect ratios needed (1:1, 16:9, 9:16).
If anything is missing, ask again; never invent numbers, user names or revenue.

## How to build
1. One HTML file, **one canvas, one `draw(t)` function**, no CSS transitions, no timers, no state carried between frames.
2. **One shape, no cuts:** every state is the same element resizing, rounding and recoloring; the content inside swaps.
3. **A cursor leads the sequence:** real clicks, real typing, one drag. First and last frames match in cursor position and velocity so the loop is seamless.
4. **120 BPM grid:** one job per beat. Closed-form springs with only a light bounce.
5. **Order inside the morphing shape:** new content enters after the shape starts changing; old content leaves before the shape changes again, so text never overlaps.
6. **Several aspect ratios:** use a `layout(W,H)` config that computes positions from the size, then export each ratio with `render.js --w --h`.
7. **Self-grade:** one still per beat; find off-beat, crowded or hard-to-read frames and fix them before rendering.

## Avoid
Invented numbers; paths, logos or brand names you are not allowed to use; over-promising copy. If it is based on someone else's article or post, credit the source and use only content you may use.
