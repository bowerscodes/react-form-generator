import React, { useContext, useEffect, useState } from 'react';
import { Label } from 'react-component-library';

import { FormFieldProps, InputField } from '../../types/FormTypes';
import { handleInputChange } from './handlers';
import useGetInputField, { InputFieldWithOnChange } from '../../utils/hooks/useGetInputField';
import { InputChangeEvent } from '../../utils/hooks/useInputField';
import { FormDataContext } from '../../context/FormDataContext';
import './FormField.scss';


type FormData = {
  [key: string]: string | string[];
}

export const DEFAULT_CLASS = 'form-field';

const FormField = ({
  fieldId,
  fieldLabel,
  inputField,
}: FormFieldProps) => {

  const context = useContext(FormDataContext) as { formData: FormData, setFormData: React.Dispatch<React.SetStateAction<Object | Array<Object>>> } | undefined;
  if (!context) {
    throw new Error('FormField must be used within a FormDataContextProvider')
  };

  const { formData, setFormData } = context

  const [ value, setValue ] = useState(inputField.value || '');
  console.log('initialValue: ', value)

  useEffect(() => {
    if(formData[fieldId]) {
      console.log('formData[fieldId]: ', formData[fieldId])
      console.log('value before update: ', value)
      setValue(formData[fieldId])
      console.log('value after update: ', value)
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
  
  const handleChange = handleInputChange(fieldId, setValue, inputFieldWithOnChange, setFormData, formData);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(fieldId,': ',value);
  }

  const input = useGetInputField({ ...inputFieldWithOnChange, value }, value, handleChange);

  return(
    <div className={DEFAULT_CLASS}>
      {fieldLabel && <Label fieldId={fieldId}>{fieldLabel}</Label>}
      {input}
    </div>
  )
};

export default FormField;
