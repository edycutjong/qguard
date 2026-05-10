import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { TransactionCard } from '@/components/TransactionCard';
import { TRANSACTIONS, type Transaction } from '@/lib/mock-data';

function makeTx(overrides: Partial<Transaction> = {}): Transaction {
  return {
    hash: '0xabc123def456000000000000000000000000abcd',
    type: 'transfer',
    token: 'USDC',
    amount: '100',
    to: '0xfoo',
    risk: 50,
    reason: 'test reason',
    timestamp: new Date().toISOString(),
    gasUsed: '0.001 ETH',
    ...overrides,
  };
}

const criticalTx = makeTx({ risk: 94 });
const highTx    = makeTx({ risk: 70 });
const mediumTx  = makeTx({ risk: 50 });
const lowTx     = makeTx({ risk: 5 });

describe('TransactionCard', () => {
  describe('content rendering', () => {
    it('renders the truncated hash', () => {
      render(<TransactionCard tx={criticalTx} />);
      const expected = `${criticalTx.hash.slice(0, 8)}...${criticalTx.hash.slice(-4)}`;
      expect(screen.getAllByText(expected)[0]).toBeInTheDocument();
    });

    it('renders the token name', () => {
      render(<TransactionCard tx={criticalTx} />);
      expect(screen.getAllByText(criticalTx.token)[0]).toBeInTheDocument();
    });

    it('renders the amount', () => {
      render(<TransactionCard tx={criticalTx} />);
      expect(screen.getAllByText(criticalTx.amount)[0]).toBeInTheDocument();
    });

    it('renders the numeric risk score', () => {
      render(<TransactionCard tx={criticalTx} />);
      expect(screen.getAllByText(String(criticalTx.risk))[0]).toBeInTheDocument();
    });

    it('renders all real transactions from mock data', () => {
      for (const tx of TRANSACTIONS) {
        const { unmount } = render(<TransactionCard tx={tx} />);
        expect(screen.getAllByText(String(tx.risk))[0]).toBeInTheDocument();
        unmount();
      }
    });
  });

  describe('click interaction', () => {
    it('calls onClick with the full transaction object', () => {
      const onClick = vi.fn();
      const { container } = render(<TransactionCard tx={criticalTx} onClick={onClick} />);
      fireEvent.click(container.firstChild!);
      expect(onClick).toHaveBeenCalledTimes(1);
      expect(onClick).toHaveBeenCalledWith(criticalTx);
    });

    it('does not throw when onClick is not provided', () => {
      const { container } = render(<TransactionCard tx={lowTx} />);
      expect(() => fireEvent.click(container.firstChild!)).not.toThrow();
    });
  });

  describe('selected state', () => {
    it('applies selected styling when isSelected=true', () => {
      const { container } = render(<TransactionCard tx={criticalTx} isSelected={true} />);
      expect(container.firstChild).toHaveClass('border-primary/50');
    });

    it('applies default styling when isSelected=false', () => {
      const { container } = render(<TransactionCard tx={criticalTx} isSelected={false} />);
      expect(container.firstChild).toHaveClass('border-slate-800/80');
    });
  });

  describe('risk badge coloring', () => {
    const cases: [Transaction, string][] = [
      [criticalTx, 'bg-danger'],
      [highTx,     'bg-orange-500'],
      [mediumTx,   'bg-warning'],
      [lowTx,      'bg-success'],
    ];

    it.each(cases)('risk=%#: renders correct badge class', (tx, expectedClass) => {
      const { container } = render(<TransactionCard tx={tx} />);
      // The badge dot uses the raw class name without Tailwind escaping at runtime
      const badge = container.querySelector(`[class*="${expectedClass}"]`);
      expect(badge).toBeTruthy();
    });
  });

  describe('type icon', () => {
    const iconCases: [Transaction['type'], string][] = [
      ['approve',  '⚠'],
      ['swap',     '⇄'],
      ['transfer', '→'],
      ['stake',    '⊕'],
      ['bridge',   '⟷'],
    ];

    it.each(iconCases)('type "%s" renders icon "%s"', (type, icon) => {
      render(<TransactionCard tx={makeTx({ type })} />);
      expect(screen.getAllByText(icon)[0]).toBeInTheDocument();
    });

    it('renders fallback icon for unknown type', () => {
      render(<TransactionCard tx={makeTx({ type: 'unknown' as Transaction['type'] })} />);
      expect(screen.getAllByText('•')[0]).toBeInTheDocument();
    });
  });

  describe('timeAgo formatting', () => {
    it('shows minutes for a recent timestamp', () => {
      const tx = makeTx({ timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString() });
      render(<TransactionCard tx={tx} />);
      expect(screen.getAllByText('5m ago')[0]).toBeInTheDocument();
    });

    it('shows hours for a timestamp several hours ago', () => {
      const tx = makeTx({ timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString() });
      render(<TransactionCard tx={tx} />);
      expect(screen.getAllByText('3h ago')[0]).toBeInTheDocument();
    });

    it('shows days for timestamps older than 24 hours', () => {
      const tx = makeTx({ timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() });
      render(<TransactionCard tx={tx} />);
      expect(screen.getAllByText('2d ago')[0]).toBeInTheDocument();
    });
  });
});
