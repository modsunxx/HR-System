import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } },
) {
  try {
    // 1. เช็คความปลอดภัย ต้องเป็น HR_ADMIN เท่านั้นถึงจะแก้ไขได้
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: string })?.role;

    if (!session || userRole !== "HR_ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = parseInt(params.id);
    const body = await req.json();
    const { role, position, salary, departmentId } = body;

    // 2. อัปเดตข้อมูลลง Database (อัปเดต Role ที่ User และ อัปเดตที่เหลือลง Employee)
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        role: role, // อัปเดตสิทธิ์
        employee: {
          upsert: {
            create: {
              position: position || null,
              salary: salary ? Number(salary) : null,
              departmentId: departmentId ? Number(departmentId) : null,
              // 🌟 เติมข้อมูลที่ Database บังคับว่าห้ามว่าง ลงไปให้ครบ
              firstName: "Unknown",
              lastName: "User",
              phone: "-",
              email: `user${userId}@hr-system.local`, // 👈 ขาดตัวนี้ไปครับ!
            },
            update: {
              position: position || null,
              salary: salary ? Number(salary) : null,
              departmentId: departmentId ? Number(departmentId) : null,
            },
          },
        },
      },
    });

    // 3. สั่งให้ Next.js รีเฟรชข้อมูลหน้า /employees ใหม่
    revalidatePath("/employees");

    return NextResponse.json(
      { message: "อัปเดตสำเร็จ", user: updatedUser },
      { status: 200 },
    );
  } catch (error) {
    console.error("Update Employee Error:", error);
    return NextResponse.json({ message: "เกิดข้อผิดพลาด" }, { status: 500 });
  }
}
