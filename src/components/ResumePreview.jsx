import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { useReactToPrint } from 'react-to-print';

const ResumePreview = () => {
  const resumeData = useSelector((store) => store.resume.info);
  console.log(resumeData)
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <div className="flex flex-col items-center p-8">
      <div ref={componentRef} className="w-full p-8 bg-white">
        <header className="border-b-2 pb-6 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold">{resumeData.personalInfo.name}</h1>
            <div className="text-right">
              <p className="text-lg">{resumeData.personalInfo.email}</p>
              <p className="text-lg">{resumeData.personalInfo.phone}</p>
              <p className="text-lg">{resumeData.personalInfo.website}</p>
            </div>
          </div>
          <div className="text-gray-600 mt-4">
            <p>{resumeData.personalInfo.address}</p>
          </div>
        </header>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">Professional Summary</h2>
          <p className="text-gray-700">{resumeData.professionalSummary}</p>
        </section>
        
        {resumeData.experience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-6">
                <h3 className="text-xl font-semibold">{exp.role}</h3>
                <p className="text-gray-600">
                  {exp.company}, {exp.duration}
                </p>
                <p className="text-gray-700 mt-2">{exp.details}</p>
              </div>
            ))}
          </section>
        )}

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">Projects</h2>
          {resumeData.projects.map((project, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold">{project.name}</h3>
              <ul className="list-disc list-inside text-gray-700 ml-4">
                {project.description.map((bullet, bulletIndex) => (
                  <li key={bulletIndex}>{bullet}</li>
                ))}
              </ul>
              <p className="text-gray-600 mt-2">Technologies: {project.technologies}</p>
            </div>
          ))}
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">Education</h2>
          {resumeData.education.map((edu, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl font-semibold">{edu.degree}</h3>
              <p className="text-gray-600">
                {edu.institution}, {edu.duration}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 border-b-2 pb-2">Skills</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            {resumeData.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      </div>

      <button onClick={handlePrint} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-8">
        Export to PDF
      </button>
    </div>
  );
};

export default ResumePreview;
