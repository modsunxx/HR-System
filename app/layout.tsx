import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import Providers from "./Providers"; // 1. นำเข้าตัวครอบที่เราเพิ่งสร้าง

export const metadata: Metadata = {
  title: "HR Workspace",
  description: "One-Stop HR Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {/* 2. เอา Providers มาครอบ children ทั้งหมดของแอปไว้ */}
        <Providers>{children}</Providers>

        {/* Toaster วางไว้จุดเดิม ถูกต้องแล้วครับ */}
        <Toaster
          position="bottom-right"
          toastOptions={{
            classNames: {
              toast:
                "bg-slate-900/60 backdrop-blur-2xl border border-white/20 text-white rounded-2xl shadow-2xl p-4",
              title: "text-white font-medium text-sm",
              description: "text-slate-300 text-xs",
              icon: "mr-2",
              success: "text-green-400",
              error: "text-red-400",
              warning: "text-yellow-400",
            },
          }}
        />
      </body>
    </html>
  );
}
