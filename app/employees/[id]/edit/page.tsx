import { prisma } from "../../../../lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditEmployeePage({
  params,
}: {
  params: { id: string };
}) {
  const employeeId = parseInt(params.id);

  // ดึงข้อมูลเดิมขึ้นมาเตรียมรอไว้ในฟอร์ม
  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
  });

  if (!employee) {
    redirect("/dashboard");
  }

  // ฟังก์ชันอัปเดตข้อมูล ทำงานฝั่ง Server
  async function handleUpdate(formData: FormData) {
    "use server";

    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;

    // สั่ง Update ข้อมูลลงตู้เซฟ PostgreSQL
    await prisma.employee.update({
      where: { id: employeeId },
      data: {
        firstName,
        lastName,
        email,
        position,
      },
    });

    // อัปเดตเสร็จให้เด้งกลับไปหน้า Dashboard
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8 flex flex-col items-center justify-center text-white">
      <div className="max-w-xl w-full bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">แก้ไขข้อมูลพนักงาน</h1>
          <Link
            href={`/employee/${employeeId}`}
            className="text-sm text-slate-400 hover:text-white"
          >
            ยกเลิก
          </Link>
        </div>

        <form action={handleUpdate} className="space-y-5">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">
                ชื่อจริง
              </label>
              <input
                name="firstName"
                required
                type="text"
                defaultValue={employee.firstName} // ใส่ข้อมูลเดิมรอไว้
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1 text-slate-300">
                นามสกุล
              </label>
              <input
                name="lastName"
                required
                type="text"
                defaultValue={employee.lastName}
                className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">
              อีเมล
            </label>
            <input
              name="email"
              required
              type="email"
              defaultValue={employee.email}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-slate-300">
              ตำแหน่งงาน
            </label>
            <input
              name="position"
              required
              type="text"
              defaultValue={employee.position}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl transition duration-300 shadow-lg mt-4"
          >
            💾 บันทึกการแก้ไข
          </button>
        </form>
      </div>
    </div>
  );
}
