import React, { useEffect, useState } from 'react';
import DrAppointmentCreation from './DrAppoinmentCreation';
import { MdOutlineAddLocation } from 'react-icons/md';
import { FaCommentDots, FaGraduationCap } from 'react-icons/fa6';
import axios from 'axios';
import { CiEdit } from "react-icons/ci";
import { IoMdStopwatch } from "react-icons/io";

function DRProfileShow() {
    const [DrProfileData, SetDrProfileData] = useState([]);
    const [openIndex, setOpenIndex] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [aboutText, setAboutText] = useState('');
    const [editAddress, setAddress] = useState('');
    const [editLanguage, setEditLanguage] = useState([]);
    const [EditSpeciality,setEditSpeciality]=useState([])
    const [editHospitalName, setEditHospitalName] = useState('');
    const [editFAQ, setEditFAQ] = useState([]);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    useEffect(() => {
        FetchDrProfileShow();
    }, []);

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        if (!isEditing) {
            const doctor = DrProfileData[0];
            setAboutText(doctor?.aboutDoctor || '');
            const fullAddress = `${doctor?.hospitalName}, ${doctor?.clinic_hospital_address?.permanentAddress || ''}, ${doctor?.clinic_hospital_address?.state || ''}, ${doctor?.clinic_hospital_address?.city || ''}`;
            setAddress(fullAddress);
            setEditLanguage(doctor?.language || []);
            setEditHospitalName(doctor?.hospitalName || '');
            setEditFAQ(doctor?.FAQ || []);
            setEditSpeciality(doctor?.specialitycategoriesData || [])
        }
    };

    const handleFAQChange = (index, field, value) => {
        const updatedFAQ = [...editFAQ];
        updatedFAQ[index][field] = value;
        setEditFAQ(updatedFAQ);
    };

    const handleSave = async () => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const userId = DrProfileData[0]?.userData[0]?._id;
        try {
            await axios.patch("https://api.assetorix.com/ah/api/v1/dc/doctor/update", {
                aboutDoctor: aboutText,
                permanentAddress: editAddress,
                language: editLanguage,
                hospitalName: editHospitalName,
                FAQ: editFAQ,
                specialitycategoriesData:EditSpeciality
            }, {
                headers: {
                    "authorization": `Bearer ${token}`,
                    "id": id
                }
            });
            setIsEditing(false);
            FetchDrProfileShow();
        } catch (error) {
            console.error(error);
        }
    };

    const FetchDrProfileShow = async () => {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        try {
            const result = await axios("https://api.assetorix.com/ah/api/v1/dc/doctor", {
                headers: {
                    "authorization": `Bearer ${token}`,
                    "id": id
                }
            });
          
            SetDrProfileData(result.data.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <div className='flex justify-center'>
                <CiEdit className='text-2xl cursor-pointer' onClick={handleEditClick} />
                <span className='cursor-pointer' onClick={handleEditClick}>Edit Your Profile</span>
            </div>
            <div className='dr-profile flex sm:flex-row flex-col gap-10 mt-5 p-5 rounded-xl' style={{ justifyContent: "space-between" }}>
                <div className='border-2 border-gray-300 rounded-xl p-5 w-[50%]'>
                    {DrProfileData.map((profile) => (
                        <div key={profile._id}>
                            {profile.userData.map((user) => (
                                <div>
                                <div key={user._id} className='flex justify-center items-center sm:justify-normal sm:items-start'>
                                    <img className='size-[180px] rounded-full' src={user.avatar} alt={user.name} />
                                </div>
                                <div>
                                 <p className='font-bold text-3xl p-2'>{user.name}</p>
                                 </div>
                                 </div>
                            ))}
                            <div className='p-2'>
                                 
                                    {
                                        isEditing ?(
                                            <input
                                            value={EditSpeciality}
                                            onChange={(e) => setEditSpeciality(e.target.value.split(','))}
                                            className='w-[250px] border border-gray-300 p-2 rounded'
                                            placeholder="Enter languages (comma-separated)"
                                        />
                                        ):(
                                            <p className='font-semibold'>Specialty: {profile.specialitycategoriesData.join(', ')}</p>
                                        )
                                    }
                                     
                                <p className='font-semibold flex gap-2'><IoMdStopwatch className='mt-[7px]' /> 5+ years experience</p>
                                <div className='flex gap-2'>
                                    <FaGraduationCap className='mt-[5px]' />
                                    {profile.qualifications.map((qualification, index) => (
                                        <p key={index} className='font-semibold'>{qualification.degree} ({qualification.fieldOfStudy}) from {qualification.instituteName}</p>
                                    ))}
                                </div>
                            </div>
                            <div className="language-list">
                                <div className='flex gap-[10px] p-2'>
                                    <FaCommentDots className='mt-[5px]' />
                                    {isEditing ? (
                                        <input
                                            value={editLanguage}
                                            onChange={(e) => setEditLanguage(e.target.value.split(','))}
                                            className='w-[250px] border border-gray-300 p-2 rounded'
                                            placeholder="Enter languages (comma-separated)"
                                        />
                                    ) : (
                                        <p className='font-semibold'>{profile.language.join(', ')}</p>
                                    )}
                                </div>
                            </div>
                            <div className='flex gap-2 p-2'>
                                <MdOutlineAddLocation className='mt-[5px]' />
                                <div>
                                    {isEditing ? (
                                        <>
                                            <input
                                                value={editHospitalName}
                                                onChange={(e) => setEditHospitalName(e.target.value)}
                                                className='w-[250px] border border-gray-300 p-2 rounded'
                                            />
                                            <input
                                                value={editAddress}
                                                onChange={(e) => setAddress(e.target.value)}
                                                className='w-[250px] border border-gray-300 p-2 rounded ml-[10px]'
                                            />
                                        </>
                                    ) : (
                                        <p>{`${profile.hospitalName}, ${profile.clinic_hospital_address.permanentAddress}, ${profile.clinic_hospital_address.state}, ${profile.clinic_hospital_address.city}`}</p>
                                    )}
                                </div>
                            </div>
                            <div className="about-dr mt-5 p-2">
                                <p className='font-bold text-3xl'>About Doctor</p>
                                {isEditing ? (
                                    <textarea
                                        value={aboutText}
                                        onChange={(e) => setAboutText(e.target.value)}
                                        className='w-full h-24 border border-gray-300 p-2 rounded'
                                    />
                                ) : (
                                    <p>{profile.aboutDoctor}</p>
                                )}
                                <div className='w-full bg-gray-300 h-[2px] mt-5'></div>
                            </div>
                            {isEditing && (
                                    <button onClick={handleSave} style={{ backgroundColor: 'rgb(73, 166, 175)' }} className='mt-2 rounded-xl w-full text-white p-2'>Save</button>
                                )}
                            <div className='max-w-5xl mx-auto flex flex-col gap-5 sm:p-0 px-10 mt-10'>
                                <p className='font-bold text-2xl'>FAQ’s</p>
                                <div className='h-[1px] w-full bg-gray-400'></div>
                                <div className='flex flex-col gap-3'>
                                    {profile.FAQ?.map((faq, index) => (
                                        <div key={index} style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", padding: "15px" }}>
                                            <div className='cursor-pointer flex justify-between items-center' onClick={() => toggleFAQ(index)}>
                                                {isEditing ? (
                                                    <input
                                                        type='text'
                                                        value={faq.title}
                                                        onChange={(e) => handleFAQChange(index, 'title', e.target.value)}
                                                        className='w-full border border-gray-300 p-2 rounded'
                                                    />
                                                ) : (
                                                    <p className='text-gray-700 font-semibold text-lg'>{faq.title}</p>
                                                )}
                                                <span className='text-gray-500'>{openIndex === index ? '-' : '+'}</span>
                                            </div>
                                            {openIndex === index && (
                                                <div>
                                                    {isEditing ? (
                                                        <textarea
                                                            value={faq.value}
                                                            onChange={(e) => handleFAQChange(index, 'value', e.target.value)}
                                                            className='w-full border border-gray-300 p-2 rounded mt-2'
                                                        />
                                                    ) : (
                                                        <p className='font-normal text-gray-500'>{faq.value}</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <DrAppointmentCreation />
                </div>
            </div>
        </div>
    );
}

export default DRProfileShow;
