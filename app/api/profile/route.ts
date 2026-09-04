import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache"; // 🌟 นำเข้า revalidatePath

export async function PUT(req: Request) {
  try {
    // 1. ตรวจสอบว่า User ล็อกอินอยู่หรือไม่
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as { id: string }).id) {
      return NextResponse.json(
        { message: "ยังไม่ได้เข้าสู่ระบบ (Unauthorized)" },
        { status: 401 },
      );
    }

    // 2. ดึงข้อมูลที่ส่งมาจากหน้าต่าง Edit Profile
    const body = await req.json();
    const userId = parseInt((session.user as { id: string }).id);

    // 3. ใช้ Prisma อัปเดตข้อมูลแบบ Nested (ทะลุไปตาราง Employee)
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: body.displayName,
        employee: {
          update: {
            firstName: body.firstName,
            lastName: body.lastName,
            phone: body.phone,
          },
        },
      },
    });

    // 🌟 4. สั่งล้างความจำหน้า profile เพื่อให้ดึงข้อมูลใหม่ทันที
    revalidatePath("/profile");

    return NextResponse.json(
      { message: "อัปเดตโปรไฟล์สำเร็จ", user: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error("Profile Update Error:", error);
    return NextResponse.json(
      { message: "เกิดข้อผิดพลาดในการอัปเดตข้อมูล" },
      { status: 500 },
    );
  }
}
