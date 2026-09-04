"use client";

import Sidebar from "../components/Sidebar"; // 🌟 ระวังเรื่อง Path ของ Sidebar ด้วยนะครับ ถ้า error ให้ปรับตามโฟลเดอร์จริง
import Link from "next/link";
import { useSession } from "next-auth/react";
// 🌟 Import Icons จาก lucide-react ทั้งหมดที่ต้องใช้
import {
  LayoutDashboard,
  Users,
  Briefcase,
  UserPlus,
  Umbrella,
  Clock,
  UserCircle,
} from "lucide-react";

export default function Home() {
  // 1. ดึงข้อมูล session และสิทธิ์ของผู้ใช้งาน
  const { data: session, status } = useSession();
  const userRole =
    (session?.user as unknown as { role?: string })?.role || "EMPLOYEE";

  // 2. หน้าจอระหว่างรอเช็คสิทธิ์ (ป้องกันกะพริบ)
  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        <div className="animate-pulse text-xl">กำลังเตรียมพื้นที่ทำงาน...</div>
      </main>
    );
  }

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
        <div className="w-full max-w-5xl p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          {/* ========================================== */}
          {/* 🔴 โซน HR_ADMIN: เห็นเครื่องมือแบบจัดเต็ม 6 การ์ด */}
          {/* ========================================== */}
          {userRole === "HR_ADMIN" && (
            <>
              <div className="mb-10 border-b border-white/20 pb-6">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
                  Workspace Overview
                </h1>
                <p className="text-sm text-slate-300 mt-3">
                  Select a module to manage your organization&apos;s resources.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  href="/dashboard"
                  className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
                >
                  <LayoutDashboard
                    className="w-10 h-10 mb-4 text-emerald-400 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    Company Dashboard
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    ดูภาพรวมองค์กร สถิติพนักงาน และกราฟสรุปข้อมูลแบบเรียลไทม์
                  </p>
                </Link>

                <Link
                  href="/employees"
                  className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
                >
                  <Users
                    className="w-10 h-10 mb-4 text-blue-400 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    Employee Directory
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    ระบบจัดการรายชื่อพนักงานทั้งหมด ดูโปรไฟล์
                    และแก้ไขข้อมูลส่วนตัว
                  </p>
                </Link>

                <Link
                  href="/ats"
                  className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
                >
                  <Briefcase
                    className="w-10 h-10 mb-4 text-purple-400 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    Applicant Tracking
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    ระบบจัดการผู้สมัครงาน หน้าประกาศรับสมัคร และดึงข้อมูลทำ SEO
                  </p>
                </Link>

                <Link
                  href="/onboarding"
                  className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
                >
                  <UserPlus
                    className="w-10 h-10 mb-4 text-orange-400 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    Onboarding Form
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    อัปโหลดเอกสารพนักงานใหม่ จัดการผ่าน Server Actions
                  </p>
                </Link>

                <Link
                  href="/leave"
                  className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
                >
                  <Umbrella
                    className="w-10 h-10 mb-4 text-sky-400 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    Leave Management
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    ระบบจัดการวันลา อนุมัติเอกสาร และเชื่อมต่อ Webhook
                  </p>
                </Link>

                <Link
                  href="/attendance"
                  className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
                >
                  <Clock
                    className="w-10 h-10 mb-4 text-rose-400 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-xl font-semibold mb-2">
                    Time & Attendance
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    ระบบบันทึกเวลาเข้า-ออกงาน ติดตามการมาสาย
                    และสรุปสถิติเวลาทำงาน
                  </p>
                </Link>
              </div>
            </>
          )}

          {/* ========================================== */}
          {/* 🔵 โซน EMPLOYEE: เห็นเฉพาะหน้าของพนักงาน */}
          {/* ========================================== */}
          {userRole === "EMPLOYEE" && (
            <>
              <div className="mb-10 border-b border-white/20 pb-6">
                <h1 className="text-3xl sm:text-4xl font-bold tracking-wide">
                  My Workspace
                </h1>
                <p className="text-sm text-slate-300 mt-3">
                  ยินดีต้อนรับเข้าสู่ระบบพนักงาน
                  เลือกโมดูลที่คุณต้องการใช้งานได้เลยครับ
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link
                  href="/attendance"
                  className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-blue-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
                >
                  <Clock
                    className="w-10 h-10 mb-4 text-blue-400 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-xl font-semibold mb-2 text-blue-300">
                    ลงเวลาเข้า-ออกงาน
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    บันทึกเวลาทำงานประจำวันของคุณผ่านระบบออนไลน์
                  </p>
                </Link>

                <Link
                  href="/leave"
                  className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-sky-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
                >
                  <Umbrella
                    className="w-10 h-10 mb-4 text-sky-400 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-xl font-semibold mb-2 text-sky-300">
                    ยื่นขอลางาน
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    เช็คโควตาวันลาคงเหลือ และส่งใบลาให้หัวหน้าอนุมัติ
                  </p>
                </Link>

                <Link
                  href="/profile"
                  className="block p-8 rounded-2xl bg-white/5 border border-white/10 hover:bg-purple-500/20 hover:-translate-y-1 transition-all duration-300 cursor-pointer group shadow-lg hover:shadow-xl"
                >
                  <UserCircle
                    className="w-10 h-10 mb-4 text-purple-400 group-hover:scale-110 transition-transform"
                    strokeWidth={1.5}
                  />
                  <h2 className="text-xl font-semibold mb-2 text-purple-300">
                    โปรไฟล์ส่วนตัว
                  </h2>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    ดูข้อมูลส่วนตัว ข้อมูลการจ้างงาน และอัปเดตรูปโปรไฟล์
                  </p>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
