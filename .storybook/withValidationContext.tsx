import React from 'react';
import { StoryFn } from '@storybook/react';

import { ValidationContextProvider } from '../src/context/ValidationContext';
import { ValidationRule } from '../src/types/FormTypes';
import { FormProps } from '../src/types/FormTypes';



const withValidationContext = (StoryFn: StoryFn<React.ReactNode>, context: any) => {  
  return (
    <ValidationContextProvider>
      {StoryFn(context.args, context)}
    </ValidationContextProvider>
  );
};

export default withValidationContext;
