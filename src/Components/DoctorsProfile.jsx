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

import { Link } from "react-router-dom";
import { use } from "framer-motion/m";
const DoctorsProfile = () => {
  const [DoctorData, setDoctorData] = useState([]);
  const [Price, setPrice] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    FetchDrProfile();
  }, []);
  const FetchDrProfile = async () => {
    try {
      const res = await axios.get(
        "https://api.assetorix.com/ah/api/v1/dc/user/doctors"
      );
      setDoctorData(res.data.data);
      console.log(DoctorData);
    } catch (error) {}
  };

  console.log(DoctorData[0]?.averageRating);
  const CheckLowestPrice = (DoctorData) => {
    if (!DoctorData || DoctorData.length === 0) {
      console.error("DoctorData is empty or invalid.");
      setIsLoading(false);
      return null;
    }

    // Get visiting mode and slots for both offline and online
    const visitingMode = DoctorData[0]?.doctorAvailability?.map(
      (availability) => availability.visitingMode
    );

    // const offlineSlots =DoctorData[0]?.doctorAvailability[0]?.offlineSlots ?? [];
    const offlineSlots = DoctorData[0]?.doctorAvailability?.map((avail) => avail?.offlineSlots).flat() ?? [];
    const onlineSlots = DoctorData[0]?.doctorAvailability?.map((avail) => avail?.onlineSlots).flat() ?? [];
    // const onlineSlots = DoctorData[0]?.doctorAvailability[0]?.onlineSlots ?? [];

   console.log("dfgjfdjb",offlineSlots);
   
    // Extract doctor charges
    const offlineCharge = offlineSlots
      .map((drCharge) => drCharge?.doctorCharge)
      .filter((charge) => charge != null);
    const onlineCharge = onlineSlots
      .map((drCharge) => drCharge?.doctorCharge)
      .filter((charge) => charge != null);

    console.log("onlineCharge", onlineCharge);
    console.log("offlineCharge", offlineCharge);

    // Initialize price variable
    let price = null;

    if (visitingMode && visitingMode.includes("both")) {
      // If visitingMode is "both", compare both offline and online charges
      if (offlineCharge.length > 0 && onlineCharge.length > 0) {
        price = Math.min(Math.min(...offlineCharge), Math.min(...onlineCharge));
      } else if (offlineCharge.length > 0) {
        price = Math.min(...offlineCharge);
      } else if (onlineCharge.length > 0) {
        price = Math.min(...onlineCharge);
      }
    } else if (visitingMode && visitingMode.includes("online")) {
      // If visitingMode is "online", return the minimum of online charges
      if (onlineCharge.length > 0) {
        price = Math.min(...onlineCharge);
      }
    } else if (visitingMode && visitingMode.includes("offline")) {
      // If visitingMode is "offline", return the minimum of offline charges
      if (offlineCharge.length > 0) {
        price = Math.min(...offlineCharge);
      }
    }

    console.log("Lowest price:", price);
    setPrice(price); // Update state with the lowest price
    setIsLoading(false); // Set loading to false when done
    return price;
  };

  // Effect for logging Price updates
  useEffect(() => {
    console.log("Price updated:", Price);
  }, [Price]);

  // Effect to run CheckLowestPrice once DoctorData is available
  useEffect(() => {
    if (DoctorData && DoctorData.length > 0 && isLoading) {
      CheckLowestPrice(DoctorData); // Only call if DoctorData is available and loading
    }
  }, [DoctorData, isLoading]); // Dependency on DoctorData and isLoading

  if (isLoading) {
    return <div>Loading...</div>; // Show loading state if data is still being fetched
  }
 

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
              <span className="ml-1">others</span>
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

          <div></div>

          <div className="w-full md:w-[75%] flex flex-wrap gap-10">
            {DoctorData.map((doctor, index) => (
              <div
                key={index}
                className="dr-profile-section w-full sm:w-[48%] md:w-full bg-white p-8 flex flex-col md:flex-row justify-between rounded-lg shadow-lg"
                style={{ border: "1px solid #e1e1e1" }}
              >
                <div className="flex flex-col sm:flex-row gap-6">
                  {/* Profile Image */}
                  <div className="img bg-[#f3f3f3] flex justify-center items-center h-[160px] w-[160px] sm:h-[160px] sm:w-[160px] rounded-full border-2 border-[#00768A] mx-auto sm:mx-0">
                    <img
                      src={doctor.userData.avatar}
                      alt={doctor.name}
                      className="h-[150px] w-[150px] sm:h-[150px] sm:w-[150px] rounded-full object-cover"
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="dr-profilee text-[#333333] text-center sm:text-left">
                    <p className="text-[#00768A] text-2xl font-bold">
                      {doctor.userData.name}
                    </p>
                    <div className="flex gap-4 flex-wrap mt-2 justify-center sm:justify-start">
                      {doctor.services_offered.map((service, idx) => (
                        <div key={idx} className="bg-[#f0f9f9] p-2 rounded-lg">
                          <p className="text-[#00768A] font-semibold">
                            {service}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Experience */}
                    <p className="text-lg font-semibold text-orange-600 mt-2">
                      Experience: {doctor.totalExperience}+ years
                    </p>

                    {/* Skills */}
                    {doctor?.years_of_experience?.map((experience, index) => (
                      <div
                        className="flex flex-wrap mt-2 justify-center sm:justify-start"
                        key={index}
                      >
                        {experience.skills.map((skill, skillIndex) => (
                          <p
                            key={skillIndex}
                            className="font-bold mr-3 text-sm text-gray-600"
                          >
                            {skill}
                          </p>
                        ))}
                      </div>
                    ))}

                    {/* About Doctor */}
                    <p className="mt-4 text-sm text-gray-600">
                      {doctor.aboutDoctor}
                    </p>
                  </div>
                </div>

                {/* Price and Action Buttons */}
                <div className="ratings flex flex-col sm:justify-start sm:items-start justify-center items-center gap-4 mt-6 md:items-start">
                  {/* Ratings */}
                  <div className="flex items-center justify-center mt-2">
                    {[...Array(4)].map((_, i) => (
                      <IoMdStar key={i} className="text-yellow-500 text-3xl" />
                    ))}
                    <span className="ml-2 text-gray-500">4.0</span>
                  </div>
                  {/* Price */}
                  <div className="flex gap-2 items-center">
                    Price:
                    <p className="ml-2 mt-1 text-lg font-semibold">
                      <span className="text-green-600">{`INR ${Price}`}</span>
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col gap-4 mt-6">
                    <button className="h-[40px] w-[220px] border-2 rounded-lg border-[#00768A] hover:bg-[#00768A] hover:text-white transition-all ease-in-out duration-300">
                      <Link
                        to={`/dr-indi/${doctor._id}`}
                        className="flex justify-center items-center"
                      >
                        VIEW PROFILE
                      </Link>
                    </button>
                    <button className="h-[40px] w-[220px] text-white rounded-lg bg-[#00768A] border-2 border-[#00768A] hover:scale-105">
                      BOOK APPOINTMENT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorsProfile;
