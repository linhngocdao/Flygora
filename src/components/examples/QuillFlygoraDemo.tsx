"use client";

import React, { useState } from "react";
import { QuillFlygora } from "@/components/ui/QuillFlygora";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

/**
 * Component demo cho QuillFlygora Editor
 * Hiển thị các tính năng và cách sử dụng khác nhau
 */
export default function QuillFlygoraDemo() {
  const [content, setContent] = useState("<p>Nội dung mẫu cho editor...</p>");
  const [isDisabled, setIsDisabled] = useState(false);
  const [isReadOnly, setIsReadOnly] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [resizeMode, setResizeMode] = useState<"fixed" | "auto" | "constrained">("fixed");
  const [autoResize, setAutoResize] = useState(false);
  const [scrollable, setScrollable] = useState(true);

  // Custom modules cho editor nâng cao
  const customModules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image"],
      [{ color: [] }, { background: [] }],
      ["blockquote", "code-block"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  const handleContentChange = (value: string) => {
    setContent(value);
    console.log("Content changed:", value);
  };

  const clearContent = () => {
    setContent("");
  };

  const setDefaultContent = () => {
    setContent(`
      <h2>Chào mừng đến với Go Travel</h2>
      <p>Đây là editor <strong>Quill</strong> được tùy chỉnh theo phong cách <em>ShadcnUI</em>.</p>
      <ul>
        <li>Hỗ trợ <strong>bold</strong>, <em>italic</em>, <u>underline</u></li>
        <li>Danh sách có thứ tự và không thứ tự</li>
        <li>Thêm link và hình ảnh</li>
        <li>Nhiều tùy chọn format khác</li>
      </ul>
      <blockquote>
        "Du lịch là cách duy nhất để mua được những điều làm bạn giàu có hơn." - Unknown
      </blockquote>
    `);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-2">QuillFlygora Editor Demo</h1>
        <p className="text-muted-foreground">
          Component Quill Editor tùy chỉnh theo phong cách ShadcnUI
        </p>
      </div>

      {/* Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Điều khiển Editor</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <Button onClick={setDefaultContent} variant="outline">
              Nội dung mẫu
            </Button>
            <Button onClick={clearContent} variant="outline">
              Xóa nội dung
            </Button>
            <Button onClick={() => setShowPreview(!showPreview)} variant="outline">
              {showPreview ? "Ẩn xem trước" : "Xem trước"}
            </Button>
          </div>

          <div className="flex flex-wrap gap-6">
            <div className="flex items-center space-x-2">
              <Switch id="disabled" checked={isDisabled} onCheckedChange={setIsDisabled} />
              <Label htmlFor="disabled">Disabled</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="readonly" checked={isReadOnly} onCheckedChange={setIsReadOnly} />
              <Label htmlFor="readonly">Read Only</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="autoresize" checked={autoResize} onCheckedChange={setAutoResize} />
              <Label htmlFor="autoresize">Auto Resize</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="scrollable" checked={scrollable} onCheckedChange={setScrollable} />
              <Label htmlFor="scrollable">Scrollable</Label>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="resize-mode">Resize Mode:</Label>
            <select
              id="resize-mode"
              className="px-3 py-2 border border-input rounded-md bg-background"
              value={resizeMode}
              onChange={(e) => setResizeMode(e.target.value as "fixed" | "auto" | "constrained")}
            >
              <option value="fixed">Fixed Height + Scroll</option>
              <option value="auto">Auto Height</option>
              <option value="constrained">Constrained (Min/Max)</option>
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Editor cơ bản */}
      <Card>
        <CardHeader>
          <CardTitle>Editor Cơ bản</CardTitle>
        </CardHeader>
        <CardContent>
          <QuillFlygora
            value={content}
            onChange={handleContentChange}
            placeholder="Nhập nội dung ở đây..."
            disabled={isDisabled}
            readOnly={isReadOnly}
            height="300px"
            resizeMode={resizeMode}
            autoResize={autoResize}
            scrollable={scrollable}
            minHeight="150px"
            maxHeight="400px"
          />
        </CardContent>
      </Card>

      {/* Editor với custom modules */}
      <Card>
        <CardHeader>
          <CardTitle>Editor Nâng cao (Custom Modules)</CardTitle>
        </CardHeader>
        <CardContent>
          <QuillFlygora
            value={content}
            onChange={handleContentChange}
            placeholder="Editor với toolbar mở rộng..."
            modules={customModules}
            height="250px"
            className="border-2 border-dashed"
          />
        </CardContent>
      </Card>

      {/* Compact Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Editor Compact</CardTitle>
        </CardHeader>
        <CardContent>
          <QuillFlygora
            value=""
            onChange={(value) => console.log("Compact editor:", value)}
            placeholder="Editor nhỏ gọn cho comment..."
            height="150px"
            modules={{
              toolbar: [["bold", "italic"], ["link"], [{ list: "bullet" }]],
            }}
          />
        </CardContent>
      </Card>

      {/* Auto-Resize Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Editor Auto-Resize</CardTitle>
          <p className="text-sm text-muted-foreground">
            Thử gõ nhiều dòng text để xem editor tự động mở rộng
          </p>
        </CardHeader>
        <CardContent>
          <QuillFlygora
            value=""
            onChange={(value) => console.log("Auto-resize editor:", value)}
            placeholder="Gõ text ở đây... Editor sẽ tự động thay đổi chiều cao"
            resizeMode="auto"
            autoResize={true}
            minHeight="120px"
            scrollable={false}
          />
        </CardContent>
      </Card>

      {/* Constrained Editor */}
      <Card>
        <CardHeader>
          <CardTitle>Editor Constrained (Min/Max Height)</CardTitle>
          <p className="text-sm text-muted-foreground">
            Editor có chiều cao tối thiểu 150px, tối đa 300px, sau đó sẽ scroll
          </p>
        </CardHeader>
        <CardContent>
          <QuillFlygora
            value=""
            onChange={(value) => console.log("Constrained editor:", value)}
            placeholder="Constrained editor với min/max height..."
            resizeMode="constrained"
            autoResize={true}
            scrollable={true}
            minHeight="150px"
            maxHeight="300px"
          />
        </CardContent>
      </Card>

      {/* Preview */}
      {showPreview && (
        <Card>
          <CardHeader>
            <CardTitle>Xem trước HTML</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold mb-2">Rendered HTML:</h4>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: content }}
                />
              </div>
              <div className="p-4 bg-muted rounded-md">
                <h4 className="font-semibold mb-2">Raw HTML:</h4>
                <pre className="text-xs bg-background p-2 rounded border overflow-auto">
                  {content}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Usage Example */}
      <Card>
        <CardHeader>
          <CardTitle>Cách sử dụng</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-sm bg-muted p-4 rounded-md overflow-auto">
            {`import { QuillFlygora } from "@/components/ui/QuillFlygora";

function MyComponent() {
  const [content, setContent] = useState("");

  return (
    <QuillFlygora
      value={content}
      onChange={setContent}
      placeholder="Nhập nội dung..."
      height="300px"
      disabled={false}
      readOnly={false}
    />
  );
}`}
          </pre>
        </CardContent>
      </Card>
    </div>
  );
}
