import middleware from "next-auth/middleware";

export default middleware;

export const config = {
  // เติมคำว่า register| เข้าไปหลังคำว่า login| ครับ
  matcher: ["/((?!login|register|api|_next/static|_next/image|favicon.ico).*)"],
};
