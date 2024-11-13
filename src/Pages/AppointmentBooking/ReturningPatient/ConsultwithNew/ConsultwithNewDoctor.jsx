import React from 'react';
import Navbar from '../../../../Components/Navbar';
import Footer from '../../../../Components/Footer';
import { SlArrowRight } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from 'react-router-dom';

const ConsultwithNewDoctor = () => {
    return (
        <div className='bg-[#daf5f3] w-full'>
            <Navbar />

            <div className='max-w-[1200px] min-h-[80vh] flex flex-col lg:flex-row justify-between sm:py-32 py-16 px-6 lg:px-0 mx-auto animate-fadeIn'>

                {/* Left Section: Main Appointment Request Section */}
                <div className='flex flex-col gap-6 w-full lg:w-[40%] mb-12 lg:mb-0'>
                    <h1 className='text-3xl sm:text-4xl font-bold font-serif text-gray-800'>
                        Start Your Appointment <br /> Request Here
                    </h1>
                    <p className='text-base sm:text-lg font-medium text-gray-700'>
                        Follow these simple steps to schedule an appointment with a healthcare professional.
                        Take the first step toward a healthier life today by connecting with trusted doctors and specialists.
                    </p>
                    <button className='bg-[#1C8E81] text-base sm:text-lg flex items-center gap-3 px-4 py-3 rounded-full text-white font-semibold shadow-md w-max hover:bg-[#176d68] transition duration-200'>
                        <span>Book Appointment by Call</span>
                        <FiPhoneCall className='text-lg' />
                    </button>
                </div>

                {/* Right Section: Appointment Options */}
                <div className='flex flex-col border-y lg:border-0  border-gray-600 w-full lg:w-[50%] lg:pl-8'>

                    {/* Option 1: View All Doctors */}
                    <Link to="/drs-profile" className='group'>
                        <div className='py-4 lg:py-6 hover:cursor-pointer transition duration-200 border-t border-black'>
                            <h1 className='text-2xl font-semibold text-[#1C8E81] group-hover:text-[#176d68]'>
                                View All Doctors
                            </h1>
                            <p className='text-lg sm:text-base text-gray-600 font-medium mt-3 flex justify-between items-center'>
                                Discover a wide range of healthcare professionals available to address your specific needs and preferences.
                                <SlArrowRight className='text-lg text-[#1C8E81] group-hover:text-[#176d68]' />
                            </p>
                        </div>
                    </Link>

                    {/* Option 2: Doctor by Categories */}
                    <Link to="/categories" className='group'>
                        <div className='border-y py-4 lg:py-6 border-gray-600 hover:cursor-pointer transition duration-200'>
                            <h1 className='text-2xl font-semibold text-[#1C8E81] group-hover:text-[#176d68]'>
                                Doctor by Categories
                            </h1>
                            <p className='text-lg sm:text-base text-gray-600 font-medium mt-3 flex justify-between items-center'>
                                Browse specialists by category to receive personalized care for your health journey.
                                <SlArrowRight className='text-lg text-[#1C8E81] group-hover:text-[#176d68]' />
                            </p>
                        </div>
                    </Link>
                </div>

            </div>
            
            <Footer />
        </div>
    );
};

export default ConsultwithNewDoctor;
