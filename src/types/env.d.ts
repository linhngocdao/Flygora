// Khai báo kiểu cho biến môi trường
declare namespace NodeJS {
  interface ProcessEnv {
    // Các biến có thể truy cập từ client
    NEXT_PUBLIC_WEBSITE_NAME: string;
    // Thêm các biến môi trường khác ở đây
  }
}
