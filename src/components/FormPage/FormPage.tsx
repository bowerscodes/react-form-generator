import React from 'react';


type FormPage = {
  pageId: string;
  pageTitle?: string;
  sections: Array<Section> | Array<Field>; // This should be Section[] but we need to handle the case where the page has no sections and only fields
};

type Section = {
  sectionId: string;
  sectionTitle?: string;
  fields: Field[];
};

type Field = {
  fieldId: string;
  fieldLabel?: string;
  components: { type: string };
};

export const DEFAULT_CLASS = 'form-page';

const FormPage = ({
  pageId,
  pageTitle,
  sections,
}: FormPage) => {

  
  return (
    <div className={DEFAULT_CLASS} id={pageId}>
      {pageTitle && <h1>{pageTitle}</h1>}
      {}
    </div>
  )

};

export default FormPage;
