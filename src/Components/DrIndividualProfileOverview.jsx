import React, { useState } from "react";
import { FaGraduationCap } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { MdOutlineAddLocation } from "react-icons/md";
import DrAppointmentBooking from "./DrApointmentBooking";

const DrIndividualProfileOverview = ({ IndiProfile }) => {
  // Check if IndiProfile exists before using it
  if (!IndiProfile) {
    return <div>Loading...</div>; // You can show a loading message or spinner
  }

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };
console.log(IndiProfile);

  return (
    <div>
      <div className="bg-white w-full h-auto p-5">
        <div className="dr-profile flex sm:flex-row flex-col gap-10 mt-5 p-5 rounded-xl shadow-lg bg-gray-50">
          {/* Left Section: Doctor Profile */}
          <div className="border-2 border-gray-300 rounded-xl p-6 flex-1 h-[350px]">
            <div>
              {/* Doctor's Name */}
              <p className="font-bold text-3xl text-[#00768A]">
                {IndiProfile?.name}
              </p>

              {/* Specialties */}
              <div className="flex gap-3 mt-2">
                {IndiProfile?.specialties?.map((spe, index) => (
                  <p
                    key={index}
                    className="font-semibold text-lg text-gray-700"
                  >
                    {spe}
                    {index < IndiProfile.length - 1 && ","}
                  </p>
                ))}
              </div>

              {/* Experience */}
              <p className="font-semibold text-gray-600 mt-2">
                {IndiProfile.experience}+ years experience
              </p>

              {/* Qualifications */}
              <div className="flex gap-2 mt-3 items-center">
                <FaGraduationCap className="text-[#00768A]" />
                {Array.isArray(IndiProfile.qualifications) &&
                IndiProfile.qualifications.length > 0 ? (
                  IndiProfile.qualifications.map((deg, index) => (
                    <p key={index} className="font-semibold text-gray-600">
                      {deg.degree}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-500">No qualifications available</p>
                )}
              </div>

              {/* Languages */}
              <div className="flex gap-2 mt-3 items-center">
                <FaCommentDots className="text-[#00768A]" />
                <p className="font-semibold text-gray-600">
                  {(IndiProfile.language || []).join(", ")}
                </p>
              </div>

              {/* Location */}
              <div className="flex gap-2 mt-3 items-start">
                <MdOutlineAddLocation className="text-[#00768A]" />
                <div>
                  <p className="font-semibold text-gray-600">
                    {IndiProfile.hospitalName},{" "}
                    {IndiProfile.clinic_hospital_address?.permanentAddress}
                  </p>
                  <p className="text-gray-500">
                    {IndiProfile.clinic_hospital_address?.permanentAddress},{" "}
                    {IndiProfile.clinic_hospital_address?.state},
                    {IndiProfile.clinic_hospital_address?.city}
                    {IndiProfile.clinic_hospital_address?.PinCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section: Appointment Booking */}
          <div className="bg-white rounded-xl p-5 shadow-lg flex-1">
            
          </div>
        </div>

        {/* About Doctor Section */}
        <div className="about-dr mt-5 p-5 bg-gray-50 rounded-xl">
          <p className="font-bold text-3xl text-[#00768A]">About Doctor</p>
          <p className="text-gray-700 mt-3">
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
          <div className="w-full bg-[#00768A] h-[2px] mt-5"></div>
        </div>
      </div>
    </div>
  );
};

export default DrIndividualProfileOverview;
