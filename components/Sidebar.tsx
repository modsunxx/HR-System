"use client";

import { useState } from "react";
import UserProfile from "./UserProfile";
// 1. นำเข้าเครื่องมือจาก NextAuth
import { signOut, useSession } from "next-auth/react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);

  // 2. ล้วงข้อมูลผู้ใช้จาก Session ของ NextAuth ตรงๆ เลย!
  const { data: session, status } = useSession();

  // ดึงค่ามาเตรียมไว้ (จำได้ไหมครับว่าเราแอบฝาก Role ไว้ในช่อง email)
  const userName = session?.user?.name || "Guest";
  const userRole = session?.user?.email || "HR Admin";
  const userAvatarName = session?.user?.name || "guest";
  const isLoading = status === "loading";

  // 3. ฟังก์ชัน Logout ฉบับ NextAuth (บรรทัดเดียวจบ!)
  const handleLogout = async () => {
    await signOut({ callbackUrl: "/login" });
  };

  const sidebarWidth = isCollapsed ? "w-24" : isMaximized ? "w-80" : "w-64";

  return (
    <div className="relative flex items-start h-full z-20">
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
        className={`rounded-3xl bg-white/10 backdrop-blur-2xl shadow-2xl flex flex-col text-white transition-all duration-500 ease-in-out overflow-hidden ${
          isOpen
            ? `${sidebarWidth} opacity-100 m-4 sm:m-8 mr-0 border border-white/20 ${isCollapsed ? "p-4" : "p-6"}`
            : "w-0 opacity-0 m-0 p-0 border-0"
        }`}
      >
        <div className="flex flex-col h-full min-w-20">
          {/* macOS Style Header */}
          <div
            className={`flex space-x-2 mb-10 transition-all duration-500 ${isCollapsed ? "justify-center" : ""}`}
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

          {/* User Profile Section โยนข้อมูลจาก NextAuth เข้าไปเลย */}
          <div
            className={`transition-all duration-300 ${isCollapsed ? "hidden" : "block"}`}
          >
            <UserProfile
              name={isLoading ? "Loading..." : userName}
              role={isLoading ? "..." : userRole}
              username={userAvatarName}
            />
          </div>

          {/* รูปโปรไฟล์จิ๋ว (แสดงตอนกดย่อ) */}
          <div
            className={`flex justify-center mb-8 pb-8 border-b border-white/20 transition-all duration-300 ${isCollapsed ? "block" : "hidden"}`}
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

          {/* Sidebar Menu */}
          <nav className="flex flex-col gap-3 flex-1">
            <button
              className={`flex items-center w-full rounded-xl bg-white/20 hover:bg-white/30 border border-white/10 transition-all text-sm font-medium shadow-sm ${isCollapsed ? "p-3 justify-center" : "p-3 gap-3 text-left"}`}
            >
              <span className="text-xl shrink-0">⚙️</span>
              {!isCollapsed && (
                <span className="whitespace-nowrap transition-opacity duration-300">
                  Settings
                </span>
              )}
            </button>
            <button
              className={`flex items-center w-full rounded-xl hover:bg-white/10 transition-all text-sm font-medium ${isCollapsed ? "p-3 justify-center" : "p-3 gap-3 text-left"}`}
            >
              <span className="text-xl shrink-0">👤</span>
              {!isCollapsed && (
                <span className="whitespace-nowrap transition-opacity duration-300">
                  My Profile
                </span>
              )}
            </button>
            <button
              className={`flex items-center w-full rounded-xl hover:bg-white/10 transition-all text-sm font-medium ${isCollapsed ? "p-3 justify-center" : "p-3 gap-3 text-left"}`}
            >
              <span className="text-xl shrink-0">🔔</span>
              {!isCollapsed && (
                <span className="whitespace-nowrap transition-opacity duration-300">
                  Notifications
                </span>
              )}
            </button>
          </nav>

          {/* Logout Button เรียกฟังก์ชัน handleLogout */}
          <button
            onClick={handleLogout}
            className={`flex items-center w-full rounded-xl hover:bg-red-500/50 hover:text-white transition-all text-sm font-medium text-red-200 mt-auto ${isCollapsed ? "p-3 justify-center" : "p-3 gap-3 text-left"}`}
          >
            <span className="text-xl shrink-0">🚪</span>
            {!isCollapsed && (
              <span className="whitespace-nowrap transition-opacity duration-300">
                Logout
              </span>
            )}
          </button>
        </div>
      </aside>
    </div>
  );
}
