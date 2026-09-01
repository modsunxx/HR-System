import { NextResponse } from "next/server";
import { prisma } from "../../../../lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { supabase } from "../../../../lib/supabase";

export async function POST(req: Request) {
  try {
    // 1. เช็คสิทธิ์ว่าล็อกอินอยู่ไหม
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.name) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. รับข้อมูลไฟล์จาก FormData
    const formData = await req.formData();
    const file = formData.get("avatar") as File | null;

    if (!file) {
      return NextResponse.json({ error: "ไม่พบไฟล์รูปภาพ" }, { status: 400 });
    }

    // 3. แปลงไฟล์เป็น Buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // 4. ตั้งชื่อไฟล์ใหม่กันชื่อซ้ำ
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileExtension = file.name.split(".").pop();
    const newFilename = `avatar-${session.user.name.replace(/\s+/g, "-")}-${uniqueSuffix}.${fileExtension}`;

    // 5. อัปโหลดไฟล์ขึ้น Supabase Storage (Bucket: avatars)
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(newFilename, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      console.error("Supabase storage error:", uploadError);
      return NextResponse.json(
        { error: "ไม่สามารถอัปโหลดไฟล์ไปยัง Cloud Storage ได้" },
        { status: 500 },
      );
    }

    // 6. ดึง Public URL ของรูปภาพ
    const { data: publicUrlData } = supabase.storage
      .from("avatars")
      .getPublicUrl(newFilename);

    const avatarUrl = publicUrlData.publicUrl;

    // 7. บันทึก Public URL ลง Database ใน Supabase
    await prisma.user.updateMany({
      where: { name: session.user.name },
      data: { avatarUrl: avatarUrl },
    });

    return NextResponse.json({
      success: true,
      message: "อัปโหลดรูปโปรไฟล์สำเร็จ",
      avatarUrl: avatarUrl,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในการอัปโหลดไฟล์" },
      { status: 500 },
    );
  }
}
