import React from 'react';
import { Heading } from 'react-component-library';

import FormSection, { FormSectionProps } from '../FormSection/FormSection';
import './FormPage.scss';


interface FormPageProps {
  pageId: string;
  pageTitle?: string;
  sections: FormSectionProps[];
};

export const DEFAULT_CLASS = 'form-page';

const FormPage = ({
  pageId,
  pageTitle,
  sections,
}: FormPageProps) => {

  return (
    <div className={DEFAULT_CLASS} id={pageId}>
      {pageTitle && <Heading>{pageTitle}</Heading>}
      {sections.map((section, index) => <FormSection key={index} {...section} />)}
    </div>
  )
};

export default FormPage;
export type { FormPageProps };
