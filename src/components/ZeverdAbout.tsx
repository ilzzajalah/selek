import React from 'react';
import { SpotlightCard } from './SpotlightCard.tsx';
import { ZeverdMonogram } from './CustomIcons.tsx';

export const ZeverdAbout: React.FC = () => {
  return (
    <SpotlightCard id="tentang" className="p-6 sm:p-8" radius="3xl">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-8 space-y-4">
          <div className="text-[11px] font-mono tracking-wider text-red-400 uppercase font-semibold">
            Tentang Komunitas
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">
            Marga Zeverd — Wadah Kreatif & Kolaborasi Editor
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Marga ZEVERD adalah perkumpulan editor video, kreator AMV, animator visual, dan penggiat preset yang berfokus pada pengembangan skill, kolaborasi project editing, dan sharing resources. Di era baru ini, kami membuka seleksi terbuka bagi kreator berdedikasi tinggi yang ingin tumbuh bersama keluarga Zeverd.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-400">
            <div className="flex items-center gap-1.5 font-mono text-red-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Project Kolaborasi Berkala</span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5 font-mono text-red-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Sharing Preset & VFX</span>
            </div>
            <span className="text-slate-600">·</span>
            <div className="flex items-center gap-1.5 font-mono text-red-300/90">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              <span>Koneksi Komunitas Editor</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-4 flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.02] border border-white/[0.05] text-center space-y-3">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-500 shadow-inner">
            <ZeverdMonogram className="w-10 h-10" />
          </div>
          <div>
            <span className="text-sm font-bold text-white tracking-wide block">
              ZEVERD RED ERA
            </span>
            <span className="text-[11px] text-slate-400 font-mono block mt-0.5">
              #zeverdfamily
            </span>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};
