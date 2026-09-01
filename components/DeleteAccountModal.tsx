"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export default function DeleteAccountModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    const res = await fetch("/api/profile", {
      method: "DELETE",
    });

    if (res.ok) {
      // ลบสำเร็จ ให้บังคับเตะออกจากระบบกลับไปหน้า Login
      await signOut({ callbackUrl: "/login" });
    } else {
      alert("เกิดข้อผิดพลาด ลบไม่ได้ครับ");
      setIsDeleting(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="w-full py-2.5 rounded-xl border border-red-500/30 text-red-300 hover:bg-red-500/20 transition-colors text-sm font-medium"
      >
        Delete Account
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
          <div className="bg-slate-900/90 backdrop-blur-xl p-6 sm:p-8 rounded-3xl border border-red-500/30 w-full max-w-md shadow-[0_0_40px_rgba(239,68,68,0.2)] text-white transform transition-all">
            <div className="flex items-center gap-3 mb-4 text-red-400">
              <span className="text-3xl">⚠️</span>
              <h2 className="text-2xl font-bold">Are you sure?</h2>
            </div>

            <p className="text-sm text-slate-300 mb-6">
              การลบบัญชีเป็นการกระทำที่{" "}
              <span className="text-red-400 font-bold">
                ไม่สามารถย้อนกลับได้
              </span>{" "}
              ข้อมูลพนักงานและประวัติการลางานของคุณจะหายไปทั้งหมด
              คุณแน่ใจหรือไม่?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-white/20 hover:bg-white/10 text-sm font-medium transition-colors"
                disabled={isDeleting}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 rounded-xl text-sm font-medium transition-colors flex items-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Yes, Delete Account"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
