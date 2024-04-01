// useInputField.ts
import React, { useState } from 'react';
import { CheckboxesEventTarget } from 'react-component-library';

export type InputChangeEvent =
  React.ChangeEvent<HTMLInputElement> |
  React.ChangeEvent<HTMLTextAreaElement> |
  React.ChangeEvent<HTMLSelectElement> |
  React.ChangeEvent<CheckboxesEventTarget>;

export const useInputField = (initialValue: string | number | string[] | undefined, onChange: (event: InputChangeEvent) => void) => {
  const [value, setValue] = useState<string | number | string[] | undefined>(initialValue || '');

  const handleChange = (event: InputChangeEvent) => {
    const target = event.target as InputChangeEvent['target'];

    if (Array.isArray(target.value)) {
      setValue(target.value.map((item: string | number | { value: string }) => {
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

  return { value, handleChange };
};

export default useInputField;
