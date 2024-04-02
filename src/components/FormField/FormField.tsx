import React, { useState } from 'react';
import { Label } from 'react-component-library';

import { handleInputChange } from './handlers';
import useGetInputField, { InputField } from '../../utils/hooks/useGetInputField';
import { InputChangeEvent } from '../../utils/hooks/useInputField';

interface FormFieldProps {
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

  const handleChange = handleInputChange(setValue, inputField);
  
  if (process.env.NODE_ENV === 'development') {
    console.log(fieldId,': ',value);
  }

  const input = useGetInputField({ ...inputField, value }, handleChange);

  return(
    <div className={DEFAULT_CLASS}>
      {fieldLabel && <Label fieldId={fieldId}>{fieldLabel}</Label>}
      {input}
    </div>
  )
};

export default FormField;
