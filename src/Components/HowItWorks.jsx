import React from 'react';
import { TbMoodShare } from "react-icons/tb";
import { TbMessage } from "react-icons/tb";
import { FaDigitalOcean } from "react-icons/fa";

const HowItWorks = () => {
    return (
        <div className='px-4 py-10'>
            {/* Heading */}
            <p className='text-2xl sm:text-3xl font-bold text-center text-[#1c8e81] mb-10'>
                How it Works?
            </p>

            {/* Icons and Horizontal Line */}
            <div className='flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-3'>
                {/* Step 1 */}
                <div className='flex items-center'>
                    <TbMoodShare 
                        className='text-[50px] text-gray-400 transform hover:scale-110 transition duration-500 ease-in-out' 
                    />
                    <div className='hidden sm:block h-[2px] w-[150px] bg-gray-400 mx-3'></div>
                </div>

                {/* Step 2 */}
                <div className='flex items-center'>
                    <TbMessage 
                        className='text-[50px] text-gray-400 transform hover:scale-110 transition duration-500 ease-in-out' 
                    />
                    <div className='hidden sm:block h-[2px] w-[150px] bg-gray-400 mx-3'></div>
                </div>

                {/* Step 3 */}
                <div>
                    <FaDigitalOcean 
                        className='text-[50px] text-gray-400 transform hover:scale-110 transition duration-500 ease-in-out' 
                    />
                </div>
            </div>

            {/* Step Descriptions */}
            <div className='flex flex-col sm:flex-row justify-center items-center gap-10 sm:gap-16 mt-6'>
                <div className='text-center sm:text-left'>
                    <p className='text-gray-700 font-semibold'>Select a speciality or symptom</p>
                </div>

                <div className='text-center sm:text-left'>
                    <p className='text-gray-700 font-semibold'>Audio/video call with a verified doctor</p>
                </div>

                <div className='text-center sm:text-left'>
                    <p className='text-gray-700 font-semibold'>Get a digital prescription & a free follow-up</p>
                </div>
            </div>
        </div>
    );
}

export default HowItWorks;
