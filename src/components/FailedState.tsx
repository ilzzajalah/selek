import React from 'react';
import { AlertCircleIcon, RefreshIcon, HashtagIcon } from './CustomIcons.tsx';

interface Props {
  error: string;
  missingHashtags?: string[];
  videoTitle?: string;
  onReset: () => void;
}

export const FailedState: React.FC<Props> = ({ error, missingHashtags = [], videoTitle, onReset }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-rose-500/15 border border-rose-500/40 flex items-center justify-center text-rose-400">
          <AlertCircleIcon className="w-5 h-5 text-rose-400" />
        </div>
        <div>
          <div className="text-[11px] font-mono tracking-wider text-rose-400 uppercase font-semibold">Status: Belum Lolos</div>
          <h2 className="text-lg font-bold text-white tracking-tight">Belum Memenuhi Syarat</h2>
        </div>
      </div>

      <div className="p-4 rounded-xl bg-[#180d12] border border-rose-500/30 space-y-3.5">
        <p className="text-sm font-semibold text-rose-200">{error}</p>

        {missingHashtags.length > 0 && (
          <div className="space-y-2 pt-1 border-t border-rose-500/15">
            <span className="text-xs text-rose-300/80 font-medium block">Hashtag wajib yang belum ada:</span>
            <div className="flex flex-wrap gap-2">
              {missingHashtags.map((ht) => (
                <span key={ht} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs font-mono text-rose-300">
                  <HashtagIcon className="w-3.5 h-3.5 text-rose-400" />
                  {ht}
                </span>
              ))}
            </div>
          </div>
        )}

        {videoTitle && (
          <div className="pt-2 border-t border-rose-500/15 text-xs text-slate-400">
            <span>Caption terbaca: </span>
            <span className="italic line-clamp-2 text-rose-100 font-mono">"{videoTitle}"</span>
          </div>
        )}

        <div className="pt-2 border-t border-rose-500/15 text-xs text-slate-300">
          <span className="text-rose-300 font-semibold">Solusi:</span> Tambahkan <span className="text-red-300 font-mono">#zeverdnewera</span> dan <span className="text-red-300 font-mono">#zeverdfamily</span> di caption video TikTok, lalu pastikan video disetel ke publik.
        </div>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-900/30 transition-all duration-200"
        >
          <RefreshIcon className="w-4 h-4" />
          <span>Ulangi dari Awal</span>
        </button>
      </div>
    </div>
  );
};
