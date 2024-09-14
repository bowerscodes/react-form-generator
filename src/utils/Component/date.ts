
export type DateObject = { day: string, month: string, year: string }

export const toDateFromString = (string: string | undefined) => {
  if (string) {
    const [ day, month, year ] = string.split('-');
    return { day, month, year };
  }
  return { day: '', month: '', year: '' };
};

export const toStringFromDate = (date: DateObject) => {
  if (date) {
    const string = `${date.day}-${date.month}-${date.year}`;
    return string === '--' ? '' : string
  }
  return '';
};

export const daysInMonth = (month: number, year: number) => {
  if (month ===  1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12 ) {
    return 31;
  }
  if (month === 4 || month === 6 || month === 9 || month === 11 ) {
    return 30;
  }
  else if (month === 2) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
  }
  throw new Error('Invalid month');
};
