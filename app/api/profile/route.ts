import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 🌟 1. เพิ่ม email ใน Type
interface ProfileUpdateData {
  displayName: string;
  firstName: string;
  lastName: string;
  firstNameEn: string;
  lastNameEn: string;
  phone: string;
  email: string;
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || !(session.user as { id: string }).id) {
      return NextResponse.json(
        { message: "ยังไม่ได้เข้าสู่ระบบ (Unauthorized)" },
        { status: 401 },
      );
    }

    const body = (await req.json()) as ProfileUpdateData;
    const userId = parseInt((session.user as { id: string }).id);

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name: body.displayName,
        employee: {
          upsert: {
            create: {
              firstName: body.firstName || "",
              lastName: body.lastName || "",
              firstNameEn: body.firstNameEn || null,
              lastNameEn: body.lastNameEn || null,
              phone: body.phone || "",
              // 🌟 2. ถ้าไม่ได้กรอกมา ให้สร้างเมลชั่วคราวกัน error
              email: body.email || `user${userId}@hr-system.local`,
              position: "ยังไม่ระบุตำแหน่ง",
            },
            update: {
              firstName: body.firstName,
              lastName: body.lastName,
              firstNameEn: body.firstNameEn || null,
              lastNameEn: body.lastNameEn || null,
              phone: body.phone,
              // 🌟 3. อัปเดตอีเมล (เฉพาะถ้ากรอกมา)
              ...(body.email ? { email: body.email } : {}),
            },
          },
        },
      },
    });

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
