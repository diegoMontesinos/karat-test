import { BrowserRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import Home from '../../src/sections/Home';

describe('Home Section', () => {
  it('Render properly', () => {
    const { getByText, getByLabelText } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(getByText('Dashboard')).toBeTruthy();
    expect(getByLabelText('metrics-card')).toBeTruthy();
    expect(getByLabelText('analysis-card')).toBeTruthy();
    expect(getByLabelText('recent-activity-card')).toBeTruthy();
  });
});
