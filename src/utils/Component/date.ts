
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
