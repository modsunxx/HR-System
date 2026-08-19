import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner"; // 1. Import Toaster

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
        {children}

        {/* 2. วาง Toaster ไว้ล่างสุด พร้อมแต่ง CSS แบบกระจกฝ้า */}
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
