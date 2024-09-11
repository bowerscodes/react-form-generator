import React, { createContext, ReactNode, useState } from 'react';

import { FormData, FormProps } from '../types/FormTypes';

interface FormDataContextProps {
  // formSchema: FormProps;
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<{ [key: string]: string | string[] }>>;
};

// const createInitialContext = (): { 
//   [key: string]: string | string[] 
// } => {
//   let formData: { [key: string]: string | string[] } = {};

//   return formData;
// };

export const FormDataContext = createContext<FormDataContextProps | undefined>(undefined);

interface FormDataContextProviderProps {
  children: React.ReactNode
  // formSchema: FormProps
};

export const FormDataContextProvider = ({ children }: FormDataContextProviderProps) => {
  // const initialContext = createInitialContext()
  const [formData, setFormData] = useState<{ [key: string]: string | string[] }>({});
  // console.log('formSchema: ', formSchema);

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
