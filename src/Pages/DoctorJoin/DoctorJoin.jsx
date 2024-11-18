import React from 'react';
import Navbar from '../../Components/Navbar';
import Footer from '../../Components/Footer';
import { SlArrowRight } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from 'react-router-dom';

const DoctorJoin = () => {   n 
  return (
    <div className='bg-[#daf5f3] w-full'>
      {/* <Navbar /> */}
      
      <div className='max-w-[1200px] h-[100vh] justify-between py-32 mx-auto flex flex-wrap animate-fadeIn'>
        <div className='flex justify-start flex-col gap-8 w-full sm:w-[50%]'>
          <h1 className='sm:text-4xl text-2xl font-semibold font-serif text-justify'>
            Join us as a doctor and book appointments.  Get connected with patients in your area.  Book appointments by calling us at <a href="tel:1234567890" className='text-[#1C8E81]'>123-456-7890</a> or by filling out the form below.  We'll do our best to connect you with a patient.  We're here to help!
          </h1>
          <p className='text-lg font-[400] font-serif'>
            Follow a few simple steps to get connected with us.
          </p>

          <button className='bg-[#1C8E81] text-lg flex gap-4 px-6 py-2 rounded-full text-white font-semibold shadow-md w-fit'>
            Book Appointment by Call <FiPhoneCall className='text-lg mt-1' />
          </button>
        </div>
        
        <div className='flex flex-col border-y-2 border-gray-600 w-full sm:w-[40%] mt-10 sm:mt-0'>
          <Link to="/appointments/location">
            <div className='py-6 hover:cursor-pointer'>
              <h1 className='text-2xl font-semibold text-[#1C8E81]'>Out of India</h1>
              <p className='text-lg text-gray-400 font-medium my-4 flex justify-between mt-2'>
                Provide your info and set a follow-up time.  
                <SlArrowRight className='text-xl text-[#1C8E81]' />
              </p>
            </div>
          </Link>

          <Link to="/appointments/india">
            <div className='border-t-2 py-6 border-gray-600 hover:cursor-pointer'>
              <h1 className='text-2xl font-semibold text-[#1C8E81]'>
                From India
              </h1>
              <p className='text-lg text-gray-400 font-medium my-4 flex justify-between mt-2'>
                Request an appointment using your patient account.
                <SlArrowRight className='text-xl text-[#1C8E81]' />
              </p>
            </div>
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default DoctorJoin;
