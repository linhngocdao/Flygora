/**
 * Error boundary cho Next.js 15
 * Xử lý các lỗi runtime và hiển thị UI lỗi phù hợp
 */
"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log lỗi để debug
    console.error("Error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center space-y-6 p-8">
        <div className="space-y-2">
          <h1 className="text-6xl font-bold text-red-500">⚠️</h1>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Có lỗi xảy ra!
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Đã có lỗi bất ngờ xảy ra. Vui lòng thử lại hoặc liên hệ với chúng tôi.
          </p>
          {error.digest && (
            <p className="text-sm text-gray-400 font-mono">Error ID: {error.digest}</p>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={reset}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Thử lại
          </button>
          <Link
            href="/"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Về trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}
