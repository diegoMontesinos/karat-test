import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';

import Sidebar from '../../src/components/Sidebar';

describe('Sidebar component', () => {
  it('Render properly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    expect(getByText('Home')).toBeTruthy();
    expect(getByText('Card Activity')).toBeTruthy();
  });

  it('Nav Link is selected properly', () => {
    const { getByText } = render(
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    );

    expect(
      getByText('Home')
        .closest('.MuiButtonBase-root')
        ?.getAttribute('aria-selected')
    ).toBe('true');

    fireEvent.click(getByText('Card Activity'));

    expect(
      getByText('Card Activity')
        .closest('.MuiButtonBase-root')
        ?.getAttribute('aria-selected')
    ).toBe('true');
  });
});
