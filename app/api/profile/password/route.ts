import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import bcrypt from "bcryptjs";

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { oldPassword, newPassword } = await req.json();

    // 1. หา User ใน Database จากชื่อที่ล็อกอินอยู่
    const user = await prisma.user.findFirst({
      where: { name: session.user.name },
    });

    if (!user)
      return NextResponse.json({ error: "ไม่พบผู้ใช้งาน" }, { status: 404 });

    // 2. เอารหัสผ่านเดิมที่พิมพ์มา เทียบกับใน Database
    const isValidPassword = await bcrypt.compare(oldPassword, user.password);
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "รหัสผ่านเดิมไม่ถูกต้อง" },
        { status: 400 },
      );
    }

    // 3. ถ้ารหัสเดิมถูก ให้เอารหัสใหม่มาเข้ารหัส (Hash)
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    // 4. บันทึกรหัสผ่านใหม่ลงตู้เซฟ
    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedNewPassword },
    });

    return NextResponse.json({
      success: true,
      message: "เปลี่ยนรหัสผ่านสำเร็จ!",
    });
  } catch {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดจากเซิร์ฟเวอร์" },
      { status: 500 },
    );
  }
}
