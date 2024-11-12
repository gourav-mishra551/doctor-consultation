import React, { useEffect, useState } from 'react';
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
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DrIndividualProfile = () => {
  const [IndiProfile, setIndiProfile] = useState({});
  const { id } = useParams(); // To get doctor ID from URL params
  const [activeNav, setActiveNav] = useState(1);

  const handleNavClick = (navNumber) => {
    setActiveNav(navNumber);
  };

  useEffect(() => {
    DrIndiProfile();
  }, []);

  const DrIndiProfile = async () => {
    try {
      const res = await axios.get(`https://api.assetorix.com/ah/api/v1/dc/user/doctors/${id}`);
      setIndiProfile(res.data.data);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    }
  };

  if (!IndiProfile || Object.keys(IndiProfile).length === 0) {
    // Loading state when data is not fetched yet
    return (
      <div className="loading-state">
        <p>Loading doctor profile...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:h-[300px] hidden bg-cover opacity-100 bg-no-repeat sm:flex flex-col justify-center items-center" style={{ backgroundImage: "url('https://media.istockphoto.com/id/1290139310/vector/vector-of-a-medical-staff-group-of-doctors-and-nurses.jpg?s=2048x2048&w=is&k=20&c=06uJxfLzlX-FuUkB9AOKQA-HIPn6qymhWDAI2RSRzPE=')" }}>
        <div className='sm:translate-y-[-30px]'>
          <p className='font-bold text-white sm:text-3xl opacity-100'>DOCTORS</p>
          <div className='h-[1px] w-[140px] mt-1 bg-white text-center'></div>
          <p className='font-normal text-white text-xl opacity-100'>lorem ipsum dolor sit</p>
        </div>
      </div>

      <div className='sm:max-w-6xl w-full mx-auto mt-10 gap-10'>
        <div className="bg-[white] w-full sm:h-[1000px] h-full p-10">
          <ul className="flex sm:flex sm:gap-5 gap-3 justify-center sm:justify-start">
            <li
              className={`cursor-pointer ${activeNav === 1 ? "text-[#1977cc] font-semibold" : ""}`}
              onClick={() => handleNavClick(1)}
            >
              Overview
            </li>
            <li
              className={`cursor-pointer ${activeNav === 2 ? "text-[#1977cc] font-semibold" : ""}`}
              onClick={() => handleNavClick(2)}
            >
              Locations
            </li>
            <li
              className={`cursor-pointer ${activeNav === 3 ? "text-[#1977cc] font-semibold" : ""}`}
              onClick={() => handleNavClick(3)}
            >
              Reviews
            </li>
            <li
              className={`cursor-pointer ${activeNav === 4 ? "text-[#1977cc] font-semibold" : ""}`}
              onClick={() => handleNavClick(4)}
            >
              Availability
            </li>
          </ul>

          {activeNav === 1 && <DrIndividualProfileOverview IndiProfile={IndiProfile} />}
          {activeNav === 2 && <DrIndividualprofileLocation profile={IndiProfile} />}
          {activeNav === 3 && <DrIndividualProfileReviews profile={IndiProfile} />}
          {activeNav === 4 && <DrIndividualProfileAvailibility profile={IndiProfile} />}
        </div>
      </div>
    </div>
  );
};

export default DrIndividualProfile;
