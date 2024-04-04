import React, { useState } from 'react';
import { Label } from 'react-component-library';

import { handleInputChange } from './handlers';
import useGetInputField, { InputField, InputFieldWithOnChange } from '../../utils/hooks/useGetInputField';
import { InputChangeEvent } from '../../utils/hooks/useInputField';
import './FormField.scss';

export interface FormFieldProps {
  fieldId: string;
  fieldLabel?: string;
  inputField: InputField;
  value?: string | string[];
}

export const DEFAULT_CLASS = 'form-field';

const FormField = ({
  fieldId,
  fieldLabel,
  inputField,
}: FormFieldProps) => {

  const [ value, setValue ] = useState(inputField.value || '');

  const inputFieldWithOnChange: InputFieldWithOnChange = {
    ...inputField,
    onChange: (event: InputChangeEvent) => {}
  };
  
  const handleChange = handleInputChange(setValue, inputFieldWithOnChange);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(fieldId,': ',value);
  }

  const input = useGetInputField({ ...inputFieldWithOnChange, value }, handleChange);

  return(
    <div className={DEFAULT_CLASS}>
      {fieldLabel && <Label fieldId={fieldId}>{fieldLabel}</Label>}
      {input}
    </div>
  )
};

export default FormField;
