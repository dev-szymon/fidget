import { daysInMonth, firstMonthDay, getMonthAndYear } from '../utils';

describe('util outputs correct number of days in given month', () => {
  // month is 0 based

  test('february 2021 length outputs 28 days', () => {
    expect(daysInMonth(1, 2021)).toBe(28);
  });
  test('february 2024 length outputs 29 days', () => {
    expect(daysInMonth(1, 2024)).toBe(29);
  });
  test('august 2021 length outputs 31 days', () => {
    expect(daysInMonth(7, 2021)).toBe(31);
  });
  test('april 2021 length outputs 30 days', () => {
    expect(daysInMonth(3, 2021)).toBe(30);
  });
});

test('util outputs correct first day date', () => {
  // input is august 2021, first day is sunday - index 0 weekday
  expect(firstMonthDay(7, 2021).getDay()).toBe(0);
});

test('util outputs object with correct month and day properties', () => {
  const date = Date.parse('2024-02-29');

  const { month, year } = getMonthAndYear(date);
  // 1 is february
  expect(month).toBe(1);
  expect(year).toBe(2024);
});
