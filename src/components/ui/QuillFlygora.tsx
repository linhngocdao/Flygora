"use client";

import * as React from "react";
import { useEffect, useRef } from "react";
import Quill from "quill";
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
    const quillRef = useRef<Quill | null>(null);
    const isInitialized = useRef(false);

    // Stable callbacks
    const onChangeRef = useRef(onChange);
    const onBlurRef = useRef(onBlur);

    // Update refs on every render
    onChangeRef.current = onChange;
    onBlurRef.current = onBlur;

    // Initialize Quill only in the client-side
    useEffect(() => {
      if (typeof document === "undefined") return;
      if (!containerRef.current || isInitialized.current) return;

      const quill = new Quill(containerRef.current, {
        theme,
        modules,
        formats,
        placeholder,
        readOnly: readOnly || disabled,
      });

      quillRef.current = quill;
      isInitialized.current = true;

      // Set initial value
      if (value) {
        quill.root.innerHTML = value;
      }

      // Handle text changes
      quill.on("text-change", () => {
        const html = quill.root.innerHTML;
        const text = quill.getText().trim();
        const finalValue = text.length === 0 ? "" : html;
        onChangeRef.current?.(finalValue);
      });

      // Handle blur
      quill.on("selection-change", (range) => {
        if (!range) {
          onBlurRef.current?.();
        }
      });

      return () => {
        if (quillRef.current) {
          quillRef.current = null;
        }
      };
    }, [theme, modules, formats, placeholder, disabled, readOnly, value]);

    // Update content when value changes externally (only for controlled components)
    useEffect(() => {
      if (quillRef.current && value !== undefined) {
        const currentHtml = quillRef.current.root.innerHTML;
        if (value !== currentHtml) {
          const selection = quillRef.current.getSelection();
          quillRef.current.root.innerHTML = value;
          if (selection) {
            quillRef.current.setSelection(selection);
          }
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
