import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdStar } from "react-icons/io";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import { LiaSortAmountDownAltSolid } from "react-icons/lia";
import { PiArrowsDownUpFill } from "react-icons/pi";
import { TbChartCandle } from "react-icons/tb";
import axios from "axios";
const DoctorsProfile = () => {
  // const [my, setMy] = useState([])

  // const data = () => {
  //     try {
  //         const respisnse = axios.get(`https://api.assetorix.com/ah/api/v1/dc/user/doctors/6715f4be7029bc9e2be686b0`),
  //             setMy(respisnse.data)
  //     }
  //     catch (error) {
  //         console.log(error)
  //     }
  // }

  // useEffect(() => {
  //     data()
  // }, [])

  return (
    <div>
      <div
        className="h-[300px] bg-cover opacity-100 bg-no-repeat flex flex-col justify-center items-center"
        style={{
          backgroundImage: "url('https://wallpapercave.com/wp/wp2968489.jpg')",
          backgroundSize: "cover", // or 'contain'
          backgroundPosition: "center", // Centers the image
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="translate-y-[-30px]">
          <p className="font-bold text-white text-3xl opacity-100">DOCTORS</p>
          <div className="h-[1px] w-[140px] mt-1 bg-white text-center"></div>
          <p className="font-normal text-white text-xl opacity-100">
            lorem ipsum dolor sit
          </p>
        </div>
      </div>
      {/* <div style={{border:"1px solid grey",width:"20%",justifyContent:"end",display:"flex",gap:"8px",marginLeft:"20px",marginTop:"10px",borderRadius:"5px",paddingRight:"8px"}}>
                  <PiArrowsDownUpFill className='text-9xl' style={{marginTop:"7px"}} /> <button className='border:none focus:outline-none' style={{fontSize:"25px"}}>Sort</button> 
                </div> */}
      <div className="sm:hidden  flex gap-4">
        <div className="flex justify-center items-center border border-black w-[100px] px-2 py-1 rounded-md gap-2 mt-[10px]">
          <PiArrowsDownUpFill className="text-3xl" />{" "}
          <button
            className="border:none focus:outline-none"
            style={{ fontSize: "20px" }}
          >
            Sort
          </button>
        </div>
        <div className="flex justify-center items-center border border-black w-[100px] px-2 py-1 rounded-md gap-2 mt-[10px]">
          <TbChartCandle className="text-3xl" />{" "}
          <button
            className="border:none focus:outline-none"
            style={{ fontSize: "20px" }}
          >
            Filter
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 flex gap-10">
        <div className="filter-section flex-col gap-3 w-[25%] h-[870px] bg-[#f3f3f3] p-5 mt-10  sm:flex  hidden">
          <p className="font-bold text-center text-xl">Doctor profile</p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-rgb(73,168,173)-500"
            />
            <CiSearch className="absolute top-3 left-[240px] text-xl font-bold" />
          </div>

          <div>
            <p className="font-semibold">Date Range</p>
            <input
              type="date"
              placeholder="Select Date"
              className="p-2 rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-rgb(73,168,173)-500"
            />
          </div>

          <div className="flex flex-col">
            <p className="font-semibold">Gender</p>
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
            <p className="font-semibold">Price Range</p>
            <input type="range" />
          </div>

          <div className="flex flex-col">
            <p className="font-semibold">Select Specialist</p>
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

          <div className="text-white flex justify-center items-center">
            <button className="h-[40px] w-full bg-blue-700 rounded-xl">
              Search
            </button>
          </div>
        </div>

        <div className="w-[auto] sm:w-[85%] flex flex-col gap-10">
          <div
            className="dr-profile-section hidden  h-[280px] bg-[#f3f3f3] p-10  justify-between"
            style={{ border: "1px solid red" }}
          >
            <div className="flex gap-5">
              <div className="img bg-[#f3f3f3] flex justify-center items-center h-[150px] w-[150px] rounded-full">
                <img
                  src="image.png"
                  alt="dr-image"
                  className="h-[130px] w-[130px] rounded-full"
                />
              </div>
              <div className="dr-profilee">
                <p className="text-blue-800 font-bold">Dr Aashu m</p>
                <p className="text-blue-800 font-semibold">hgt</p>
                <p>Urology</p>
                <div className="flex">
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                </div>

                <p>hft,htd</p>
                <p>Dermatologist</p>
              </div>
            </div>

            <div className="ratings ml-[50px] sm:ml-[0px] h-[150px] sm:h-[auto]">
              <div className="thumbs flex gap-1">
                <FaRegThumbsUp className="mt-1" />
                <p>97%</p>
              </div>

              <div className="feedback flex gap-1">
                <FaComment className="mt-1" />
                <p>4 Feedback</p>
              </div>

              <div className="flex gap-1">
                <FaLocationArrow className="mt-1" />
                <p>ht</p>
              </div>

              <div className="flex gap-1">
                <FiDollarSign className="mt-1" />
                <p>20 (per hour)</p>
              </div>

              <div className="flex  gap-3 sm:mt-[15px] sm:mr-[200px] sm:flex sm:flex-col sm:ml-[0px] sm:w-[250px] mt-[55px]  w-[250px] center ml-[0px] justify-between">
                <button className="h-[35px]   w-[100px] text-sm/[17px] sm:w-[200px] border-2 border-blue-700 hover:bg-[#1977cc] hover:text-white transition-all ease-in-out duration-300 delay-150 ">
                  VIEW PROFILE
                </button>
                <button className="h-[35px] w-[100px] text-sm/[17px] sm:w-[200px] text-white bg-[#1977cc] border-2 border-blue-700">
                  BOOK APPOINTMENT
                </button>
              </div>
            </div>
          </div>

          <div>
            <div className="sm:hidden block">
              <div className="flex justify-center items-center p-2 space-x-10">
                <div className="img bg-[#f3f3f3] flex justify-center items-center h-[150px] w-[150px] rounded-full">
                  <img
                    src="image.png"
                    alt="dr-image"
                    className="h-[130px] w-[130px] rounded-full"
                  />
                </div>
                <div className="dr-profilee">
                  <p className="text-blue-800 font-bold text-[27px]">
                    Dr Tripti Deb
                  </p>
                  <p
                    className="text-blue-800 font-semibold text-[21px]"
                    style={{ fontWeight: "bolder" }}
                  >
                    Cardiologist
                  </p>
                  <p
                    style={{ fontWeight: "bold" }}
                    className="text-[21px] text-gray-500"
                  >
                    Urology
                  </p>
                  <p
                    style={{ fontWeight: "bold" }}
                    className="text-[21px] text-gray-500"
                  >
                    40 Years MBBS,MD,DM,FACC
                  </p>
                  <p style={{ fontWeight: "bold" }} className="text-[21px]">
                    Dermatologist
                  </p>
                </div>
              </div>

              <div
                className="mb-3"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "30px",
                  gap: "60px",
                }}
              >
                <button
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    fontWeight: "bolder",
                    borderRadius: "10px",
                    height: "70px",
                    width: "200px",
                    fontSize: "23px",
                  }}
                >
                  Digital Consult
                </button>
                <button
                  className="bg-[#1977CC] hover:bg-[#2c91e9] transition-all duration-300 ease-in-out"
                  style={{
                    border: "1px solid black",
                    padding: "10px",
                    fontWeight: "bolder",
                    borderRadius: "10px",
                    color: "white",
                    height: "70px",
                    width: "200px",
                    fontSize: "23px",
                  }}
                >
                  Hospital Visit
                </button>
              </div>
            </div>
          </div>

          <div className="dr-profile-section  h-[280px] bg-[#f3f3f3] p-10 flex justify-between">
            <div className="flex gap-5">
              <div className="img bg-[#f3f3f3] flex justify-center items-center h-[150px] w-[150px] rounded-full">
                <img
                  src="image.png"
                  alt="dr-image"
                  className="h-[130px] w-[130px] rounded-full"
                />
              </div>
              <div className="dr-profilee">
                <p className="text-blue-800 font-bold">Dr Aashu m</p>
                <p className="text-blue-800 font-semibold">hgt</p>
                <p>Urology</p>
                <div className="flex">
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                </div>

                <p>hft,htd</p>
                <p>Dermatologist</p>
              </div>
            </div>

            <div className="ratings">
              <div className="thumbs flex gap-1">
                <FaRegThumbsUp className="mt-1" />
                <p>97%</p>
              </div>

              <div className="feedback flex gap-1">
                <FaComment className="mt-1" />
                <p>4 Feedback</p>
              </div>

              <div className="flex gap-1">
                <FaLocationArrow className="mt-1" />
                <p>ht</p>
              </div>

              <div className="flex gap-1">
                <FiDollarSign className="mt-1" />
                <p>20 (per hour)</p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="h-[35px] w-[200px] border-2 border-blue-700 hover:bg-[#1977cc] hover:text-white transition-all ease-in-out duration-300 delay-150">
                  VIEW PROFILE
                </button>
                <button className="h-[35px] w-[200px] text-white bg-[#1977cc] border-2 border-blue-700">
                  BOOK APPOINTMENT
                </button>
              </div>
            </div>
          </div>

          <div className="dr-profile-section  h-[280px] bg-[#f3f3f3] p-10 flex justify-between">
            <div className="flex gap-5">
              <div className="img bg-[#f3f3f3] flex justify-center items-center h-[150px] w-[150px] rounded-full">
                <img
                  src="image.png"
                  alt="dr-image"
                  className="h-[130px] w-[130px] rounded-full"
                />
              </div>
              <div className="dr-profilee">
                <p className="text-blue-800 font-bold">Dr Aashu m</p>
                <p className="text-blue-800 font-semibold">hgt</p>
                <p>Urology</p>
                <div className="flex">
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                </div>

                <p>hft,htd</p>
                <p>Dermatologist</p>
              </div>
            </div>

            <div className="ratings">
              <div className="thumbs flex gap-1">
                <FaRegThumbsUp className="mt-1" />
                <p>97%</p>
              </div>

              <div className="feedback flex gap-1">
                <FaComment className="mt-1" />
                <p>4 Feedback</p>
              </div>

              <div className="flex gap-1">
                <FaLocationArrow className="mt-1" />
                <p>ht</p>
              </div>

              <div className="flex gap-1">
                <FiDollarSign className="mt-1" />
                <p>20 (per hour)</p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="h-[35px] w-[200px] border-2 border-blue-700 hover:bg-[#1977cc] hover:text-white transition-all ease-in-out duration-300 delay-150">
                  VIEW PROFILE
                </button>
                <button className="h-[35px] w-[200px] text-white bg-[#1977cc] border-2 border-blue-700">
                  BOOK APPOINTMENT
                </button>
              </div>
            </div>
          </div>

          <div className="dr-profile-section  h-[280px] bg-[#f3f3f3] p-10 flex justify-between">
            <div className="flex gap-5">
              <div className="img bg-[#f3f3f3] flex justify-center items-center h-[150px] w-[150px] rounded-full">
                <img
                  src="image.png"
                  alt="dr-image"
                  className="h-[130px] w-[130px] rounded-full"
                />
              </div>
              <div className="dr-profilee">
                <p className="text-blue-800 font-bold">Dr Aashu m</p>
                <p className="text-blue-800 font-semibold">hgt</p>
                <p>Urology</p>
                <div className="flex">
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                  <IoMdStar className="text-yellow-500" />
                </div>

                <p>hft,htd</p>
                <p>Dermatologist</p>
              </div>
            </div>

            <div className="ratings">
              <div className="thumbs flex gap-1">
                <FaRegThumbsUp className="mt-1" />
                <p>97%</p>
              </div>

              <div className="feedback flex gap-1">
                <FaComment className="mt-1" />
                <p>4 Feedback</p>
              </div>

              <div className="flex gap-1">
                <FaLocationArrow className="mt-1" />
                <p>ht</p>
              </div>

              <div className="flex gap-1">
                <FiDollarSign className="mt-1" />
                <p>20 (per hour)</p>
              </div>

              <div className="flex flex-col gap-3">
                <button className="h-[35px] w-[200px] border-2 border-blue-700 hover:bg-[#1977cc] hover:text-white transition-all ease-in-out duration-300 delay-150">
                  VIEW PROFILE
                </button>
                <button className="h-[35px] w-[200px] text-white bg-[#1977cc] border-2 border-blue-700">
                  BOOK APPOINTMENT
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsProfile;
