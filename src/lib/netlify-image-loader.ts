/**
 * Loader cho Netlify Image CDN
 * Giúp tối ưu hình ảnh khi triển khai trên Netlify
 */
export default function netlifyImageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // Nếu src đã là URL đầy đủ, không cần xử lý thêm
  if (src.startsWith("http") || src.startsWith("data:") || src.startsWith("/_next")) {
    return src;
  }

  // Xây dựng URL cho Netlify Image CDN
  const params = [`w=${width}`];
  if (quality) {
    params.push(`q=${quality}`);
  }
  // Loại bỏ dấu slash đầu tiên nếu có
  const cleanSrc = src.startsWith("/") ? src.slice(1) : src;

  // Trả về URL với định dạng Netlify Image CDN
  return `/.netlify/images?${params.join("&")}&url=/${cleanSrc}`;
}
