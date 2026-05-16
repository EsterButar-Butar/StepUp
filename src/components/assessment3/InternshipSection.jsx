// src/components/assessment3/InternshipSection.jsx

import RepeatableFormCard from "./RepeatableFormCard";

export default function InternshipSection({ items, setItems }) {
  const fields = [
    {
      name: "company",
      label: "Company",
      placeholder: "e.g. Google",
    },
    {
      name: "position",
      label: "Position",
      placeholder: "e.g. Software Engineer Intern",
    },
    {
      name: "duration",
      label: "Duration",
      placeholder: "e.g. 6 months",
    },
    {
      name: "responsibilities",
      label: "Responsibilities",
      type: "textarea",
      placeholder: "Describe your responsibilities...",
    },
  ];

  return (
    <RepeatableFormCard
      title="Internship"
      fields={fields}
      optional
      items={items}
      setItems={setItems}
    />
  );
}
