import Sidebar from "../../components/Sidebar";
import Link from "next/link";

export default function SettingsPage() {
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
        <div className="w-full max-w-4xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          <div className="mb-8 border-b border-white/20 pb-6">
            {/* ปุ่มย้อนกลับ */}
            <Link
              href="/"
              className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-4 transition-colors"
            >
              <span className="mr-2">←</span> Back to Workspace
            </Link>
            <h1 className="text-3xl font-bold tracking-wide">⚙️ Settings</h1>
            <p className="text-sm text-slate-300 mt-2">
              ตั้งค่าระบบและปรับแต่งการแสดงผล
            </p>
          </div>

          <div className="space-y-6">
            {/* โซนที่ 1: หน้าตาแอป */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4">Appearance</h2>
              <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5">
                <div>
                  <p className="font-medium text-slate-200">Dark Mode</p>
                  <p className="text-sm text-slate-400">
                    ใช้ธีมสีเข้มเป็นค่าเริ่มต้น
                  </p>
                </div>
                <div className="w-12 h-6 bg-emerald-500 rounded-full flex items-center p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full translate-x-6 shadow-sm"></div>
                </div>
              </div>
            </div>

            {/* โซนที่ 2: ระบบ */}
            <div className="bg-white/5 border border-white/10 p-6 rounded-2xl">
              <h2 className="text-xl font-semibold mb-4">System Preferences</h2>
              <div className="flex justify-between items-center bg-black/20 p-4 rounded-xl border border-white/5">
                <div>
                  <p className="font-medium text-slate-200">
                    Discord Notifications
                  </p>
                  <p className="text-sm text-slate-400">
                    ส่งแจ้งเตือนการลางานเข้า Discord Server
                  </p>
                </div>
                <div className="w-12 h-6 bg-slate-600 rounded-full flex items-center p-1 cursor-pointer">
                  <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
