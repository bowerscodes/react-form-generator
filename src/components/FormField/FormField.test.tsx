import React from 'react';
import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FormField from './FormField';
import exp from 'constants';

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
          onChange: jest.fn(),
        }}
      />
    );

    expect (screen.getByRole('textbox')).not.toBeNull();
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
          onChange: jest.fn(),
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
          onChange: jest.fn(),
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
          onChange: jest.fn(),
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
            onChange: jest.fn(),
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
            onChange: jest.fn(),
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

    xit('handles checkbox value correctly when current value is an array', () => {
      const onChange = jest.fn();
      const { getAllByTestId } = render(
        <FormField 
          fieldId='CheckboxFieldId'
          fieldLabel='Checkbox'
          inputField={{
            fieldId: 'CheckboxFieldId',
            type: 'checkboxes',
            props: {
              options: [
                { id: 'checkboxes-yes', label: 'Yes', value: 'yes' },
                { id: 'checkboxes-no', label: 'No', value: 'no' },
              ],
            },
            value: [],
            onChange,
          }}
        />
      );
    
      const inputs = getAllByTestId(/CheckboxFieldId-/);
      inputs.forEach((input, index) => {
        act(() => {
          fireEvent.change(input, { target: { checked: true } });
          expect((input as HTMLInputElement).checked).toBe(true);
          expect(onChange).toHaveBeenNthCalledWith(index + 1, 'yes');
          fireEvent.change(input, { target: { checked: false } });
          expect((input as HTMLInputElement).checked).toBe(false);
        });
      });
    });
    
    xit('handles checkbox value correctly when current value is not an array', () => {
      const onChange = jest.fn();
      const field = render(
        <FormField 
          fieldId='CheckboxFieldId'
          fieldLabel='Checkbox'
          inputField={{
            fieldId: 'CheckboxFieldId',
            type: 'checkbox',
            props: {},
            value: 'value1',
            onChange,
          }}
        />
      );
    
      const input = field.getByLabelText('Checkbox');
      act(() => {
        fireEvent.click(input);
      });
      expect(onChange).toHaveBeenCalled();
    });

  });

});
