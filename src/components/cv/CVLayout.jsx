import CVHeader from "./CVHeader";
import CVSummary from "./CVSummary";
import CVSkills from "./CVSkills";
import CVProjects from "./CVProjects";
import CVExperience from "./CVExperience";
import CVOrganizations from "./CVOrganizations";
import CVCertifications from "./CVCertifications";
import CVATSScore from "./CVATSScore";
import CVExportButton from "./CVExportButton";

export default function CVLayout({ data }) {
  return (
    <div className="cv-layout">
      <CVExportButton />

      <CVATSScore score={data.atsScore} />

      <CVHeader user={data.user} />

      <CVSummary summary={data.summary} />

      <CVSkills skills={data.skills} />

      <CVProjects projects={data.projects} />

      <CVExperience experience={data.experience} />

      <CVOrganizations organizations={data.organizations} />

      <CVCertifications certifications={data.certifications} />
    </div>
  );
}
