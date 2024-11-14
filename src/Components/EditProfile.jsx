import React, { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";
import axios from "axios";

const EditProfile = () => {
  const [activesection, setActiveSection] = useState("Doctor-Details");
  const [openIndex, setOpenIndex] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [dataToEdit, setDataToEdit] = useState({
    FAQ: [
      {
        title: "",
        value: "",
      },
    ],
    aboutDoctor: "",
    clinicHospitalAddress: {
      PinCode: "",
      city: "",
      permanentAddress: "",
      state: "",
    },
    hospitalName: "",
    servicesOffered: [],
    yearsOfExperience: [
      {
        description: "",
        employmentType: "",
        endDate: "",
        jobTitle: "",
        organizationLocation: "",
        organizationName: "",
        skills: [],
        startDate: [
          {
            month: "",
            year: "",
          },
        ],
      },
    ],
    qualifications: [
      {
        degree: "",
        description: "",
        endDate: "",
        fieldOfStudy: "",
        instituteName: "",
        skills: [],
        startDate: "",
      },
    ],
    userData: {
      name: "",
    },
  });

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const getDoctorsForEdit = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/doctor`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );

      // Mapping the response data into dataToEdit format
      const doctorData = response.data.data;

      setDataToEdit({
        FAQ: doctorData.FAQ || [{ title: "", value: "" }],
        aboutDoctor: doctorData.aboutDoctor || "",
        clinicHospitalAddress: {
          PinCode: doctorData.clinicHospitalAddress?.PinCode || "",
          city: doctorData.clinicHospitalAddress?.city || "",
          permanentAddress:
            doctorData.clinicHospitalAddress?.permanentAddress || "",
          state: doctorData.clinicHospitalAddress?.state || "",
        },
        hospitalName: doctorData.hospitalName || "",
        servicesOffered: doctorData.servicesOffered || "",
        name: doctorData?.userData?.name || "",
        yearsOfExperience: doctorData.yearsOfExperience?.map((experience) => ({
          description: experience.description || "",
          employmentType: experience.employmentType || "",
          endDate: experience.endDate || "",
          jobTitle: experience.jobTitle || "",
          organizationLocation: experience.organizationLocation || "",
          organizationName: experience.organizationName || "",
          skills: experience.skills || [],
          startDate: {
            month: experience.startDate?.month || "",
            year: experience.startDate?.year || "",
          },
        })) || [
          {
            description: "",
            employmentType: "",
            endDate: "",
            jobTitle: "",
            organizationLocation: "",
            organizationName: "",
            skills: [],
            startDate: { month: "", year: "" },
          },
        ],
        qualifications: doctorData.qualifications?.map((qualification) => ({
          degree: qualification.degree || "",
          description: qualification.description || "",
          endDate: qualification.endDate || "",
          fieldOfStudy: qualification.fieldOfStudy || "",
          instituteName: qualification.instituteName || "",
          skills: qualification.skills || [],
          startDate: {
            month: qualification.startDate?.month || "",
            year: qualification.startDate?.year || "",
          },
          endDate: {
            month: qualification.endDate?.month || "",
            year: qualification.endDate?.year || "",
          },
        })) || [
          {
            degree: "",
            description: "",
            endDate: "",
            fieldOfStudy: "",
            instituteName: "",
            skills: [],
            startDate: { month: "", year: "" },
            endDate: { month: "", year: "" },
          },
        ],
      });

      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log("Data to edit", dataToEdit.name);

  const patchDoctorData = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `https://api.assetorix.com/ah/api/v1/dc/doctor`,
        dataToEdit,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorsForEdit();
  }, []);

  // ---------------------------------------------------------------------------------------------------------
  // FAQ's section functionalities is here
  const handleInputChange = (index, field, value) => {
    const updatedFaqs = [...faqs];
    updatedFaqs[index][field] = value;
    setFaqs(updatedFaqs);
  };

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // --------------------------------------------------------------------------------------------------------
  //Qualification details section is here

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const handleSkillChange = (expIndex, skillIndex, value) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].skills[skillIndex] = value;
    setExperiences(updatedExperiences);
  };

  const handleAddSkill = (expIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].skills.push("");
    setExperiences(updatedExperiences);
  };

  const handleDeleteSkill = (expIndex, skillIndex) => {
    const updatedExperiences = [...experiences];
    updatedExperiences[expIndex].skills.splice(skillIndex, 1);
    setExperiences(updatedExperiences);
  };

  const monthMap = {
    January: "01",
    February: "02",
    March: "03",
    April: "04",
    May: "05",
    June: "06",
    July: "07",
    August: "08",
    September: "09",
    October: "10",
    November: "11",
    December: "12",
  };

  const formatDate = (month, year) => {
    const monthNumber = monthMap[month]; // Convert month name to number
    return `${year}-${monthNumber}-01`; // Assuming the day is the 1st, you can modify this if needed
  };

  const handleChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "servicesOffered") {
      // Handle changes to servicesOffered array
      const updatedServices = [...dataToEdit.servicesOffered];
      updatedServices[index] = value;
      setDataToEdit((prevState) => ({
        ...prevState,
        servicesOffered: updatedServices,
      }));
    } else if (name in dataToEdit.clinicHospitalAddress) {
      // Handle changes to clinicHospitalAddress fields
      setDataToEdit((prevState) => ({
        ...prevState,
        clinicHospitalAddress: {
          ...prevState.clinicHospitalAddress,
          [name]: value,
        },
      }));
    } else if (name === "aboutDoctor") {
      // Handle changes to aboutDoctor
      setDataToEdit((prevState) => ({
        ...prevState,
        aboutDoctor: value,
      }));
    } else if (name === "name") {
      // Handle changes to doctor name
      setDataToEdit((prevState) => ({
        ...prevState,
        userData: {
          ...prevState.userData,
          name: value,
        },
      }));
    }
  };

  // Experience qualification change
  const handleExperienceChange = (index, field, value) => {
    const updatedQualifications = [...dataToEdit.qualifications];
    updatedQualifications[index] = {
      ...updatedQualifications[index],
      [field]: value,
    };
    setDataToEdit({
      ...dataToEdit,
      qualifications: updatedQualifications,
    });
  };

  const experienceChange = (index, field, value) => {
    const updatedExperience = [...dataToEdit.yearsOfExperience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    setDataToEdit({
      ...dataToEdit,
      yearsOfExperience: updatedExperience,
    });
  };

  const handleChangeFaq = (index, field, value) => {
    const updatedFaq = [...dataToEdit.FAQ]; // Copy the FAQ array
    updatedFaq[index] = { ...updatedFaq[index], [field]: value }; // Update the specific FAQ field
    setDataToEdit({ ...dataToEdit, FAQ: updatedFaq }); // Update state
  };

  return (
    <>
      <div className="flex">
        <div className="w-[30%] bg-white shadow-sm px-5 py-10 flex flex-col">
          {/* Personal details part is here */}
          <div className="flex gap-3 justify-start items-center ml-5">
            <div
              className={`${
                activesection == "Doctor-Details"
                  ? "rounded-full border-blue-500 text-blue-500 h-[40px] w-[40px] flex justify-center items-center border"
                  : "rounded-full bg-[#4358f6] flex justify-center items-center p-2 h-[40px] w-[40px]"
              }`}
            >
              <IoPerson
                className={`${
                  activesection == "Doctor-Details"
                    ? "text-blue-500 text-[20px]"
                    : "text-white text-[20px]"
                }`}
              />
            </div>

            <div>
              <p
                onClick={() => setActiveSection("Doctor-Details")}
                className={`${
                  activesection == "Doctor-Details"
                    ? "text-blue-500 font-bold text-xl cursor-pointer"
                    : "text-black font-bold text-xl cursor-pointer"
                }`}
              >
                Doctor Details
              </p>
            </div>
          </div>
          <div className="bg-gray-300 h-[50px] w-[1px] ml-[40px]"></div>

          {/* FAQ part is here */}
          <div className="flex gap-3 justify-start items-center ml-5">
            <div
              className={`${
                activesection == "FAQ"
                  ? "rounded-full border-[#46b8bc] text-blue-500 h-[40px] w-[40px] flex justify-center items-center border"
                  : "rounded-full bg-[#46b8bc] flex justify-center h-[40px] w-[40px] items-center"
              }`}
            >
              <FaQuestion
                className={`${
                  activesection == "FAQ"
                    ? "text-[#46b8bc] text-[22px]"
                    : "text-white text-[22px]"
                }`}
              />
            </div>

            <div>
              <p
                onClick={() => setActiveSection("FAQ")}
                className={`${
                  activesection == "FAQ"
                    ? "text-[#46b8bc] font-bold text-xl cursor-pointer"
                    : "text-black font-bold text-xl cursor-pointer"
                }`}
              >
                FAQ's
              </p>
            </div>
          </div>
          <div className="bg-gray-300 h-[50px] w-[1px] ml-[40px]"></div>

          {/* user-details part is here */}
          <div className="flex gap-3 justify-start items-center ml-5">
            <div
              className={`${
                activesection == "qualification-details"
                  ? "rounded-full border-[#cc926e] text-blue-500 h-[40px] w-[40px] flex justify-center items-center border"
                  : "rounded-full bg-[#cc926e] flex justify-center items-center h-[40px] w-[40px]"
              }`}
            >
              <IoPerson
                className={`${
                  activesection == "qualification-details"
                    ? "text-[#cc926e] text-[22px]"
                    : "text-white text-[22px]"
                }`}
              />
            </div>

            <div>
              <p
                onClick={() => {
                  setActiveSection("qualification-details");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`${
                  activesection == "qualification-details"
                    ? "text-[#cc926e] font-bold text-xl cursor-pointer"
                    : "text-black font-bold text-xl cursor-pointer"
                }`}
              >
                Qualification Details
              </p>
            </div>
          </div>
          <div className="bg-gray-300 h-[50px] w-[1px] ml-[40px]"></div>

          {/* Experience part is here */}
          <div className="flex gap-3 justify-start items-center ml-5">
            <div
              className={`${
                activesection == "Experience"
                  ? "rounded-full border-[#6fcd9e] text-blue-500 h-[40px] w-[40px] flex justify-center items-center border"
                  : "rounded-full bg-[#6fcd9e] flex justify-center items-center h-[40px] w-[40px]"
              }`}
            >
              <MdOutlineTimer
                className={`${
                  activesection == "Experience"
                    ? "text-[#6fcd9e] text-[22px]"
                    : "text-white text-[22px]"
                }`}
              />
            </div>

            <div>
              <p
                onClick={() => {
                  setActiveSection("Experience");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className={`${
                  activesection == "Experience"
                    ? "text-[#6fcd9e] font-bold text-xl cursor-pointer"
                    : "text-black font-bold text-xl cursor-pointer"
                }`}
              >
                Experience
              </p>
            </div>
          </div>
        </div>

        <div className="w-[70%] bg-white shadow-sm px-5 py-10">
          <form>
            {activesection === "Doctor-Details" && (
              <div className="space-y-5">
                {/* Doctor Name */}
                <div className="flex flex-col gap-1">
                  <label className="px-2 font-bold">Doctor Name</label>
                  <input
                    type="text"
                    name="name" // Bind to the correct state
                    placeholder="Enter Full Name"
                    className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                    value={dataToEdit.name || ""}
                  />
                </div>

                {/* About Doctor */}
                <div className="flex flex-col gap-1">
                  <label className="px-2 font-bold">About Doctor</label>
                  <textarea
                    name="aboutDoctor" // Bind to the correct state
                    placeholder="Enter details about the doctor"
                    className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6] focus:outline-none"
                    value={dataToEdit?.aboutDoctor || ""}
                    onChange={handleChange}
                  />
                </div>

                {/* Hospital Address */}
                <p className="px-2 font-bold text-gray-500">Hospital Address</p>

                <div className="grid grid-cols-2 gap-5">
                  {/* Permanent Address */}
                  <div className="flex flex-col gap-1">
                    <label className="px-2 font-bold">Permanent Address</label>
                    <input
                      type="text"
                      name="permanentAddress" // Bind to the correct state
                      placeholder="Enter Permanent Address"
                      className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                      value={
                        dataToEdit?.clinicHospitalAddress?.permanentAddress ||
                        ""
                      }
                      onChange={handleChange}
                    />
                  </div>

                  {/* State */}
                  <div className="flex flex-col gap-1">
                    <label className="px-2 font-bold">State</label>
                    <input
                      type="text"
                      name="state" // Bind to the correct state
                      placeholder="Enter State"
                      className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                      value={dataToEdit?.clinicHospitalAddress?.state || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {/* City */}
                  <div className="flex flex-col gap-1">
                    <label className="px-2 font-bold">City</label>
                    <input
                      type="text"
                      name="city" // Bind to the correct state
                      placeholder="Enter City"
                      className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                      value={dataToEdit?.clinicHospitalAddress?.city || ""}
                      onChange={handleChange}
                    />
                  </div>

                  {/* Pincode */}
                  <div className="flex flex-col gap-1">
                    <label className="px-2 font-bold">Pincode</label>
                    <input
                      type="text"
                      name="PinCode" // Bind to the correct state
                      placeholder="Enter Pincode"
                      className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                      value={dataToEdit?.clinicHospitalAddress?.PinCode || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Services Offered */}
                <div className="flex flex-col gap-1">
                  <label className="px-2 font-bold">Services</label>
                  <div className="flex gap-5">
                    {dataToEdit?.servicesOffered?.map((service, index) => (
                      <input
                        key={index}
                        type="text"
                        name="servicesOffered" // Name can be the same as it is part of an array
                        placeholder="Enter Service"
                        className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                        value={service || ""}
                        onChange={(e) => handleChange(e, index)} // Pass the index for updating the right service
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activesection === "qualification-details" && (
              <div className="space-y-4">
                {dataToEdit?.qualifications?.map((experience, index) => (
                  <div key={index}>
                    {/* Toggle Button */}
                    <button
                      type="button"
                      className="w-full text-left font-bold bg-gray-100 p-4 rounded-md focus:border-[#4358f6] focus:outline-none"
                      onClick={() => toggleSection(index)}
                    >
                      {experience.degree || `Experience ${index + 1}`}
                    </button>

                    {/* Collapsible Content */}
                    {openSection === index && (
                      <div className="p-4 border border-gray-200 rounded-md space-y-4">
                        {/* Description */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">Description</label>
                          <input
                            type="text"
                            value={experience.description || ""}
                            placeholder="Enter Description"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Employment Type */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">
                            Institute Name
                          </label>
                          <input
                            type="text"
                            value={experience.instituteName || ""}
                            placeholder="Enter Employment Type"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "instituteName",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Start Date and End Date */}
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-1 w-full">
                            <label className="px-2 font-bold">Start Date</label>
                            <input
                              type="date"
                              value={experience.startDate || ""}
                              className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "startDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="px-2 font-bold">End Date</label>
                            <input
                              type="date"
                              value={experience.endDate || ""}
                              className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                              onChange={(e) =>
                                handleExperienceChange(
                                  index,
                                  "endDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        {/* Job Title */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">
                            Field of Study
                          </label>
                          <input
                            type="text"
                            value={experience.fieldOfStudy || ""}
                            placeholder="Enter Job Title"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "fieldOfStudy",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Skills Section */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">Skills</label>
                          <div className="flex flex-wrap gap-2">
                            {experience.skills?.map((skill, skillIndex) => (
                              <div
                                key={skillIndex}
                                className="flex items-center gap-2"
                              >
                                <input
                                  type="text"
                                  value={skill || ""}
                                  className="border border-gray-400 px-2 py-1 rounded-md focus:border-[#4358f6]"
                                  onChange={(e) =>
                                    handleSkillChange(
                                      index,
                                      skillIndex,
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteSkill(index, skillIndex)
                                  }
                                  className="text-red-500 px-2 py-1 rounded-md"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                          {/* Add New Skill Button */}
                          <button
                            type="button"
                            onClick={() => handleAddSkill(index)}
                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                          >
                            Add Skill
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {activesection === "FAQ" && (
              <div className="space-y-4">
                <h2 className="font-bold text-lg">FAQs</h2>
                {dataToEdit?.FAQ?.map((faq, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-4"
                  >
                    {/* FAQ Title - Click to Expand/Collapse */}
                    <button
                      type="button"
                      onClick={() => toggleOpen(index)}
                      className="w-full text-left font-bold bg-gray-200 p-2 rounded-md"
                    >
                      {faq.title}
                    </button>

                    {/* Collapsible Content */}
                    {openIndex === index && (
                      <div className="space-y-4 mt-4">
                        {/* Editable FAQ Title */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">FAQ Title</label>
                          <input
                            type="text"
                            value={faq.title}
                            onChange={(e) =>
                              handleChangeFaq(index, "title", e.target.value)
                            }
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            placeholder="Enter FAQ title"
                          />
                        </div>

                        {/* Editable FAQ Value */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">FAQ Value</label>
                          <input
                            type="text"
                            value={faq.value}
                            onChange={(e) =>
                              handleChangeFaq(index, "value", e.target.value)
                            }
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            placeholder="Enter FAQ answer"
                          />
                        </div>

                        <button
                          type="button"
                          className="bg-blue-500 text-white p-2 rounded-md"
                          onClick={() => toggleOpen(null)}
                        >
                          Save FAQ
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {activesection === "Experience" && (
              <div className="space-y-4">
                {dataToEdit?.yearsOfExperience?.map((experience, index) => (
                  <div key={index}>
                    {/* Toggle Button */}
                    <button
                      type="button"
                      className="w-full text-left font-bold bg-gray-100 p-4 rounded-md focus:border-[#4358f6] focus:outline-none"
                      onClick={() => toggleSection(index)}
                    >
                      {experience.jobTitle || `Experience ${index + 1}`}
                    </button>

                    {/* Collapsible Content */}
                    {openSection === index && (
                      <div className="p-4 border border-gray-200 rounded-md space-y-4">
                        {/* Description */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">Description</label>
                          <input
                            type="text"
                            value={experience.description || ""}
                            placeholder="Enter Description"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              experienceChange(
                                index,
                                "description",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Employment Type */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">
                            Employment Type
                          </label>
                          <input
                            type="text"
                            value={experience.employmentType || ""}
                            placeholder="Enter Employment Type"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              experienceChange(
                                index,
                                "employmentType",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Start Date and End Date */}
                        <div className="flex gap-4">
                          <div className="flex flex-col gap-1 w-full">
                            <label className="px-2 font-bold">Start Date</label>
                            <input
                              type="date"
                              value={
                                formatDate(
                                  experience.startDate.month,
                                  experience.startDate.year
                                ) || ""
                              }
                              className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                              onChange={(e) =>
                                experienceChange(
                                  index,
                                  "startDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="flex flex-col gap-1 w-full">
                            <label className="px-2 font-bold">End Date</label>
                            <input
                              type="date"
                              value={
                                formatDate(
                                  experience.endDate.month,
                                  experience.endDate.year
                                ) || ""
                              }
                              className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                              onChange={(e) =>
                                experienceChange(
                                  index,
                                  "endDate",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        {/* Job Title */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">Job Title</label>
                          <input
                            type="text"
                            value={experience.jobTitle || ""}
                            placeholder="Enter Job Title"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              experienceChange(
                                index,
                                "jobTitle",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Organisation Location */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">
                            Organisation Location
                          </label>
                          <input
                            type="text"
                            value={experience.organizationLocation || ""}
                            placeholder="Enter Location"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              experienceChange(
                                index,
                                "organizationLocation",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Organisation Name */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">
                            Organisation Name
                          </label>
                          <input
                            type="text"
                            value={experience.organizationName || ""}
                            placeholder="Enter Organisation Name"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              experienceChange(
                                index,
                                "organizationName",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Skills Section */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">Skills</label>
                          <div className="flex flex-wrap gap-2">
                            {experience.skills.map((skill, skillIndex) => (
                              <div
                                key={skillIndex}
                                className="flex items-center gap-2"
                              >
                                <input
                                  type="text"
                                  value={skill || ""}
                                  className="border border-gray-400 px-2 py-1 rounded-md focus:border-[#4358f6]"
                                  onChange={(e) =>
                                    handleSkillChange(
                                      index,
                                      skillIndex,
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteSkill(index, skillIndex)
                                  }
                                  className="text-red-500 px-2 py-1 rounded-md"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                          {/* Add New Skill Button */}
                          <button
                            type="button"
                            onClick={() => handleAddSkill(index)}
                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                          >
                            Add Skill
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            <div className="bg-[#00768A] flex justify-center items-center rounded-xl mt-5">
              <button className="text-white p-2 " onClick={patchDoctorData}>
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
