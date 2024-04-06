import { handleInputChange } from './handlers';
import { InputFieldWithOnChange } from '@/utils/hooks/useGetInputField';
import { InputField } from '../../types/FormTypes';

describe('handleInputChange', () =>{

  let setValue: jest.Mock;
  let inputField: InputFieldWithOnChange;

  it('should handle a change event for a checkbox', () => {
      
    setValue = jest.fn();
    inputField = {
      fieldId: 'testFieldId',
      type: 'checkboxes',
      value: [],
      onChange: jest.fn(),
      props: {}
    };

    const event = {
      target: {
        type: 'checkbox',
        value: 'test',
        checked: true,
      },
    } as any;

    const formData = jest.fn();
    const setFormData = jest.fn();
  
    handleInputChange(inputField.fieldId, setValue, inputField, formData, setFormData)(event);
  
    expect(inputField.onChange).toHaveBeenCalledWith(event);
  });

  it('should handle a change event for a checked checkbox with array value', () => {
    const setValue = jest.fn();
    const inputField = {
      fieldId: 'testFieldId',
      type: 'checkbox',
      value: ['test'],
      onChange: jest.fn(),
      props: {}
    };
    const event = {
      target: {
        type: 'checkbox',
        value: 'test2',
        checked: true,
      },
    } as any;

    const formData = jest.fn();
    const setFormData = jest.fn();
  
    handleInputChange(inputField.fieldId, setValue, inputField, formData, setFormData)(event);
    
    expect(setValue).toHaveBeenCalledWith('test');
    expect(inputField.onChange).toHaveBeenCalledWith(event);
  });

  it('should handle a change event for an unchecked checkbox with array value', () => {
    const setValue = jest.fn();
    inputField = {
      fieldId: 'testFieldId',
      type: 'checkboxes',
      value: ['test'],
      onChange: jest.fn(),
      props: {}
    };

    const event = {
      target: {
        type: 'checkbox',
        value: 'test',
        checked: false,
      },
    } as any;
  
    const formData = jest.fn();
    const setFormData = jest.fn();
  
    handleInputChange(inputField.fieldId, setValue, inputField, formData, setFormData)(event);

    expect(setValue).toHaveBeenCalledWith('');
    expect(inputField.onChange).toHaveBeenCalledWith(event);
  });

  it('should handle a change event for a checked checkbox with non-array value', () => {
    const setValue = jest.fn();
    const inputField = {
      fieldId: 'testFieldId',
      type: 'checkboxes',
      value: 'test',
      onChange: jest.fn(),
      props: {}
    };

    const mockInput = document.createElement('input');
    mockInput.type = 'checkbox';
    mockInput.value = 'test2';
    mockInput.checked = true;

    const event = {
      target: mockInput,
    } as any;

    const formData = jest.fn();
    const setFormData = jest.fn();
  
    handleInputChange(inputField.fieldId, setValue, inputField, formData, setFormData)(event);
  
    expect(setValue).toHaveBeenCalledWith('test2');
    expect(inputField.onChange).toHaveBeenCalledWith(event);
  });

  it('should handle a change event for a checkbox with same new and current value', () => {
    const setValue = jest.fn();
    const inputField = {
      fieldId: 'testFieldId',
      type: 'checkboxes',
      value: ['test'],
      onChange: jest.fn(),
      props: {}
    };
    const event = {
      target: {
        type: 'checkbox',
        value: 'test',
        checked: false,
      },
    } as any;
  
    const formData = jest.fn();
    const setFormData = jest.fn();
  
    handleInputChange(inputField.fieldId, setValue, inputField, formData, setFormData)(event);

    expect(setValue).toHaveBeenCalledWith('');
    expect(inputField.onChange).toHaveBeenCalledWith(event);
  });

  it('should handle a change event for a checkbox when the value is not an array', () => {
      
    setValue = jest.fn();
    inputField = {
      fieldId: 'testFieldId',
      type: 'checkbox',
      value: 'test',
      onChange: jest.fn(),
      props: {}
    };

    const event = {
      target: {
        type: 'checkbox',
        value: 'test',
        checked: true,
      },
    } as any;
  
    const formData = jest.fn();
    const setFormData = jest.fn();
  
    handleInputChange(inputField.fieldId, setValue, inputField, formData, setFormData)(event);

    expect(inputField.onChange).toHaveBeenCalledWith(event);
  });

  it('should handle a change event for a non-checkbox input', () => {
      
    setValue = jest.fn();
    inputField = {
      fieldId: 'testFieldId',
      type: 'text',
      value: '',
      onChange: jest.fn(),
      props: {}
    };

    const event = {
      target: {
        value: 'test',
      },
    } as any;
  
    const formData = jest.fn();
    const setFormData = jest.fn();
  
    handleInputChange(inputField.fieldId, setValue, inputField, formData, setFormData)(event);

    expect(inputField.onChange).toHaveBeenCalledWith(event);
  });
});

