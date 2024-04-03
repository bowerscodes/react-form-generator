import React, { useState } from 'react';
import { Heading, Hint } from 'react-component-library';

import FormField from '../FormField/FormField';
import { InputField } from '../../utils/hooks/useGetInputField';
import { FormFieldProps } from '../FormField/FormField';
import './FormSection.scss';


export interface FormSectionProps {
  sectionId: string;
  sectionTitle?: string;
  sectionHint?: string;
  fields: FormFieldProps[];
};


const FormSection = ({
  sectionId,
  sectionTitle,
  sectionHint,
  fields
}: FormSectionProps) => {
  
  const formFields = fields.map((field) => {
    const { fieldId, fieldLabel, inputField } = field;
    return <FormField key={fieldId} fieldId={fieldId} fieldLabel={fieldLabel} inputField={{...inputField}} />
  });

  return (
    <section id={sectionId}>
      <fieldset>
        {sectionTitle && <legend>{<Heading id={`${sectionId}--heading`}>{sectionTitle}</Heading>}</legend>}
        {sectionHint && <Hint id={`${sectionId}--hint`}>{sectionHint}</Hint>}
        {formFields}
      </fieldset>
    </section>
  )
};

export default FormSection;
