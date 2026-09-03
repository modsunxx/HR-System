"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push("/login");
      } else {
        const data = await res.json();
        setError(data.message || "เกิดข้อผิดพลาดในการสมัครสมาชิก");
      }
    } catch {
      setError("ไม่สามารถติดต่อเซิร์ฟเวอร์ได้");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-zinc-800 to-black text-white relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px]"></div>

      <div className="relative w-full max-w-sm p-8 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)]">
        {/* ปุ่ม Traffic Lights สไตล์ macOS */}
        <div className="flex gap-2 mb-8">
          <div className="w-3 h-3 rounded-full bg-[#FF5F56] border border-[#E0443E]"></div>
          <div className="w-3 h-3 rounded-full bg-[#FFBD2E] border border-[#DEA123]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27C93F] border border-[#1AAB29]"></div>
        </div>

        <h1 className="text-2xl font-semibold mb-2 tracking-wide">
          Create Account
        </h1>
        {/* 🌟 แก้ไขคำโปรยให้ถูกต้อง */}
        <p className="text-sm text-zinc-400 mb-8">
          Register a new employee account
        </p>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 text-red-300 p-3 rounded-xl mb-6 text-sm text-center backdrop-blur-md">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 🌟 1. Username สำหรับ Login (เอาขึ้นก่อน) */}
          <div>
            <input
              type="text"
              required
              placeholder="Username (สำหรับเข้าสู่ระบบ)"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-black/40 transition-all placeholder:text-zinc-500"
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
          </div>

          {/* 🌟 2. Password */}
          <div>
            <input
              type="password"
              required
              placeholder="Password (รหัสผ่าน)"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-black/40 transition-all placeholder:text-zinc-500"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* 🌟 3. Display Name เอาไว้ท้ายสุด พร้อมคำอธิบายเล็กๆ */}
          <div>
            <input
              type="text"
              required
              placeholder="Display Name (ชื่อที่แสดงในระบบ)"
              className="w-full px-4 py-3 bg-black/20 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:bg-black/40 transition-all placeholder:text-zinc-500"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <p className="text-[11px] text-zinc-500 mt-1.5 ml-2">
              * ชื่อนี้จะไปปรากฏบนหน้าโปรไฟล์และเมนูต่างๆ (แก้ไขได้ทีหลัง)
            </p>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-medium rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-50 mt-6 cursor-pointer"
          >
            {isLoading ? "Creating..." : "Register"}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            href="/login"
            className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
