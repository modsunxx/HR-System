import { defineConfig } from "@prisma/config";
import dotenv from "dotenv";

// 🌟 บังคับให้อ่านไฟล์ .env ก่อนเลย
dotenv.config();

export default defineConfig({
  datasource: {
    // ดึงค่า DIRECT_URL (พอร์ต 5432) มาใช้
    url: process.env.DIRECT_URL,
  },
});
