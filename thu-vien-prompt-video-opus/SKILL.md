---
name: thu-vien-prompt-video-opus
description: A lookup catalog of 703 community videos made with Claude Opus 5.5 (author, type, technique, link to the original post) for finding ideas and pulling the original prompt from the awesome-opus5-5-videos repo. Use when the user wants examples, asks whether there is a code-made video like X, wants to choose a technique, or needs to credit an author.
---

# Opus 5.5 video lookup catalog

This is a **catalog**, not a copy of the prompts. Each entry has the author, type, technique and a link to the original post. To read a full prompt, open `prompts/<id>.md` in the source repo:
https://github.com/yihui-dev/awesome-opus5-5-videos (MIT license for the list maintainer's part).

## Statistics (repo as of 2026-10-12)
- Total: 703 entries. By type: motion 369, 3D 117, explainer 116, interactive 101.
- Techniques: canvas 267, svg 183, threejs 131, shader 92, gsap 86, css 57, audio 39, playable 22, particles 17, pixel 15, webgl 9, physics 9, ai-image 6.
- 207 entries have only a partial prompt or only a post description.

## How to use
1. Open `danh-muc-703.csv` and filter by `loai` (type), `ky_thuat` (technique) or `prompt_day_du` (full prompt yes/no).
2. Pick an id (column `ma` = file name) and open the original prompt in the source repo, or the original post in column `bai_goc`.
3. Use the prompt as an **idea**, then rebuild it with skill `video-bang-code` using your own content.
4. When you reuse an idea or quote a prompt, **credit the author** and link the original post.

## Rights and credit
Every video and prompt belongs to its creator. The source repo grants MIT only for the list maintainer's part; **each prompt's own license is not stated**. So this skill contains only facts (public author handles, links, classification) and copies no prompt text. To republish someone's prompt, ask the author.

Source: yihui-dev/awesome-opus5-5-videos. Catalog compiled by Adam Uses AI.
