import React, { useEffect } from 'react';
import { CheckCircleIcon, WhatsAppIcon, RefreshIcon } from './CustomIcons.tsx';
import { triggerZeverdConfetti } from './Confetti.tsx';

interface Props {
  nama: string;
  waLink?: string;
  videoTitle?: string;
  hashtagsFound?: string[];
  onReset: () => void;
}

export const SuccessState: React.FC<Props> = ({
  nama,
  waLink = 'https://chat.whatsapp.com/GHYk8LpZeverdNewEraJoin',
  videoTitle,
  onReset,
}) => {
  useEffect(() => {
    triggerZeverdConfetti();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
          <CheckCircleIcon className="w-5 h-5" />
        </div>
        <div>
          <div className="text-[11px] font-mono tracking-wider text-emerald-400 uppercase font-semibold">Status: Lolos</div>
          <h2 className="text-lg font-bold text-white tracking-tight">
            Selamat, <span className="text-red-400 font-bold">{nama}</span>.
          </h2>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20 space-y-3">
        <p className="text-sm text-emerald-200/90">Video kamu memenuhi syarat kedua hashtag resmi Marga Zeverd.</p>

        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-emerald-300 font-mono">
          <span>#zeverdnewera</span>
          <span>·</span>
          <span>#zeverdfamily</span>
        </div>

        {videoTitle && (
          <div className="pt-2 border-t border-emerald-500/10 text-xs text-slate-300">
            <span className="text-slate-400">Caption: </span>
            <span className="italic line-clamp-2 text-slate-200">"{videoTitle}"</span>
          </div>
        )}
      </div>

      <div className="space-y-3 pt-2">
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3.5 px-5 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-sm flex items-center justify-center gap-2.5 shadow-lg shadow-[#25D366]/20 transition-all duration-200"
        >
          <WhatsAppIcon className="w-5 h-5 text-slate-950 stroke-[2]" />
          <span>Gabung Grup WhatsApp Marga ZEVERD</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 text-xs font-medium flex items-center justify-center gap-1.5 border border-white/5"
        >
          <RefreshIcon className="w-3.5 h-3.5" />
          <span>Verifikasi Video Lain</span>
        </button>
      </div>
    </div>
  );
};
