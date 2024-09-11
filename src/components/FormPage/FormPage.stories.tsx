import React from 'react';

import withFormDataContext from '../../../.storybook/withFormDataContext';
import withValidationContext from '../../../.storybook/withValidationContext';
import FormPage from './FormPage';
import page from '../../data/FormPage.json';
import { InputChangeEvent } from '../../utils/hooks/useInputField';
import { FormDataContextProvider } from '../../context/FormDataContext';
import { ValidationContextProvider } from '../../context/ValidationContext';

export default {
  title: 'Components/FormPage',
  component: FormPage,
  decorators: [withFormDataContext, withValidationContext],
};

export const Default = () => {
  
  const pageWithOnChange = {
    ...page,
    sections: page.sections.map(section => ({
      ...section,
      fields: section.fields.map(field => ({
        ...field,
        inputField: {
          ...field.inputField,
          onChange: (event: InputChangeEvent) => {
            if (typeof event.target.value === 'string') {
              if ('value' in field.inputField) {
                field.inputField.value = event.target.value;
              }
            }
          }
        }
      }))
    }))
  };

  return (
    <FormDataContextProvider>
      <ValidationContextProvider>
        <FormPage {...pageWithOnChange}/>
      </ValidationContextProvider>
    </FormDataContextProvider>
  )

};
