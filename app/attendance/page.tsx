import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { prisma } from "../../lib/prisma";
import ClockPanel from "./ClockPanel";

export default async function AttendancePage() {
  // สั่งดึงข้อมูลประวัติการลงเวลา เรียงจากล่าสุด และดึงชื่อพนักงานมาด้วย
  const logs = await prisma.attendance.findMany({
    orderBy: { date: "desc" },
    include: { employee: true },
  });

  return (
    <main
      className="min-h-screen flex font-sans bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md z-0"></div>
      <Sidebar />

      <div className="relative z-10 flex-1 p-4 sm:p-8 flex flex-col items-center justify-start h-screen overflow-y-auto">
        <div className="w-full max-w-5xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-10 border-b border-white/20 pb-6 gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-2 transition-colors"
              >
                <span className="mr-2">←</span> Back to Workspace
              </Link>
              <h1 className="text-3xl font-bold tracking-wide">
                Time & Attendance
              </h1>
              <p className="text-sm text-slate-300 mt-2">
                ระบบบันทึกเวลาเข้า-ออกงาน และตรวจสอบสถิติการทำงาน
              </p>
            </div>
          </div>

          {/* เรียกใช้งานนาฬิกาและปุ่มกดจาก Client Component */}
          <ClockPanel />

          {/* History Table ไร้ Mockup */}
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-lg">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-semibold">Recent Attendance Log</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-300 text-sm">
                    <th className="p-4 font-medium">วันที่</th>
                    <th className="p-4 font-medium">พนักงาน</th>
                    <th className="p-4 font-medium">เวลาเข้างาน</th>
                    <th className="p-4 font-medium">เวลาออกงาน</th>
                    <th className="p-4 font-medium">สถานะ</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {logs.length > 0 ? (
                    logs.map((record) => (
                      <tr
                        key={record.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4 font-medium">
                          {record.date.toLocaleDateString("th-TH")}
                        </td>
                        <td className="p-4">
                          {record.employee.firstName} {record.employee.lastName}
                        </td>
                        <td className="p-4 text-emerald-300 font-mono">
                          {record.checkIn.toLocaleTimeString("th-TH")}
                        </td>
                        <td className="p-4 text-orange-300 font-mono">
                          {record.checkOut
                            ? record.checkOut.toLocaleTimeString("th-TH")
                            : "-"}
                        </td>
                        <td className="p-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium border ${
                              record.status === "Present"
                                ? "bg-green-500/20 text-green-300 border-green-500/30"
                                : record.status === "Late"
                                  ? "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                                  : "bg-red-500/20 text-red-300 border-red-500/30"
                            }`}
                          >
                            {record.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={5}
                        className="p-12 text-center text-slate-400"
                      >
                        ยังไม่มีข้อมูลการลงเวลา
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
