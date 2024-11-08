import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdStar } from "react-icons/io";
import { FaRegThumbsUp } from "react-icons/fa";
import { FaComment } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FiDollarSign } from "react-icons/fi";
import DrIndividualProfileOverview from "./DrIndividualProfileOverview";
import DrIndividualprofileLocation from "./DrIndividualprofileLocation";
import DrIndividualProfileReviews from "./DrIndividualProfileReviews";
import DrIndividualProfileAvailibility from "./DrIndividualProfileAvailibility";
import axios from "axios";
import { useParams } from "react-router-dom";

const DrIndividualProfile = () => {
  const { id } = useParams();
  const [activeNav, setActiveNav] = useState(1);

  const handleNavClick = (navNumber) => {
    setActiveNav(navNumber);
  };

  const individualDrProfile = async () => {
    const response = await axios.get(``);
  };

  return (
    <div>
      <div
        className="sm:h-[300px] hidden bg-cover opacity-100 bg-no-repeat sm:flex flex-col justify-center items-center"
        style={{
          backgroundImage:
            "url('https://media.istockphoto.com/id/1290139310/vector/vector-of-a-medical-staff-group-of-doctors-and-nurses.jpg?s=2048x2048&w=is&k=20&c=06uJxfLzlX-FuUkB9AOKQA-HIPn6qymhWDAI2RSRzPE=')",
        }}
      >
        <div className="sm:translate-y-[-30px]">
          <p className="font-bold text-white sm:text-3xl opacity-100">
            DOCTORS
          </p>
          <div className="h-[1px] w-[140px] mt-1 bg-white text-center"></div>
          <p className="font-normal text-white text-xl opacity-100">
            lorem ipsum dolor sit
          </p>
        </div>
      </div>

      <div className="sm:max-w-6xl w-full mx-auto mt-10 gap-10">
        {/* <div
          className="dr-profile-section mb-10 w-full sm:h-[270px] h-auto bg-[#f3f3f3] p-10 flex sm:flex-row flex-col justify-between"
          style={{ border: "1px solid red" }}
        >
          <div className="flex sm:gap-5 gap-2">
            <div className="img bg-[#f3f3f3] flex justify-center items-center h-[150px] w-[150px] rounded-full">
              <img
                src="dr-prof-1.webp"
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

          <div className="ratings sm:mt-0 mt-3 sm:mx-0 mx-[50px]">
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
        </div> */}

        <div className="bg-[white] w-full sm:h-[1000px] h-full p-10">
          <ul className="flex sm:flex sm:gap-5 gap-3 justify-center sm:justify-start">
            <li
              className={`cursor-pointer  ${
                activeNav === 1 ? "text-[#1977cc] font-semibold" : ""
              }`}
              onClick={() => handleNavClick(1)}
            >
              Overview
              {/* <div className='bg-[#1977cc] w-[70px] h-[2px] mt-1'></div> */}
            </li>
            <li
              className={`cursor-pointer  ${
                activeNav === 2 ? "text-[#1977cc] font-semibold" : ""
              }`}
              onClick={() => handleNavClick(2)}
            >
              Locations
            </li>
            <li
              className={`cursor-pointer  ${
                activeNav === 3 ? "text-[#1977cc] font-semibold" : ""
              }`}
              onClick={() => handleNavClick(3)}
            >
              Reviews
            </li>
            <li
              className={`cursor-pointer  ${
                activeNav === 4 ? "text-[#1977cc] font-semibold" : ""
              }`}
              onClick={() => handleNavClick(4)}
            >
              Availability
            </li>
          </ul>
          {activeNav === 1 && <DrIndividualProfileOverview />}
          {activeNav === 2 && <DrIndividualprofileLocation />}
          {activeNav === 3 && <DrIndividualProfileReviews />}
          {activeNav === 4 && <DrIndividualProfileAvailibility />}
        </div>
      </div>
    </div>
  );
};

export default DrIndividualProfile;
