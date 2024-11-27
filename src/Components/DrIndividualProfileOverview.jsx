import React, { useState } from "react";
import { FaGraduationCap, FaCommentDots } from "react-icons/fa";
import { MdOutlineAddLocation } from "react-icons/md";
import ExperienceCard from "./DrExperience/ExperienceCard";
import Education from "./Education/Education";

const DrIndividualProfileOverview = ({ IndiProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div className=" bg-gray-100 md:py-10 md:px-5">
      <div className=" md:p-6 rounded-xl shadow-lg transition-transform transform md:hover:scale-105">
        {/* Profile Section */}
        <div className=" flex sm:flex-row justify-center items-center  flex-col md:gap-10 mt-5 md:p-6 md:w-auto  mx-auto rounded-xl shadow-lg bg-[#e1f0f3]">
          {/* Left Section: Doctor Profile */}
          <div className="border-2 border-gray-300 rounded-xl md:p-6 p-2 flex-1 h-auto">
            <div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-wrap md:flex-row-reverse justify-between"
            >
              <div className="md:w-[60%]">
                {/* Doctor's Name */}
                <p className="font-bold text-3xl text-[#00768A] mb-3 capitalize md:text-start sm:text-center">
                  {IndiProfile?.userData?.name}
                </p>

                {/* Specialties */}
                <div className="flex gap-2 md:justify-start justify-center flex-wrap mt-2 mb-4">
                  {IndiProfile?.specialitycategories?.map((spe, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-[#00768A] px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {spe?.specialtyName}
                    </span>
                  ))}
                </div>

                {/* Experience */}
                <p className="font-semibold text-gray-600 mt-2 text-lg md:text-start sm:text-center">
                  {IndiProfile.totalExperience}+ years experience
                </p>
                <div className="flex flex-wrap gap-5">
                  {/* Qualifications */}
                  <div className="flex justify-center  gap-2 mt-4 ">
                    <FaGraduationCap className="text-[#00768A]" size={20} />
                    {Array.isArray(IndiProfile.qualifications) &&
                    IndiProfile.qualifications.length > 0 ? (
                      <p className="font-semibold text-gray-600">
                        {IndiProfile.qualifications
                          .map((deg) => deg.degree)
                          .join(", ")}
                      </p>
                    ) : (
                      <p className="text-gray-500">
                        No qualifications available
                      </p>
                    )}
                  </div>

                  {/* Languages */}
                  <div className="flex gap-2 mt-4 items-center">
                    <FaCommentDots className="text-[#00768A]" size={20} />
                    <p className="font-semibold text-gray-600">
                      {(IndiProfile.language || []).join(", ")}
                    </p>
                  </div>

                  {/* Location */}
                  <div className="flex  gap-2 mt-4 items-start">
                    <MdOutlineAddLocation
                      className="text-[#00768A]"
                      size={20}
                    />
                    <div>
                      <p className="font-semibold text-gray-600">
                        {IndiProfile.hospitalName},{" "}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <img
                  src={IndiProfile?.userData?.avatar}
                  alt={IndiProfile?.userData?.name}
                  className="md:max-w-[200px] mx-auto md:rounded-full md:h-auto h-[250px] my-3 md:w-auto w-screen shadow-md"
                />
              </div>
            </div>

            {/* About Doctor Section */}
            <div
              className="about-dr mt-8 p-6 bg-gray-50 rounded-xl shadow-md transition-colors duration-300 hover:bg-blue-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="font-bold text-3xl text-[#00768A] mb-4">
                About Doctor
              </p>
              <p
                className={`text-gray-700 mt-3 ${
                  isExpanded ? "line-clamp-none" : "line-clamp-5"
                } transition-all duration-300`}
              >
               {IndiProfile?.aboutDoctor}
              </p>
              <button
                onClick={toggleDescription}
                className="mt-3 text-[#00768A] font-semibold"
              >
                {isExpanded ? "Read Less" : "Read More"}
              </button>
              <div className="w-full bg-[#00768A] h-[2px] mt-5"></div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-4">
              <h2 className="text-3xl font-bold text-[#00768A] mb-5">
                Work Experience
              </h2>
              <div className="space-y-4">
                {IndiProfile?.years_of_experience?.map((experience) => (
                  <ExperienceCard
                    key={experience._id}
                    experience={experience}
                  />
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md mt-4">
              <h2 className="text-3xl font-bold text-[#00768A] mb-5">
                Education
              </h2>
              <div className="space-y-4">
                {IndiProfile?.qualifications?.map((qualification) => (
                  <Education
                    key={qualification._id}
                    qualification={qualification}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DrIndividualProfileOverview;
