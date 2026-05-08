import { TRANSACTIONS, ADVISORIES, RECEIPTS, VOICE_QUERIES, type Transaction, type Advisory, type Receipt, type VoiceQuery } from "./mock-data";

// ─── QVAC SDK Wrapper ─── //
// Simulates local QVAC SDK with realistic latencies.
// Falls back to mock when backend is unreachable (demo mode).

export class QVACService {
  private isInitialized = false;
  private backendUrl = "http://127.0.0.1:8000/api";

  async initialize() {
    if (this.isInitialized) return;
    this.isInitialized = true;
  }

  // ─── LLM: Transaction Risk Scoring ─── //
  async runLlmRiskScan(txHashOrData: string): Promise<{
    riskScore: number;
    riskLevel: "critical" | "high" | "medium" | "low";
    findings: string[];
    recommendation: string;
    latencyMs: number;
  }> {
    await this.initialize();
    const start = performance.now();

    try {
      const response = await fetch(`${this.backendUrl}/llm/analyze`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: txHashOrData }),
      });
      if (!response.ok) throw new Error("Backend offline");
      const data = await response.json();
      return { ...data, latencyMs: performance.now() - start };
    } catch (_err) {
      console.warn("[QVAC SDK] LLM backend unreachable, falling back to mock");
      // Simulate realistic processing latency
      await new Promise((resolve) => setTimeout(resolve, 1200 + Math.random() * 800));

      // Find matching transaction or generate score
      const match = TRANSACTIONS.find((t) => txHashOrData.includes(t.hash.slice(0, 6)));
      const risk = match?.risk ?? Math.floor(Math.random() * 40) + 50;
      const riskLevel = risk >= 80 ? "critical" : risk >= 60 ? "high" : risk >= 40 ? "medium" : "low";

      return {
        riskScore: risk,
        riskLevel,
        findings: match
          ? [match.reason]
          : [
              "Contract deployed less than 24 hours ago",
              "Deployer wallet funded by Tornado Cash mixer",
              "Approval requested for unlimited token amount",
              "No verified source code on block explorer",
            ],
        recommendation:
          risk >= 80
            ? "DO NOT PROCEED. High probability of malicious contract."
            : risk >= 60
              ? "Exercise extreme caution. Verify contract on secondary sources."
              : risk >= 40
                ? "Moderate risk. Double-check parameters before signing."
                : "Transaction appears safe based on known patterns.",
        latencyMs: performance.now() - start,
      };
    }
  }

  // ─── RAG: Security Advisory Query ─── //
  async runRagQuery(query: string): Promise<{
    results: Advisory[];
    confidence: number;
    latencyMs: number;
  }> {
    await this.initialize();
    const start = performance.now();

    try {
      const response = await fetch(`${this.backendUrl}/rag/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) throw new Error("Backend offline");
      const data = await response.json();
      return { ...data, latencyMs: performance.now() - start };
    } catch (_err) {
      console.warn("[QVAC SDK] RAG backend unreachable, falling back to mock");
      await new Promise((resolve) => setTimeout(resolve, 400 + Math.random() * 300));

      // Simple keyword matching for demo
      const lowerQuery = query.toLowerCase();
      const matches = ADVISORIES.filter(
        (a) =>
          a.title.toLowerCase().includes(lowerQuery) ||
          a.description.toLowerCase().includes(lowerQuery) ||
          (a.contract && lowerQuery.includes(a.contract.toLowerCase()))
      );

      return {
        results: matches.length > 0 ? matches : ADVISORIES.slice(0, 3),
        confidence: matches.length > 0 ? 0.92 : 0.65,
        latencyMs: performance.now() - start,
      };
    }
  }

  // ─── OCR: Receipt Text Extraction ─── //
  async runOcrScanner(_imageData: string | File | null): Promise<{
    text: string;
    amountFound: number | null;
    vendor: string;
    matchedTx: string | null;
    confidence: number;
    latencyMs: number;
  }> {
    await this.initialize();
    const start = performance.now();

    try {
      const response = await fetch(`${this.backendUrl}/ocr`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ image: _imageData }),
      });
      if (!response.ok) throw new Error("Backend offline");
      const data = await response.json();
      return { ...data, latencyMs: performance.now() - start };
    } catch (_err) {
      console.warn("[QVAC SDK] OCR backend unreachable, falling back to mock");
      await new Promise((resolve) => setTimeout(resolve, 800 + Math.random() * 500));

      // Pick a random receipt for demo
      const receipt: Receipt = RECEIPTS[Math.floor(Math.random() * RECEIPTS.length)];

      return {
        text: receipt.extractedText,
        amountFound: receipt.amount,
        vendor: receipt.vendor,
        matchedTx: receipt.matchedTxHash,
        confidence: receipt.confidence,
        latencyMs: performance.now() - start,
      };
    }
  }

  // ─── STT: Voice-to-Text ─── //
  async runVoiceToText(_audioData: Blob | null): Promise<{
    transcript: string;
    parsedQuery: string;
    resultCount: number;
    latencyMs: number;
  }> {
    await this.initialize();
    const start = performance.now();

    try {
      const formData = new FormData();
      if (_audioData) formData.append("audio", _audioData);

      const response = await fetch(`${this.backendUrl}/stt`, {
        method: "POST",
        body: formData,
      });
      if (!response.ok) throw new Error("Backend offline");
      const data = await response.json();
      return { ...data, latencyMs: performance.now() - start };
    } catch (_err) {
      console.warn("[QVAC SDK] STT backend unreachable, falling back to mock");
      await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 500));

      const query: VoiceQuery = VOICE_QUERIES[Math.floor(Math.random() * VOICE_QUERIES.length)];

      return {
        transcript: query.transcript,
        parsedQuery: query.parsedQuery,
        resultCount: query.resultCount,
        latencyMs: performance.now() - start,
      };
    }
  }
}

// Singleton
export const qvacService = new QVACService();
