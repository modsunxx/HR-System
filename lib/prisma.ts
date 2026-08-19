import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import mariadb from "mariadb";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// ดึงค่า URL จาก .env มาเปลี่ยนคำว่า mysql:// เป็น mariadb:// ให้ถูกใจระบบ
const connectionString = (process.env.DATABASE_URL as string).replace(
  "mysql://",
  "mariadb://",
);

// 1. สร้างท่อเชื่อมต่อ (Connection Pool) ผ่าน mariadb
const pool = mariadb.createPool(connectionString);

// 2. แปลงเป็น Adapter สำหรับ Prisma
// @ts-expect-error - ข้ามการเช็ค Type ที่ไม่ตรงกันของ Prisma Adapter
const adapter = new PrismaMariaDb(pool);

// 3. ยัด Adapter เข้าไปให้ PrismaClient
export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
