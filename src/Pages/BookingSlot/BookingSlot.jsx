import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { useParams } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import DrAppointmentBooking from "../../Components/DrApointmentBooking";
import { FaGraduationCap, FaHospital, FaMapMarkerAlt, FaTrophy, FaGlobe } from "react-icons/fa";


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
  const ProfileDetail = ({ icon, title, value }) => (
    <div className="flex items-center">
      <span className="flex items-center justify-center bg-[#00768A] text-white w-12 h-12 rounded-full shadow-lg text-xl">
        {icon}
      </span>
      <div className="ml-4">
        <p className="text-lg font-semibold text-gray-700">{title}</p>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );



  return (
    <div>
      <Navbar />

      <div className="min-h-screen bg-gradient-to-r from-[#E3FDFD] via-[#FFE6FA] to-[#FBF4E9] flex items-center py-12 px-4 sm:px-6 lg:px-8">
        {/* Doctor Profile Card */}
        {DrProfile?.userData && (
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl mx-auto p-6 lg:p-10">
            {/* Header Section */}
            <div className="relative bg-cover bg-center rounded-3xl overflow-hidden flex flex-col lg:flex-row lg:items-center gap-8"
              style={{
                backgroundImage: `url('https://img.freepik.com/free-vector/cartoon-stomatology-clinic-hospital-interior-empty-dental-hall-waiting-room-with-chair-elevator-reception-doctor-office-doors-tooth-treatment-oral-care-teeth-hygiene-concept_88138-885.jpg?t=st=1731668919~exp=1731672519~hmac=19e6049e9b8e5fb684c129f69724c4522b3e37e33a4096a5279b89cf9aec90b2&w=826')`,
                height: '300px',
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 z-0"></div>

              {/* Doctor Image */}
              <div className="flex-shrink-0 flex justify-center lg:justify-start z-10">
                <img
                  src={DrProfile.userData?.avatar || "https://via.placeholder.com/150"}
                  alt="Doctor Avatar"
                  className="h-32 w-32 lg:h-40 lg:w-40 rounded-full object-cover shadow-lg border-4 border-white"
                />
              </div>

              {/* Doctor Name and Info */}
              <div className="text-center lg:text-left z-10 mt-6 lg:mt-0">
                <h1 className="text-3xl lg:text-4xl text-start my-3 font-bold text-white uppercase [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                  {DrProfile.userData?.name || "Doctor's Name"}
                </h1>
                <p className="text-xl font-semibold text-[#fff] mr-2 shadow-md [text-shadow:_0_4px_8px_#00BCD4]   leading-snug font-manrope ">
                  Specialties In :
                  <span className="font-medium ml-2">
                    {DrProfile.specialitycategories && DrProfile.specialitycategories.length > 0 ? (
                      DrProfile.specialitycategories?.map((specialty, index) => (
                        <span key={index} className="inline-block bg-blue-100 text-[#00768A] px-3 py-1 rounded-full mr-2 text-[16px]">
                          {specialty.specialtyName}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">Not available</span>
                    )}
                  </span>
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t my-8"></div>

            {/* Profile Details Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Experience */}
              <ProfileDetail
                icon={<FaTrophy />}
                title="Experience"
                value={`+${DrProfile.totalExperience || 0} years`}
              />

              {/* Languages */}
              <ProfileDetail
                icon={<FaGlobe />}
                title="Languages"
                value={
                  DrProfile?.language?.length > 0
                    ? DrProfile.language.join(", ")
                    : "No languages available"
                }
              />

              {/* Qualifications */}
              <ProfileDetail
                icon={<FaGraduationCap />}
                title="Qualifications"
                value={
                  DrProfile?.qualifications?.length > 0
                    ? DrProfile.qualifications
                      .map((qualification) => qualification.degree)
                      .join(", ")
                    : "Not available"
                }
              />

              {/* Hospital Info */}
              <ProfileDetail
                icon={<FaHospital />}
                title="Hospital"
                value={DrProfile.hospitalName || "Not available"}
              />

              {/* Address */}
              <ProfileDetail
                icon={<FaMapMarkerAlt />}
                title="Address"
                value={
                  DrProfile?.clinic_hospital_address
                    ? `${DrProfile.clinic_hospital_address.permanentAddress || ""}, ${DrProfile.clinic_hospital_address.state || ""
                    }, ${DrProfile.clinic_hospital_address.city || ""}, ${DrProfile.clinic_hospital_address.PinCode || ""
                    }`
                    : "Not available"
                }
              />
            </div>

            {/* CTA Section */}
            <div className="text-center mt-8">
              <button className="px-8 py-3 bg-gradient-to-r from-[#00C6FF] to-[#00768A] text-white rounded-lg text-lg font-semibold shadow-md hover:opacity-90 transition duration-200">
                Book Appointment
              </button>
            </div>
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
