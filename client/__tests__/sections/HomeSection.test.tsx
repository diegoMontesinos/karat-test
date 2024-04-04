import { render } from '@testing-library/react';

import Home from '../../src/sections/Home';

describe('Home Section', () => {
  it('Render properly', () => {
    const { getByText } = render(<Home />);

    expect(getByText('Dashboard')).toBeTruthy();
  });
});
