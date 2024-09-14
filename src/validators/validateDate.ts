import { daysInMonth } from "../utils/Component/date";

export const validateDate = (
  formattedDate: string, 
  errorMessage?: string,
  comparisonDate?: Date, 
  comparisonType?: 'past' | 'future' 
) => {

  const propsInError: { day?: boolean; month?: boolean; year?: boolean } = { day: false, month: false, year: false };
  const errorMessages: { day?: string; month?: string; year?: string } = {};
  const [day, month, year] = formattedDate.split('-').map(Number);
  
  if (day === undefined || isNaN(day) || month === undefined || isNaN(month) || year === undefined || isNaN(year)) {
    propsInError.day = day === undefined || isNaN(day);
    propsInError.month = month === undefined || isNaN(month);
    propsInError.year = year === undefined || isNaN(year);
    return { error: errorMessage || 'Invalid date format', propsInError };
  }

  const date = new Date(year, month - 1, day);

  if (!day || isNaN(Number(day)) || Number(day) < 1 || Number(day) > 31) {
    propsInError.day = true;
    errorMessages.day = 'invalid day';
  }
  if (!month || isNaN(Number(month)) || Number(month) < 1 || Number(month) > 12) {
    propsInError.month = true;
    errorMessages.month = 'invalid month';
  }
  if (!year || isNaN(Number(year)) || formattedDate.split('-')[2].length !== 4) {
    propsInError.year = true;
    errorMessages.year = 'invalid year';
  }
  if (day && month && year) {
    if (day > daysInMonth(month, year)) {
      propsInError.day = true;
      errorMessages.day = 'invalid day';
    };
  }

  const hasErrors = Object.values(propsInError).some(Boolean);
  const error = hasErrors ? errorMessage || errorMessages : null;


  if (comparisonDate && comparisonType) {
    if (comparisonType === 'past' && date >= comparisonDate) {
      propsInError.day = day > comparisonDate.getDate();
      propsInError.month = month > comparisonDate.getMonth() + 1;
      propsInError.year = year > comparisonDate.getFullYear();
    };
  
    if (comparisonType === 'future' && date <= comparisonDate) {
      propsInError.day = day < comparisonDate.getDate();
      propsInError.month = month < comparisonDate.getMonth() + 1;
      propsInError.year = year < comparisonDate.getFullYear();
    };
  }

  return { error, propsInError };

};
