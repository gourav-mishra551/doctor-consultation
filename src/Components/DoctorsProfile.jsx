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

import { Link, useParams } from "react-router-dom";
import { use } from "framer-motion/m";
import DoctorCard from "./DoctorCard/DoctorCard";
const DoctorsProfile = () => {
  const [DoctorData, setDoctorData] = useState([]);
  const [Price, setPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    rating: "",
    visitingMode: "",
    specialtyName: "",
  });
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
    const offlineSlots =
      DoctorData[0]?.doctorAvailability
        ?.map((avail) => avail?.offlineSlots)
        .flat() ?? [];
    const onlineSlots =
      DoctorData[0]?.doctorAvailability
        ?.map((avail) => avail?.onlineSlots)
        .flat() ?? [];
    // const onlineSlots = DoctorData[0]?.doctorAvailability[0]?.onlineSlots ?? [];

    console.log("dfgjfdjb", offlineSlots);

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

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  const applyFilters = async () => {
    try {
      const query = Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors?categoryID=${id}&${query}`
      );
      setDoctorData(res.data.data);
    } catch (error) {
      console.error("Error fetching filtered data", error);
    }
  };

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


      <div className="bg-[#CEDDE4]">
      <div className="max-w-[1200px] justify-between mx-auto mt-10 flex flex-col-reverse md:flex-row gap-10 bg-[#CEDDE4] p-5">
        {/* filter section */}
        <div className="hidden md:flex flex-col gap-5 w-[25%] h-max rounded-xl shadow-md bg-white py-6 px-6 sticky top-0">
          <p className="font-semibold text-center text-2xl text-[#00768A]">
            Doctor Profile
          </p>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctor..."
              className="p-3 border border-[#00768A] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00768A] bg-[#f5f7fa]"
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
            <CiSearch className="absolute top-4 right-4 text-xl font-bold text-[#00768A]" />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3">
            {/* Rating */}
            <div>
              <p className="font-semibold">Rating</p>
              <select
                className="p-2 border border-[#00768A] rounded-lg w-full bg-[#f5f7fa] focus:outline-none"
                onChange={(e) => handleFilterChange("rating", e.target.value)}
              >
                <option value="">All</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Visiting Mode */}
            <div>
              <p className="font-semibold">Visiting Mode</p>
              <select
                className="p-2 border border-[#00768A] rounded-lg w-full bg-[#f5f7fa] focus:outline-none"
                onChange={(e) =>
                  handleFilterChange("visitingMode", e.target.value)
                }
              >
                <option value="">All</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <p className="font-semibold">Gender</p>
              <div className="flex gap-3">
                {["Male", "Female"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender.toLowerCase()}
                      onChange={(e) =>
                        handleFilterChange("gender", e.target.value)
                      }
                      className="form-radio h-4 w-4 text-[#00768A]"
                    />
                    <span className="ml-2">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Specialist */}
            <div>
              <p className="font-semibold">Specialist</p>
              <select
                className="p-2 border border-[#00768A] rounded-lg w-full bg-[#f5f7fa] focus:outline-none"
                onChange={(e) =>
                  handleFilterChange("specialtyName", e.target.value)
                }
              >
                <option value="">All</option>
                {[
                  "Cardiologist",
                  "Dermatologist",
                  "Orthopedic Surgeon",
                  "Gynecologist",
                  "Neurologist",
                  "Ophthalmologist",
                  "Pediatrician",
                  "Endocrinologist",
                  "Gastroenterologist",
                  "Pulmonologist",
                  "Orthopedic",
                ].map((specialist) => (
                  <option key={specialist} value={specialist}>
                    {specialist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-4">
            <button
              onClick={applyFilters}
              className="h-[40px] w-full bg-[#00768A] text-white rounded-lg font-semibold hover:bg-[#005d71]"
            >
              Apply Filters
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

          

           <div className="flex w-[100%] flex-wrap gap-8 md:gap-10">
           <DoctorCard doctorData={DoctorData} />
           </div>
          
          
        </div>
      </div>
      </div>
    </div>
  );
};

export default DoctorsProfile;
