import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormSection from './FormSection';
import { FormSectionProps, FormFieldProps, InputField } from '../../types/FormTypes';

afterEach(cleanup);

describe('FormSection', () => {
  
    it('renders a FormSection component with a title and fields', () => {
      const fields: FormFieldProps[] = [
        {
          fieldId: 'firstName',
          fieldLabel: 'First Name',
          inputField: {
            fieldId: 'firstName',
            type: 'text',
            props: {
              label: 'First Name',
              required: true
            },
          }
        },
        {
          fieldId: 'lastName',
          fieldLabel: 'Last Name',
          inputField: {
            fieldId: 'lastName',
            type: 'text',
            props: {
              label: 'Last Name',
              required: true
            },
          }
        }
      ];

      const section: FormSectionProps = {
        sectionId: 'yourDetails',
        sectionTitle: 'Your Details',
        sectionHint: 'Please enter your details below',
        fields: fields
      };
  
      render(
        <FormSection
          sectionId={section.sectionId}
          sectionTitle={section.sectionTitle}
          sectionHint={section.sectionHint}
          fields={fields}
        />
      );
  
      expect(screen.getByText('Your Details')).not.toBeNull();
      expect(screen.getByText('Please enter your details below')).not.toBeNull();
      expect(screen.getByText('First Name')).not.toBeNull();
      expect(screen.getByText('Last Name')).not.toBeNull();
    });
  
    it('renders a FormSection component with multiple fields', () => {
      const fields = [
        {
          fieldId: 'test',
          fieldLabel: 'Test Field',
          inputField: {
            fieldId: 'test',
            type: 'text',
            props: {},
            value: '',
          }
        },
        {
          fieldId: 'test2',
          fieldLabel: 'Test Field 2',
          inputField: {
            fieldId: 'test2',
            type: 'text',
            props: {},
            value: '',
          }
        }
      ];
  
      render(
        <FormSection
          sectionId='test'
          sectionTitle='Test Section'
          fields={fields}
        />
      );
  
      expect(screen.getByText('Test Section')).not.toBeNull();
      expect(screen.getByText('Test Field')).not.toBeNull();
      expect(screen.getByText('Test Field 2')).not.toBeNull();
    });

});
