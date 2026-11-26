#!/usr/bin/env python3
"""Tao file WAV tu code (khong can tep am thanh). Chi dung thu vien chuan.
Dung: python3 tao-wav.py ra.wav --bpm 120 --dur 8
Ban sua ham `nhac()` de dat tieng dung nhip: kick, click, nota. Moi am thanh la cong thuc, khong dung mau co san."""
import wave, math, struct, argparse
SR = 44100
def env(t, a, d): return 0.0 if t < 0 else min(1, t / a) * math.exp(-t / d)
def kick(t): f = 55 + 120 * math.exp(-t * 30); return math.sin(2 * math.pi * f * t) * env(t, 0.002, 0.12)
def click(t): return math.sin(2 * math.pi * 1800 * t) * env(t, 0.0005, 0.012)
def note(t, hz): return sum(math.sin(2 * math.pi * hz * k * t) / k ** 1.5 for k in (1, 2, 3, 4)) * env(t, 0.005, 0.35) * 0.4
def nhac(t, bpm):
    beat = 60 / bpm; b = int(t / beat); tb = t - b * beat; v = kick(tb) * 0.8  # kick moi nhip
    if b % 2: v += click(tb) * 0.4                                            # click o nhip le
    scale = [261.63, 329.63, 392.0, 523.25]; v += note(tb, scale[b % 4]) * 0.5  # mot nota moi nhip
    return v
if __name__ == '__main__':
    ap = argparse.ArgumentParser(); ap.add_argument('out'); ap.add_argument('--bpm', type=float, default=120); ap.add_argument('--dur', type=float, default=8)
    a = ap.parse_args(); n = int(a.dur * SR)
    with wave.open(a.out, 'wb') as w:
        w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(b''.join(struct.pack('<h', int(max(-1, min(1, nhac(i / SR, a.bpm) * 0.8)) * 32767)) for i in range(n)))
    print('Da tao', a.out)
