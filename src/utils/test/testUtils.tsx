import { render, RenderOptions, RenderResult } from '@testing-library/react';
import React, { ReactElement } from 'react';

import { FormDataContextProvider } from '../../context/FormDataContext';
import { ValidationContextProvider } from '../../context/ValidationContext';
import { FormFieldProps } from '../../types/FormTypes';


const customRender = (ui: ReactElement, options?: RenderOptions): RenderResult => {
  const formSchema = {
    formId: 'test-form',
    formTitle: 'Test Form',
    pages: [
      {
        pageId: 'test-page',
        pageTitle: 'Test Page',
        sections: [
          {
            sectionId: 'test-section',
            sectionTitle: 'Test Section',
            fields: [
              {
                fieldId: 'test-field',
                fieldLabel: 'Test Field',
                inputField: {
                  fieldId: "testFieldId",
                  type: "text",
                  props: {} as Record<string, unknown>,
                },
              }
            ]
          }
        ]
      }
    ]
  };

  return render(
    <FormDataContextProvider>
      <ValidationContextProvider>
        {ui}
      </ValidationContextProvider>
    </FormDataContextProvider>,
    options
  );
};

// Re-export everything
export * from '@testing-library/react';

// Override render method
export { customRender as render };
