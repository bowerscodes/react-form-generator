import React, { useState} from 'react';

import Form from './Form';
import { FormProps } from '../../types/FormTypes';
import { FormDataContextProvider } from '../../context/FormDataContext';
import form from '../../data/MultiPageForm.json';

export default {
  title: 'Form',
  component: Form,
};

const Wrapper = () => {
  
    const [ formData, setFormData ] = useState({});
    const formAction = (data: { [key: string]: string | string[]; formId: string }) => {};
  
    return(
      <FormDataContextProvider formSchema={form}>
        <Form {...form} formAction={formAction} />
      </FormDataContextProvider>
    );
  
}

export const Default = () => <Wrapper />