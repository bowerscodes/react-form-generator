import React, { useState } from 'react';
import { Heading } from 'react-component-library';

import FormField from '../FormField/FormField';
import { InputField } from '../../utils/hooks/useGetInputField';
import { FormFieldProps } from '../FormField/FormField';


export interface FormSectionProps {
  sectionId: string;
  sectionTitle?: string;
  fields: FormFieldProps[];
};



const FormSection = ({
  sectionId,
  sectionTitle,
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
        {formFields}
      </fieldset>
    </section>
  )
};

export default FormSection;
