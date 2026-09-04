import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

// 🌟 1. สร้าง Type บอกโครงสร้างข้อมูลให้ TypeScript รู้จัก
interface ProfileUpdateData {
  displayName: string;
  firstName: string;
  lastName: string;
  phone: string;
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

    // 🌟 2. ระบุ Type (as ProfileUpdateData) ให้กับตัวแปร body
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
            // 🟢 กรณีสร้างใหม่ (Insert) ต้องใส่ฟิลด์ที่บังคับ (Required) ให้ครบ
            create: {
              firstName: body.firstName || "",
              lastName: body.lastName || "",
              phone: body.phone || "",
              // 🌟 เพิ่ม 2 บรรทัดนี้เข้าไปครับ (เพื่อให้ตรงกับ Schema ที่บังคับ)
              email: `user${userId}@hr-system.local`, // ใส่เมลดัมมี่ไปก่อน ป้องกันการซ้ำ (@unique)
              position: "ยังไม่ระบุตำแหน่ง", // ใส่ค่าเริ่มต้น
            },
            // 🔵 กรณีอัปเดต (Update) ไม่จำเป็นต้องส่งครบ ส่งแค่ตัวที่อยากเปลี่ยนก็พอ
            update: {
              firstName: body.firstName,
              lastName: body.lastName,
              phone: body.phone,
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
