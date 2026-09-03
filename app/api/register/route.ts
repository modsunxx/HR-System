import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { username, password, name } = await req.json();

    // 1. เช็คว่ามี Username นี้ในระบบหรือยัง
    const existingUser = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Username นี้มีคนใช้แล้ว!" },
        { status: 400 },
      );
    }

    // 2. เข้ารหัสผ่าน
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🌟 3. บันทึกลงฐานข้อมูล (สร้าง User + Employee พร้อมกัน)
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name: name || username,
        role: "EMPLOYEE", // บังคับสิทธิ์เริ่มต้นให้เป็น EMPLOYEE

        // ✨ สร้างโปรไฟล์ Employee ผูกกับ User อัตโนมัติ
        employee: {
          create: {
            firstName: name || username, // ใช้ Display Name เป็นชื่อจริงชั่วคราว
            lastName: "รอการอัปเดต", // นามสกุลชั่วคราว
            email: `${username}@company.com`, // สร้างอีเมลดัมมี่เพื่อไม่ให้ติด Error (Unique)
            position: "พนักงานใหม่", // ตำแหน่งเริ่มต้น
          },
        },
      },
    });

    return NextResponse.json({ message: "สมัครสมาชิกสำเร็จ" }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดที่ระบบหลังบ้าน" },
      { status: 500 },
    );
  }
}
