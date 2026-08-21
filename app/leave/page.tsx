"use client";

import { useState } from "react";
import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { toast } from "sonner";

export default function LeavePage() {
  // 1. State ควบคุมการเปิด/ปิด Modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock ข้อมูลตารางการลา
  const leaveRequests: {
    id: string;
    type: string;
    dates: string;
    reason: string;
    status: string;
  }[] = [];

  // 2. ฟังก์ชันจัดการตอนกดปุ่ม "ยืนยันการลา" ในฟอร์ม
  const handleSubmitLeave = (e: React.FormEvent) => {
    e.preventDefault(); // ป้องกันหน้าเว็บรีเฟรช
    setIsModalOpen(false); // ปิด Modal

    // จำลองการส่งข้อมูล (เดี๋ยวเราค่อยมาเชื่อม Server Actions + Prisma ทีหลัง)
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));
    toast.promise(promise, {
      loading: "กำลังส่งคำขอลางาน...",
      success: "ส่งคำขอสำเร็จ! HR จะทำการตรวจสอบเร็วๆ นี้",
      error: "เกิดข้อผิดพลาด กรุณาลองใหม่",
    });
  };

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
        <div className="w-full max-w-5xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/20 pb-6 gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-2 transition-colors"
              >
                <span className="mr-2">←</span> Back to Workspace
              </Link>
              <h1 className="text-3xl font-bold tracking-wide">
                Leave Management
              </h1>
              <p className="text-sm text-slate-300 mt-2">
                ระบบยื่นคำขอลาหยุดและตรวจสอบสถานะการอนุมัติ
              </p>
            </div>

            <button
              onClick={() => setIsModalOpen(true)} // กดแล้วเปิด Modal
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-blue-500/25"
            >
              + Request Leave
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <h3 className="text-slate-300 text-sm mb-1">
                Annual Leave (Remaining)
              </h3>
              <p className="text-3xl font-bold">
                0{" "}
                <span className="text-sm font-normal text-slate-400">Days</span>
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <h3 className="text-slate-300 text-sm mb-1">Sick Leave (Used)</h3>
              <p className="text-3xl font-bold">
                0{" "}
                <span className="text-sm font-normal text-slate-400">Days</span>
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <h3 className="text-slate-300 text-sm mb-1">
                Personal Leave (Used)
              </h3>
              <p className="text-3xl font-bold">
                0{" "}
                <span className="text-sm font-normal text-slate-400">Days</span>
              </p>
            </div>
          </div>

          {/* ตารางประวัติการลา */}
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-lg">
            <div className="p-6 bg-white/5">
              <h2 className="text-xl font-semibold">My Leave History</h2>
            </div>

            {leaveRequests.length > 0 ? (
              <div className="overflow-x-auto border-t border-white/10">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-white/5 text-slate-300 text-sm">
                      <th className="p-4 font-medium">Leave Type</th>
                      <th className="p-4 font-medium">Dates</th>
                      <th className="p-4 font-medium">Reason</th>
                      <th className="p-4 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {leaveRequests.map((leave) => (
                      <tr
                        key={leave.id}
                        className="border-b border-white/5 hover:bg-white/5 transition-colors"
                      >
                        <td className="p-4 font-semibold">{leave.type}</td>
                        <td className="p-4 text-slate-300">{leave.dates}</td>
                        <td className="p-4 text-slate-300">{leave.reason}</td>
                        <td className="p-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium border bg-green-500/20 text-green-300 border-green-500/30">
                            {leave.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-16 flex flex-col items-center justify-center text-center border-t border-white/10 bg-white/5">
                <div className="text-6xl mb-4 opacity-70">📭</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  No Leave Requests Found
                </h3>
                <p className="text-slate-400 text-sm mb-6 max-w-sm">
                  คุณยังไม่มีประวัติการยื่นคำขอลาหยุดในระบบ
                  หากต้องการลางานสามารถสร้างคำขอใหม่ได้เลย
                </p>
                <button
                  onClick={() => setIsModalOpen(true)} // กดแล้วเปิด Modal
                  className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-sm font-medium transition-colors"
                >
                  + Create New Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MODAL SECTION ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* พื้นหลังทึบ (กดเพื่อปิด Modal ได้) */}
          <div
            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
            onClick={() => setIsModalOpen(false)}
          ></div>

          {/* กล่อง Modal */}
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white animate-in fade-in zoom-in-95 duration-200">
            {/* Header ของ Modal */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
              <h2 className="text-xl font-semibold">
                ยื่นคำขอลาหยุด (Request Leave)
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-white transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            {/* ฟอร์มกรอกข้อมูล */}
            <form
              onSubmit={handleSubmitLeave}
              className="p-6 space-y-5 bg-black/20"
            >
              <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                  ประเภทการลา
                </label>
                <select
                  required
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-white appearance-none cursor-pointer"
                >
                  <option value="annual">🏖️ ลาพักร้อน (Annual Leave)</option>
                  <option value="sick">🤒 ลาป่วย (Sick Leave)</option>
                  <option value="personal">📝 ลากิจ (Personal Leave)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    วันเริ่มต้น
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-white scheme-dark"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    วันสิ้นสุด
                  </label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-white scheme-dark"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1 text-slate-300">
                  เหตุผลการลา
                </label>
                <textarea
                  required
                  rows={3}
                  className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-blue-500 transition-colors text-white resize-none placeholder-slate-500"
                  placeholder="ระบุเหตุผลที่ต้องการลา..."
                ></textarea>
              </div>

              {/* ปุ่ม Action ใน Modal */}
              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl font-medium transition-colors"
                >
                  ยกเลิก
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-medium transition-colors shadow-lg"
                >
                  ยืนยันการลา
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
