import React from 'react'
import Navbar from '../../../Components/Navbar'
import { FiPhoneCall } from 'react-icons/fi'
import { SlArrowRight } from 'react-icons/sl'
import { Link } from 'react-router-dom'
import Footer from '../../../Components/Footer'

function ReturningPatient() {
  return (
    <div className='bg-[#daf5f3] w-full '>
    <Navbar />

    <div className='max-w-[1200px] min-h-[80vh] flex flex-col lg:flex-row justify-between sm:py-32 py-16 px-6 lg:px-0 mx-auto animate-fadeIn'>
        <div className='flex justify-start flex-col gap-8'>
            <h1 className='sm:text-4xl text-2xl font-semibold font-serif text-justify'>
                Start your appointment <br /> request here.
            </h1>
            <p className='text-lg font-[400] font-serif'>Here are some of few simple steps to get ahead .</p>

            <button className='bg-[#1C8E81] text-lg flex gap-4 px-6 py-2 rounded-full text-white font-semibold shadow-md w-fit'>Book Appointment by call  <FiPhoneCall className='text-lg mt-1 ' /></button>
        </div>
        <div className='flex flex-col border-y-2 h-min border-gray-600 sm:w-[40%] my-10 sm:my-0'>
            <Link to = "/ConsultWithLastDoctor">
                <div className='py-6 hover:cursor-pointer'>
                    <h1 className='text-2xl font-semibold text-[#1C8E81]'>Consulting with last Doctor</h1>
                    <p className='text-lg text-gray-400 font-medium my-4 flex justify-between mt-2 gap-5'>Provide your info and set a follow-up time.  <SlArrowRight className='text-xl text-[#1C8E81]' /> </p>
                </div>
            </Link>
            
            <Link to="/ConsultwithNewDoctor">
            <div className=' border-t-2 py-6 border-gray-600 hover:cursor-pointer'>
                <h1 className='text-2xl font-semibold text-[#1C8E81]'>
                    Consult with new Doctor
                </h1>
                <p className='text-lg text-gray-400 font-medium my-4 flex justify-between mt-2 gap-5'> Request using your patient account. <SlArrowRight className='text-xl text-[#1C8E81]' /></p>
            </div>
            </Link>
        </div>

    </div>
    <Footer />

</div>
  )
}

export default ReturningPatient
