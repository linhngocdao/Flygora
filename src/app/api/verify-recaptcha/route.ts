import { NextRequest, NextResponse } from "next/server";

/**
 * API route để xác thực Google reCAPTCHA
 * Được gọi từ frontend để verify token reCAPTCHA
 */
export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    if (!token) {
      return NextResponse.json(
        { success: false, message: "Token reCAPTCHA bị thiếu" },
        { status: 400 }
      );
    }

    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!secretKey) {
      return NextResponse.json(
        { success: false, message: "Secret key reCAPTCHA chưa được cấu hình" },
        { status: 500 }
      );
    }

    // Gửi request đến Google để verify token
    const verifyResponse = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    });

    const verifyData = await verifyResponse.json();

    if (verifyData.success) {
      return NextResponse.json(
        {
          success: true,
          message: "reCAPTCHA xác thực thành công",
          score: verifyData.score, // Cho reCAPTCHA v3 (nếu cần)
        },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        {
          success: false,
          message: "reCAPTCHA xác thực thất bại",
          errors: verifyData["error-codes"],
        },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Lỗi khi xác thực reCAPTCHA:", error);
    return NextResponse.json(
      { success: false, message: "Lỗi server khi xác thực reCAPTCHA" },
      { status: 500 }
    );
  }
}
