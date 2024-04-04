import { render } from '@testing-library/react';

import MetricsCard from '../../../src/components/cards/MetricsCard';

describe('MetricsCard component', () => {
  it('Render properly', () => {
    const { getByText } = render(
      <MetricsCard isLoading={false} data={{ sum: -10, average: 200 }} />
    );

    expect(getByText('Metrics')).toBeTruthy();
    expect(getByText('$-10.00')).toBeTruthy();
    expect(getByText('$200.00')).toBeTruthy();
  });

  it('Render skeleton loading', () => {
    const { getAllByRole } = render(
      <MetricsCard isLoading data={{ sum: -10, average: 200 }} />
    );

    expect(getAllByRole('progressbar')).toHaveLength(2);
  });
});
