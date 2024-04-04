import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { vi } from 'vitest';

import RecentActivityCard from '../../../src/components/cards/RecentActivityCard';

describe('RecentActivityCard Component', () => {
  const mockData = {
    data: [
      {
        id: '1',
        amount: 100,
        approved: false,
        created: 0,
        currency: 'usd',
        merchant_data: {
          category: '',
          city: '',
          country: '',
          name: 'name',
        },
      },
      {
        id: '2',
        amount: -100,
        approved: true,
        created: 0,
        currency: 'usd',
        merchant_data: {
          category: '',
          city: '',
          country: '',
          name: 'name',
        },
      },
    ],
    has_more: false,
  };

  beforeEach(() => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() =>
        Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockData),
        })
      )
    );
  });

  it('Render Properly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <RecentActivityCard />
      </BrowserRouter>
    );

    expect(getByText('Recent Activity')).toBeTruthy();
    expect(getByText('Showing last 10 registers')).toBeTruthy();
    expect(getByText('See All')).toBeTruthy();
  });

  it('Calls fetch and display items', async () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <RecentActivityCard />
      </BrowserRouter>
    );

    expect(getAllByText('Declined')).toBeTruthy();
    expect(getAllByText('Declined')).toHaveLength(1);
    expect(getAllByText('Approved')).toBeTruthy();
    expect(getAllByText('Approved')).toHaveLength(1);
  });
});
