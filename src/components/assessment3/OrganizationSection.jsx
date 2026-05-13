// src/components/assessment3/OrganizationSection.jsx

import RepeatableFormCard from "./RepeatableFormCard";

export default function OrganizationSection() {
  const fields = [
    {
      name: "organizationName",
      label: "Organization Name",
      placeholder: "e.g. Student Association",
    },
    {
      name: "role",
      label: "Role",
      placeholder: "e.g. Event Coordinator",
    },
    {
      name: "duration",
      label: "Duration",
      placeholder: "e.g. 1 year",
    },
  ];

  return <RepeatableFormCard title="Organization" fields={fields} optional />;
}
