import Sidebar from "../../components/Sidebar";
import Link from "next/link";

export default function ProfilePage() {
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
            <Link
              href="/"
              className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-4 transition-colors"
            >
              <span className="mr-2">←</span> Back to Workspace
            </Link>
            <h1 className="text-3xl font-bold tracking-wide">👤 My Profile</h1>
            <p className="text-sm text-slate-300 mt-2">
              จัดการข้อมูลส่วนตัวและบัญชีผู้ใช้งาน
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="w-32 h-32 rounded-full bg-white/20 border-4 border-white/30 flex items-center justify-center text-4xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.1)] shrink-0">
              {/* ใช้ Dicebear ชั่วคราว เดี๋ยวอนาคตเรามาผูกกับ Session */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=admin&backgroundColor=transparent"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex-1 w-full space-y-4">
              <div className="bg-black/20 p-4 rounded-xl border border-white/10">
                <p className="text-sm text-slate-400 mb-1">Display Name</p>
                <p className="text-xl font-semibold">HR Admin</p>
              </div>
              <div className="bg-black/20 p-4 rounded-xl border border-white/10">
                <p className="text-sm text-slate-400 mb-1">
                  Role / Access Level
                </p>
                <p className="inline-block px-3 py-1 mt-1 rounded-full text-xs font-medium border bg-blue-500/20 text-blue-300 border-blue-500/30">
                  HR_ADMIN
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
