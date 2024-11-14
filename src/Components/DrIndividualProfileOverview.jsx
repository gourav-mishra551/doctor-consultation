import React, { useState } from "react";
import { FaGraduationCap, FaCommentDots } from "react-icons/fa";
import { MdOutlineAddLocation } from "react-icons/md";
import ExperienceCard from "./DrExperience/ExperienceCard";

const DrIndividualProfileOverview = ({ IndiProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => setIsExpanded(!isExpanded);

  return (
    <div className="bg-gray-100 py-10 px-5">
      <div className="bg-white w-full p-6 rounded-xl shadow-lg transition-transform transform hover:scale-105">

        {/* Profile Section */}
        <div
          className="dr-profile flex sm:flex-row flex-col gap-10 mt-5 p-6 rounded-xl shadow-lg bg-gray-50"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >

          {/* Left Section: Doctor Profile */}
          <div className="border-2 border-gray-300 rounded-xl p-6 flex-1 h-auto">
            <div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >

              {/* Doctor's Name */}
              <p className="font-bold text-3xl text-[#00768A] mb-3 capitalize">{IndiProfile?.name}</p>

              {/* Specialties */}
              <div className="flex gap-2 flex-wrap mt-2 mb-4">
                {IndiProfile?.specialties?.map((spe, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold"
                  >
                    {spe}
                  </span>
                ))}
              </div>

              {/* Experience */}
              <p className="font-semibold text-gray-600 mt-2 text-lg">
                {IndiProfile.experience}+ years experience
              </p>

              {/* Qualifications */}
              <div className="flex gap-2 mt-4 items-center">
                <FaGraduationCap className="text-[#00768A]" size={20} />
                {Array.isArray(IndiProfile.qualifications) && IndiProfile.qualifications.length > 0 ? (
                  <p className="font-semibold text-gray-600">
                    {IndiProfile.qualifications.map((deg) => deg.degree).join(", ")}
                  </p>
                ) : (
                  <p className="text-gray-500">No qualifications available</p>
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
              <div className="flex gap-2 mt-4 items-start">
                <MdOutlineAddLocation className="text-[#00768A]" size={20} />
                <div>
                  <p className="font-semibold text-gray-600">
                    {IndiProfile.hospitalName},{" "}
                    {IndiProfile.clinic_hospital_address?.permanentAddress}
                  </p>
                  <p className="text-gray-500">
                    {IndiProfile.clinic_hospital_address?.permanentAddress},{" "}
                    {IndiProfile.clinic_hospital_address?.state},
                    {IndiProfile.clinic_hospital_address?.city}{" "}
                    {IndiProfile.clinic_hospital_address?.PinCode}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <h2 className="text-3xl font-bold text-[#00768A] mb-5">Work Experience</h2>
              <div className="space-y-4">
                {IndiProfile?.years_of_experience.map((experience) => (
                  <ExperienceCard key={experience._id} experience={experience} />
                ))}
              </div>
            </div>

          </div>

          {/* Right Section: Appointment Booking */}

        </div>

        {/* About Doctor Section */}
        <div
          className="about-dr mt-8 p-6 bg-gray-50 rounded-xl shadow-md transition-colors duration-300 hover:bg-blue-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="font-bold text-3xl text-[#00768A] mb-4">About Doctor</p>
          <p className={`text-gray-700 mt-3 ${isExpanded ? "line-clamp-none" : "line-clamp-5"} transition-all duration-300`}>
            Dr. Ritika Bhatt is an experienced ENT/Otorhinolaryngologist in
            Bangalore with over 5 years of expertise in diagnosing and treating
            a wide range of ear, nose, and throat disorders. Dr. Bhatt is
            considered one of the best ENT specialists in Bangalore and has
            gained a reputation for her compassionate care and successful
            treatment outcomes. As an ENT specialist, Dr. Ritika provides care
            for both common and complex conditions affecting the ears, nose,
            throat, head, and neck. She diagnoses and treats various conditions
            like tonsillitis, nasal polyps, ear infections, hearing loss,
            sinusitis, snoring problems, and more. Dr. Bhatt's services extend
            to advanced treatments such as Tonsillectomy, Tympanoplasty (eardrum
            repair), Nasal Septum Surgery, and Ear Reconstruction surgeries. Her
            expertise in treating congenital ear problems is highly sought after
            by parents seeking specialized treatment for their children.
          </p>
          <button
            onClick={toggleDescription}
            className="mt-3 text-[#00768A] font-semibold"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
          <div className="w-full bg-[#00768A] h-[2px] mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default DrIndividualProfileOverview;
