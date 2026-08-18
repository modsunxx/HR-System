import Sidebar from "../../components/Sidebar";
import Link from "next/link";

export default function OnboardingPage() {
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
        <div className="w-full max-w-4xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          {/* Header */}
          <div className="mb-8 border-b border-white/20 pb-6">
            <Link
              href="/"
              className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-2 transition-colors"
            >
              <span className="mr-2">←</span> Back to Workspace
            </Link>
            <h1 className="text-3xl font-bold tracking-wide">
              Employee Onboarding
            </h1>
            <p className="text-sm text-slate-300 mt-2">
              กรอกข้อมูลส่วนตัวและอัปโหลดเอกสารยืนยันตัวตนสำหรับพนักงานใหม่
            </p>
          </div>

          {/* Form */}
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="ระบุชื่อจริง"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="ระบุนามสกุล"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Department
                </label>
                <select className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30">
                  <option className="bg-slate-900">Engineering</option>
                  <option className="bg-slate-900">Product</option>
                  <option className="bg-slate-900">Human Resources</option>
                  <option className="bg-slate-900">Marketing</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Start Date
                </label>
                <input
                  type="date"
                  className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>

            {/* Upload Box */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Upload Resume / ID Card / Documents
              </label>
              <div className="border-2 border-dashed border-white/20 rounded-2xl p-8 text-center bg-white/5 hover:bg-white/10 transition-colors cursor-pointer">
                <div className="text-4xl mb-2">📄</div>
                <p className="text-sm font-medium text-white">
                  ลากไฟล์มาวางที่นี่ หรือ{" "}
                  <span className="text-blue-400 underline">
                    คลิกเพื่อเลือกไฟล์
                  </span>
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  PDF, PNG, JPG (ขนาดไม่เกิน 10MB)
                </p>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-blue-500/25"
              >
                Submit Onboarding
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
