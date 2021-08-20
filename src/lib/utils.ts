export function getMonthLength(month: number, year: number) {
  // month + 1 gets the next month
  // 0 in days position gets last day of previous month
  return new Date(year, month + 1, 0).getDate();
}

export function getFirstMonthDay(month: number, year: number) {
  return new Date(year, month, 1);
}

export function generateMonthArray(month: number, year: number) {
  const month1stDate = getFirstMonthDay(month, year);
  const month1stDateMS = month1stDate.getTime();
  const month1stWeekday = month1stDate.getDay() || 7;
  const weeksToDisplay = Math.ceil(
    (month1stWeekday - 1 + getMonthLength(month, year)) / 7
  );

  return Array.from(Array(weeksToDisplay * 7).keys()).map((index) => {
    return month1stDateMS + (index - (month1stWeekday - 1)) * MS24HOUR;
  });
}

export function monthSwitch(month: number) {
  switch (month) {
    case 0:
      return 'Styczeń';
    case 1:
      return 'Luty';
    case 2:
      return 'Marzec';
    case 3:
      return 'Kwiecień';
    case 4:
      return 'Maj';
    case 5:
      return 'Czerwiec';
    case 6:
      return 'Lipiec';
    case 7:
      return 'Sierpień';
    case 8:
      return 'Wrzesień';
    case 9:
      return 'Październik';
    case 10:
      return 'Listopad';
    case 11:
      return 'Grudzień';
    default:
      return month;
  }
}

export function getMonthAndYear(dateInMS: number) {
  const date = new Date(dateInMS);
  const year = date.getFullYear();
  const month = date.getMonth();
  return { month, year };
}

export const MS24HOUR = 1000 * 60 * 60 * 24;
