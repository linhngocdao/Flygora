#!/bin/bash

# Script này sẽ được chạy sau khi build hoàn thành
# Có thể được sử dụng để thực hiện các tác vụ bổ sung sau khi build

# Đảm bảo các file cấu hình đã được sao chép đúng
echo "Hậu xử lý build cho Netlify..."

# Tạo file cần thiết cho Netlify
touch .next/_redirects
touch .next/404.html

# Hiển thị thông tin build
echo "Build hoàn thành cho Netlify!"
