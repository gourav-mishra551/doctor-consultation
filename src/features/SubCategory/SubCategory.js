import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaUserDoctor } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";
import { BiSolidUserVoice } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";

const SubCategories = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [subCategoryData, setSubCategoryData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchSubCategoryData = async () => {
      try {
        const response = await axios.get(`https://api.assetorix.com/ah/dctr_ctgry`)
        setSubCategoryData(response.data.subCategoryData)
        console.log(response.data)
      }
      catch (err) {
        console.log(err)
      }
      finally {
        setLoading(false)
      }
    }
    fetchSubCategoryData()
  }, [])


  return (
    <div className='max-w-6xl mx-auto flex flex-col gap-10'>

      <div className='h-[1px] max-w-6xl bg-gray-400 mt-10'></div>
      <p className='text-[#2a647a] font-bold text-2xl'>Consult Cardiologists Online - Heart Specialists</p>
      <div className='flex gap-10'>
        <div className='dr-details-card bg-[#eef8fb] w-[33%] p-5 flex flex-col gap-4 shadow-xl cursor-pointer rounded-xl'>
          <div className='flex justify-between'>
            <div className=''>
              <img src="dr-prof-1.webp" alt="dr-image" className='h-[100px] w-[100px] rounded-full' />
            </div>
            <div className="details">
              <p className='font-bold'>Dr Tripti Dev</p>
              <p className='text-[#1b93c1] font-semibold'>Cardiologist</p>
              <p className='text-[#1b93c1] font-bold'>40 years of experience</p>
              <p className='font-semibold text-gray-400'>MBBS, MD, DM, FACC, FESC</p>
            </div>
          </div>
          <div className=''>
            {/* <div>
                            <FaUserDoctor className='text-[30px] mt-2' />
                        </div> */}

            {/* <div className='flex flex-col'>
                            <p className='text-[#789da7] font-semibold'>You Pay ₹ 550</p>
                            <p className='text-[#789da7] font-semibold'></p>
                        </div> */}

            {/* <div className='h-[50px] w-[1px] bg-black'></div> */}


            <div className=''>
              <p className='text-[#789da7] font-semibold text-center'>You Pay ₹ 550</p>

              {/* <div className='flex gap-4'>
                                <p>₹ 30</p>
                                <div className='flex gap-2'>
                                    <MdErrorOutline className='mt-[6px]' />
                                    <p>upgrade</p>
                                </div>
                            </div> */}
            </div>

          </div>

          <div>
            <div className='flex gap-2 justify-center'>
              <BiSolidUserVoice className='text-xl mt-1' />
              <p>English, Hindi, Telugu, Bengali, Urdu</p>
            </div>
            <div className='flex gap-2 justify-center'>
              <IoLocationOutline className='text-xl mt-1' />
              <p>Apollo Hospitals Jubilee Hills, Hyderabad</p>
            </div>
          </div>

          <div className='flex justify-between'>
            <p className='text-[13px] font-semibold text-gray-400'>Available in 6 mins</p>
            <p className='text-[13px] font-semibold text-gray-400'>Available tomorrow at 11:00 AM</p>
          </div>

          <div className=''>
            <button className='flex justify-center items-center w-full h-[45px] bg-[#1b93c1] rounded-xl hover:bg-green-500 transition-all duration-300 delay-150 ease-in-out border hover:border-green-500 font-semibold text-white'>Book Apppointment</button>
          </div>
        </div>

        <div className='dr-details-card bg-[#eef8fb] w-[33%] p-5 flex flex-col gap-4 shadow-xl cursor-pointer rounded-xl'>
          <div className='flex justify-between'>
            <div className=''>
              <img src="dr-prof-1.webp" alt="dr-image" className='h-[100px] w-[100px] rounded-full' />
            </div>
            <div className="details">
              <p className='font-bold'>Dr Tripti Dev</p>
              <p className='text-[#1b93c1] font-semibold'>Cardiologist</p>
              <p className='text-[#1b93c1] font-bold'>40 years of experience</p>
              <p className='font-semibold text-gray-400'>MBBS, MD, DM, FACC, FESC</p>
            </div>
          </div>
          <div className=''>
            {/* <div>
                            <FaUserDoctor className='text-[30px] mt-2' />
                        </div> */}

            {/* <div className='flex flex-col'>
                            <p className='text-[#789da7] font-semibold'>You Pay ₹ 550</p>
                            <p className='text-[#789da7] font-semibold'></p>
                        </div> */}

            {/* <div className='h-[50px] w-[1px] bg-black'></div> */}


            <div className=''>
              <p className='text-[#789da7] font-semibold text-center'>You Pay ₹ 550</p>

              {/* <div className='flex gap-4'>
                                <p>₹ 30</p>
                                <div className='flex gap-2'>
                                    <MdErrorOutline className='mt-[6px]' />
                                    <p>upgrade</p>
                                </div>
                            </div> */}
            </div>

          </div>

          <div>
            <div className='flex gap-2 justify-center'>
              <BiSolidUserVoice className='text-xl mt-1' />
              <p>English, Hindi, Telugu, Bengali, Urdu</p>
            </div>
            <div className='flex gap-2 justify-center'>
              <IoLocationOutline className='text-xl mt-1' />
              <p>Apollo Hospitals Jubilee Hills, Hyderabad</p>
            </div>
          </div>

          <div className='flex justify-between'>
            <p className='text-[13px] font-semibold text-gray-400'>Available in 6 mins</p>
            <p className='text-[13px] font-semibold text-gray-400'>Available tomorrow at 11:00 AM</p>
          </div>

          <div className=''>
            <button className='flex justify-center items-center w-full h-[45px] bg-[#1b93c1] rounded-xl hover:bg-green-500 transition-all duration-300 delay-150 ease-in-out border hover:border-green-500 font-semibold text-white'>Book Apppointment</button>
          </div>
        </div>

        <div className='dr-details-card bg-[#eef8fb] w-[33%] p-5 flex flex-col gap-4 shadow-xl cursor-pointer rounded-xl'>
          <div className='flex justify-between'>
            <div className=''>
              <img src="dr-prof-1.webp" alt="dr-image" className='h-[100px] w-[100px] rounded-full' />
            </div>
            <div className="details">
              <p className='font-bold'>Dr Tripti Dev</p>
              <p className='text-[#1b93c1] font-semibold'>Cardiologist</p>
              <p className='text-[#1b93c1] font-bold'>40 years of experience</p>
              <p className='font-semibold text-gray-400'>MBBS, MD, DM, FACC, FESC</p>
            </div>
          </div>
          <div className=''>
            {/* <div>
                            <FaUserDoctor className='text-[30px] mt-2' />
                        </div> */}

            {/* <div className='flex flex-col'>
                            <p className='text-[#789da7] font-semibold'>You Pay ₹ 550</p>
                            <p className='text-[#789da7] font-semibold'></p>
                        </div> */}

            {/* <div className='h-[50px] w-[1px] bg-black'></div> */}


            <div className=''>
              <p className='text-[#789da7] font-semibold text-center'>You Pay ₹ 550</p>

              {/* <div className='flex gap-4'>
                                <p>₹ 30</p>
                                <div className='flex gap-2'>
                                    <MdErrorOutline className='mt-[6px]' />
                                    <p>upgrade</p>
                                </div>
                            </div> */}
            </div>

          </div>

          <div>
            <div className='flex gap-2 justify-center'>
              <BiSolidUserVoice className='text-xl mt-1' />
              <p>English, Hindi, Telugu, Bengali, Urdu</p>
            </div>
            <div className='flex gap-2 justify-center'>
              <IoLocationOutline className='text-xl mt-1' />
              <p>Apollo Hospitals Jubilee Hills, Hyderabad</p>
            </div>
          </div>

          <div className='flex justify-between'>
            <p className='text-[13px] font-semibold text-gray-400'>Available in 6 mins</p>
            <p className='text-[13px] font-semibold text-gray-400'>Available tomorrow at 11:00 AM</p>
          </div>

          <div className='flex justify-center items-center h-[45px] bg-[#1b93c1] rounded-xl'>
            <button className='flex justify-center items-center w-full h-[45px] bg-[#1b93c1] rounded-xl hover:bg-green-500 transition-all duration-300 delay-150 ease-in-out border hover:border-green-500 font-semibold text-white'>Book Apppointment</button>
          </div>
        </div>
      </div>

      <div className="faqs">
        <p className='text-[#2a647a] font-bold text-2xl mb-3'>Recent FAQ's</p>
        <div className="border border-gray-200 rounded-lg shadow-md">
          <div
            className="flex justify-between items-center px-4 py-3 cursor-pointer"
            onClick={toggleAccordion}
          >
            <h2 className="text-lg font-medium">Who is a cardiologist?</h2>
            <svg
              className={`w-6 h-6 transition-transform transform ${isOpen ? "rotate-180" : ""
                }`}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M13.172 8.828a1 1 0 0 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L10 10.586l2.172-2.172z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          {isOpen && (
            <div className="p-4 border-t border-gray-200">
              <p className="text-gray-700">Cardiologists are trained medical professionals with special training in
                the identification, treatment, and prevention of diseases of the heart and blood vessels, also known as the
                cardiovascular system. They are doctors who specialize in cardiovascular disease and are able to treat
                conditions ranging from severe hypertension to elevated cholesterol to heart rhythm problems. </p>
            </div>
          )}
        </div>
      </div>


    </div>
  )
}

export default SubCategories