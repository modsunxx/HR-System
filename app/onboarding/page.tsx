"use client";

import Sidebar from "../../components/Sidebar";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";

// 1. สร้างกฎการตรวจสอบด้วย Zod
const formSchema = z.object({
  firstName: z.string().min(1, "กรุณาระบุชื่อจริง"),
  lastName: z.string().min(1, "กรุณาระบุนามสกุล"),
  department: z.string().min(1, "กรุณาเลือกแผนก"),
  startDate: z.string().min(1, "กรุณาระบุวันที่เริ่มงาน"),
});

// ดึง Type ออกมาใช้งาน
type FormData = z.infer<typeof formSchema>;

export default function OnboardingPage() {
  // 2. ตั้งค่า React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  // 3. ฟังก์ชันจัดการเมื่อกด Submit
  const onSubmit = async (data: FormData) => {
    // จำลองการส่งข้อมูล 1.5 วินาที
    const promise = new Promise((resolve) => setTimeout(resolve, 1500));

    toast.promise(promise, {
      loading: "กำลังบันทึกข้อมูลพนักงานใหม่...",
      success: `เพิ่มข้อมูลคุณ ${data.firstName} ${data.lastName} สำเร็จ!`,
      error: "เกิดข้อผิดพลาดในการบันทึก",
    });

    await promise;
    reset(); // ล้างข้อมูลในฟอร์มเมื่อเสร็จสิ้น
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
        <div className="w-full max-w-4xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
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

          {/* 4. เชื่อม onSubmit เข้ากับฟอร์ม */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  First Name
                </label>
                <input
                  {...register("firstName")}
                  type="text"
                  placeholder="ระบุชื่อจริง"
                  className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.firstName
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-white/30"
                  }`}
                />
                {errors.firstName && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.firstName.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Last Name
                </label>
                <input
                  {...register("lastName")}
                  type="text"
                  placeholder="ระบุนามสกุล"
                  className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none transition-colors ${
                    errors.lastName
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-white/30"
                  }`}
                />
                {errors.lastName && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.lastName.message}
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Department
                </label>
                <select
                  {...register("department")}
                  className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                    errors.department
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-white/30"
                  }`}
                >
                  <option value="">เลือกแผนก...</option>
                  <option value="Engineering" className="bg-slate-900">
                    Engineering
                  </option>
                  <option value="Product" className="bg-slate-900">
                    Product
                  </option>
                  <option value="Human Resources" className="bg-slate-900">
                    Human Resources
                  </option>
                  <option value="Marketing" className="bg-slate-900">
                    Marketing
                  </option>
                </select>
                {errors.department && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.department.message}
                  </span>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Start Date
                </label>
                <input
                  {...register("startDate")}
                  type="date"
                  className={`w-full bg-slate-900/50 border rounded-xl px-4 py-3 text-white focus:outline-none transition-colors ${
                    errors.startDate
                      ? "border-red-500 focus:border-red-500"
                      : "border-white/10 focus:border-white/30"
                  }`}
                />
                {errors.startDate && (
                  <span className="text-red-400 text-xs mt-1 block">
                    {errors.startDate.message}
                  </span>
                )}
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white rounded-xl font-medium transition-all shadow-lg"
              >
                {isSubmitting ? "Submitting..." : "Submit Onboarding"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
