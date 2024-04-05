import React, { useState} from 'react';

import { FormDataContextProvider } from '../../context/FormDataContext';
import Form, { FormProps } from './Form';
import form from '../../data/MultiPageForm.json';

export default {
  title: 'Form',
  component: Form,
};

const Wrapper = () => {
  
    const [ formData, setFormData ] = useState({});
  
    return(
      <FormDataContextProvider>
        <Form {...form} />
      </FormDataContextProvider>
    );
  
}

export const Default = () => <Wrapper />