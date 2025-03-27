import React, { useState } from "react";
import DynamicField from "./components/DynamicField";
import NestedSection from "./components/NestedSection";
import FormDisplay from "./components/FormDisplay";
import { Field, Section } from "./components/types";
import "./styles.css";

const App: React.FC = () => {
  const [fields, setFields] = useState<Field[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const [submittedData, setSubmittedData] = useState<{ fields: Field[]; sections: Section[] } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Add Field (General)
  const addField = (type: string, label: string) => {
    const newField: Field =
      type === "gender"
        ? { id: Date.now(), type, label, value: "Male", options: ["Male", "Female", "Other"] }
        : { id: Date.now(), type, label, value: "" };
    setFields((prev) => [...prev, newField]);
  };

  // Remove Field (General)
  const removeField = (id: number) => {
    setFields((prev) => prev.filter((field) => field.id !== id));
  };

  // Add Section (With Fields)
  const addSection = () => {
    setSections((prev) => [
      ...prev,
      { id: Date.now(), title: "New Section", fields: [] },
    ]);
  };

  // Remove Section
  const removeSection = (id: number) => {
    setSections((prev) => prev.filter((section) => section.id !== id));
  };

  // Add Field inside a Section
  const addFieldToSection = (sectionId: number, type: string, label: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
            ...section,
            fields: [...section.fields, { id: Date.now(), type, label, value: "Male", options: ["Male", "Female", "Other"] }],
          }
          : section
      )
    );
  };

  // Remove Field from a Section
  const removeFieldFromSection = (sectionId: number, fieldId: number) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? { ...section, fields: section.fields.filter((field) => field.id !== fieldId) }
          : section
      )
    );
  };

  // Handle Form Submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setSubmittedData({ fields, sections }); // Store the submitted data
    setIsSubmitted(true); // Enable result display & JSON download
  };


  // Download JSON file
  const downloadJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ fields, sections }, null, 2));
    const anchor = document.createElement("a");
    anchor.href = dataStr;
    anchor.download = "form_data.json";
    anchor.click();
  };

  return (
    <div className="container">
      <h1 className="title">Dynamic Form Builder</h1>

      <div className="button-group">
        <button onClick={() => addField("text", "Full Name")}>➕ Add Name Field</button>
        <button onClick={() => addField("email", "Email Address")}>📧 Add Email Field</button>
        <button onClick={() => addField("number", "Phone Number")}>📞 Add Phone Number</button>
        <button onClick={() => addField("gender", "Gender")}>⚥ Add Gender</button>
        {/* <button onClick={addSection}>📂 Add Section</button> */}
      </div>

      <form onSubmit={handleSubmit} className="form">
        {fields.map((field, index) => (
          <div key={field.id} className="field-container">
            <DynamicField index={index} field={field} setFields={setFields} />
            <button type="button" onClick={() => removeField(field.id)} className="remove-btn">❌ Remove</button>
          </div>
        ))}

        {sections.map((section) => (
          <div key={section.id} className="section-container">
            <h2>{section.title}</h2>
            <div className="button-group">
              <button type="button" onClick={() => addFieldToSection(section.id, "text", "Full Name")}>➕ Add Name</button>
              <button type="button" onClick={() => addFieldToSection(section.id, "email", "Email Address")}>📧 Add Email</button>
              <button type="button" onClick={() => addFieldToSection(section.id, "number", "Phone Number")}>📞 Add Phone</button>
              <button type="button" onClick={() => addFieldToSection(section.id, "gender", "Gender")}>⚥ Add Gender</button>
            </div>
            {section.fields.map((field, index) => (
              <div key={field.id} className="field-container">
                <DynamicField index={index} field={field} setFields={() => { }} />
                <button type="button" onClick={() => removeFieldFromSection(section.id, field.id)} className="remove-btn">❌ Remove</button>
              </div>
            ))}
            <button type="button" onClick={() => removeSection(section.id)} className="remove-btn section-remove">🗑️ Remove Section</button>
          </div>
        ))}

        <button type="submit" className="submit-btn">🚀 Submit</button>
      </form>

      {isSubmitted && (
        <div className="submitted-data">
          <h2>Form Submission Result</h2>

          {/* Display Fields in Readable Text Format */}
          {submittedData?.fields.map((field) => (
            <p key={field.id}>
              <strong>{field.label}:</strong> {field.value}
            </p>
          ))}

          {/* Display Sections and their Fields */}
          {submittedData?.sections.map((section) => (
            <div key={section.id}>
              <h3>{section.title}</h3>
              {section.fields.map((field) => (
                <p key={field.id}>
                  <strong>{field.label}:</strong> {field.value}
                </p>
              ))}
            </div>
          ))}

          {/* Enable Download Button only after submission */}
          <button onClick={downloadJSON} className="download-btn">📥 Download JSON</button>
        </div>
      )}

    </div>
  );
};

export default App;
