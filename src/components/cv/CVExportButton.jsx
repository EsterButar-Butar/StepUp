export default function CVExportButton() {
  const handleExport = () => {
    window.print();
  };

  return (
    <button className="cv-export-btn" onClick={handleExport}>
      Export PDF
    </button>
  );
}
