import React, { useState } from 'react';

import Page from '../../data/FormPage.json';
import FormSection from './FormSection';
import FormField from '../FormField/FormField';
import { FormSectionProps, FormFieldProps } from '../../types/FormTypes';
import { InputChangeEvent } from '../../utils/hooks/useInputField';


export default {
  title: 'Components/FormSection',
  component: FormSection,
};

const section1 = Page.sections[0];

const FieldWithHandlers: React.FC<FormFieldProps> = ({ inputField }) => {
  const [ value, setValue ] = useState('');

  const handleChange = (event: InputChangeEvent) => {
    if (typeof event.target.value === 'string') {
      setValue(event.target.value);
    }
  };

  return (
    <FormField 
      {...inputField}
      inputField={{...inputField}}
    />
  );
};

const fieldsWithHandlers: FormFieldProps[] = section1.fields.map((field, index) => {
  return {
    ...field,
    inputField : {
      ...field.inputField,
      onChange: (event: InputChangeEvent) => {
        if (typeof event.target.value === 'string') {
          if ('value' in field.inputField) {
            field.inputField.value = event.target.value;
          }
        }
      },
    },
    key: index
  };
});

const section = { ...section1};

export const Default = () => <FormSection {...section} />;
