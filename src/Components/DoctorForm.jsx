import React, { useEffect, useRef, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { MdCancel, MdDelete } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import axios from "axios";
import { ImCross } from "react-icons/im";
import Footer from "./Footer";
import "./DoctorForm.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa"; // Import icons
import { useLocation, useNavigate } from "react-router-dom";
const DoctorForm = () => {
  const [formValues, setFormValues] = useState({
    specialitycategories: [],
    aboutDoctor: "",
    councilName: "",
    RegistrationNumber: "",
    language: [],
    qualifications: [
      {
        sequenceNumber: 1,
        instituteName: "",
        degree: "",
        fieldOfStudy: "",
        startDate: { month: "", year: "" },
        endDate: { month: "", year: "" },
        description: "",
        skills: [],
      },
    ],
    years_of_experience: [
      {
        sequenceNumber: 1,
        jobTitle: "",
        employmentType: "Work from Office",
        organizationName: "",
        organizationLocation: "",
        startDate: { month: "", year: "" },
        endDate: { month: "", year: "" },
        isPresent: false,
        description: "",
        skills: [],
      },
    ],
  });

  const navigate = useNavigate();

  const isNextDisabled =
    formValues.specialitycategories.length === 0 ||
    formValues.language.length === 0 ||
    !formValues.RegistrationNumber ||
    !formValues.councilName;

  const selectRef = useRef(null);
  const yearsOfExperience = formValues?.years_of_experience || [];
  const qualifications = formValues?.qualifications || [];

  const [customCouncil, setCustomCouncil] = useState("");
  const [skillInput, setSkillInput] = useState("");
  const [customLanguage, setCustomLanguage] = useState("");
  const [CustomLangOpen, CustomLangSetOpen] = useState(false);
  const [QualificationSkill, setQualificationSkill] = useState("");
  const [Language, setLanguage] = useState("");
  const handleCustomCouncilSubmit = () => {
    if (customCouncil) {
      // Update formValues with custom council name
      setFormValues({
        ...formValues,
        councilName: [...(formValues.councilName || []), customCouncil],
      });
      setCustomCouncil(""); // Clear the input field after submission
    }
  };

  const currentYear = new Date().getFullYear();

  const years = Array.from(
    { length: currentYear - 1960 + 1 },
    (_, index) => currentYear - index
  );
  const handleCouncilSelect = (council) => {
    setFormValues((prevValues) => {
      // Add selected council to the councilName array if not already present
      if (!prevValues.councilName.includes(council)) {
        return {
          ...prevValues,
          councilName: [...prevValues.councilName, council],
        };
      }
      return prevValues;
    });
    CustomSetOpen(false); // Close dropdown after selection
  };
  const handleCustomLanguageSubmit = () => {
    if (customLanguage) {
      // Add custom language to the formValues' language array
      setFormValues({
        ...formValues,
        language: [...(formValues.language || []), customLanguage],
      });
      setLanguage([...language, customLanguage]); // Add to the predefined list
      setCustomLanguage(""); // Clear the input field
      CustomLangSetOpen(false); // Close the dropdown
    }
  };

  // Remove selected language from the list
  const handleLanguageRemove = (lang) => {
    setFormValues((prev) => ({
      ...prev,
      language: prev.language.filter((language) => language !== lang),
    }));
  };

  const handleCouncilNameRemove = (council) => {
    setFormValues((prev) => ({
      ...prev,
      councilName: prev.councilName.filter(
        (CouncilName) => CouncilName !== council
      ),
    }));
  };

  const LangtoggleDropdown = () => {
    CustomLangSetOpen(!CustomLangOpen); // Toggle dropdown state
  };

  // Handle selecting a language
  const handleLanguageSelect = (lang) => {
    if (!formValues.language.includes(lang)) {
      setFormValues((prevValues) => ({
        ...prevValues,
        language: [...prevValues.language, lang], // Add language if not already selected
      }));
    }
    CustomLangSetOpen(false);
  };

  useEffect(() => {}, [formValues.language]);

  const handleLanguageChange = (event) => {
    const selectedLanguage = event.target.value;

    // Update language array without duplicates
    if (selectedLanguage && !formValues.language.includes(selectedLanguage)) {
      setFormValues((prev) => ({
        ...prev,
        language: [...prev.language, selectedLanguage], // Add selected language
      }));
    }
  };

  // This useEffect will trigger when formValues.councilName changes
  useEffect(() => {}, [formValues.councilName]); // Only triggers when councilName changes

  const HandleSkillOfQualification = (index) => {
    if (!QualificationSkill.trim()) return; // Prevent empty skill submission

    // Handle the submission of the custom input value

    setFormValues((prevState) => {
      // Copy the previous state
      const updatedExperience = [...prevState.qualifications];

      // Ensure we don't add duplicate skills
      if (
        !updatedExperience[index].skills.includes(QualificationSkill.trim())
      ) {
        // Add the new skill if it's not already in the array
        updatedExperience[index].skills = [
          ...updatedExperience[index].skills,
          QualificationSkill.trim(),
        ];
      }

      setQualificationSkill(""); // Clear the input field

      // Return the updated state
      return {
        ...prevState,
        qualifications: updatedExperience,
      };
    });
  };

  const HandleSkillOfExperience = (index) => {
    if (!skillInput.trim()) return; // Prevent empty skill submission

    setFormValues((prevState) => {
      // Copy the previous state
      const updatedExperience = [...prevState.years_of_experience];

      // Ensure we don't add duplicate skills
      if (!updatedExperience[index].skills.includes(skillInput.trim())) {
        // Add the new skill if it's not already in the array
        updatedExperience[index].skills = [
          ...updatedExperience[index].skills,
          skillInput.trim(),
        ];
      }

      setSkillInput(""); // Clear the input field

      // Return the updated state
      return {
        ...prevState,
        years_of_experience: updatedExperience,
      };
    });
  };

  const [isOpen, setIsOpen] = useState(false);
  const [CustomOpen, CustomSetOpen] = useState(false);
  const [step, setStep] = useState(1);

  const handleNextStep = (e) => {
    setStep(step + 1);
    window.scrollTo(0, 0);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  // Toggle function to open/close dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const CustomtoggleDropdown = () => {
    CustomSetOpen(!CustomOpen);
  };

  const [specialtyoptions, setSpecialityOptions] = useState([]);
  useEffect(() => {
    SelectSpecialty();
  }, []);

  const handleSelectSpecialty = (id) => {
    // Check if the ID is already selected, if not, add it
    if (!formValues.specialitycategories.includes(id)) {
      const updatedSpecialities = [...formValues.specialitycategories, id];
      setFormValues({
        ...formValues,
        specialitycategories: updatedSpecialities,
      });
    }
    setIsOpen(false); // Close the dropdown after selection
  };

  // const handleInputChange = (e, index, arrayName, fieldName) => {
  //     const newArray = [...formValues[arrayName]];
  //     newArray[index][fieldName] = e.target.value;
  //     setFormValues({ ...formValues, [arrayName]: newArray });
  // };

  const handleInputChange = (e, index, category, field) => {
    const { value } = e.target;

    setFormValues((prevState) => {
      const updatedState = { ...prevState };

      if (category === "qualifications") {
        // Update qualifications
        const updatedQualifications = [...prevState.qualifications];

        if (typeof updatedQualifications[index] !== "object") {
          // Initialize the qualification as an object if it's not an object
          updatedQualifications[index] = {
            instituteName: "",
            degree: "",
            fieldOfStudy: "",
            startDate: { month: "", year: "" },
            endDate: { month: "", year: "" },
            description: "",
            skills: [],
          };
        }
        updatedQualifications[index][field] = value;

        updatedState.qualifications = updatedQualifications;
      } else if (category === "years_of_experience") {
        // Update years_of_experience
        const updatedExperiences = [...prevState.years_of_experience];

        // Handle startDate or endDate fields
        if (field === "startDate" || field === "endDate") {
          const dateField = field;
          const dateSubField = e.target.name.includes("Month")
            ? "month"
            : "year";

          // Ensure the date object is initialized
          if (!updatedExperiences[index][dateField]) {
            updatedExperiences[index][dateField] = { month: "", year: "" };
          }

          // Update the respective month or year
          updatedExperiences[index][dateField][dateSubField] = value;
        } else {
          // Update other fields (like jobTitle)
          updatedExperiences[index][field] = value;
        }

        updatedState.years_of_experience = updatedExperiences;
      }

      return updatedState;
    });
  };

  const SelectSpecialty = async () => {
    try {
      const response = await fetch(
        "https://api.assetorix.com/ah/api/v1/dc/user/Category"
      );
      const result = await response.json();
      const specialty = result?.data?.map((ele) => ({
        _id: ele._id,
        specialtyName: ele.specialtyName,
      }));
      setSpecialityOptions(specialty);
    } catch (error) {
      console.error("Error fetching specialties:", error);
    }
  };

  // Handling drag end for reordering qualifications

  // Specific handler for nested fields (like startDate and endDate)
  const handleDateChange = (e, index, field, subField) => {
    const { value } = e.target;

    setFormValues((prevState) => {
      const updatedQualifications = [...prevState.qualifications];

      // Ensure the field (e.g., startDate or endDate) exists and is initialized as an object
      if (!updatedQualifications[index][field]) {
        updatedQualifications[index][field] = { month: "", year: "" }; // Initialize with empty values
      }

      // Now safely update the subField (month or year)
      updatedQualifications[index][field][subField] = value;

      return {
        ...prevState,
        qualifications: updatedQualifications,
      };
    });
  };

  // Handling drag end (if you are using Drag and Drop context)
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(formValues.qualifications);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setFormValues((prevState) => ({
      ...prevState,
      qualifications: items,
    }));
  };

  // Add new qualification entry
  const addQualification = () => {
    setFormValues({
      ...formValues,
      qualifications: [
        ...formValues.qualifications,
        {
          sequenceNumber: formValues.qualifications.length + 1,
          instituteName: "",
          degree: "",
          fieldOfStudy: "",
          startDate: { month: "", year: "" },
          endDate: { month: "", year: "" },
          description: "",
          skills: [],
        },
      ],
    });
  };

  // Add new experience entry
  const addExperience = () => {
    setFormValues({
      ...formValues,
      years_of_experience: [
        ...formValues.years_of_experience,
        {
          sequenceNumber: formValues.years_of_experience.length + 1,
          jobTitle: "",
          employmentType: "Work from Office",
          organizationName: "",
          organizationLocation: "",
          startDate: { month: "", year: "" },
          endDate: { month: "", year: "" },
          isPresent: false,
          description: "",
          skills: [],
        },
      ],
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle change in qualification selection
  const handleQualificationChange = (e) => {
    const { value } = e.target;
    setFormValues({
      ...formValues,
      qualifications: value,
    });
  };

  //delete

  const handleDeleteQualification = (index) => {
    setFormValues((prevState) => ({
      ...prevState,
      qualifications: prevState.qualifications.filter((_, i) => i !== index),
    }));
  };

  const HandleDeleteExperience = (index) => {
    setFormValues((prev) => ({
      ...prev,
      years_of_experience: prev.years_of_experience.filter(
        (_, i) => i !== index
      ),
    }));
  };

  //for IsPresent

  const handleIsPresentChange = (index, checked) => {
    setFormValues((prevState) => {
      // Clone the years_of_experience array to avoid direct state mutation
      const updatedExperiences = [...prevState.years_of_experience];

      // Update the 'isPresent' field for the given index
      updatedExperiences[index].isPresent = checked;

      return {
        ...prevState,
        years_of_experience: updatedExperiences,
      };
    });
  };

  //qualification skill delete

  const handleQualificationDelete = (qualificationIndex, skillIndex) => {
    setFormValues((prevState) => {
      const updatedQualifications = [...prevState.qualifications]; // Copy qualifications array
      const updatedSkills = [
        ...updatedQualifications[qualificationIndex].skills,
      ]; // Copy skills array

      // Remove the skill at the specified skillIndex
      updatedSkills.splice(skillIndex, 1);

      // Update the skills array for the specific qualification
      updatedQualifications[qualificationIndex].skills = updatedSkills;

      // Return the updated state
      return {
        ...prevState,
        qualifications: updatedQualifications,
      };
    });
  };

  //experience skill Delete

  const HandleExperienceSkillDelete = (ExperienceIndex, skillIndex) => {
    setFormValues((prev) => {
      const updatedExperience = [...prev.years_of_experience];
      const updatedSkills = [...updatedExperience[ExperienceIndex].skills];

      updatedSkills.splice(skillIndex, 1);

      updatedExperience[ExperienceIndex].skills = updatedSkills;

      return {
        ...prev,
        years_of_experience: updatedExperience,
      };
    });
  };

  const [qualificationError, setQualificationError] = useState(false);
  const [specialtyError, setSpecialityError] = useState(false);
  const [VisitingModeError, SetVisitingModeError] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Toast notification
    if (formValues.qualifications.length === 0) {
      setQualificationError(true);
      setSpecialityError(true);
      SetVisitingModeError(true);
      toast.error("Please fill in all required fields!");
    } else {
      setQualificationError(false);
      setSpecialityError(false);
      SetVisitingModeError(false);

      // Filter out any experience objects where all fields are empty
      const filteredYearsOfExperience = formValues.years_of_experience.filter(
        (exp) =>
          exp.jobTitle !== "" ||
          exp.organizationName !== "" ||
          exp.organizationLocation !== "" ||
          exp.startDate?.month !== "" ||
          exp.startDate?.year !== "" ||
          exp.description !== "" ||
          exp.skills.length > 0 // Ensure skills are checked as well
      );

      // If no valid experience, set years_of_experience as an empty array
      if (filteredYearsOfExperience.length === 0) {
        formValues.years_of_experience = [];
      }

      const token = localStorage.getItem("token");
      const id = localStorage.getItem("Id");

      // Check if token and id are available
      if (!token || !id) {
        console.error("Missing token or ID. Redirecting to login.");
        return;
      }

      // Destructuring formValues
      const {
        specialitycategories,
        aboutDoctor,
        councilName,
        RegistrationNumber,
        language,
        years_of_experience,

        qualifications,
      } = formValues;

      // Construct payload
      const payload = {
        specialitycategories,
        aboutDoctor,
        councilName,
        RegistrationNumber,
        language,
        years_of_experience,
        qualifications,
      };

      try {
        const res = await axios.post(
          "https://api.assetorix.com/ah/api/v1/dc/user/doctor/temp",
          payload,
          {
            headers: {
              authorization: `Bearer ${token}`,
              id: id,
            },
          }
        );
        console.log("something", res.data.msg);
        toast.success(res.data.msg);
        navigate("/profile");
      } catch (res) {
        toast.error(res?.response?.data?.msg);
      }
    }
  };

  const qualificationsOptions = [
    "MBBS",
    "MS",
    "MD",
    "BAMS",
    "BHMS",
    "BPT",
    "B.VSc",
    "BUMS",
    "BSMS",
    "BNYS",
  ];
  //Language

  const language = [
    "Hindi",
    "Arabic",
    "Chinese",
    "Russian",
    "French",
    "English",
  ];

  const handleRemoveSpecialty = (id) => {
    setFormValues({
      ...formValues,
      specialitycategories: formValues.specialitycategories.filter(
        (specialtyId) => specialtyId !== id
      ),
    });
  };

  const handleQualificationSubmit = () => {};

  const CouncilName = [
    "Punjab Medical Council",
    "Bihar Medical Council",
    "Gujarat Medical Council",
    "Andhra Pradesh Medical Council",
    "Maharashtra Medical Council",
    "Rajasthan Medical Council",
    "Travancore Cochin Medical Council, Trivandrum",
    "Vidharba Medical Council",
    "Assam Medical Council",
    "karnataka Medical Council",
    "Orissa Council of Medical Registration",
    "Bombay Medical Council",
    "Madhya Pradesh Medical Council",
    "West Bengal Medical Council",
    "Uttar Pradesh Medical Council",
    "Madras Medical Council",
    "Tamil Nadu Medical Council",
    "Indian Medical Council",
  ];

  return (
    <div className="bg-[#E3EAF0]">
      <div className="bg-transparent  sm:max-w-5xl w-full mx-auto h-auto p-10 rounded-xl shadow-lg">
        {/* Step Indicator */}
        <div className="flex justify-center mb-8">
          <div className="w-1/2 flex justify-between">
            <div
              className={`h-2 w-full rounded-full ${
                step >= 1 ? "bg-[#00768A]" : "bg-gray-300"
              }`}
            />
            <div
              className={`h-2 w-full rounded-full ${
                step >= 2 ? "bg-[#00768A]" : "bg-gray-300"
              }`}
            />
            {/* <div
              className={`h-2 w-full rounded-full ${
                step >= 3 ? "bg-[#00768A]" : "bg-gray-300"
              }`}
            /> */}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Doctor's Details */}
          {step === 1 && (
            <div className="bg-white p-10 rounded-xl shadow-lg">
              <p className="font-semibold text-4xl text-center text-[#00768A] mb-6">
                We are happy to onboard you.
              </p>
              <p className="font-semibold text-2xl text-center text-[#00768A] mb-6">
                Doctor's Details
              </p>

              <p style={{ color: "red" }}>
                Instruction : <br />{" "}
                <span style={{ color: "red" }}>
                  All (*) marked fields are mandatory
                </span>
              </p>
              <div className="input-group flex flex-col gap-5">
                {/* Specialist Toggle */}

                <div className="relative inline-block text-left mt-2">
                  <label htmlFor="qualifications" className="text-[#00768A]">
                    Select your Specialties:{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>
                  <button
                    type="button"
                    onClick={toggleDropdown}
                    className="items-start justify-start grid grid-cols-1  sm:grid-cols-2 gap-2 md:grid-cols-4 border-2 bg-[#ffffff] bg-opacity-100 border-gray-300 text-black px-4 py-2 rounded-md w-full text-start focus:outline-none  focus:border-[#00768A]"
                  >
                    {/* Display selected specialties */}

                    {formValues.specialitycategories.length > 0
                      ? specialtyoptions
                          .filter((option) =>
                            formValues.specialitycategories.includes(option._id)
                          )
                          .map((option) => (
                            <span
                              key={option._id}
                              className="flex items-center justify-center gap-1 w-auto p-2 bg-[#00768A] rounded-[5px] text-white"
                            >
                              <span>{option.specialtyName}</span>

                              <MdCancel
                                className="ml-1 "
                                onClick={() =>
                                  handleRemoveSpecialty(option._id)
                                }
                              />
                            </span>
                          ))
                      : "Select Specialties"}
                  </button>

                  {/* Dropdown content */}
                  {isOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-2 border border-gray-300 rounded-md z-10">
                      <div className="py-1">
                        {specialtyoptions.map((ele) => (
                          <div
                            key={ele._id}
                            onClick={() => handleSelectSpecialty(ele._id)}
                            className="flex items-center justify-between px-4 py-2 hover:text-white text-gray-700 hover:bg-[#00768A] cursor-pointer"
                          >
                            <span>{ele.specialtyName}</span>
                            {/* Add checkmark if the option is selected */}
                            {formValues.specialitycategories.includes(
                              ele._id
                            ) && <TiTickOutline className="text-[#00768A]" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Other Input Fields */}

                {/* Language */}
                <div className="relative">
                  <label htmlFor="language" className="text-[#00768A]">
                    Select your preferred Languages:{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  {/* Custom dropdown trigger */}
                  <button
                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A] flex items-center justify-between cursor-pointer"
                    onClick={LangtoggleDropdown}
                    type="button"
                  >
                    <div className="flex items-center">
                      {/* {formValues.language.length > 0
                        ? formValues.language.join(", ")
                        : "Select a Language"} */}
                      {"Select Language"}
                    </div>
                    <div className="flex items-center">
                      {/* Toggle arrow */}
                      {CustomLangOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </div>
                  </button>

                  {/* Dropdown content */}
                  {CustomLangOpen && (
                    <div className="absolute top-full left-0 w-full bg-white shadow-lg mt-2 border border-gray-300 rounded-md z-10">
                      {/* Container for input and button */}
                      <div className="p-2">
                        {/* Input field for custom language */}
                        <input
                          type="text"
                          value={customLanguage}
                          onChange={(e) => setCustomLanguage(e.target.value)}
                          placeholder="Enter custom language"
                          className="w-full p-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:border-[#00768A]"
                        />
                        <button
                          onClick={handleCustomLanguageSubmit}
                          className="w-full bg-[#00768A] text-white p-2 rounded-md"
                        >
                          Add Custom Language
                        </button>
                      </div>

                      {/* Render predefined language options */}
                      <div className="max-h-60 overflow-y-auto">
                        {language.map((lang, index) => (
                          <div
                            key={index}
                            onClick={() => handleLanguageSelect(lang)} // Select language from the list
                            className="cursor-pointer hover:bg-[#00768A] hover:text-white text-black p-2 transition-all duration-200"
                          >
                            {lang}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Render selected languages with a cross button */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {formValues.language.map((lang, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-2 bg-[#00768A] p-2 rounded-md"
                      >
                        <p className="text-white">{lang}</p>
                        <ImCross
                          style={{
                            fontSize: "10px",
                            color: "white",
                            cursor: "pointer",
                          }}
                          onClick={() => handleLanguageRemove(lang)} // Remove language
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Council Name */}
                <div className="relative">
                  <label htmlFor="CouncilName" className="text-[#00768A]">
                    Select your Medical Council:{" "}
                    <span style={{ color: "red" }}>*</span>
                  </label>

                  <div>
                    <select
                      onChange={handleChange}
                      name="councilName"
                      value={formValues.councilName}
                      className="border border-gray-300 w-full max-w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A] flex items-center justify-between cursor-pointer"
                    >
                      <option>Select Your Council Name</option>{" "}
                      <span style={{ color: "red" }}>*</span>
                      {CouncilName.map((council) => (
                        <option>{council}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {formValues.councilName ? (
                  <div>
                    <label htmlFor="CouncilName" className="text-[#00768A]">
                      Enter your Medical Registration Number:{" "}
                      <span style={{ color: "red" }}>*</span>
                    </label>
                    <input
                      placeholder="Enter Your Registration Number"
                      onChange={handleChange}
                      name="RegistrationNumber"
                      value={formValues.RegistrationNumber}
                      className="border border-gray-300 w-full max-w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A] flex items-center justify-between cursor-pointer"
                      required
                      autoComplete="off"
                    />
                  </div>
                ) : null}

                {/* <div>
                  <label
                    className="text-[#00768A]"
                    htmlFor="RegistrationNumber"
                  >
                    Registration Number
                  </label>
                  <input
                    type="text"
                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                    placeholder="Registration Number"
                    name="RegistrationNumber"
                    value={formValues.RegistrationNumber}
                    onChange={handleChange}
                    required
                  />
                </div> */}

                <div className="gap-5">
                  <label className="text-[#00768A]" htmlFor="DoctorDescription">
                    Your Professional Summary:{" "}
                  </label>
                  <textarea
                    className="border border-gray-300 w-full h-18 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                    placeholder="Enter your  Professional Summary"
                    name="aboutDoctor"
                    value={formValues.aboutDoctor}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-6 w-[100%]">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className={`px-6 py-2 rounded-md sm:w-[auto] w-[100%] ${
                    isNextDisabled
                      ? "bg-gray-400 text-white cursor-not-allowed"
                      : "bg-[#00768A] text-white hover:bg-[#00607A]"
                  }`}
                  disabled={isNextDisabled}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Hospital Details */}

          {step === 2 && (
            <div className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl flex justify-center items-center font-semibold text-[#00768A] mb-6">
                Doctor Profile Form
              </h2>

              {/* Qualifications Section */}
              <h3 className="text-xl font-semibold text-[#00768A] mb-4">
                Academics
              </h3>

              <div className="border border-dashed border-gray-400 p-4 rounded-md">
                {qualifications.map((qual, index) => (
                  <div
                    key={qual.sequenceNumber || `qual-${index}`}
                    className="qualification-item mb-4 p-4 bg-gray-50 rounded-lg border border-gray-300"
                  >
                    {index >= 1 ? (
                      <div className="flex justify-end">
                        <MdDelete
                          onClick={() => handleDeleteQualification(index)}
                          className="cursor-pointer"
                          style={{ color: "red" }}
                        />
                      </div>
                    ) : null}

                    {/* Institute Name */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-[#00768A]">
                        Institute Name: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="instituteName"
                        placeholder="Ex- All India Institute of Medical Sciences"
                        autoComplete="off"
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md  focus:outline-none  focus:border-[#00768A] "
                        value={
                          formValues.qualifications[index]?.instituteName || ""
                        }
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "qualifications",
                            "instituteName"
                          )
                        }
                      />
                    </div>

                    {/* Degree */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-[#00768A]">
                        Degree: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="degree"
                        autoComplete="off"
                        placeholder="Ex- MBBS"
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                        value={qual.degree}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "qualifications",
                            "degree"
                          )
                        }
                      />
                    </div>

                    {/* Field of Study */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-[#00768A]">
                        Field of Study: <span style={{ color: "red" }}>*</span>
                      </label>
                      <input
                        type="text"
                        name="fieldOfStudy"
                        autoComplete="off"
                        placeholder="Ex- Cardiology"
                        required
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                        value={qual.fieldOfStudy}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "qualifications",
                            "fieldOfStudy"
                          )
                        }
                      />
                    </div>

                    {/* Start Date */}
                    <div className="mb-3 flex gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#00768A]">
                          Start Month: <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          value={qual.startDate?.month || ""}
                          onChange={(e) =>
                            handleDateChange(e, index, "startDate", "month")
                          }
                          name="startMonth"
                          id="month"
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                        >
                          <option value="">Select Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-[#00768A]">
                          Start Year: <span style={{ color: "red" }}>*</span>
                        </label>

                        <select
                          name="startYear"
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                          value={qual.startDate?.year}
                          onChange={(e) =>
                            handleDateChange(e, index, "startDate", "year")
                          }
                        >
                          <option value="">Select End Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* End Date */}
                    <div className="mb-3 flex gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#00768A]">
                          End Month: <span style={{ color: "red" }}>*</span>
                        </label>
                        {/* <input
                          type="number"
                          name="endMonth"
                          placeholder="MM"
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                          value={qual.endDate?.month}
                          onChange={(e) =>
                            handleDateChange(e, index, "endDate", "month")
                          }
                        /> */}
                        <select
                          name="endMonth"
                          value={qual.endDate?.month}
                          onChange={(e) =>
                            handleDateChange(e, index, "endDate", "month")
                          }
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                          id=""
                        >
                          <option value="">Select Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#00768A]">
                          End Year: <span style={{ color: "red" }}>*</span>
                        </label>
                        {/* <input
                          type="number"
                          name="endYear"
                          placeholder="YYYY"
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                          value={qual.endDate?.year}
                          onChange={(e) =>
                            handleDateChange(e, index, "endDate", "year")
                          }
                        /> */}

                        <select
                          value={qual.endDate?.year}
                          onChange={(e) =>
                            handleDateChange(e, index, "endDate", "year")
                          }
                          name="endYear"
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                        >
                          <option value="">Select End Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Description */}
                    <div className="mb-3">
                      <label className="block text-sm font-medium text-[#00768A]">
                        Description:
                      </label>
                      <textarea
                        name="description"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                        value={qual.description}
                        autoComplete="off"
                        placeholder="Describe your Educational Experience"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "qualifications",
                            "description"
                          )
                        }
                      />
                    </div>

                    {/* Skills */}
                    <div className="mb-3 flex  items-center gap-3">
                      <div className="w-[80%]">
                        <label className="block text-sm font-medium text-[#00768A]">
                          Skills
                        </label>
                        <input
                          type="text"
                          placeholder="Skills"
                          value={QualificationSkill}
                          onChange={(e) =>
                            setQualificationSkill(e.target.value)
                          }
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => HandleSkillOfQualification(index)}
                        className=" px-4 py-2 mt-4 bg-[#00607A] text-white rounded-md hover:bg-[#306978] transition duration-300 focus:outline-none"
                      >
                        Add
                      </button>
                    </div>

                    {qual?.skills && (
                      <div className="flex flex-wrap gap-2">
                        {qual?.skills?.map((skill, skillIndex) => (
                          <div
                            className="flex items-center gap-2 bg-[#00768A] p-2 rounded-md"
                            key={skillIndex}
                          >
                            <p className="text-white">{skill}</p>
                            <ImCross
                              style={{
                                fontSize: "10px",
                                color: "white",
                                marginTop: "5px",
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                handleQualificationDelete(index, skillIndex)
                              }
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={addQualification}
                className="mb-6 px-4 py-2 mt-4 bg-[#00607A] text-white rounded-md hover:bg-[#306978] transition duration-300"
              >
                + Add More Qualifications
              </button>
              <hr />
              {/* Experience Section */}
              <h3 className="text-xl font-semibold text-[#00768A] mb-4 mt-4">
                Years of Experience (Optional)
              </h3>

              <div className="border border-dashed border-gray-400 p-4 rounded-md">
                {yearsOfExperience.map((exp, index) => (
                  <div
                    key={exp.id || `exp-${index}`}
                    className="experience-item mb-4 p-4 bg-gray-50 rounded-lg border border-gray-300 transition-transform duration-300"
                  >
                    {index >= 1 ? (
                      <div className="flex justify-end">
                        <MdDelete
                          onClick={() => HandleDeleteExperience(index)}
                          style={{ color: "red", cursor: "pointer" }}
                        />
                      </div>
                    ) : null}

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-[#00768A]">
                        Job Title:
                      </label>
                      <input
                        type="text"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                        value={exp.jobTitle}
                        autoComplete="off"
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "years_of_experience",
                            "jobTitle"
                          )
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-[#00768A]">
                        Employment Type:
                      </label>
                      <select
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md  focus:outline-none  focus:border-[#00768A]"
                        value={exp.employmentType}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "years_of_experience",
                            "employmentType"
                          )
                        }
                      >
                        <option value="Work from Office">
                          Work from Office
                        </option>
                        <option value="Work from Home">Work from Home</option>
                        <option value="Hybrid work">Hybrid Work</option>
                      </select>
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-[#00768A]">
                        Organisation Name:
                      </label>
                      <input
                        type="text"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                        value={exp.organizationName}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "years_of_experience",
                            "organizationName"
                          )
                        }
                      />
                    </div>

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-[#00768A]">
                        Organisation Location:
                      </label>
                      <input
                        type="text"
                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:border-[#00768A]"
                        value={exp.organizationLocation}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "years_of_experience",
                            "organizationLocation"
                          )
                        }
                      />
                    </div>

                    {/* Start Month, Year */}
                    <div className="mb-3 flex gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[#00768A]">
                          Start Month:
                        </label>
                        {/* <input
                          type="number"
                          name="startMonth"
                          placeholder="MM"
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                          value={exp.startDate?.month || ""}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              index,
                              "years_of_experience",
                              "startDate"
                            )
                          }
                        /> */}

                        <select
                          name="startMonth"
                          value={exp.startDate?.month || ""}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              index,
                              "years_of_experience",
                              "startDate"
                            )
                          }
                        >
                          <option value="">Select Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[#00768A]">
                          Start Year:
                        </label>
                        {/* <input
                          type="number"
                          name="startYear"
                          placeholder="YYYY"
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                          value={exp.startDate?.year || ""}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              index,
                              "years_of_experience",
                              "startDate"
                            )
                          }
                        /> */}
                        <select
                          value={exp.startDate?.year || ""}
                          onChange={(e) =>
                            handleInputChange(
                              e,
                              index,
                              "years_of_experience",
                              "startDate"
                            )
                          }
                          name="startYear"
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                        >
                          <option value="">Select End Year</option>
                          {years.map((year) => (
                            <option key={year} value={year}>
                              {year}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="mt-[40px] ml-[25px] flex items-center">
                        <label
                          htmlFor={`experience-${index}`}
                          className="mr-2 font-bold"
                        >
                          If Present
                        </label>
                        <input
                          type="checkbox"
                          id={`experience-${index}`}
                          checked={
                            formValues.years_of_experience[index].isPresent
                          }
                          name="isPresent"
                          onChange={(e) =>
                            handleIsPresentChange(index, e.target.checked)
                          }
                          className="cursor-pointer"
                        />
                      </div>
                    </div>

                    {!exp.isPresent && (
                      <div className="mb-3 flex gap-4">
                        <div>
                          <label className="block text-sm font-medium text-[#00768A]">
                            End Month:
                          </label>
                          {/* <input
                            type="number"
                            name="endMonth"
                            placeholder="MM"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                            value={exp.endDate?.month}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                "years_of_experience",
                                "endDate"
                              )
                            }
                          /> */}

                          <select
                            value={exp.endDate?.month}
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                "years_of_experience",
                                "endDate"
                              )
                            }
                            name="endMonth"
                          >
                            <option value="">Select Month</option>
                          <option value="January">January</option>
                          <option value="February">February</option>
                          <option value="March">March</option>
                          <option value="April">April</option>
                          <option value="May">May</option>
                          <option value="June">June</option>
                          <option value="July">July</option>
                          <option value="August">August</option>
                          <option value="September">September</option>
                          <option value="October">October</option>
                          <option value="November">November</option>
                          <option value="December">December</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-[#00768A]">
                            End Year:
                          </label>
                          {/* <input
                            type="number"
                            name="endYear"
                            placeholder="YYYY"
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                            value={exp.endDate?.year}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                "years_of_experience",
                                "endDate"
                              )
                            }
                          /> */}
                          <select
                            name="endYear"
                            value={exp.endDate?.year}
                            onChange={(e) =>
                              handleInputChange(
                                e,
                                index,
                                "years_of_experience",
                                "endDate"
                              )
                            }
                            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                          >
                            <option value="">Select End Year</option>
                            {years.map((year) => (
                              <option key={year} value={year}>
                                {year}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="block text-sm font-medium text-[#00768A]">
                        Description:
                      </label>
                      <textarea
                        value={exp.description}
                        onChange={(e) =>
                          handleInputChange(
                            e,
                            index,
                            "years_of_experience",
                            "description"
                          )
                        }
                        className="border border-gray-300 w-full h-18 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                        placeholder="Describe your Work Experience"
                      />
                    </div>

                    <div className="mb-3 flex gap-3">
                      <div className="w-[80%]">
                        <label className="block text-sm font-medium text-[#00768A]">
                          Skills:
                        </label>
                        <input
                          type="text"
                          placeholder="Skills"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none  focus:border-[#00768A]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => HandleSkillOfExperience(index)}
                        className="mb-6 px-4 py-2 mt-[32px] bg-[#00607A] text-white rounded-md hover:bg-[#306978] transition duration-300"
                      >
                        Add
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill, skillIndex) => (
                        <div
                          className="flex items-center gap-2 bg-[#00768A] p-2 rounded-md"
                          key={skillIndex}
                        >
                          <p className="text-white">{skill}</p>
                          <ImCross
                            style={{
                              fontSize: "10px",
                              color: "white",
                              marginTop: "5px",

                              cursor: "pointer",
                            }}
                            onClick={() =>
                              HandleExperienceSkillDelete(index, skillIndex)
                            }
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={addExperience}
                  className="mb-6 px-4 py-2 mt-4 bg-[#00607A] text-white rounded-md hover:bg-[#306978] transition duration-300"
                >
                  + Add More Experience
                </button>

                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="mb-6 px-4 py-2 mt-4 bg-[#9CA3AF] text-white rounded-md  transition duration-300"
                >
                  Back
                </button>
              </div>
              {/* Submit Button */}
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#00607A]  text-white rounded-md hover:bg-[#55757d]  transition duration-300"
                onClick={handleQualificationSubmit}
              >
                Submit
              </button>
            </div>
          )}
        </form>
      </div>

      <Footer />
      <Toaster />
    </div>
  );
};

export default DoctorForm;
