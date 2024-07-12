import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { useReactToPrint } from "react-to-print";
import { FaGlobe, FaPhoneAlt, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const ResumePreview = () => {
  const resumeData = useSelector((store) => store.resume.info);
  console.log(resumeData);
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="flex flex-col items-center p-8">
      <div ref={componentRef} className="w-full p-6 bg-white">
        <header className="pb-1 mb-4">
          <div className="text-2xl font-bold mb-2 text-center">
            {resumeData?.personalInfo?.name}
          </div>
          <div className="flex text-sm flex-wrap items-center gap-4 text-gray-600 justify-center">
            <div className="flex items-center gap-1">
              <FaPhoneAlt />
              {resumeData.personalInfo?.phone}
            </div>
            <div className="flex items-center gap-1">
              <MdEmail />
              <a className="text-blue-600" href={`mailto:${resumeData?.personalInfo?.email}`}>
                {resumeData?.personalInfo?.email}
              </a>
            </div>
            <div className="flex items-center gap-1">
              <FaGlobe />
              <a
                className="text-blue-600"
                href={resumeData.personalInfo?.website}
              >
                Portfolio
              </a>
            </div>
            <div className="flex items-center gap-1">
              <FaLinkedin />
              <a
                className="text-blue-600"
                href={resumeData.personalInfo?.linkedin}
              >
                LinkedIn
              </a>
            </div>

            <div className="flex items-center gap-1">
              <FaGithub />
              <a
                className="text-blue-600"
                href={resumeData.personalInfo?.address}
              >
                Github
              </a>
            </div>
          </div>
        </header>

        <section className="mb-4">
          <h2 className="text-lg font-bold mb-2 border-b-2 pb-1">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700">
            {resumeData.professionalSummary}
          </p>
        </section>

        {resumeData?.experience?.length > 0 && (
          <section className="mb-4">
            <h2 className="text-lg font-bold mb-4 border-b-2 pb-1">
              Experience
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-lg font-semibold">{exp.role}</h3>
                <p className="text-gray-600">
                  {exp.company}, {exp.duration}
                </p>
                <p className="text-sm text-gray-700 mt-2">{exp.details}</p>
              </div>
            ))}
          </section>
        )}

        <section className="mb-4">
          <h2 className="text-lg font-bold mb-2 border-b-2 pb-1">Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-2">
              <h3 className="text-base font-semibold">{project.name}</h3>
              <p className="text-gray-600 mb-1 text-sm">
                {project.technologies && (
                  <span className="font-semibold">Technologies: </span>
                )}{" "}
                {project.technologies}
              </p>
              <ul className="list-disc list-inside text-sm text-gray-700 ml-4">
                {project.description.map((bullet, bulletIndex) => (
                  <li key={bulletIndex}>{bullet}</li>
                ))}
              </ul>
            </div>
          ))}
        </section>

        <section className="mb-4">
          <h2 className="text-lg font-bold mb-2 border-b-2 pb-1">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-3">
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-sm text-gray-600">
                {edu.institution}, {edu.duration}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-lg font-bold mb-2 border-b-2 pb-1">Skills</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            {resumeData.skills.map((skill, index) => (
              <li className="text-sm" key={index}>
                {skill}
              </li>
            ))}
          </ul>
        </section>
      </div>

      <button
        onClick={handlePrint}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-8"
      >
        Export to PDF
      </button>
    </div>
  );
};

export default ResumePreview;
