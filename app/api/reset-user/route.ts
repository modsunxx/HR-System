import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // คำสั่ง SQL ดิบ: ลบข้อมูลทั้งหมดในตาราง User และรีเซ็ต ID กลับเป็น 1
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`,
    );

    return NextResponse.json({
      success: true,
      message:
        "✅ ล้างข้อมูลและรีเซ็ต ID ของตาราง User กลับเป็น 1 เรียบร้อยแล้ว!",
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "❌ เกิดข้อผิดพลาด",
        error,
      },
      { status: 500 },
    );
  }
}
