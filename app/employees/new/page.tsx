import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";

export default function AddEmployeePage() {
  // ฟังก์ชันนี้จะทำงานฝั่ง Server ทันทีที่มีคนกดปุ่มบันทึก
  async function handleSubmit(formData: FormData) {
    "use server";

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;

    // บันทึกลงฐานข้อมูลผ่าน Prisma ข้ามไปที่เครื่อง Mint
    await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        position,
      },
    });

    // บันทึกเสร็จ ดีดกลับไปหน้าแสดงรายชื่อพนักงานทันที
    redirect("/employees");
  }

  return (
    <div className="max-w-xl mx-auto p-8 text-white">
      <h1 className="text-3xl font-bold mb-6">เพิ่มพนักงานใหม่</h1>

      <form
        action={handleSubmit}
        className="space-y-4 bg-white/5 p-6 border border-white/10 rounded-xl"
      >
        <div>
          <label className="block text-sm font-medium mb-1">ชื่อจริง</label>
          <input
            name="firstName"
            required
            type="text"
            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-400"
            placeholder="เช่น สมชาย"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">นามสกุล</label>
          <input
            name="lastName"
            required
            type="text"
            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-400"
            placeholder="เช่น ใจดี"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">อีเมล</label>
          <input
            name="email"
            required
            type="email"
            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-400"
            placeholder="somchai@company.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">ตำแหน่งงาน</label>
          <input
            name="position"
            required
            type="text"
            className="w-full px-4 py-2 bg-black/40 border border-white/20 rounded-lg focus:outline-none focus:border-emerald-400"
            placeholder="เช่น Software Engineer"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-lg transition duration-200 mt-4 cursor-pointer"
        >
          บันทึกข้อมูลพนักงาน
        </button>
      </form>
    </div>
  );
}
