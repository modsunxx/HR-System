import Sidebar from "../../components/Sidebar";
import Link from "next/link";

export default function DashboardPage() {
  // Mock Data จำลองตัวเลขสถิติภาพรวม
  const stats = [
    {
      id: 1,
      label: "Total Employees",
      value: "124",
      icon: "👥",
      trend: "+4 this month",
    },
    { id: 2, label: "On Leave Today", value: "8", icon: "🏖️", trend: "Normal" },
    {
      id: 3,
      label: "Pending Onboarding",
      value: "3",
      icon: "📝",
      trend: "Action required",
    },
    {
      id: 4,
      label: "Open Positions",
      value: "5",
      icon: "💼",
      trend: "From ATS",
    },
  ];

  // Mock Data จำลองรายชื่อพนักงานในตาราง
  const employees = [
    {
      id: "EMP-001",
      name: "Sunny C.",
      role: "HR Admin",
      department: "Human Resources",
      status: "Active",
    },
    {
      id: "EMP-042",
      name: "Somchai J.",
      role: "Senior Developer",
      department: "Engineering",
      status: "Active",
    },
    {
      id: "EMP-089",
      name: "Manee W.",
      role: "Product Manager",
      department: "Product",
      status: "On Leave",
    },
    {
      id: "EMP-102",
      name: "Piti K.",
      role: "Graphic Designer",
      department: "Marketing",
      status: "Active",
    },
    {
      id: "EMP-105",
      name: "Aree D.",
      role: "QA Tester",
      department: "Engineering",
      status: "Onboarding",
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
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md z-0"></div>

      {/* เรียกใช้ Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 p-4 sm:p-8 flex flex-col items-center justify-start h-screen overflow-y-auto">
        <div className="w-full max-w-6xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          {/* Header Section */}
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

          {/* Stats Grid (4 คอลัมน์) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 shadow-lg"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="text-3xl">{stat.icon}</div>
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-md ${
                      stat.trend.includes("+") || stat.trend === "Normal"
                        ? "bg-green-500/20 text-green-300"
                        : stat.trend.includes("Action")
                          ? "bg-yellow-500/20 text-yellow-300"
                          : "bg-slate-500/20 text-slate-300"
                    }`}
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

          {/* Employee Directory Table */}
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
                <tbody className="text-sm">
                  {employees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-b border-white/5 hover:bg-white/5 transition-colors"
                    >
                      <td className="p-4 font-mono text-slate-400">{emp.id}</td>
                      <td className="p-4 font-medium">{emp.name}</td>
                      <td className="p-4 text-slate-300">{emp.role}</td>
                      <td className="p-4">
                        <span className="bg-white/10 px-3 py-1 rounded-full text-xs">
                          {emp.department}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            emp.status === "Active"
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : emp.status === "On Leave"
                                ? "bg-orange-500/20 text-orange-300 border-orange-500/30"
                                : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                          }`}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <button className="text-blue-400 hover:text-blue-300 font-medium text-sm transition-colors">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
