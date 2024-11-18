import React, { useEffect, useState } from 'react';
import DrIndividualProfileOverview from "./DrIndividualProfileOverview";
import DrIndividualprofileLocation from "./DrIndividualprofileLocation";
import DrIndividualProfileReviews from "./DrIndividualProfileReviews";
import DrIndividualProfileAvailibility from "./DrIndividualProfileAvailibility";
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { IoStarHalfOutline } from "react-icons/io5";
import { AiOutlineStar } from "react-icons/ai";
import { AiFillStar } from "react-icons/ai";
import { RiHospitalLine } from "react-icons/ri";

const DrIndividualProfile = () => {
  const [IndiProfile, setIndiProfile] = useState({});
  const { id } = useParams(); // To get doctor ID from URL params
  const [activeNav, setActiveNav] = useState(1);

  const handleNavClick = (navNumber) => {
    setActiveNav(navNumber);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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
      <div className="loading-state text-center text-lg font-semibold text-gray-700">
        <p>Loading doctor profile...</p>
      </div>
    );
  }

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<AiFillStar key={i} className="text-yellow-500" size={30} />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<IoStarHalfOutline key={i} className="text-yellow-500" size={30} />);
      } else {
        stars.push(<AiOutlineStar key={i} className="text-white" size={30} />);
      }
    }
    return stars;
  };

  return (
    <div>
      <div className="relative h-[300px] sm:flex flex-col justify-center items-center bg-gradient-to-r from-gray-400 via-gray-500 to-gray-800 text-white shadow-lg">
        <div className="absolute inset-0 bg-cover bg-center opacity-40 bg-no-repeat" style={{ backgroundImage: "url('https://img.freepik.com/free-photo/male-working-as-paediatrician_23-2151696313.jpg?t=st=1731567133~exp=1731570733~hmac=bc61c135d8a508c9751998fed4eca4733fd4d3a07b8ef00347043b9f04628591&w=826')" }}></div>

        <div className="z-10 text-center sm:text-left">
          <p className="font-bold sm:text-4xl text-3xl mb-2 capitalize text-gray-800">{IndiProfile?.userData.name}</p>
          <div className="h-[3px] w-[140px] bg-[#00768A] mb-2 mx-auto sm:mx-0"></div>

          {/* Star Rating */}
          <div className="flex items-center justify-center sm:justify-start mb-3">
            <p className="text-xl font-semibold text-white mr-2">Ratings :</p>
            <div className={IndiProfile?.averageRating === 0 ? "hidden" :"flex"}>{renderStars(IndiProfile?.averageRating || 0)}</div>
            <div className={IndiProfile?.averageRating === 0 ? "flex font-semibold text-yellow-300" :"hidden"}>No Ratings </div>
          </div>

          {/* Specialties */}
          <p className="text-xl font-semibold text-white mr-2">
            Specialties In :
            <span className="font-medium ml-2">
              {IndiProfile.specialitycategories && IndiProfile.specialitycategories.length > 0 ? (
                IndiProfile.specialitycategories?.map((specialty, index) => (
                  <span key={index} className="inline-block bg-blue-100 text-[#00768A] px-3 py-1 rounded-full mr-2 text-[16px]">
                    {specialty.specialtyName}
                  </span>
                ))
              ) : (
                <span className="text-gray-500">Not available</span>
              )}
            </span>
          </p>

          {/* Hospital Name */}
          <p className="text-xl font-semibold text-white mr-2 flex my-2">
            Doctor at : <RiHospitalLine className='mx-2  text-[#00768A] text-3xl'/> <span className="font-semibold  capitalize text-black">{IndiProfile?.hospitalName || 'Hospital not available'}</span>
          </p>
        </div>
    
      </div>

      <div className='sm:max-w-6xl w-full mx-auto mt-10 p-5'>
        <div className="bg-white rounded-lg shadow-xl transition-shadow hover:shadow-2xl p-8">
          <ul className="flex justify-center gap-6 text-gray-600 font-medium text-lg border-b-2 pb-3">
            {['Overview', 'Locations', 'Reviews', 'Availability'].map((tab, index) => (
              <li
                key={index}
                className={`cursor-pointer pb-2 border-b-2 ${activeNav === index + 1 ? "text-[#00768A] hover:text-emerald-700 font-semibold" : "border-transparent"} transition duration-300 text-[#00768A] `}
                onClick={() => handleNavClick(index + 1)}
              >
                {tab}
              </li>
            ))}
          </ul>

          <div className="transition-all duration-300 mt-6 w-full">
            {activeNav === 1 && <DrIndividualProfileOverview IndiProfile={IndiProfile} />}
            {activeNav === 2 && <DrIndividualprofileLocation profile={IndiProfile} />}
            {activeNav === 3 && <DrIndividualProfileReviews profile={IndiProfile} />}
            {activeNav === 4 && <DrIndividualProfileAvailibility profile={IndiProfile} />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrIndividualProfile;
