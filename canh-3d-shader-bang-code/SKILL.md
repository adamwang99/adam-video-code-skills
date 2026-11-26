---
name: canh-3d-shader-bang-code
description: Dựng cảnh 3D và hiệu ứng shader bằng code (Three.js, WebGL2 raymarching, GLSL) trong một file HTML, kèm cách render offline ra MP4. Dùng khi người dùng muốn cảnh 3D tương tác, demoscene, hạt, shader nghệ thuật, mô hình sản phẩm xoay, hoặc video 3D xuất từ trình duyệt.
---

# Cảnh 3D và shader bằng code

Dùng kèm `video-bang-code` (khung `seek(t)` và `render.js`). Kỹ thuật phổ biến trong bộ prompt cộng đồng: Three.js (khoảng 130/703 mục), shader (khoảng 90), Canvas 2D giả 3D, particles.

## Chọn công cụ
| Việc | Chọn |
|---|---|
| Mô hình có cấu trúc, xoay/phóng/tách rời | Three.js (một file, nạp từ CDN hoặc nhúng) |
| Hình nghệ thuật liên tục, fractal, chất lỏng | Một fragment shader WebGL2 (raymarching) |
| Nhẹ, không thư viện | Canvas 2D với phép chiếu tự viết |
| Hạt, khói, sao | Particles trong shader hoặc Canvas với hạt giống cố định |

## Quy tắc
1. **Một trang vừa là bản xem trực tiếp vừa là nguồn render:** `?render=1` tắt vòng lặp tự chạy, chỉ gọi `seek(t)`.
2. **Tất định:** mọi ngẫu nhiên dùng hạt giống cố định; thời gian chỉ lấy từ `t`.
3. **Camera và ánh sáng là hàm của `t`** (không tích luỹ trạng thái).
4. **Hiệu năng xem trực tiếp:** nhắm 60 fps trên Chrome; **render offline** có thể chậm hơn nhiều (nhiều mẫu mỗi điểm ảnh, mờ chuyển động) vì chụp từng khung.
5. **Tương tác (khi là sản phẩm xem, không phải video):** kéo để xoay, cuộn để phóng, nút "Tách rời" cho các bộ phận trượt ra kèm nhãn, di chuột sáng lên và hiện một dòng mô tả.
6. **Không tải tài nguyên ngoài** nếu người dùng cần file tự chứa; tạo vật liệu/texture bằng code.
7. Đừng khẳng định vật lý hoặc số liệu thật nếu không có nguồn; ghi "minh hoạ".

## Kiểm tra
Chụp vài khung (đầu, giữa, cuối) kiểm tra không có khung đen/trắng, không bị cắt hình, tỉ lệ đúng. Với shader, thử độ phân giải thấp trước rồi mới dựng chất lượng cao.

## Giới hạn
Shader nặng (path-tracing, nhiều mẫu) có thể mất rất lâu khi render từng khung; thử 5–10 giây trước.
