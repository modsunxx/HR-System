// กำหนดโครงสร้างข้อมูลที่ Component นี้ต้องการรับ
interface UserProfileProps {
  name: string;
  role: string;
  username: string;
  avatarUrl?: string | null;
}

export default function UserProfile({
  name,
  role,
  username,
  avatarUrl,
}: UserProfileProps) {
  const displayAvatar = avatarUrl
    ? avatarUrl
    : `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}&backgroundColor=transparent`;
  return (
    <div className="flex flex-col items-center mb-8 pb-8 border-b border-white/20">
      <div className="w-20 h-20 rounded-full mb-4 overflow-hidden border-2 border-white/30 shadow-lg bg-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={displayAvatar} // 🌟 4. เปลี่ยนมาใช้ตัวแปร displayAvatar ที่เราเช็คไว้
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold tracking-wide text-white">{name}</h3>
      <p className="text-xs text-slate-300 mt-1 bg-white/10 px-3 py-1 rounded-full border border-white/10">
        {role}
      </p>
    </div>
  );
}
