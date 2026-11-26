---
name: video-bang-code
description: Làm video hoạt hình/motion graphics hoàn toàn bằng code (một file HTML + hàm seek(t)), rồi xuất MP4 bằng Playwright và ffmpeg. Dùng khi người dùng muốn "làm video bằng code", "video giới thiệu sản phẩm dạng motion", "hoạt hình HTML Canvas/SVG/GSAP", "xuất mp4 từ HTML", hoặc đưa một prompt kiểu "make a motion graphics video in code".
---

# Video bằng code (một file HTML → MP4)

Cách làm này do cộng đồng dùng Claude Opus 5.5 phổ biến: viết cả phim thành **một trang HTML**, mọi khung hình được tính từ thời gian `t`, rồi chụp từng khung và ghép thành video. Skill này gom quy trình và công cụ đã chạy thử.

## Khi nào dùng
Video 5–90 giây: giới thiệu sản phẩm, giải thích, showreel chuyển động, lớp chữ động, hoạt hình 2D/3D nhẹ. Không dùng cho video quay thật hay chỉnh sửa video có sẵn.

## Quy trình

1. **Hỏi thiếu gì rồi mới viết code** (một lượt): chủ đề/nội dung thật, độ dài, tỉ lệ (16:9, 9:16, 1:1), màu và phông, có nhạc/âm thanh không. Không bịa số liệu; nếu chưa có dữ liệu thật thì hỏi.
2. **Lập danh sách trạng thái theo nhịp** trước khi code: mỗi nhịp (ví dụ 120 BPM = 0,5 giây) xảy ra việc gì. Cho người dùng xem danh sách rồi mới viết.
3. **Viết một file HTML** theo `mau/video.html`:
   - Toàn bộ hình vẽ nằm trong `seek(t)`. Không timer, không CSS transition, không `Math.random()` không hạt giống, không giữ trạng thái giữa các khung. Cùng `t` luôn ra cùng một hình.
   - Gán `window.seek = seek` và `window.DURATION = <giây>`.
   - Chuyển động dùng lò xo dạng công thức (xem skill `chuyen-dong-spring-nhip-beat`).
4. **Tự chấm trước khi dựng cả phim:** `node cong-cu/kiem-tra-theo-nhip.js video.html ./nhip` xuất một ảnh mỗi nhịp. Xem từng ảnh, chấm 1–10 (đúng nhịp, đủ thoáng, chữ đọc được trên điện thoại), sửa ảnh thấp nhất, lặp lại.
5. **Xuất video:** `node cong-cu/render.js video.html ra.mp4 --w 1920 --h 1080 --fps 30 --dur 12`
   - `--mau 4` vẽ 4 khung con mỗi khung rồi trộn để có mờ chuyển động (render chậm hơn ~4 lần).
   - `--audio nhac.wav` ghép âm thanh (xem skill `am-thanh-tong-hop-bang-code`).
6. **Kiểm tra kết quả bằng ffprobe** (kích thước, fps, thời lượng) và xem lại vài khung đầu, giữa, cuối. Khung cuối nên khớp khung đầu nếu muốn vòng lặp mượt.

## Quy tắc thiết kế hay dùng
- Một ý chính mỗi nhịp; không để thứ gì đứng yên hoàn toàn (đẩy nhẹ chậm trên cảnh giữ).
- Vào nhanh, dừng mềm: mỗi khung đi 12–19% quãng còn lại.
- So le 2–4 khung giữa các phần tử cùng nhóm; chỉ làm mờ ở chuyển động nhanh.
- Chữ đủ lớn để đọc trên điện thoại; ít màu (nền + mực + một màu nhấn).
- Phần tử đổi nội dung bên trong một khối biến hình: chữ cũ ra trước khi khối đổi, chữ mới vào sau khi khối bắt đầu đổi, để chữ không chồng nhau.
- Không dùng `will-change` trên phần tử bị camera phóng to (chữ bị nhòe).

## Cài đặt công cụ
Cần Node.js, gói `playwright` đã có Chromium, và `ffmpeg`. `npm i playwright && npx playwright install chromium`.

## Giới hạn
Chụp từng khung nên chậm (video 30 giây 1080p có thể mất vài phút). Không có hiệu ứng nặng kiểu path-tracing trừ khi viết shader (xem `canh-3d-shader-bang-code`).

Nguồn cảm hứng: bộ sưu tập prompt cộng đồng "awesome-opus5-5-videos" (MIT, yihui-dev); tác giả từng video được ghi trong skill `thu-vien-prompt-video-opus`. Nội dung skill này do Adam Uses AI soạn lại, không sao chép prompt gốc.
