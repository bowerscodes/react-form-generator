import React, { useContext, useEffect, useState } from 'react';
import { Label } from 'react-component-library';

import { FormData, FormFieldProps, InputField } from '../../types/FormTypes';
import { handleInputChange } from './handlers';
import useGetInputField, { InputFieldWithOnChange } from '../../utils/hooks/useGetInputField';
import { InputChangeEvent } from '../../utils/hooks/useInputField';
import { FormDataContext } from '../../context/FormDataContext';
import './FormField.scss';



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

  const getFieldValue = (formData: FormData, fieldId: string): string | undefined => {
    const value = formData[fieldId];
    return Array.isArray(value) ? value.join(', ') : value;
  };

  const { formData, setFormData } = context

  const [ value, setValue ] = useState(getFieldValue(formData, fieldId) || inputField.value || '');

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
    }
  };
  
  const handleChange = handleInputChange(fieldId, setValue, inputFieldWithOnChange, setFormData, formData);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(fieldId,': ',value);
    console.log('formData: ', formData);
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
