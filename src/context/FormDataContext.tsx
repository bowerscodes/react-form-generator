import React, { createContext } from 'react';

import { FormData, FormProps } from '../types/FormTypes';

interface FormDataContextProps {
  formSchema: FormProps;
  formData: { formId: string, [key: string]: string | string[] };
  setFormData: React.Dispatch<React.SetStateAction<{ formId: string, [key: string]: string | string[] }>>;
};

const createInitialContext = (formSchema: FormProps): { 
  formId: string,
  [key: string]: string | string[] 
} => {
  let formData: { formId: string, [key: string]: string | string[] } = { formId: formSchema.formId};

  formSchema.pages.forEach(page => {
    page.sections.forEach(section => {
      section.fields.forEach(field => {
        formData[field.fieldId] = Array.isArray(field.value) ? field.value.join(', ') : field.value || '';
      });
    });
  });

  return formData;
};

export const FormDataContext = createContext<FormDataContextProps | undefined>(undefined);

interface FormDataContextProviderProps {
  children: React.ReactNode
  formSchema: FormProps
};

export const FormDataContextProvider: React.FC<FormDataContextProviderProps> = ({ children, formSchema }) => {
  const initialContext = createInitialContext(formSchema)
  const [formData, setFormData] = React.useState<{ formId: string, [key: string]: string | string[] }>(initialContext);

  return (
    <FormDataContext.Provider value={{ formSchema, formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
