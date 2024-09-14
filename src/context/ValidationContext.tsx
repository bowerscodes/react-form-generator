import React, { createContext, useContext, useState } from 'react';

import { ValidationRule } from '../types/FormTypes';
import { Validate } from '../validators/Validate';
import { FormData, FormProps } from '../types/FormTypes';

type ValidationContextProps = {
  errors: { [key: string]: string[] };
  propsInError: { [key: string]: { [subKey: string]: boolean } };
  validate: (fieldId: string, value: string | string[] | number, type: string, validationRules?: any[]) => void;
};

export const ValidationContext = createContext<ValidationContextProps | undefined>(undefined);

export const ValidationContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [ errors, setErrors ] = useState<{ [key: string]: string[] }>({});
  const [ propsInError, setPropsInError ] = useState<{ [key: string]: { [subKey: string]: boolean } }>({});
  
  const validate = (fieldId: string, value: string | string[] | number, type: string, validationRules?: any[]) => {

    console.log('validationRules: ', validationRules);

    if (validationRules) {
      const fieldErrors: string[] = [];
      const fieldPropsInError: { [subKey: string]: boolean } = {};

      // Iterate over each validation rule in the array, and extract the type and params
      for (const rule of validationRules) {
        const { type, ...params } = rule;
        console.log('type, params: ', type, params);

        // Use the type to look up the corresponding validation function in the Validate object
        const validation = Validate[type as keyof typeof Validate] as (
          value: string | string[] | number,
          ...args: any[]
        ) => any;

        // If the validation function exists, call it with the value and params
        if (validation) {
          console.log('validation: ', validation);
          const validationResult = validation(value, ...Object.values(params));
          console.log('validationResult: ', validationResult);

          // If the validation function returns a truthy object, add the error to the fieldErrors array
          if (validationResult && typeof validationResult === 'object') {
            console.log('validationResult: ',validationResult);
            const { error, propsInError } = validationResult;
            console.log('error, propsInError: ', { error, propsInError });

            error && fieldErrors.push(error);
            console.log('fieldErrors: ', fieldErrors);

            // Iterate over the propsInError object and add each prop to the fieldPropsInError object
            Object.keys(propsInError).forEach((propInError) => {
              if (propsInError[propInError]) {
                console.log('propInError: ',propInError);
                fieldPropsInError[propInError] = true;
                console.log('fieldPropsInError: ', fieldPropsInError);
              }
            });
          }

          // If the validation function returns a string, add it to the fieldErrors array
          else if (typeof validationResult === 'string') {
            fieldErrors.push(validationResult);
          }
        }
      }
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors, [fieldId]: fieldErrors }
        console.log('fieldId, newErrors, prevErrors: ', fieldId, newErrors, prevErrors); 
        Object.keys(newErrors).forEach(key => {
          if (newErrors[key].length === 0) {
            delete newErrors[key];
          }
        });
        return newErrors;
      });

      setPropsInError((prevPropsInError) => {
        const newPropsInError = { ...prevPropsInError, [fieldId]: fieldPropsInError };
        Object.keys(newPropsInError).forEach(key => {
          if (Object.keys(newPropsInError[key]).length === 0) {
            delete newPropsInError[key];
          }
        });
        console.log('newPropsInError: ', newPropsInError);
        return newPropsInError;
      });
    }
  };

  console.log('propsInError: ', propsInError);


  console.log('errors: ', errors);


  return (
    <ValidationContext.Provider value={{ errors, propsInError, validate }}>
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
