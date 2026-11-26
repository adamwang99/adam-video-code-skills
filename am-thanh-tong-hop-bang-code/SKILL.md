---
name: am-thanh-tong-hop-bang-code
description: Create music and sound effects entirely in code (no audio files), synced to the animation by BPM; includes a standard-library Python WAV generator and how to mux it into MP4. Use when a code-made video needs music or UI sounds, or an HTML animation needs Web Audio.
---

# Synthesized sound in code

Use with `video-bang-code`. Principle: **write the music first, then make the picture follow it.** Export every beat as data so picture and sound share one time grid.

## Two routes

**A. Generate a WAV and mux it into the video (most reliable)**
`python3 cong-cu/tao-wav.py music.wav --bpm 120 --dur 12`, then `node render.js video.html out.mp4 --audio music.wav`.
Edit the `nhac()` function in `tao-wav.py` to place kick, click and notes on each beat. Standard-library Python only.

**B. Web Audio inside the HTML page (for live viewing)**
Synthesize in an `AudioContext` with oscillators and envelopes; load no files. To get it into an MP4 use route A (Chromium does not record sound during frame capture).

## Handy recipes
- **Kick:** sine whose pitch falls fast from about 175 Hz to 55 Hz, envelope decays in about 0.12 s.
- **Click / key tap:** sine near 1.8 kHz, decays in about 12 ms.
- **Note:** add a few harmonics (1, 2, 3, 4) with falling amplitude, decay about 0.35 s; add a hammer (short noise) and reverb if needed.
- **One sound per on-screen action:** typing is a tick, a button press is a click, stacking cards is a rising note, an object landing is a thump.

## Sync
- Picture and sound are both computed from `t` and the BPM; never give sound its own timer.
- Check by exporting a still per beat (`kiem-tra-theo-nhip.js`) and comparing against the sound times.
- Keep peaks under +/-0.8 to avoid clipping.

## Limits
`tao-wav.py` is a minimal mono synth. For richer music, add your own chord, drum and reverb layers.
