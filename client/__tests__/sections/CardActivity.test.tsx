import { ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { vi } from 'vitest';

import CardActivity from '../../src/sections/CardActivity';

type AutoSizerModule = typeof import('react-virtualized-auto-sizer');

vi.mock('react-virtualized-auto-sizer', async () => ({
  __esModule: true,
  ...(await vi.importActual<AutoSizerModule>('react-virtualized-auto-sizer')),
  default: vi.fn().mockImplementation(({ children }) => {
    return (children as (size: { width: number; height: number }) => ReactNode)(
      {
        width: 600,
        height: 600,
      }
    );
  }),
}));

describe('CardActivity Section', () => {
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

  it('Render properly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CardActivity />
      </BrowserRouter>
    );

    expect(getByText('Card Activity')).toBeTruthy();
  });

  it('Calls fetch and display items', async () => {
    const { getAllByText } = render(
      <BrowserRouter>
        <CardActivity />
      </BrowserRouter>
    );

    expect(getAllByText('Declined')).toBeTruthy();
    expect(getAllByText('Declined')).toHaveLength(1);
    expect(getAllByText('Approved')).toBeTruthy();
    expect(getAllByText('Approved')).toHaveLength(1);
  });
});
