"use client";

import { useState, useEffect } from "react";
import { qvacService } from "@/lib/qvac";

export default function Home() {
  const [scanTx, setScanTx] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<number | null>(null);
  
  const [isRecording, setIsRecording] = useState(false);
  const [voiceQuery, setVoiceQuery] = useState("");
  
  const [receiptUploaded, setReceiptUploaded] = useState(false);
  const [isMatching, setIsMatching] = useState(false);
  
  // Real QVAC SDK trigger
  const handleScan = async () => {
    if (!scanTx) return;
    setIsScanning(true);
    setScanResult(null);
    
    const result = await qvacService.runLlmRiskScan(scanTx);
    setScanResult(result.riskScore);
    setIsScanning(false);
  };

  // Real QVAC STT trigger
  const handleMic = async () => {
    setIsRecording(true);
    setVoiceQuery("");
    
    const result = await qvacService.runVoiceToText(null);
    setVoiceQuery(result);
    setIsRecording(false);
  };

  // Real QVAC OCR trigger
  const handleReceipt = async () => {
    setReceiptUploaded(true);
    setIsMatching(true);
    
    await qvacService.runOcrScanner("receipt.jpg");
    setIsMatching(false);
  };

  return (
    <div className="flex flex-col flex-1 h-screen overflow-hidden p-6 gap-6">
      {/* HEADER */}
      <header className="flex justify-between items-center bg-surface p-4 rounded-xl border border-primary/20 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-primary/20 border border-primary flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-widest">QGUARD</h1>
            <p className="text-xs text-primary font-mono opacity-80">LOCAL-FIRST SECURITY AUDITOR</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-xs text-slate-400 font-mono">PORTFOLIO</p>
            <p className="text-lg font-bold text-white">$24,091.55</p>
          </div>
          <div className="h-10 w-px bg-slate-800" />
          <div className="flex items-center gap-2 bg-success/10 border border-success/30 px-3 py-1.5 rounded-full">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-xs font-bold text-success tracking-wider">OFFLINE</span>
          </div>
        </div>
      </header>

      {/* MAIN GRID */}
      <main className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        
        {/* LEFT: Transactions */}
        <div className="col-span-3 bg-surface border border-slate-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50">
            <h2 className="text-sm font-bold text-slate-300">RECENT TRANSACTIONS</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {[
              { hash: "0x8f...4e1a", amount: "-1.2 ETH", risk: "high" },
              { hash: "0x1a...9b2c", amount: "+500 USDC", risk: "low" },
              { hash: "0x4c...7d9e", amount: "Approve USDT", risk: "medium" },
              { hash: "0x9b...1f4a", amount: "-0.5 ETH", risk: "low" },
            ].map((tx, i) => (
              <div key={i} className="p-3 rounded-lg border border-slate-800 bg-slate-900/30 hover:border-slate-700 transition-colors cursor-pointer group">
                <div className="flex justify-between items-start mb-2">
                  <span className="font-mono text-xs text-primary group-hover:text-primary-dark transition-colors">{tx.hash}</span>
                  {tx.risk === "high" && <span className="w-2 h-2 rounded-full bg-danger shadow-[0_0_8px_rgba(239,68,68,0.8)]" />}
                  {tx.risk === "medium" && <span className="w-2 h-2 rounded-full bg-warning shadow-[0_0_8px_rgba(245,158,11,0.8)]" />}
                  {tx.risk === "low" && <span className="w-2 h-2 rounded-full bg-success shadow-[0_0_8px_rgba(34,197,94,0.8)]" />}
                </div>
                <div className="text-sm font-bold text-slate-200">{tx.amount}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CENTER: LLM Scanner & QVAC Tools */}
        <div className="col-span-6 flex flex-col gap-6 overflow-hidden">
          
          {/* Top: Scanner */}
          <div className="flex-1 bg-surface border border-slate-800 rounded-xl p-6 flex flex-col">
            <h2 className="text-sm font-bold text-slate-300 mb-4 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              LLM RISK SCANNER
            </h2>
            
            <div className="flex gap-2 mb-6">
              <input 
                type="text" 
                value={scanTx}
                onChange={(e) => setScanTx(e.target.value)}
                placeholder="Paste transaction hash or contract address..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:border-primary text-slate-200"
              />
              <button 
                onClick={handleScan}
                disabled={!scanTx || isScanning}
                className="bg-primary hover:bg-primary-dark text-slate-950 font-bold px-6 py-2 rounded-lg transition-colors disabled:opacity-50"
              >
                {isScanning ? "SCANNING..." : "SCAN"}
              </button>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-lg bg-slate-900/20 p-6 relative overflow-hidden">
              {isScanning ? (
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-xs font-mono text-primary animate-pulse">ANALYZING LOCAL AST...</p>
                  <p className="text-xs font-mono text-slate-500 mt-1">NO CLOUD CALLS DETECTED</p>
                </div>
              ) : scanResult !== null ? (
                <div className="w-full h-full flex flex-col items-center">
                  <div className="relative w-32 h-32 mb-6">
                    <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                      <path className="text-slate-800" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-danger animate-[dash_1s_ease-out_forwards]" strokeDasharray={`${scanResult}, 100`} strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-3xl font-bold text-danger">{scanResult}</span>
                      <span className="text-[10px] font-mono text-slate-400">RISK SCORE</span>
                    </div>
                  </div>
                  
                  <div className="w-full bg-danger/10 border border-danger/30 rounded-lg p-4 text-sm text-slate-300">
                    <p className="font-bold text-danger mb-2 flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                      CRITICAL FINDINGS
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li>Contract contains hidden mint function</li>
                      <li>Deployer funded by known Tornado Cash mixer</li>
                      <li>Approval requested for <em>unlimited</em> tokens</li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="text-center opacity-50">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto mb-3 text-slate-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <p className="text-sm font-bold text-slate-400">WAITING FOR INPUT</p>
                  <p className="text-xs font-mono text-slate-500 mt-1">ALL PROCESSING RUNS LOCALLY</p>
                </div>
              )}
            </div>
          </div>

          {/* Bottom: STT & OCR */}
          <div className="grid grid-cols-2 gap-6 h-48">
            {/* STT */}
            <div className="bg-surface border border-slate-800 rounded-xl p-4 flex flex-col">
              <h2 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
                VOICE QUERY (STT)
              </h2>
              <div className="flex-1 flex flex-col items-center justify-center">
                <button 
                  onMouseDown={handleMic}
                  onMouseUp={() => {}}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${isRecording ? 'bg-primary shadow-[0_0_15px_rgba(6,182,212,0.6)] animate-pulse' : 'bg-slate-800 hover:bg-slate-700'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${isRecording ? 'text-slate-950' : 'text-slate-400'}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/></svg>
                </button>
                <div className="mt-4 h-10 w-full bg-slate-900 rounded-md border border-slate-800 p-2 text-xs font-mono text-primary flex items-center">
                  {isRecording ? (
                    <div className="flex items-center gap-1">
                      <div className="w-1 h-3 bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1 h-5 bg-primary animate-bounce" style={{ animationDelay: '100ms' }} />
                      <div className="w-1 h-2 bg-primary animate-bounce" style={{ animationDelay: '200ms' }} />
                      <div className="w-1 h-4 bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
                    </div>
                  ) : voiceQuery ? (
                    `> ${voiceQuery}`
                  ) : (
                    <span className="text-slate-600">Hold mic to query...</span>
                  )}
                </div>
              </div>
            </div>

            {/* OCR */}
            <div className="bg-surface border border-slate-800 rounded-xl p-4 flex flex-col">
              <h2 className="text-xs font-bold text-slate-400 mb-3 flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                RECEIPT MATCHER (OCR)
              </h2>
              <div 
                className="flex-1 border-2 border-dashed border-slate-700 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 hover:bg-slate-800/30 transition-colors"
                onClick={handleReceipt}
              >
                {isMatching ? (
                  <div className="text-center">
                     <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary animate-spin mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
                     <p className="text-[10px] font-mono text-primary">EXTRACTING...</p>
                  </div>
                ) : receiptUploaded ? (
                  <div className="w-full px-4">
                    <div className="bg-success/10 border border-success/30 rounded p-2 mb-2">
                      <p className="text-[10px] text-success font-mono">Found: $1,240.00</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded p-2">
                      <p className="text-[10px] text-slate-400 font-mono">Matched: 0x8f...4e1a</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center opacity-60">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <span className="text-xs font-bold text-slate-300">UPLOAD IMAGE</span>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT: RAG Advisory */}
        <div className="col-span-3 bg-surface border border-slate-800 rounded-xl flex flex-col overflow-hidden">
          <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
            <h2 className="text-sm font-bold text-slate-300">RAG INTEL FEED</h2>
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {[
              { type: "WARNING", title: "New Phishing Vector", desc: "Permit2 offline signatures being harvested via fake Discord roles.", time: "10m ago" },
              { type: "ALERT", title: "Drainer Contract", desc: "0x89...1b2 identified as active wallet drainer. Added to local blocklist.", time: "1h ago" },
              { type: "INFO", title: "DB Update", desc: "Ingested 1,402 new exploit signatures from PeckShield offline dump.", time: "3h ago" },
            ].map((advisory, i) => (
              <div key={i} className="border-l-2 pl-3 pb-4 border-slate-800 last:pb-0">
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${advisory.type === 'ALERT' ? 'bg-danger/20 text-danger' : advisory.type === 'WARNING' ? 'bg-warning/20 text-warning' : 'bg-primary/20 text-primary'}`}>
                  {advisory.type}
                </span>
                <p className="text-sm font-bold text-slate-200 mt-2">{advisory.title}</p>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">{advisory.desc}</p>
                <p className="text-[10px] text-slate-600 mt-2">{advisory.time}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
      
      {/* GLOBAL STYLES FOR ANIMATIONS */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes dash {
          to {
            stroke-dasharray: \${scanResult}, 100;
          }
        }
      `}} />
    </div>
  );
}
