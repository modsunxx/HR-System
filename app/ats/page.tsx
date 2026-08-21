import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { prisma } from "../../lib/prisma";

// ลบฟังก์ชันที่ซ้อนกันออก เหลือแค่ async function ตัวเดียว
export default async function ATSPage() {
  // ดึงข้อมูลจากฐานข้อมูลจริง
  const jobs = await prisma.jobPosting.findMany();

  return (
    <main
      className="min-h-screen flex font-sans bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md z-0"></div>

      {/* เรียกใช้ Sidebar ตัวเดิม */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 p-4 sm:p-8 flex flex-col items-center justify-start h-screen overflow-y-auto">
        <div className="w-full max-w-5xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 border-b border-white/20 pb-6 gap-4">
            <div>
              <Link
                href="/"
                className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-2 transition-colors"
              >
                <span className="mr-2">←</span> Back to Workspace
              </Link>
              <h1 className="text-3xl font-bold tracking-wide">
                Applicant Tracking
              </h1>
              <p className="text-sm text-slate-300 mt-2">
                Manage job postings and review incoming applications.
              </p>
            </div>
            <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-blue-500/25">
              + Create New Job
            </button>
          </div>

          {/* Job List Container */}
          <div className="flex flex-col gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
              >
                {/* Job Info */}
                <div className="flex-1 mb-4 sm:mb-0">
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="text-xl font-semibold">{job.title}</h2>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        job.status === "Active"
                          ? "bg-green-500/20 text-green-300 border-green-500/30"
                          : "bg-slate-500/20 text-slate-300 border-slate-500/30"
                      }`}
                    >
                      {job.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1">
                      🏢 {job.department}
                    </span>
                    <span className="flex items-center gap-1">
                      ⏱️ {job.type}
                    </span>
                    <span className="flex items-center gap-1">
                      👥 {job.applicants} Applicants
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors border border-white/10">
                    Edit
                  </button>
                  {/* ปุ่ม View Candidates เตรียมไว้สำหรับไปหน้าตารางผู้สมัคร */}
                  <button className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-white text-slate-900 hover:bg-slate-200 text-sm font-medium transition-colors">
                    View Candidates
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
