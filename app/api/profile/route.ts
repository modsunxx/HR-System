import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// วางต่อท้ายฟังก์ชัน PUT เดิมในไฟล์ app/api/profile/route.ts
export async function DELETE() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // หา User จากชื่อที่ล็อกอิน
    const user = await prisma.user.findFirst({
      where: { name: session.user.name },
    });

    if (!user)
      return NextResponse.json({ error: "ไม่พบผู้ใช้งาน" }, { status: 404 });

    // สั่งลบออกจาก Database
    await prisma.user.delete({
      where: { id: user.id },
    });

    return NextResponse.json({ success: true, message: "ลบบัญชีสำเร็จ" });
  } catch {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการลบบัญชี" },
      { status: 500 },
    );
  }
}
