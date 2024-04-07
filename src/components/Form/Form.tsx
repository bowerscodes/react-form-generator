import React, { useContext, useState } from 'react';
import { ButtonGroup, Heading, Navigate } from 'react-component-library';

import FormPage from '../FormPage/FormPage';
import { FormProps, FormPageProps } from '../../types/FormTypes';
import { FormDataContext } from '../../context/FormDataContext';


export const DEFAULT_CLASS = 'form';


const Form = ({
  formId,
  formTitle,
  pages,
  formAction
}: FormProps) => {

  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('Form must be used within a FormDataContextProvider')
  };
  
  const { formData, setFormData } = context;
  const [ currentPage, setCurrentPage ] = useState(0);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formDataObj = new FormData();
    for (const key in formData) {
      if (Array.isArray(formData[key])) {
        (formData[key] as string[]).forEach((value: string) => {
          formDataObj.append(key, value);
        });
      }
      else {
        formDataObj.append(key, formData[key] as string);
      }
    }
    if (formAction) {
      formAction(formData);
    }
    else {
      alert('Form submitted: ' + JSON.stringify(formData));
    }
  };

  return(
    <div className={DEFAULT_CLASS} id={formId}>
      <form onSubmit={handleSubmit}>
        {formTitle && <Heading hNumber='1'>{formTitle}</Heading>}
        <FormPage key={`formPage--${pages[currentPage]}`} {...pages[currentPage]} />
        {pages.length > 1 && 
          <Navigate 
            label={'Navigation'}
            navItems={pages}
            currentIndex={currentPage}
            setCurrent={setCurrentPage}
          />
        }
      </form>
    </div>
  );
};

export default Form;
