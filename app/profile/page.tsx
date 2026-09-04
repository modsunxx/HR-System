import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import EditProfileModal from "../../components/EditProfileModal";
import ChangePasswordModal from "../../components/ChangePasswordModal";
import DeleteAccountModal from "../../components/DeleteAccountModal";
import AvatarUpload from "../../components/AvatarUpload";
import { prisma } from "../../lib/prisma";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  // 1. ดึง ID จาก Session (ใช้ as any เพื่อเลี่ยง Error TypeScript ของ NextAuth)
  const userSession = session?.user as {
    id?: string;
    role?: string;
    name?: string | null;
  };
  const userId = userSession?.id ? parseInt(userSession.id) : 0;

  // 🌟 2. ดึงข้อมูล Database แบบจัดเต็ม (ดึงทะลุไปถึง Employee และ Department)
  const dbUser = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      employee: {
        include: {
          department: true,
        },
      },
    },
  });

  // 3. เตรียมตัวแปรสำหรับแสดงผล
  const name = dbUser?.name || "Unknown User";
  const role = userSession?.role || "EMPLOYEE";
  const username = dbUser?.username || "guest";
  const currentAvatarUrl = dbUser?.avatarUrl;

  // ข้อมูลพนักงาน (Employee)
  const employee = dbUser?.employee;
  const departmentName = employee?.department?.name || "ยังไม่ได้สังกัดแผนก";

  // แปลงวันที่ (Join Date) ให้แสดงผลสวยงาม (เช่น 01 Sep 2026)
  const joinDate = employee?.createdAt
    ? new Date(employee.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

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
          <Link
            href="/"
            className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-6 transition-colors"
          >
            <span className="mr-2">←</span> Back to Workspace
          </Link>

          <div className="mb-8 border-b border-white/20 pb-6 flex justify-between items-end">
            <div>
              <h1 className="text-3xl font-bold tracking-wide">
                👤 My Profile
              </h1>
              <p className="text-sm text-slate-300 mt-2">
                จัดการข้อมูลส่วนตัวและบัญชีผู้ใช้งาน
              </p>
            </div>

            {/* 🌟 4. ส่งมอบข้อมูลจริงให้กับ EditProfileModal */}
            <EditProfileModal
              currentName={name}
              currentFirstName={employee?.firstName || ""}
              currentLastName={employee?.lastName || ""}
              currentPhone={employee?.phone || ""}
            />
          </div>

          <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* โซนซ้าย: รูปโปรไฟล์และปุ่มจัดการ */}
            <div className="w-full md:w-1/3 flex flex-col items-center space-y-6">
              <AvatarUpload
                initialAvatarUrl={currentAvatarUrl}
                username={username}
              />

              <div className="w-full space-y-3">
                <ChangePasswordModal />
                <DeleteAccountModal />
              </div>
            </div>

            {/* โซนขวา: ข้อมูลแบบ Grid */}
            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-black/20 p-5 rounded-2xl border border-white/10 col-span-1 sm:col-span-2">
                <p className="text-sm text-slate-400 mb-1">Display Name</p>
                <div className="flex justify-between items-center">
                  <p className="text-xl font-semibold">{name}</p>
                </div>
                {/* เพิ่มบรรทัดโชว์ชื่อ-นามสกุลจริง */}
                <p className="text-sm text-slate-400 mt-1">
                  Full Name:{" "}
                  <span className="text-slate-200">
                    {employee?.firstName} {employee?.lastName}
                  </span>
                </p>
              </div>

              <div className="bg-black/20 p-5 rounded-2xl border border-white/10">
                <p className="text-sm text-slate-400 mb-1">
                  Role / Access Level
                </p>
                <p className="inline-block px-3 py-1 mt-1 rounded-full text-xs font-medium border bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                  {role}
                </p>
              </div>

              <div className="bg-black/20 p-5 rounded-2xl border border-white/10">
                <p className="text-sm text-slate-400 mb-1">Department</p>
                {/* 🌟 โชว์แผนกจริงจาก Database */}
                <p className="text-md font-medium text-slate-200 mt-1">
                  {departmentName}
                </p>
              </div>

              <div className="bg-black/20 p-5 rounded-2xl border border-white/10">
                <p className="text-sm text-slate-400 mb-1">Email (Username)</p>
                <p className="text-md font-medium text-slate-200 mt-1">
                  {username}
                </p>
              </div>

              <div className="bg-black/20 p-5 rounded-2xl border border-white/10">
                <p className="text-sm text-slate-400 mb-1">Join Date</p>
                {/* 🌟 โชว์วันที่สมัครจริง */}
                <p className="text-md font-medium text-slate-200 mt-1">
                  {joinDate}
                </p>
              </div>

              {/* 🌟 เพิ่มกล่องสำหรับโชว์เบอร์โทรศัพท์ด้วย (ถ้ามี) */}
              {employee?.phone && (
                <div className="bg-black/20 p-5 rounded-2xl border border-white/10 col-span-1 sm:col-span-2">
                  <p className="text-sm text-slate-400 mb-1">Phone Number</p>
                  <p className="text-md font-medium text-slate-200 mt-1">
                    {employee.phone}
                  </p>
                </div>
              )}

              <div className="bg-black/20 p-5 rounded-2xl border border-white/10 col-span-1 sm:col-span-2 flex justify-between items-center">
                <div>
                  <p className="text-sm text-slate-400 mb-1">System Status</p>
                  <p className="text-sm text-slate-300 flex items-center gap-2 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    Connected & Authenticated
                  </p>
                </div>
                <div className="text-2xl opacity-50">🛡️</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
