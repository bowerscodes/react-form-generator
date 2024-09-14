import React from 'react';
import { 
  Checkboxes,
  CheckboxOption,
  DateInput,
  Radios,
  RadioOption,
  Select,
  SelectOption,
  TextArea,
  TextInput,
} from 'react-component-library';

import { InputField } from '../../types/FormTypes'
import useInputField, { InputChangeEvent } from './useInputField';

type OnChange = (
  event: InputChangeEvent
) => void;


export interface InputFieldWithOnChange extends InputField {
  onChange: OnChange;
}

const useGetInputField = (input: InputField, formDataValue: string | string[] | undefined, onChange: (event: InputChangeEvent) => void = () => {}, fieldErrors: string[] | undefined, fieldPropsInError: { [subKey: string]: boolean; }) => {
  
  const { fieldId, type, props } = input;
  const { getValue, handleChange } = useInputField(formDataValue, onChange);
  
  let inputValue: string | string[] | undefined;
  if (typeof getValue() === 'string' || Array.isArray(getValue())) {
    inputValue = getValue();
  }

  // console.log('useGetInputFieldErrors: ', fieldErrors);

  switch (type) {
    case 'checkboxes': {
      const checkboxOptions = props?.options as CheckboxOption[];
      return (
        <Checkboxes 
          fieldId={fieldId} 
          options={checkboxOptions} 
          value={inputValue as string[]} 
          onChange={handleChange} 
          errors={fieldErrors}
          {...props}
        />
      );
    }
    case 'date':
      return (
        <DateInput 
          fieldId={fieldId} 
          value={inputValue as string} 
          onChange={handleChange} 
          errors={fieldErrors}
          propsInError={fieldPropsInError}
          {...props} />
      );
    case 'radios': {
      const radioOptions = props?.options as RadioOption[];
      return <Radios fieldId={fieldId} options={radioOptions} value={inputValue as string} onChange={handleChange} {...props} />;
    }
    case 'select': {
      const selectOptions = props?.options as SelectOption[];
      return <Select fieldId={fieldId} options={selectOptions} value={inputValue} onChange={handleChange} {...props} />;
    }
    case 'textArea':
    case 'textarea':
      return (
        <TextArea 
          fieldId={fieldId} 
          value={inputValue as string} 
          onChange={handleChange} 
          {...props} 
        />
      );
    case 'text':
      return (
        <TextInput 
          fieldId={fieldId} 
          value={inputValue as string} 
          onChange={handleChange} 
          errors={fieldErrors}
          {...props} 
        />
      );
    default:
      if (process.env.NODE_ENV === 'development') {
        console.warn(`Component type ${type} not found`);
      }
      return null;
  }
};

export default useGetInputField;
