import React, { useState } from 'react';

import '@testing-library/jest-dom';
import { cleanup, fireEvent, render, screen, act } from '@testing-library/react';

describe('FormPage', () => {

  it('renders a FormPage component with a title and multiple sections', () => {
    const FormPage = () => {
      const sections = [
        {
          sectionId: 'yourDetails',
          sectionTitle: 'Your Details',
          sectionHint: 'Please enter your details below',
          fields: [
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
                onChange: jest.fn(),
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
                onChange: jest.fn(),
              }
            }
          ]
        },
        {
          sectionId: "services",
          sectionTitle: "Services",
          fields: [
            {
              fieldId: "serviceType",
              fieldLabel: "Which of our services are you interested in finding out more about?",
              inputField: {
                fieldId: "serviceType",
                type: "checkboxes",
                props: {
                  options: [
                    {
                      id: "designConsultancy",
                      value: "designConsultancy",
                      label: "Design Consultancy"
                    },
                    {
                      id: "softwareDevelopment",
                      value: "softwareDevelopment",
                      label: "Software Development"
                    },
                    {
                      id: "projectManagement",
                      value: "projectManagement",
                      label: "Project Management"
                    },
                    {
                      id: "brandManagement",
                      value: "brandManagement",
                      label: "Brand Management"
                    }
                  ],
                  required: true
                },
                onChange: jest.fn(),
              }
            }
          ]
        },
      ];

      return (
        <div>
          {sections.map((section, index) => (
            <div key={index}>
              <h2>{section.sectionTitle}</h2>
              <p>{section.sectionHint}</p>
              {section.fields.map((field, index) => (
                <div key={index}>
                  <label htmlFor={field.fieldId}>{field.fieldLabel}</label>
                  <input id={field.fieldId} type={field.inputField.type} required={field.inputField.props.required} onChange={field.inputField.onChange} />
                </div>
              ))}
            </div>
          ))}
        </div>
      )
    };

    render(
      <FormPage />
    );

    // Section 1
    expect(screen.getByText('Your Details')).not.toBeNull();
    expect(screen.getByText('First Name')).not.toBeNull();
    expect(screen.getByText('Last Name')).not.toBeNull();

    // Section 2
    expect(screen.getByText('Please enter your details below')).not.toBeNull();
    expect(screen.getByText('Which of our services are you interested in finding out more about?')).not.toBeNull();
  });
});
