import React, { useContext, useEffect, useState } from 'react';
import { Label } from 'react-component-library';

import { handleInputChange } from './handlers';
import useGetInputField, { InputField, InputFieldWithOnChange } from '../../utils/hooks/useGetInputField';
import { InputChangeEvent } from '../../utils/hooks/useInputField';
import { FormDataContext } from '../../context/FormDataContext';
import './FormField.scss';

export interface FormFieldProps {
  fieldId: string;
  fieldLabel?: string;
  inputField: InputField;
  value?: string | string[];
}

type FormData = {
  [key: string]: string | string[];
}

export const DEFAULT_CLASS = 'form-field';

const FormField = ({
  fieldId,
  fieldLabel,
  inputField,
}: FormFieldProps) => {

  const context = useContext(FormDataContext) as { formData: FormData, setFormData: Function } | undefined;
  if (!context) {
    throw new Error('FormField must be used within a FormDataContextProvider')
  };

  const { formData, setFormData } = context

  const [ value, setValue ] = useState(inputField.value || '');
  console.log('initialValue: ', value)

  useEffect(() => {
    if(formData[fieldId]) {
      setValue(formData[fieldId])
    }
  }, [formData, fieldId])

  const inputFieldWithOnChange: InputFieldWithOnChange = {
    ...inputField,
    onChange: (event: InputChangeEvent) => {
      setValue(event.target.value);
      setFormData({
        ...formData, 
        [fieldId]: event.target.value 
      });
      console.log('Updated value: ', event.target.value);
      console.log('Updated formData: ', formData)
    }
  };
  
  const handleChange = handleInputChange(setValue, inputFieldWithOnChange);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(fieldId,': ',value);
  }

  const input = useGetInputField({ ...inputFieldWithOnChange, value: formData[fieldId] }, formData[fieldId], handleChange);

  return(
    <div className={DEFAULT_CLASS}>
      {fieldLabel && <Label fieldId={fieldId}>{fieldLabel}</Label>}
      {input}
    </div>
  )
};

export default FormField;
