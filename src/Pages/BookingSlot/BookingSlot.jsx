import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import DrAppointmentBooking from "../../Components/DrApointmentBooking";

function BookingSlot() {
  const [DrProfile, setDrProfile] = useState(null); // Set initial state to null
  const { id } = useParams();

  useEffect(() => {
    DrProfileFetch();
  }, []);

  const DrProfileFetch = async () => {
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors/${id}`
      );
      setDrProfile(res.data.data); // Set the fetched doctor profile
    } catch (error) {
      console.error("Error fetching doctor profile data:", error);
    }
  };

  // Check if DrProfile has been loaded and has the userData
  if (!DrProfile) {
    return <div>Loading...</div>; // Show loading message or spinner if DrProfile is null
  }

  return (
    <div>
      <Navbar />
      <div className="bg-[#E0EBF1] py-8">
        {/* Ensure DrProfile and userData are defined before rendering */}
        {DrProfile.userData && (
          <div className="bg-white rounded-lg shadow-lg w-full max-w-7xl mx-auto p-8 space-y-8">
            {/* Profile Header */}
            <div className="text-center">
              <h1 className="text-4xl font-semibold text-[#00768A]">
                {DrProfile.userData?.name || "Doctor's Name Not Available"}
              </h1>
              <div className="flex justify-center gap-6 mt-4">
                {/* Uncomment to show specialties if needed */}
                {/* {DrProfile?.specialties?.map((specialty, index) => (
                  <span
                    key={index}
                    className="text-lg text-gray-600 bg-[#E4F8F6] px-4 py-2 rounded-full"
                  >
                    {specialty || "Specialty Not Available"}
                  </span>
                ))} */}
              </div>
            </div>

            {/* Profile Details */}
            <div className="space-y-6">
              <div className="flex justify-between items-center text-lg text-gray-700">
                <span className="font-semibold text-[#00768A]">Experience:</span>
                <span className="text-gray-600">
                  +{DrProfile.totalExperience} years experience
                </span>
              </div>

              <div className="flex justify-between items-center text-lg text-gray-700">
                <span className="font-semibold text-[#00768A]">Languages:</span>
                <div className="flex gap-4">
                  {DrProfile?.language?.length > 0 ? (
                    <span className="text-gray-600">
                      {DrProfile.language.join(", ")}
                    </span>
                  ) : (
                    <span className="text-gray-600">No languages available</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg text-gray-700">
                  <span className="font-semibold text-[#00768A]">Qualifications:</span>
                  <div className="space-y-2">
                    {DrProfile?.qualifications?.map((qualification, index) => (
                      <div key={index} className="flex items-center gap-3 text-gray-600">
                        <GiGraduateCap className="text-[#00768A] text-xl" />
                        <span>{qualification.degree || "Not Available"}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between items-center text-lg text-gray-700">
                  <span className="font-semibold text-[#00768A]">Hospital Name:</span>
                  <span className="text-gray-600">
                    {DrProfile.hospitalName || "Not Available"}
                  </span>
                </div>

                <div className="flex justify-between items-center text-lg text-gray-700">
                  <span className="font-semibold text-[#00768A]">Address:</span>
                  <span className="text-gray-600">
                    {DrProfile?.clinic_hospital_address?.permanentAddress || "Not Available"} {", "}
                    {DrProfile?.clinic_hospital_address?.state || "State Not Available"}, 
                    {DrProfile?.clinic_hospital_address?.city || "City Not Available"} {", "}
                    {DrProfile?.clinic_hospital_address?.PinCode || "PinCode Not Available"}
                  </span>
                </div>
              </div>
            </div>

            {/* Book Appointment Section */}
            {/* Uncomment and style button if needed */}
            {/* <div className="flex justify-center mt-6">
              <button className="bg-[#00768A] text-white px-8 py-3 rounded-full text-xl hover:bg-[#005c67] focus:outline-none transform transition-all hover:scale-105 active:scale-95">
                Book Appointment
              </button>
            </div> */}
          </div>
        )}
      </div>

      {/* Appointment Booking Component */}
      <div className="p-8">
        <DrAppointmentBooking IndiProfile={DrProfile} />
      </div>
    </div>
  );
}

export default BookingSlot;
