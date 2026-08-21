"use client";

import { useState, useEffect, useTransition } from "react";
import { toast } from "sonner";
import { handleCheckIn, handleCheckOut } from "./actions";

export default function ClockPanel() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("th-TH", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
  const formattedDate = currentTime.toLocaleDateString("th-TH", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const onCheckIn = () => {
    startTransition(async () => {
      const res = await handleCheckIn();
      if (res.success) {
        toast.success(
          res.status === "Late"
            ? "บันทึกเวลาสำเร็จ (วันนี้มาสายนะ!)"
            : "บันทึกเวลาเข้างานสำเร็จ!",
        );
      } else {
        toast.error(res.message);
      }
    });
  };

  const onCheckOut = () => {
    startTransition(async () => {
      const res = await handleCheckOut();
      if (res.success) {
        toast.success("บันทึกเวลาออกงานสำเร็จ! เดินทางกลับปลอดภัยครับ");
      } else {
        toast.error(res.message);
      }
    });
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 mb-10 items-center justify-center bg-black/20 p-8 rounded-3xl border border-white/10 shadow-inner">
      <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start">
        <h2 className="text-6xl sm:text-7xl font-bold font-mono tracking-wider text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-emerald-400 drop-shadow-lg mb-2">
          {formattedTime}
        </h2>
        <p className="text-lg text-slate-300 font-medium">{formattedDate}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <button
          onClick={onCheckIn}
          disabled={isPending}
          className="flex-1 sm:flex-none px-8 py-5 bg-emerald-600/90 hover:bg-emerald-500 disabled:opacity-50 border border-emerald-400/50 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">👋</span> Check In
        </button>
        <button
          onClick={onCheckOut}
          disabled={isPending}
          className="flex-1 sm:flex-none px-8 py-5 bg-orange-600/90 hover:bg-orange-500 disabled:opacity-50 border border-orange-400/50 text-white rounded-2xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:-translate-y-1 flex items-center justify-center gap-3"
        >
          <span className="text-2xl">🏃</span> Check Out
        </button>
      </div>
    </div>
  );
}
