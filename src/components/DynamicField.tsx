import React from "react";
import { Controller } from "react-hook-form";

const DynamicField = ({ index, type, control }: any) => {
  return (
    <div>
      <label>Field {index + 1} ({type}): </label>
      <Controller
        name={`fields[${index}].value`}
        control={control}
        defaultValue=""
        render={({ field }) => {
          if (type === "text") return <input {...field} />;
          if (type === "dropdown")
            return (
              <select {...field}>
                <option value="">Select</option>
                <option value="Option 1">Option 1</option>
                <option value="Option 2">Option 2</option>
              </select>
            );
          return null;
        }}
      />
    </div>
  );
};

export default DynamicField;
