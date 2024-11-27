import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { FaUserDoctor } from "react-icons/fa6";
import { MdErrorOutline } from "react-icons/md";
import { BiSolidUserVoice } from "react-icons/bi";
import { IoLocationOutline } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { getDrDataById } from '../Redux/Action';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import parse from 'html-react-parser';

const SubCategories = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [subCategoryData, setSubCategoryData] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [drSubData, setDrSubData] = useState([])
    const [activeIndex, setActiveIndex] = useState(null);

    const { id } = useParams()

    const toggleAccordion = () => {
        setIsOpen(!isOpen);
    };

    const toggleAccordions = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

  

    const dispatch = useDispatch()

    const SubCategoriesData = useSelector((prev) => prev.reducer.doctorsData)

  

    useEffect(() => {
        dispatch(getDrDataById(id))
    }, [id])

    useEffect(() => {
        setSubCategoryData(SubCategoriesData)
    }, [SubCategoriesData])

    return (
        <div className='max-w-6xl mx-auto flex flex-col gap-10'>

            <div className='h-[1px] max-w-6xl bg-gray-400 mt-10'></div>
            <p className='text-[#2a647a] font-bold sm:text-2xl text-xl sm:text-left text-center'>Consult Cardiologists Online - Heart Specialists</p>
            <div className='flex gap-10 sm:p-0 p-5'>
                {
                    SubCategoriesData?.doctors?.map(drData => (
                        <div className='dr-details-card bg-[#eef8fb] sm:w-[33%] w-full p-5 flex flex-col gap-4 shadow-xl cursor-pointer rounded-xl'>
                            <div className='flex justify-between'>
                                <div className=''>
                                    <img src="dr-prof-1.webp" alt="dr-image" className='h-[100px] w-[100px] rounded-full' />
                                </div>
                                <div className="details">
                                    <p className='font-bold'>Dr Tripti Dev</p>
                                    <p className='text-[#1b93c1] font-semibold'>{drData?.specialization
                                    }</p>
                                    <p className='text-[#1b93c1] font-bold'>40 years of experience</p>
                                    <p className='font-bold text-gray-700'>{drData?.qualification_degree}</p>
                                </div>
                            </div>
                            <div className=''>

                                <div className=''>
                                    <p className='text-[#789da7] font-semibold text-center'>You Pay ₹ 550</p>
                                </div>

                            </div>

                            <div>
                                <div className='flex gap-2 justify-center'>
                                    <BiSolidUserVoice className='text-xl mt-1' />
                                    <p>{drData?.language[0]}, {drData?.language[1]}, {drData?.language[2]}</p>
                                </div>
                                <div className='flex gap-2 justify-center'>
                                    <IoLocationOutline className='text-xl mt-1' />
                                    <p>{drData?.experience_in_places}, {drData?.city}</p>
                                </div>
                            </div>

                            <div className='flex justify-between'>
                                <p className='text-[13px] font-semibold text-gray-400'>Available in 6 mins</p>
                                <p className='text-[13px] font-semibold text-gray-400'>Available tomorrow at 11:00 AM</p>
                            </div>

                            <div className=''>
                                <button
                                    className='flex justify-center items-center w-full h-[45px] bg-[#1b93c1] rounded-xl hover:bg-green-500 transition-all duration-300 delay-150 ease-in-out border hover:border-green-500 font-semibold text-white'>
                                    <NavLink
                                        className='hover:text-white'
                                        to='/dr-indi'>Book Apppointment</NavLink>
                                </button>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className='flex flex-col gap-3 px-5'>
                {
                    parse(`<p>${SubCategoriesData?.category?.longDescription}</p>`)
                }
            </div>

            <div className="faqs sm:p-0 px-5">
                <p className='text-[#2a647a] font-bold text-2xl mb-3'>Recent FAQ's</p>
                {
                    SubCategoriesData?.category?.faq?.map((faqitem, index) => (
                        <>
                            <div key={index} className="accordion-item">
                                <div
                                    className="flex justify-between items-center px-4 py-3 cursor-pointer"
                                    onClick={() => toggleAccordions(index)}
                                >
                                    <h2 className="text-[15px] font-bold text-[#266172]">{faqitem.title}</h2>
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
                                {activeIndex === index && (
                                    <div className="accordion-content py-2 px-4 bg-gray-50 text-[15px] font-semibold text-[#266172]">
                                        {faqitem.value}
                                    </div>
                                )}
                            </div>
                            <div className='h-[1px] w-full bg-gray-300'></div>
                        </>
                    ))}
            </div>
        </div>
    )
}

export default SubCategories