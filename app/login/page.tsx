"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // สั่ง NextAuth ให้ทำการ Login
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (res?.error) {
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!");
    } else {
      router.push("/"); // ล็อกอินสำเร็จให้เด้งกลับไปหน้าแรก
      router.refresh();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 text-white">
      <div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-2xl shadow-xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-emerald-400">
          HR System Login
        </h1>

        {error && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-3 rounded-lg mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-400">
              Username
            </label>
            <input
              type="text"
              required
              className="w-full px-4 py-2 bg-black/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-emerald-400 transition"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-400">
              Password
            </label>
            <input
              type="password"
              required
              className="w-full px-4 py-2 bg-black/50 border border-zinc-700 rounded-lg focus:outline-none focus:border-emerald-400 transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 font-semibold rounded-lg transition duration-200 mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
