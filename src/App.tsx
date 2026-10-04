import { WizardCard } from './components/WizardCard.tsx';
import { RulesCard } from './components/RulesCard.tsx';
import { StepsCard } from './components/StepsCard.tsx';
import { ZeverdAbout } from './components/ZeverdAbout.tsx';
import { ZeverdFooter } from './components/ZeverdFooter.tsx';
import { HashtagIcon } from './components/CustomIcons.tsx';

export default function App() {
  return (
    <div className="min-h-screen bg-[#08090d] text-[#E2E8F0] flex flex-col selection:bg-red-600/30 selection:text-red-100">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none bg-grid-pattern opacity-40 z-0" />
      <div
        className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-red-600/15 via-rose-600/5 to-transparent blur-[120px] pointer-events-none z-0"
        aria-hidden="true"
      />

      {/* Main Container */}
      <main className="relative z-10 flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-10 sm:py-16 space-y-16 sm:space-y-24">
        {/* Hero & Wizard Section */}
        <section id="seleksi" className="space-y-8 text-center pt-2 sm:pt-4">
          <div className="max-w-2xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-red-400 font-semibold tracking-wider uppercase">
              <span>Portal Seleksi Resmi</span>
              <span className="text-slate-600">·</span>
              <span>New Era Red Edition</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight sm:leading-none text-balance">
              SELEKSI MARGA <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-500 to-red-600">ZEVERD</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
              Kirimkan video editing terbaikmu di TikTok. Sistem akan memverifikasi caption video dan memastikan kedua hashtag resmi tercantum secara instan.
            </p>

            {/* Mandatory Hashtags Display */}
            <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/[0.08] border border-red-500/25 text-xs font-mono text-red-300 font-medium">
                <HashtagIcon className="w-3.5 h-3.5 text-red-400" />
                zeverdnewera
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/[0.08] border border-red-500/25 text-xs font-mono text-red-300 font-medium">
                <HashtagIcon className="w-3.5 h-3.5 text-red-400" />
                zeverdfamily
              </span>
            </div>
          </div>

          {/* Master Wizard Card */}
          <div className="pt-4">
            <WizardCard />
          </div>
        </section>

        {/* Requirements Section */}
        <section>
          <RulesCard />
        </section>

        {/* Steps Guide Section */}
        <section>
          <StepsCard />
        </section>

        {/* Community About Section */}
        <section>
          <ZeverdAbout />
        </section>
      </main>

      {/* Footer */}
      <ZeverdFooter />
    </div>
  );
}
