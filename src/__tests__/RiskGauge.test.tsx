import { describe, it, expect, vi } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { RiskGauge } from '@/components/RiskGauge';

describe('RiskGauge', () => {
  describe('static rendering (animated=false)', () => {
    it('displays the exact score', async () => {
      vi.useFakeTimers();
      render(<RiskGauge score={94} animated={false} />);
      await act(async () => {
        vi.runAllTimers();
      });
      expect(screen.getAllByText('94')[0]).toBeInTheDocument();
      vi.useRealTimers();
    });

    it('shows CRITICAL RISK for score >= 80', () => {
      render(<RiskGauge score={80} animated={false} />);
      expect(screen.getAllByText('CRITICAL RISK')[0]).toBeInTheDocument();
    });

    it('shows HIGH RISK for score in [60, 79]', () => {
      render(<RiskGauge score={65} animated={false} />);
      expect(screen.getAllByText('HIGH RISK')[0]).toBeInTheDocument();
    });

    it('shows MEDIUM RISK for score in [40, 59]', () => {
      render(<RiskGauge score={50} animated={false} />);
      expect(screen.getAllByText('MEDIUM RISK')[0]).toBeInTheDocument();
    });

    it('shows LOW RISK for score < 40', () => {
      render(<RiskGauge score={5} animated={false} />);
      expect(screen.getAllByText('LOW RISK')[0]).toBeInTheDocument();
    });

    it('boundary: score 79 is HIGH not CRITICAL', () => {
      render(<RiskGauge score={79} animated={false} />);
      expect(screen.getAllByText('HIGH RISK')[0]).toBeInTheDocument();
    });

    it('boundary: score 39 is LOW not MEDIUM', () => {
      render(<RiskGauge score={39} animated={false} />);
      expect(screen.getAllByText('LOW RISK')[0]).toBeInTheDocument();
    });

    it('renders the /100 label', () => {
      render(<RiskGauge score={50} animated={false} />);
      expect(screen.getAllByText('/ 100')[0]).toBeInTheDocument();
    });
  });

  describe('animated rendering', () => {
    it('starts at 0 and reaches the target score', async () => {
      vi.useFakeTimers();
      const { unmount } = render(<RiskGauge score={94} animated={true} />);

      expect(screen.getAllByText('0')[0]).toBeInTheDocument();

      await act(async () => {
        // 60 frames × 16ms = 960ms; advance past that
        await vi.advanceTimersByTimeAsync(1100);
      });

      expect(screen.getAllByText('94')[0]).toBeInTheDocument();
      unmount();
      vi.useRealTimers();
    });
  });
});
