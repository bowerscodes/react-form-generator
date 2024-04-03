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

import useInputField, { InputChangeEvent } from './useInputField';

type OnChange = (
  event: InputChangeEvent
) => void;

export interface InputField {
  fieldId: string;
  type: string;
  props: Record<string, unknown>;
  value?: string | string[] | undefined;
  onChange: OnChange;
}

const useGetInputField = (input: InputField, onChange: (event: InputChangeEvent) => void) => {
  
  const { fieldId, type, props } = input;
  const { value, handleChange } = useInputField(input.value, onChange);
  
  let inputValue: string | string[] | undefined;
  if (typeof value === 'string' || Array.isArray(value)) {
    inputValue = value;
  }


  switch (type) {
    case 'checkboxes': {
      const checkboxOptions = props.options as CheckboxOption[];
      return (
        <Checkboxes 
          fieldId={fieldId} 
          options={checkboxOptions} 
          value={inputValue as string[]} 
          onChange={handleChange} 
          {...props}
        />
      );
    }
    case 'date':
      return <DateInput fieldId={fieldId} value={inputValue as string} onChange={handleChange} {...props} />;
    case 'radios': {
      const radioOptions = props.options as RadioOption[];
      return <Radios fieldId={fieldId} options={radioOptions} value={inputValue as string} onChange={handleChange} {...props} />;
    }
    case 'select': {
      const selectOptions = props.options as SelectOption[];
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
