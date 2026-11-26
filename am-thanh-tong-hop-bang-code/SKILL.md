---
name: am-thanh-tong-hop-bang-code
description: Tạo nhạc nền và hiệu ứng âm thanh hoàn toàn bằng code (không dùng tệp âm thanh), đồng bộ với hoạt hình theo nhịp BPM; gồm công cụ tạo WAV bằng Python chuẩn và cách ghép vào MP4. Dùng khi làm video bằng code cần nhạc/tiếng thao tác, hoặc hoạt hình HTML cần Web Audio.
---

# Âm thanh tổng hợp bằng code

Dùng kèm `video-bang-code`. Nguyên tắc: **nhạc viết trước, hình theo nhạc** - mọi nhịp xuất ra dạng dữ liệu để hình và tiếng dùng chung một lưới thời gian.

## Hai đường

**A. Tạo WAV rồi ghép vào video (chắc chắn nhất)**
`python3 cong-cu/tao-wav.py nhac.wav --bpm 120 --dur 12` rồi `node render.js video.html ra.mp4 --audio nhac.wav`.
Sửa hàm `nhac()` trong `tao-wav.py` để đặt kick, click, nốt theo từng nhịp. Chỉ dùng thư viện chuẩn của Python.

**B. Web Audio trong chính trang HTML (để xem trực tiếp)**
Tổng hợp trong `AudioContext` bằng bộ dao động + bao hình (envelope); không tải tệp. Muốn đưa vào MP4 thì dùng đường A (Chromium không ghi tiếng khi chụp khung).

## Công thức hay dùng
- **Kick:** sóng sin tần số giảm nhanh từ ~175 Hz về ~55 Hz, bao hình tắt ~0,12 s.
- **Click/phím gõ:** sin ~1,8 kHz, tắt ~12 ms.
- **Nốt đàn:** cộng vài hài (1, 2, 3, 4) biên độ giảm dần, tắt ~0,35 s; thêm tiếng búa (nhiễu ngắn) và vang nếu cần.
- **Mỗi việc trên hình có một tiếng:** gõ phím → tick; bấm nút → click; xếp từng khung → nốt tăng dần; vật chạm đất → thump.

## Đồng bộ
- Hình và tiếng cùng tính từ `t` và BPM; đừng dùng timer riêng cho âm thanh.
- Nghe lại: xuất ảnh mỗi nhịp (`kiem-tra-theo-nhip.js`) và đối chiếu thời điểm tiếng.
- Kiểm tra âm lượng không vỡ tiếng: giữ đỉnh dưới ±0,8.

## Giới hạn
`tao-wav.py` là bộ tổng hợp tối giản (đơn âm). Muốn nhạc phong phú cần tự viết thêm lớp hợp âm, trống, hiệu ứng vang.
