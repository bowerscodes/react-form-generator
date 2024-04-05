import React from 'react';
import { render, screen } from '@testing-library/react';

import Form, { FormProps } from './Form';

describe('Form', () => {

  const checkPage = (page: any, pageId: string, pageTitle?: string) => {
    expect(page).not.toBeNull();
    expect(page.id).toEqual(pageId);
    if (pageTitle) {
      const title = page.childNodes[0] as HTMLElement;
      expect(title.textContent).toEqual(pageTitle);
      expect(screen.getByText(pageTitle).tagName).toEqual('H2');
    }
    return page;
  };

  const checkSection = (section: any, sectionId: string, sectionTitle?: string) => {
    expect(section).not.toBeNull();
    expect(section.id).toEqual(sectionId);
    if (sectionTitle) {
      const title = section.childNodes[0].childNodes[0] as HTMLElement;
      expect(title.textContent).toEqual(sectionTitle);
      expect(screen.getByText(sectionTitle).tagName).toEqual('H3');
    }
    return section;
  };

  const checkField = (field: any, fieldId: string, fieldLabel: string | undefined) => {
    expect(field).not.toBeNull();
    const label = field.childNodes[0] as HTMLElement;
    expect(label.textContent).toEqual(fieldLabel);
    expect(label.tagName).toEqual('LABEL');
    expect(label.getAttribute('for')).toEqual(fieldId);
    const input = field.childNodes[1] as HTMLElement;
    expect(input.id).toEqual(fieldId);
    return field;
  };


  it('renders a basic Form component', () => {
    
    const form: FormProps = {
      formId: 'testForm',
      pages: [
        {
          pageId: 'testPage1',
          pageTitle: 'Test Page1',
          sections: [
            {
              sectionId: 'testSection1',
              sectionTitle: 'Test Section1',
              fields: [
                {
                  fieldId: 'testField1',
                  fieldLabel: 'Test Field1',
                  inputField: {
                    fieldId: 'testField1',
                    type: 'text',
                    props: {},
                  }
                }
              ]
            }
          ]
        },
        {
          pageId: 'testPage2',
          pageTitle: 'Test Page2',
          sections: [
            {
              sectionId: 'testSection2',
              sectionTitle: 'Test Section2',
              fields: [
                {
                  fieldId: 'testField2',
                  fieldLabel: 'Test Field2',
                  inputField: {
                    fieldId: 'testField2',
                    type: 'date',
                    props: {},
                  }
                }
              ]
            }
          ]
        }
      ]
    };

    const { container } = render(<Form {...form} />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.id).toEqual('testForm');

    // Page 1
    const page1 = wrapper.childNodes[0] as HTMLElement;
    const page1Id = form.pages[0].pageId;
    const page1Title = form.pages[0].pageTitle;
    checkPage(page1, page1Id, page1Title);

    // Page 1 Section 1
    const page1Section1 = page1.childNodes[1] as HTMLElement;
    const page1Section1Id = form.pages[0].sections[0].sectionId;
    const page1Section1Title = form.pages[0].sections[0].sectionTitle;
    checkSection(page1Section1, page1Section1Id, page1Section1Title);

    // Page Section Field
    const page1Field = page1Section1.childNodes[0].childNodes[1] as HTMLElement;
    const page1FieldId = form.pages[0].sections[0].fields[0].fieldId;
    const page1FieldLabel = form.pages[0].sections[0].fields[0].fieldLabel;
    checkField(page1Field, page1FieldId, page1FieldLabel);
  });
})
