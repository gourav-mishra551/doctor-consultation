import React, { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FaCommentDots, FaEdit, FaGraduationCap } from "react-icons/fa";
import { RiQuestionnaireFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import ContactUs from "./ContactUs";
import axios from "axios";
import { IoMdStopwatch } from "react-icons/io";
import { MdOutlineAddLocation } from "react-icons/md";
import { SiClockify } from "react-icons/si";
import { TiDelete } from "react-icons/ti";
import EditDrProfileShow from "./EditDrProfileShow";

function DRProfileShow() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeSection, setActiveSection] = useState("ManageProfile");
  const [selectLang, setSelectLang] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dummyLanguages = [
    "English",
    "Hindi",
    "Spanish",
    "French",
    "German",
    "Mandarin",
  ];

  const [profileShow, setProfileShow] = useState({});
  const [formData, setFormData] = useState({
    name: profileShow?.userData?.name || "",
    specialities: profileShow?.specialities || [],
    language: profileShow?.language || [],
    aboutDoctor: profileShow?.aboutDoctor || "",
    hospitalName: profileShow?.hospitalName || "",
    clinicAddress: profileShow?.clinic_hospital_address || {},
    qualifications: profileShow?.qualifications || [],
    experience: profileShow?.years_of_experience || [],
  });

  const specialityNames = Array.isArray(profileShow.specialities)
    ? profileShow.specialities
        .map((speciality) => speciality.specialtyName)
        .join(", ")
    : "";

  const language = Array.isArray(profileShow.language)
    ? profileShow.language.join(", ") // Display as a comma-separated string in the input
    : "";

  useEffect(() => {
    ProfileFetchingData();
  }, []);

  const ProfileFetchingData = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    setIsLoading(true);
    try {
      const response = await axios.get(
        "https://api.assetorix.com/ah/api/v1/dc/doctor",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      console.log(response.data);

      setProfileShow(response.data.data);
    } catch (error) {
      console.error("Failed to fetch profile data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSpecialityChange = (index, value) => {
    const updatedSpecialities = [...formData.specialities];
    updatedSpecialities[index] = value;
    setFormData({ ...formData, specialities: updatedSpecialities });
  };

  const handleQualificationChange = (index, field, value) => {
    const updatedQualifications = [...formData.qualifications];
    updatedQualifications[index][field] = value;
    setFormData({ ...formData, qualifications: updatedQualifications });
  };

  const handleExperienceChange = (index, field, value) => {
    const updatedExperience = [...formData.experience];
    updatedExperience[index][field] = value;
    setFormData({ ...formData, experience: updatedExperience });
  };

  // Additional logic to handle when the language is changed
  const handleAdditionalLogic = (value) => {
    console.log(`Selected Language: ${value}`);
    // Add any other logic you want here
    setSelectLang((prevLangs) => [...prevLangs, value]);
  };
  console.log(selectLang);

  // Combined handleChange function
  const combinedHandleChange = (e) => {
    handleChange(e); // Call original handleChange
    handleAdditionalLogic(e.target.value); // Call additional logic
  };

  const languageRemove = (languageToRemove) => {
    setSelectLang((prevLangs) =>
      prevLangs.filter((lang) => lang !== languageToRemove)
    );
    setFormData((prevData) => ({
      ...prevData,
      language: prevData.language.filter((lang) => lang !== languageToRemove), // Update formData language
    }));
  };

  const handleSelectLanguage = (value) => {
    if (!selectLang.includes(value)) {
      setSelectLang((prevLangs) => [...prevLangs, value]);
      setFormData((prevData) => ({
        ...prevData,
        language: [...prevData.language, value], // Update formData language
      }));
    }
  };

  // Function to submit updated data
  const handleUpdate = async () => {
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    try {
      const response = await fetch(
        "https://api.assetorix.com/ah/api/v1/dc/doctor",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            id: id,
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Profile updated successfully!");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  return (
    <div className="flex flex-col bg-[#DAF5F3] min-h-screen">
      <div className="flex flex-1">
        <div className="btn-sections h-max w-[20%] m-12 sticky top-[20px] bg-white border border-gray-200 rounded-lg shadow-lg p-4">
          <button
            type="button"
            onClick={() => setActiveSection("ManageProfile")}
            className="w-full mb-4 p-3 rounded-lg flex justify-between bg-[#F9F9F9] hover:bg-[#E5E5E5] transition-colors"
            style={{ border: "1px solid #1A5B6A" }}
          >
            <Link className="flex items-center gap-2 text-[#1A5B6A]">
              <CgProfile className="text-xl" /> My Profile
            </Link>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("NeedHelp")}
            className="w-full mb-4 p-3 rounded-lg flex justify-between bg-[#F9F9F9] hover:bg-[#E5E5E5] transition-colors"
            style={{ border: "1px solid #1A5B6A" }}
          >
            <span className="flex items-center gap-2 text-[#1A5B6A]">
              <RiQuestionnaireFill className="text-xl" /> Need Help
            </span>
          </button>
          <button
            type="button"
            onClick={() => setActiveSection("EditProfile")}
            className="w-full mb-4 p-3 rounded-lg flex justify-between bg-[#F9F9F9] hover:bg-[#E5E5E5] transition-colors"
            style={{ border: "1px solid #1A5B6A" }}
          >
            <span className="flex items-center gap-2 text-[#1A5B6A]">
              <FaEdit className="text-xl" /> Edit Profile
            </span>
          </button>
        </div>

        <div className="sections-show w-[65%] m-12 bg-white rounded-lg shadow-lg p-6">
          {activeSection === "ManageProfile" && profileShow.userData && (
            <div>
              <div className="border border-gray-300 rounded-xl p-6 max-w-5xl mx-auto bg-white shadow-lg">
                <div className="flex gap-8 items-start">
                  <div className="w-44 h-44 rounded-full overflow-hidden border border-gray-200">
                    <img
                      src={profileShow.userData.avatar}
                      alt={profileShow.userData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="mb-4">
                      <p className="text-3xl font-bold text-gray-800">
                        {profileShow.userData.name}
                      </p>
                      <p className="text-gray-500 text-lg">
                        5+ years experience
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-semibold text-gray-600">
                        Specialty:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {profileShow.specialities?.map((speciality, index) => (
                          <span
                            className="font-semibold text-gray-700"
                            key={index}
                          >
                            {speciality.specialtyName}
                            {index < profileShow.specialities.length - 1 && ","}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <FaCommentDots className="text-gray-500" />
                      <div className="flex flex-wrap gap-2">
                        {profileShow.language?.map((lang, index) => (
                          <span
                            className="font-semibold text-gray-700"
                            key={index}
                          >
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg mb-6">
                      <MdOutlineAddLocation className="text-gray-500" />
                      <div className="text-gray-700">
                        <p className="font-bold">{profileShow.hospitalName}</p>
                        <p>
                          {
                            profileShow.clinic_hospital_address
                              ?.permanentAddress
                          }
                        </p>
                        <p>
                          {profileShow.clinic_hospital_address?.state},{" "}
                          {profileShow.clinic_hospital_address?.city},{" "}
                          {profileShow.clinic_hospital_address?.PinCode}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="flex items-center gap-2 text-3xl font-bold text-gray-800 mb-4">
                    <FaGraduationCap /> Education
                  </h2>
                  {profileShow.qualifications?.map((qual, index) => (
                    <div className="mb-4" key={index}>
                      <h3 className="text-xl font-bold text-gray-800">
                        {qual.degree}
                      </h3>
                      <p className="text-gray-600">{qual.instituteName}</p>
                      <p className="text-gray-500">
                        {qual.startDate.month} {qual.startDate.year} -{" "}
                        {qual.endDate.month} {qual.endDate.year}
                      </p>
                    </div>
                  ))}
                </div>

                <hr className="my-6" />

                <div>
                  <h2 className="flex items-center gap-2 text-3xl font-bold text-gray-800 mb-4">
                    <SiClockify /> Experience
                  </h2>
                  {profileShow.years_of_experience?.map((exp, index) => (
                    <div className="mb-4" key={index}>
                      <h3 className="text-xl font-bold text-gray-800">
                        {exp.organizationName}, {exp.organizationLocation}
                      </h3>
                      <p className="text-gray-600">
                        {exp.jobTitle} - {exp.employmentType}
                      </p>
                      <p className="text-gray-500">
                        {exp.startDate.month} {exp.startDate.year} -{" "}
                        {exp.endDate.month} {exp.endDate.year}
                      </p>
                      <hr className="my-3" />
                    </div>
                  ))}
                </div>

                <div className="about-dr mt-8">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4">
                    About Doctor
                  </h2>
                  <p className="text-gray-600">{profileShow.aboutDoctor}</p>
                </div>
              </div>
            </div>
          )}
          {activeSection === "NeedHelp" && <ContactUs />}
          {activeSection === "EditProfile" && (
            <EditDrProfileShow
              profileShow={profileShow}
              setProfileShow={setProfileShow}
            />
          )}
        </div>
      </div>

      <div className="w-full border-t border-gray-200 p-6 bg-white">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">FAQ’s</h2>
        {profileShow?.FAQ?.map((faq, index) => (
          <div key={index} className="mb-4">
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <h3 className="font-bold text-gray-800">{faq.title}</h3>
                <span>{openIndex === index ? "-" : "+"}</span>
              </div>
              {openIndex === index && (
                <p className="mt-2 text-gray-600">{faq.value}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DRProfileShow;

// import React, { useEffect, useState } from 'react';
// import Navbar from './Navbar';
// import DrAppointmentCreation from './DrAppoinmentCreation';
// import { MdOutlineAddLocation } from 'react-icons/md';
// import { FaCommentDots, FaGraduationCap } from 'react-icons/fa6';
// import axios from 'axios';
// import { CiEdit } from "react-icons/ci";
// import { IoMdStopwatch } from "react-icons/io";

// function DRProfileShow() {
//     const [DrProfileData, SetDrProfileData] = useState([]);
//     const [openIndex, setOpenIndex] = useState(null);
//     const [isEditing, setIsEditing] = useState(false);
//     const [aboutText, setAboutText] = useState('');
//     const [editAddress, setAddress] = useState('');
//     const [editLanguage, setEditLanguage] = useState([]);
//     const [EditSpeciality, setEditSpeciality] = useState([]);
//     const [editHospitalName, setEditHospitalName] = useState('');
//     const [editFAQ, setEditFAQ] = useState([]);

//     const toggleFAQ = (index) => {
//         setOpenIndex(openIndex === index ? null : index);
//     };

//     useEffect(() => {
//         FetchDrProfileShow();
//     }, []);

//     const handleEditClick = () => {
//         setIsEditing(!isEditing);
//         if (!isEditing) {
//             const doctor = DrProfileData[0]; // Assuming you're handling a single doctor data
//             setAboutText(doctor?.aboutDoctor || '');
//             const fullAddress = `${doctor?.hospitalName}, ${doctor?.clinic_hospital_address?.permanentAddress || ''}, ${doctor?.clinic_hospital_address?.state || ''}, ${doctor?.clinic_hospital_address?.city || ''}`;
//             setAddress(fullAddress);
//             setEditLanguage(doctor?.language || []);
//             setEditHospitalName(doctor?.hospitalName || '');
//             setEditFAQ(doctor?.specialities[0]?.FAQ || []); // Get FAQ from specialities array
//             setEditSpeciality(doctor?.specialities.map(spec => spec.specialtyName) || []);
//         }
//     };

//     const handleFAQChange = (index, field, value) => {
//         const updatedFAQ = [...editFAQ];
//         updatedFAQ[index][field] = value;
//         setEditFAQ(updatedFAQ);
//     };

//     const handleSave = async () => {
//         const token = localStorage.getItem("token");
//         const id = localStorage.getItem("id");
//         try {
//             await axios.patch("https://api.assetorix.com/ah/api/v1/dc/doctor", {
//                 aboutDoctor: aboutText,
//                 permanentAddress: editAddress,
//                 language: editLanguage,
//                 hospitalName: editHospitalName,
//                 FAQ: editFAQ,
//                 specialitycategoriesData: EditSpeciality // map specialties correctly
//             }, {
//                 headers: {
//                     "authorization": `Bearer ${token}`,
//                     "id": id
//                 }
//             });
//             setIsEditing(false);
//             FetchDrProfileShow();
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     const FetchDrProfileShow = async () => {
//         const token = localStorage.getItem("token");
//         const id = localStorage.getItem("id");
//         try {
//             const result = await axios("https://api.assetorix.com/ah/api/v1/dc/doctor", {
//                 headers: {
//                     "authorization": `Bearer ${token}`,
//                     "id": id
//                 }
//             });
//             SetDrProfileData(result.data.data); // Set fetched data
//         } catch (error) {
//             console.error(error);
//         }
//     };

//     return (
//         <div>
//             <Navbar />
//             <div className='flex justify-center'>
//                 <CiEdit className='text-2xl cursor-pointer' onClick={handleEditClick} />
//                 <span className='cursor-pointer' onClick={handleEditClick}>Edit Your Profile</span>
//             </div>
//             <div className='dr-profile flex sm:flex-row flex-col gap-10 mt-5 p-5 rounded-xl' style={{ justifyContent: "space-between" }}>
//                 <div className='border-2 border-gray-300 rounded-xl p-5 w-[50%]'>
//                     {DrProfileData.map((profile) => (
//                         <div key={profile._id}>
//                             <div className='flex justify-center items-center sm:justify-normal sm:items-start'>
//                                 <img className='size-[180px] rounded-full' src={profile.userData.avatar} alt={profile.userData.name} />
//                             </div>
//                             <p className='font-bold text-3xl p-2'>{profile.userData.name}</p>
//                             <div className='p-2'>
//                                 {isEditing ? (
//                                     <input
//                                         value={EditSpeciality.join(', ')}
//                                         onChange={(e) => setEditSpeciality(e.target.value.split(','))}
//                                         className='w-[250px] border border-gray-300 p-2 rounded'
//                                         placeholder="Enter specialties (comma-separated)"
//                                     />
//                                 ) : (
//                                     <p className='font-semibold'>Specialty: {profile.specialities.map(spec => spec.specialtyName).join(', ')}</p>
//                                 )}
//                                 <p className='font-semibold flex gap-2'><IoMdStopwatch className='mt-[7px]' /> 5+ years experience</p>
//                                 <div className='flex gap-2'>
//                                     <FaGraduationCap className='mt-[5px]' />
//                                     {profile.qualifications.map((qualification, index) => (
//                                         <p key={index} className='font-semibold'>{qualification.degree} ({qualification.fieldOfStudy}) from {qualification.instituteName}</p>
//                                     ))}
//                                 </div>
//                             </div>
//                             <div className="language-list">
//                                 <div className='flex gap-[10px] p-2'>
//                                     <FaCommentDots className='mt-[5px]' />
//                                     {isEditing ? (
//                                         <input
//                                             value={editLanguage.join(', ')}
//                                             onChange={(e) => setEditLanguage(e.target.value.split(','))}
//                                             className='w-[250px] border border-gray-300 p-2 rounded'
//                                             placeholder="Enter languages (comma-separated)"
//                                         />
//                                     ) : (
//                                         <p className='font-semibold'>{profile.language.join(', ')}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className='flex gap-2 p-2'>
//                                 <MdOutlineAddLocation className='mt-[5px]' />
//                                 <div>
//                                     {isEditing ? (
//                                         <>
//                                             <input
//                                                 value={editHospitalName}
//                                                 onChange={(e) => setEditHospitalName(e.target.value)}
//                                                 className='w-[250px] border border-gray-300 p-2 rounded'
//                                             />
//                                             <input
//                                                 value={editAddress}
//                                                 onChange={(e) => setAddress(e.target.value)}
//                                                 className='w-[250px] border border-gray-300 p-2 rounded ml-[10px]'
//                                             />
//                                         </>
//                                     ) : (
//                                         <p>{`${profile.hospitalName}, ${profile.clinic_hospital_address.permanentAddress}, ${profile.clinic_hospital_address.state}, ${profile.clinic_hospital_address.city}`}</p>
//                                     )}
//                                 </div>
//                             </div>
//                             <div className="about-dr mt-5 p-2">
//                                 <p className='font-bold text-3xl'>About Doctor</p>
//                                 {isEditing ? (
//                                     <textarea
//                                         value={aboutText}
//                                         onChange={(e) => setAboutText(e.target.value)}
//                                         className='w-full h-24 border border-gray-300 p-2 rounded'
//                                     />
//                                 ) : (
//                                     <p>{profile.aboutDoctor}</p>
//                                 )}
//                                 <div className='w-full bg-gray-300 h-[2px] mt-5'></div>
//                             </div>
//                             {isEditing && (
//                                 <button onClick={handleSave} style={{ backgroundColor: 'rgb(73, 166, 175)' }} className='mt-2 rounded-xl w-full text-white p-2'>Save</button>
//                             )}
//                             <div className='max-w-5xl mx-auto flex flex-col gap-5 sm:p-0 px-10 mt-10'>
//                                 <p className='font-bold text-2xl'>FAQ’s</p>
//                                 <div className='h-[1px] w-full bg-gray-400'></div>
//                                 <div className='flex flex-col gap-3'>
//                                     {editFAQ.map((faq, index) => (
//                                         <div key={index} style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", padding: "15px" }}>
//                                             <div className='cursor-pointer flex justify-between items-center' onClick={() => toggleFAQ(index)}>
//                                                 {isEditing ? (
//                                                     <input
//                                                         type='text'
//                                                         value={faq.title}
//                                                         onChange={(e) => handleFAQChange(index, 'title', e.target.value)}
//                                                         className='w-full p-2 border border-gray-300 rounded'
//                                                     />
//                                                 ) : (
//                                                     <h2 className='font-bold'>{faq.title}</h2>
//                                                 )}
//                                                 <span>{openIndex === index ? '-' : '+'}</span>
//                                             </div>
//                                             {openIndex === index && (
//                                                 <div className='faq-body'>
//                                                     {isEditing ? (
//                                                         <textarea
//                                                             value={faq.description}
//                                                             onChange={(e) => handleFAQChange(index, 'description', e.target.value)}
//                                                             className='w-full h-24 p-2 border border-gray-300 rounded'
//                                                         />
//                                                     ) : (
//                                                         <p>{faq.description}</p>
//                                                     )}
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//                 <DrAppointmentCreation />
//             </div>
//         </div>
//     );
// }

// export default DRProfileShow;
