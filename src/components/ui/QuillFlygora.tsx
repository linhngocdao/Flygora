"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";
import "@/styles/quill-flygora.css";
import { cn } from "@/lib/utils";

interface QuillFlygoraProps {
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  height?: string | number;
  theme?: "snow" | "bubble";
  modules?: any;
  formats?: string[];
  readOnly?: boolean;
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
  clipboard: { matchVisual: false },
};

const defaultFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
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
      onBlur,
      placeholder = "Nhập nội dung...",
      className,
      disabled = false,
      height = "300px",
      theme = "snow",
      modules = defaultModules,
      formats = defaultFormats,
      readOnly = false,
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const quillRef = useRef<any>(null);
    const isInitialized = useRef(false);

    const onChangeRef = useRef(onChange);
    const onBlurRef = useRef(onBlur);
    onChangeRef.current = onChange;
    onBlurRef.current = onBlur;

    // Init Quill on client only (fix SSR: document/window not defined)
    useEffect(() => {
      if (!containerRef.current || isInitialized.current) return;

      let isUnmounted = false;

      (async () => {
        // ⬇️ import động, chỉ chạy ở client
        const { default: Quill } = await import("quill");

        if (isUnmounted) return;

        const quill = new Quill(containerRef.current!, {
          theme,
          modules,
          formats,
          placeholder,
          readOnly: readOnly || disabled,
        });

        quillRef.current = quill;
        isInitialized.current = true;

        // Set initial value (giữ history đúng)
        if (value) {
          quill.clipboard.dangerouslyPasteHTML(value);
        }

        quill.on("text-change", () => {
          const html = quill.root.innerHTML;
          const text = quill.getText().trim();
          onChangeRef.current?.(text.length === 0 ? "" : html);
        });

        quill.on("selection-change", (range: any) => {
          if (!range) onBlurRef.current?.();
        });
      })();

      return () => {
        isUnmounted = true;
        quillRef.current = null;
      };
      // Không đưa `value` vào đây để tránh re-init vô ích
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [theme, modules, formats, placeholder, disabled, readOnly]);

    // Sync value từ ngoài vào (controlled)
    useEffect(() => {
      const quill = quillRef.current;
      if (!quill || value === undefined) return;

      const currentHtml = quill.root.innerHTML;
      if (value !== currentHtml) {
        const sel = quill.getSelection();
        quill.clipboard.dangerouslyPasteHTML(value);
        if (sel) quill.setSelection(sel);
      }
    }, [value]);

    // Toggle readOnly/disabled runtime
    useEffect(() => {
      if (quillRef.current) {
        quillRef.current.enable(!disabled && !readOnly);
      }
    }, [disabled, readOnly]);

    return (
      <div
        ref={ref}
        className={cn(
          "quill-flygora-wrapper",
          "border-input bg-transparent shadow-xs transition-[color,box-shadow] outline-none",
          "flex flex-col w-full rounded-md border",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          "dark:bg-input/30",
          disabled && "disabled cursor-not-allowed opacity-50",
          className
        )}
        style={{ height }}
        {...props}
      >
        <div ref={containerRef} className="w-full h-full" />
      </div>
    );
  }
);

QuillFlygora.displayName = "QuillFlygora";

export { QuillFlygora };
export type { QuillFlygoraProps };
