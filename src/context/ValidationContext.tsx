import React, { createContext, useContext, useState } from 'react';

import { ValidationRule } from '../types/FormTypes';
import { Validate } from './Validate';
import { FormData, FormProps } from '../types/FormTypes';

type ValidationContextProps = {
  errors: { [key: string]: string | string[] | null };
  validate: (fieldId: string, value: string | string[] | number, type: string, validationRules?: any[]) => void;
};

export const ValidationContext = createContext<ValidationContextProps | undefined>(undefined);

export const ValidationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ errors, setErrors ] = useState<{ [key: string]: string | string[] | null }>({});
  
  const validate = (fieldId: string, value: string | string[] | number, type: string, validationRules?: any[]) => {

    console.log('fieldId: ', fieldId);
    console.log('value: ', value);
    console.log('type: ', type);
    console.log('validationRules: ', validationRules);

    if (validationRules) {
      for (const rule of validationRules) {
        const { type, ...params } = rule;
        console.log('type, params: ', type, params);
        const validation = Validate[type as keyof typeof Validate] as (
          value: string | string[] | number,
          ...args: any[]
        ) => string | null;
        if (validation) {
          const errorMessage = validation(value, ...Object.values(params));
          if (errorMessage) {
            setErrors(prevErrors => ({ ...prevErrors, [fieldId]: errorMessage }));
            return;
          }
        }
      }
      setErrors(prevErrors => ({ ...prevErrors, [fieldId]: null }));
    }
  };


  console.log('errors: ', errors);


  return (
    <ValidationContext.Provider value={{ errors, validate }}>
      {children}
    </ValidationContext.Provider>
  );
};

export const useValidation = () => {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
};
