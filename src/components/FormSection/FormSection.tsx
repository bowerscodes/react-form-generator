import React, { useState } from 'react';
import { Heading, Hint } from 'react-component-library';

import FormField from '../FormField/FormField';
import { FormSectionProps, FormFieldProps, InputField } from '../../types/FormTypes';
import './FormSection.scss';


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
        {sectionTitle && <legend>{<Heading id={`${sectionId}--heading`} hNumber={'3'}>{sectionTitle}</Heading>}</legend>}
        {sectionHint && <Hint id={`${sectionId}--hint`}>{sectionHint}</Hint>}
        {formFields}
      </fieldset>
    </section>
  )
};

export default FormSection;
