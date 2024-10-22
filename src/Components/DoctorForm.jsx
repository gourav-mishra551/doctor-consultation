import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import Multiselect from 'multiselect-react-dropdown';
import { MdCancel } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import axios from 'axios';
import TopHeader from './TopHeader';
import Navbar from './Navbar';
import Footer from './Footer';

const DoctorForm = () => {
    const [formValues, setFormValues] = useState({
        years_of_experience: "",
        specialitycategories: [],
        hospitalName: "",
        clinic_hospital_address: {
            permanentAddress: "",
            city: "",
            state: "",
            PinCode: "",
        },
        hospital_contact: "",
        qualifications: [],
        hospital_email: "",
        visitingMode: "offline",
        aboutDoctor: "",
        councilName: "",
        RegistrationNumber: '',
        language: []
    });

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
    console.log(specialtyoptions);




    const handleSpecialtyChange = (event) => {
        const selectedOptions = Array.from(event.target.selectedOptions).map(option => option.value);
        setFormValues((prev) => ({
            ...prev,
            specialitycategories: selectedOptions, // Store the selected specialty IDs
        }));
    };
    const [showSpecialization, setShowSpecialization] = useState([true]);

    const handlePlusClick = () => {
        setShowSpecialization((prev) => [...prev, true]);
        setFormValues((prev) => ({
            ...prev,
            specialitycategories: [...prev.specialitycategories, ""],
        }));
    };

    const handleMinusClick = (index) => {
        setShowSpecialization((prev) => prev.filter((_, i) => i !== index));
        setFormValues((prev) => ({
            ...prev,
            specialitycategories: prev.specialitycategories.filter((_, i) => i !== index),
        }));
    };

    const handleInputChange = (index) => (event) => {
        const newSpecializations = [...formValues.specialitycategories];
        newSpecializations[index] = event.target.value;
        setFormValues((prev) => ({
            ...prev,
            specialitycategories: newSpecializations,
        }));
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
            console.log("Form submitted successfully");
            console.log(formValues); // Show form values in console
            toast.success('Doctor information submitted successfully!');
        }

        console.log("formvalue", formValues);
        const { permanentAddress, city, state, PinCode } = formValues.clinic_hospital_address;
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");

        console.log(formValues.qualifications);

        try {
            const res = await axios.post("https://api.assetorix.com/ah/api/v1/dc/user/doctor/temp/add", {
                years_of_experience: formValues.years_of_experience,
                specialitycategories: formValues.specialitycategories,
                qualifications: formValues.qualifications,
                hospitalName: formValues.hospitalName,
                permanentAddress,
                city,
                state,
                PinCode,
                hospital_contact: formValues.hospital_contact,
                hospital_email: formValues.hospital_email,
                visitingMode: formValues.visitingMode,
                aboutDoctor: formValues.aboutDoctor,
                councilName: formValues.councilName,
                RegistrationNumber: formValues.RegistrationNumber,
                doctorType: formValues.doctorType,
                language: formValues.language
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

    // const [languageOptions] = useState(language)

    //specialization

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
                    </div>
                </div>

                <form>
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
                                    <label  htmlFor="visitingMode" className="text-[#00768A]">Select Visiting Mode:</label>
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
                                <div>
                                    <label className="text-[#00768A]" htmlFor="YearsOfExperience">Years of Experience</label>
                                    <input
                                        type="month"
                                        className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-[#00768A]"
                                        placeholder="Years of Experience"
                                        name="years_of_experience"
                                        value={formValues.years_of_experience}
                                        onChange={handleChange}

                                        required
                                        min="2018-03"
                                    />
                                </div>
                                <div className="gap-5">
                                    <label className="text-[#00768A]"  htmlFor="DoctorDescription">Doctor's Description</label>
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
                                <button type="submit" className="bg-[#00768A] text-white px-6 py-2 rounded-md hover:bg-[#00607A]">Submit</button>
                            </div>
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
