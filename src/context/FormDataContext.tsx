import React, { createContext } from 'react';

interface FormDataContextProps {
  formData: Object | Array<Object>;
  setFormData: React.Dispatch<React.SetStateAction<Object | Array<Object>>>;
}

export const FormDataContext = createContext<FormDataContextProps | undefined>(undefined);

interface FormDataContextProviderProps {
  children: React.ReactNode
}

export const FormDataContextProvider: React.FC<FormDataContextProviderProps> = ({ children }) => {

  const [formData, setFormData] = React.useState<Object | Array<Object>>({});

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
