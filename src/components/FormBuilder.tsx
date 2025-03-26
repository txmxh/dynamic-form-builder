import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import DynamicField from "./DynamicField";

const schema = yup.object().shape({
  fields: yup.array().of(
    yup.object().shape({
      type: yup.string().required(),
      value: yup.string().required("This field is required"),
    })
  ),
});

const FormBuilder = () => {
  const { control, handleSubmit, watch, setValue } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { fields: [] },
  });

  const [fields, setFields] = useState<{ id: number; type: string }[]>([]);

  const addField = (type: string) => {
    setFields([...fields, { id: Date.now(), type }]);
  };

  const onSubmit = (data: any) => console.log("Submitted Data:", data);

  return (
    <div>
      <h2>Dynamic Form Builder</h2>
      <button onClick={() => addField("text")}>Add Text Field</button>
      <button onClick={() => addField("dropdown")}>Add Dropdown</button>

      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((field, index) => (
          <DynamicField key={field.id} index={index} type={field.type} control={control} />
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormBuilder;
