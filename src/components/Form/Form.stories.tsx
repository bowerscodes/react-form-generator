import React from 'react';

import Form, { FormProps } from './Form';
import form from '../../data/MultiPageForm.json';

export default {
  title: 'Form',
  component: Form,
};

export const Default = () => {
  return <Form {...form} />;
};