import React from 'react';
import { SpotlightCard } from './SpotlightCard.tsx';

const STEPS = [
  {
    num: '01',
    title: 'Unggah Karya di TikTok',
    desc: 'Posting video editing terbaikmu di TikTok. Pastikan resolusi jernih dan audio tersinkronisasi dengan baik.',
  },
  {
    num: '02',
    title: 'Tulis Kedua Hashtag Wajib',
    desc: 'Sertakan tagar #zeverdnewera dan #zeverdfamily pada deskripsi atau caption video sebelum menekan tombol posting.',
  },
  {
    num: '03',
    title: 'Masukkan Link ke Wizard',
    desc: 'Salin tautan video dan masukkan ke sistem seleksi di atas. Bot kami akan membaca metadata caption secara instan.',
  },
  {
    num: '04',
    title: 'Dapatkan Akses WhatsApp',
    desc: 'Peserta yang dinyatakan lolos langsung diarahkan menuju tautan resmi grup WhatsApp Marga ZEVERD.',
  },
];

export const StepsCard: React.FC = () => {
  return (
    <SpotlightCard id="alur" className="p-6 sm:p-8" radius="3xl">
      <div className="space-y-6">
        <div>
          <div className="text-[11px] font-mono tracking-wider text-red-400 uppercase font-semibold">
            Alur Pendaftaran
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight mt-1">
            Empat Tahap Menuju Marga Zeverd
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Proses verifikasi otomatis tanpa perlu menunggu konfirmasi admin manual.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {STEPS.map((step) => (
            <div
              key={step.num}
              className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.05] flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xl font-bold text-red-500/90">
                  {step.num}
                </span>
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">
                  Fase {step.num}
                </span>
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-semibold text-slate-200">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
};
