---
name: chuyen-dong-spring-nhip-beat
description: Quy tắc chuyển động cho video/giao diện viết bằng code: lò xo dạng công thức, lưới nhịp BPM, so le, vào nhanh dừng mềm, vòng lặp mượt. Dùng khi cần chuyển động "đắt tiền" thay vì easing mặc định, khi làm video bằng code hoặc hoạt ảnh Canvas/SVG/GSAP.
---

# Chuyển động bằng lò xo và lưới nhịp

Dùng kèm `video-bang-code`. Mục tiêu: chuyển động nhìn như do nhà thiết kế chuyển động làm, không phải easing mặc định của AI.

## 1. Lò xo dạng công thức (không mô phỏng)
Đáp ứng bậc thang của lò xo tắt dần có công thức đóng, nên giá trị chỉ phụ thuộc thời gian `t` (hợp với `seek(t)`):

```js
function step(t,w=14,z=0.62){ if(t<=0)return 0; const wd=w*Math.sqrt(1-z*z);
  return 1-Math.exp(-z*w*t)*(Math.cos(wd*t)+(z*w/wd)*Math.sin(wd*t)); }
// Giá trị đổi mục tiêu nhiều lần: cộng một lò xo cho mỗi lần đổi
function spring(t,keys,w,z){ let v=keys[0][1];
  for(let i=1;i<keys.length;i++) v+=(keys[i][1]-keys[i-1][1])*step(t-keys[i][0],w,z); return v; }
```
- `w` (tần số) 10–20: lớn = nhanh. `z` (tắt dần) 0,5–0,8 cho độ nảy nhẹ; ≥0,95 gần như không nảy.
- Mặc định chỉ để nảy rất nhẹ ("overshoot nhỏ"). Nảy mạnh chỉ dùng cho nhân vật vui nhộn.

## 2. Lưới nhịp
- Chọn BPM (120 hợp video ngắn). `BEAT = 60/BPM`. Mỗi thay đổi lớn nằm đúng trên nhịp; mỗi nhịp có việc xảy ra.
- Nếu có nhạc thật: phân tích nhạc trước (ví dụ numpy) để lấy vị trí nhịp, bắt đầu từ nhịp đầu ô nhịp; đặt tiếng thao tác đúng đỉnh âm đo được.

## 3. Cảm giác chuyển động
- **Vào nhanh, dừng mềm:** mỗi khung đi 12–19% quãng còn lại.
- **Không đứng yên:** cảnh giữ vẫn đẩy chậm (zoom/trôi rất nhẹ).
- **So le:** các phần tử cùng nhóm lệch nhau 2–4 khung.
- **Mờ chuyển động chỉ ở chuyển động nhanh.** Xuất `--mau 4` trong `render.js` để có mờ thật.
- **Thanh chọn/tab:** hai mép (trái, phải) đi bằng hai lò xo riêng, mép dẫn đầu vượt mép sau.
- **Kéo thả:** khi đang giữ chuột, giá trị tính từ vị trí con trỏ; khi thả thì lò xo kéo về.
- Không bao giờ chuyển thẳng từ đen sang màu nhấn; đưa một phần tử màu nhấn vào trước.

## 4. Vòng lặp mượt
Khung cuối khớp khung đầu, kể cả vị trí và vận tốc con trỏ, nếu không vòng lặp sẽ giật.

## 5. Thang tự chấm (mỗi nhịp một ảnh)
Đúng nhịp? Thoáng? Chữ đọc được trên điện thoại? Có thứ gì chồng nhau? Sửa ảnh điểm thấp nhất, lặp lại.
