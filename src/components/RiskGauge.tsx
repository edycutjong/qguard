"use client";

import { useState, useEffect } from "react";

interface RiskGaugeProps {
  score: number;
  size?: number;
  animated?: boolean;
}

export function RiskGauge({ score, size = 140, animated = true }: RiskGaugeProps) {
  const [displayScore, setDisplayScore] = useState(animated ? 0 : score);

  useEffect(() => {
    if (!animated) {
      setTimeout(() => setDisplayScore(score), 0);
      return;
    }

    let frame = 0;
    const totalFrames = 60;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayScore(Math.round(score * eased));
      if (frame >= totalFrames) clearInterval(interval);
    }, 16);

    return () => clearInterval(interval);
  }, [score, animated]);

  const getColor = (s: number) => {
    if (s >= 80) return { stroke: "#ef4444", text: "text-danger", bg: "bg-danger/10", label: "CRITICAL", glow: "0 0 30px rgba(239,68,68,0.4)" };
    if (s >= 60) return { stroke: "#f97316", text: "text-orange-500", bg: "bg-orange-500/10", label: "HIGH", glow: "0 0 30px rgba(249,115,22,0.4)" };
    if (s >= 40) return { stroke: "#f59e0b", text: "text-warning", bg: "bg-warning/10", label: "MEDIUM", glow: "0 0 30px rgba(245,158,11,0.3)" };
    return { stroke: "#22c55e", text: "text-success", bg: "bg-success/10", label: "LOW", glow: "0 0 20px rgba(34,197,94,0.3)" };
  };

  const color = getColor(score);
  const circumference = 2 * Math.PI * 15.9155;
  const dashArray = `${(displayScore / 100) * circumference}, ${circumference}`;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size, filter: `drop-shadow(${color.glow})` }}>
        <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
          {/* Background track */}
          <circle
            cx="18" cy="18" r="15.9155"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="text-slate-800/50"
          />
          {/* Score arc */}
          <circle
            cx="18" cy="18" r="15.9155"
            fill="none"
            stroke={color.stroke}
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeDasharray={dashArray}
            className="transition-all duration-100"
          />
          {/* Glow arc */}
          <circle
            cx="18" cy="18" r="15.9155"
            fill="none"
            stroke={color.stroke}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={dashArray}
            opacity="0.2"
            className="blur-[2px]"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold font-mono ${color.text}`}>{displayScore}</span>
          <span className="text-[9px] font-mono text-slate-500 tracking-widest mt-0.5">/ 100</span>
        </div>
      </div>
      <span className={`text-[10px] font-bold font-mono tracking-widest px-3 py-1 rounded-full border ${color.text} ${color.bg} border-current/20`}>
        {color.label} RISK
      </span>
    </div>
  );
}
