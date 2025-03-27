import React from "react";
import { Field } from "./types"; // Removed Section import since sections are commented out

interface FormDisplayProps {
  data: { fields: Field[] }; // Removed sections from the data type
}

const FormDisplay: React.FC<FormDisplayProps> = ({ data }) => {
  return (
    <div className="submitted-data">
      <h2>Submitted Data</h2>

      <h3>General Fields</h3>
      <ul>
        {data.fields.map((field) => (
          <li key={field.id}>
            <strong>{field.label}:</strong> {field.value || "N/A"}
          </li>
        ))}
      </ul>

      {/* Commented out section-related display */}
      {/**
      <h3>Sections</h3>
      {data.sections.map((section, index) => (
        <div key={index} className="section-display">
          <h4>{section.title}</h4>
          <ul>
            {section.fields.map((field) => (
              <li key={field.id}>
                <strong>{field.label}:</strong> {field.value || "N/A"}
              </li>
            ))}
          </ul>
        </div>
      ))}
      */}

      <h3>Raw JSON Output</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
};

export default FormDisplay;
