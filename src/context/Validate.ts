import { ValidationRule } from '../types/FormTypes';

type ValidateProps = {
  required: (value: string | string[] | number, errorMessage?: string) => string | null;
  email: (value: string, errorMessage?: string) => string | null;
  maxLength: (value: string | number, max: string | number, errorMessage?: string) => string | null;
  minLength: (value: string | number, min: string | number, errorMessage?: string) => string | null;
  mustBeInThePast: (formattedDate: string, errorMessage?: string) => string | null;
  mustBeInTheFuture: (formattedDate: string, errorMessage?: string) => string | null;
  pattern: (value: string | number | string[], regex: RegExp, errorMessage: string) => string | null;
};


export const Validate: ValidateProps = {

  required: ((value: string | string[] | number, errorMessage?: string) => {
    if (Array.isArray(value)) {
      return value.length > 0 ? null : errorMessage || 'This field is required';
    }
    else if (typeof value === 'string' && /^\d{0,2}-\d{0,2}-\d{0,4}$/.test(value)) {
      console.log('required else if: ', value);
      const [day, month, year] = value.split('-').map(Number);
      return ((day > 0 && day <= 31) && (month > 0 && month < 12) && (year.toString().length === 4)) ? null : errorMessage || 'This field is required';
    }
    else {
      return value !== '' || null ? null : errorMessage || 'This field is required';
    }

  }),
  
  email: ((value: string, errorMessage?: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value as string) ? null : errorMessage || 'Please enter a valid email address';
  }),
  
  maxLength: ((value: string | number, max: string | number, errorMessage?: string) => {
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (typeof max === 'string') {
      max = parseInt(max);
    }
    return value.length <= max ? null : errorMessage || `This field must be less than ${max} characters`;
  }),
  
  minLength: ((value: number | string, min: number | string, errorMessage?: string) => {
    if (typeof min === 'string') {
      min = parseInt(min);
    }
    if (typeof value === 'number') {
      value = value.toString();
    }
    return value.length >= min ? null : errorMessage || `This field must be at least ${min} characters`;
  }),

  mustBeInThePast: ((formattedDate: string, errorMessage?: string) => {
    console.log('formattedDate: ',formattedDate);
    const today = new Date();

    const [dayValue, monthValue, yearValue] = formattedDate.split('-').map(Number);
    console.log('dayValue, monthValue, yearValue: ', dayValue, monthValue, yearValue);

    const date = new Date(yearValue, monthValue - 1, dayValue);
    console.log('date: ', date);
    return date < today ? null : errorMessage || 'This date must be in the past';
  }),

  mustBeInTheFuture: ((formattedDate: string, errorMessage?: string) => {
    const today = new Date();

    const [dayValue, monthValue, yearValue] = formattedDate.split('-').map(Number);

    const date = new Date(yearValue, monthValue - 1, dayValue);
    return date > today ? null : errorMessage || 'This date must be in the future';
  }),
  
  pattern: ((value: string | number | string[], regex: RegExp, errorMessage: string) => {
    if (Array.isArray(value)){
      return value.every(item => regex.test(item)) ? null : errorMessage;
    }
    else {
      if (typeof value === 'number') {
        value = value.toString();
      }
    return regex.test(value) ? null : errorMessage;
    }
  }),

};

export default Validate;
