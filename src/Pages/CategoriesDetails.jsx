import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import { useLocation, useParams } from 'react-router-dom';
import { FiDollarSign } from 'react-icons/fi';
import { FaComment, FaLocationArrow, FaRegThumbsUp } from 'react-icons/fa';
import { IoMdStar } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import axios from 'axios';
import TopHeader from '../Components/TopHeader';

function CategoriesDetails() {
    const location = useLocation();
    const [showFilter , setShowFilter] = useState(false)
    const { title } = location.state || {}
    const [result, setResult] = useState({})
    const [DoctorsData, setDoctersData] = useState([])
    const { id } = useParams()
    console.log(id);

    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    useEffect(() => {
        FetchCategory()
        FetchDoctersData()
    }, [])
    const FetchCategory = async () => {
        try {
            const res = await axios.get(`https://api.assetorix.com/ah/api/v1/dc/user/category/${id}`)
            setResult(res.data.data);

        } catch (error) {

        }
    }


    const FetchDoctersData = async () => {
        try {
            const res = await axios.get("https://api.assetorix.com/ah/api/v1/dc/user/doctors")
            setDoctersData(res.data.data);
        } catch (error) {

        }
        console.log(DoctorsData);


    }

    return (
        <div className='bg-[#CEDDE4]'>
            <TopHeader />
            <Navbar />

            <div
                className="relative h-[40vh] flex justify-center items-center "
                style={{
                    backgroundImage: `url(${result.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black opacity-60"></div>

                {/* Content with animation */}
                <div className="relative text-center text-white px-4 flex flex-col justify-center items-center animate-slideIn">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 transform transition-transform duration-500 ease-in-out hover:scale-105">
                        Consult {result.specialtyName} Online
                    </h1>
                    <p className="max-w-[500px] text-base sm:text-lg md:text-xl transform transition-transform duration-500 ease-in-out hover:scale-105">
                        {result.sortDescription}
                    </p>
                </div>
            </div>

            <div className='max-w-7xl mx-auto mt-10 flex gap-10 bg-[#CEDDE4] p-5'>

                {/* Filter Section */}
                <div className="hidden md:flex filter-section flex-col gap-3 w-[25%] h-[870px] rounded-xl shadow-md bg-[#fff] p-5 sticky top-0">
                    <p className='font-semibold text-center text-2xl text-[#00768A] '>Doctor Profile</p>
                    <div className='relative'>
                        <input type="text" placeholder='Search...' className="p-2 border border-[#00768A] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-rgb(73,168,173)-500 bg-[#e4eaec] " />
                        <CiSearch className='absolute top-3 right-5 text-xl font-bold' />
                    </div>

                    <div className='mb-2'>
                        <p className='font-semibold '>Date Range</p>
                        <input type="date" className='p-2 border border-[#00768A] bg-[#e4eaec] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-rgb(73,168,173)-500' />
                    </div>
                    <hr />

                    <div className='flex flex-col mb-2'>
                        <p className='font-semibold'>Gender</p>
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-checkbox text-[#00768A] h-4 w-4" name="Gender" />
                            <span className="ml-1 ">Male</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input type="radio" className="form-checkbox text-[#00768A] h-4 w-4" name="Gender" />
                            <span className="ml-1">Female</span>
                        </label>
                    </div>
                    <hr />

                    <div className='mb-2'>
                        <p className='font-semibold'>Price Range</p>
                        <input type="range" />
                    </div>
                    <hr />

                    <div className='flex flex-col'>
                        <p className='font-semibold'>Select Specialist</p>
                        {['Cardiologist', 'Dermatologist', 'Orthopedic Surgeon', 'Gynecologist', 'Neurologist', 'Ophthalmologist', 'Pediatrician', 'Endocrinologist', 'Gastroenterologist', 'Pulmonologist', 'Orthopedic'].map((specialist) => (
                            <label key={specialist} className="inline-flex items-center">
                                <input type="radio" className="form-checkbox text-[#00768A] h-4 w-4" name="Specialist" />
                                <span className="ml-1">{specialist}</span>
                            </label>
                        ))}
                    </div>

                    <div className='text-white flex justify-center items-center'>
                        <button className='h-[40px] w-full bg-[#00768A] rounded-xl'>Search</button>
                    </div>
                </div>

                {/* Filter Button for Small/Medium Screens */}
                <div className='md:hidden flex justify-center'>
                    <button onClick={() => setShowFilter(!showFilter)} className='bg-[#00768A] text-white px-4 py-2 rounded-lg'>
                        Filter Options
                    </button>
                </div>

                {/* Mobile/Tablet Filter Modal */}
                {showFilter && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-5 w-[80%] max-w-[400px] rounded-lg shadow-lg">
                            {/* Close button */}
                            <button onClick={() => setShowFilter(false)} className="absolute top-3 right-3 text-black">X</button>
                            <h2 className="text-2xl font-semibold text-[#00768A] mb-4">Filter</h2>

                            {/* Add the same filter options here as the sidebar */}
                            {/* Rest of the filter form */}
                        </div>
                    </div>
                )}

                {/* Doctor Profile Section */}
                <div className='w-full md:w-[75%] flex flex-col gap-10' >
                    {[1, 2, 3].map((doctor, index) => (
                        <div key={index} className="dr-profile-section w-full bg-[#f3f3f3] p-10 flex flex-col md:flex-row justify-between rounded-lg shadow-md">
                            <div className='flex gap-5'>
                                <div className="img bg-[#f3f3f3] flex justify-center items-center h-[150px] w-[150px] rounded-full">
                                    <img src="/image.png" alt="dr-image" className='h-[130px] w-[130px] rounded-full' />
                                </div>
                                <div className="dr-profilee">
                                    <p className='text-[#00768A] font-bold'>Dr. Aashu M</p>
                                    <p className='text-[#00768A] font-semibold'>Urology</p>
                                    <div className='flex'>
                                        {[...Array(4)].map((_, i) => (
                                            <IoMdStar key={i} className='text-yellow-500 text-2xl' />
                                        ))}
                                    </div>
                                    <p className='text-lg font-semibold text-orange-600'>Experience: 10 years</p>
                                    <p> <span className='text-lg font-semibold'>Specialty:</span> Dermatologist</p>
                                </div>
                            </div>

                            <div className='ratings flex flex-col justify-start items-start gap-4  md:items-start'>
                                <div className="thumbs flex gap-1 justify-center items-center">
                                    <FaRegThumbsUp className='mt-1 text-2xl text-sky-400' />
                                    <p className='ml-2 mt-1'>97%</p>
                                </div>
                                <div className="feedback flex gap-1">
                                    <FaComment className='mt-1 text-2xl text-lime-800' />
                                    <p className='ml-2 mt-1'>4 Feedback</p>
                                </div>
                                <div className='flex gap-1'>
                                    <FaLocationArrow className='mt-1 text-2xl text-cyan-700' />
                                    <p className='ml-2 mt-1'>Location: NY</p>
                                </div>
                                <div className='flex gap-1'>
                                    <FiDollarSign className='mt-1 text-2xl text-green-500' />
                                    <p className='ml-2 mt-1'>$20 (per hour)</p>
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <button className='h-[35px] w-[200px] border-2 rounded-lg  border-[#00768A] hover:bg-[#00768A] hover:text-white transition-all ease-in-out duration-300'>VIEW PROFILE</button>
                                    <button className='h-[35px] w-[200px] text-white rounded-lg bg-[#00768A] border-2 border-[#00768A] hover:scale-105'>BOOK APPOINTMENT</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            <div style={{ marginTop: "30px", height: "auto", backgroundColor: "rgb(249,250,251)", padding: "60px" }}>

                <p style={{ textAlign: "center", width: "80%", alignItems: "center", margin: "auto", justifyContent: "center", textAlign: "justify" }}>{result.longDescription} </p>  </div>
            {/* <Faq /> */}



            {/* FAQ */}

            <div className='max-w-5xl mx-auto flex flex-col gap-5 sm:p-0 px-10 mt-10'>
                <p className='font-bold text-2xl'>FAQ’s</p>
                <div className='h-[1px] w-full bg-gray-400'></div>
                <div className='flex flex-col gap-3'>
                    {result.FAQ && result.FAQ.map((faq, index) => (
                        <div key={index} style={{ boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px", padding: "15px" }}>
                            <div
                                className='cursor-pointer flex justify-between items-center'
                                onClick={() => toggleFAQ(index)}
                            >
                                <p className='text-gray-700 font-semibold text-lg'>{faq.title}</p>
                                <span className='text-gray-500'>{openIndex === index ? '-' : '+'}</span>
                            </div>
                            {openIndex === index && (
                                <p className='font-normal text-gray-500'>{faq.value}</p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default CategoriesDetails
