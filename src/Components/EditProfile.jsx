import React, { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import {
  MdClose,
  MdKeyboardDoubleArrowUp,
  MdOutlineTimer,
} from "react-icons/md";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [activesection, setActiveSection] = useState("Doctor-Details");
  const [openIndex, setOpenIndex] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [dataToEdit, setDataToEdit] = useState({
    FAQ: [
      {
        title: "",
        value: "",
      },
    ],
    aboutDoctor: "",
    clinic_hospital_address: {
      PinCode: "",
      city: "",
      permanentAddress: "",
      state: "",
    },
    hospitalName: "",
    services_offered: [],
    years_of_experience: [
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

  const [loadingUpdateBtn, setLoadingState] = useState(false);
  const navigate = useNavigate();

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
        clinic_hospital_address: {
          PinCode: doctorData.clinic_hospital_address?.PinCode || "",
          city: doctorData.clinic_hospital_address?.city || "",
          permanentAddress:
            doctorData.clinic_hospital_address?.permanentAddress || "",
          state: doctorData.clinic_hospital_address?.state || "",
        },
        hospitalName: doctorData.hospitalName || "",
        services_offered: doctorData.services_offered || "",
        name: doctorData?.userData?.name || "",
        years_of_experience: doctorData.years_of_experience?.map(
          (experience) => ({
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
          })
        ) || [
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
    } catch (error) {}
  };

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
      toast.success("Data updated successfully!");
    } catch (error) {}
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

  // Functions for managing FAQ
  const handleAddFaq = () => {
    // Add a new empty FAQ entry
    const newFaq = { title: "", value: "" };
    setDataToEdit((prevData) => ({
      ...prevData,
      FAQ: [...prevData.FAQ, newFaq],
    }));
  };

  const handleDeleteFaq = (index) => {
    // Remove the FAQ at the specified index
    setDataToEdit((prevData) => ({
      ...prevData,
      FAQ: prevData.FAQ.filter((_, i) => i !== index),
    }));
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

    if (name === "services_offered") {
      // Handle changes to services_offered array
      const updatedServices = [...dataToEdit.services_offered];
      updatedServices[index] = value;
      setDataToEdit((prevState) => ({
        ...prevState,
        services_offered: updatedServices,
      }));
    } else if (name in dataToEdit.clinic_hospital_address) {
      // Handle changes to clinicHospitalAddress fields
      setDataToEdit((prevState) => ({
        ...prevState,
        clinic_hospital_address: {
          ...prevState.clinic_hospital_address,
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
    setDataToEdit((prevState) => {
      const updatedExperience = [...prevState.years_of_experience];
      updatedExperience[index] = {
        ...updatedExperience[index],
        [field]: value,
      };
      return { ...prevState, years_of_experience: updatedExperience };
    });
  };

  const experienceChange = (index, field, value) => {
    const updatedExperience = [...dataToEdit.years_of_experience];
    updatedExperience[index] = {
      ...updatedExperience[index],
      [field]: value,
    };
    setDataToEdit({
      ...dataToEdit,
      years_of_experience: updatedExperience,
    });
  };

  const handleChangeFaq = (index, field, value) => {
    const updatedFaq = [...dataToEdit.FAQ]; // Copy the FAQ array
    updatedFaq[index] = { ...updatedFaq[index], [field]: value }; // Update the specific FAQ field
    setDataToEdit({ ...dataToEdit, FAQ: updatedFaq }); // Update state
  };

  // Add this function to handle adding a new qualification
  const handleAddQualification = (e) => {
    e.preventDefault();
    setDataToEdit((prevData) => ({
      ...prevData,
      qualifications: [
        ...prevData.qualifications,
        {
          degree: "",
          description: "",
          endDate: { month: "", year: "" },
          fieldOfStudy: "",
          instituteName: "",
          skills: [],
          startDate: { month: "", year: "" },
        },
      ],
    }));

    // Automatically open the new qualification section
    setOpenSection(dataToEdit.qualifications.length); // set to new qualification index
  };

  const handleAddQualificationSkill = (index) => {
    const updatedQualifications = [...dataToEdit.qualifications];
    if (!updatedQualifications[index].skills) {
      updatedQualifications[index].skills = [];
    }
    updatedQualifications[index].skills.push(""); // Add a new empty skill
    setDataToEdit({ ...dataToEdit, qualifications: updatedQualifications });
  };

  // Function to handle skill input change
  const handleQualificationSkillChange = (
    qualificationIndex,
    skillIndex,
    value
  ) => {
    const updatedQualifications = [...dataToEdit.qualifications];
    updatedQualifications[qualificationIndex].skills[skillIndex] = value;
    setDataToEdit({ ...dataToEdit, qualifications: updatedQualifications });
  };

  // Function to delete a skill
  const handleDeleteQualificationSkill = (qualificationIndex, skillIndex) => {
    const updatedQualifications = [...dataToEdit.qualifications];
    updatedQualifications[qualificationIndex].skills = updatedQualifications[
      qualificationIndex
    ].skills.filter((_, index) => index !== skillIndex);
    setDataToEdit({ ...dataToEdit, qualifications: updatedQualifications });
  };

  const handleDeleteQualification = (qualificationIndex) => {
    const updatedQualifications = dataToEdit.qualifications.filter(
      (_, index) => index !== qualificationIndex
    );
    setDataToEdit({ ...dataToEdit, qualifications: updatedQualifications });
  };

  const handleChangeQualification = (index, field, value) => {
    const updatedQualifications = [...dataToEdit.qualifications];
    updatedQualifications[index][field] = value;
    setDataToEdit({ ...dataToEdit, qualifications: updatedQualifications });
  };

  // ------------------------------------------------------------------------------------
  // doctors details
  // Handle adding a new service
  const addService = async () => {
    const updatedServices = [...dataToEdit.services_offered, ""];
    setDataToEdit((prevData) => ({
      ...prevData,
      services_offered: updatedServices,
    }));
    await updateServicesInBackend(updatedServices); // Update backend
  };

  // Handle deleting a service
  const deleteService = async (index) => {
    const updatedServices = dataToEdit.services_offered.filter(
      (_, i) => i !== index
    );
    setDataToEdit((prevData) => ({
      ...prevData,
      services_offered: updatedServices,
    }));
    await updateServicesInBackend(updatedServices); // Update backend
  };

  // Handle input change for services
  const handleServiceChange = (e, index) => {
    const newServices = [...dataToEdit.services_offered];
    newServices[index] = e.target.value;
    setDataToEdit((prevData) => ({
      ...prevData,
      services_offered: newServices,
    }));
  };

  // ----------------------------------------------------------------------------------------------------
  // Add new Experience function
  const handleAddExperience = () => {
    const newExperience = {
      description: "",
      employmentType: "",
      startDate: "",
      endDate: "",
      jobTitle: "",
      organizationLocation: "",
      organizationName: "",
      skills: [],
    };
    setDataToEdit((prevData) => ({
      ...prevData,
      years_of_experience: [...prevData.years_of_experience, newExperience],
    }));
  };

  const handleDeleteExperience = (index) => {
    setDataToEdit((prevData) => ({
      ...prevData,
      years_of_experience: prevData.years_of_experience.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleAddExperienceSkill = (experienceIndex) => {
    setDataToEdit((prevData) => {
      const updatedData = { ...prevData };
      // Add a new empty skill to the skills array of the specific experience
      updatedData.years_of_experience[experienceIndex].skills = [
        ...updatedData.years_of_experience[experienceIndex].skills,
        "",
      ];
      return updatedData;
    });
  };

  const handleDeleteExperienceSkill = (experienceIndex, skillIndex) => {
    setDataToEdit((prevData) => {
      const updatedData = { ...prevData };
      // Remove the skill at the given index for the specific experience
      updatedData.years_of_experience[experienceIndex].skills.splice(
        skillIndex,
        1
      );
      return updatedData;
    });
  };

  const handleExperienceSkillChange = (
    experienceIndex,
    skillIndex,
    newSkill
  ) => {
    setDataToEdit((prevData) => {
      const updatedData = { ...prevData };
      updatedData.years_of_experience[experienceIndex].skills[skillIndex] =
        newSkill;
      return updatedData;
    });
  };

  // / Function to toggle the profile bar
  const toggleProfileBar = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const closeProfileBar = () => {
    setIsProfileOpen(false);
  };

  return (
    <>
      <div className="sm:flex">
        <div className="w-[30%] bg-white shadow-sm px-5 py-10 sm:flex sm:flex-col hidden">
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

        {/* for mobile section */}
        <div className="sm:hidden">
          {/* Profile Button at the top */}
          <div
            onClick={toggleProfileBar}
            className="flex z-50 justify-center items-center w-full sticky top-0 bg-gray-100"
          >
            <button className="bg-blue-500 text-[22px] text-white p-4 rounded-xl shadow-lg md:hidden focus:outline-none w-full mx-5 mt-5">
              Profile
            </button>
            <MdKeyboardDoubleArrowUp className="text-white absolute top-[40px] left-[110px] text-[25px]" />
          </div>

          {/* Background Overlay (Visible when profile bar is open) */}
          {isProfileOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
              onClick={closeProfileBar}
            />
          )}

          {/* Profile Bar (Visible only on mobile) */}
          <div
            className={`shadow-xl bg-gray-100 fixed bottom-0 left-0 w-full transition-transform duration-300 md:hidden z-50 ${
              isProfileOpen
                ? "transform translate-y-0"
                : "transform translate-y-full"
            }`}
            style={{
              height: "80%",
            }}
          >
            {/* Profile Options */}
            <div className="flex flex-col space-y-4 p-6">
              {/* Close Button (Cross Icon) */}
              <div className="flex justify-between">
                <p className="text-[21px] text-gray-500 font-bold">
                  Select the section
                </p>
                <div className="flex justify-end">
                  <MdClose
                    onClick={closeProfileBar}
                    className="text-2xl cursor-pointer text-gray-600"
                  />
                </div>
              </div>

              {/* Profile Options */}
              <div
                onClick={() => {
                  setActiveSection("Doctor-Details"), setIsProfileOpen(false);
                }}
                className="flex justify-center items-center gap-2 border w-[100%] p-2 bg-[#00768A] 
                 rounded-xl text-white"
              >
                <IoPerson />
                <button className="text-xl">Doctor Details</button>
              </div>

              <div
                onClick={() => {
                  setActiveSection("FAQ"), setIsProfileOpen(false);
                }}
                className="flex justify-center items-center gap-2 border w-[100%] p-2 bg-[#00768A] 
                 rounded-xl text-white"
              >
                <FaQuestion />
                <button className="text-xl">FAQ</button>
              </div>

              <div
                onClick={() => {
                  setActiveSection("qualification-details"),
                    setIsProfileOpen(false);
                }}
                className="flex justify-center items-center gap-2 border  w-[100%] p-2 bg-[#00768A] 
                 rounded-xl text-white"
              >
                <IoPerson />
                <button className="text-xl">Qualification Details</button>
              </div>

              <div
                onClick={() => {
                  setActiveSection("Experience"), setIsProfileOpen(false);
                }}
                className="flex justify-center items-center gap-2 border  w-[100%] p-2 bg-[#00768A] 
                 rounded-xl text-white"
              >
                <MdOutlineTimer />
                <button className="text-xl">Experience Details</button>
              </div>
            </div>
          </div>
        </div>

        <div className="sm:w-[70%] w-[100%] bg-white shadow-sm px-5 py-10">
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
                        dataToEdit?.clinic_hospital_address?.permanentAddress ||
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
                      value={dataToEdit?.clinic_hospital_address?.state || ""}
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
                      value={dataToEdit?.clinic_hospital_address?.city || ""}
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
                      value={dataToEdit?.clinic_hospital_address?.PinCode || ""}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Services Offered */}
                <div className="flex flex-col gap-1">
                  <label className="px-2 font-bold">Services</label>
                  <div className="flex flex-col gap-2">
                    {dataToEdit?.services_offered?.map((service, index) => (
                      <div key={index} className="flex gap-3 items-center">
                        <input
                          type="text"
                          placeholder="Enter Service"
                          className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                          value={service || ""}
                          onChange={(e) => handleServiceChange(e, index)}
                          onBlur={() =>
                            updateServicesInBackend(
                              dataToEdit?.services_offered
                            )
                          } // Update backend on blur
                        />
                        <button
                          type="button"
                          onClick={() => deleteService(index)}
                          className="text-red-500 px-2"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addService}
                      className="mt-2 text-white bg-blue-500 p-2 focus:outline-none rounded-xl"
                    >
                      Add Service
                    </button>
                  </div>
                </div>
              </div>
            )}
            {activesection === "qualification-details" && (
              <div className="space-y-4">
                {dataToEdit?.qualifications?.map(
                  (qualification, qualificationIndex) => (
                    <div key={qualificationIndex}>
                      {/* Toggle Button */}
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="w-full text-left font-bold bg-gray-100 p-4 rounded-md focus:border-[#4358f6] focus:outline-none"
                          onClick={() => toggleSection(qualificationIndex)} // Toggle by qualificationIndex
                        >
                          {qualification.degree ||
                            `Qualification ${qualificationIndex + 1}`}
                        </button>

                        {/* Delete Qualification Button */}
                        <button
                          type="button"
                          onClick={() =>
                            handleDeleteQualification(qualificationIndex)
                          } // Handle qualification deletion
                          className="bg-red-500 text-white p-2 rounded-md bg-opacity-50 hover:bg-opacity-100 h-[40px] mt-2"
                        >
                          Delete
                        </button>
                      </div>

                      {/* Collapsible Content */}
                      {openSection === qualificationIndex && (
                        <div className="p-4 border border-gray-200 rounded-md space-y-4">
                          {/* Degree */}
                          <div className="flex flex-col gap-1">
                            <label className="px-2 font-bold">Degree</label>
                            <input
                              type="text"
                              value={qualification.degree || ""}
                              placeholder="Enter Degree"
                              className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                              onChange={(e) =>
                                handleChangeQualification(
                                  qualificationIndex,
                                  "degree",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* Description */}
                          <div className="flex flex-col gap-1">
                            <label className="px-2 font-bold">
                              Description
                            </label>
                            <input
                              type="text"
                              value={qualification.description || ""}
                              placeholder="Enter Description"
                              className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                              onChange={(e) =>
                                handleChangeQualification(
                                  qualificationIndex,
                                  "description",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* Institute Name */}
                          <div className="flex flex-col gap-1">
                            <label className="px-2 font-bold">
                              Institute Name
                            </label>
                            <input
                              type="text"
                              value={qualification.instituteName || ""}
                              placeholder="Enter Institute Name"
                              className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                              onChange={(e) =>
                                handleChangeQualification(
                                  qualificationIndex,
                                  "instituteName",
                                  e.target.value
                                )
                              }
                            />
                          </div>

                          {/* Start Date and End Date */}
                          <div className="flex gap-4">
                            <div className="flex flex-col gap-1 w-full">
                              <label className="px-2 font-bold">
                                Start Date
                              </label>
                              <input
                                type="date"
                                value={qualification.startDate || ""}
                                className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                                onChange={(e) =>
                                  handleChangeQualification(
                                    qualificationIndex,
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
                                value={qualification.endDate || ""}
                                className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                                onChange={(e) =>
                                  handleChangeQualification(
                                    qualificationIndex,
                                    "endDate",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                          </div>

                          {/* Field of Study */}
                          <div className="flex flex-col gap-1">
                            <label className="px-2 font-bold">
                              Field of Study
                            </label>
                            <input
                              type="text"
                              value={qualification.fieldOfStudy || ""}
                              placeholder="Enter Field of Study"
                              className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                              onChange={(e) =>
                                handleChangeQualification(
                                  qualificationIndex,
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
                              {qualification.skills?.map(
                                (skill, skillIndex) => (
                                  <div
                                    key={skillIndex}
                                    className="flex items-center gap-2"
                                  >
                                    <input
                                      type="text"
                                      value={skill || ""}
                                      className="border border-gray-400 px-2 py-1 rounded-md focus:border-[#4358f6]"
                                      onChange={(e) =>
                                        handleQualificationSkillChange(
                                          qualificationIndex,
                                          skillIndex,
                                          e.target.value
                                        )
                                      }
                                    />
                                    <button
                                      type="button"
                                      onClick={
                                        () =>
                                          handleDeleteQualificationSkill(
                                            qualificationIndex,
                                            skillIndex
                                          ) // Pass the correct indices
                                      }
                                      className="text-red-500 px-2 py-1 rounded-md border"
                                    >
                                      Delete
                                    </button>
                                  </div>
                                )
                              )}
                            </div>

                            {/* Add New Skill Button */}
                            <button
                              type="button"
                              onClick={() =>
                                handleAddQualificationSkill(qualificationIndex)
                              }
                              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                            >
                              Add Skill
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                )}

                {/* Add Qualification Button */}
                <button
                  onClick={handleAddQualification}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Add Qualification
                </button>
              </div>
            )}

            {activesection === "FAQ" && (
              <div className="space-y-4">
                {/* Map through existing FAQs */}
                {dataToEdit?.FAQ?.map((faq, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-4"
                  >
                    {/* FAQ Title - Click to Expand/Collapse */}
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => toggleOpen(index)}
                        className="w-full text-left font-bold bg-gray-200 p-2 rounded-md"
                      >
                        {faq.title || `FAQ ${index + 1}`}
                      </button>
                      <button
                        type="button"
                        className="bg-red-500 text-white p-2 rounded-md bg-opacity-50 hover:bg-opacity-100"
                        onClick={() => handleDeleteFaq(index)}
                      >
                        Delete
                      </button>
                    </div>

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

                        {/* Save and Delete Buttons */}
                        <div className="flex justify-between">
                          <button
                            type="button"
                            className="bg-blue-500 text-white p-2 rounded-md"
                            onClick={() => toggleOpen(null)}
                          >
                            Save FAQ
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {/* Button to Add New FAQ */}
                <button
                  type="button"
                  onClick={handleAddFaq}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Add New FAQ
                </button>
              </div>
            )}
            {activesection === "Experience" && (
              <div className="space-y-4">
                {/* Map through existing experiences */}
                {dataToEdit?.years_of_experience?.map((experience, index) => (
                  <div key={index} className="space-y-4">
                    {/* Toggle Button */}
                    <div className="flex">
                      <button
                        type="button"
                        className="w-full text-left font-bold bg-gray-100 p-4 rounded-md focus:border-[#4358f6] focus:outline-none"
                        onClick={() => toggleSection(index)}
                      >
                        {experience.jobTitle || `Experience ${index + 1}`}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDeleteExperience(index)}
                        className=" bg-red-500 text-white p-2 rounded-md text-sm h-[40px] mt-3 ml-2"
                      >
                        Delete
                      </button>
                    </div>

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
                            Employment Type
                          </label>
                          <input
                            type="text"
                            value={experience.employmentType || ""}
                            placeholder="Enter Employment Type"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              handleExperienceChange(
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
                              value={formatDate(
                                experience.startDate.month || ""
                              )}
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
                          <label className="px-2 font-bold">Job Title</label>
                          <input
                            type="text"
                            value={experience.jobTitle || ""}
                            placeholder="Enter Job Title"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "jobTitle",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Organization Location */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">
                            Organization Location
                          </label>
                          <input
                            type="text"
                            value={experience.organizationLocation || ""}
                            placeholder="Enter Location"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              handleExperienceChange(
                                index,
                                "organizationLocation",
                                e.target.value
                              )
                            }
                          />
                        </div>

                        {/* Organization Name */}
                        <div className="flex flex-col gap-1">
                          <label className="px-2 font-bold">
                            Organization Name
                          </label>
                          <input
                            type="text"
                            value={experience.organizationName || ""}
                            placeholder="Enter Organization Name"
                            className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                            onChange={(e) =>
                              handleExperienceChange(
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
                                    handleExperienceSkillChange(
                                      index,
                                      skillIndex,
                                      e.target.value
                                    )
                                  }
                                />
                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDeleteExperienceSkill(
                                      index,
                                      skillIndex
                                    )
                                  }
                                  className="text-red-500 px-2 py-1 rounded-md"
                                >
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                          <button
                            type="button"
                            onClick={() => handleAddExperienceSkill(index)} // Pass experience index
                            className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
                          >
                            Add Skill
                          </button>
                        </div>

                        {/* Delete Experience Button */}
                      </div>
                    )}
                  </div>
                ))}

                {/* Button to Add New Experience */}
                <button
                  type="button"
                  onClick={handleAddExperience}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Add Experience
                </button>
              </div>
            )}
            <div className="bg-[#00768A] flex justify-center items-center rounded-xl mt-5">
              <button
                className="text-white p-2 focus:outline-none"
                onClick={patchDoctorData}
              >
                {loadingUpdateBtn ? "Updating..." : "Update"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;
