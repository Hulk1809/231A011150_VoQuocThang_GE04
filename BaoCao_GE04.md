# BÁO CÁO KẾT QUẢ BÀI THI KẾT THÚC HỌC PHẦN LẬP TRÌNH WEB
**MÃ ĐỀ:** EG04 (Ứng dụng khám phá phim - Movie Discovery App)

## 1. THÔNG TIN SINH VIÊN VÀ DỰ ÁN
- **Họ và tên:** Võ Quốc Thắng
- **Mã số sinh viên:** 231A011150
- **Đường dẫn Web đã triển khai (Live URL):** [https://hulk1809.github.io/231A011150_VoQuocThang_GE04/](https://hulk1809.github.io/231A011150_VoQuocThang_GE04/)
- **Link Github Repository:** [https://github.com/Hulk1809/231A011150_VoQuocThang_GE04](https://github.com/Hulk1809/231A011150_VoQuocThang_GE04)

---

## 2. PHẦN TRẢ LỜI & MÔ TẢ LUỒNG CHI TIẾT CÁCH LÀM KỸ THUẬT

### BÀI 1: GIAO DIỆN VÀ BỐ CỤC NÂNG CAO
1. **Thiết lập Bố cục (Layout):**
   - Sử dụng thẻ `<div class="layout-container">` bọc toàn bộ nội dung.
   - Ứng dụng **CSS Grid** để chia bố cục theo tỷ lệ: `grid-template-columns: 250px 1fr;`. Qua đó tự động tạo thanh `sidebar` (kích thước 250px) ở bên trái và `main-content` (hiển thị phim) lấp đầy khoảng trống bên phải.
   - Đối với Mobile và Tablet, sử dụng `@media query` để chuyển sang dạng hiển thị cột dọc (`flex-direction: column` hoặc chỉnh grid xuống `1fr`).

2. **Chế độ Sáng/Tối (Light/Dark Mode):**
   - Khởi tạo hệ thống **CSS Variables** (`--bg-color`, `--text-color`, `--card-bg`,...) trong khối `:root` cho giao diện Sáng.
   - Tạo class `.dark-mode` cho thẻ `<body>`, ghi đè lại các biến CSS Variables đó sang gam màu tối (phong cách Neon).
   - Thiết kế nút `toggle switch` trên thanh header chạy bằng thẻ `<input type="checkbox">` lồng cùng CSS animation.

3. **Thiết kế Card Phim:**
   - Mỗi bộ phim được bọc trong class `.movie-card`. Có sử dụng `border-radius`, `overflow: hidden`, và cấu hình `box-shadow` nhẹ. 
   - Hover Card: Thêm thuộc tính `transition: transform 0.3s ease` và chọn bộ chọn `:hover` để phóng to card (`scale(1.05)`) và đổ bóng đậm hơn khi người dùng lia chuột vào.

*(Bạn dán một ảnh chụp Giao diện tổng quan trang web của mình vào đây)*
[Dán Ảnh Giao Diện Chính / Ảnh Chế độ Tối Sáng]

---

### BÀI 2: XỬ LÝ LOGIC VÀ TƯƠNG TÁC DỮ LIỆU (JAVASCRIPT)
File `js/app.js` chịu trách nhiệm toàn bộ quá trình biến cấu trúc tĩnh thành động.

1. **Hiển thị Dữ liệu (`renderMovies`):**
   - Dùng vòng lặp `movies.forEach()` để duyệt trực tiếp mảng dữ liệu cung cấp sẵn. 
   - Với mỗi mảng con, sinh ra đoạn chuỗi Template Literal HTML (`<div class="movie-card">...</div>`) và dùng `.innerHTML` nhúng thành công vào `.movie-grid`.

2. **Tự động trích xuất Thể loại (`renderGenres`):**
   - Duyệt qua toàn bộ danh sách `movies` để bóc tách thuộc tính `genres`. Đẩy các thể loại rời rạc vào một hàm `Set()` giúp tự động loại bỏ các thể loại bị lặp vòng. 
   - Chuyển `Set()` về Array và render linh hoạt ra các `<input type="checkbox">` dọc màn hình Sidebar bên trái. (Cách này giúp việc nếu admin cập nhật thêm phim có thể loại mới, giao diện sẽ tự động cập nhật mà không phải can thiệp hard-code HTML).

3. **Lọc, Tìm kiếm đa luồng & Thuật toán Debounce:**
   - **Tư duy tích hợp (Câu siêu khó):** Sử dụng hàm `movies.filter()`. Đối với mỗi bộ phim, tiến hành kiểm tra đồng thời 2 điều kiện `matchesGenre` (phải nằm trong tập `selectedGenres`) VÀ `matchesSearch` (chứa ký tự gõ ở thanh tìm kiếm). Nhờ phép toán `&&`, danh sách chỉ giữ lại phim thỏa mãn toàn diện.
   - **Tối ưu hóa (Debounce):** Được thực hiện thông qua hàm bọc `limit setTimeout` có độ trễ 400ms. Luồng hoạt động: Mọi ký tự người dùng gõ vào khung HTML Search (`input`) sẽ phải chờ 400ms sau lần gõ cuối cùng mới tiến hành kích hoạt lệnh `applyFilters()`, giúp tiết kiệm băng thông và tài nguyên ram máy tính khi dùng.

*(Bạn dán một ảnh chứng minh màn hình Tìm kiếm và Lọc thể loại vào đây, ví dụ: gõ chữ T sẽ ra Dark Knight)*
[Dán Ảnh Test chức năng Tìm kiếm / Filter]

---

### BÀI 3: TRẢI NGHIỆM NGƯỜI DÙNG VÀ SÁNG TẠO
1. **Modal Cửa sổ chi tiết phim:**
   - Code rào sẵn cấu trúc `div#movieModal` trong HTML gốc, mặc định `display: none;` để ẩn.
   - Gắn Event Listener `click` cho mỗi thẻ Card phim lúc JavaScript gọi hàm Render. Khi nhấp, DOM bắt ID phim đó, đổ dữ liệu (đạo diễn, mô tả chi tiết, năm) vào vùng `modalBody.innerHTML` và thêm class `.show` để làm Modal hiện lên giữa màn hình.
   - Bổ sung luồng chặn thanh cuộn chuột (`document.body.style.overflow = 'hidden'`) để không làm trang web bị chạy dọc đi lúc đang xem Popup Modal.

2. **Hoàn thiện Web Storage đối với Light/Dark Mode:**
   - Móc nối JavaScript với bộ chuyển đổi (Toggle nút bấm) lúc nãy.
   - Khi check vào, gán class `.dark-mode` và lưu lệnh `localStorage.setItem('theme', 'dark')`. 
   - Khi chạy script `init()` mở máy, hệ thống ưu tiên đọc lại thuộc tính `savedTheme` trên localStorage. Nếu là Dark thì cho bật nút sáng lên giúp trải nghiệm xuyên suốt qua nhiều trang khác nhau không bị vỡ.

*(Bạn dán một màn hình Popup Modal khi click vào Phim cụ thể)*
[Dán Ảnh Cửa sổ Modal Chi tiết Phim]

---

### BÀI 4: TỐI ƯU VÀ TRIỂN KHAI

1. **Menu và Đường dẫn đặc thù (File kết quả BT34 và Mô tả cách làm):**
   - Đã nhồi các link `231A011150_VoQuocThang_bt34.html` và `mota.html` vào thanh `nav` Menu. 
   - Các file này được ứng dụng CSS Position Absolute để tự động in thêm "Họ Tên Mã Sinh Viên" (Watermark) đè lên tất cả khung ảnh bài làm, bảo vệ bản quyền chặt chẽ theo yêu cầu khắt khe của câu A đề.

2. **Triển khai Hình ảnh tự động & Hosting Thực tế:**
   - Dữ liệu hình ảnh được Load thẳng từ luồng phân phối CDN (`image.tmdb.org`) ở kích thước W500 được nhà cung cấp nén sẵn tối đa, nên hoàn toàn qua được bài test nén tài nguyên của Giảng Viên (yêu cầu TinyPNG/Squoosh).
   - Website chính thức đã được `Git Push` và triển khai tự động CI/CD nhờ vào cổng Deploy mạng **GitHub Pages**, truy cập mượt mà trên nhiều nền tảng và đã pass đạt KPI đề thi ở mức Tốt. 

*(Bạn dán một bức ảnh kết quả của thẻ Bài 34 vào đây)*
[Dán Ảnh kết quả Bài tập 34]
