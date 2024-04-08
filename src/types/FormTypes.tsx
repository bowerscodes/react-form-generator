export type FormData = {
  formId: string;
  [key: string]: string | string[];
};

export interface FormProps {
  formId: string;
  formTitle: string;
  pages: FormPageProps[];
  formAction?: ((date: { [ key: string]: string | string[]; formId: string; }) => void )| undefined;
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


export interface InputField {
  fieldId: string;
  type: string;
  props: Record<string, unknown>;
  value?: string | string[] | undefined;
};
