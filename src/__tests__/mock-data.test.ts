import { describe, it, expect } from 'vitest';
import {
  TRANSACTIONS,
  ADVISORIES,
  RECEIPTS,
  VOICE_QUERIES,
  NETWORK_STATS,
  PORTFOLIO,
} from '@/lib/mock-data';

describe('TRANSACTIONS', () => {
  it('has 12 transactions', () => {
    expect(TRANSACTIONS).toHaveLength(12);
  });

  it('each transaction has required fields', () => {
    for (const tx of TRANSACTIONS) {
      expect(tx.hash).toBeTruthy();
      expect(tx.type).toBeTruthy();
      expect(tx.token).toBeTruthy();
      expect(tx.amount).toBeTruthy();
      expect(typeof tx.risk).toBe('number');
      expect(tx.risk).toBeGreaterThanOrEqual(0);
      expect(tx.risk).toBeLessThanOrEqual(100);
      expect(tx.timestamp).toBeTruthy();
    }
  });

  it('includes transactions of every risk tier', () => {
    expect(TRANSACTIONS.some((t) => t.risk >= 80)).toBe(true);
    expect(TRANSACTIONS.some((t) => t.risk >= 40 && t.risk < 80)).toBe(true);
    expect(TRANSACTIONS.some((t) => t.risk < 40)).toBe(true);
  });

  it('has unique hashes', () => {
    const hashes = TRANSACTIONS.map((t) => t.hash);
    expect(new Set(hashes).size).toBe(hashes.length);
  });

  it('uses only known transaction types', () => {
    const validTypes = ['approve', 'swap', 'transfer', 'stake', 'bridge'];
    for (const tx of TRANSACTIONS) {
      expect(validTypes).toContain(tx.type);
    }
  });
});

describe('ADVISORIES', () => {
  it('has 6 advisories', () => {
    expect(ADVISORIES).toHaveLength(6);
  });

  it('each advisory has required fields', () => {
    for (const adv of ADVISORIES) {
      expect(adv.id).toBeTruthy();
      expect(adv.title).toBeTruthy();
      expect(adv.description).toBeTruthy();
      expect(adv.source).toBeTruthy();
      expect(adv.timestamp).toBeTruthy();
    }
  });

  it('uses only valid severity types', () => {
    const validTypes = ['CRITICAL', 'ALERT', 'WARNING', 'INFO'];
    for (const adv of ADVISORIES) {
      expect(validTypes).toContain(adv.type);
    }
  });

  it('has unique IDs', () => {
    const ids = ADVISORIES.map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('includes at least one CRITICAL advisory', () => {
    expect(ADVISORIES.some((a) => a.type === 'CRITICAL')).toBe(true);
  });
});

describe('RECEIPTS', () => {
  it('has 3 receipts', () => {
    expect(RECEIPTS).toHaveLength(3);
  });

  it('each receipt has a positive amount', () => {
    for (const r of RECEIPTS) {
      expect(typeof r.amount).toBe('number');
      expect(r.amount).toBeGreaterThan(0);
    }
  });

  it('confidence is in [0, 1]', () => {
    for (const r of RECEIPTS) {
      expect(r.confidence).toBeGreaterThanOrEqual(0);
      expect(r.confidence).toBeLessThanOrEqual(1);
    }
  });

  it('has extracted text for each receipt', () => {
    for (const r of RECEIPTS) {
      expect(r.extractedText.length).toBeGreaterThan(0);
    }
  });
});

describe('VOICE_QUERIES', () => {
  it('has 5 queries', () => {
    expect(VOICE_QUERIES).toHaveLength(5);
  });

  it('each query has a transcript and parsed form', () => {
    for (const q of VOICE_QUERIES) {
      expect(q.transcript).toBeTruthy();
      expect(q.parsedQuery).toBeTruthy();
      expect(typeof q.resultCount).toBe('number');
    }
  });
});

describe('NETWORK_STATS', () => {
  it('starts air-gapped — zero bytes and connections', () => {
    expect(NETWORK_STATS.bytesOut).toBe(0);
    expect(NETWORK_STATS.bytesIn).toBe(0);
    expect(NETWORK_STATS.connections).toBe(0);
  });

  it('has some blocked requests to display', () => {
    expect(NETWORK_STATS.blockedRequests).toBeGreaterThan(0);
  });

  it('has positive uptime seconds', () => {
    expect(NETWORK_STATS.uptimeSeconds).toBeGreaterThan(0);
  });
});

describe('PORTFOLIO', () => {
  it('has a wallet address', () => {
    expect(PORTFOLIO.walletAddress).toBeTruthy();
  });

  it('has a positive total value', () => {
    expect(PORTFOLIO.totalValue).toBeGreaterThan(0);
  });

  it('has 5 tokens', () => {
    expect(PORTFOLIO.tokens).toHaveLength(5);
  });

  it('token values sum to portfolio total value', () => {
    const sum = PORTFOLIO.tokens.reduce((acc, t) => acc + t.value, 0);
    expect(sum).toBeCloseTo(PORTFOLIO.totalValue, 1);
  });

  it('risk distribution counts sum to transaction count', () => {
    const { high, medium, low } = PORTFOLIO.riskDistribution;
    expect(high + medium + low).toBe(TRANSACTIONS.length);
  });
});
