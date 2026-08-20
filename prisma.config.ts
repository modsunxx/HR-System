import { defineConfig } from "@prisma/config";

export default defineConfig({
  datasource: {
    // ใส่ URL ของ PostgreSQL เครื่อง Mint ลงไปตรงๆ เลยครับ
    url: "postgresql://admin:1234@100.79.39.8:5432/hr_db?schema=public",
  },
});
