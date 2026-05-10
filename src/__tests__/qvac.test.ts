import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { QVACService } from '@/lib/qvac';
import { TRANSACTIONS, ADVISORIES } from '@/lib/mock-data';

describe('QVACService', () => {
  let service: QVACService;

  beforeEach(() => {
    service = new QVACService();
    vi.useFakeTimers();
    // Simulate an unreachable backend so the mock fallback path is exercised.
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false } as Response));
    vi.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  // ─── initialize ─── //

  it('can be initialized multiple times without error', async () => {
    await service.initialize();
    await service.initialize();
    // idempotent — no throw
  });

  // ─── runLlmRiskScan ─── //

  describe('runLlmRiskScan', () => {
    it('returns a valid result shape', async () => {
      const promise = service.runLlmRiskScan('0xdeadbeef');
      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;

      expect(result.riskScore).toBeGreaterThanOrEqual(0);
      expect(result.riskScore).toBeLessThanOrEqual(100);
      expect(['critical', 'high', 'medium', 'low']).toContain(result.riskLevel);
      expect(Array.isArray(result.findings)).toBe(true);
      expect(result.findings.length).toBeGreaterThan(0);
      expect(typeof result.recommendation).toBe('string');
      expect(typeof result.latencyMs).toBe('number');
    });

    it('matches a known transaction hash and returns its risk', async () => {
      const knownTx = TRANSACTIONS[0]; // risk: 94 (critical)
      const promise = service.runLlmRiskScan(knownTx.hash.slice(0, 6));
      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;

      expect(result.riskScore).toBe(knownTx.risk);
      expect(result.riskLevel).toBe('critical');
      expect(result.findings).toContain(knownTx.reason);
    });

    it('assigns critical level when score >= 80', async () => {
      const criticalTx = TRANSACTIONS.find((t) => t.risk >= 80)!;
      const promise = service.runLlmRiskScan(criticalTx.hash.slice(0, 6));
      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;
      expect(result.riskLevel).toBe('critical');
    });

    it('assigns high level for a score in 60-79 range', async () => {
      vi.spyOn(Math, 'random').mockReturnValue(0.5); // 0.5 * 40 + 50 = 70
      const promise = service.runLlmRiskScan('0xunknown');
      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;
      expect(result.riskLevel).toBe('high');
      vi.restoreAllMocks();
    });

    it('assigns medium level for a score in 40-59 range', async () => {
      const medTx = TRANSACTIONS.find((t) => t.risk >= 40 && t.risk < 60)!;
      const promise = service.runLlmRiskScan(medTx.hash.slice(0, 6));
      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;
      expect(result.riskLevel).toBe('medium');
    });

    it('assigns low level for a score < 40', async () => {
      const lowTx = TRANSACTIONS.find((t) => t.risk < 40)!;
      const promise = service.runLlmRiskScan(lowTx.hash.slice(0, 6));
      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;
      expect(result.riskLevel).toBe('low');
    });

    it('returns generic findings for an unknown hash', async () => {
      const promise = service.runLlmRiskScan('0xunknownhashxyz');
      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;
      // Unknown hashes use the fallback list
      expect(result.findings.some((f) => f.includes('Tornado Cash') || f.includes('24 hours'))).toBe(true);
    });

    it('handles successful backend fetch', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({ riskScore: 10, riskLevel: 'low', findings: [], recommendation: 'safe' }),
        })
      );
      const promise = service.runLlmRiskScan('0xabc');
      await vi.advanceTimersByTimeAsync(100);
      const result = await promise;
      expect(result.riskScore).toBe(10);
      expect(result.riskLevel).toBe('low');
    });
  });

  // ─── runRagQuery ─── //

  describe('runRagQuery', () => {
    it('returns a valid result shape', async () => {
      const promise = service.runRagQuery('phishing');
      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(Array.isArray(result.results)).toBe(true);
      expect(result.results.length).toBeGreaterThan(0);
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
      expect(typeof result.latencyMs).toBe('number');
    });

    it('returns high confidence and matching advisories for a known keyword', async () => {
      const promise = service.runRagQuery('drainer');
      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result.confidence).toBe(0.92);
      expect(result.results.some((a) => a.title.toLowerCase().includes('drainer'))).toBe(true);
    });

    it('falls back to first 3 advisories with lower confidence for unknown query', async () => {
      const promise = service.runRagQuery('zzznomatchxyz999');
      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result.confidence).toBe(0.65);
      expect(result.results).toHaveLength(3);
      expect(result.results[0].id).toBe(ADVISORIES[0].id);
    });

    it('matches on description text', async () => {
      const promise = service.runRagQuery('flash loan');
      await vi.advanceTimersByTimeAsync(2000);
      const result = await promise;

      expect(result.confidence).toBe(0.92);
      expect(result.results.some((a) => a.description.toLowerCase().includes('flash loan'))).toBe(true);
    });

    it('handles successful backend fetch', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({ results: [], confidence: 1.0 }),
        })
      );
      const promise = service.runRagQuery('test query');
      await vi.advanceTimersByTimeAsync(100);
      const result = await promise;
      expect(result.confidence).toBe(1.0);
    });
  });

  // ─── runOcrScanner ─── //

  describe('runOcrScanner', () => {
    it('returns a valid result shape', async () => {
      const promise = service.runOcrScanner(null);
      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;

      expect(typeof result.text).toBe('string');
      expect(result.text.length).toBeGreaterThan(0);
      expect(typeof result.vendor).toBe('string');
      expect(result.confidence).toBeGreaterThan(0);
      expect(result.confidence).toBeLessThanOrEqual(1);
      expect(typeof result.latencyMs).toBe('number');
    });

    it('amount is a number or null', async () => {
      const promise = service.runOcrScanner(null);
      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;

      expect(result.amountFound === null || typeof result.amountFound === 'number').toBe(true);
    });

    it('handles successful backend fetch', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({ text: 'Mock text', amountFound: 100, vendor: 'Test Vendor', matchedTx: null, confidence: 0.99 }),
        })
      );
      const promise = service.runOcrScanner(null);
      await vi.advanceTimersByTimeAsync(100);
      const result = await promise;
      expect(result.text).toBe('Mock text');
      expect(result.confidence).toBe(0.99);
    });
  });

  // ─── runVoiceToText ─── //

  describe('runVoiceToText', () => {
    it('returns a valid result shape', async () => {
      const promise = service.runVoiceToText(null);
      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;

      expect(typeof result.transcript).toBe('string');
      expect(result.transcript.length).toBeGreaterThan(0);
      expect(typeof result.parsedQuery).toBe('string');
      expect(typeof result.resultCount).toBe('number');
      expect(typeof result.latencyMs).toBe('number');
    });

    it('transcript is one of the known voice query samples', async () => {
      const { VOICE_QUERIES } = await import('@/lib/mock-data');
      const knownTranscripts = VOICE_QUERIES.map((q) => q.transcript);

      const promise = service.runVoiceToText(null);
      await vi.advanceTimersByTimeAsync(3000);
      const result = await promise;

      expect(knownTranscripts).toContain(result.transcript);
    });

    it('handles successful backend fetch', async () => {
      vi.stubGlobal(
        'fetch',
        vi.fn().mockResolvedValue({
          ok: true,
          json: () => Promise.resolve({ transcript: 'Hello', parsedQuery: 'hello', resultCount: 0 }),
        })
      );
      const promise = service.runVoiceToText(new Blob());
      await vi.advanceTimersByTimeAsync(100);
      const result = await promise;
      expect(result.transcript).toBe('Hello');
    });
  });
});
