import React, { useState } from 'react';
import { SpotlightCard } from './SpotlightCard.tsx';
import { StepName } from './StepName.tsx';
import { StepLink } from './StepLink.tsx';
import { LoadingState } from './LoadingState.tsx';
import { SuccessState } from './SuccessState.tsx';
import { FailedState } from './FailedState.tsx';
import { CheckRes } from '../lib/validate.ts';

type Step = 'nama' | 'kirim' | 'loading' | 'success' | 'failed';

const TIKTOK_REGEX = /^(https?:\/\/)?([a-zA-Z0-9_-]+\.)*(tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)(\/.*)?$/i;

export const WizardCard: React.FC = () => {
  const [step, setStep] = useState<Step>('nama');
  const [nama, setNama] = useState('');
  const [link, setLink] = useState('');
  const [linkErr, setLinkErr] = useState<string | null>(null);
  const [resData, setResData] = useState<CheckRes | null>(null);

  const onLinkChange = (val: string) => {
    setLink(val);
    const trimmed = val.trim();
    if (!trimmed) {
      setLinkErr(null);
    } else if (!TIKTOK_REGEX.test(trimmed)) {
      setLinkErr('Format link tidak valid (gunakan tiktok.com, vm.tiktok.com, atau vt.tiktok.com).');
    } else {
      setLinkErr(null);
    }
  };

  const reset = () => {
    setNama('');
    setLink('');
    setLinkErr(null);
    setResData(null);
    setStep('nama');
  };

  const onSubmit = async (tok: string, botHp: string) => {
    if (!TIKTOK_REGEX.test(link.trim())) {
      setLinkErr('Format link tidak valid.');
      return;
    }

    setStep('loading');
    const start = Date.now();

    try {
      const ctrl = new AbortController();
      const tm = setTimeout(() => ctrl.abort(), 12000);

      const res = await fetch('/api/check', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nama: nama.trim(),
          link: link.trim(),
          turnstileToken: tok || `cf_${Date.now()}`,
          website: botHp,
        }),
        signal: ctrl.signal,
      });
      clearTimeout(tm);

      let data: CheckRes;
      try {
        data = await res.json();
      } catch {
        data = { success: false, error: 'Respon server tidak valid. Coba lagi.' };
      }

      const delay = Math.max(0, 1000 - (Date.now() - start));
      setTimeout(() => {
        setResData(data);
        setStep(res.ok && data.success ? 'success' : 'failed');
      }, delay);
    } catch {
      setTimeout(() => {
        setResData({ success: false, error: 'Gagal menghubungi server. Periksa koneksi internet Anda.' });
        setStep('failed');
      }, 1000);
    }
  };

  return (
    <SpotlightCard className="w-full max-w-xl mx-auto p-6 sm:p-8 backdrop-blur-sm" radius="3xl">
      {(step === 'nama' || step === 'kirim') && (
        <div className="mb-6 space-y-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-mono text-red-400 font-semibold tracking-wider">
              {step === 'nama' ? '01 / 02' : '02 / 02'}
            </span>
            <span className="text-slate-400 text-[11px]">
              {step === 'nama' ? 'Identitas Peserta' : 'Tautan Video TikTok'}
            </span>
          </div>
          <div className="w-full h-1 bg-white/[0.06] rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-red-400 transition-all duration-300 rounded-full"
              style={{ width: step === 'nama' ? '50%' : '100%' }}
            />
          </div>
        </div>
      )}

      <div>
        {step === 'nama' && <StepName val={nama} onChange={(v) => setNama(v)} onNext={() => setStep('kirim')} />}
        {step === 'kirim' && (
          <StepLink
            nama={nama}
            link={link}
            linkErr={linkErr}
            onChange={onLinkChange}
            onBack={() => setStep('nama')}
            onSubmit={onSubmit}
          />
        )}
        {step === 'loading' && <LoadingState />}
        {step === 'success' && (
          <SuccessState
            nama={resData?.nama || nama}
            waLink={resData?.waLink}
            videoTitle={resData?.videoTitle}
            hashtagsFound={resData?.hashtagsFound}
            onReset={reset}
          />
        )}
        {step === 'failed' && (
          <FailedState
            error={resData?.error || 'Verifikasi belum memenuhi syarat.'}
            missingHashtags={resData?.missingHashtags}
            videoTitle={resData?.videoTitle}
            onReset={reset}
          />
        )}
      </div>
    </SpotlightCard>
  );
};
