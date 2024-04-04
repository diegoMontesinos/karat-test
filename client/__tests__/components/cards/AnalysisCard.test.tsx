import { render } from '@testing-library/react';
import { vi } from 'vitest';

import AnalysisCard from '../../../src/components/cards/AnalysisCard';

vi.stubGlobal(
  'ResizeObserver',
  vi.fn(() => ({
    observe: vi.fn(),
    disconnect: vi.fn(),
    unobserve: vi.fn(),
  }))
);

describe('AnalysisCard Component', () => {
  const testData = {
    categories: {
      'Category A': 1,
      'Category B': 2,
      'Category C': 3,
    },
  };

  it('Renders properly', () => {
    const { getByText, getByLabelText } = render(
      <AnalysisCard isLoading={false} data={testData} />
    );

    expect(getByText('Analysis')).toBeTruthy();
    expect(getByLabelText('categories-chart')).toBeTruthy();
  });

  it('Renders properly with loading', () => {
    const { getByRole } = render(<AnalysisCard isLoading data={testData} />);

    expect(getByRole('progressbar')).toBeTruthy();
  });
});
