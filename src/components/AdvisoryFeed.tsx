"use client";

import { type Advisory } from "@/lib/mock-data";

interface AdvisoryFeedProps {
  advisories: Advisory[];
}

function getAdvisoryStyle(type: Advisory["type"]) {
  switch (type) {
    case "CRITICAL": return { bg: "bg-danger/15", text: "text-danger", border: "border-danger/30", icon: "🔴" };
    case "ALERT": return { bg: "bg-warning/15", text: "text-warning", border: "border-warning/30", icon: "🟠" };
    case "WARNING": return { bg: "bg-amber-500/10", text: "text-amber-400", border: "border-amber-500/20", icon: "🟡" };
    case "INFO": return { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20", icon: "🔵" };
  }
}

export function AdvisoryFeed({ advisories }: AdvisoryFeedProps) {
  return (
    <div className="space-y-3">
      {advisories.map((advisory, i) => {
        const style = getAdvisoryStyle(advisory.type);
        return (
          <div
            key={advisory.id}
            className="border-l-2 border-slate-800 pl-3 animate-fade-in-up"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            <div className="flex items-center gap-2 mb-1.5">
              <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded border ${style.bg} ${style.text} ${style.border}`}>
                {advisory.type}
              </span>
              {advisory.loss && (
                <span className="text-[10px] font-mono text-danger/80">-{advisory.loss}</span>
              )}
            </div>
            <p className="text-sm font-bold text-slate-200">{advisory.title}</p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">{advisory.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] text-slate-600 font-mono">{advisory.timestamp}</span>
              <span className="text-[10px] text-slate-700">•</span>
              <span className="text-[10px] text-primary/60 font-mono">{advisory.source}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
