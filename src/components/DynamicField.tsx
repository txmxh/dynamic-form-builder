import React from "react";
import { Field } from "./types";

interface DynamicFieldProps {
    index: number;
    field: Field;
    setFields: React.Dispatch<React.SetStateAction<Field[]>>;
  }
  
  const DynamicField: React.FC<DynamicFieldProps> = ({ index, field, setFields }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = field.type === "checkbox" ? e.target.checked : e.target.value;
  
      setFields((prevFields) =>
        prevFields.map((f, i) => (i === index ? { ...f, value: newValue } : f))
      );
    };
  
    return (
      <div className="field-group">
        <label>{field.label}</label>
  
        {/* Check if field type is 'gender', then render radio buttons */}
        {field.type === "gender" ? (
          <div>
            {["Male", "Female", "Other"].map((option) => (
              <label key={option}>
                <input
                  type="radio"
                  name={`gender-${field.id}`} // Ensure unique group for gender field
                  value={option}
                  checked={field.value === option}
                  onChange={handleChange}
                />
                {option}
              </label>
            ))}
          </div>
        ) : (
          // Default input for other fields
          <input
            type={field.type}
            value={field.type !== "checkbox" ? (field.value as string | number | undefined) : undefined}
            checked={field.type === "checkbox" ? Boolean(field.value) : undefined}
            onChange={handleChange}
          />
        )}
      </div>
    );
  };
  
  export default DynamicField;
  