"use client";

import { useState, useEffect } from "react";
import { NETWORK_STATS } from "@/lib/mock-data";

export function NetworkMonitor() {
  const [uptime, setUptime] = useState(NETWORK_STATS.uptimeSeconds);
  const [blocked, setBlocked] = useState(NETWORK_STATS.blockedRequests);

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime((prev) => prev + 1);
      // Occasionally increment blocked
      if (Math.random() > 0.92) {
        setBlocked((prev) => prev + 1);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatUptime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="glass rounded-xl p-4 glow-green">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-xs font-bold text-slate-300 tracking-wider flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-success" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          NETWORK MONITOR
        </h3>
        <div className="flex items-center gap-1.5 bg-success/10 border border-success/30 px-2.5 py-1 rounded-full">
          <div className="relative">
            <div className="w-2 h-2 rounded-full bg-success" />
            <div className="w-2 h-2 rounded-full bg-success absolute inset-0 animate-ping opacity-50" />
          </div>
          <span className="text-[10px] font-bold text-success tracking-widest">AIR-GAPPED</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-3">
        <div className="bg-slate-900/50 rounded-lg p-2.5 text-center">
          <p className="text-lg font-bold font-mono text-success">0</p>
          <p className="text-[9px] text-slate-500 tracking-wider mt-0.5">BYTES OUT</p>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-2.5 text-center">
          <p className="text-lg font-bold font-mono text-success">0</p>
          <p className="text-[9px] text-slate-500 tracking-wider mt-0.5">CONNECTIONS</p>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-2.5 text-center">
          <p className="text-lg font-bold font-mono text-danger">{blocked}</p>
          <p className="text-[9px] text-slate-500 tracking-wider mt-0.5">BLOCKED</p>
        </div>
        <div className="bg-slate-900/50 rounded-lg p-2.5 text-center">
          <p className="text-lg font-bold font-mono text-primary">{formatUptime(uptime)}</p>
          <p className="text-[9px] text-slate-500 tracking-wider mt-0.5">UPTIME</p>
        </div>
      </div>

      {/* Live Activity Bar */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex-1 h-1 bg-slate-800 rounded-full overflow-hidden">
          <div className="h-full bg-success/40 rounded-full animate-shimmer" style={{ width: "100%" }} />
        </div>
        <span className="text-[9px] text-slate-500 font-mono">ZERO BYTES TRANSMITTED</span>
      </div>
    </div>
  );
}
