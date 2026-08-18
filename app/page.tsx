import Sidebar from "../components/Sidebar";
import Link from "next/link"; // 1. อิมพอร์ต Link จาก Next.js

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
        <div className="w-full max-w-4xl p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          <div className="mb-10 border-b border-white/20 pb-6">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
              Workspace Overview
            </h1>
            <p className="text-sm text-slate-300 mt-3">
              Select a module to manage your organization&apos;s resources.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 2. เปลี่ยน div เป็น Link และเพิ่ม href */}
            {/* Card 1: ATS */}
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

            {/* Card 2: Dashboard */}
            <Link
              href="/dashboard"
              className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                📊
              </div>
              <h2 className="text-xl font-semibold mb-2">Employee Dashboard</h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                จัดการสิทธิ์การเข้าถึงข้อมูล (Role-based) และภาพรวมองค์กร
              </p>
            </Link>

            {/* Card 3: Onboarding */}
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

            {/* Card 4: Leave Management */}
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
          </div>
        </div>
      </div>
    </main>
  );
}
