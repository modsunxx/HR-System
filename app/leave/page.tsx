import Sidebar from "../../components/Sidebar";
import Link from "next/link";

export default function LeavePage() {
  // Mock Data รายการขอลางาน
  const leaveRequests = [
    {
      id: 1,
      type: "Sick Leave",
      dates: "19 Aug 2026 - 20 Aug 2026",
      reason: "ไข้หวัดใหญ่ พักรักษาตัว",
      status: "Approved",
    },
    {
      id: 2,
      type: "Annual Leave",
      dates: "01 Sep 2026 - 03 Sep 2026",
      reason: "ท่องเที่ยวต่างจังหวัด",
      status: "Pending",
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
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md z-0"></div>

      <Sidebar />

      <div className="relative z-10 flex-1 p-4 sm:p-8 flex flex-col items-center justify-start h-screen overflow-y-auto">
        <div className="w-full max-w-5xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          {/* Header */}
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
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-blue-500/25">
              + Request Leave
            </button>
          </div>

          {/* Leave Summary Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <h3 className="text-slate-300 text-sm mb-1">
                Annual Leave (Remaining)
              </h3>
              <p className="text-3xl font-bold">
                10{" "}
                <span className="text-sm font-normal text-slate-400">Days</span>
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <h3 className="text-slate-300 text-sm mb-1">Sick Leave (Used)</h3>
              <p className="text-3xl font-bold">
                2{" "}
                <span className="text-sm font-normal text-slate-400">Days</span>
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 shadow-lg">
              <h3 className="text-slate-300 text-sm mb-1">
                Personal Leave (Used)
              </h3>
              <p className="text-3xl font-bold">
                1{" "}
                <span className="text-sm font-normal text-slate-400">Days</span>
              </p>
            </div>
          </div>

          {/* History Table */}
          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden shadow-lg">
            <div className="p-6 border-b border-white/10 bg-white/5">
              <h2 className="text-xl font-semibold">My Leave History</h2>
            </div>

            <div className="overflow-x-auto">
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
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${
                            leave.status === "Approved"
                              ? "bg-green-500/20 text-green-300 border-green-500/30"
                              : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
