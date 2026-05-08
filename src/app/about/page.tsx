import Link from "next/link";
import { ScrambleText } from "@/components/ScrambleText";

const FEATURES = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    ),
    title: "LLM Risk Scanner",
    tag: "QVAC.LLM",
    description: "Local LLM analyzes transactions, scores risk 0-100, and explains contract intent — all offline via Vulkan GPU inference.",
    metric: "<2s",
    metricLabel: "Inference Time",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
    ),
    title: "RAG Security Intel",
    tag: "QVAC.RAG",
    description: "Retrieval-Augmented Generation from local threat databases — 12,847 scam signatures, exploit patterns, and phishing vectors.",
    metric: "~500ms",
    metricLabel: "Query Latency",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
    ),
    title: "OCR Receipt Matcher",
    tag: "QVAC.OCR",
    description: "Photograph purchase receipts → extract amounts and dates → automatically match to on-chain transactions for reconciliation.",
    metric: "~800ms",
    metricLabel: "Extraction Time",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
    ),
    title: "Voice Query",
    tag: "QVAC.STT",
    description: "Speak natural language queries — \"Show transactions over $1000\" — and get filtered results instantly. Hands-free auditing.",
    metric: "~1s",
    metricLabel: "Transcription",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-grid">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-b from-primary/5 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto px-8 pt-20 pb-16 relative">
          <Link href="/" className="text-xs font-mono text-primary/60 hover:text-primary transition-colors mb-8 inline-block">
            ← Back to Dashboard
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white tracking-tight">
                <ScrambleText text="QGUARD" speed={50} />
              </h1>
              <p className="text-sm text-primary/80 font-mono mt-1">Air-Gapped AI Wallet Security Auditor</p>
            </div>
          </div>

          <p className="text-lg text-slate-400 max-w-2xl leading-relaxed">
            Every crypto security tool has a dirty secret: <span className="text-white font-semibold">it phones home.</span> When you paste a suspicious transaction into a scanner, your wallet address and trading intent are sent to a cloud API.
          </p>
          <p className="text-lg text-primary mt-4 font-semibold">
            Qguard runs 100% on-device. Zero bytes out.
          </p>
        </div>
      </div>

      {/* Feature Grid */}
      <div className="max-w-5xl mx-auto px-8 pb-12">
        <h2 className="text-xs font-bold text-slate-500 tracking-[0.3em] mb-6">QVAC SDK — 4 FEATURES</h2>
        <div className="grid grid-cols-2 gap-5">
          {FEATURES.map((f, i) => (
            <div
              key={f.tag}
              className="glass-bright rounded-xl p-6 hover:glow-cyan transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-primary">{f.icon}</div>
                <span className="text-[10px] font-mono text-primary/50 bg-primary/5 px-2 py-0.5 rounded">{f.tag}</span>
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">{f.description}</p>
              <div className="flex items-center gap-2 pt-3 border-t border-slate-800/50">
                <span className="text-xl font-bold font-mono text-primary">{f.metric}</span>
                <span className="text-[10px] text-slate-500 font-mono">{f.metricLabel}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="max-w-5xl mx-auto px-8 pb-12">
        <div className="glass rounded-xl p-6">
          <h2 className="text-xs font-bold text-slate-500 tracking-[0.3em] mb-4">TECH STACK</h2>
          <div className="flex flex-wrap gap-2">
            {["Next.js 16", "React 19", "Tailwind v4", "TypeScript", "QVAC SDK", "Vulkan GPU", "Local SQLite"].map((t) => (
              <span key={t} className="text-xs font-mono px-3 py-1.5 rounded-full border border-slate-700/50 bg-slate-800/30 text-primary">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="max-w-5xl mx-auto px-8 pb-20 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-slate-950 font-bold px-8 py-3 rounded-lg transition-colors text-sm tracking-wider"
        >
          LAUNCH DASHBOARD →
        </Link>
        <p className="text-xs text-slate-600 font-mono mt-4">
          Built for Colosseum Frontier Hackathon 2026 • Powered by Tether QVAC SDK
        </p>
      </div>
    </main>
  );
}
