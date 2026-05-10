import { Hero } from "@/components/landing/Hero";
import { FeatureGrid } from "@/components/landing/FeatureGrid";

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-slate-950 font-sans selection:bg-cyan-500/30 selection:text-cyan-200">
      <Hero />
      <FeatureGrid />
      
      {/* Footer */}
      <footer className="border-t border-slate-800/50 py-10 mt-10">
        <div className="max-w-6xl mx-auto px-4 text-center text-slate-500 text-sm flex flex-col items-center gap-4">
          <p>
            Built for the Tether QVAC Hackathon.
          </p>
          <div className="flex gap-4">
            <a href="/pitch/index.html" className="hover:text-cyan-400 transition-colors">
              View Pitch Deck
            </a>
            <a href="/dashboard" className="hover:text-cyan-400 transition-colors">
              Launch App
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
