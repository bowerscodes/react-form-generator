import React, { useState } from 'react';
import { StoryFn } from '@storybook/react';

import withFormDataContext from '../../../.storybook/withFormDataContext';
import Page from '../../data/FormPage.json';
import FormField from './FormField';
import { InputChangeEvent } from '../../utils/hooks/useInputField';
import { toStringFromDate } from '../../utils/Component/date';

const text = Page.sections[0].fields[0];
const textArea = Page.sections[2].fields[0];
const date = Page.sections[0].fields[2];
const checkboxes = Page.sections[1].fields[0];
const radios = Page.sections[4].fields[0];
const select = Page.sections[3].fields[0];


export default {
  title: 'Components/FormField',
  component: FormField,
  decorators: [withFormDataContext],
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

