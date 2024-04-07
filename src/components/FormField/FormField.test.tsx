import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormField from './FormField';
import { render } from '../../utils/test/testUtils';

afterEach(cleanup);

describe('FormField', () => {

  it('renders a basic FormField component with label', () => {
    render(
      <FormField
        fieldId='test'
        fieldLabel='Test Field'
        inputField={{
          fieldId: 'test',
          type: 'text',
          props: {},
          value: '',
        }}
      />
    );

    expect(screen.getByRole('textbox')).not.toBeNull();
    expect(screen.getByText('Test Field')).not.toBeNull();

  });

  it('renders a FormField component with a TextInput, which handles a change to its value', () => {
    const field = render(
      <FormField 
        fieldId='TextInputFieldId'
        fieldLabel='TextInput'
        inputField={{
          fieldId: 'TextInputFieldId',
          type: 'text',
          props: {},
          value: '',
        }}
      />
    );

    const input = field.getByLabelText('TextInput');
    expect((input as HTMLInputElement).value).toEqual('');

    fireEvent.change(input, { target: { value: 'test' } });
    expect((input as HTMLInputElement).value).toEqual('test');

    fireEvent.change(input, { target: { value: 'test2' } });
    expect((input as HTMLInputElement).value).toEqual('test2');
  });
  

  it('renders a FormField component with a TextArea, which handles a change to its value', () => {
    
    const fieldId = 'TextAreafieldId';

    const field = render(
      <FormField 
        fieldId={fieldId}
        fieldLabel='TextArea'
        inputField={{
          fieldId: fieldId,
          type: 'textarea',
          props: {},
          value: '',
        }}
      />
    );

    const input = field.getByLabelText('TextArea');
    
    fireEvent.change(input, { target: { value: 'Hello world!' } });
    expect((input as HTMLTextAreaElement).value).toEqual('Hello world!');

    fireEvent.change(input, { target: { value: 'Goodbye world!' } });
    expect((input as HTMLTextAreaElement).value).toEqual('Goodbye world!');
  });

  it('renders a FormField component with a DateInput, which handles a change to its value', () => {
    
    const fieldId = 'DateInputFieldId';
    
    const field = render(
      <FormField 
        fieldId={fieldId}
        fieldLabel='DateInput'
        inputField={{
          fieldId: fieldId,
          type: 'date',
          props: {},
          value: '',
        }}
      />
    );

    const input = field.container.querySelector(`#${fieldId}`) as HTMLInputElement;

    const day = input.querySelector(`#${fieldId}-day`);
    const month = input.querySelector(`#${fieldId}-month`);
    const year = input.querySelector(`#${fieldId}-year`);

    if (day && month && year) {

      fireEvent.change(day, { target: { value: '01' } });
      fireEvent.change(month, { target: { value: '02' } });
      fireEvent.change(year, { target: { value: '2021' } });
      
      expect((day as HTMLInputElement).value).toEqual('01');
      expect((month as HTMLInputElement).value).toEqual('02');
      expect((year as HTMLInputElement).value).toEqual('2021');
    }
    else {
      throw new Error('Date input fields not found');
    }
  });

  it('renders a FormField component with a Select, which handles a change to its value', () => {
    
    const fieldId = 'SelectFieldId';
    
    const field = render(
      <FormField 
        fieldId={fieldId}
        fieldLabel='Select'
        inputField={{
          fieldId: fieldId,
          type: 'select',
          props: {
            options: [
              { label: 'Option 1', value: 'option1' },
              { label: 'Option 2', value: 'option2' },
              { label: 'Option 3', value: 'option3' },
            ],
          },
          value: '',
        }}
      />
    );

    const select = field.getByLabelText('Select') as HTMLSelectElement;

    expect(select.value).toEqual('');

    fireEvent.change(select, { target: { value: 'option2' } });
    expect(select.value).toEqual('option2');

    fireEvent.change(select, { target: { value: 'option3' } });
    expect(select.value).toEqual('option3');
  });

  it('renders a FormField component with Radios, which handles a change to its value', () => {
    
    const fieldId = 'RadiosFieldId';
    
    const field = render(
      <FormField 
        fieldId={fieldId}
        fieldLabel='Radios'
        inputField={{
          fieldId: fieldId,
          type: 'radios',
          props: {
            options: [
              { label: 'Option 1', value: 'option1', id: 'option1' },
              { label: 'Option 2', value: 'option2', id: 'option2' },
              { label: 'Option 3', value: 'option3', id: 'option3'},
            ],
          },
          value: '',
        }}
      />
    );

    const option1 = field.getByLabelText('Option 1');
    const option2 = field.getByLabelText('Option 2');
    const option3 = field.getByLabelText('Option 3');

    expect((option1 as HTMLInputElement).checked).toEqual(false);
    expect((option2 as HTMLInputElement).checked).toEqual(false);
    expect((option3 as HTMLInputElement).checked).toEqual(false);

    fireEvent.click(option1);
    expect((option1 as HTMLInputElement).checked).toEqual(true);
    expect((option2 as HTMLInputElement).checked).toEqual(false);
    expect((option3 as HTMLInputElement).checked).toEqual(false);

    fireEvent.click(option2);
    expect((option1 as HTMLInputElement).checked).toEqual(false);
    expect((option2 as HTMLInputElement).checked).toEqual(true);
    expect((option3 as HTMLInputElement).checked).toEqual(false);

    fireEvent.click(option3);
    expect((option1 as HTMLInputElement).checked).toEqual(false);
    expect((option2 as HTMLInputElement).checked).toEqual(false);
    expect((option3 as HTMLInputElement).checked).toEqual(true);
  });
  
  describe('Checkboxes', () => {
    
    it('renders checkbox input', () => {
      const field = render(
        <FormField 
          fieldId='CheckboxFieldId'
          fieldLabel='Checkbox'
          inputField={{
            fieldId: 'CheckboxFieldId',
            type: 'checkbox',
            props: {},
            value: 'value1',
          }}
        />
      );
    
      expect(field.getByText('Checkbox')).toBeInTheDocument();
    });

    it('renders a FormField component with Checkboxes, and handles a change to its value', () => {
      const fieldId = 'CheckboxesFieldId';
      const field = render(
        <FormField 
          fieldId={fieldId}
          fieldLabel='Checkboxes'
          inputField={{
            fieldId: fieldId,
            type: 'checkboxes',
            props: {
              options: [
                { label: 'Option 1', value: 'option1' },
                { label: 'Option 2', value: 'option2' },
                { label: 'Option 3', value: 'option3' },
              ],
            },
            value: [],
          }}
        />
      );
  
      const option1 = field.getByLabelText('Option 1');
      const option2 = field.getByLabelText('Option 2');
      const option3 = field.getByLabelText('Option 3');
  
      expect((option1 as HTMLInputElement).checked).toEqual(false);
      expect((option2 as HTMLInputElement).checked).toEqual(false);
      expect((option3 as HTMLInputElement).checked).toEqual(false);
  
      fireEvent.click(option1);
      expect((option1 as HTMLInputElement).checked).toEqual(true);
      fireEvent.click(option1);
      expect((option1 as HTMLInputElement).checked).toEqual(false);
  
      fireEvent.click(option2);
      expect((option2 as HTMLInputElement).checked).toEqual(true);
  
      fireEvent.click(option3);
      expect((option3 as HTMLInputElement).checked).toEqual(true);
    });
  });
});
