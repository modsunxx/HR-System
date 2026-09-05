import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "../../lib/prisma";
import AdminEditEmployeeModal from "../../components/AdminEditEmployeeModal";
import EmployeeFilterBar from "../../components/EmployeeFilterBar";

export default async function EmployeesDirectoryPage(props: {
  searchParams: Promise<{ q?: string; dept?: string }>; // 🌟 1. กำหนดเป็น Promise
}) {
  // เช็คสิทธิ์ความปลอดภัย
  const session = await getServerSession(authOptions);
  const userRole = (session?.user as { role?: string })?.role;

  if (!session || userRole !== "HR_ADMIN") {
    redirect("/");
  }

  // 🌟 2. แกะกล่อง Promise ก่อนใช้งาน (กฎใหม่ Next.js 15)
  const searchParams = await props.searchParams;
  const q = searchParams.q || "";
  const deptFilter = searchParams.dept || "";

  // เตรียมเงื่อนไขการกรองข้อมูล
  const whereClause: {
    name?: { contains: string; mode: "insensitive" };
    employee?: { departmentId: number };
  } = {};

  if (q) {
    whereClause.name = { contains: q, mode: "insensitive" };
  }
  if (deptFilter) {
    whereClause.employee = { departmentId: parseInt(deptFilter) };
  }

  // ดึงข้อมูล User
  const dbUsers = await prisma.user.findMany({
    where: whereClause,
    include: {
      employee: {
        include: {
          department: true,
        },
      },
    },
    orderBy: { id: "asc" },
  });

  // ดึงข้อมูลแผนก
  const departments = await prisma.department.findMany({
    orderBy: { name: "asc" },
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
        <div className="w-full max-w-7xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/20 pb-6 gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-2 transition-colors"
              >
                <span className="mr-2">←</span> Back to Workspace
              </Link>
              <h1 className="text-3xl font-bold tracking-wide">
                📇 Employee Directory
              </h1>
              <p className="text-sm text-slate-300 mt-2">
                จัดการรายชื่อพนักงาน เงินเดือน และสิทธิ์การใช้งาน (
                {dbUsers.length} คน)
              </p>
            </div>
            <Link
              href="/employees/new"
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 border border-emerald-400/30 text-white rounded-xl font-medium transition-all shadow-lg flex items-center gap-2"
            >
              <span>➕</span> Add New Employee
            </Link>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-lg">
            <EmployeeFilterBar departments={departments} />
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-white/5 text-slate-300 text-sm">
                    <th className="p-4 font-medium">Employee ID</th>
                    <th className="p-4 font-medium">Name</th>
                    <th className="p-4 font-medium">Role</th>
                    <th className="p-4 font-medium">Department</th>
                    <th className="p-4 font-medium">Salary (THB)</th>
                    <th className="p-4 font-medium text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-white/5">
                  {dbUsers.length > 0 ? (
                    dbUsers.map((user) => {
                      const emp = user.employee;
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
                            <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-800 shrink-0 border border-white/20">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={avatar}
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <p className="text-white">{user.name}</p>
                              <p className="text-xs text-slate-400 font-normal mt-0.5">
                                {emp?.firstName || "-"} {emp?.lastName || ""}
                              </p>
                            </div>
                          </td>
                          <td className="p-4">
                            <span
                              className={`px-3 py-1 rounded-full text-xs font-medium border ${user.role === "HR_ADMIN" ? "bg-purple-500/20 text-purple-300 border-purple-500/30" : "bg-emerald-500/20 text-emerald-300 border-emerald-500/30"}`}
                            >
                              {user.role}
                            </span>
                          </td>
                          <td className="p-4">
                            <span className="bg-white/10 px-3 py-1 rounded-full text-xs text-slate-300 border border-white/10">
                              {emp?.department?.name || "Unassigned"}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-emerald-400">
                            {emp?.salary
                              ? `฿${emp.salary.toLocaleString()}`
                              : "-"}
                          </td>
                          <td className="p-4 text-center">
                            <AdminEditEmployeeModal
                              user={user}
                              departments={departments}
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="p-12 text-center text-slate-400"
                      >
                        <div className="text-4xl mb-3">📭</div>
                        <p>ไม่พบข้อมูลพนักงานที่ค้นหา</p>
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
