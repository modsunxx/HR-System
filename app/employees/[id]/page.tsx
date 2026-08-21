import { prisma } from "../../../lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function EmployeeDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // แปลง ID จาก URL (ที่เป็นตัวหนังสือ) ให้เป็นตัวเลข
  const employeeId = parseInt(params.id);

  // ดึงข้อมูลพนักงานคนนี้จาก Database
  const employee = await prisma.employee.findUnique({
    where: { id: employeeId },
    include: { department: true }, // ดึงชื่อแผนกมาด้วย
  });

  // ถ้าหาไม่เจอ ให้โยนไปหน้า 404
  if (!employee) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl text-white">
        {/* Header และปุ่มย้อนกลับ */}
        <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
          <Link
            href="/dashboard"
            className="text-slate-400 hover:text-white transition-colors flex items-center text-sm"
          >
            <span className="mr-2">←</span> กลับไปหน้า Dashboard
          </Link>
          <Link
            href={`/employee/${employee.id}/edit`}
            className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            ✏️ แก้ไขข้อมูล
          </Link>
        </div>

        {/* ข้อมูลพนักงาน */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/20 shadow-lg mb-4 bg-slate-800">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${employee.firstName}&backgroundColor=transparent`}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl font-bold tracking-wide">
            {employee.firstName} {employee.lastName}
          </h1>
          <p className="text-emerald-400 font-medium mt-1">
            {employee.position}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <p className="text-xs text-slate-400 mb-1">รหัสพนักงาน</p>
            <p className="font-mono text-lg">
              EMP-{employee.id.toString().padStart(3, "0")}
            </p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <p className="text-xs text-slate-400 mb-1">อีเมล</p>
            <p className="text-lg truncate">{employee.email}</p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <p className="text-xs text-slate-400 mb-1">แผนก</p>
            <p className="text-lg">
              {employee.department?.name || "ยังไม่มีแผนก"}
            </p>
          </div>
          <div className="bg-black/20 p-4 rounded-xl border border-white/5">
            <p className="text-xs text-slate-400 mb-1">วันที่เข้าร่วม</p>
            <p className="text-lg">
              {employee.createdAt.toLocaleDateString("th-TH")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
