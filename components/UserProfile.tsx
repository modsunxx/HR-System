export default function UserProfile() {
  return (
    <div className="flex flex-col items-center mb-8 pb-8 border-b border-white/20">
      <div className="w-20 h-20 rounded-full mb-4 overflow-hidden border-2 border-white/30 shadow-lg bg-white/20 backdrop-blur-sm">
        {/* สั่งปิดการแจ้งเตือนบรรทัดด้านล่างนี้ */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sunny&backgroundColor=transparent"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-lg font-semibold tracking-wide text-white">Sunny</h3>
      <p className="text-xs text-slate-300 mt-1 bg-white/10 px-3 py-1 rounded-full border border-white/10">
        HR Admin
      </p>
    </div>
  );
}
