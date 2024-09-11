import React from 'react';
import { StoryFn } from '@storybook/react';

import { FormDataContextProvider } from '../src/context/FormDataContext';
import { FormProps } from '../src/types/FormTypes';
import Page from '../src/data/FormPage.json';

const withFormDataContext = (storyFn: StoryFn<React.ReactNode>, context: any) => {
  console.log('context: ', context);
  return (
    <FormDataContextProvider>
      {storyFn(context.args, context)}
    </FormDataContextProvider>
  );
};

export default withFormDataContext;
