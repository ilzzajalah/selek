import React from 'react';
import { ZeverdMonogram } from './CustomIcons.tsx';

export const ZeverdFooter: React.FC = () => {
  return (
    <footer className="w-full border-t border-white/[0.06] bg-[#07080b] py-8 text-xs text-slate-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <ZeverdMonogram className="w-4 h-4 text-red-500/70" />
          <span className="font-semibold text-slate-400 tracking-wide">
            MARGA ZEVERD
          </span>
          <span className="text-slate-600">·</span>
          <span>Hak Cipta Dilindungi &copy; {new Date().getFullYear()}</span>
        </div>

        <div className="flex items-center gap-5 text-slate-400 text-xs">
          <a href="#syarat" className="hover:text-red-400 transition-colors">
            Syarat Seleksi
          </a>
          <a href="#alur" className="hover:text-red-400 transition-colors">
            Alur Pendaftaran
          </a>
          <a href="#tentang" className="hover:text-red-400 transition-colors">
            Komunitas
          </a>
        </div>
      </div>
    </footer>
  );
};
