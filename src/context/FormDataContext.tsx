import React, { createContext } from 'react';

import { FormProps } from '../types/FormTypes';

interface FormDataContextProps {
  formSchema: FormProps;
  formData: Object | Array<Object>;
  setFormData: React.Dispatch<React.SetStateAction<Object | Array<Object>>>;
};

const createInitialContext = (formSchema: FormProps): Object => {
  return {
    formId: formSchema.formId,
    pages: formSchema.pages.map((page) => ({
      pageId: page.pageId,
      sections: page.sections.map((section) => ({
        sectionId: section.sectionId,
        fields: section.fields.reduce((acc, field) => ({
          ...acc,
          [field.fieldId]: field.value || ''
        }), {})
      }))
    }))
  };
};

export const FormDataContext = createContext<FormDataContextProps | undefined>(undefined);

interface FormDataContextProviderProps {
  children: React.ReactNode
  formSchema: FormProps
};

export const FormDataContextProvider: React.FC<FormDataContextProviderProps> = ({ children, formSchema }) => {
  const initialContext = createInitialContext(formSchema)
  const [formData, setFormData] = React.useState<Object | Array<Object>>(initialContext);
  console.log('formData: ', formData);

  return (
    <FormDataContext.Provider value={{ formSchema, formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};
