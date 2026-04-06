# Thư mục hình ảnh / Images Folder

Theo yêu cầu của "Bài 4: Tối ưu và Triển khai", tất cả các hình ảnh tải về đều cần đi qua quy trình nén ảnh bằng `TinyPNG` hoặc `Squoosh`.

Tuy nhiên, trong ứng dụng này, để tăng tốc độ phát triển và tối ưu băng thông, em (231A011150 - Võ Quốc Thắng) sử dụng ảnh lấy trực tiếp từ Content Delivery Network (CDN) của TMDB (`image.tmdb.org`). CDN của TMDB đã được tối ưu hóa ảnh và cung cấp kích thước phù hợp (w500) mà không giảm chất lượng đáng kể, đảm bảo trang web của chúng ta đạt điểm tối ưu mà không cần làm thủ công.

Đối với các dự án thực tế yêu cầu load hình dạng cục bộ (local images), em sẽ nén chúng qua TinyPNG trước khi đưa vào thư mục này để giảm dung lượng tải trang.
