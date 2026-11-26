---
name: mo-phong-tuong-tac-1-file
description: Tạo mô phỏng tương tác, trò chơi nhỏ, đồ chơi trực quan trong MỘT file HTML tự chứa (Canvas, SVG, JS thuần): vườn thiền, mô hình rocket, đàn piano, trò chơi chơi được. Dùng khi người dùng muốn "demo tương tác", "mô phỏng", "game một file HTML", "đồ chơi trên web", không cần máy chủ.
---

# Mô phỏng và game một file HTML

Nhóm "tương tác" trong bộ prompt cộng đồng (khoảng 100/703 mục) có khuôn chung. Skill này gom lại.

## Khuôn prompt/kỹ thuật
1. **Một file `index.html` tự chứa**, không thư viện ngoài, không tệp ảnh/âm thanh ngoài (vẽ bằng code, tiếng bằng Web Audio) trừ khi người dùng cho phép.
2. **Nêu rõ số liệu cụ thể** để kết quả ổn định (ví dụ lưới 440×440, 5 rãnh mỗi lần kéo, 5 viên đá, 420 chiếc lá).
3. **Tương tác cốt lõi:** kéo/di chuột/bấm phải làm thay đổi thế giới ngay; thêm 1–2 nút chế độ (ví dụ giờ vàng, tách rời).
4. **Bảo hiểm lỗi hay gặp:** nêu sẵn các điều không được xảy ra (đối tượng ra ngoài khung, khối vuông vức khó coi, chữ chồng).
5. **Hỗ trợ tạm dừng/phát lại** và tham số URL như `?t=90` để nhảy tới một thời điểm (hữu ích để kiểm tra).
6. **Đồng bộ một dòng thời gian** nếu có nhạc: tay đàn nhấn đúng phím đang kêu.

## Quy trình
1. Hỏi một lượt: chủ đề, phong cách (nét vẽ, màu), thiết bị (máy tính hay điện thoại), có âm thanh không.
2. Viết file; chạy thử bằng Playwright (mở trang, mô phỏng kéo/bấm, chụp ảnh) để chắc không lỗi console.
3. Kiểm tra: không lỗi console, đối tượng nằm trong khung, tương tác hoạt động trên màn hình cảm ứng (pointer events).
4. Nếu muốn video xem trước: dùng `video-bang-code` với một kịch bản tương tác cố định.

## Lưu ý
Không đưa dữ liệu cá nhân hoặc gọi mạng không cần thiết. Mô hình khoa học chỉ minh hoạ, ghi rõ nếu không chính xác.
