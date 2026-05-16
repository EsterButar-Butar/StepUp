// src/components/assessment3/CertificationSection.jsx

import RepeatableFormCard from "./RepeatableFormCard";

export default function CertificationSection({ items, setItems }) {
  const fields = [
    {
      name: "certificateName",
      label: "Certificate Name",
      placeholder: "e.g. AWS Cloud Practitioner",
    },
    {
      name: "issuer",
      label: "Issuer",
      placeholder: "e.g. Amazon Web Services",
    },
    {
      name: "year",
      label: "Year",
      placeholder: "e.g. 2025",
    },
  ];

  return (
    <RepeatableFormCard
      title="Certification"
      fields={fields}
      optional
      items={items}
      setItems={setItems}
    />
  );
}
