"use client";

import { useState } from "react";
import { QuillFlygora } from "@/components/ui/QuillFlygora";

export default function QuillFlygoraDemo() {
  const [content, setContent] = useState("");

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">QuillFlygora Demo</h1>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Fixed Height Editor (300px)</h2>
        <QuillFlygora
          value={content}
          onChange={setContent}
          placeholder="Nhập nội dung của bạn..."
          height="100px"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Tall Editor (500px)</h2>
        <QuillFlygora
          value={content}
          onChange={setContent}
          placeholder="Editor cao hơn để test scroll..."
          height="500px"
        />
      </div>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Content Preview</h2>
        <div className="p-4 border rounded-lg bg-gray-50">
          <div dangerouslySetInnerHTML={{ __html: content || "<p>Chưa có nội dung...</p>" }} />
        </div>
      </div>
    </div>
  );
}
