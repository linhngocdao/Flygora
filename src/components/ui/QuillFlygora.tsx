"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import "@/styles/quill-flygora.css";
import { cn } from "@/lib/utils";

interface QuillFlygoraProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  height?: string | number;
  minHeight?: string | number;
  maxHeight?: string | number;
  theme?: "snow" | "bubble";
  modules?: any;
  formats?: string[];
  readOnly?: boolean;
  // Scroll và resize options
  scrollable?: boolean; // Cho phép scroll khi content dài
  autoResize?: boolean; // Tự động thay đổi height theo content
  resizeMode?: "fixed" | "auto" | "constrained"; // fixed: height cố định + scroll, auto: height thay đổi theo content, constrained: height thay đổi trong giới hạn min/max
}

const defaultModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
  clipboard: {
    // Tắt smart copy/paste để tránh lỗi với MS Word
    matchVisual: false,
  },
};

const defaultFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "align",
  "link",
  "image",
  "color",
  "background",
];

const QuillFlygora = React.forwardRef<HTMLDivElement, QuillFlygoraProps>(
  (
    {
      value = "",
      onChange,
      placeholder = "Nhập nội dung...",
      className,
      disabled = false,
      height = "200px",
      minHeight = "150px",
      maxHeight = "500px",
      theme = "snow",
      modules = defaultModules,
      formats = defaultFormats,
      readOnly = false,
      scrollable = true,
      autoResize = false,
      resizeMode = "fixed",
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<Quill | null>(null);
    const isInitializedRef = useRef(false);
    const [dynamicHeight, setDynamicHeight] = useState<string | number>(height);

    // Tính toán height dựa trên resizeMode
    const getContainerStyle = useCallback(() => {
      const baseStyle: React.CSSProperties = {};

      switch (resizeMode) {
        case "fixed":
          baseStyle.height = height;
          baseStyle.overflow = scrollable ? "hidden" : "visible";
          break;
        case "auto":
          baseStyle.height = autoResize ? dynamicHeight : height;
          baseStyle.minHeight = minHeight;
          baseStyle.overflow = "visible";
          break;
        case "constrained":
          baseStyle.height = autoResize ? dynamicHeight : height;
          baseStyle.minHeight = minHeight;
          baseStyle.maxHeight = maxHeight;
          baseStyle.overflow = scrollable ? "auto" : "visible";
          break;
        default:
          baseStyle.height = height;
      }

      return baseStyle;
    }, [resizeMode, height, minHeight, maxHeight, scrollable, autoResize, dynamicHeight]);

    // Hàm tính toán content height
    const calculateContentHeight = useCallback(() => {
      if (!quillRef.current || !autoResize) return;

      const editor = quillRef.current.root;
      const toolbar = containerRef.current?.querySelector(".ql-toolbar");
      const toolbarHeight = toolbar?.clientHeight || 0;
      const contentHeight = editor.scrollHeight;
      const totalHeight = contentHeight + toolbarHeight + 8; // 8px padding

      let newHeight = totalHeight;

      if (resizeMode === "constrained") {
        const minHeightPx = typeof minHeight === "string" ? parseInt(minHeight) : minHeight;
        const maxHeightPx = typeof maxHeight === "string" ? parseInt(maxHeight) : maxHeight;
        newHeight = Math.max(minHeightPx, Math.min(maxHeightPx, totalHeight));
      } else if (resizeMode === "auto") {
        const minHeightPx = typeof minHeight === "string" ? parseInt(minHeight) : minHeight;
        newHeight = Math.max(minHeightPx, totalHeight);
      }

      setDynamicHeight(`${newHeight}px`);
    }, [autoResize, resizeMode, minHeight, maxHeight]);

    // Memoize onChange để tránh re-render không cần thiết
    const handleTextChange = useCallback(() => {
      if (!quillRef.current) return;
      const html = quillRef.current.root.innerHTML;
      const isEmpty = quillRef.current.getText().trim().length === 0;
      onChange?.(isEmpty ? "" : html);

      // Tính toán lại height nếu auto-resize được bật
      calculateContentHeight();
    }, [onChange, calculateContentHeight]);

    useEffect(() => {
      if (!containerRef.current || isInitializedRef.current) return;

      // Tạo Quill instance
      const quill = new Quill(containerRef.current, {
        theme,
        modules,
        formats,
        placeholder,
        readOnly: readOnly || disabled,
      });

      quillRef.current = quill;
      isInitializedRef.current = true;

      // Set initial value
      if (value) {
        quill.root.innerHTML = value;
      }

      quill.on("text-change", handleTextChange);

      // Tính toán height ban đầu nếu auto-resize
      if (autoResize) {
        setTimeout(() => calculateContentHeight(), 100);
      }

      // Cleanup function
      return () => {
        if (quillRef.current) {
          quillRef.current.off("text-change", handleTextChange);
        }
      };
    }, [
      theme,
      modules,
      formats,
      placeholder,
      disabled,
      readOnly,
      value,
      handleTextChange,
      autoResize,
      calculateContentHeight,
    ]);

    // Update content khi value prop thay đổi
    useEffect(() => {
      if (quillRef.current && value !== quillRef.current.root.innerHTML) {
        const selection = quillRef.current.getSelection();
        quillRef.current.root.innerHTML = value || "";

        // Restore selection nếu có
        if (selection) {
          quillRef.current.setSelection(selection);
        }
      }
    }, [value]);

    // Update readOnly state
    useEffect(() => {
      if (quillRef.current) {
        quillRef.current.enable(!disabled && !readOnly);
      }
    }, [disabled, readOnly]);

    return (
      <div
        ref={ref}
        className={cn(
          // Base wrapper styles
          "quill-flygora-wrapper",
          "border-input bg-transparent shadow-xs transition-[color,box-shadow] outline-none",
          "flex flex-col w-full rounded-md border",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "dark:bg-input/30",
          // Disabled state
          disabled && "disabled cursor-not-allowed opacity-50",
          // Scroll behavior classes
          resizeMode === "fixed" && scrollable && "overflow-hidden",
          resizeMode === "constrained" && scrollable && "overflow-auto",
          className
        )}
        style={getContainerStyle()}
        {...props}
      >
        <div
          ref={containerRef}
          className={cn(
            "quill-flygora-container w-full",
            resizeMode === "fixed" ? "h-full" : "flex-1",
            // Scroll classes for editor content
            resizeMode === "fixed" &&
              scrollable &&
              "[&_.ql-editor]:overflow-y-auto [&_.ql-editor]:max-h-full",
            resizeMode === "constrained" && "[&_.ql-editor]:overflow-y-auto",
            autoResize && "[&_.ql-editor]:overflow-y-hidden"
          )}
        />
      </div>
    );
  }
);

QuillFlygora.displayName = "QuillFlygora";

export { QuillFlygora };
export type { QuillFlygoraProps };
