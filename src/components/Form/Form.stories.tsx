import React, { useState} from 'react';

import Form from './Form';
import { FormProps } from '../../types/FormTypes';
import { FormDataContextProvider } from '../../context/FormDataContext';
import { ValidationContextProvider } from '../../context/ValidationContext';
import form from '../../data/MultiPageForm.json';
import withFormDataContext from '../../../.storybook/withFormDataContext';
import withValidationContext from '../../../.storybook/withValidationContext';

export default {
  title: 'Form',
  component: Form,
  decorators: [withFormDataContext, withValidationContext],
};

const Wrapper = () => {
  
    // const [ formData, setFormData ] = useState({});
    const formAction = (data: { [key: string]: string | string[]; }) => {};
  
    return(
      <FormDataContextProvider>
        <ValidationContextProvider>
          <Form {...form} formAction={formAction} />
        </ValidationContextProvider>
      </FormDataContextProvider>
    );
  
}

export const Default = () => <Wrapper />
