import React, { useState } from 'react'
import { FaGraduationCap } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { MdOutlineAddLocation } from "react-icons/md";
import Calendar from './Calender';
import DrAppointmentBooking from './DrApointmentBooking';

const DrIndividualProfileOverview = () => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleDescription = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            <div className='bg-[white] w-full h-auto' >

                <div className='dr-profile flex sm:flex-row flex-col gap-10 mt-5  p-5 rounded-xl'>
                    <div  className='border-2 border-gray-300 rounded-xl p-5'>
                    <div className='flex justify-center items-center sm:justify-normal sm:items-start'>
                        <img src="dr-prof-1.webp" alt="dr-img" />
                    </div>

                    <div>
                        <p className='font-bold text-3xl'>Dr. Ritika Bhatt</p>
                        <p className='font-semibold'>ENT</p>
                        <p className='font-semibold'>5+ years experience</p>
                        <div className='flex gap-2'>
                            <FaGraduationCap className='mt-[5px]' />
                            <p className='font-semibold'>MBBS, MS(ENT)</p>
                        </div>

                        <div className='flex gap-2'>
                            <FaCommentDots className='mt-[5px]' />
                            <p className='font-semibold'>English, Hindi</p>
                        </div>

                        <div className='flex gap-2'>
                            <MdOutlineAddLocation className='mt-[5px]' />
                            <div>
                                <p className='font-semibold'>Apollo Clinic, Sarjapur Road</p>
                                <p>GYR CHAMBER, Sarjapur Main Road Bengaluru Urban Kaikondrahalli, Bengaluru Karnataka</p>
                            </div>

                        </div>
                    </div>
                    </div>

                    <div className='bg-white rounded-xl'>
                     {/* <Calendar style={{ height: '10%' }} /> */}
                     <DrAppointmentBooking/>
                    </div>




                </div>

                <div className="about-dr mt-5">
                    <p className='font-bold text-3xl'>About Doctor</p>
                    <p>Dr Ritika Bhatt is an experienced ENT/Otorhinolaryngologist in Bangalore with over 5 years of expertise in diagnosing and treating a wide range of ear, nose and throat disorders. Dr Bhatt is considered one of the best ENT specialists in Bangalore and has gained a reputation for her compassionate care and successful treatment outcomes.

                        As an ENT specialist, Dr Ritika provides care for both common and complex conditions affecting the ears, nose, throat, head, and neck. She diagnoses and treats various conditions like tonsillitis, nasal polyps, ear infections, hearing loss, sinusitis, snoring problems and more. Dr Bhatt's services extend to advanced treatments such as Tonsillectomy, Tympanoplasty (eardrum repair), Nasal Septum Surgery and Ear Reconstruction surgeries. Her expertise in treating congenital ear problems is highly sought after by parents seeking specialised treatment for their children.

                    </p>

                    <div className='w-full bg-gray-300 h-[2px] mt-5'></div>

                </div>

            </div>
        </div>
    )
}

export default DrIndividualProfileOverview