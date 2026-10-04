import React, { useState, useEffect, useRef } from 'react';
import { ArrowRightIcon, UserIcon } from './CustomIcons.tsx';
import { nameRegex } from '../lib/validate.ts';

interface Props {
  val: string;
  onChange: (v: string) => void;
  onNext: () => void;
}

export const StepName: React.FC<Props> = ({ val, onChange, onNext }) => {
  const inpRef = useRef<HTMLInputElement>(null);
  const [touched, setTouched] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    inpRef.current?.focus();
  }, []);

  const checkName = (txt: string) => {
    const t = txt.trim();
    if (!t) return 'Nama tidak boleh kosong.';
    if (t.length < 2) return 'Nama minimal 2 karakter.';
    if (t.length > 50) return 'Nama maksimal 50 karakter.';
    if (!nameRegex.test(t)) return 'Gunakan huruf, angka, atau spasi.';
    return null;
  };

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const msg = checkName(val);
    if (msg) {
      setErr(msg);
      inpRef.current?.focus();
      return;
    }
    setErr(null);
    onNext();
  };

  const isValid = val.trim().length >= 2 && !checkName(val);

  return (
    <form onSubmit={handleSub} className="space-y-6">
      <div className="space-y-2">
        <label htmlFor="input-name" className="block text-sm font-medium text-slate-300">
          Siapa namamu?
        </label>
        <p className="text-xs text-slate-400">Gunakan nama panggilan atau username editor kamu.</p>
      </div>

      <div className="space-y-2">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500 group-focus-within:text-red-400">
            <UserIcon className="w-4 h-4" />
          </div>
          <input
            id="input-name"
            ref={inpRef}
            type="text"
            value={val}
            onChange={(e) => {
              const v = e.target.value;
              onChange(v);
              if (touched) setErr(checkName(v));
            }}
            onBlur={() => {
              setTouched(true);
              setErr(checkName(val));
            }}
            placeholder="Contoh: Rian, Kenzy, atau Zeverd_Editor"
            maxLength={50}
            className={`w-full pl-10 pr-4 py-3.5 bg-[#12141c] text-white placeholder:text-slate-600 rounded-xl border text-sm outline-none transition-all duration-200 ${
              err
                ? 'border-rose-500/60 bg-rose-950/[0.06] focus:border-rose-500'
                : 'border-white/[0.08] hover:border-white/[0.16] focus:border-red-500/60'
            }`}
          />
        </div>

        {err && (
          <p className="text-xs text-rose-400 flex items-center gap-1.5 pl-1" role="alert">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-rose-500" />
            {err}
          </p>
        )}
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={!isValid}
          className={`w-full py-3.5 px-5 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
            isValid
              ? 'bg-gradient-to-r from-red-600 to-rose-600 text-white font-semibold shadow-lg shadow-red-600/25 hover:from-red-500 hover:to-rose-500 cursor-pointer'
              : 'bg-white/5 text-slate-500 border border-white/5 cursor-not-allowed'
          }`}
        >
          <span>Lanjut</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
