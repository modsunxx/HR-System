"use client";
import {
  Home,
  User,
  Users,
  FileText,
  CalendarCheck,
  Clock,
  Palmtree,
  LogOut,
} from "lucide-react";
import { useState } from "react";
import UserProfile from "./UserProfile";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  const { data: session, status } = useSession();
  const userRole =
    (session?.user as unknown as { role?: string })?.role || "EMPLOYEE";

  const userName = session?.user?.name || "Guest";
  const userAvatarName = session?.user?.name || "guest";
  const isLoading = status === "loading";

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const sidebarWidth = isCollapsed ? "w-24" : isMaximized ? "w-80" : "w-64";

  const menuClass = `flex items-center w-full rounded-xl hover:bg-white/10 transition-all text-sm font-medium ${
    isCollapsed ? "p-3 justify-center" : "p-3 gap-3 text-left"
  }`;

  return (
    // 🌟 แก้ที่ 1: เปลี่ยนกลับเป็น relative และเพิ่ม shrink-0 เพื่อดันเนื้อหาตรงกลาง ไม่ให้ทับกัน
    <div className="relative flex items-start h-screen z-100 shrink-0">
      {/* ปุ่ม Hamburger */}
      <div
        className={`transition-all duration-500 ease-in-out overflow-hidden flex items-start ${
          isOpen ? "w-0 opacity-0 m-0" : "w-16 opacity-100 m-4 sm:m-8 mr-0"
        }`}
      >
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg text-white hover:bg-white/20 transition-all cursor-pointer group flex items-center justify-center shrink-0"
        >
          <svg
            className="w-6 h-6 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar ตัวเต็ม */}
      <aside
        // 🌟 แก้ที่ 2: ใช้ h-[calc(100vh-2rem)] เพื่อล็อคความสูงไม่ให้ทะลุจอ (ทำให้เมนูข้างใน scroll ได้)
        className={`rounded-3xl bg-black/40 backdrop-blur-2xl shadow-2xl flex flex-col text-white transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? `${sidebarWidth} opacity-100 m-4 sm:m-8 mr-0 border border-white/20 h-[calc(100vh-2rem)] sm:h-[calc(100vh-4rem)] ${isCollapsed ? "p-4" : "p-6"}`
            : "w-0 opacity-0 m-0 p-0 border-0 h-0"
        }`}
      >
        <div className="flex flex-col h-full min-w-20">
          {/* macOS Style Header */}
          <div
            className={`flex space-x-2 mb-8 transition-all duration-500 ${isCollapsed ? "justify-center" : ""}`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="w-3.5 h-3.5 rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-sm shrink-0"
            ></button>
            <button
              onClick={() => {
                setIsCollapsed(!isCollapsed);
                setIsMaximized(false);
              }}
              className="w-3.5 h-3.5 rounded-full bg-yellow-500 hover:bg-yellow-400 transition-colors shadow-sm shrink-0"
            ></button>
            <button
              onClick={() => {
                setIsMaximized(!isMaximized);
                setIsCollapsed(false);
              }}
              className="w-3.5 h-3.5 rounded-full bg-green-500 hover:bg-green-400 transition-colors shadow-sm shrink-0"
            ></button>
          </div>

          {/* User Profile Section */}
          <div
            className={`transition-all duration-300 ${isCollapsed ? "hidden" : "block"}`}
          >
            <UserProfile
              name={isLoading ? "Loading..." : userName}
              role={isLoading ? "..." : userRole}
              username={userAvatarName}
            />
          </div>

          <div
            className={`flex justify-center mb-6 pb-6 border-b border-white/20 transition-all duration-300 ${isCollapsed ? "block" : "hidden"}`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/30 shadow-lg bg-white/20 shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userAvatarName}&backgroundColor=transparent`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* 🌟 โซน Sidebar Menu (แก้ไขให้ Scroll ทำงานได้สมบูรณ์) */}
          <nav className="flex flex-col gap-2 flex-1 overflow-y-auto overflow-x-hidden pr-2 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
            {/* 🟢 โซนทั่วไป (เห็นทุกคน) */}
            <Link href="/dashboard" className={menuClass}>
              <Home
                className="w-5 h-5 shrink-0 text-white/80"
                strokeWidth={1.5}
              />
              {!isCollapsed && (
                <span className="whitespace-nowrap transition-opacity duration-300">
                  หน้าแรก
                </span>
              )}
            </Link>
            <Link href="/profile" className={menuClass}>
              <User
                className="w-5 h-5 shrink-0 text-white/80"
                strokeWidth={1.5}
              />
              {!isCollapsed && (
                <span className="whitespace-nowrap transition-opacity duration-300">
                  โปรไฟล์ส่วนตัว
                </span>
              )}
            </Link>

            {/* 🔴 โซน HR_ADMIN */}
            {userRole === "HR_ADMIN" && (
              <>
                {!isCollapsed && (
                  <p className="text-[10px] text-white/50 px-3 mt-4 mb-1 uppercase tracking-wider">
                    HR Management
                  </p>
                )}
                {isCollapsed && (
                  <div className="h-px bg-white/20 w-full my-3"></div>
                )}

                <Link href="/employees" className={menuClass}>
                  <Users
                    className="w-5 h-5 shrink-0 text-rose-300"
                    strokeWidth={1.5}
                  />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap text-rose-200">
                      จัดการพนักงาน
                    </span>
                  )}
                </Link>
                <Link href="/ats" className={menuClass}>
                  <FileText
                    className="w-5 h-5 shrink-0 text-rose-300"
                    strokeWidth={1.5}
                  />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap text-rose-200">
                      รับสมัครงาน
                    </span>
                  )}
                </Link>
                <Link href="/leave" className={menuClass}>
                  <CalendarCheck
                    className="w-5 h-5 shrink-0 text-rose-300"
                    strokeWidth={1.5}
                  />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap text-rose-200">
                      อนุมัติวันลา
                    </span>
                  )}
                </Link>
              </>
            )}

            {/* 🔵 โซน EMPLOYEE */}
            {userRole === "EMPLOYEE" && (
              <>
                {!isCollapsed && (
                  <p className="text-[10px] text-white/50 px-3 mt-4 mb-1 uppercase tracking-wider">
                    Employee Portal
                  </p>
                )}
                {isCollapsed && (
                  <div className="h-px bg-white/20 w-full my-3"></div>
                )}

                <Link href="/attendance" className={menuClass}>
                  <Clock
                    className="w-5 h-5 shrink-0 text-sky-300"
                    strokeWidth={1.5}
                  />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap text-sky-200">
                      เข้า-ออกงาน
                    </span>
                  )}
                </Link>
                <Link href="/leave-request" className={menuClass}>
                  <Palmtree
                    className="w-5 h-5 shrink-0 text-sky-300"
                    strokeWidth={1.5}
                  />
                  {!isCollapsed && (
                    <span className="whitespace-nowrap text-sky-200">
                      ยื่นขอลางาน
                    </span>
                  )}
                </Link>
              </>
            )}
          </nav>

          {/* 🌟 Logout Button ย้ายออกมาครอบไว้ให้ดันไปอยู่ล่างสุดเสมอ */}
          <div className="pt-4 mt-auto border-t border-white/10 shrink-0">
            <button
              onClick={handleLogout}
              className={`flex items-center w-full rounded-xl hover:bg-red-500/50 hover:text-white transition-all text-sm font-medium text-red-200 ${
                isCollapsed ? "p-3 justify-center" : "p-3 gap-3 text-left"
              }`}
            >
              <LogOut className="w-5 h-5 shrink-0" strokeWidth={1.5} />
              {!isCollapsed && (
                <span className="whitespace-nowrap transition-opacity duration-300">
                  Logout
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </div>
  );
}
