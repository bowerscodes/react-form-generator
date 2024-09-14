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

  
  if (comparisonDate && comparisonType) {
    if (comparisonType === 'past' && date >= comparisonDate) {
      propsInError.year = year > comparisonDate.getFullYear();
      propsInError.month = year === comparisonDate.getFullYear() && month > comparisonDate.getMonth() + 1;
      propsInError.day = year === comparisonDate.getFullYear() && month === comparisonDate.getMonth() + 1 && day > comparisonDate.getDate();
    }
    
    if (comparisonType === 'future' && date <= comparisonDate) {
      propsInError.year = year < comparisonDate.getFullYear();
      propsInError.month = year === comparisonDate.getFullYear() && month < comparisonDate.getMonth() + 1;
      propsInError.day = year === comparisonDate.getFullYear() && month === comparisonDate.getMonth() + 1 && day < comparisonDate.getDate();
    }
  }
  
  const hasErrors = Object.values(propsInError).some(Boolean);
  const error = hasErrors ? errorMessage || errorMessages : null;

  return { error, propsInError };

};
