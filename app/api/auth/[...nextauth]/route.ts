import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../../lib/prisma";
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        // 1. หา User ใน Database
        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          return null; // หาไม่เจอ = ล็อกอินไม่ผ่าน
        }

        // 2. เอาหน้ากาก (bcrypt) มาถอดรหัสเทียบกัน
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          return null; // รหัสผิด = ล็อกอินไม่ผ่าน
        }

        // 3. ผ่านด่าน! ส่งข้อมูลกลับไปสร้าง Session
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.role, // ขอแอบยืมช่อง email เก็บ Role (เช่น HR_ADMIN) ไปก่อนนะครับ
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login", // บอกระบบว่าถ้าจะล็อกอิน ให้เด้งไปหน้านี้
  },
});

export { handler as GET, handler as POST };
