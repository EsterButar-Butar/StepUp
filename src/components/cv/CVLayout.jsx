import CVHeader from "./CVHeader";
import CVSummary from "./CVSummary";
import CVSkills from "./CVSkills";
import CVProjects from "./CVProjects";
import CVExperience from "./CVExperience";
import CVOrganizations from "./CVOrganizations";
import CVCertifications from "./CVCertifications";
import CVExportButton from "./CVExportButton";

const ensureArray = (value) => {
  if (Array.isArray(value)) return value;
  if (!value) return [];
  return [];
};

export default function CVLayout({ data }) {
  const normalizedData = data || {};
  const projects = ensureArray(
    normalizedData.projects ||
      normalizedData.ats_cv?.projects ||
      normalizedData.experience?.projects,
  );
  const experience = ensureArray(
    normalizedData.experience ||
      normalizedData.internships ||
      normalizedData.ats_cv?.internship_experience ||
      normalizedData.ats_cv?.experience,
  );
  const organizations = ensureArray(
    normalizedData.organizations ||
      normalizedData.ats_cv?.organizational_experience ||
      normalizedData.ats_cv?.organizations,
  );
  const certifications = ensureArray(
    normalizedData.certifications || normalizedData.ats_cv?.certifications,
  );

  return (
    <div className="cv-layout">
      <CVExportButton />

      <CVHeader user={normalizedData.user} />

      <CVSummary summary={normalizedData.summary} />

      <CVSkills
        technicalSkills={
          normalizedData?.skills?.technical || normalizedData?.technicalSkills
        }
        softSkills={normalizedData?.skills?.soft || normalizedData?.softSkills}
        skills={normalizedData?.skills}
      />

      {projects.length > 0 && <CVProjects projects={projects} />}

      {experience.length > 0 && <CVExperience experience={experience} />}

      {organizations.length > 0 && (
        <CVOrganizations organizations={organizations} />
      )}

      {certifications.length > 0 && (
        <CVCertifications certifications={certifications} />
      )}
    </div>
  );
}
