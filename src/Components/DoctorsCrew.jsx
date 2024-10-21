import React from 'react'
import { TbActivityHeartbeat } from "react-icons/tb";
import { FaPhone } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { FaPlus } from "react-icons/fa";

const DoctorsCrew = () => {
    return (
        <div className=''>
            <div className='bg-[#1c8e81] h-[200px] w-[100%] opacity-100 flex flex-col justify-center items-center'>
                <div className='flex gap-2'>
                    <TbActivityHeartbeat className='mt-1 text-2xl text-white' />
                    <p className='text-xl text-white'>Medical Team</p>
                    <TbActivityHeartbeat className='mt-1 text-2xl text-white' />
                </div>
                <p className='mt-1 text-[35px] font-bold text-white'>The Doctorate Crew</p>
            </div>

            <div className='sm:max-w-6xl w-full sm:flex sm:flex-row  flex-col grid-col:3 justify-evenly mx-auto sm:mt-10'>
                <div className="dr-cards sm:w-[30%] w-full p-5">
                    <div className="dr-img rounded-xl">
                        <img src="dr-1.jpg" alt="doctor" className='rounded-xl' />
                    </div>

                    <div className='flex gap-5 justify-center -translate-y-6'>
                        <div className="phone flex justify-center items-center h-[50px] w-[50px] rounded-xl bg-[#1c8e81] cursor-pointer hover:bg-green-600 transition-all ease-in-out duration-300 delay-150">
                            <FaPhone className='text-white text-xl' />
                        </div>

                        <div className="email flex justify-center items-center h-[50px] w-[50px] rounded-xl bg-[#1c8e81] cursor-pointer hover:bg-green-600 transition-all ease-in-out duration-300 delay-150">
                            <HiOutlineMail className='text-white text-2xl font-extrabold' />
                        </div>
                    </div>

                    <div className="texts text-center p-4">
                        <p className='font-bold text-xl'>Dr. Anthony Wills</p>
                        <p className='font-semibold text-[#1c8e81]'>Dermatologist, DCRT (UK)</p>
                        <p className='text-gray-500'>Efficiently my cardiant market-driven innovation via open-source client-centric imperatives. </p>
                    </div>

                    <div className="view-profile flex flex-col justify-center items-center">
                        <div className='flex gap-2 hover:text-[#1c8e81] cursor-pointer'>
                            <FaPlus className='mt-1' />
                            <p>VIEW PROFILE</p>
                        </div>
                        <div className='h-[2px] w-[150px] bg-[#1c8e81]'></div>
                    </div>
                </div>

                <div className="dr-cards sm:w-[30%] w-full p-5">
                    <div className="dr-img rounded-xl">
                        <img src="dr-2.jpg" alt="doctor" className='rounded-xl' />
                    </div>

                    <div className='flex gap-5 justify-center -translate-y-6'>
                        <div className="phone flex justify-center items-center h-[50px] w-[50px] rounded-xl bg-[#1c8e81] cursor-pointer hover:bg-green-600 transition-all ease-in-out duration-300 delay-150">
                            <FaPhone className='text-white text-xl' />
                        </div>

                        <div className="email flex justify-center items-center h-[50px] w-[50px] rounded-xl bg-[#1c8e81] cursor-pointer hover:bg-green-600 transition-all ease-in-out duration-300 delay-150">
                            <HiOutlineMail className='text-white text-2xl font-extrabold' />
                        </div>
                    </div>

                    <div className="texts text-center p-4">
                        <p className='font-bold text-xl'>Dr. Anthony Wills</p>
                        <p className='font-semibold text-[#1c8e81]'>Dermatologist, DCRT (UK)</p>
                        <p className='text-gray-500'>Efficiently my cardiant market-driven innovation via open-source client-centric imperatives. </p>
                    </div>

                    <div className="view-profile flex flex-col justify-center items-center">
                        <div className='flex gap-2 hover:text-[#1c8e81] cursor-pointer'>
                            <FaPlus className='mt-1' />
                            <p>VIEW PROFILE</p>
                        </div>
                        <div className='h-[2px] w-[150px] bg-[#1c8e81]'></div>
                    </div>
                </div>

                <div className="dr-cards sm:w-[30%] w-full p-5">
                    <div className="dr-img rounded-xl">
                        <img src="dr-3.jpg" alt="doctor" className='rounded-xl' />
                    </div>

                    <div className='flex gap-5 justify-center -translate-y-6'>
                        <div className="phone flex justify-center items-center h-[50px] w-[50px] rounded-xl bg-[#1c8e81] cursor-pointer hover:bg-green-600 transition-all ease-in-out duration-300 delay-150">
                            <FaPhone className='text-white text-xl' />
                        </div>

                        <div className="email flex justify-center items-center h-[50px] w-[50px] rounded-xl bg-[#1c8e81] cursor-pointer hover:bg-green-600 transition-all ease-in-out duration-300 delay-150">
                            <HiOutlineMail className='text-white text-2xl font-extrabold' />
                        </div>
                    </div>

                    <div className="texts text-center p-4">
                        <p className='font-bold text-xl'>Dr. Anthony Wills</p>
                        <p className='font-semibold text-[#1c8e81]'>Dermatologist, DCRT (UK)</p>
                        <p className='text-gray-500'>Efficiently my cardiant market-driven innovation via open-source client-centric imperatives. </p>
                    </div>
                    <div className="view-profile flex flex-col justify-center items-center">
                    <div className='flex gap-2 hover:text-[#1c8e81] cursor-pointer'>
                        <FaPlus className='mt-1' />
                        <p>VIEW PROFILE</p>
                    </div>
                    <div className='h-[2px] w-[150px] bg-[#1c8e81]'></div>
                </div>
                </div>
                
            </div>


        </div>
    )
}

export default DoctorsCrew