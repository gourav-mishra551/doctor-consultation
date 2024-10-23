import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import Multiselect from 'multiselect-react-dropdown';
import { MdCancel, MdDelete } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import axios from 'axios';
import TopHeader from './TopHeader';
import Navbar from './Navbar';
import Footer from './Footer';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { ImCross } from 'react-icons/im';

const DoctorForm = () => {
    const [formValues, setFormValues] = useState({
        specialitycategories: [],
        hospitalName: "",
        clinic_hospital_address: {
            permanentAddress: "",
            city: "",
            state: "",
            PinCode: "",
        },
        hospital_contact: "",
        hospital_email: "",
        visitingMode: "offline",
        aboutDoctor: "",
        councilName: "",
        RegistrationNumber: '',
        language: [],
        qualifications: [{
            sequenceNumber: 1,
            instituteName: '',
            degree: '',
            fieldOfStudy: '',
            startDate: { month: '', year: '' },
            endDate: { month: '', year: '' },
            description: '',
            skills: []
        }],
        years_of_experience: [{
            sequenceNumber: 1,
            jobTitle: '',
            employmentType: 'Work from Office',
            organizationName: '',
            organizationLocation: '',
            startDate: { month: '', year: '' },
            endDate: { month: '', year: '' },
            isPresent: false,
            description: '',
            skills: []
        }]
    });

    const [skillInput, setSkillInput] = useState("");
    const [QualificationSkill, setQualificationSkill] = useState("")


    const HandleSkillOfQualification = (index) => {
        if (!QualificationSkill.trim()) return; // Prevent empty skill submission

        console.log("Adding skill: ", QualificationSkill); // Check if this logs twice

        setFormValues((prevState) => {
            // Copy the previous state
            const updatedExperience = [...prevState.qualifications];

            // Ensure we don't add duplicate skills
            if (!updatedExperience[index].skills.includes(QualificationSkill.trim())) {
                // Add the new skill if it's not already in the array
                updatedExperience[index].skills = [...updatedExperience[index].skills, QualificationSkill.trim()];
            }

            setQualificationSkill(""); // Clear the input field

            // Return the updated state
            return {
                ...prevState,
                qualifications: updatedExperience
            };
        });
    }

    const HandleSkillOfExperience = (index) => {
        if (!skillInput.trim()) return; // Prevent empty skill submission

        console.log("Adding skill: ", skillInput); // Check if this logs twice

        setFormValues((prevState) => {
            // Copy the previous state
            const updatedExperience = [...prevState.years_of_experience];

            // Ensure we don't add duplicate skills
            if (!updatedExperience[index].skills.includes(skillInput.trim())) {
                // Add the new skill if it's not already in the array
                updatedExperience[index].skills = [...updatedExperience[index].skills, skillInput.trim()];
            }

            setSkillInput(""); // Clear the input field

            // Return the updated state
            return {
                ...prevState,
                years_of_experience: updatedExperience
            };
        });
    };



    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState(1);

    const handleNextStep = () => {
        setStep(step + 1);
    };

    const handlePreviousStep = () => {
        setStep(step - 1);
    };




    // Toggle function to open/close dropdown
    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const [specialtyoptions, setSpecialityOptions] = useState([])
    useEffect(() => {
        SelectSpecialty()
    }, [])

    const handleSelectSpecialty = (id) => {
        // Check if the ID is already selected, if not, add it
        if (!formValues.specialitycategories.includes(id)) {
            const updatedSpecialities = [...formValues.specialitycategories, id];
            setFormValues({ ...formValues, specialitycategories: updatedSpecialities });
        }
        setIsOpen(false); // Close the dropdown after selection
    };


    const SelectSpecialty = async () => {
        try {
            const array = await fetch("https://api.assetorix.com/ah/api/v1/dc/user/Category")
            const result = await array.json()
            const specialty = result.data.map((ele) => ({
                _id: ele._id,  // Extract _id
                specialtyName: ele.specialtyName  // Extract specialtyName
            }));
            setSpecialityOptions(specialty);
        } catch (error) {

        }
    }

    // const handleInputChange = (e, index, arrayName, fieldName) => {
    //     const newArray = [...formValues[arrayName]];
    //     newArray[index][fieldName] = e.target.value;
    //     setFormValues({ ...formValues, [arrayName]: newArray });
    // };

    const handleInputChange = (e, index, category, field) => {
        const { value } = e.target;

        setFormValues((prevState) => {
            const updatedState = { ...prevState };

            if (category === 'qualifications') {
                // Update qualifications
                const updatedQualifications = [...prevState.qualifications];
                updatedQualifications[index][field] = value;

                updatedState.qualifications = updatedQualifications;
            } else if (category === 'years_of_experience') {
                // Update years_of_experience
                const updatedExperiences = [...prevState.years_of_experience];

                // Determine if we are updating startDate or endDate
                if (field === 'startDate' || field === 'endDate') {
                    const dateField = field;
                    const dateSubField = e.target.name.includes('Month') ? 'month' : 'year';

                    // Ensure the date object is initialized
                    if (!updatedExperiences[index][dateField]) {
                        updatedExperiences[index][dateField] = { month: '', year: '' };
                    }

                    // Update the respective month or year
                    updatedExperiences[index][dateField][dateSubField] = value;
                } else {
                    // For other fields (like organizationName)
                    updatedExperiences[index][field] = value;
                }

                updatedState.years_of_experience = updatedExperiences;
            }

            return updatedState;
        });
    };








    // Specific handler for nested fields (like startDate and endDate)
    const handleDateChange = (e, index, field, subField) => {
        const { value } = e.target;

        setFormValues((prevState) => {
            const updatedQualifications = [...prevState.qualifications];
            updatedQualifications[index][field][subField] = value;

            return {
                ...prevState,
                qualifications: updatedQualifications
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
            qualifications: items
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
                    instituteName: '',
                    degree: '',
                    fieldOfStudy: '',
                    startDate: { month: '', year: '' },
                    endDate: { month: '', year: '' },
                    description: '',
                    skills: []
                }
            ]
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
                    jobTitle: '',
                    employmentType: 'Work from Office',
                    organizationName: '',
                    organizationLocation: '',
                    startDate: { month: '', year: '' },
                    endDate: { month: '', year: '' },
                    isPresent: false,
                    description: '',
                    skills: []
                }
            ]
        });
    };



    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name.startsWith("clinic_hospital_address.")) {
            const fieldName = name.split(".")[1];
            setFormValues((prev) => ({
                ...prev,
                clinic_hospital_address: {
                    ...prev.clinic_hospital_address,
                    [fieldName]: value,
                },
            }));
        } else {
            setFormValues((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
    };

    // Handle change in qualification selection
    const handleQualificationChange = (event) => {
        const selectedQualification = event.target.value;

        // Update qualifications array, ensuring no duplicates
        if (selectedQualification && !formValues.qualifications.includes(selectedQualification)) {
            setFormValues((prev) => ({
                ...prev,
                qualifications: [...prev.qualifications, selectedQualification],  // Add selected qualification
            }));
        }
    };

    //delete 

    const handleDeleteQualification = (index) => {
        setFormValues((prevState) => ({
            ...prevState,
            qualifications: prevState.qualifications.filter((_, i) => i !== index)
        }));
    };




    const HandleDeleteExperience = (index) => {
        setFormValues((prev) => ({
            ...prev,
            years_of_experience: prev.years_of_experience.filter((_, i) => i !== index)


        }))
    }

    //for IsPresent 

    const handleIsPresentChange = (index) => {
        setFormValues((prevState) => {
            const updatedExperiences = [...prevState.years_of_experience];
            // Toggle the value of isPresent for the given index
            updatedExperiences[index].isPresent = !updatedExperiences[index].isPresent;

            return {
                ...prevState,
                years_of_experience: updatedExperiences
            };
        });
    };






    // Function to handle input change for skills
    // const handleSkillsChange = (e, index) => {
    //     const { value } = e.target;
    //     const skillsArray = value.split(',').map(skill => skill.trim()); // Split input by commas and trim whitespace

    //     const updatedQualifications = [...formValues.qualifications];
    //     updatedQualifications[index] = {
    //         ...updatedQualifications[index],
    //         skills: skillsArray, // Update skills array
    //     };

    //     setFormValues((prevState) => ({
    //         ...prevState,
    //         qualifications: updatedQualifications,
    //     }));
    // };


    const handleLanguageChange = (event) => {
        const selectedLanguage = event.target.value;

        // Update language array without duplicates
        if (selectedLanguage && !formValues.language.includes(selectedLanguage)) {
            setFormValues((prev) => ({
                ...prev,
                language: [...prev.language, selectedLanguage],  // Add selected language
            }));
        }
    };



    //qualification skill delete

    const handleQualificationDelete = (qualificationIndex, skillIndex) => {
        setFormValues((prevState) => {
            const updatedQualifications = [...prevState.qualifications]; // Copy qualifications array
            const updatedSkills = [...updatedQualifications[qualificationIndex].skills]; // Copy skills array

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
        })
    }


    const [qualificationError, setQualificationError] = useState(false);
    const [specialtyError, setSpecialityError] = useState(false)
    const [VisitingModeError, SetVisitingModeError] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        // Toast notification

        if (formValues.qualifications.length === 0) {
            setQualificationError(true);
            setSpecialityError(true);
            SetVisitingModeError(true);
        } else {
            setQualificationError(false);
            setSpecialityError(false);
            SetVisitingModeError(false);
            // proceed with form submission
            toast.success('Doctor information submitted successfully!');
        }

        console.log("formvalue", formValues);
        const { permanentAddress, city, state, PinCode } = formValues.clinic_hospital_address;
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");

        console.log(formValues.qualifications);

        try {
            const res = await axios.post("https://api.assetorix.com/ah/api/v1/dc/user/doctor/temp/add", {
                formValues
            }, {
                headers: {
                    "authorization": `Bearer ${token}`,
                    "id": id
                }
            });

            console.log("result", res.data);
        } catch (error) {
            console.error("Error submitting the form", error);
        }
    };

    const HandlexamSubmit = () => {
        console.log(formValues.qualifications);


    }

    const qualificationsOptions = [
        'MBBS',
        'MS',
        'MD',
        'BAMS',
        'BHMS',
        'BPT',
        'B.VSc',
        'BUMS',
        'BSMS',
        'BNYS'
    ];
    //Language

    const language = [
        "Hindi",
        "Arabic",
        "Chinese",
        "Russian",
        "French",
    ]

    const handleRemoveSpecialty = (id) => {
        setFormValues({
            ...formValues,
            specialitycategories: formValues.specialitycategories.filter(
                (specialtyId) => specialtyId !== id
            ),
        });
    };

    const handleQualificationSubmit = () => {
        console.log(formValues);

    }

    const CouncilName = ["Punjab Medical Council", "Bihar Medical Council", "Gujarat Medical Council", "Andhra Pradesh Medical Council", "Maharashtra Medical Council", "Rajasthan Medical Council", "Travancore Cochin Medical Council, Trivandrum", "Vidharba Medical Council", "Assam Medical Council", "karnataka Medical Council", "Orissa Council of Medical Registration", "Bombay Medical Council", "Madhya Pradesh Medical Council", "West Bengal Medical Council", "Uttar Pradesh Medical Council", "Madras Medical Council", "Tamil Nadu Medical Council", "Indian Medical Council"]

    return (
        <div className='bg-[#E3EAF0]'>
            <TopHeader />
            <Navbar />
            <div className="bg-transparent my-10 sm:max-w-5xl w-full mx-auto h-auto p-10 rounded-xl shadow-lg">
                {/* Step Indicator */}
                <div className="flex justify-center mb-8">
                    <div className="w-1/2 flex justify-between">
                        <div className={`h-2 w-full rounded-full ${step >= 1 ? 'bg-[#00768A]' : 'bg-gray-300'}`} />
                        <div className={`h-2 w-full rounded-full ${step >= 2 ? 'bg-[#00768A]' : 'bg-gray-300'}`} />
                        <div className={`h-2 w-full rounded-full ${step >= 3 ? 'bg-[#00768A]' : 'bg-gray-300'}`} />
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    {/* Step 1: Doctor's Details */}
                    {step === 1 && (
                        <div className="bg-white p-10 rounded-xl shadow-lg">
                            <p className="font-semibold text-2xl text-center text-[#00768A] mb-6">Doctor's Details</p>
                            <div className="input-group flex flex-col gap-5">
                                {/* Specialist Toggle */}
                                <div className="relative inline-block text-left">
                                    <button
                                        type='button'
                                        onClick={toggleDropdown}
                                        className="bg-[#00768A] flex border-2 bg-opacity-70 border-gray-300 text-white px-4 py-2 rounded-md w-full text-start focus:outline-none"
                                    >
                                        {formValues.specialitycategories.length > 0
                                            ? specialtyoptions
                                                .filter(option => formValues.specialitycategories.includes(option._id))
                                                .map(option => (
                                                    <span key={option._id} className="flex  items-center mr-2">
                                                        {option.specialtyName}
                                                        <MdCancel className="ml-1" onClick={() => handleRemoveSpecialty(option._id)} />
                                                    </span>
                                                ))
                                            : "Select Specialties"}
                                    </button>
                                    {isOpen && (
                                        <div className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                            <div className="py-1">
                                                {specialtyoptions.map(ele => (
                                                    <div key={ele._id} onClick={() => handleSelectSpecialty(ele._id)} className="flex items-center justify-between px-4 py-2 text-gray-700 hoverder-[#00768A] cursor-pointer">
                                                        <span>{ele.specialtyName}</span>
                                                        {formValues.specialitycategories.includes(ele._id) && <TiTickOutline className="text-[#00768A]" />}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Other Input Fields */}
                                {/* Qualification */}
                                <div>
                                    <label htmlFor="qualifications" className="text-[#00768A]">Select Qualification:</label>
                                    <select id="qualifications" name="qualifications" value={formValues.qualifications} onChange={handleQualificationChange} className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]">
                                        <option value="" disabled>Select a Qualification</option>
                                        {qualificationsOptions.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Language */}
                                <div>
                                    <label htmlFor="language" className="text-[#00768A]">Select Language:</label>
                                    <select id="language" name="language" value={formValues.language} onChange={handleLanguageChange} className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]">
                                        <option value="" disabled>Select a Language</option>
                                        {language.map((option, index) => (
                                            <option key={index} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Visiting Mode */}
                                <div>
                                    <label htmlFor="visitingMode" className="text-[#00768A]">Select Visiting Mode:</label>
                                    <select name="visitingMode" value={formValues.visitingMode} onChange={handleChange} className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]" required>
                                        <option>Select Visit Mode</option>
                                        <option value="Offline">Offline</option>
                                        <option value="Online">Online</option>
                                        <option value="Both">Both</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[#00768A]" htmlFor="CouncilName">Select Council Name:</label>
                                    <select
                                        name="councilName"
                                        value={formValues.councilName}
                                        onChange={handleChange}
                                        className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                                        required
                                    >
                                        {
                                            CouncilName.map((ele) => {
                                                return <option>{ele}</option>
                                            })
                                        }
                                    </select>

                                </div>
                                <div>
                                    <label className="text-[#00768A]" htmlFor="RegistrationNumber">Registration Number</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                                        placeholder="Registration Number"
                                        name="RegistrationNumber"
                                        value={formValues.RegistrationNumber}
                                        onChange={handleChange}

                                        required
                                    />
                                </div>
                               
                                <div className="gap-5">
                                    <label className="text-[#00768A]" htmlFor="DoctorDescription">Doctor's Description</label>
                                    <textarea className="border border-gray-300 w-full h-18 p-3 rounded-md focus:outline-none focus:border-[#00768A]" placeholder='Enter Description' name="aboutDoctor" value={formValues.aboutDoctor} onChange={handleChange} required>

                                    </textarea>
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-6">
                                <button type="button" onClick={handleNextStep} className="bg-[#00768A] text-white px-6 py-2 rounded-md hover:bg-[#00607A]">Next</button>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Hospital Details */}
                    {step === 2 && (
                        <div className="bg-white p-10 rounded-xl shadow-lg">
                            <p className="font-semibold text-2xl text-center text-[#00768A] mb-6">Hospital Details</p>
                            <div className="input-group flex flex-col gap-5">
                                <div>
                                    <label htmlFor="HospitalName" className="text-[#00768A]">Hospital Name</label>
                                    <input type="text" className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]" placeholder="Hospital / Clinic Name" name="hospitalName" value={formValues.hospitalName} onChange={handleChange} required />
                                </div>

                                {/* Permanent Address */}
                                <div>
                                    <label htmlFor="PermanentAddress" className="text-[#00768A]">Permanent Address</label>
                                    <input type="text" className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]" placeholder="Permanent Address" name="clinic_hospital_address.permanentAddress" value={formValues.clinic_hospital_address.permanentAddress} onChange={handleChange} />
                                </div>

                                <div className="flex gap-5">
                                    <div>
                                        <label htmlFor="City" className="text-[#00768A]">City:</label>
                                        <input type="text" className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]" placeholder="City" name="clinic_hospital_address.city" value={formValues.clinic_hospital_address.city} onChange={handleChange} />
                                    </div>

                                    <div>
                                        <label htmlFor="State" className="text-[#00768A]">State:</label>
                                        <input type="text" className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]" placeholder="State" name="clinic_hospital_address.state" value={formValues.clinic_hospital_address.state} onChange={handleChange} />
                                    </div>
                                    <div className=''>
                                        <label htmlFor="PinCode" className="text-[#00768A]">Pin Code:</label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                                            placeholder="Pin Code"
                                            name="clinic_hospital_address.PinCode"
                                            value={formValues.clinic_hospital_address.PinCode}
                                            onChange={handleChange}
                                        />
                                    </div>

                                </div>
                                <div className='mt-3'>
                                    <label className="text-[#00768A]" htmlFor="Hospital Contact">Hospital Contact:</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                                        placeholder="Hospital Contact"
                                        name="hospital_contact"
                                        value={formValues.hospital_contact}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <label className="text-[#00768A]" htmlFor="Hospital Contact">Hospital Email:</label>
                                    <input
                                        type="email"
                                        className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                                        placeholder="Hospital Email"
                                        name="hospital_email"
                                        value={formValues.hospital_email}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>
                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-6">
                                <button type="button" onClick={handlePreviousStep} className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500">Back</button>
                                <button type="button" onClick={handleNextStep} className="bg-[#00768A] text-white px-6 py-2 rounded-md hover:bg-[#00607A]">Next</button>
                            </div>
                        </div>
                    )}
                    {step === 3 && (
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h2 className="text-2xl font-semibold text-[#00768A] mb-6">Doctor Profile Form</h2>

                            {/* Qualifications Section */}
                            <h3 className="text-xl font-semibold text-[#00768A] mb-4">Qualifications</h3>


                            <div className="border border-dashed border-gray-400 p-4 rounded-md">
                                {formValues.qualifications.map((qual, index) => (
                                    <div
                                        key={qual.sequenceNumber || `qual-${index}`}
                                        className="qualification-item mb-4 p-4 bg-gray-50 rounded-lg border border-gray-300"
                                    >
                                        {index >= 1 ? (
                                            <div className="flex justify-end">
                                                <MdDelete onClick={() => handleDeleteQualification(index)} className="cursor-pointer" />
                                            </div>
                                        ) : null}

                                        {/* Institute Name */}
                                        <div className="mb-3">
                                            <label className="block text-sm font-medium text-[#00768A]">Institute Name:</label>
                                            <input
                                                type="text"
                                                name="instituteName"
                                                required
                                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                value={qual.instituteName}
                                                onChange={(e) => handleInputChange(e, index, 'qualifications', 'instituteName')}
                                            />
                                        </div>

                                        {/* Degree */}
                                        <div className="mb-3">
                                            <label className="block text-sm font-medium text-[#00768A]">Degree:</label>
                                            <input
                                                type="text"
                                                name="degree"
                                                required
                                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                value={qual.degree}
                                                onChange={(e) => handleInputChange(e, index, 'qualifications', 'degree')}
                                            />
                                        </div>

                                        {/* Field of Study */}
                                        <div className="mb-3">
                                            <label className="block text-sm font-medium text-[#00768A]">Field of Study:</label>
                                            <input
                                                type="text"
                                                name="fieldOfStudy"
                                                required
                                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                value={qual.fieldOfStudy}
                                                onChange={(e) => handleInputChange(e, index, 'qualifications', 'fieldOfStudy')}
                                            />
                                        </div>

                                        {/* Start Date */}
                                        <div className="mb-3 flex gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#00768A]">Start Month:</label>
                                                <input
                                                    type="text"
                                                    name="startMonth"
                                                    placeholder="MM"
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                    value={qual.startDate?.month}
                                                    onChange={(e) => handleDateChange(e, index, 'startDate', 'month')}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#00768A]">Start Year:</label>
                                                <input
                                                    type="text"
                                                    name="startYear"
                                                    placeholder="YYYY"
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                    value={qual.startDate?.year}
                                                    onChange={(e) => handleDateChange(e, index, 'startDate', 'year')}
                                                />
                                            </div>
                                        </div>

                                        {/* End Date */}
                                        <div className="mb-3 flex gap-4">
                                            <div>
                                                <label className="block text-sm font-medium text-[#00768A]">End Month:</label>
                                                <input
                                                    type="text"
                                                    name="endMonth"
                                                    placeholder="MM"
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                    value={qual.endDate?.month}
                                                    onChange={(e) => handleDateChange(e, index, 'endDate', 'month')}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium text-[#00768A]">End Year:</label>
                                                <input
                                                    type="text"
                                                    name="endYear"
                                                    placeholder="YYYY"
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                    value={qual.endDate?.year}
                                                    onChange={(e) => handleDateChange(e, index, 'endDate', 'year')}
                                                />
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-3">
                                            <label className="block text-sm font-medium text-[#00768A]">Description:</label>
                                            <textarea
                                                name="description"
                                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                value={qual.description}
                                                onChange={(e) => handleInputChange(e, index, 'qualifications', 'description')}
                                            />
                                        </div>

                                        {/* Skills */}
                                        <div className="mb-3 flex gap-3">
                                            <div className="w-[80%]">
                                                <label className="block text-sm font-medium text-[#00768A]">Skills</label>
                                                <input
                                                    type="text"
                                                    placeholder="Skills"
                                                    value={QualificationSkill}
                                                    onChange={(e) => setQualificationSkill(e.target.value)}
                                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => HandleSkillOfQualification(index)}
                                                className="mb-6 px-4 py-2 mt-6 bg-[#00607A] text-white rounded-md hover:bg-[#306978] transition duration-300"
                                            >
                                                Add
                                            </button>
                                        </div>

                                        {qual.skills && (
                                            <div className="flex flex-wrap gap-2">
                                                {qual.skills.map((skill, skillIndex) => (
                                                    <div className="flex items-center gap-2 bg-[#00768A] p-2 rounded-md" key={skillIndex}>
                                                        <p className="text-white">{skill}</p>
                                                        <ImCross
                                                            style={{ fontSize: "10px", color: "white", marginTop: "5px" }}
                                                            onClick={() => handleQualificationDelete(index, skillIndex)}
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
                                Add Qualification
                            </button>

                            {/* Experience Section */}
                            <h3 className="text-xl font-semibold text-[#00768A] mb-4">Years of Experience</h3>
                            <DragDropContext onDragEnd={(result) => onDragEnd(result, 'years_of_experience')}>
                                <Droppable droppableId="years_of_experience">
                                    {(provided) => (
                                        <div
                                            {...provided.droppableProps}
                                            ref={provided.innerRef}
                                            className="border border-dashed border-gray-400 p-4 rounded-md"
                                        >
                                            {formValues.years_of_experience.map((exp, index) => (
                                                <Draggable key={exp.id || `exp-${index}`} draggableId={`exp-${index}`} index={index}>
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`experience-item mb-4 p-4 bg-gray-50 rounded-lg border border-gray-300 transition-transform duration-300 ${snapshot.isDragging ? "shadow-lg transform scale-105" : ""
                                                                }`}
                                                        >
                                                            {
                                                                index >= 1 ? <div className='flex justify-end'><MdDelete onClick={() => HandleDeleteExperience(index)} /></div> : null
                                                            }


                                                            <div className="mb-3">
                                                                <label className="block text-sm font-medium text-[#00768A]">Job Title:</label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                                    value={exp.jobTitle}
                                                                    onChange={(e) => handleInputChange(e, index, 'years_of_experience', 'jobTitle')}
                                                                />
                                                            </div>

                                                            <div className="mb-3">
                                                                <label className="block text-sm font-medium text-[#00768A]">Employment Type:</label>
                                                                <select
                                                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                                                    value={exp.employmentType}
                                                                    onChange={(e) => handleInputChange(e, index, 'years_of_experience', 'employmentType')}
                                                                >
                                                                    <option value="Work from Office">Work from Office</option>
                                                                    <option value="Work from Home">Work from Home</option>
                                                                    <option value="Hybrid work">Hybrid work</option>
                                                                </select>
                                                            </div>

                                                            <div className='mb-3'>
                                                                <label className="block text-sm font-medium text-[#00768A]">Organisation Name</label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                                    value={exp.organizationName}
                                                                    onChange={(e) => handleInputChange(e, index, 'years_of_experience', 'organizationName')}
                                                                />
                                                            </div>

                                                            <div className='mb-3'>
                                                                <label className="block text-sm font-medium text-[#00768A]">Organisation Location</label>
                                                                <input
                                                                    type="text"
                                                                    className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                                    value={exp.organizationLocation}
                                                                    onChange={(e) => handleInputChange(e, index, 'years_of_experience', 'organizationLocation')}
                                                                />
                                                            </div>

                                                            {/* start Month ,Year */}
                                                            <div className="mb-3 flex gap-4">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-[#00768A]">Start Month:</label>
                                                                    <input
                                                                        type="text"
                                                                        name="startMonth"
                                                                        placeholder="MM"
                                                                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                                        value={exp.startDate?.month || ''} // Use optional chaining
                                                                        onChange={(e) => handleInputChange(e, index, 'startDate', 'month')}
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-[#00768A]">Start Year:</label>
                                                                    <input
                                                                        type="text"
                                                                        name="startYear"
                                                                        placeholder="YYYY"
                                                                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                                        value={exp.startDate?.year || ''} // Use optional chaining
                                                                        onChange={(e) => handleInputChange(e, index, 'years_of_experience', 'startDate')}
                                                                    />
                                                                </div>
                                                                <input type="checkbox" value="exp.isPresent" name='isPresent'
                                                                    onChange={() => handleIsPresentChange(index)} />
                                                            </div>

                                                            {
                                                                !exp.isPresent && (  // If `isPresent` is false, show End Date inputs
                                                                    <div className="mb-3 flex gap-4">
                                                                        <div>
                                                                            
                                                                            <label className="block text-sm font-medium text-[#00768A]">End Month:</label>
                                                                            <input
                                                                                type="text"
                                                                                name="endMonth"
                                                                                placeholder="MM"
                                                                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                                                value={exp.endDate?.month}
                                                                                onChange={(e) => handleInputChange(e, index, 'years_of_experience', 'endDate')}
                                                                            />
                                                                        </div>
                                                                        <div>
                                                                            <label className="block text-sm font-medium text-[#00768A]">End Year:</label>
                                                                            <input
                                                                                type="text"
                                                                                name="endYear"
                                                                                placeholder="YYYY"
                                                                                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"
                                                                                value={exp.endDate?.year}
                                                                                onChange={(e) => handleInputChange(e, index, 'years_of_experience', 'endDate')}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                )
                                                            }


                                                            <div className="mb-3">
                                                                <label className="block text-sm font-medium text-[#00768A]">Description</label>
                                                                <textarea value={exp.description} onChange={(e) => handleInputChange(e, index, 'years_of_experience', 'description')} className="border border-gray-300 w-full h-18 p-3 rounded-md focus:outline-none focus:border-[#00768A]" placeholder='Enter Description' required>

                                                                </textarea>
                                                            </div>

                                                            <div className='mb-3 flex gap-3'>
                                                                <div className='w-[80%]'>
                                                                    <label className="block text-sm font-medium text-[#00768A]">Skills</label>
                                                                    <input type="text"
                                                                        placeholder='Skills'
                                                                        value={skillInput} // Bind the input value to state
                                                                        onChange={(e) => setSkillInput(e.target.value)}
                                                                        className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-[#00768A]"

                                                                    />
                                                                </div>
                                                                <button type='button' onClick={() => HandleSkillOfExperience(index)} className='mb-6 px-4 py-2 mt-6 bg-[#00607A] text-white rounded-md hover:bg-[#306978] transition duration-300'>Add</button>
                                                            </div>

                                                            {
                                                                formValues.years_of_experience.map((exp, index) => (
                                                                    <div className='flex flex-wrap gap-2' key={index}>
                                                                        {exp.skills.map((skill, skillIndex) => (
                                                                            <div className='flex items-center gap-2 bg-[#00768A]  p-2 rounded-md' key={skillIndex}>
                                                                                <p className='text-[white]'>{skill}</p> <ImCross style={{ fontSize: "10px", color: "white", marginTop: "5px" }} onClick={() => HandleExperienceSkillDelete(index, skillIndex)} />
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </DragDropContext>
                            <div className='flex justify-between'>
                                <button
                                    type="button"
                                    onClick={addExperience}
                                    className="mb-6 px-4 py-2 mt-4 bg-[#00607A] text-white rounded-md hover:bg-[#306978] transition duration-300"
                                >
                                    Add Experience
                                </button>

                                <button type="button" onClick={handlePreviousStep} className="mb-6 px-4 py-2 mt-4 bg-[#9CA3AF] text-white rounded-md  transition duration-300">Back</button>
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
            </div >

            <Footer />
            <Toaster />
        </div >
    );
};

export default DoctorForm;
