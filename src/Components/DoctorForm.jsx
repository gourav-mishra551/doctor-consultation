import React, { useEffect, useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa";
import toast, { Toaster } from 'react-hot-toast';
import Multiselect from 'multiselect-react-dropdown';
import { MdCancel } from "react-icons/md";
import { TiTickOutline } from "react-icons/ti";
import axios from 'axios';

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
            const specialty = result.getdata.map((ele) => ({
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

    // const handleSpecialtyChange = (selectedList) => {
    //     setFormValues((prev) => ({
    //         ...prev,
    //         specialitycategories: selectedList.map(item => item.specialtyName),  // Store the specialtyName
    //     }));
    // }

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
        <form onSubmit={handleSubmit}>
            <div className="main-form-section bg-white sm:max-w-5xl w-[100%] mx-auto h-auto p-10 rounded-xl shadow-lg">
                <div className="amethues-logo flex justify-center items-center bg-gray-50 rounded-t-xl py-6">
                    <img src="ametheus.webp" alt="ametheus-logo" className="w-[200px]" />
                </div>

                <div className="form-container flex sm:flex-row flex-col gap-10 p-8 bg-gray-50 rounded-xl mt-6">
                    <div className="doctor-form sm:w-[50%] w-full">
                        <p className="font-semibold text-2xl text-center text-blue-600 mb-6">Doctor's Details</p>
                        <div className="input-group flex flex-col gap-5">
                            <div>
                                {/* <label htmlFor="specialties">Select Specialties</label>
                                <select
                                    id="specialties"
                                    multiple // Enable multiple selection
                                    onChange={handleSpecialtyChange} // Handle change
                                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                >
                                    <option disabled>Select specialties</option>
                                    {
                                        specialtyoptions.map((ele) => (
                                            <option key={ele._id} value={ele._id}>
                                                {ele.specialtyName}
                                            </option>
                                        ))
                                    }
                                </select> */}

                                {/* Display selected specialties for verification */}
                                {/* <div>
                                    <h3>Selected Specialties:</h3>
                                    <ul>
                                        {formValues.specialitycategories.map((id) => {
                                            const selectedSpecialty = specialtyoptions.find(option => option._id === id);
                                            return selectedSpecialty ? <li key={id}>{selectedSpecialty.specialtyName}</li> : null;
                                        })}
                                    </ul>
                                </div> */}
                            </div>

                            {/* specialist toggle */}

                            <div className="relative inline-block text-left">
                                <button
                                    onClick={toggleDropdown}
                                    className="bg-#ffff-500 text-black px-4 py-2 rounded-md w-full text-start focus:outline-none focus:border-blue-400 border border-gray-300 "
                                >
                                    {/* Display selected specialties or default text */}
                                    {formValues.specialitycategories.length > 0
                                        ? specialtyoptions
                                            .filter((option) =>
                                                formValues.specialitycategories.includes(option._id)
                                            )
                                            .map((option) => (
                                                <span key={option._id} style={{ display: "inline-flex", alignItems: "center", marginRight: "8px" }}>
                                                    {option.specialtyName}
                                                    <MdCancel
                                                        style={{ cursor: "pointer", marginLeft: "4px" }}
                                                        onClick={() => handleRemoveSpecialty(option._id)}
                                                    />
                                                </span>
                                            ))
                                        : "Select Specialties"}
                                </button>

                                {/* Dropdown menu */}
                                {isOpen && (
                                    <div className="absolute mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                                        <div className="py-1" role="menu">
                                            {specialtyoptions.map((ele) => (
                                                <div
                                                    key={ele._id}
                                                    value={ele._id}
                                                    onClick={() => handleSelectSpecialty(ele._id)}
                                                    className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-blue-100 cursor-pointer"
                                                >
                                                    <span>{ele.specialtyName}</span>
                                                    {formValues.specialitycategories.includes(ele._id) && (
                                                        <TiTickOutline className="text-blue-1000" />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                            </div>
                            {/* Select Qualification */}
                            <div>
                                <label htmlFor="qualifications">Select Qualification:</label>
                                <select
                                    id="qualifications"
                                    name="qualifications"
                                    value={formValues.qualifications}
                                    onChange={handleQualificationChange}
                                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                >
                                    <option value="" disabled>Select a Qualification</option>
                                    {qualificationsOptions.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {formValues.qualifications.length > 0 && (
                                    <div>
                                        <h4>Selected Qualifications:</h4>
                                        <ul style={{ display: "flex", gap: "5px" }}>
                                            {formValues.qualifications.map((qualification, index) => (
                                                <li key={index}>{qualification}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* <Multiselect options={options} displayValue='qualifications' selectedValues={formValues.qualifications} onSelect={handleQualificationChange} onRemove={handleQualificationChange} /> */}
                                {qualificationError && <p className="text-red-500">Please select at least one qualification.</p>}
                            </div>


                            {/* LANGUAE */}
                            <div>
                                <label htmlFor="language">Select Language:</label>
                                <select
                                    id="language"
                                    name="language"
                                    value={formValues.language}
                                    onChange={handleLanguageChange}
                                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                >
                                    <option value="" disabled>Select a Language</option>
                                    {language.map((option, index) => (
                                        <option key={index} value={option}>
                                            {option}
                                        </option>
                                    ))}
                                </select>
                                {formValues.language.length > 0 && (
                                    <div>
                                        <h4>Selected language:</h4>
                                        <ul style={{ display: "flex", gap: "5px" }}>
                                            {formValues.language.map((qualification, index) => (
                                                <li key={index}>{qualification}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* <Multiselect options={options} displayValue='qualifications' selectedValues={formValues.qualifications} onSelect={handleQualificationChange} onRemove={handleQualificationChange} /> */}
                                {qualificationError && <p className="text-red-500">Please select at least one qualification.</p>}
                            </div>

                            <div>
                                <label htmlFor="visitingMode">Select Visiting Mode:</label>
                                <select
                                    name="visitingMode"
                                    value={formValues.visitingMode}
                                    onChange={handleChange}
                                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                    required
                                >
                                    <option>Select Visit Mode</option>
                                    <option value="Offline">Offline</option>
                                    <option value="Online">Online</option>
                                    <option value="Both">Both</option>
                                </select>
                                {VisitingModeError && <p className="text-red-500">Please select Visiting Mode.</p>}
                            </div>

                            <div>
                                <label htmlFor="CouncilName">Select Council Name:</label>
                                <select
                                    name="councilName"
                                    value={formValues.councilName}
                                    onChange={handleChange}
                                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
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
                                <label htmlFor="RegistrationNumber">Registration Number</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                    placeholder="Registration Number"
                                    name="RegistrationNumber"
                                    value={formValues.RegistrationNumber}
                                    onChange={handleChange}

                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="YearsOfExperience">Years of Experience</label>
                                <input
                                    type="month"
                                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                    placeholder="Years of Experience"
                                    name="years_of_experience"
                                    value={formValues.years_of_experience}
                                    onChange={handleChange}
                                   
                                    required
                                    min="2018-03" 
                                />
                            </div>


                            <div className="gap-5">
                                <label htmlFor="DoctorDescription">Doctor's Description</label>
                                <textarea className="border border-gray-300 w-full h-18 p-3 rounded-md focus:outline-none focus:border-blue-400" placeholder='Enter Description' name="aboutDoctor" value={formValues.aboutDoctor} onChange={handleChange} required>

                                </textarea>
                            </div>
                        </div>
                    </div>

                    <div className="hospital-form sm:w-[50%] w-full" >
                        <p className="font-semibold text-2xl text-center text-blue-600 mb-6">Hospital Details</p>
                        <div className="input-group flex flex-col gap-5">
                            <div>
                                <label htmlFor="HospitalName">Hospital Name</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                    placeholder="Hospital / Clinic Name"
                                    name="hospitalName"
                                    value={formValues.hospitalName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            {/* Improved conditional rendering */}
                            <div>
                                <div className="input flex flex-col gap-2">
                                    <label htmlFor="PermanentAddress">Permanent Address</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                        placeholder="Permanent Address"
                                        name="clinic_hospital_address.permanentAddress"
                                        value={formValues.clinic_hospital_address.permanentAddress}
                                        onChange={handleChange}
                                    />

                                    <div className="flex gap-5 mt-4">
                                        <div>
                                            <label htmlFor="City">City:</label>
                                            <input
                                                type="text"
                                                className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                                placeholder="City"
                                                name="clinic_hospital_address.city"
                                                value={formValues.clinic_hospital_address.city}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="State">State:</label>
                                            <input
                                                type="text"
                                                className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                                placeholder="State"
                                                name="clinic_hospital_address.state"
                                                value={formValues.clinic_hospital_address.state}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='mt-3'>
                                        <label htmlFor="PinCode">Pin Code:</label>
                                        <input
                                            type="text"
                                            className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                            placeholder="Pin Code"
                                            name="clinic_hospital_address.PinCode"
                                            value={formValues.clinic_hospital_address.PinCode}
                                            onChange={handleChange}
                                        />
                                    </div>

                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="Hospital Contact">Hospital Contact:</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                        placeholder="Hospital Contact"
                                        name="hospital_contact"
                                        value={formValues.hospital_contact}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='mt-3'>
                                    <label htmlFor="Hospital Contact">Hospital Email:</label>
                                    <input
                                        type="email"
                                        className="border border-gray-300 w-full h-12 p-3 rounded-md focus:outline-none focus:border-blue-400"
                                        placeholder="Hospital Email"
                                        name="hospital_email"
                                        value={formValues.hospital_email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>


                        </div>
                    </div>
                </div>

                <div className="button-container flex justify-center items-center mt-8">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                    >
                        Submit
                    </button>
                </div>
            </div>

            <Toaster />
        </form>
    );
};

export default DoctorForm;
