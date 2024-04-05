import React, { useState } from 'react';
import { ButtonGroup, Heading, Navigate } from 'react-component-library';

import FormPage, {FormPageProps} from '../FormPage/FormPage';

export interface FormProps {
  formId: string;
  formTitle?: string;
  pages: FormPageProps[];
};

export const DEFAULT_CLASS = 'form';

const Form = ({
  formId,
  formTitle,
  pages
}: FormProps) => {

  const [ currentPage, setCurrentPage ] = useState(0);

  
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
