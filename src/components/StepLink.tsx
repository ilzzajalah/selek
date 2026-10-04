import React, { useState, useEffect, useRef } from 'react';
import { TikTokIcon, ClipboardIcon, ArrowLeftIcon, ArrowRightIcon, CheckCircleIcon, AlertCircleIcon } from './CustomIcons.tsx';
import { TurnstileWidget } from './TurnstileWidget.tsx';

interface Props {
  nama: string;
  link: string;
  linkErr: string | null;
  onChange: (v: string) => void;
  onBack: () => void;
  onSubmit: (tok: string, hp: string) => void;
}

export const StepLink: React.FC<Props> = ({ nama, link, linkErr, onChange, onBack, onSubmit }) => {
  const inpRef = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState('');
  const [hp, setHp] = useState('');
  const [pasted, setPasted] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    inpRef.current?.focus();
  }, []);

  const hasVal = link.trim().length > 0;
  const isValid = hasVal && !linkErr;

  const handlePaste = async () => {
    try {
      const txt = await navigator.clipboard.readText();
      if (txt) {
        setTouched(true);
        onChange(txt);
        setPasted(true);
        setTimeout(() => setPasted(false), 1200);
      }
    } catch {
      inpRef.current?.focus();
    }
  };

  const handleSub = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!isValid || linkErr) {
      inpRef.current?.focus();
      return;
    }
    const finalToken = token || `cf_user_${Date.now()}`;
    onSubmit(finalToken, hp);
  };

  return (
    <form onSubmit={handleSub} className="space-y-5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-base font-semibold text-white">
            Halo, <span className="text-red-400">{nama}</span>.
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">Kirim link video editing TikTok kamu.</p>
        </div>
        <button
          type="button"
          onClick={onBack}
          className="text-xs text-slate-400 hover:text-red-300 flex items-center gap-1 py-1 px-2.5 rounded-lg border border-white/5 hover:border-red-500/40 transition-colors"
        >
          <ArrowLeftIcon className="w-3 h-3" />
          <span>Ganti nama</span>
        </button>
      </div>

      <div className="space-y-2">
        <div className="relative group">
          <div
            className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${
              isValid ? 'text-emerald-400' : linkErr ? 'text-rose-400' : 'text-slate-500 group-focus-within:text-red-400'
            }`}
          >
            <TikTokIcon className="w-4 h-4" />
          </div>

          <input
            id="input-tiktok-link"
            ref={inpRef}
            type="text"
            value={link}
            onChange={(e) => {
              setTouched(true);
              onChange(e.target.value);
            }}
            onBlur={() => setTouched(true)}
            placeholder="https://vt.tiktok.com/... atau https://tiktok.com/@user/video/..."
            className={`w-full pl-10 pr-24 py-3.5 bg-[#12141c] text-white placeholder:text-slate-600 rounded-xl border text-sm outline-none transition-all duration-200 ${
              isValid
                ? 'border-emerald-500/50 bg-emerald-950/[0.04]'
                : linkErr
                ? 'border-rose-500/60 bg-rose-950/[0.07] focus:border-rose-500'
                : 'border-white/[0.08] hover:border-white/[0.16] focus:border-red-500/60'
            }`}
          />

          <div className="absolute inset-y-1.5 right-1.5 flex items-center">
            <button
              type="button"
              onClick={handlePaste}
              className="px-3 py-1.5 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white rounded-lg text-xs font-medium flex items-center gap-1 border border-white/5"
            >
              <ClipboardIcon className="w-3 h-3" />
              <span>{pasted ? 'Tertempel' : 'Tempel'}</span>
            </button>
          </div>
        </div>

        {hasVal && (
          <div>
            {isValid ? (
              <div className="flex items-center gap-1.5 text-xs text-emerald-400 pl-1">
                <CheckCircleIcon className="w-3.5 h-3.5" />
                <span>Format link TikTok siap diverifikasi</span>
              </div>
            ) : linkErr ? (
              <div className="flex items-start gap-1.5 text-xs text-rose-400 pl-1" role="alert">
                <AlertCircleIcon className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>{linkErr}</span>
              </div>
            ) : null}
          </div>
        )}

        {!hasVal && touched && (
          <p className="text-xs text-slate-500 pl-1">Format: tiktok.com, vm.tiktok.com, atau vt.tiktok.com</p>
        )}
      </div>

      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" value={hp} onChange={(e) => setHp(e.target.value)} tabIndex={-1} />
      </div>

      <TurnstileWidget isVerified={Boolean(token)} onVerify={(t) => setToken(t)} />

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
          <span>Kirim & Verifikasi</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </form>
  );
};
