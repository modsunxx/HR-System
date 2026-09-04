"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfileModal({
  currentName,
  currentFirstName = "", // 🌟 รับค่า Prop เพิ่ม (ใส่ default เป็นค่าว่างเผื่อไว้)
  currentLastName = "",
  currentPhone = "",
}: {
  currentName: string;
  currentFirstName?: string;
  currentLastName?: string;
  currentPhone?: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  // 🌟 รวม State ไว้ใน Object เดียวเพื่อให้จัดการง่ายขึ้น
  const [formData, setFormData] = useState({
    displayName: currentName,
    firstName: currentFirstName,
    lastName: currentLastName,
    phone: currentPhone,
  });

  const handleSave = async () => {
    // เช็คว่า Display Name ห้ามว่าง
    if (!formData.displayName.trim()) return;

    setIsSaving(true);

    // 🌟 ส่งข้อมูลทั้งหมดใน formData ไปที่ API
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setIsOpen(false);
      router.refresh(); // รีเฟรชหน้าเว็บให้ข้อมูลอัปเดต
    }
    setIsSaving(false);
  };

  return (
    <>
      {/* ปุ่มกด Edit Profile */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-sm font-medium transition-colors shadow-lg"
      >
        <span>✏️</span> Edit Profile
      </button>

      {/* หน้าต่าง Popup (Modal) กระจกฝ้า */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 w-full max-w-md shadow-2xl text-white transform transition-all">
            <h2 className="text-2xl font-bold mb-2">Edit Profile</h2>
            <p className="text-sm text-slate-400 mb-6">
              แก้ไขข้อมูลส่วนตัวที่ใช้แสดงผลในระบบ HR Workspace
            </p>

            <div className="space-y-4 mb-8">
              {/* 🌟 โซนบัญชีผู้ใช้ */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Display Name (ชื่อบัญชีผู้ใช้)
                </label>
                <input
                  type="text"
                  value={formData.displayName}
                  onChange={(e) =>
                    setFormData({ ...formData, displayName: e.target.value })
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="กรอกชื่อที่ใช้แสดงผล..."
                />
              </div>

              {/* 🌟 โซนข้อมูลพนักงานแบบ Grid 2 คอลัมน์ */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    First Name (ชื่อจริง)
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="ชื่อจริง..."
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Last Name (นามสกุล)
                  </label>
                  <input
                    type="text"
                    value={formData.lastName}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                    className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                    placeholder="นามสกุล..."
                  />
                </div>
              </div>

              {/* 🌟 โซนเบอร์ติดต่อ */}
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Phone Number (เบอร์ติดต่อ)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="08X-XXX-XXXX"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-sm font-medium transition-colors"
                disabled={isSaving}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                disabled={isSaving}
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
