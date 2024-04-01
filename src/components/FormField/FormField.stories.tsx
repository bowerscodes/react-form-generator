import React, { useState } from 'react';

import Page from '../../data/FormPage.json';
import FormField from './FormField';
import { InputChangeEvent } from '../../utils/hooks/useInputField';
import { toStringFromDate } from '../../utils/Component/date';

const text = Page.sections[0].fields;
const textArea = Page.sections[2].fields;
const date = text[2];
const checkboxes = Page.sections[1].fields;
const radios = Page.sections[4].fields;
const select = Page.sections[3].fields;

export default {
  title: 'Components/FormField',
  component: FormField,
};

export const Text = () => {

  const [ value, setValue ] = useState('')

  const handleChange = (event: InputChangeEvent) => {
    if (typeof event.target.value === 'string') {
      setValue(event.target.value);
    }
  };

  return (
    <FormField
      {...text[0]} 
      inputField={{...text[0].inputField, value, onChange: handleChange}}
    />
  )
}; 

export const TextArea = () => {

  const [ value, setValue ] = useState('')

  const handleChange = (event: InputChangeEvent) => {
    if (typeof event.target.value === 'string') {
      setValue(event.target.value);
    }
  };

  return (
    <FormField
      {...textArea[0]} 
      inputField={{...textArea[0].inputField, value, onChange: handleChange}}
    />
  )
};

export const Date = () => {

  const [ value, setValue ] = useState({ day: '', month: '', year: '' })

  const handleChange = (event: InputChangeEvent) => {
    if (typeof event.target.value === 'string') {
      const [day, month, year] = event.target.value.split('-');
      setValue({ day, month, year });
    }
    console.log(event.target.value)
  };


  return (
    <FormField
      {...date} 
      inputField={{...date.inputField, value: toStringFromDate(value), onChange: handleChange}}
    />
  )
};

export const Checkboxes = () => {

  const [ value, setValue ] = useState('')

  const handleChange = (event: InputChangeEvent) => {
    if (typeof event.target.value === 'string') {
      setValue(event.target.value);
    }
  };

  return (
    <FormField
      {...checkboxes[0]} 
      inputField={{...checkboxes[0].inputField, value, onChange: handleChange}}
    />
  )
};

export const Radios = () => {
  
  const [ value, setValue ] = useState('')

  const handleChange = (event: InputChangeEvent) => {
    if (typeof event.target.value === 'string') {
      setValue(event.target.value);
    }
  };

  return (
    <FormField
      {...radios[0]} 
      inputField={{...radios[0].inputField, value, onChange: handleChange}}
    />
  )
};

export const Select = () => {
  
  const [ value, setValue ] = useState('')

  const handleChange = (event: InputChangeEvent) => {
    if (typeof event.target.value === 'string') {
      setValue(event.target.value);
    }
  };

  return (
    <FormField
      {...select[0]} 
      inputField={{...select[0].inputField, value, onChange: handleChange}}
    />
  )
};

