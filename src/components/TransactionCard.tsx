"use client";

import { type Transaction } from "@/lib/mock-data";

interface TransactionCardProps {
  tx: Transaction;
  onClick?: (tx: Transaction) => void;
  isSelected?: boolean;
}

function getRiskBadge(risk: number) {
  if (risk >= 80) return { color: "bg-danger", glow: "shadow-[0_0_8px_rgba(239,68,68,0.6)]", label: "CRIT", textColor: "text-danger" };
  if (risk >= 60) return { color: "bg-orange-500", glow: "shadow-[0_0_8px_rgba(249,115,22,0.6)]", label: "HIGH", textColor: "text-orange-500" };
  if (risk >= 40) return { color: "bg-warning", glow: "shadow-[0_0_8px_rgba(245,158,11,0.6)]", label: "MED", textColor: "text-warning" };
  return { color: "bg-success", glow: "shadow-[0_0_8px_rgba(34,197,94,0.6)]", label: "LOW", textColor: "text-success" };
}

function getTypeIcon(type: Transaction["type"]) {
  switch (type) {
    case "approve": return "⚠";
    case "swap": return "⇄";
    case "transfer": return "→";
    case "stake": return "⊕";
    case "bridge": return "⟷";
    default: return "•";
  }
}

function timeAgo(timestamp: string): string {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  return `${Math.floor(hrs / 24)}d ago`;
}

export function TransactionCard({ tx, onClick, isSelected }: TransactionCardProps) {
  const badge = getRiskBadge(tx.risk);

  return (
    <div
      onClick={() => onClick?.(tx)}
      className={`p-3 rounded-lg border transition-all duration-200 cursor-pointer group ${
        isSelected
          ? "border-primary/50 bg-primary/5 glow-cyan"
          : "border-slate-800/80 bg-slate-900/30 hover:border-slate-700 hover:bg-slate-800/30"
      }`}
    >
      <div className="flex justify-between items-start mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm">{getTypeIcon(tx.type)}</span>
          <span className="font-mono text-xs text-primary/80 group-hover:text-primary transition-colors">
            {tx.hash.slice(0, 8)}...{tx.hash.slice(-4)}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`text-[9px] font-bold font-mono ${badge.textColor}`}>{tx.risk}</span>
          <span className={`w-2 h-2 rounded-full ${badge.color} ${badge.glow}`} />
        </div>
      </div>
      <div className="flex justify-between items-end">
        <div>
          <p className="text-sm font-bold text-slate-200">{tx.amount}</p>
          <p className="text-[10px] text-slate-500 mt-0.5">{tx.token}</p>
        </div>
        <span className="text-[10px] text-slate-600 font-mono">{timeAgo(tx.timestamp)}</span>
      </div>
    </div>
  );
}
