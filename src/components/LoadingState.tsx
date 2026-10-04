import React, { useState, useEffect } from 'react';

const STAGES = ['Membuka video...', 'Membaca caption video...', 'Mencocokkan hashtag wajib...', 'Menyelesaikan verifikasi...'];

export const LoadingState: React.FC = () => {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const tm = setInterval(() => setIdx((p) => (p < STAGES.length - 1 ? p + 1 : p)), 500);
    return () => clearInterval(tm);
  }, []);

  return (
    <div className="py-10 px-4 flex flex-col items-center justify-center text-center space-y-6">
      <div className="relative w-16 h-16 flex items-center justify-center">
        <div className="absolute inset-0 rounded-full border border-red-500/20" />
        <div className="absolute inset-0 rounded-full border-2 border-t-red-500 border-r-transparent border-b-transparent border-l-transparent animate-spin" />
        <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">
          <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
        </div>
      </div>

      <div className="space-y-1 max-w-sm">
        <p className="text-sm font-medium text-slate-100">{STAGES[idx]}</p>
        <p className="text-xs text-slate-400">Memvalidasi postingan TikTok secara real-time.</p>
      </div>

      <div className="w-48 h-1 bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400 transition-all duration-300 rounded-full"
          style={{ width: `${((idx + 1) / STAGES.length) * 100}%` }}
        />
      </div>
    </div>
  );
};
