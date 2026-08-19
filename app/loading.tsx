export default function Loading() {
  return (
    <main
      className="min-h-screen flex font-sans bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop')",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-md z-0"></div>

      {/* Skeleton Sidebar */}
      <div className="relative z-10 w-64 m-4 sm:m-8 mr-0 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 hidden sm:flex flex-col p-6 animate-pulse">
        <div className="flex space-x-2 mb-10">
          <div className="w-3.5 h-3.5 rounded-full bg-white/20"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-white/20"></div>
          <div className="w-3.5 h-3.5 rounded-full bg-white/20"></div>
        </div>
        <div className="w-20 h-20 rounded-full bg-white/20 mx-auto mb-4"></div>
        <div className="h-4 bg-white/20 rounded-full w-1/2 mx-auto mb-2"></div>
        <div className="h-3 bg-white/10 rounded-full w-1/3 mx-auto mb-10"></div>
        <div className="flex flex-col gap-3 mt-4">
          <div className="h-12 bg-white/10 rounded-xl w-full"></div>
          <div className="h-12 bg-white/10 rounded-xl w-full"></div>
          <div className="h-12 bg-white/10 rounded-xl w-full"></div>
        </div>
      </div>

      {/* Skeleton Main Content */}
      <div className="relative z-10 flex-1 p-4 sm:p-8 flex items-center justify-center">
        <div className="w-full max-w-5xl p-8 sm:p-10 rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 text-white animate-pulse">
          {/* Skeleton Header */}
          <div className="mb-10 border-b border-white/10 pb-6">
            <div className="h-4 bg-white/20 rounded-full w-24 mb-6"></div>
            <div className="h-8 bg-white/20 rounded-full w-64 mb-4"></div>
            <div className="h-4 bg-white/10 rounded-full w-96"></div>
          </div>

          {/* Skeleton Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="p-8 rounded-2xl bg-white/5 border border-white/5 h-40 flex flex-col justify-end"
              >
                <div className="h-10 w-10 bg-white/10 rounded-full mb-4"></div>
                <div className="h-5 bg-white/20 rounded-full w-3/4 mb-3"></div>
                <div className="h-3 bg-white/10 rounded-full w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
