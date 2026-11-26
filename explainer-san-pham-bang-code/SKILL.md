---
name: explainer-san-pham-bang-code
description: Làm video giải thích/giới thiệu sản phẩm bằng code theo kiểu một khối biến hình qua 8-12 trạng thái giao diện thật, có con trỏ bấm/gõ/kéo, nhịp 120 BPM, nhiều tỉ lệ khung. Dùng khi cần video giới thiệu app/SaaS/tính năng, bản tin tóm tắt bài viết dạng motion, hoặc "explainer video".
---

# Explainer sản phẩm bằng code

Dùng kèm `video-bang-code` và `chuyen-dong-spring-nhip-beat`. Chuyên cho video giải thích: giao diện thật, dữ liệu thật, một mạch kể.

## Hỏi trước khi làm (bắt buộc, một lượt)
- Sản phẩm và địa chỉ (URL); nội dung thật cần hiển thị.
- 8–12 trạng thái giao diện kể câu chuyện (ví dụ: logo → nút → nhập tên → đang tải → bản đồ → kết quả → đặt chỗ → tìm kiếm → logo).
- Dữ liệu thật trong mỗi trạng thái (không dùng chỗ giữ chỗ).
- Màu, phông, màu nhấn; các tỉ lệ cần xuất (1:1, 16:9, 9:16).
Chưa đủ thì hỏi lại; không bịa số liệu, tên người dùng, doanh thu.

## Cách dựng
1. Một file HTML, **một canvas, một hàm `draw(t)`**, không CSS transition, không timer, không giữ trạng thái giữa các khung.
2. **Một hình duy nhất không cắt cảnh:** mọi trạng thái là cùng một phần tử đổi kích thước, bo góc, màu; nội dung bên trong đổi chỗ.
3. **Con trỏ dẫn chuỗi:** bấm thật, gõ thật, một lần kéo thả. Khung đầu và khung cuối trùng cả vị trí và vận tốc con trỏ để vòng lặp liền.
4. **Lưới 120 BPM:** mỗi nhịp một việc. Lò xo công thức, chỉ nảy nhẹ.
5. **Thứ tự trong khối biến hình:** nội dung mới vào sau khi khối bắt đầu đổi; nội dung cũ ra trước khi khối đổi tiếp, để chữ không chồng.
6. **Nhiều tỉ lệ:** dùng một cấu hình `bố cục(W,H)` để tính vị trí theo kích thước, rồi xuất từng tỉ lệ bằng `render.js --w --h`.
7. **Tự chấm:** một ảnh mỗi nhịp, tìm khung lệch nhịp, chật chội hoặc khó đọc, sửa rồi mới render.

## Việc cần tránh
Số liệu bịa; đường dẫn, logo hay tên thương hiệu không được phép dùng; thông điệp hứa hẹn quá mức. Nếu dựa trên bài viết hay bài đăng của người khác, ghi nguồn và chỉ dùng nội dung được phép.
