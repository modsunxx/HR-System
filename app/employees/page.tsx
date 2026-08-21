import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function EmployeesDirectoryPage() {
  // ดึงข้อมูลพนักงานทั้งหมดจาก Database
  const dbEmployees = await prisma.employee.findMany({
    include: {
      department: true,
    },
    orderBy: {
      id: "asc",
    },
  });

  return (
    <main
      className="min-h-screen flex font-sans bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-0"></div>

      {/* เรียกใช้ Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 p-4 sm:p-8 flex flex-col items-center justify-start h-screen overflow-y-auto">
        <div className="w-full max-w-6xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/20 pb-6 gap-4">
            <div>
              {/* เพิ่มปุ่มย้อนกลับตรงนี้ */}
              <Link
                href="/"
                className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-2 transition-colors"
              >
                <span className="mr-2">←</span> Back to Workspace
              </Link>
              <h1 className="text-3xl font-bold tracking-wide">
                Employee Directory
              </h1>
              <p className="text-sm text-slate-300 mt-2">
                จัดการรายชื่อพนักงานทั้งหมดในองค์กร ({dbEmployees.length} คน)
              </p>
            </div>

            {/* ปุ่มเพิ่มพนักงานใหม่ ชี้ไปที่ฟอร์มที่เราสร้างไว้ */}
            <Link
              href="/employee/new"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/30 text-white rounded-xl font-medium transition-all shadow-lg flex items-center gap-2"
            >
              <span>➕</span> Add New Employee
            </Link>
          </div>

          {/* Employee Directory Table */}
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-lg">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400">
                  🔍
                </span>
                <input
                  type="text"
                  placeholder="ค้นหาพนักงาน..."
                  className="bg-slate-900/50 border border-white/10 text-sm rounded-lg pl-10 pr-4 py-2 w-64 focus:outline-none focus:border-white/30 text-white placeholder-slate-400 transition-all focus:w-80"
                />
              </div>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-lg text-sm transition-all flex items-center gap-2">
                <span>⚡</span> Filter
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-300 text-sm">
                    <th className="p-4 font-medium">Employee ID</th>
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Role</th>
                    <th className="p-4 font-medium">Department</th>
                    <th className="p-4 font-medium">Status</th>
                    <th className="p-4 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {dbEmployees.length > 0 ? (
                    dbEmployees.map((emp) => (
                      <tr
                        key={emp.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4 font-mono text-slate-400">
                          EMP-{emp.id.toString().padStart(3, "0")}
                        </td>
                        <td className="p-4 font-medium flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 shrink-0">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${emp.firstName}&backgroundColor=transparent`}
                              alt="Profile"
                            />
                          </div>
                          {emp.firstName} {emp.lastName}
                        </td>
                        <td className="p-4 text-slate-300">{emp.position}</td>
                        <td className="p-4">
                          <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
                            {emp.department?.name || "Unassigned"}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium border bg-green-500/20 text-green-300 border-green-500/30">
                            Active
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          {/* ปุ่ม Manage ลิงก์ไปหน้าดูโปรไฟล์ [id] ที่เราเพิ่งสร้าง! */}
                          <Link
                            href={`/employees/${emp.id}`}
                            className="px-3 py-1.5 bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 rounded-lg font-medium text-sm transition-colors border border-blue-500/30"
                          >
                            Manage
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-12 text-center text-slate-400"
                      >
                        <div className="text-4xl mb-3">📭</div>
                        <p>ยังไม่มีข้อมูลพนักงานในระบบ</p>
                        <p className="text-xs mt-1">
                          คลิกปุ่ม Add New Employee เพื่อเริ่มต้นใช้งาน
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
