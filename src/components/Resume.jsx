import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addData } from "../app/resumeDataSlice";
import { Link, redirect } from "react-router-dom";
import { FaGlobe, FaPhoneAlt, FaLinkedin, FaGithub  } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Modal from "./Modal";

const Resume = () => {
  const dispatch = useDispatch();
  const resumeData = useSelector((store) => store.resume.info);

  const [personalInfo, setPersonalInfo] = useState(resumeData.personalInfo);
  const [professionalSummary, setProfessionalSummary] = useState(
    resumeData.professionalSummary
  );
  const [experience, setExperience] = useState(resumeData.experience);
  const [education, setEducation] = useState(resumeData.education);
  const [skills, setSkills] = useState(resumeData.skills);
  const [projects, setProjects] = useState(resumeData.projects);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setPersonalInfo(resumeData.personalInfo);
    setProfessionalSummary(resumeData.professionalSummary);
    setExperience(resumeData.experience);
    setEducation(resumeData.education);
    setSkills(resumeData.skills);
    setProjects(resumeData.projects);
  }, [resumeData]);

  //checking if user has provided all the required informations
  const validateForm = () => {
    if (!personalInfo.name || !personalInfo.email || !personalInfo.phone) {
      setErrorMessage(
        "Please fill in all required personal information fields."
      );
      return false;
    }

    if (!professionalSummary) {
      setErrorMessage("Please provide a professional summary.");
      return false;
    }

    // if (experience.some((exp) => !exp.role || !exp.company || !exp.duration || !exp.details)) {
    //   setErrorMessage("Please fill in all fields for each experience entry.");
    //   return false;
    // }

    if (
      education.some((edu) => !edu.degree || !edu.institution || !edu.duration)
    ) {
      setErrorMessage("Please fill in all fields for each education entry.");
      return false;
    }

    if (skills.some((skill) => !skill)) {
      setErrorMessage("Please provide at least one skill.");
      return false;
    }

    if (
      projects.some(
        (project) =>
          !project.name ||
          !project.technologies ||
          project.description.some((desc) => !desc)
      )
    ) {
      setErrorMessage("Please fill in all fields for each project entry.");
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handlePersonalInfoChange = (e) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
  };

  const handleExperienceChange = (index, e) => {
    const { name, value } = e.target;
    setExperience((prevExperience) =>
      prevExperience.map((exp, i) =>
        i === index ? { ...exp, [name]: value } : exp
      )
    );
  };

  const addExperience = () => {
    setExperience([
      ...experience,
      { role: "", company: "", duration: "", details: "" },
    ]);
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    setEducation((prevEducation) =>
      prevEducation.map((edu, i) =>
        i === index ? { ...edu, [name]: value } : edu
      )
    );
  };

  const addEducation = () => {
    setEducation([...education, { degree: "", institution: "", duration: "" }]);
  };

  const handleSkillsChange = (index, e) => {
    const { value } = e.target;
    setSkills((prevSkills) =>
      prevSkills.map((skill, i) => (i === index ? value : skill))
    );
  };

  const addSkill = () => {
    setSkills([...skills, ""]);
  };

  const handleProjectsChange = (index, e) => {
    const { name, value } = e.target;
    setProjects((prevProjects) =>
      prevProjects.map((project, i) =>
        i === index ? { ...project, [name]: value } : project
      )
    );
  };

  const handleBulletChange = (projectIndex, bulletIndex, e) => {
    const { value } = e.target;
    setProjects((prevProjects) =>
      prevProjects.map((project, i) =>
        i === projectIndex
          ? {
              ...project,
              description: project.description.map((bullet, j) =>
                j === bulletIndex ? value : bullet
              ),
            }
          : project
      )
    );
  };

  const addBullet = (projectIndex) => {
    setProjects((prevProjects) =>
      prevProjects.map((project, i) =>
        i === projectIndex
          ? { ...project, description: [...project.description, ""] }
          : project
      )
    );
  };

  const addProject = () => {
    setProjects([...projects, { name: "", description: [], technologies: "" }]);
  };

  const handleReview = () => {
    if (validateForm()) {
      const info = {
        personalInfo: personalInfo,
        professionalSummary: professionalSummary,
        education: education,
        skills: skills,
        projects: projects,
      };
      //dispatching and redirecting to preview page
      dispatch(addData(info));
      redirect("/preview");
    } else {
      //showing modal and asking user to fill all the informations
      setShowModal(true);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/*Left side with form */}
      <div className="w-1/2 p-6 bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
        <input
          type="text"
          name="name"
          value={personalInfo?.name}
          onChange={handlePersonalInfoChange}
          placeholder="Your Name"
          className="w-full p-2 border-b-2 focus:outline-none mb-4"
        />
        <input
          type="email"
          name="email"
          value={personalInfo?.email}
          onChange={handlePersonalInfoChange}
          placeholder="Your Email"
          className="w-full p-2 border-b-2 focus:outline-none mb-4"
        />
        <input
          type="text"
          name="phone"
          value={personalInfo?.phone}
          onChange={handlePersonalInfoChange}
          placeholder="Your Phone"
          className="w-full p-2 border-b-2 focus:outline-none mb-4"
        />
        <input
          type="text"
          name="linkedin"
          value={personalInfo?.linkedin}
          onChange={handlePersonalInfoChange}
          placeholder="Your LinkedIn profile URL"
          className="w-full p-2 border-b-2 focus:outline-none mb-4"
        />
        <input
          type="text"
          name="website"
          value={personalInfo?.website}
          onChange={handlePersonalInfoChange}
          placeholder="Your Website"
          className="w-full p-2 border-b-2 focus:outline-none mb-4"
        />
        <input
          type="text"
          name="address"
          value={personalInfo?.address}
          onChange={handlePersonalInfoChange}
          placeholder="Your Github profile URL"
          className="w-full p-2 border-b-2 focus:outline-none mb-4"
        />

        <h2 className="text-2xl font-bold mb-4">Professional Summary</h2>
        <textarea
          value={professionalSummary}
          onChange={(e) => setProfessionalSummary(e.target.value)}
          placeholder="Write your professional summary here..."
          className="w-full p-2 border focus:outline-none mb-4"
        />

        <div className="flex items-center gap-2">
        <h2 className="text-2xl font-bold mb-4">Experience</h2>
        <h3 className="mb-4 text-gray-700">{"(Optional)"}</h3>
        </div>
        {experience?.map((exp, index) => (
          <div key={index} className="mb-6">
            <input
              type="text"
              name="role"
              value={exp.role}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Role"
              className="w-full p-2 border-b-2 focus:outline-none mb-2"
            />
            <input
              type="text"
              name="company"
              value={exp.company}
              readOnly={false}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Company"
              className="w-full p-2 border-b-2 focus:outline-none mb-2"
            />
            <input
              type="text"
              name="duration"
              value={exp.duration}
              readOnly={false}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Duration"
              className="w-full p-2 border-b-2 focus:outline-none mb-2"
            />
            <textarea
              name="details"
              value={exp.details}
              readOnly={false}
              onChange={(e) => handleExperienceChange(index, e)}
              placeholder="Details"
              className="w-full p-2 border focus:outline-none mb-4"
            />
          </div>
        ))}
        <button
          onClick={addExperience}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Experience
        </button>

        <h2 className="text-2xl font-bold mt-8 mb-4">Projects</h2>
        {projects?.map((project, projectIndex) => (
          <div key={projectIndex} className="mb-6">
            <input
              type="text"
              name="name"
              value={project.name}
              onChange={(e) => handleProjectsChange(projectIndex, e)}
              placeholder="Project Name"
              className="w-full p-2 border-b-2 focus:outline-none mb-2"
            />
            {project.description.map((bullet, bulletIndex) => (
              <textarea
                key={bulletIndex}
                value={bullet}
                onChange={(e) =>
                  handleBulletChange(projectIndex, bulletIndex, e)
                }
                placeholder={`Bullet Point ${bulletIndex + 1}`}
                className="w-full p-2 border focus:outline-none mb-2"
              />
            ))}
            <button
              onClick={() => addBullet(projectIndex)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-2"
            >
              Add Bullet Point
            </button>
            <input
              type="text"
              name="technologies"
              value={project.technologies}
              onChange={(e) => handleProjectsChange(projectIndex, e)}
              placeholder="Technologies Used"
              className="w-full p-2 border-b-2 focus:outline-none mb-4"
            />
          </div>
        ))}
        <button
          onClick={addProject}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Project
        </button>

        <h2 className="text-2xl font-bold mt-8 mb-4">Education</h2>
        {education?.map((edu, index) => (
          <div key={index} className="mb-6">
            <input
              type="text"
              name="degree"
              value={edu.degree}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="Degree"
              className="w-full p-2 border-b-2 focus:outline-none mb-2"
            />
            <input
              type="text"
              name="institution"
              value={edu.institution}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="Institution"
              className="w-full p-2 border-b-2 focus:outline-none mb-2"
            />
            <input
              type="text"
              name="duration"
              value={edu.duration}
              onChange={(e) => handleEducationChange(index, e)}
              placeholder="Duration"
              className="w-full p-2 border-b-2 focus:outline-none mb-4"
            />
          </div>
        ))}
        <button
          onClick={addEducation}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add Education
        </button>

        <h2 className="text-2xl font-bold mt-8 mb-4">Skills</h2>
        {skills?.map((skill, index) => (
          <input
            key={index}
            type="text"
            value={skill}
            onChange={(e) => handleSkillsChange(index, e)}
            placeholder="Skill"
            className="w-full p-2 border-b-2 focus:outline-none mb-2"
          />
        ))}
        <button
          onClick={addSkill}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
        >
          Add Skill
        </button>

        <Link
          onClick={handleReview}
          to={"/preview"}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-8"
        >
          Review
        </Link>
      </div>

      {/* Right side with live preview of the resume and it details */}
      <div className="w-1/2 p-8 bg-white shadow-lg">
        <header className="pb-6 mb-4">
          <div className="text-2xl font-bold mb-2 text-center">{personalInfo?.name}</div>
          <div className="flex flex-wrap items-center gap-4 text-gray-600">
          <div className="flex items-center gap-1">
              <FaPhoneAlt />
              {personalInfo?.phone}
            </div>
            
            <div className="flex items-center gap-1">
              <FaGlobe />
              <span className="text-blue-600">{personalInfo?.website}</span>
            </div>
            <div className="flex items-center gap-1">
              <MdEmail />
              {personalInfo?.email}
            </div>
            
            
            <div className="flex items-center gap-1">
              <FaLinkedin />
              {personalInfo?.linkedin}
            </div>

            <div className="flex items-center gap-1">
              <FaGithub />
              {personalInfo?.address}
            </div>
          </div>
        </header>

        <section className="mb-4">
          <h2 className="text-xl font-bold mb-2 border-b-2 pb-2">
            Professional Summary
          </h2>
          <p className="text-sm text-gray-700">{professionalSummary}</p>
        </section>

        {experience?.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xl font-bold mb-2 border-b-2 pb-2">
              Experience
            </h2>
            {experience.map((exp, index) => (
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
          <h2 className="text-xl font-bold mb-2 border-b-2 pb-2">Projects</h2>
          {projects?.map((project, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-semibold">{project.name}</h3>
              <p className="text-gray-600 mt-1 mb-1 text-sm">
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
          <h2 className="text-xl font-bold mb-2 border-b-2 pb-2">Education</h2>
          {education?.map((edu, index) => (
            <div key={index} className="mb-6">
              <h3 className="font-semibold">{edu.degree}</h3>
              <p className="text-sm text-gray-600">
                {edu.institution}, {edu.duration}
              </p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xl font-bold mb-2 border-b-2 pb-2">Skills</h2>
          <ul className="list-disc list-inside text-gray-700 ml-4">
            {skills?.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
        </section>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Incomplete Form</h2>
            <p>{errorMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-4"
            >
              Close
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Resume;
