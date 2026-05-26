import CVHeader from "./CVHeader";
import CVSummary from "./CVSummary";
import CVSkills from "./CVSkills";
import CVProjects from "./CVProjects";
import CVExperience from "./CVExperience";
import CVOrganizations from "./CVOrganizations";
import CVCertifications from "./CVCertifications";
import CVExportButton from "./CVExportButton";

export default function CVLayout({ data }) {
  console.log(data);
  return (
    <div className="cv-layout">
      <CVExportButton />

      <CVHeader user={data.user} />

      <CVSummary summary={data.summary} />

      <CVSkills
        technicalSkills={data?.skills?.technical || data?.technicalSkills}
        softSkills={data?.skills?.soft || data?.softSkills}
        skills={data?.skills}
      />

      <CVProjects projects={data.projects} />

      <CVExperience experience={data.experience} />

      <CVOrganizations organizations={data.organizations} />

      <CVCertifications certifications={data.certifications} />
    </div>
  );
}
