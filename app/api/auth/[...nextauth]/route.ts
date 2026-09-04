import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

// 🌟 แยกตัวแปร authOptions ออกมาและใส่ export เพื่อให้ไฟล์อื่นดึงไปใช้ได้
export const authOptions: NextAuthOptions = {
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

        const user = await prisma.user.findUnique({
          where: { username: credentials.username },
        });

        if (!user) {
          return null;
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!isPasswordValid) {
          return null;
        }

        // 🌟 จุดที่ 1: คืนค่า role และ id
        return {
          id: user.id.toString(),
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  // 🌟 จุดที่ 2: บล็อก callbacks สำหรับยัด role และ id ใส่ Token และส่งให้หน้าเว็บ
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // เพิ่ม Type ให้รู้จักทั้ง role และ id
        const u = user as unknown as { role: string; id: string };
        token.role = u.role;
        token.id = u.id; // 🌟 ยัด ID ใส่ Token
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // เพิ่ม Type ให้รู้จักทั้ง role และ id
        const u = session.user as unknown as { role: string; id: string };
        u.role = token.role as string;
        u.id = token.id as string; // 🌟 ส่ง ID จาก Token เข้า Session ให้หน้าเว็บใช้งาน
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

// นำ authOptions มาใส่ใน handler
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
