import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

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

        // 🌟 เปลี่ยนจากการยืมช่อง email มาเป็นการคืนค่า role ตรงๆ
        return {
          id: user.id.toString(),
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  // 🌟 เพิ่มบล็อก callbacks เพื่อให้ NextAuth จำ Role ได้
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // 🌟 เติม unknown as คั่นกลาง
        token.role = (user as unknown as { role: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        // 🌟 เติม unknown as คั่นกลางเหมือนกันครับ
        (session.user as unknown as { role: string }).role =
          token.role as string;
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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
