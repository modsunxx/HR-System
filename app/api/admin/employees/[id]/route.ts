import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: Request,
  // 🌟 1. กำหนดให้ params เป็น Promise (ตามกฎ Next.js 15)
  context: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession(authOptions);
    const userRole = (session?.user as { role?: string })?.role;

    if (!session || userRole !== "HR_ADMIN") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 🌟 2. จุดสำคัญที่สุด! ต้องใส่ await หน้า context.params เพื่อแกะกล่องเอา ID ออกมา
    const resolvedParams = await context.params;
    const userId = parseInt(resolvedParams.id, 10);

    const body = await req.json();
    const { role, position, salary, departmentId } = body;

    const updatedUser = await prisma.user.update({
      where: { id: userId }, // 🌟 ตอนนี้ userId จะเป็นตัวเลข (เช่น 3) เรียบร้อยแล้ว
      data: {
        role: role,
        employee: {
          upsert: {
            create: {
              position: position || null,
              salary: salary ? Number(salary) : null,
              departmentId: departmentId ? Number(departmentId) : null,
              firstName: "Unknown",
              lastName: "User",
              phone: "-",
              email: `user${userId}@hr-system.local`, // 🌟 ตรงนี้จะไม่เป็น NaN แล้ว
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

    // 🌟 3. สั่งรีเฟรชหน้าเว็บเพื่อให้ตารางอัปเดตข้อมูลใหม่
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
