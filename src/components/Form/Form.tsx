import React, { useContext, useState } from 'react';
import { ButtonGroup, Heading, Navigate } from 'react-component-library';

import FormPage from '../FormPage/FormPage';
import { FormProps, FormPageProps } from '../../types/FormTypes';
import { FormDataContext } from '../../context/FormDataContext';


export const DEFAULT_CLASS = 'form';

const Form = ({
  formId,
  formTitle,
  pages
}: FormProps) => {

  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('Form must be used within a FormDataContextProvider')
  };

  const [ currentPage, setCurrentPage ] = useState(0);

  const { formData, setFormData } = context;

  
  return(
    <div className={DEFAULT_CLASS} id={formId}>
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
    </div>
  );
};

export default Form;
