import React from 'react';
import { PiCheckLight } from "react-icons/pi";

const DownloadApp = () => {
    return (
        <div className='flex flex-col md:flex-row justify-center items-center md:gap-[50px] bg-[#f0f0f5] px-5 py-10'>
            {/* Left Section */}
            <div className='left w-[250px] md:w-[300px]'>
                <img src="am-mobile.png" alt="Ametheus Health App" className='w-full' />
            </div>

            {/* Right Section */}
            <div className="right mt-10 md:mt-[70px] md:w-[500px]">
                {/* App Heading */}
                <div className='flex flex-col gap-2 text-center md:text-left'>
                    <p className='text-[#2d2d32] text-2xl md:text-3xl font-semibold'>Download the Ametheus Health app</p>
                    <p className='text-[#2d2d32] font-semibold'>Get ₹200 HealthCash</p>
                </div>

                {/* Features List */}
                <div className='flex flex-col gap-3 mt-8'>
                    {[
                        "Video consult with Doctors",
                        "Live medicine order tracking",
                        "Exclusive healthcare packages",
                        "Ask free questions"
                    ].map((text, index) => (
                        <div key={index} className='flex gap-2'>
                            <PiCheckLight className='mt-1 text-[#1ea1d9]' />
                            <p className='text-[#2d2d32] font-normal'>{text}</p>
                        </div>
                    ))}
                </div>

                {/* Phone Input for App Link */}
                <div className='mt-10'>
                    <p className='text-[#4e4e53] font-semibold text-lg text-center md:text-left'>Get the link to download the app</p>
                    <div className='mt-3 flex flex-col sm:flex-row justify-center md:justify-start items-center gap-3'>
                        <div className='bg-white p-3 flex items-center gap-3 w-[300px] md:w-[350px] rounded-lg shadow-md'>
                            <p className='text-[#4e4e53] font-semibold text-lg'>+91</p>
                            <div className='h-[20px] w-[1px] bg-gray-400'></div>
                            <input 
                                type="text" 
                                className='flex-grow outline-none text-gray-600' 
                                placeholder='Enter Phone number' 
                            />
                        </div>
                        <div className='bg-[#199fd9] p-3 w-[160px] text-white font-bold rounded-lg shadow-md hover:bg-[#138ebf] transition duration-300'>
                            <button>Send App Link</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DownloadApp;
