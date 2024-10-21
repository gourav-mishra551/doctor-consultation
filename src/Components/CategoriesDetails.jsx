import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useLocation, useParams } from 'react-router-dom';
import { FiDollarSign } from 'react-icons/fi';
import { FaComment, FaLocationArrow, FaRegThumbsUp } from 'react-icons/fa';
import { IoMdStar } from 'react-icons/io';
import { CiSearch } from 'react-icons/ci';
import Faq from './Faq';
import axios from 'axios';

function CategoriesDetails() {
    const location = useLocation();
    const { title } = location.state || {}
   const [result,setResult]=useState({})
   const [DoctorsData,setDoctersData]=useState([])
    const {id}=useParams()
    console.log(id);

    const [openIndex, setOpenIndex] = useState(null);
     
    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    useEffect(()=>{
    FetchCategory()
    FetchDoctersData()
    },[])
    const FetchCategory =async()=>{
      try {
        const res=await axios.get(`https://api.assetorix.com/ah/api/v1/dc/user/getSingleCategory/${id}`)
        setResult(res.data.checkCategory);
        
      } catch (error) {
        
      }
    }


    const FetchDoctersData=async()=>{
        try {
            const res=await axios.get("https://api.assetorix.com/ah/api/v1/dc/user/getdoctor")
            setDoctersData(res.data.data);
        } catch (error) {
            
        }
        console.log(DoctorsData);
        
        
    }
    
    return (
        <div>
            <Navbar />
                         <div style={{display:"flex",justifyContent:"center",gap:"25px",marginTop:"30px"}}>
                         <div className="img   w-[130px] rounded-full" style={{border:"1px solid black"}}>
                                <img src={result.image} alt="dr-image" className='h-[130px] w-[130px] rounded-full' />
                            </div>

                            <div>
                         <h1 style={{ fontSize: "25px", fontWeight: "bolder", textAlign: "center" }}>Consult {result.specialtyName} Online </h1>
                         <p style={{ textAlign: "center", marginTop: "25px" }}>{result.sortDescription}</p>
                         </div>
                         </div>
           

            <div className='max-w-7xl mx-auto mt-10 flex gap-10'>

                <div className="filter-section flex flex-col gap-3 w-[25%] h-[870px] bg-[#f3f3f3] p-5">
                    <p className='font-bold text-center text-xl'>Doctor profile</p>
                    <div className='relative'>
                        <input type="text" placeholder='Search...' className="p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-rgb(73,168,173)-500" />
                        <CiSearch className='absolute top-3 left-[240px] text-xl font-bold' />
                    </div>

                    <div>
                        <p className='font-semibold'>Date Range</p>
                        <input type="date" placeholder='Select Date' className='p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-rgb(73,168,173)-500' />
                    </div>

                    <div className='flex flex-col'>
                        <p className='font-semibold'>Gender</p>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Gender"
                            />
                            <span className="ml-1">Male</span>
                        </label>

                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Gender"
                            />
                            <span className="ml-1">Female</span>
                        </label>

                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Gender"
                            />
                            <span className="ml-1">Shemale</span>
                        </label>
                    </div>

                    <div>
                        <p className='font-semibold'>Price Range</p>
                        <input type="range" />
                    </div>

                    <div className='flex flex-col'>
                        <p className='font-semibold'>Select Specialist</p>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Cardiologist</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Dermatologist</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Orthopedic Surgeon</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Gynecologist</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Gynecologist</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Neurologist</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Ophthalmologist</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Pediatrician</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Endocrinologist</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Gastroenterologist</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Pulmonologist</span>
                        </label>
                        <label className="inline-flex items-center">
                            <input
                                type="radio"
                                className="form-checkbox text-indigo-600 h-4 w-4"
                                name="Specialist"
                            />
                            <span className="ml-1">Orthopedic</span>
                        </label>
                    </div>

                    <div className='text-white flex justify-center items-center'>
                        <button className='h-[40px] w-full bg-blue-700 rounded-xl'>Search</button>
                    </div>

                </div>


                <div className='w-[75%] flex flex-col gap-10'  >
                    <div className="dr-profile-section w-[750px]  h-[280px] bg-[#f3f3f3] p-10 flex justify-between">
                        <div className='flex gap-5'>
                            <div className="img bg-[#f3f3f3] flex justify-center items-center h-[150px] w-[150px] rounded-full">
                                <img src="/image.png" alt="dr-image" className='h-[130px] w-[130px] rounded-full' />
                            </div>
                            <div className="dr-profilee">
                                <p className='text-blue-800 font-bold'>Dr Aashu m</p>
                                <p className='text-blue-800 font-semibold'>hgt</p>
                                <p>Urology</p>
                                <div className='flex'>
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                </div>

                                <p>hft,htd</p>
                                <p>Dermatologist</p>
                            </div>
                        </div>

                        <div className='ratings'>
                            <div className="thumbs flex gap-1">
                                <FaRegThumbsUp className='mt-1' />
                                <p>97%</p>
                            </div>

                            <div className="feedback flex gap-1">
                                <FaComment className='mt-1' />
                                <p>4 Feedback</p>
                            </div>

                            <div className='flex gap-1'>
                                <FaLocationArrow className='mt-1' />
                                <p>ht</p>
                            </div>

                            <div className='flex gap-1'>
                                <FiDollarSign className='mt-1' />
                                <p>20 (per hour)</p>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <button className='h-[35px] w-[200px] border-2 border-blue-700 hover:bg-[#1977cc] hover:text-white transition-all ease-in-out duration-300 delay-150'>VIEW PROFILE</button>
                                <button className='h-[35px] w-[200px] text-white bg-[#1977cc] border-2 border-blue-700'>BOOK APPOINTMENT</button>
                            </div>
                        </div>
                    </div>

                    <div className="dr-profile-section w-[750px] h-[280px] bg-[#f3f3f3] p-10 flex justify-between">
                        <div className='flex gap-5'>
                            <div className="img bg-[#f3f3f3] flex justify-center items-center h-[150px] w-[150px] rounded-full">
                                <img src="/image.png" alt="dr-image" className='h-[130px] w-[130px] rounded-full' />

                            </div>
                            <div className="dr-profilee">
                                <p className='text-blue-800 font-bold'>Dr Aashu m</p>
                                <p className='text-blue-800 font-semibold'>hgt</p>
                                <p>Urology</p>
                                <div className='flex'>
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                </div>

                                <p>hft,htd</p>
                                <p>Dermatologist</p>
                            </div>
                        </div>

                        <div className='ratings'>
                            <div className="thumbs flex gap-1">
                                <FaRegThumbsUp className='mt-1' />
                                <p>97%</p>
                            </div>

                            <div className="feedback flex gap-1">
                                <FaComment className='mt-1' />
                                <p>4 Feedback</p>
                            </div>

                            <div className='flex gap-1'>
                                <FaLocationArrow className='mt-1' />
                                <p>ht</p>
                            </div>

                            <div className='flex gap-1'>
                                <FiDollarSign className='mt-1' />
                                <p>20 (per hour)</p>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <button className='h-[35px] w-[200px] border-2 border-blue-700 hover:bg-[#1977cc] hover:text-white transition-all ease-in-out duration-300 delay-150'>VIEW PROFILE</button>
                                <button className='h-[35px] w-[200px] text-white bg-[#1977cc] border-2 border-blue-700'>BOOK APPOINTMENT</button>
                            </div>
                        </div>
                    </div>

                    <div className="dr-profile-section w-[750px] h-[280px] bg-[#f3f3f3] p-10 flex justify-between">
                        <div className='flex gap-5'>
                            <div className="img bg-[#f3f3f3] flex justify-center items-center h-[150px] w-[150px] rounded-full">
                                <img src="/image.png" alt="dr-image" className='h-[130px] w-[130px] rounded-full' />
                            </div>
                            <div className="dr-profilee">
                                <p className='text-blue-800 font-bold'>Dr Aashu m</p>
                                <p className='text-blue-800 font-semibold'>hgt</p>
                                <p>Urology</p>
                                <div className='flex'>
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                </div>

                                <p>hft,htd</p>
                                <p>Dermatologist</p>
                            </div>
                        </div>

                        <div className='ratings'>
                            <div className="thumbs flex gap-1">
                                <FaRegThumbsUp className='mt-1' />
                                <p>97%</p>
                            </div>

                            <div className="feedback flex gap-1">
                                <FaComment className='mt-1' />
                                <p>4 Feedback</p>
                            </div>

                            <div className='flex gap-1'>
                                <FaLocationArrow className='mt-1' />
                                <p>ht</p>
                            </div>

                            <div className='flex gap-1'>
                                <FiDollarSign className='mt-1' />
                                <p>20 (per hour)</p>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <button className='h-[35px] w-[200px] border-2 border-blue-700 hover:bg-[#1977cc] hover:text-white transition-all ease-in-out duration-300 delay-150'>VIEW PROFILE</button>
                                <button className='h-[35px] w-[200px] text-white bg-[#1977cc] border-2 border-blue-700'>BOOK APPOINTMENT</button>
                            </div>
                        </div>
                    </div>

                    <div className="dr-profile-section w-[750px] h-[280px] bg-[#f3f3f3] p-10 flex justify-between">
                        <div className='flex gap-5'>
                            <div className="img bg-[#f3f3f3] flex justify-center items-center h-[150px] w-[150px] rounded-full">
                                <img src="/image.png" alt="dr-image" className='h-[130px] w-[130px] rounded-full' />
                            </div>
                            <div className="dr-profilee">
                                <p className='text-blue-800 font-bold'>Dr Aashu m</p>
                                <p className='text-blue-800 font-semibold'>hgt</p>
                                <p>Urology</p>
                                <div className='flex'>
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                    <IoMdStar className='text-yellow-500' />
                                </div>

                                <p>hft,htd</p>
                                <p>Dermatologist</p>
                            </div>
                        </div>

                        <div className='ratings'>
                            <div className="thumbs flex gap-1">
                                <FaRegThumbsUp className='mt-1' />
                                <p>97%</p>
                            </div>

                            <div className="feedback flex gap-1">
                                <FaComment className='mt-1' />
                                <p>4 Feedback</p>
                            </div>

                            <div className='flex gap-1'>
                                <FaLocationArrow className='mt-1' />
                                <p>ht</p>
                            </div>

                            <div className='flex gap-1'>
                                <FiDollarSign className='mt-1' />
                                <p>20 (per hour)</p>
                            </div>

                            <div className='flex flex-col gap-3'>
                                <button className='h-[35px] w-[200px] border-2 border-blue-700 hover:bg-[#1977cc] hover:text-white transition-all ease-in-out duration-300 delay-150'>VIEW PROFILE</button>
                                <button className='h-[35px] w-[200px] text-white bg-[#1977cc] border-2 border-blue-700'>BOOK APPOINTMENT</button>
                            </div>
                        </div>
                    </div>
                </div>




            </div>
            <div style={{ marginTop: "30px", height: "auto", backgroundColor: "rgb(249,250,251)", padding: "60px" }}>

                <p  style={{ textAlign: "center", width: "80%", alignItems: "center",margin:"auto",justifyContent:"center" ,textAlign:"justify"}}>{result.longDescription} </p>  </div>
            {/* <Faq /> */}



            {/* FAQ */}

            <div className='max-w-5xl mx-auto flex flex-col gap-5 sm:p-0 px-10 mt-10'>
            <p className='font-bold text-2xl'>FAQ’s</p>
            <div className='h-[1px] w-full bg-gray-400'></div>
            <div className='flex flex-col gap-3'>
                {result.FAQ && result.FAQ.map((faq, index) => (
                    <div key={index} style={{boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",padding:"15px" }}>
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
