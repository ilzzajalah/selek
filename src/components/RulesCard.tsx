import React from 'react';
import { SpotlightCard } from './SpotlightCard.tsx';
import { FilmIcon, HashtagIcon, ShieldCheckIcon } from './CustomIcons.tsx';

export const RulesCard: React.FC = () => {
  return (
    <SpotlightCard id="syarat" className="p-6 sm:p-8" radius="3xl">
      <div className="space-y-6">
        <div>
          <div className="text-[11px] font-mono tracking-wider text-red-400 uppercase font-semibold">
            Pedoman Resmi
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Syarat & Ketentuan Seleksi Editor
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Pastikan videomu telah memenuhi standar kualitas sebelum mengirim link ke sistem verifikasi.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Rule 1 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
              <FilmIcon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-100">Karya Asli & Format Video</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Video berupa hasil editing orisinal (AMV, cinematic typography, CC grading, preset, atau motion graphic). Tidak diperkenankan me-repost karya editor lain.
            </p>
          </div>

          {/* Rule 2 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
              <HashtagIcon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-100">Wajib 2 Hashtag Resmi</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Caption video TikTok wajib mencantumkan <span className="text-red-300 font-mono">#zeverdnewera</span> dan <span className="text-red-300 font-mono">#zeverdfamily</span> agar bot verifikasi dapat memvalidasi.
            </p>
          </div>

          {/* Rule 3 */}
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.05] space-y-2">
            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-400">
              <ShieldCheckIcon className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-semibold text-slate-100">Visibilitas Publik</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Akun dan video harus disetel ke publik. Video berstatus privat atau terbatas tidak dapat dipindai oleh sistem verifikasi server.
            </p>
          </div>
        </div>

        {/* Note on one video per member */}
        <div className="p-4 rounded-xl bg-red-500/[0.05] border border-red-500/20 text-xs text-slate-300 flex items-center justify-between flex-wrap gap-2">
          <span>Setiap tautan video hanya dapat didaftarkan satu kali untuk mencegah duplikasi pendaftaran.</span>
          <span className="font-mono text-red-400 text-[11px]">MARGA ZEVERD RED ERA</span>
        </div>
      </div>
    </SpotlightCard>
  );
};
