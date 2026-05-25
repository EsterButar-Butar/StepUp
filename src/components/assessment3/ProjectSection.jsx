// src/components/assessment3/ProjectSection.jsx

import RepeatableFormCard from "./RepeatableFormCard";

export default function ProjectSection({ items, setItems }) {
  const fields = [
    {
      name: "projectName",
      label: "Project Name",
      placeholder: "e.g. AI Career Platform",
    },
    {
      name: "role",
      label: "Role",
      placeholder: "e.g. Frontend Developer",
    },
    {
      name: "issuesSolved",
      label: "Issues Solved",
      placeholder: "Describe the problems you solved",
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      placeholder: "Describe your project...",
    },
  ];

  return (
    <RepeatableFormCard
      title="Project"
      fields={fields}
      optional
      items={items}
      setItems={setItems}
    />
  );
}
