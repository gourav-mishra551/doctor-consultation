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

            <div className='max-w-[1200px] h-[100vh] justify-between py-32 mx-auto flex flex-wrap animate-fadeIn'>
                
                {/* Left Section: Main Appointment Request Section */}
                <div className='flex flex-col gap-8'>
                    <h1 className='sm:text-4xl text-2xl font-semibold font-serif text-justify'>
                        Start Your Appointment <br /> Request Here
                    </h1>
                    <p className='text-lg font-[400] font-serif'>
                        Follow these simple steps to schedule an appointment with a healthcare professional. Start now and take a step toward better health.
                    </p>
                    <button className='bg-[#1C8E81] text-lg flex gap-4 px-6 py-2 rounded-full text-white font-semibold shadow-md w-fit'>
                        Book Appointment by Call <FiPhoneCall className='text-lg mt-1' />
                    </button>
                </div>

                {/* Right Section: Appointment Options */}
                <div className='flex flex-col border-y-2 h-min border-gray-600 w-[40%]'>
                    {/* Option 1: View All Doctors */}
                    <Link to="/appointments/location">
                        <div className='py-6 hover:cursor-pointer'>
                            <h1 className='text-2xl font-semibold text-[#1C8E81]'>View All Doctors</h1>
                            <p className='text-lg text-gray-400 font-medium my-4 flex justify-between mt-2 gap-5'>
                                Find the right doctor based on your needs. Provide your information and schedule a time that works for you.
                                <SlArrowRight className='text-xl text-[#1C8E81]' />
                            </p>
                        </div>
                    </Link>

                    {/* Option 2: Doctor by Categories */}
                    <div className='border-t-2 py-6 border-gray-600 hover:cursor-pointer'>
                        <h1 className='text-2xl font-semibold text-[#1C8E81]'>Doctor by Categories</h1>
                        <p className='text-lg text-gray-400 font-medium my-4 flex justify-between mt-2 gap-5'>
                            Explore doctors categorized by specialties. Access personalized care by selecting a category that suits your specific needs.
                            <SlArrowRight className='text-xl text-[#1C8E81]' />
                        </p>
                    </div>
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default ConsultwithNewDoctor;
