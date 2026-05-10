import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AdvisoryFeed } from '@/components/AdvisoryFeed';
import { ADVISORIES, type Advisory } from '@/lib/mock-data';

describe('AdvisoryFeed', () => {
  it('renders all advisory titles', () => {
    render(<AdvisoryFeed advisories={ADVISORIES} />);
    for (const adv of ADVISORIES) {
      expect(screen.getByText(adv.title)).toBeInTheDocument();
    }
  });

  it('renders all advisory descriptions', () => {
    render(<AdvisoryFeed advisories={ADVISORIES} />);
    for (const adv of ADVISORIES) {
      // description text appears in the DOM
      expect(screen.getByText(adv.description)).toBeInTheDocument();
    }
  });

  it('renders severity type badges', () => {
    render(<AdvisoryFeed advisories={ADVISORIES} />);
    // All four types are present in the fixture data
    expect(screen.getByText('CRITICAL')).toBeInTheDocument();
    expect(screen.getAllByText('ALERT').length).toBeGreaterThan(0);
    expect(screen.getByText('WARNING')).toBeInTheDocument();
    expect(screen.getAllByText('INFO').length).toBeGreaterThan(0);
  });

  it('renders the source for each advisory', () => {
    render(<AdvisoryFeed advisories={ADVISORIES} />);
    for (const adv of ADVISORIES) {
      expect(screen.getByText(adv.source)).toBeInTheDocument();
    }
  });

  it('renders the loss amount when present', () => {
    const withLoss = ADVISORIES.filter((a) => a.loss);
    render(<AdvisoryFeed advisories={withLoss} />);
    for (const adv of withLoss) {
      expect(screen.getByText(`-${adv.loss}`)).toBeInTheDocument();
    }
  });

  it('renders an empty list without crashing', () => {
    const { container } = render(<AdvisoryFeed advisories={[]} />);
    expect(container.firstChild).toBeEmptyDOMElement();
  });

  it('renders a single advisory correctly', () => {
    const single = [ADVISORIES[0]];
    render(<AdvisoryFeed advisories={single} />);
    expect(screen.getByText(ADVISORIES[0].title)).toBeInTheDocument();
    expect(screen.getByText('CRITICAL')).toBeInTheDocument();
  });

  describe('severity badge styling', () => {
    const cases: [Advisory['type'], string][] = [
      ['CRITICAL', 'bg-danger/15'],
      ['ALERT',    'bg-warning/15'],
      ['WARNING',  'bg-amber-500/10'],
      ['INFO',     'bg-primary/10'],
    ];

    it.each(cases)('%s badge has correct background class', (type, bgClass) => {
      const advisory: Advisory = {
        id: 'test-1',
        type,
        title: `Test ${type}`,
        description: 'Test description',
        source: 'TestSource',
        timestamp: '1m ago',
      };
      const { container } = render(<AdvisoryFeed advisories={[advisory]} />);
      const badge = container.querySelector(`.${bgClass.replace(/\//g, '\\/').replace('.', '\\.')}`);
      expect(badge).toBeTruthy();
    });
  });
});
