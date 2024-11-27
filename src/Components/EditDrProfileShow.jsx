import axios from "axios";
import Multiselect from "multiselect-react-dropdown";
import React, { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { IoIosArrowUp, IoMdAdd } from "react-icons/io";
import { IoAdd } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";

function EditDrProfileShow() {
  const [updateValue, setUpdateValue] = useState({
    specialitycategories: [],
    qualifications: [
      {
        sequenceNumber: 0,
        instituteName: "",
        degree: "",
        fieldOfStudy: "",
        startDate: {
          month: "",
          year: "",
        },
        endDate: {
          month: "",
          year: "",
        },
        description: "",
        skills: [],
      },
    ],
    years_of_experience: [
      {
        sequenceNumber: 0,
        jobTitle: "",
        employmentType: "",
        organizationName: "",
        organizationLocation: "",
        startDate: {
          month: "",
          year: "",
        },
        endDate: {
          month: "",
          year: "",
        },
        isPresent: false,

        description: "",
        skills: [],
      },
    ],
    clinic_hospital_address: {
      city: "",
      PinCode: "",
      state: "",
      permanentAddress: "",
    },
    hospitalName: "",

    services_offered: [],

    aboutDoctor: "",
    language: [],
    FAQ: [
      {
        title: "",
        value: "",
      },
    ],
  });
  const addExperience = () => {
    const newExperience = {
      sequenceNumber: updateValue.years_of_experience.length + 1,
      jobTitle: "",
      employmentType: "",
      organizationName: "",
      organizationLocation: "",
      startDate: { month: "", year: "" },
      endDate: { month: "", year: "" },
      description: "",
      skills: [],
    };
    setUpdateValue({
      ...updateValue,
      years_of_experience: [...updateValue.years_of_experience, newExperience],
    });
    setOpenDropdown(updateValue.years_of_experience.length); // Open the new form dropdown
  };
  const [semibtns, setsemibtns] = useState("DoctorDetails");
  const [speciality, setSpeciality] = useState([]);
  const [getProfileData, setGetProfileData] = useState({});
  const [newSkill, setNewSkill] = useState("");
  const [ExperienceSkills, setExperienceSkills] = useState("");
  const [openDropdown, setOpenDropdown] = useState(null);
  const [languageInput, setLanguageInput] = useState("");
  const [services_offeredInput, setservices_offeredInput] = useState("");

  const [activeButton, setActiveButton] = useState(null);

  const handleButtonClick = (buttonName) => {
    setsemibtns(buttonName); // Call your existing function to set the section
    setActiveButton(buttonName); // Set the active button
  };
  const handleSkillChange = (e) => {
    setNewSkill(e.target.value); // Update the new skill input
  };

  const HandleservicesOfferedChange = (e) => {
    setservices_offeredInput(e.target.value);
  };

  const HandleServicesOfferedClick = () => {
    setUpdateValue((prev) => ({
      ...prev,
      services_offered: [...prev.services_offered, services_offeredInput],
    })),
      setservices_offeredInput("");
  };

  const removeServicesOffered = (serviceToRemove) => {
    setUpdateValue((prev) => ({
      ...prev,
      services_offered: prev.services_offered.filter(
        (service) => service !== serviceToRemove
      ),
    }));
  };

  const HandleLanguageChange = (e) => {
    setLanguageInput(e.target.value);
  };

  const addLanguage = () => {
    setUpdateValue((prev) => ({
      ...prev,
      language: [...prev.language, languageInput],
    }));
    setLanguageInput(""); // Clear the input field after adding
  };

  const removeLanguage = (langToRemove) => {
    setUpdateValue((prev) => ({
      ...prev,
      language: prev.language.filter((lang) => lang !== langToRemove),
    }));
  };
  const toggleDropdown = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  const handleExperienceSkills = (e) => {
    setExperienceSkills(e.target.value);
  };
  const handleAddSkill = (index) => {
    const updatedQualifications = [...updateValue.qualifications];
    updatedQualifications[index].skills.push(newSkill); // Add new skill to the specific qualification

    setUpdateValue({
      ...updateValue,
      qualifications: updatedQualifications,
    });

    setNewSkill(""); // Clear the input after adding
  };

  const handleRemoveExperience = (index) => {
    setUpdateValue((prev) => ({
      ...prev,
      years_of_experience: prev.years_of_experience.filter(
        (_, i) => i !== index
      ),
    }));
  };
  const handleExperienceSkillsChange = (index) => {
    const updatedExperience = [...updateValue.years_of_experience];
    updatedExperience[index].skills.push(ExperienceSkills);

    setUpdateValue({
      ...updateValue,
      years_of_experience: updatedExperience,
    });
    setExperienceSkills("");
  };

  useEffect(() => {
    FetchSpecialityName();
    ProfileFetchData();
  }, []);

  const handleQualificationChange = (index, field, value) => {
    setUpdateValue((prev) => {
      const updateQualifications = [...prev.qualifications];
      updateQualifications[index] = {
        ...updateQualifications[index],
        [field]: value,
      };
      return {
        ...prev,
        qualifications: updateQualifications,
      };
    });
  };

  const handleExperienceChange = (index, field, value) => {
    setUpdateValue((prev) => {
      const newExperience = [...prev.years_of_experience];
      newExperience[index] = {
        ...newExperience[index],
        [field]: value,
      };
      return { ...prev, years_of_experience: newExperience };
    });
  };

  const handleHospitalAddressChange = (field, value) => {
    setUpdateValue((prev) => ({
      ...prev,
      clinic_hospital_address: {
        ...prev.clinic_hospital_address,
        [field]: value,
      },
    }));
  };

  const handleFAQchange = (index, field, value) => {
    setUpdateValue((prev) => {
      const updatedFAQ = [...prev.FAQ];
      updatedFAQ[index] = {
        ...updatedFAQ[index],
        [field]: value,
      };
      return { ...prev, FAQ: updatedFAQ };
    });
  };

  const addFAQ = () => {
    setUpdateValue((prev) => ({
      ...prev,
      FAQ: [...prev.FAQ, { title: "", value: "" }],
    }));
  };

  const removeFAQ = (index) => {
    setUpdateValue((prev) => {
      const newFAQ = prev.FAQ.filter((_, faqIndex) => faqIndex !== index);
      return { ...prev, FAQ: newFAQ };
    });
  };

  const handleRemoveExperienceSkill = (experienceIndex, skillIndex) => {
    // Create a new array of years of experience
    const updatedYearsOfExperience = updateValue.years_of_experience.map(
      (experience, expIndex) => {
        if (expIndex === experienceIndex) {
          // Filter out the skill to be removed
          const updatedSkills = experience.skills.filter(
            (_, index) => index !== skillIndex
          );
          return { ...experience, skills: updatedSkills }; // Return updated experience
        }
        return experience; // Return other experiences unchanged
      }
    );

    // Update the state with the new years_of_experience array
    setUpdateValue((prev) => ({
      ...prev,
      years_of_experience: updatedYearsOfExperience,
    }));
  };

  

  const FetchSpecialityName = async () => {
    try {
      const res = await axios.get(
        "https://api.assetorix.com/ah/api/v1/dc/user/Category"
      );
      setSpeciality(res.data.data);
    } catch (error) {}
  };

  const ProfileFetchData = async () => {
    // const token=localStorage.getItem("token")
    // const id=localStorage.getItem("id")
 
    try {
      const getProfile = await axios.get(
        "https://api.assetorix.com/ah/api/v1/dc/doctor",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      setUpdateValue((prev) => ({
        ...prev,
        specialitycategories: getProfile.data.data.specialitycategories || "",
        qualifications: getProfile.data.data.qualifications || "",
        years_of_experience: getProfile.data.data.years_of_experience || "",
        clinic_hospital_address:
          getProfile.data.data.clinic_hospital_address || "",
        hospitalName: getProfile.data.data.hospitalName || "",
        services_offered: getProfile.data.data.services_offered || "",
        aboutDoctor: getProfile.data.data.aboutDoctor || "",
        language: getProfile.data.data.language || "",
        FAQ: getProfile.data.data.FAQ || "",
      }));
      
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  const ProfilePatchData = async () => {
    try {
      const res = await axios.patch(
        "https://api.assetorix.com/ah/api/v1/dc/doctor",
        updateValue, // Send `updateValue` as the request payload
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            id: localStorage.getItem("id"),
          },
        }
      );
      
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveSkill = (qualificationIndex, skillIndex) => {
    const updatedQualifications = [...updateValue.qualifications];
    updatedQualifications[qualificationIndex].skills.splice(skillIndex, 1);

    setUpdateValue({
      ...updateValue,
      qualifications: updatedQualifications,
    });
  };

  return (
    <div style={{ border: "1px solid white" }}>
      <div className="flex gap-4">
        <div className="w-[30%] flex flex-col p-6 border border-green-500 rounded-lg shadow-lg bg-white h-[70%]">
          <h2 className="text-2xl font-semibold mb-6 text-center text-[#1A5B6A]">
            Manage Sections
          </h2>

          <button
            onClick={() => handleButtonClick("DoctorDetails")}
            className={`mb-3 py-3 px-5 rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              activeButton === "DoctorDetails"
                ? "bg-blue-500 text-white"
                : "bg-[#DAF5F3] text-black hover:bg-[#AEEBEB]"
            }`}
          >
            Doctors Details
          </button>

          <button
            onClick={() => handleButtonClick("qualifications")}
            className={`mb-3 py-3 px-5 rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              activeButton === "qualifications"
                ? "bg-blue-500 text-white"
                : "bg-[#DAF5F3] text-black hover:bg-[#AEEBEB]"
            }`}
          >
            Qualifications
          </button>

          <button
            onClick={() => handleButtonClick("Experience")}
            className={`mb-3 py-3 px-5 rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              activeButton === "Experience"
                ? "bg-blue-500 text-white"
                : "bg-[#DAF5F3] text-black hover:bg-[#AEEBEB]"
            }`}
          >
            Experience
          </button>

          <button
            onClick={() => handleButtonClick("HospitalAddress")}
            className={`mb-3 py-3 px-5 rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              activeButton === "HospitalAddress"
                ? "bg-blue-500 text-white"
                : "bg-[#DAF5F3] text-black hover:bg-[#AEEBEB]"
            }`}
          >
            Hospital Address
          </button>

          <button
            onClick={() => handleButtonClick("FAQ")}
            className={`mb-3 py-3 px-5 rounded-md shadow-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300 ${
              activeButton === "FAQ"
                ? "bg-blue-500 text-white"
                : "bg-[#DAF5F3] text-black hover:bg-[#AEEBEB]"
            }`}
          >
            FAQ
          </button>
        </div>

        <div className="w-[70%] h-full">
          {semibtns === "DoctorDetails" && (
            <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
              {/* Hospital and Doctor Details Section */}
              <div className="mb-4">
                <input
                  type="text"
                  name="hospitalName"
                  value={updateValue.hospitalName}
                  placeholder="Enter Hospital Name"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  name="aboutDoctor"
                  value={updateValue.aboutDoctor}
                  placeholder="About Doctor"
                  onChange={handleChange}
                  className="w-full p-2 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Language Section */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="language"
                    value={languageInput}
                    onChange={HandleLanguageChange}
                    placeholder="Enter Language"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <IoAdd
                    className="text-blue-500 cursor-pointer"
                    onClick={addLanguage}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {updateValue.language.map((lang, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 text-blue-700 p-1 rounded-md"
                    >
                      <p>{lang}</p>
                      <ImCross
                        size={10}
                        className="ml-2 text-red-500 cursor-pointer"
                        onClick={() => removeLanguage(lang)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Services Offered Section */}
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    name="services_offered"
                    value={services_offeredInput}
                    onChange={HandleservicesOfferedChange}
                    placeholder="Enter Services"
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <IoAdd
                    className="text-blue-500 cursor-pointer"
                    onClick={HandleServicesOfferedClick}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {updateValue.services_offered.map((services, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-blue-100 text-blue-700 p-1 rounded-md"
                    >
                      <p>{services}</p>
                      <ImCross
                        size={10}
                        className="ml-2 text-red-500 cursor-pointer"
                        onClick={() => removeServicesOffered(services)}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* <select onChange={(e) => HandlesSpecialityClickId(e.target.value)}>
        <option value="" disabled>Select a specialty</option>
        {speciality.map((specialityNme) => (
          <option key={specialityNme._id} value={specialityNme._id}>
            {specialityNme.specialtyName}
          </option>
        ))}
      </select> */}
            </div>
          )}
          {semibtns === "qualifications" &&
            updateValue.qualifications.map((qualification, index) => (
              <div
                key={index}
                className="qualification-entry bg-white p-6 border border-gray-300 rounded-lg shadow-sm space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Institute Name
                  </label>
                  <input
                    type="text"
                    name="instituteName"
                    value={qualification.instituteName}
                    onChange={(e) =>
                      handleQualificationChange(
                        index,
                        "instituteName",
                        e.target.value
                      )
                    }
                    placeholder="Enter Institute Name"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Degree
                  </label>
                  <input
                    type="text"
                    name="degree"
                    value={qualification.degree}
                    onChange={(e) =>
                      handleQualificationChange(index, "degree", e.target.value)
                    }
                    placeholder="Enter Degree"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Field of Study
                  </label>
                  <input
                    type="text"
                    name="fieldOfStudy"
                    value={qualification.fieldOfStudy}
                    onChange={(e) =>
                      handleQualificationChange(
                        index,
                        "fieldOfStudy",
                        e.target.value
                      )
                    }
                    placeholder="Enter Field of Study"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Start Date (MM/YYYY)
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        name="startMonth"
                        value={qualification.startDate.month}
                        onChange={(e) =>
                          handleQualificationChange(
                            index,
                            "startMonth",
                            e.target.value
                          )
                        }
                        placeholder="MM"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        name="startYear"
                        value={qualification.startDate.year}
                        onChange={(e) =>
                          handleQualificationChange(
                            index,
                            "startYear",
                            e.target.value
                          )
                        }
                        placeholder="YYYY"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      End Date (MM/YYYY)
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        name="endMonth"
                        value={qualification.endDate.month}
                        onChange={(e) =>
                          handleQualificationChange(
                            index,
                            "endMonth",
                            e.target.value
                          )
                        }
                        placeholder="MM"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        name="endYear"
                        value={qualification.endDate.year}
                        onChange={(e) =>
                          handleQualificationChange(
                            index,
                            "endYear",
                            e.target.value
                          )
                        }
                        placeholder="YYYY"
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={qualification.description}
                    onChange={(e) =>
                      handleQualificationChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="Enter Description"
                    className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Skills
                  </label>
                  <span className="flex">
                    <input
                      type="text"
                      name="skills"
                      value={newSkill}
                      onChange={handleSkillChange}
                      placeholder="Enter Skill"
                      className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => handleAddSkill(index)}
                      className="ml-2 p-2 bg-blue-500 text-white rounded-md"
                    >
                      <IoMdAdd className="cursor-pointer" />
                    </button>
                  </span>
                </div>

                {/* Display added skills */}
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700">Skills:</h4>
                  <div className="flex flex-wrap gap-3 mt-2">
                    {updateValue?.qualifications?.[0]?.skills?.map(
                      (skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                        >
                          <span className="text-sm">{skill}</span>
                          <ImCross
                            className="ml-2 text-blue-500 cursor-pointer hover:text-blue-700"
                            onClick={() => handleRemoveSkill(0, skillIndex)} // Adjust index as needed
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            ))}

          {semibtns === "Experience" && (
            <div className="space-y-6">
              {updateValue.years_of_experience.map((experience, index) => (
                <div>
                  <button
                    className="w-full flex p-4 text-left text-gray-700 font-medium border-b transition-all duration-300"
                    onClick={() => toggleDropdown(index)}
                  >
                    Experience {experience.sequenceNumber}{" "}
                    {/* {openDropdown === index ? "▲" : "▼" } */}
                    {openDropdown === index ? (
                      <IoIosArrowUp className="mt-1 transform  transition-transform duration-300" />
                    ) : (
                      <MdKeyboardArrowDown className="mt-1 transition-transform duration-300" />
                    )}
                  </button>

                  {openDropdown === index && (
                    <div
                      key={index}
                      className="bg-white p-6 border border-gray-300 rounded-lg shadow-sm space-y-4"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Job Title */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Job Title
                          </label>
                          <input
                            type="text"
                            value={experience.jobTitle}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "jobTitle",
                                e.target.value
                              )
                            }
                            placeholder="Enter Job Title"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Employment Type */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Employment Type
                          </label>
                          <input
                            type="text"
                            value={experience.employmentType}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "employmentType",
                                e.target.value
                              )
                            }
                            placeholder="Enter Employment Type"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Organization Name */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Organization Name
                          </label>
                          <input
                            type="text"
                            value={experience.organizationName}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "organizationName",
                                e.target.value
                              )
                            }
                            placeholder="Enter Organization Name"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Organization Location */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Organization Location
                          </label>
                          <input
                            type="text"
                            value={experience.organizationLocation}
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "organizationLocation",
                                e.target.value
                              )
                            }
                            placeholder="Enter Organization Location"
                            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </div>

                        {/* Start Month and Year */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            Start Date
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={experience.startDate.month}
                              onChange={(e) =>
                                handleExperienceChange(index, "startDate", {
                                  ...experience.startDate,
                                  month: e.target.value,
                                })
                              }
                              placeholder="Month"
                              className="mt-1 p-2 w-1/2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                              type="text"
                              value={experience.startDate.year}
                              onChange={(e) =>
                                handleExperienceChange(index, "startDate", {
                                  ...experience.startDate,
                                  year: e.target.value,
                                })
                              }
                              placeholder="Year"
                              className="mt-1 p-2 w-1/2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>

                        {/* End Month and Year */}
                        <div>
                          <label className="block text-sm font-medium text-gray-700">
                            End Date
                          </label>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={experience.endDate.month}
                              onChange={(e) =>
                                handleExperienceChange(index, "endDate", {
                                  ...experience.endDate,
                                  month: e.target.value,
                                })
                              }
                              placeholder="Month"
                              className="mt-1 p-2 w-1/2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                            <input
                              type="text"
                              value={experience.endDate.year}
                              onChange={(e) =>
                                handleExperienceChange(index, "endDate", {
                                  ...experience.endDate,
                                  year: e.target.value,
                                })
                              }
                              placeholder="Year"
                              className="mt-1 p-2 w-1/2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Description
                        </label>
                        <textarea
                          value={experience.description}
                          onChange={(e) =>
                            handleExperienceChange(
                              index,
                              "description",
                              e.target.value
                            )
                          }
                          placeholder="Enter Description"
                          className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {/* Skills */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700">
                          Skills
                        </label>
                        <div className="flex space-x-2 mt-1">
                          <input
                            type="text"
                            value={ExperienceSkills}
                            onChange={handleExperienceSkills}
                            placeholder="Add Skill"
                            className="p-2 w-full border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                          <button
                            onClick={() => handleExperienceSkillsChange(index)}
                            className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                          >
                            <IoMdAdd />
                          </button>
                        </div>

                        {/* Display added skills */}
                        <div className="flex flex-wrap gap-2 mt-2">
                          {experience?.skills?.map((skill, skillIndex) => (
                            <div
                              key={skillIndex}
                              className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                            >
                              <span className="text-sm">{skill}</span>
                              <ImCross
                                className="ml-2 text-blue-500 cursor-pointer hover:text-blue-700"
                                onClick={() =>
                                  handleRemoveExperienceSkill(index, skillIndex)
                                }
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveExperience(index)}
                        className="mt-4 bg-red-500 text-white p-2 rounded-md hover:bg-red-600"
                      >
                        Remove Experience
                      </button>
                    </div>
                  )}
                </div>
              ))}

              <div className="flex justify-end">
                <button
                  onClick={addExperience}
                  className=" mt-4 px-4 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 transition duration-200 flex items-center"
                >
                  <IoMdAdd className="inline mr-2" /> Add Experience
                </button>
              </div>
            </div>
          )}

          {semibtns === "HospitalAddress" && (
           
            <div className="space-y-6 p-6 bg-white shadow-lg rounded-lg max-w-md mx-auto">
              {/* City */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  name="city"
                  onChange={(e) =>
                    handleHospitalAddressChange("city", e.target.value)
                  }
                  value={updateValue.clinic_hospital_address.city}
                  placeholder="Enter City"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-800"
                />
              </div>

              {/* Pin Code */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pin Code
                </label>
                <input
                  type="text"
                  name="PinCode"
                  onChange={(e) =>
                    handleHospitalAddressChange("PinCode", e.target.value)
                  }
                  value={updateValue.clinic_hospital_address.PinCode}
                  placeholder="Enter Pin Code"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-800"
                />
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  name="state"
                  onChange={(e) =>
                    handleHospitalAddressChange("state", e.target.value)
                  }
                  value={updateValue.clinic_hospital_address.state}
                  placeholder="Enter State"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-800"
                />
              </div>

              {/* Permanent Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permanent Address
                </label>
                <input
                  type="text"
                  name="permanentAddress"
                  onChange={(e) =>
                    handleHospitalAddressChange(
                      "permanentAddress",
                      e.target.value
                    )
                  }
                  value={updateValue.clinic_hospital_address.permanentAddress}
                  placeholder="Enter Permanent Address"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-500 text-gray-800"
                />
              </div>
            </div>
          )}

          {semibtns === "FAQ" && (
            <div className="faq-container p-4">
              {updateValue?.FAQ?.map((faq, index) => (
                <div
                  key={index}
                  className="faq-item mb-4 p-4 border border-gray-300 rounded-lg shadow-md bg-white transition duration-200 ease-in-out hover:shadow-lg"
                >
                  <label
                    className="block mb-2 text-sm font-medium text-gray-700"
                    htmlFor={`faq-title-${index}`}
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    id={`faq-title-${index}`}
                    name="title"
                    value={faq.title}
                    placeholder="Enter Title"
                    onChange={(e) =>
                      handleFAQchange(index, "title", e.target.value)
                    }
                    className="faq-input mb-2 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                  <label
                    className="block mb-2 text-sm font-medium text-gray-700"
                    htmlFor={`faq-value-${index}`}
                  >
                    Value
                  </label>
                  <input
                    type="text"
                    id={`faq-value-${index}`}
                    name="value"
                    value={faq.value}
                    placeholder="Enter Value"
                    onChange={(e) =>
                      handleFAQchange(index, "value", e.target.value)
                    }
                    className="faq-input mb-4 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                  />
                  <button
                    type="button"
                    onClick={() => removeFAQ(index)}
                    className="remove-btn mt-2 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addFAQ}
                className="add-btn mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
              >
                Add FAQ
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-center items-center mt-4 gap-4">
        <button
          className="flex justify-center items-center px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 shadow-md transition duration-200 ease-in-out"
          onClick={ProfilePatchData}
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default EditDrProfileShow;

// import React, { useEffect, useState } from 'react'
// import { MdCancel } from 'react-icons/md';
// import { TiTickOutline } from 'react-icons/ti';

// function EditDrProfileShow({ profileShow, setProfileShow }) {
//     const [semidropdown, setsemiDropdown] = useState("")
//     const [specialtyoptions, setSpecialityOptions] = useState([])
//     const [isOpen, setIsOpen] = useState(false);


//     const backendSpecialist=profileShow.specialitycategories.map((ele)=>ele.specialtyName)

//     useEffect(() => {
//         SelectSpecialty()
//     }, [])

//     const SelectSpecialty = async () => {
//         try {
//             const array = await fetch("https://api.assetorix.com/ah/api/v1/dc/user/Category")
//             const result = await array.json()
//             const specialty = result.data.map((ele) => ({
//                 _id: ele._id,  // Extract _id
//                 specialtyName: ele.specialtyName  // Extract specialtyName
//             }));
//             setSpecialityOptions(specialty);

//         } catch (error) {

//         }
//     }


//     // Toggle function to open/close dropdown
//     const toggleDropdown = () => {
//         setIsOpen(!isOpen);
//     };

//     const handleSelectSpecialty = (id) => {
//         // Check if the ID is already selected, if not, add it
//         if (!profileShow.specialitycategories.includes(id)) {
//             const updatedSpecialities = [...profileShow.specialitycategories, id];
//             setProfileShow({ ...profileShow, specialitycategories: updatedSpecialities });
//         }
//         setIsOpen(false); // Close the dropdown after selection
//     };

//     const handleRemoveSpecialty = (id) => {
//         setProfileShow((prev) => ({
//             ...prev,
//             specialitycategories: prev.specialitycategories.filter(
//                 (specialtyId) => specialtyId !== id
//             ),
//         }));
//     };

//     return (
//         <div style={{ border: "1px solid red" }} className='w-[100%] h-[100%] flex'>
//             <div style={{ border: "1px solid green" }} className='w-[20%] h-[100%]'>
//                 <button onClick={() => setsemiDropdown("name")}>Doctor Details</button>
//                 <button onClick={()=>setsemiDropdown("qualifications")}>Qualifications</button>
//             </div>

//             <div style={{ border: "1px solid black" }} className='w-[80%] h-[100%]'>
//                 {
//                     semidropdown == "name" && (
//                         <div className="mb-6">
//                         <label className='font-bold text-lg'>Edit Doctor Category</label>
//                         <br />
//                         <div className="relative text-left w-full mt-4 flex justify-center">
//                             <button
//                                 type='button'
//                                 style={{border: "1px solid red"}}
//                                 onClick={toggleDropdown}
//                                 className="flex items-center h-[40px] gap-2 bg-[#00768A] border-2 border-gray-300 text-white px-4 py-2 rounded-md w-[75%] text-start hover:bg-opacity-80 transition duration-200 focus:outline-none focus:ring-2 focus:ring-[#005f65]"
//                             >
//                                 {profileShow.specialitycategories.length > 0 ? (
//                                     specialtyoptions
//                                         .filter(option => profileShow.specialitycategories.includes(option._id))
//                                         .map(option => (
//                                             <span key={option._id} className="flex items-center mr-2">
//                                                 {option.specialtyName}
//                                                 <MdCancel className="ml-1 cursor-pointer hover:text-red-400" onClick={() => handleRemoveSpecialty(option._id)} />
//                                             </span>
//                                         ))
//                                 ) : (
//                                     <span className="text-gray-400">Select Specialties</span>
//                                 )}
//                             </button>
//                             {isOpen && (
//                                 <div className="absolute mt-10 w-[75%] rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
//                                     <div className="py-1 max-h-60 overflow-y-auto">
//                                         {specialtyoptions.map(ele => (
//                                             <div
//                                                 key={ele._id}
//                                                 onClick={() => handleSelectSpecialty(ele._id)}
//                                                 className="flex items-center justify-between px-4 py-2 text-gray-700 hover:bg-[#00768A] hover:text-white cursor-pointer transition duration-200"
//                                             >
//                                                 <span>{ele.specialtyName}</span>
//                                                 {profileShow.specialitycategories.includes(ele._id) && <TiTickOutline className="text-[#00768A]" />}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     )
//                 }

//                 {
//                     semidropdown=="qualifications" &&(
//                         <div>

//                         </div>
//                     )
//                 }
//             </div>
//         </div>
//     )
// }

// export default EditDrProfileShow
