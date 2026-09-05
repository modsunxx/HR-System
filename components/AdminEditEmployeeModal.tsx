"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// 🌟 พิมพ์เขียวข้อมูล
interface Department {
  id: number;
  name: string;
}

interface UserData {
  id: number;
  name: string | null;
  role: string;
  employee?: {
    position?: string | null;
    salary?: number | null;
    departmentId?: number | null;
  } | null;
}

// 🌟 1. สร้างชุดข้อมูล "ตำแหน่งงาน" แยกตาม "แผนก" (เพิ่ม/ลด ได้ตามใจชอบเลยครับ)
const positionMapping: Record<string, string[]> = {
  IT: [
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "System Analyst",
    "IT Support",
    "QA Engineer",
    "UX/UI Designer",
  ],
  HR: ["HR Manager", "Recruiter", "Payroll Specialist", "HR Generalist"],
  Marketing: [
    "Marketing Manager",
    "Content Creator",
    "SEO Specialist",
    "Graphic Designer",
  ],
  Sales: ["Sales Manager", "Account Executive", "Sales Representative"],
  Accounting: ["Accountant", "Financial Analyst", "Auditor"],
  // ค่าเริ่มต้นถ้าหาแผนกไม่เจอ
  General: [
    "พนักงานใหม่",
    "พนักงานทั่วไป",
    "หัวหน้างาน",
    "ผู้จัดการ",
    "ผู้อำนวยการ",
  ],
};

export default function AdminEditEmployeeModal({
  user,
  departments,
}: {
  user: UserData;
  departments: Department[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState({
    role: user.role || "EMPLOYEE",
    position: user.employee?.position || "",
    salary: user.employee?.salary || "",
    departmentId: user.employee?.departmentId || "",
  });

  const handleSave = async () => {
    setIsSaving(true);
    const res = await fetch(`/api/admin/employees/${user.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsOpen(false);
      router.refresh();
    } else {
      alert("เกิดข้อผิดพลาดในการอัปเดตข้อมูล");
    }
    setIsSaving(false);
  };

  // 🌟 2. ฟังก์ชันคำนวณหาตำแหน่งที่เหมาะสมกับแผนกที่เลือก
  const getAvailablePositions = () => {
    if (!formData.departmentId) return positionMapping["General"];

    // หาชื่อแผนกที่กำลังเลือกอยู่
    const selectedDept = departments.find(
      (d) => d.id === formData.departmentId,
    );
    const deptName = selectedDept?.name.toLowerCase() || "";

    // จัดกลุ่มตามคำค้นหา (ถ้าชื่อแผนกใน Database มีคำพวกนี้ จะดึงลิสต์นั้นมาโชว์)
    if (
      deptName.includes("it") ||
      deptName.includes("tech") ||
      deptName.includes("dev")
    )
      return positionMapping["IT"];
    if (
      deptName.includes("hr") ||
      deptName.includes("human") ||
      deptName.includes("บุคคล")
    )
      return positionMapping["HR"];
    if (deptName.includes("market") || deptName.includes("การตลาด"))
      return positionMapping["Marketing"];
    if (deptName.includes("sale") || deptName.includes("ขาย"))
      return positionMapping["Sales"];
    if (
      deptName.includes("account") ||
      deptName.includes("finance") ||
      deptName.includes("บัญชี")
    )
      return positionMapping["Accounting"];

    return positionMapping["General"];
  };

  // ดึงลิสต์ตำแหน่งมาเตรียมไว้
  const availablePositions = getAvailablePositions();

  // (Trick เล็กๆ: เผื่อตำแหน่งเดิมในระบบมันไม่มีในลิสต์ เราจะยัดมันกลับเข้าไปให้โชว์ด้วย)
  const optionsToShow = [...availablePositions];
  if (formData.position && !optionsToShow.includes(formData.position)) {
    optionsToShow.unshift(formData.position);
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-4 py-1.5 bg-blue-500/20 text-blue-300 hover:bg-blue-500/40 rounded-lg font-medium text-sm transition-colors border border-blue-500/30"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 text-left">
          <div className="bg-slate-900 border border-white/20 p-6 sm:p-8 rounded-3xl w-full max-w-md shadow-2xl text-white">
            <h2 className="text-2xl font-bold mb-2">Edit Employee Data</h2>
            <p className="text-sm text-slate-400 mb-6">
              จัดการข้อมูลของ:{" "}
              <span className="text-white font-semibold">{user.name}</span>
            </p>

            <div className="space-y-4 mb-8">
              {/* Role */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Role (สิทธิ์การใช้งาน)
                </label>
                <select
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="EMPLOYEE">EMPLOYEE (พนักงานทั่วไป)</option>
                  <option value="HR_ADMIN">HR_ADMIN (ฝ่ายบุคคล)</option>
                </select>
              </div>

              {/* Department */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Department (แผนก)
                </label>
                <select
                  value={formData.departmentId}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      departmentId: Number(e.target.value),
                      position: "", // 🌟 รีเซ็ตตำแหน่งเป็นค่าว่างทุกครั้งที่เปลี่ยนแผนก
                    });
                  }}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">-- ยังไม่สังกัดแผนก --</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* 🌟 Position (เปลี่ยนเป็น Select Dropdown แทน Input) */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Position (ตำแหน่ง)
                </label>
                <select
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  disabled={!formData.departmentId} // ถ้ายังไม่เลือกแผนก จะกดเลือกตำแหน่งไม่ได้
                  className={`w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500 ${!formData.departmentId ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <option value="">-- กรุณาเลือกตำแหน่ง --</option>
                  {optionsToShow.map((pos) => (
                    <option key={pos} value={pos}>
                      {pos}
                    </option>
                  ))}
                </select>
              </div>

              {/* Salary */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Salary (เงินเดือน)
                </label>
                <input
                  type="number"
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      salary: e.target.value ? Number(e.target.value) : "",
                    })
                  }
                  placeholder="ระบุตัวเลขเงินเดือน"
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-white/10 pt-4">
              <button
                onClick={() => setIsOpen(false)}
                disabled={isSaving}
                className="px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-sm font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-medium transition-colors"
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
