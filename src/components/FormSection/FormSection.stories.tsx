import React, { useState } from 'react';

import withFormDataContext from '../../../.storybook/withFormDataContext';
import withValidationContext from '../../../.storybook/withValidationContext';
import Form from '../../data/MultiPageForm.json';
import Page from '../../data/FormPage.json';
import FormSection from './FormSection';
import FormField from '../FormField/FormField';
import { FormSectionProps, FormFieldProps } from '../../types/FormTypes';
import { InputChangeEvent } from '../../utils/hooks/useInputField';


export default {
  title: 'Components/FormSection',
  component: FormSection,
  decorators: [withFormDataContext, withValidationContext],
};

const section1 = Form.pages[0].sections[0];

const FieldWithHandlers: React.FC<FormFieldProps> = ({ fieldLabel, inputField }) => {
  const [ value, setValue ] = useState('');

  const handleChange = (event: InputChangeEvent) => {
    if (typeof event.target.value === 'string') {
      setValue(event.target.value);
    }
  };

  return (
    <FormField 
      {...inputField}
      fieldLabel={fieldLabel}
      inputField={{...inputField}}
    />
  );
};

// const fieldsWithHandlers: FormFieldProps[] = section1.fields.map((field, index) => {
//   return {
//     ...field,
//     fieldLabel: field.fieldLabel,
//     inputField : {
//       ...field.inputField,
//       onChange: (event: InputChangeEvent) => {
//         if (typeof event.target.value === 'string') {
//           if ('value' in field.inputField) {
//             field.inputField.value = event.target.value;
//           }
//         }
//       },
//     },
//     key: index
//   };
// });

const section = { ...section1};

export const Default = () => <FormSection {...section} />;
