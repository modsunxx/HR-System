import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req: Request) {
  try {
    // 1. เช็คสิทธิ์ว่าล็อกอินอยู่ไหม
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. รับข้อมูลไฟล์จาก FormData ที่หน้าเว็บส่งมา
    const formData = await req.formData();
    const file = formData.get("avatar") as File | null;

    if (!file) {
      return NextResponse.json({ error: "ไม่พบไฟล์รูปภาพ" }, { status: 400 });
    }

    // 3. แปลงไฟล์เป็น Buffer เพื่อเตรียมเขียนลงโฟลเดอร์
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. กำหนดชื่อไฟล์ใหม่ให้ไม่ซ้ำกัน (ใช้ชื่อ user + เวลา)
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = file.name.split(".").pop();
    const newFilename = `avatar-${session.user.name.replace(/\s+/g, "-")}-${uniqueSuffix}.${fileExtension}`;

    // 5. กำหนดโฟลเดอร์ปลายทาง (public/uploads/avatars)
    const uploadDir = path.join(process.cwd(), "public", "uploads", "avatars");

    // สร้างโฟลเดอร์ถ้ายังไม่มี
    await mkdir(uploadDir, { recursive: true });

    // 6. บันทึกไฟล์ลงโฟลเดอร์
    const filePath = path.join(uploadDir, newFilename);
    await writeFile(filePath, buffer);

    // 7. เอาที่อยู่ไฟล์ (URL) ไปบันทึกลง Database
    const avatarUrl = `/uploads/avatars/${newFilename}`;

    await prisma.user.updateMany({
      where: { name: session.user.name },
      data: { avatarUrl: avatarUrl },
    });

    return NextResponse.json({
      success: true,
      message: "อัปโหลดรูปโปรไฟล์สำเร็จ",
      avatarUrl: avatarUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการอัปโหลดไฟล์" },
      { status: 500 },
    );
  }
}
