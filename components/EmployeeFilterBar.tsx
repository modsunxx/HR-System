"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

// 🌟 1. สร้างพิมพ์เขียวบอก TypeScript ว่า Department มี id และ name
interface Department {
  id: number;
  name: string;
}

export default function EmployeeFilterBar({
  departments,
}: {
  departments: Department[]; // 🌟 2. เปลี่ยนจาก any[] เป็น Department[]
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // ... (โค้ดด้านล่างคงเดิมไว้ได้เลยครับ)
  // ดึงค่าการค้นหาเดิมจาก URL (ถ้ามี)
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [dept, setDept] = useState(searchParams.get("dept") || "");

  const handleFilter = () => {
    // เอาค่าที่พิมพ์ไปต่อท้าย URL (เช่น /employees?q=สมชาย&dept=1)
    const params = new URLSearchParams();
    if (search.trim()) params.set("q", search.trim());
    if (dept) params.set("dept", dept);

    router.push(`/employees?${params.toString()}`);
  };

  return (
    <div className="p-4 sm:p-6 border-b border-white/10 flex flex-col sm:flex-row justify-between items-center bg-white/5 gap-4">
      <div className="relative w-full sm:w-auto">
        <span className="absolute left-3 top-2.5 text-slate-400">🔍</span>
        <input
          type="text"
          placeholder="ค้นหาชื่อพนักงาน..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleFilter()} // กด Enter ค้นหาได้เลย
          className="bg-slate-900/50 border border-white/10 text-sm rounded-lg pl-10 pr-4 py-2 w-full sm:w-64 focus:outline-none focus:border-blue-500 text-white placeholder-slate-400 transition-all focus:sm:w-80"
        />
      </div>

      <div className="flex w-full sm:w-auto gap-3">
        <select
          value={dept}
          onChange={(e) => setDept(e.target.value)}
          className="bg-slate-900/50 border border-white/10 text-sm rounded-lg px-4 py-2 text-white focus:outline-none focus:border-blue-500 w-full sm:w-auto"
        >
          <option value="">-- ทุกแผนก --</option>
          {departments.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleFilter}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-500 border border-blue-500/30 text-white rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap shadow-lg"
        >
          <span>⚡</span> Filter
        </button>
      </div>
    </div>
  );
}
