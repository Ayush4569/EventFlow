import WizardContainer from "@/components/wizard/WizardContainer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#090d16] text-slate-100 relative overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-indigo-600/15 via-violet-600/10 to-transparent blur-3xl pointer-events-none -z-0" />
      <div className="absolute top-80 right-0 w-[400px] h-[400px] bg-purple-600/10 blur-[120px] pointer-events-none -z-0" />
      <div className="absolute top-96 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] pointer-events-none -z-0" />

      <header className="border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-600/30">
              E
            </div>
            <div>
              <span className="font-extrabold text-white text-base tracking-tight block leading-tight">
                EventFlow
              </span>
              <span className="text-[11px] text-slate-400 block leading-tight font-medium">
                Production & Talent Procurement
              </span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-semibold text-slate-400">
            <a
              href="#categories"
              className="hover:text-indigo-400 transition-colors"
            >
              Categories
            </a>
            <a
              href="#features"
              className="hover:text-indigo-400 transition-colors"
            >
              Workflow
            </a>
            <a href="#stats" className="hover:text-indigo-400 transition-colors">
              Highlights
            </a>
          </div>

        
        </div>
      </header>

      <main className="flex-1 py-10 sm:py-14 px-4 sm:px-6 relative z-10">
        <div className="max-w-3xl mx-auto w-full mb-8 text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-950/40 text-indigo-300 text-xs font-bold tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
            <span>Event Requirement Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
            Post Verified Requirements for{" "}
            <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-indigo-200 bg-clip-text text-transparent">
              Top Event Talent
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto leading-relaxed">
            Quickly structure your event brief in 4 verified steps. Book
            specialized planners, live performers, and technical crew with
            transparent budgets and verified riders.
          </p>

        
        </div>

        <WizardContainer />

        <div id="features" className="max-w-4xl mx-auto mt-16 pt-10 border-t border-slate-800/80">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950/60 border border-indigo-800/60 px-3 py-1 rounded-full">
              Platform Features
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-2">
              Engineered for Seamless Event Hiring
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-indigo-950 border border-indigo-500/30 text-indigo-400 flex items-center justify-center font-bold">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-white text-sm">
                Granular Category Specs
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adaptive form controls tailor questions directly to the selected
                service—capturing guest counts, artist riders, and crew gear.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-purple-950 border border-purple-500/30 text-purple-400 flex items-center justify-center font-bold">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-white text-sm">
                Budget & Scope Transparency
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Clear allocation parameters prevent misaligned expectations,
                allowing accurate compensation and transparent contracts.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-xs space-y-2">
              <div className="w-9 h-9 rounded-xl bg-emerald-950 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="font-bold text-white text-sm">
                Double-Layer Validation
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Client-side reactive validation paired with backend Zod schemas
                guarantees complete briefs and clean data persistence.
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <p>
              &copy; 2026 EventFlow. Production & Talent Requirement Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
