"use client";

import { useState, useCallback } from "react";
import { StatusBar } from "@/components/StatusBar";
import { Footer } from "@/components/Footer";
import { ParticleField } from "@/components/ParticleField";
import { RiskGauge } from "@/components/RiskGauge";
import { ScrambleText } from "@/components/ScrambleText";
import { NetworkMonitor } from "@/components/NetworkMonitor";
import { TransactionCard } from "@/components/TransactionCard";
import { AdvisoryFeed } from "@/components/AdvisoryFeed";
import { TRANSACTIONS, ADVISORIES, PORTFOLIO, type Transaction } from "@/lib/mock-data";
import { qvacService } from "@/lib/qvac";

// ─── Scan Result Type ─── //
interface ScanResult {
  riskScore: number;
  riskLevel: string;
  findings: string[];
  recommendation: string;
  latencyMs: number;
}

// ─── OCR Result Type ─── //
interface OcrResult {
  text: string;
  amountFound: number | null;
  vendor: string;
  matchedTx: string | null;
  confidence: number;
  latencyMs: number;
}

// ─── STT Result Type ─── //
interface SttResult {
  transcript: string;
  parsedQuery: string;
  resultCount: number;
  latencyMs: number;
}

export default function Home() {
  // ─── LLM Scanner State ─── //
  const [scanTx, setScanTx] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [selectedTx, setSelectedTx] = useState<Transaction | null>(null);

  // ─── STT State ─── //
  const [isRecording, setIsRecording] = useState(false);
  const [sttResult, setSttResult] = useState<SttResult | null>(null);

  // ─── OCR State ─── //
  const [isOcrProcessing, setIsOcrProcessing] = useState(false);
  const [ocrResult, setOcrResult] = useState<OcrResult | null>(null);

  // ─── RAG State ─── //
  const [ragQuery, setRagQuery] = useState("");
  const [isRagQuerying, setIsRagQuerying] = useState(false);

  // ─── LLM Scan Handler ─── //
  const handleScan = useCallback(async () => {
    if (!scanTx) return;
    setIsScanning(true);
    setScanResult(null);

    const result = await qvacService.runLlmRiskScan(scanTx);
    setScanResult(result);
    setIsScanning(false);
  }, [scanTx]);

  // ─── Transaction Click ─── //
  const handleTxClick = useCallback((tx: Transaction) => {
    setSelectedTx(tx);
    setScanTx(tx.hash);
    setScanResult({
      riskScore: tx.risk,
      riskLevel: tx.risk >= 80 ? "critical" : tx.risk >= 40 ? "medium" : "low",
      findings: [tx.reason],
      recommendation: tx.risk >= 80
        ? "DO NOT PROCEED. High probability of malicious contract."
        : tx.risk >= 40
          ? "Exercise caution. Verify parameters before signing."
          : "Transaction appears safe based on known patterns.",
      latencyMs: 0,
    });
  }, []);

  // ─── STT Handler ─── //
  const handleMic = useCallback(async () => {
    setIsRecording(true);
    setSttResult(null);

    const result = await qvacService.runVoiceToText(null);
    setSttResult(result);
    setIsRecording(false);
  }, []);

  // ─── OCR Handler ─── //
  const handleReceipt = useCallback(async () => {
    setIsOcrProcessing(true);
    setOcrResult(null);

    const result = await qvacService.runOcrScanner(null);
    setOcrResult(result);
    setIsOcrProcessing(false);
  }, []);

  // ─── RAG Handler ─── //
  const handleRagQuery = useCallback(async () => {
    if (!ragQuery) return;
    setIsRagQuerying(true);
    await qvacService.runRagQuery(ragQuery);
    setIsRagQuerying(false);
    setRagQuery("");
  }, [ragQuery]);

  return (
    <>
      <ParticleField />
      <StatusBar />
      <div className="flex flex-col flex-1 overflow-hidden p-6 gap-5 relative z-10">

        {/* ═══ HEADER ═══ */}
        <header className="flex justify-between items-center glass-bright rounded-xl p-4 glow-cyan">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-lg bg-primary/15 border border-primary/40 flex items-center justify-center relative">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-success border border-background" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-[0.3em]">
                <ScrambleText text="QGUARD" speed={40} />
              </h1>
              <p className="text-[10px] text-primary/80 font-mono tracking-wider">AIR-GAPPED WALLET SECURITY AUDITOR</p>
            </div>
          </div>

          <div className="flex items-center gap-5">
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-mono tracking-wider">PORTFOLIO VALUE</p>
              <p className="text-lg font-bold font-mono text-white">${PORTFOLIO.totalValue.toLocaleString()}</p>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="text-right">
              <p className="text-[10px] text-slate-500 font-mono tracking-wider">WALLET</p>
              <p className="text-xs font-mono text-primary">{PORTFOLIO.walletAddress}</p>
            </div>
            <div className="h-8 w-px bg-slate-800" />
            <div className="flex items-center gap-2 bg-success/10 border border-success/30 px-3 py-2 rounded-full">
              <div className="relative">
                <div className="w-2.5 h-2.5 rounded-full bg-success" />
                <div className="w-2.5 h-2.5 rounded-full bg-success absolute inset-0 animate-pulse-ring" />
              </div>
              <span className="text-xs font-bold text-success tracking-wider font-mono">OFFLINE</span>
            </div>
          </div>
        </header>

        {/* ═══ MAIN 3-COLUMN GRID ═══ */}
        <main className="grid grid-cols-12 gap-5 flex-1 min-h-0">

          {/* ─── LEFT: Transaction Feed ─── */}
          <div className="col-span-3 glass rounded-xl flex flex-col overflow-hidden">
            <div className="p-3.5 border-b border-slate-800/50 bg-slate-900/30 flex justify-between items-center">
              <h2 className="text-xs font-bold text-slate-300 tracking-wider">TRANSACTIONS</h2>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-slate-500">{TRANSACTIONS.length}</span>
                <div className="flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-danger" />
                  <span className="w-1.5 h-1.5 rounded-full bg-warning" />
                  <span className="w-1.5 h-1.5 rounded-full bg-success" />
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2">
              {TRANSACTIONS.map((tx) => (
                <TransactionCard
                  key={tx.hash}
                  tx={tx}
                  onClick={handleTxClick}
                  isSelected={selectedTx?.hash === tx.hash}
                />
              ))}
            </div>
            {/* Risk Distribution */}
            <div className="p-3 border-t border-slate-800/50 bg-slate-900/20">
              <div className="flex items-center gap-2">
                <div className="flex-1 h-1.5 rounded-full bg-slate-800 overflow-hidden flex">
                  <div className="h-full bg-danger" style={{ width: `${(PORTFOLIO.riskDistribution.high / TRANSACTIONS.length) * 100}%` }} />
                  <div className="h-full bg-warning" style={{ width: `${(PORTFOLIO.riskDistribution.medium / TRANSACTIONS.length) * 100}%` }} />
                  <div className="h-full bg-success" style={{ width: `${(PORTFOLIO.riskDistribution.low / TRANSACTIONS.length) * 100}%` }} />
                </div>
              </div>
              <div className="flex justify-between mt-1.5">
                <span className="text-[9px] font-mono text-danger">{PORTFOLIO.riskDistribution.high} HIGH</span>
                <span className="text-[9px] font-mono text-warning">{PORTFOLIO.riskDistribution.medium} MED</span>
                <span className="text-[9px] font-mono text-success">{PORTFOLIO.riskDistribution.low} LOW</span>
              </div>
            </div>
          </div>

          {/* ─── CENTER: Scanner + Tools ─── */}
          <div className="col-span-6 flex flex-col gap-5 overflow-hidden">

            {/* ══ LLM Risk Scanner ══ */}
            <div className="flex-1 glass rounded-xl p-5 flex flex-col glow-cyan">
              <h2 className="text-xs font-bold text-slate-300 mb-4 flex items-center gap-2 tracking-wider">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                LLM TRANSACTION RISK SCANNER
                <span className="ml-auto text-[10px] font-normal text-primary/60">QVAC.LLM</span>
              </h2>

              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={scanTx}
                  onChange={(e) => setScanTx(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleScan()}
                  placeholder="Paste transaction hash or contract address..."
                  className="flex-1 bg-slate-900/80 border border-slate-700/50 rounded-lg px-4 py-2.5 text-sm font-mono text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-primary/60 focus:ring-1 focus:ring-primary/20 transition-all"
                />
                <button
                  onClick={handleScan}
                  disabled={!scanTx || isScanning}
                  className="bg-primary hover:bg-primary-dark text-slate-950 font-bold px-6 py-2.5 rounded-lg transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm tracking-wider"
                >
                  {isScanning ? "ANALYZING..." : "SCAN"}
                </button>
              </div>

              <div className="flex-1 flex flex-col border border-slate-800/30 rounded-lg bg-slate-900/20 relative overflow-hidden">
                {/* Scan Line Effect */}
                {isScanning && (
                  <div className="absolute inset-0 pointer-events-none z-10">
                    <div className="w-full h-px bg-linear-to-r from-transparent via-primary to-transparent animate-scanline" />
                    <div className="absolute inset-0 bg-primary/[0.02]" />
                  </div>
                )}

                {isScanning ? (
                  <div className="flex-1 flex flex-col items-center justify-center p-6">
                    <div className="w-16 h-16 border-2 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
                    <p className="text-xs font-mono text-primary animate-pulse tracking-wider">ANALYZING LOCAL AST...</p>
                    <p className="text-[10px] font-mono text-slate-600 mt-1">ZERO CLOUD CALLS • QVAC VULKAN ENGINE</p>
                    {/* Matrix-style text cascade */}
                    <div className="mt-4 font-mono text-[10px] text-primary/30 space-y-0.5 text-center">
                      <p className="animate-fade-in-up" style={{ animationDelay: "200ms" }}>PARSING CONTRACT BYTECODE...</p>
                      <p className="animate-fade-in-up" style={{ animationDelay: "500ms" }}>CHECKING APPROVAL PATTERNS...</p>
                      <p className="animate-fade-in-up" style={{ animationDelay: "800ms" }}>CROSS-REFERENCING LOCAL THREAT DB...</p>
                    </div>
                  </div>
                ) : scanResult ? (
                  <div className="flex-1 flex items-center gap-6 p-6 animate-fade-in-up">
                    {/* Risk Gauge */}
                    <RiskGauge score={scanResult.riskScore} />

                    {/* Findings */}
                    <div className="flex-1 space-y-3">
                      <div className={`rounded-lg p-4 border ${
                        scanResult.riskScore >= 80 ? "bg-danger/10 border-danger/30" :
                        scanResult.riskScore >= 40 ? "bg-warning/10 border-warning/30" :
                        "bg-success/10 border-success/30"
                      }`}>
                        <p className={`text-xs font-bold mb-2 flex items-center gap-2 ${
                          scanResult.riskScore >= 80 ? "text-danger" : scanResult.riskScore >= 40 ? "text-warning" : "text-success"
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                          FINDINGS
                        </p>
                        <ul className="space-y-1">
                          {scanResult.findings.map((f, i) => (
                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                              <span className="text-slate-600 mt-0.5">▸</span>
                              {f}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-800/50">
                        <p className="text-[10px] font-mono text-slate-500 mb-1">RECOMMENDATION</p>
                        <p className="text-xs text-slate-300">{scanResult.recommendation}</p>
                      </div>
                      {scanResult.latencyMs > 0 && (
                        <p className="text-[10px] font-mono text-slate-600">Analyzed in {scanResult.latencyMs.toFixed(0)}ms • 0 bytes transmitted</p>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center opacity-40">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-3 text-slate-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                    <p className="text-sm font-bold text-slate-400 tracking-wider">AWAITING INPUT</p>
                    <p className="text-[10px] font-mono text-slate-600 mt-1">PASTE TX HASH OR SELECT FROM LIST</p>
                  </div>
                )}
              </div>
            </div>

            {/* ══ STT + OCR Row ══ */}
            <div className="grid grid-cols-2 gap-5 h-52">

              {/* ── Voice Query (STT) ── */}
              <div className="glass rounded-xl p-4 flex flex-col">
                <h2 className="text-[10px] font-bold text-slate-400 mb-3 flex items-center gap-2 tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                  VOICE QUERY
                  <span className="ml-auto text-primary/50 font-normal">QVAC.STT</span>
                </h2>
                <div className="flex-1 flex flex-col items-center justify-center">
                  <button
                    onClick={handleMic}
                    disabled={isRecording}
                    className={`w-14 h-14 rounded-full flex items-center justify-center transition-all relative ${
                      isRecording
                        ? "bg-primary shadow-[0_0_25px_rgba(6,182,212,0.5)]"
                        : "bg-slate-800 hover:bg-slate-700 hover:shadow-[0_0_15px_rgba(6,182,212,0.2)]"
                    }`}
                  >
                    {isRecording && <div className="absolute inset-0 rounded-full border-2 border-primary animate-pulse-ring" />}
                    <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRecording ? "text-slate-950" : "text-slate-400"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/></svg>
                  </button>

                  {/* Waveform / Result */}
                  <div className="mt-3 w-full bg-slate-900/60 rounded-md border border-slate-800/50 p-2 text-xs font-mono min-h-[40px] flex items-center">
                    {isRecording ? (
                      <div className="flex items-end gap-0.5 h-5 mx-auto">
                        {Array.from({ length: 12 }).map((_, i) => (
                          <div
                            key={i}
                            className="w-1 bg-primary rounded-full"
                            style={{
                              animation: `waveform 0.5s ease-in-out ${i * 0.05}s infinite alternate`,
                              height: "4px",
                            }}
                          />
                        ))}
                      </div>
                    ) : sttResult ? (
                      <div className="w-full">
                        <p className="text-primary truncate">&gt; {sttResult.transcript}</p>
                        <p className="text-[9px] text-slate-600 mt-0.5">{sttResult.resultCount} results • {sttResult.latencyMs.toFixed(0)}ms</p>
                      </div>
                    ) : (
                      <span className="text-slate-600 mx-auto">Click mic to query...</span>
                    )}
                  </div>
                </div>
              </div>

              {/* ── Receipt Matcher (OCR) ── */}
              <div className="glass rounded-xl p-4 flex flex-col">
                <h2 className="text-[10px] font-bold text-slate-400 mb-3 flex items-center gap-2 tracking-wider">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                  RECEIPT MATCHER
                  <span className="ml-auto text-primary/50 font-normal">QVAC.OCR</span>
                </h2>
                <div
                  className="flex-1 border-2 border-dashed border-slate-700/50 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/40 hover:bg-primary/[0.02] transition-all"
                  onClick={handleReceipt}
                >
                  {isOcrProcessing ? (
                    <div className="text-center animate-fade-in-up">
                      <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-2" />
                      <p className="text-[10px] font-mono text-primary animate-pulse">EXTRACTING TEXT...</p>
                      <p className="text-[9px] font-mono text-slate-600 mt-0.5">LOCAL OCR ENGINE</p>
                    </div>
                  ) : ocrResult ? (
                    <div className="w-full px-3 space-y-2 animate-fade-in-up">
                      <div className="bg-success/10 border border-success/30 rounded p-2">
                        <p className="text-[10px] font-mono text-success flex items-center gap-1.5">
                          <span>✓</span> Found: ${ocrResult.amountFound?.toLocaleString()} — {ocrResult.vendor}
                        </p>
                      </div>
                      <div className="bg-slate-900/60 border border-slate-800/50 rounded p-2">
                        <p className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5">
                          <span>⟷</span> Matched: {ocrResult.matchedTx}
                        </p>
                        <p className="text-[9px] text-slate-600 mt-0.5">{(ocrResult.confidence * 100).toFixed(0)}% confidence • {ocrResult.latencyMs.toFixed(0)}ms</p>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center opacity-50">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                      <p className="text-xs font-bold text-slate-400">DROP RECEIPT</p>
                      <p className="text-[9px] text-slate-600 mt-0.5">Click to demo</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* ─── RIGHT: RAG Advisory Feed ─── */}
          <div className="col-span-3 flex flex-col gap-5 overflow-hidden">
            <div className="flex-1 glass rounded-xl flex flex-col overflow-hidden">
              <div className="p-3.5 border-b border-slate-800/50 bg-slate-900/30 flex justify-between items-center">
                <h2 className="text-xs font-bold text-slate-300 tracking-wider flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                  RAG INTEL FEED
                </h2>
                <span className="text-[10px] text-primary/50 font-mono">QVAC.RAG</span>
              </div>

              {/* RAG Query Input */}
              <div className="px-3.5 py-2 border-b border-slate-800/30">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    value={ragQuery}
                    onChange={(e) => setRagQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleRagQuery()}
                    placeholder="Is contract 0x... safe?"
                    className="flex-1 bg-slate-900/50 border border-slate-800/50 rounded px-2.5 py-1.5 text-[11px] font-mono text-slate-300 placeholder:text-slate-600 focus:outline-none focus:border-primary/40 transition-colors"
                  />
                  <button
                    onClick={handleRagQuery}
                    disabled={!ragQuery || isRagQuerying}
                    className="text-[10px] font-bold text-primary hover:text-primary-dark disabled:opacity-40 px-2 transition-colors"
                  >
                    QUERY
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-3.5">
                <AdvisoryFeed advisories={ADVISORIES} />
              </div>

              {/* Feed Stats */}
              <div className="p-3 border-t border-slate-800/30 bg-slate-900/20 flex items-center justify-between">
                <span className="text-[9px] font-mono text-slate-600">12,847 signatures indexed</span>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[9px] font-mono text-primary/60">LIVE FEED</span>
                </div>
              </div>
            </div>

            {/* Network Monitor */}
            <NetworkMonitor />
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
}
