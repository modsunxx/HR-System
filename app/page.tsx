import Sidebar from "../components/Sidebar";
import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex font-sans bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')",
      }}
    >
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md z-0"></div>

      <Sidebar />

      <div className="relative z-10 flex-1 p-4 sm:p-8 flex items-center justify-center">
        {/* ปรับ max-w ให้กว้างขึ้นเพื่อรองรับ 3 คอลัมน์ */}
        <div className="w-full max-w-5xl p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          <div className="mb-10 border-b border-white/20 pb-6">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
              Workspace Overview
            </h1>
            <p className="text-sm text-slate-300 mt-3">
              Select a module to manage your organization&apos;s resources.
            </p>
          </div>

          {/* ปรับ Grid เป็น 2 คอลัมน์สำหรับจอแยก และ 3 คอลัมน์สำหรับจอใหญ่ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Dashboard (สำหรับดูกราฟสรุปในอนาคต) */}
            <Link
              href="/dashboard"
              className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                📊
              </div>
              <h2 className="text-xl font-semibold mb-2">Company Dashboard</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                ดูภาพรวมองค์กร สถิติพนักงาน และกราฟสรุปข้อมูลแบบเรียลไทม์
              </p>
            </Link>

            {/* Card 2: Employee Directory (เพิ่มมาใหม่! ชี้ไปที่ /employees) */}
            <Link
              href="/employees"
              className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                📇
              </div>
              <h2 className="text-xl font-semibold mb-2">Employee Directory</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                ระบบจัดการรายชื่อพนักงานทั้งหมด ดูโปรไฟล์ และแก้ไขข้อมูลส่วนตัว
              </p>
            </Link>

            {/* Card 3: ATS */}
            <Link
              href="/ats"
              className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                📄
              </div>
              <h2 className="text-xl font-semibold mb-2">Applicant Tracking</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                ระบบจัดการผู้สมัครงาน หน้าประกาศรับสมัคร และดึงข้อมูลทำ SEO
              </p>
            </Link>

            {/* Card 4: Onboarding */}
            <Link
              href="/onboarding"
              className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                📝
              </div>
              <h2 className="text-xl font-semibold mb-2">Onboarding Form</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                อัปโหลดเอกสารพนักงานใหม่ จัดการผ่าน Server Actions
              </p>
            </Link>

            {/* Card 5: Leave Management */}
            <Link
              href="/leave"
              className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                🏖️
              </div>
              <h2 className="text-xl font-semibold mb-2">Leave Management</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                ระบบจัดการวันลา อนุมัติเอกสาร และเชื่อมต่อ Webhook
              </p>
            </Link>
            {/* Card 6: Time & Attendance */}
            <Link
              href="/attendance"
              className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                ⏰
              </div>
              <h2 className="text-xl font-semibold mb-2">Time & Attendance</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                ระบบบันทึกเวลาเข้า-ออกงาน ติดตามการมาสาย และสรุปสถิติเวลาทำงาน
              </p>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
