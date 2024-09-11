import React from 'react';

import withFormDataContext from '../../../.storybook/withFormDataContext';
import withValidationContext from '../../../.storybook/withValidationContext';
import Form from '../../data/MultiPageForm.json';
import FormField from './FormField';


const text = Form.pages[0].sections[0].fields[0];
const textArea = Form.pages[2].sections[0].fields[0];
const date = Form.pages[0].sections[0].fields[2];
const checkboxes = Form.pages[1].sections[0].fields[0];
const radios = Form.pages[3].sections[1].fields[0];
const select = Form.pages[3].sections[0].fields[0];


export default {
  title: 'Components/FormField',
  component: FormField,
  decorators: [withFormDataContext, withValidationContext],
};


export const Text = () => {

  return (
    <FormField
      {...text} 
    />
  )
}; 

export const TextArea = () => {

  return (
    <FormField
      {...textArea} 
    />
  )
};

export const Date = () => {

  return (
    <FormField
      {...date} 
    />
  )
};

export const Checkboxes = () => {

  return (
    <FormField
      {...checkboxes} 
    />
  )
};

export const Radios = () => {

  return (
    <FormField
      {...radios} 
    />
  )
};

export const Select = () => {

  return (
    <FormField
      {...select} 
    />
  )
};

