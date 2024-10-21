import React from 'react'
import { TbMoodShare } from "react-icons/tb";
import { TbMessage } from "react-icons/tb";
import { FaDigitalOcean } from "react-icons/fa";

const HowItWorks = () => {
    return (
        <div>
            <p className='text-xl sm:text-3xl font-bold text-center text-[#1c8e81]'>How it Works?</p>

            <div className='flex justify-center mt-10 gap-3'>
                <div className='flex'>
                    <div className='flex flex-col'>
                        <TbMoodShare className='text-[50px] text-[gray]' />
                    </div>

                    <div className='h-[2px] w-[300px] bg-[gray] mt-5'></div>
                </div>

                <div className='flex'>
                    <TbMessage className='text-[50px] text-[gray]' />
                    <div className='h-[2px] w-[300px] bg-[gray] mt-5'></div>
                </div>

                <div>
                    <FaDigitalOcean className='text-[50px] text-[gray]' />
                </div>
            </div>


            <div className='flex justify-center mt-5 gap-[100px]'>
                <div className='flex'>
                    <div className='flex flex-col'>
                        <p>Select a speciality or symptom</p>
                    </div>
                </div>

                <div className='flex'>
                    <p className='ml-5'>Audio/ video call with a verified doctor</p>
                </div>

                <div>
                    <p>Get a digital prescription & a free follow-up</p>
                </div>
            </div>
        </div>
    )
}

export default HowItWorks