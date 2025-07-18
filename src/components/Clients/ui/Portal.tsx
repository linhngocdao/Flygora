"use client";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

/**
 * `Portal` là một component giúp render nội dung con (children) ra ngoài cây DOM hiện tại,
 * thường được sử dụng để hiển thị các thành phần như modal, popup, toast, dropdown...
 * một cách chính xác trên toàn màn hình, tránh bị ảnh hưởng bởi layout cha (z-index, overflow, position).
 *
 * Component này sử dụng pattern để tránh hydration mismatch:
 * - Server-side: trả về null
 * - Client-side: sau khi hydration hoàn tất, mới render portal
 *
 * @example
 * ```tsx
 * <Portal>
 *   <div className="fixed inset-0 z-[9999] bg-black/50">Popup content</div>
 * </Portal>
 * ```
 */

export default function Portal({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Tránh hydration mismatch bằng cách chỉ render portal sau khi component mounted trên client
  if (!mounted) {
    return null;
  }

  return createPortal(children, document.body);
}
