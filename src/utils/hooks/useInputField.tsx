import React, { useEffect, useState } from 'react';
import { CheckboxesEventTarget } from 'react-component-library';

export type InputChangeEvent =
  React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLTextAreaElement> |
  React.ChangeEvent<HTMLSelectElement> |
  React.ChangeEvent<CheckboxesEventTarget>;

export const useInputField = (formDataValue: string | string[] | undefined, onChange: (event: InputChangeEvent) => void) => {
  const [value, setValue] = useState(formDataValue || '');

  useEffect(() => {
    setValue(formDataValue || '');
  }, [formDataValue]);

  const handleChange = (event: InputChangeEvent) => {
    const target = event.target as InputChangeEvent['target'];

    if (Array.isArray(target.value)) {
      setValue(target.value.map((item: string | { value: string }) => {
        if (typeof item === 'object' && 'value' in item) {
          return item.value;
        }
        return String(item);
      }));
    }
    else {
      setValue(target.value);
    }
    onChange(event);
  };

  const getValue = () => value;

  return { getValue, handleChange };
};

export default useInputField;
