---
name: thu-vien-prompt-video-opus
description: Danh mục tra cứu 703 video do cộng đồng làm bằng Claude Opus 5.5 (kèm tác giả, loại, kỹ thuật, link bài gốc) để tìm ý tưởng và lấy prompt gốc từ repo awesome-opus5-5-videos. Dùng khi người dùng muốn tìm mẫu, "có ví dụ video bằng code kiểu X không", chọn kỹ thuật, hoặc cần ghi công tác giả.
---

# Thư viện tra cứu video Opus 5.5

Đây là **danh mục**, không chép lại prompt. Mỗi mục có tác giả, loại, kỹ thuật và link bài gốc. Muốn xem nguyên prompt, đọc tệp `prompts/<mã>.md` trong repo gốc:
https://github.com/yihui-dev/awesome-opus5-5-videos (giấy phép MIT của người lập danh sách).

## Thống kê (cập nhật theo repo ngày 2026-10-12)
- Tổng: 703 mục. Loại: chuyển động (motion) 369, 3D 117, giải thích (explainer) 116, tương tác 101.
- Kỹ thuật: canvas 267, svg 183, threejs 131, shader 92, gsap 86, css 57, audio 39, playable 22, particles 17, pixel 15, webgl 9, physics 9, ai-image 6.
- 207 mục chỉ có prompt một phần hoặc chỉ có mô tả bài đăng.

## Cách dùng
1. Mở `danh-muc-703.csv`, lọc theo `loai`, `ky_thuat`, `prompt_day_du`.
2. Chọn mã, mở prompt gốc trong repo (cột `ma` = tên tệp), hoặc xem bài gốc ở cột `bai_goc`.
3. Dùng prompt làm **ý tưởng**, rồi làm lại bằng skill `video-bang-code` với nội dung của bạn.
4. Khi nhắc lại một ý tưởng hay trích prompt, **ghi công tác giả** và link bài gốc.

## Quyền và ghi công
Mọi video và prompt thuộc về người tạo ra chúng. Repo gốc chỉ cấp MIT cho phần danh sách của người lập; **giấy phép riêng của từng prompt không được nêu**. Vì vậy skill này chỉ chứa dữ kiện (tên tác giả công khai, đường dẫn, phân loại) và không sao chép nội dung prompt. Muốn đăng lại prompt của ai thì xin phép tác giả.

Nguồn: yihui-dev/awesome-opus5-5-videos. Danh mục do Adam Uses AI tổng hợp.
