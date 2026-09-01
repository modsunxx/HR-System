import Sidebar from "../../components/Sidebar";
import Link from "next/link";

export default function NotificationsPage() {
  // Mock Data สำหรับการแจ้งเตือน
  const notis = [
    {
      id: 1,
      title: "มีคำขออนุมัติการลางานใหม่",
      time: "10 นาทีที่แล้ว",
      type: "leave",
      read: false,
    },
    {
      id: 2,
      title: "รายงานพนักงานมาสายประจำวัน",
      time: "2 ชั่วโมงที่แล้ว",
      type: "attendance",
      read: true,
    },
    {
      id: 3,
      title: "อัปเดตระบบ HR Workspace สำเร็จ",
      time: "1 วันที่แล้ว",
      type: "system",
      read: true,
    },
  ];

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
          <div className="mb-8 border-b border-white/20 pb-6 flex justify-between items-end">
            <div>
              {/* ปุ่มย้อนกลับ */}
              <Link
                href="/"
                className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-4 transition-colors"
              >
                <span className="mr-2">←</span> Back to Workspace
              </Link>
              <h1 className="text-3xl font-bold tracking-wide">
                🔔 Notifications
              </h1>
              <p className="text-sm text-slate-300 mt-2">
                การแจ้งเตือนและประวัติการทำรายการล่าสุด
              </p>
            </div>
            <button className="text-sm text-emerald-400 hover:text-emerald-300 transition-colors">
              Mark all as read
            </button>
          </div>

          <div className="space-y-4">
            {notis.map((noti) => (
              <div
                key={noti.id}
                className={`flex items-start gap-4 p-5 rounded-2xl border transition-all hover:bg-white/10 ${
                  noti.read
                    ? "bg-white/5 border-white/5"
                    : "bg-emerald-500/10 border-emerald-500/30"
                }`}
              >
                <div className="text-2xl mt-1 shrink-0">
                  {noti.type === "leave"
                    ? "🏖️"
                    : noti.type === "attendance"
                      ? "⏰"
                      : "🤖"}
                </div>
                <div className="flex-1">
                  <h3
                    className={`text-lg ${noti.read ? "text-slate-200" : "text-emerald-300 font-semibold"}`}
                  >
                    {noti.title}
                  </h3>
                  <p className="text-sm text-slate-400 mt-1">{noti.time}</p>
                </div>
                {!noti.read && (
                  <div className="w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)] mt-2 shrink-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
