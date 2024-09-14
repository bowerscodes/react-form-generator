import { ValidationRule } from '../types/FormTypes';
import { validateDate } from './validateDate';

type ValidateProps = {
  required: (value: string | string[] | number, errorMessage?: string) => string | Object | null;
  email: (value: string, errorMessage?: string) => string | null;
  maxLength: (value: string | number, max: string | number, errorMessage?: string) => string | null | undefined;
  minLength: (value: string | string[] | number, min: string | number, errorMessage?: string) => string | null | undefined;
  mustBeInThePast: (formattedDate: string, errorMessage?: string) => string | Object | null;
  mustBeInTheFuture: (formattedDate: string, errorMessage?: string) => string | Object | null;
  pattern: (value: string | number | string[], regex: RegExp, errorMessage: string) => string | null;
};


export const Validate: ValidateProps = {

  required: ((value: string | string[] | number, errorMessage?: string) => {
    console.log('Validate.required called with value: ', value);
    // for Array fields (i.e.Checkboxes)
    if (Array.isArray(value)) {
      console.log('Array field with validation: ', value);
      return value.length > 0 ? null : errorMessage || 'This field is required';
    }
    // for DateInput fields
    else if (typeof value === 'string' && /^\d{0,2}-\d{0,2}-\d{0,4}$/.test(value)) {
      console.log('DateInput field validation: ', value);
      // const [day, month, year] = value.split('-').map(Number);
      // return ((day > 0 && day <= 31) && (month > 0 && month < 12) && (year.toString().length === 4)) ? null : errorMessage || 'This field is required';

      return validateDate(value, errorMessage);
    }
    // for all other fields
    else {
      return value !== '' || null ? null : errorMessage || 'This field is required';
    }
  }),
  
  email: ((value: string, errorMessage?: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value as string) ? null : errorMessage || 'Please enter a valid email address';
  }),
  
  maxLength: ((value: number | string | string[], max: string | number, errorMessage?: string) => {
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (typeof max === 'string') {
      max = parseInt(max);
    }
    if (Array.isArray(value)) {
      return value.length <= max ? null : errorMessage || `Please select no more than ${max} options`;
    }
    return value.length <= max ? null : errorMessage || `This field must be less than ${max} characters`;
  }),
  
  minLength: ((value: number | string | string[], min: number | string, errorMessage?: string) => {
    if (typeof min === 'string') {
      min = parseInt(min);
    }
    if (typeof value === 'number') {
      value = value.toString();
    }
    if (Array.isArray(value)) {
      return value.length >= min ? null : errorMessage || `Please select at least ${min} options`;
    }
    return value.length >= min ? null : errorMessage || `This field must be at least ${min} characters`;
  }),

  mustBeInThePast: ((formattedDate: string, errorMessage?: string) => {
    const today = new Date();
    return validateDate(formattedDate, errorMessage, today, 'past');
  }),

  mustBeInTheFuture: ((formattedDate: string, errorMessage?: string) => {
    const today = new Date();
    return validateDate(formattedDate, errorMessage, today, 'future');
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
