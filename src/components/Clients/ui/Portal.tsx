"use client";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * `Portal` là một component giúp render nội dung con (children) ra ngoài cây DOM hiện tại,
 * thường được sử dụng để hiển thị các thành phần như modal, popup, toast, dropdown...
 * một cách chính xác trên toàn màn hình, tránh bị ảnh hưởng bởi layout cha (z-index, overflow, position).
 *
 * @example
 * ```tsx
 * <Portal>
 *   <div className="fixed inset-0 z-[9999] bg-black/50">Popup content</div>
 * </Portal>
 * ```
 */

export default function Portal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.body;
    setMounted(true);
  }, []);

  return mounted && ref.current ? createPortal(children, ref.current) : null;
}
