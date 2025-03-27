import React from "react";
import { Section } from "./types";

interface NestedSectionProps {
  index: number;
  section: Section;
  setSections: React.Dispatch<React.SetStateAction<Section[]>>;
}

const NestedSection: React.FC<NestedSectionProps> = ({ index, section, setSections }) => {
  const toggleVisibility = () => {
    setSections((prev) =>
      prev.map((sec, i) =>
        i === index ? { ...sec, hidden: !sec.hidden } : sec
      )
    );
  };

  return (
    <div className="nested-section">
      <h3>{section.title}</h3>
      <button onClick={toggleVisibility}>
        {section.hidden ? "Show Fields" : "Hide Fields"}
      </button>
      {!section.hidden &&
        section.fields.map((field) => <p key={field.id}>{field.label}</p>)}
    </div>
  );
};

export default NestedSection;
