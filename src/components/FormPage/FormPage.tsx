import React, { useContext } from 'react';
import { Heading } from 'react-component-library';

import FormSection from '../FormSection/FormSection';
import { FormPageProps, FormSectionProps } from '../../types/FormTypes';
import { FormDataContext } from '../../context/FormDataContext';
import './FormPage.scss';


export const DEFAULT_CLASS = 'form-page';

const FormPage = ({
  pageId,
  pageTitle,
  sections,
}: FormPageProps) => {

  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error('FormPage must be used within a FormDataContextProvider')
  }

  const { formData, setFormData } = context;

  return (
    <div className={DEFAULT_CLASS} id={pageId}>
      {pageTitle && <Heading hNumber='2'>{pageTitle}</Heading>}
      {sections.map((section, index) => <FormSection key={index} {...section} />)}
    </div>
  )
};

export default FormPage;
export type { FormPageProps };
