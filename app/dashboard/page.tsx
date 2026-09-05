import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { prisma } from "../../lib/prisma";

export default async function DashboardPage() {
  // 🌟 1. ดึงข้อมูลตาราง User พร้อมเชื่อม (Join) ข้อมูล Employee และ Department
  const dbUsers = await prisma.user.findMany({
    include: {
      employee: {
        include: {
          department: true,
        },
      },
    },
    orderBy: {
      id: "asc",
    },
  });

  // นับจำนวนจากตาราง User จริงๆ
  const totalEmployeesCount = await prisma.user.count();

  // (ส่วนของการลางานและตำแหน่งว่าง ตอนนี้ตั้งไว้เป็น 0 ก่อน
  // จนกว่าเราจะทำระบบลางาน (Leave) และรับสมัครงาน (ATS) เพิ่มเติมครับ)
  const stats = [
    {
      id: 1,
      label: "Total Employees",
      value: totalEmployeesCount.toString(),
      icon: "👥",
      trend: "+0 this month",
    },
    {
      id: 2,
      label: "On Leave Today",
      value: "0",
      icon: "🏖️",
      trend: "Normal",
    },
    {
      id: 3,
      label: "Pending Onboarding",
      value: "0",
      icon: "📝",
      trend: "Action required",
    },
    {
      id: 4,
      label: "Open Positions",
      value: "0",
      icon: "💼",
      trend: "From ATS",
    },
  ];

  return (
    <main
      className="min-h-screen flex font-sans bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md z-0"></div>

      <Sidebar />

      <div className="relative z-10 flex-1 p-4 sm:p-8 flex flex-col items-center justify-start h-screen overflow-y-auto">
        <div className="w-full max-w-6xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/20 pb-6 gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-2 transition-colors"
              >
                <span className="mr-2">←</span> Back to Workspace
              </Link>
              <h1 className="text-3xl font-bold tracking-wide">
                Employee Dashboard
              </h1>
              <p className="text-sm text-slate-300 mt-2">
                ภาพรวมองค์กรและจัดการสิทธิ์การเข้าถึงข้อมูลพนักงาน
              </p>
            </div>
            <button className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-medium transition-all shadow-lg flex items-center gap-2">
              <span>⬇️</span> Export Data
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-3xl">{stat.icon}</div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-md ${stat.trend.includes("+") || stat.trend === "Normal" ? "bg-green-500/20 text-green-300" : stat.trend.includes("Action") ? "bg-yellow-500/20 text-yellow-300" : "bg-slate-500/20 text-slate-300"}`}
                  >
                    {stat.trend}
                  </span>
                </div>
                <h3 className="text-slate-300 text-sm font-medium mb-1">
                  {stat.label}
                </h3>
                <p className="text-3xl font-bold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-lg">
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-semibold">Employee Directory</h2>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search employees..."
                  className="bg-slate-900/50 border border-white/10 text-sm rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-white/30 text-white placeholder-slate-400"
                />
              </div>
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
                <tbody className="text-sm divide-y divide-white/5">
                  {dbUsers.length > 0 ? (
                    dbUsers.map((user) => {
                      const emp = user.employee;
                      // 🌟 ดึงรูป Avatar เหมือนในหน้า Directory
                      const avatar =
                        user.avatarUrl ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}&backgroundColor=transparent`;

                      return (
                        <tr
                          key={user.id}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="p-4 font-mono text-slate-400">
                            EMP-
                            {(emp?.id || user.id).toString().padStart(3, "0")}
                          </td>
                          <td className="p-4 font-medium flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-white/20">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={avatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {user.name}
                          </td>
                          <td className="p-4">
                            {/* 🌟 แสดงสี Role ให้แยกกันชัดเจนแบบหน้า Directory */}
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${
                                user.role === "HR_ADMIN"
                                  ? "bg-purple-500/20 text-purple-300 border-purple-500/30"
                                  : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"
                              }`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">
                            {/* 🌟 ดึงชื่อแผนกจริงๆ มาแสดงแทน Unassigned */}
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs text-slate-300 border border-white/10">
                              {emp?.department?.name || "Unassigned"}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="px-3 py-1 rounded-full text-xs font-medium border bg-green-500/20 text-green-300 border-green-500/30">
                              Active
                            </span>
                          </td>
                          <td className="p-4 text-center">
                            {/* 🌟 เปลี่ยนเป็นปุ่ม Link ไปหน้า /employees เพื่อให้ไปจัดการข้อมูลได้จริง */}
                            <Link
                              href="/employees"
                              className="px-4 py-1.5 bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 rounded-lg font-medium text-sm transition-colors border border-blue-500/30"
                            >
                              Manage
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-8 text-center text-slate-400"
                      >
                        ยังไม่มีข้อมูลพนักงานในระบบ
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
