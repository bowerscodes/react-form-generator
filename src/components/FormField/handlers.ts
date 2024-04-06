import { InputChangeEvent } from '../../utils/hooks/useInputField';
import { InputFieldWithOnChange } from '../../utils/hooks/useGetInputField';


const handleInputChange = (
  fieldId: string,
  setValue: React.Dispatch<React.SetStateAction<string | string[]>>, 
  inputField: InputFieldWithOnChange,
  setFormData: React.Dispatch<React.SetStateAction<Object | Array<Object>>>,
  formData: Object | Array<Object>,
  ) => {
  return (event: InputChangeEvent) => {
    const target = event.target as InputChangeEvent['target'];
    
    // If the input field is a checkbox, we need to handle the value differently
    if ('type' in target && target.type === 'checkbox') {
      let newValue: string[] = [];
  
      // If the current value is an array, we need to copy it
      if (Array.isArray(inputField.value)) {
        newValue = [...inputField.value];
  
        // If the checkbox is checked, add the value to the array
        if (target instanceof HTMLInputElement && target.checked) {
          newValue.push(target.value);
        }
        // If the checkbox is unchecked, remove the value from the array
        else {
          newValue = newValue.filter(value => value !== target.value);
        }
      }
      // If the current value is not an array, we create a new one
      else {
        if (target instanceof HTMLInputElement && target.checked) {
          newValue = [target.value];
        }
      }
      // Join the array into a string, and if the new value is different 
      // from the current value, update the state
      const newEventValue = newValue.join(',');
      if (newEventValue !== target.value) {
        setValue(newEventValue);
      }
      else {
        setValue(target.value);
      }
      inputField.onChange(event);

      setFormData(prevFormData => ({
        ...prevFormData,
        [fieldId]: newEventValue
      }));
    }
    // For all other Inputs
    else {
      setValue(target.value);
      inputField.onChange(event);

      setFormData(prevFormData => ({
        ...prevFormData,
        [fieldId]: target.value
      }));
    }
  };
};

export { handleInputChange };
