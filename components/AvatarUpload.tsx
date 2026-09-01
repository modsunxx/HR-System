"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function AvatarUpload({
  initialAvatarUrl,
  username,
}: {
  initialAvatarUrl?: string | null;
  username: string;
}) {
  // ถ้าระบบมีรูปที่อัปโหลดไว้แล้วให้ใช้รูปนั้น ถ้าไม่มีให้ดึงสุ่มจาก Dicebear
  const [avatarUrl, setAvatarUrl] = useState(
    initialAvatarUrl ||
      `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=transparent`,
  );
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);

    // สร้างกล่องพัสดุสำหรับส่งไฟล์
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      // ยิง API ไปที่หลังบ้านที่เราเขียนไว้เมื่อกี้
      const res = await fetch("/api/profile/avatar", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setAvatarUrl(data.avatarUrl); // เปลี่ยนรูปหน้าเว็บทันที
        router.refresh(); // สั่งรีเฟรชข้อมูลเบาๆ เผื่อมีจุดอื่นต้องอัปเดต
      } else {
        alert(data.error || "อัปโหลดไม่สำเร็จ");
      }
    } catch (error) {
      console.error("Upload failed", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    } finally {
      setIsUploading(false);
      // เคลียร์ค่า input เผื่อต้องการอัปโหลดไฟล์เดิมซ้ำ
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className="relative group w-40 h-40 rounded-full border-4 border-white/30 flex items-center justify-center text-4xl overflow-hidden shadow-[0_0_30px_rgba(255,255,255,0.1)] cursor-pointer bg-white/10 shrink-0"
      onClick={() => fileInputRef.current?.click()} // พอกดรูป ให้ไปทริกเกอร์ input ไฟล์ที่ซ่อนไว้
    >
      {/* สปินเนอร์ตอนกำลังอัปโหลด */}
      {isUploading ? (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10 backdrop-blur-sm transition-all">
          <span className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></span>
        </div>
      ) : (
        /* Overlay กล้องถ่ายรูปตอนเอาเมาส์ชี้ */
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center backdrop-blur-sm z-10">
          <span className="text-3xl mb-1">📷</span>
          <span className="text-xs font-medium text-slate-200">
            Change Picture
          </span>
        </div>
      )}

      {/* รูป Profile ปัจจุบัน */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatarUrl}
        alt="Avatar"
        className={`w-full h-full object-cover transition-all duration-300 ${
          isUploading ? "scale-110 blur-sm grayscale" : "group-hover:scale-110"
        }`}
      />

      {/* Input ซ่อนไว้สำหรับเลือกไฟล์ของจริง */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />
    </div>
  );
}
