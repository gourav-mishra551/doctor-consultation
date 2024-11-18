import React from 'react'
import Navbar from '../../../../Components/Navbar'
import Footer from '../../../../Components/Footer'
import { SlArrowRight } from "react-icons/sl";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from 'react-router-dom';

const OutSideIndia = () => {
  return (
    <div className='bg-[#daf5f3] w-full '>
    {/* <Navbar /> */}

    <div className='max-w-[1200px] min-h-[80vh] flex flex-col lg:flex-row justify-between sm:py-32 py-16 px-6 lg:px-0 mx-auto animate-fadeIn'>
        <div className='flex justify-start flex-col gap-8'>
            <h1 className='sm:text-4xl text-2xl font-semibold font-serif text-justify'>
                Here are some of questions before <br /> going further.
            </h1>
            <p className='text-lg font-[400] font-serif'>Some of few simple steps to get ahead .</p>

            <button className='bg-[#1C8E81] text-lg flex gap-4 px-6 py-2 rounded-full text-white font-semibold shadow-md w-fit'>Book Appointment by call  <FiPhoneCall className='text-lg mt-1 ' /></button>
        </div>
        <div className='flex flex-col border-y-2 h-min border-gray-600 sm:w-[40%] my-10 sm:my-0'>
            <Link to="/categories">
                <div className='py-6 hover:cursor-pointer'>
                    <h1 className='text-2xl font-semibold text-[#1C8E81]'>Online Consultation</h1>
                    <p className='text-lg text-gray-400 font-medium my-4 flex justify-between mt-2 gap-5'>Get consultation at your home with our service.  <SlArrowRight className='text-xl text-[#1C8E81]' /></p>
                </div>
            </Link>

            <Link to="https://ametheushealth.com/international-patient-services">
                <div className=' border-t-2 py-6 border-gray-600 hover:cursor-pointer'>
                    <h1 className='text-2xl font-semibold text-[#1C8E81]'>
                      Offline consultation
                    </h1>
                    <p className='text-lg text-gray-400 font-medium my-4 flex justify-between mt-2 gap-5'> For Offline consultation you need to visit India , we will take care of your all medical tour. <SlArrowRight className='text-2xl text-[#1C8E81]' /></p>
                </div>
            </Link>

        </div>

    </div>
    <Footer />

</div>
  )
}

export default OutSideIndia