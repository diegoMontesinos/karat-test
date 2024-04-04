import { formatActivityDate, formatCategoryName } from '../src/utils';

describe('utils', () => {
  it('formatCategoryName', () => {
    expect(formatCategoryName('this_is_a_name')).toBe('This Is A Name');
    expect(formatCategoryName('this_is_ a_name')).toBe('This Is  a Name');
  });

  it('Format the midnight of the Unix epoch', () => {
    const tzOffset = new Date().getTimezoneOffset() * 60 * 1000;

    expect(formatActivityDate(tzOffset)).toBe('01/01/1970 00:00:00');
  });

  it('Format given a specific date and time', () => {
    const time = new Date(Date.UTC(2024, 2, 14, 15, 9, 26)).getTime();
    const tzOffset = new Date().getTimezoneOffset() * 60 * 1000;

    expect(formatActivityDate(time + tzOffset)).toBe('14/03/2024 15:09:26');
  });
});
