"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function EditProfileModal({
  currentName,
}: {
  currentName: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newName, setNewName] = useState(currentName);
  const [isSaving, setIsSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!newName.trim() || newName === currentName) return setIsOpen(false);

    setIsSaving(true);
    // ส่งข้อมูลไปที่ API ที่เราเพิ่งสร้าง
    const res = await fetch("/api/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ newName, oldName: currentName }),
    });

    if (res.ok) {
      setIsOpen(false);
      router.refresh(); // สั่งรีเฟรชหน้าเว็บเบาๆ เพื่อให้ชื่อใหม่แสดงผลทันที
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
              แก้ไขชื่อที่ใช้แสดงผลในระบบ HR Workspace
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="กรอกชื่อใหม่ของคุณ..."
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
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
