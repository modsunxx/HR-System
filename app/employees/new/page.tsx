import Sidebar from "../../../components/Sidebar";
import Link from "next/link";
import { prisma } from "../../../lib/prisma";
import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";

export default async function AddEmployeePage() {
  // 🌟 1. ป้องกันความปลอดภัย: ให้เฉพาะ HR_ADMIN เข้าหน้านี้ได้
  const session = await getServerSession(authOptions);
  const userRole = (session?.user as { role?: string })?.role;
  if (!session || userRole !== "HR_ADMIN") {
    redirect("/");
  }

  // 🌟 2. Server Action สำหรับจัดการข้อมูลฟอร์ม
  async function handleSubmit(formData: FormData) {
    "use server";

    // ข้อมูลบัญชีเข้าสู่ระบบ (User)
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string; // Display Name
    const role = formData.get("role") as string;

    // ข้อมูลส่วนตัวพนักงาน (Employee)
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const firstNameEn = formData.get("firstNameEn") as string;
    const lastNameEn = formData.get("lastNameEn") as string;
    const email = formData.get("email") as string;
    const position = formData.get("position") as string;

    // เข้ารหัสผ่านก่อนบันทึก
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกลงตาราง User และสร้าง Employee พ่วงไปด้วยเลย
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        name,
        role,
        employee: {
          create: {
            firstName,
            lastName,
            firstNameEn,
            lastNameEn,
            email,
            position,
            phone: "-", // ใส่ค่าเริ่มต้นไว้ก่อน
          },
        },
      },
    });

    // บันทึกเสร็จให้เด้งกลับหน้า Directory
    redirect("/employees");
  }

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
        <div className="w-full max-w-3xl mt-4 p-8 sm:p-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl text-white">
          <div className="mb-8 border-b border-white/20 pb-6">
            <Link
              href="/employees"
              className="inline-flex items-center text-sm text-slate-300 hover:text-white mb-3 transition-colors"
            >
              <span className="mr-2">←</span> Back to Directory
            </Link>
            <h1 className="text-3xl font-bold tracking-wide">
              ➕ เพิ่มพนักงานใหม่
            </h1>
            <p className="text-sm text-slate-300 mt-2">
              สร้างบัญชีผู้ใช้และกรอกข้อมูลพื้นฐานของพนักงาน
            </p>
          </div>

          <form action={handleSubmit} className="space-y-8">
            {/* 🌟 ส่วนที่ 1: ข้อมูลสำหรับ Login */}
            <div className="p-6 bg-black/20 rounded-2xl border border-white/10 space-y-5">
              <h2 className="text-lg font-semibold text-emerald-400 mb-2 border-b border-white/10 pb-2">
                1. ข้อมูลบัญชีผู้ใช้งาน (Account)
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    Username
                  </label>
                  <input
                    name="username"
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 text-white"
                    placeholder="เช่น somchai.j"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    Password
                  </label>
                  <input
                    name="password"
                    required
                    type="password"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 text-white"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    ชื่อที่แสดงในระบบ (Display Name)
                  </label>
                  <input
                    name="name"
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 text-white"
                    placeholder="เช่น Somchai Jaidee"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    สิทธิ์การใช้งาน (Role)
                  </label>
                  <select
                    name="role"
                    required
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 text-white appearance-none"
                  >
                    <option value="EMPLOYEE" className="bg-slate-800">
                      EMPLOYEE (พนักงานทั่วไป)
                    </option>
                    <option value="HR_ADMIN" className="bg-slate-800">
                      HR_ADMIN (ฝ่ายบุคคล)
                    </option>
                  </select>
                </div>
              </div>
            </div>

            {/* 🌟 ส่วนที่ 2: ข้อมูลส่วนตัว (คง UI เดิมของพี่ซันนี่ไว้) */}
            <div className="space-y-5">
              <h2 className="text-lg font-semibold text-emerald-400 mb-2 border-b border-white/10 pb-2">
                2. ข้อมูลส่วนตัวพนักงาน (Personal Info)
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    ชื่อจริง (TH)
                  </label>
                  <input
                    name="firstName"
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 text-white"
                    placeholder="เช่น สมชาย"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    นามสกุล (TH)
                  </label>
                  <input
                    name="lastName"
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 text-white"
                    placeholder="เช่น ใจดี"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    First Name (EN)
                  </label>
                  <input
                    name="firstNameEn"
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 text-white"
                    placeholder="e.g. Somchai"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    Last Name (EN)
                  </label>
                  <input
                    name="lastNameEn"
                    required
                    type="text"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 text-white"
                    placeholder="e.g. Jaidee"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    อีเมล
                  </label>
                  <input
                    name="email"
                    required
                    type="email"
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 text-white"
                    placeholder="somchai@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 text-slate-300">
                    ตำแหน่งงานเริ่มต้น
                  </label>
                  <select
                    name="position"
                    required
                    defaultValue=""
                    className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl focus:outline-none focus:border-emerald-400 text-white appearance-none"
                  >
                    <option value="" disabled className="text-slate-500">
                      -- เลือกระบุตำแหน่งงาน --
                    </option>
                    <option value="HR Admin" className="bg-slate-800">
                      HR Admin
                    </option>
                    <option value="Software Engineer" className="bg-slate-800">
                      Software Engineer
                    </option>
                    <option value="Senior Developer" className="bg-slate-800">
                      Senior Developer
                    </option>
                    <option value="Product Manager" className="bg-slate-800">
                      Product Manager
                    </option>
                    <option value="Graphic Designer" className="bg-slate-800">
                      Graphic Designer
                    </option>
                    <option value="QA Tester" className="bg-slate-800">
                      QA Tester
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-xl transition duration-300 shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:shadow-[0_0_25px_rgba(16,185,129,0.5)] mt-4 flex justify-center items-center gap-2"
            >
              <span>💾</span> สร้างบัญชีและบันทึกข้อมูลพนักงาน
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
