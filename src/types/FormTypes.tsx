
export type FormData = {
  [key: string]: string | string[];
};

export interface FormProps {
  formId: string;
  formTitle: string;
  pages: FormPageProps[];
  formAction?: ((date: { [ key: string]: string | string[]; }) => void )| undefined;
};

export interface FormPageProps {
  pageId: string;
  pageTitle?: string;
  sections: FormSectionProps[];
};

export interface FormSectionProps {
  sectionId: string;
  sectionTitle?: string;
  sectionHint?: string;
  fields: FormFieldProps[];
};

export interface FormFieldProps {
  fieldId: string;
  fieldLabel: string;
  inputField: InputField;
  value?: string | string[];
};

export interface ValidationRule {
  type: string;
  errorMessage: string;
  args?: any
};

export interface InputField {
  fieldId: string;
  type: string;
  props?: Record<string, unknown>;
  value?: string | string[] | undefined;
  validation?: Array<Object>;
  errors?: string[];
};
