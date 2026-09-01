"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function ChangePasswordModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSave = async () => {
    setErrorMsg("");
    setSuccessMsg("");

    // เช็คว่ากรอกครบไหม และรหัสใหม่ตรงกันไหม
    if (!oldPassword || !newPassword || !confirmPassword) {
      return setErrorMsg("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
    if (newPassword !== confirmPassword) {
      return setErrorMsg("รหัสผ่านใหม่ไม่ตรงกัน");
    }
    if (newPassword.length < 6) {
      return setErrorMsg("รหัสผ่านใหม่ต้องมีอย่างน้อย 6 ตัวอักษร");
    }

    setIsSaving(true);

    // ส่งข้อมูลไปที่ API
    const res = await fetch("/api/profile/password", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ oldPassword, newPassword }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccessMsg("เปลี่ยนรหัสผ่านสำเร็จ! กรุณาล็อกอินใหม่...");
      // หน่วงเวลา 2 วิ แล้วบังคับล็อกเอาท์เพื่อให้ใช้รหัสใหม่ล็อกอิน
      setTimeout(() => {
        signOut({ callbackUrl: "/login" });
      }, 2000);
    } else {
      setErrorMsg(data.error || "เกิดข้อผิดพลาด");
    }

    setIsSaving(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-2.5 rounded-xl border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium text-white"
      >
        Change Password
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-slate-900/80 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-white/20 w-full max-w-md shadow-2xl text-white transform transition-all">
            <h2 className="text-2xl font-bold mb-2">Change Password</h2>
            <p className="text-sm text-slate-400 mb-6">
              ตั้งค่ารหัสผ่านใหม่สำหรับบัญชีของคุณ
            </p>

            {/* แจ้งเตือน Error / Success */}
            {errorMsg && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="mb-4 p-3 bg-emerald-500/20 border border-emerald-500/50 rounded-lg text-emerald-200 text-sm">
                {successMsg}
              </div>
            )}

            <div className="space-y-4 mb-8">
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Current Password
                </label>
                <input
                  type="password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="รหัสผ่านเดิม"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="รหัสผ่านใหม่ (อย่างน้อย 6 ตัวอักษร)"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-black/30 border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-emerald-500 transition-colors"
                  placeholder="ยืนยันรหัสผ่านใหม่อีกครั้ง"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => {
                  setIsOpen(false);
                  setErrorMsg("");
                  setSuccessMsg("");
                  setOldPassword("");
                  setNewPassword("");
                  setConfirmPassword("");
                }}
                className="px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-sm font-medium transition-colors"
                disabled={isSaving || !!successMsg}
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-600 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                disabled={isSaving || !!successMsg}
              >
                {isSaving ? "Saving..." : "Update Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
