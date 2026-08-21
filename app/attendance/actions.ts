"use server";

import { prisma } from "../../lib/prisma";
import { revalidatePath } from "next/cache";

// ชั่วคราว: สมมติว่าพนักงาน ID 1 (คุณซันนี่) เป็นคนกดลงเวลา (เดี๋ยวเราค่อยผูกกับระบบ Login ภายหลัง)
const EMPLOYEE_ID = 1;

export async function handleCheckIn() {
  const now = new Date();

  // โลจิกคำนวณสาย: ถ้าเกิน 8 โมง (hours > 8) หรือ (เป็นเวลา 8 โมง และนาทีเกิน 30) = สาย
  const isLate =
    now.getHours() > 8 || (now.getHours() === 8 && now.getMinutes() > 30);
  const status = isLate ? "Late" : "Present";

  // รีเซ็ตเวลาเป็น 00:00:00 เพื่อเก็บแค่วันที่
  const today = new Date(now.setHours(0, 0, 0, 0));

  try {
    await prisma.attendance.create({
      data: {
        employeeId: EMPLOYEE_ID,
        date: today,
        checkIn: new Date(),
        status: status,
      },
    });
    revalidatePath("/attendance"); // สั่งให้หน้าเว็บรีเฟรชตารางอัตโนมัติ
    return { success: true, status };
  } catch {
    return { success: false, message: "วันนี้คุณลงเวลาเข้างานไปแล้ว!" };
  }
}

export async function handleCheckOut() {
  const now = new Date();
  const today = new Date(now.setHours(0, 0, 0, 0));

  try {
    await prisma.attendance.update({
      where: { employeeId_date: { employeeId: EMPLOYEE_ID, date: today } },
      data: { checkOut: new Date() },
    });
    revalidatePath("/attendance");
    return { success: true };
  } catch {
    return {
      success: false,
      message: "ยังไม่ได้ Check-in หรือลงเวลาออกไปแล้ว!",
    };
  }
}
