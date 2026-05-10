import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { NetworkMonitor } from '@/components/NetworkMonitor';
import { NETWORK_STATS } from '@/lib/mock-data';

// NETWORK_STATS.uptimeSeconds = 3847  →  "01:04:07"
// NETWORK_STATS.blockedRequests = 14

afterEach(() => {
  vi.useRealTimers();
});

describe('NetworkMonitor', () => {
  describe('initial render', () => {
    it('shows the AIR-GAPPED label', () => {
      vi.useFakeTimers();
      render(<NetworkMonitor />);
      expect(screen.getByText('AIR-GAPPED')).toBeInTheDocument();
    });

    it('shows zero bytes out', () => {
      vi.useFakeTimers();
      render(<NetworkMonitor />);
      expect(screen.getAllByText('0').length).toBeGreaterThanOrEqual(2); // bytes out + connections
    });

    it('shows initial blocked request count', () => {
      vi.useFakeTimers();
      render(<NetworkMonitor />);
      expect(screen.getByText(String(NETWORK_STATS.blockedRequests))).toBeInTheDocument();
    });

    it('renders the uptime in HH:MM:SS format', () => {
      vi.useFakeTimers();
      render(<NetworkMonitor />);
      // 3847s = 1h 4m 7s
      expect(screen.getByText('01:04:07')).toBeInTheDocument();
    });

    it('shows the ZERO BYTES TRANSMITTED label', () => {
      vi.useFakeTimers();
      render(<NetworkMonitor />);
      expect(screen.getByText('ZERO BYTES TRANSMITTED')).toBeInTheDocument();
    });
  });

  describe('uptime ticker', () => {
    it('increments uptime by 1 second after 1000ms', async () => {
      vi.useFakeTimers();
      render(<NetworkMonitor />);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(1000);
      });

      // 3847 + 1 = 3848  →  "01:04:08"
      expect(screen.getByText('01:04:08')).toBeInTheDocument();
    });

    it('increments uptime by 5 seconds after 5000ms', async () => {
      vi.useFakeTimers();
      render(<NetworkMonitor />);

      await act(async () => {
        await vi.advanceTimersByTimeAsync(5000);
      });

      // 3847 + 5 = 3852  →  "01:04:12"
      expect(screen.getByText('01:04:12')).toBeInTheDocument();
    });

    it('cleans up interval on unmount', () => {
      vi.useFakeTimers();
      const clearSpy = vi.spyOn(globalThis, 'clearInterval');
      const { unmount } = render(<NetworkMonitor />);
      unmount();
      expect(clearSpy).toHaveBeenCalled();
    });
  });

  describe('uptime formatting', () => {
    it('formats single-digit components with leading zero', async () => {
      vi.useFakeTimers();
      render(<NetworkMonitor />);
      // 3847 → 01:04:07 — all components have leading zeros
      expect(screen.getByText('01:04:07')).toBeInTheDocument();
    });

    it('rolls over minutes correctly at 60 seconds', async () => {
      vi.useFakeTimers();
      render(<NetworkMonitor />);

      // Advance to 3900s (3847 + 53 = 3900 → 01:05:00)
      await act(async () => {
        await vi.advanceTimersByTimeAsync(53 * 1000);
      });

      expect(screen.getByText('01:05:00')).toBeInTheDocument();
    });
  });
});
