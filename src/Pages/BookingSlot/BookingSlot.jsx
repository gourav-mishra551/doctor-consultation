import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { useParams } from "react-router-dom";
import DrAppointmentBooking from "../../Components/DrApointmentBooking";
import { FaGraduationCap, FaHospital, FaMapMarkerAlt, FaTrophy, FaGlobe } from "react-icons/fa";

function BookingSlot() {
  const [DrProfile, setDrProfile] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    DrProfileFetch();
  }, []);

  const DrProfileFetch = async () => {
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors/${id}`
      );
      setDrProfile(res.data.data);
    } catch (error) {
      console.error("Error fetching doctor profile data:", error);
    }
  };

  if (!DrProfile) {
    return <div className="flex items-center justify-center min-h-screen text-xl font-bold text-gray-600">Loading...</div>;
  }

  const ProfileDetail = ({ icon, title, value }) => (
    <div className="flex items-center">
      <span className="flex items-center justify-center bg-[#00768A] text-white w-12 h-12 rounded-full shadow-lg text-xl">
        {icon}
      </span>
      <div className="ml-4">
        <p className="text-base sm:text-lg font-semibold text-gray-700">{title}</p>
        <p className="text-sm sm:text-base text-gray-600">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">

      <div className="bg-gradient-to-r from-[#E3FDFD] via-[#FFE6FA] to-[#FBF4E9] flex-grow py-6 px-4 sm:px-6 lg:px-8">
        {DrProfile?.userData && (
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl mx-auto p-4 sm:p-6  lg:p-10">
            <div
              className="relative bg-cover bg-center rounded-3xl overflow-hidden flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-8"
              style={{
                backgroundImage: `url('https://img.freepik.com/free-vector/cartoon-stomatology-clinic-hospital-interior-empty-dental-hall-waiting-room-with-chair-elevator-reception-doctor-office-doors-tooth-treatment-oral-care-teeth-hygiene-concept_88138-885.jpg')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 z-0"></div>

              <div className="flex-shrink-0 flex justify-center lg:justify-start z-10">
                <img
                  src={DrProfile.userData?.avatar || "https://via.placeholder.com/150"}
                  alt="Doctor Avatar"
                  className="h-28 w-28 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-full object-cover shadow-lg border-4 border-white"
                />
              </div>

              <div className="text-center lg:text-left z-10">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                    {DrProfile.userData?.name || "Doctor's Name"}
                  </h1>
                  <div className="flex justify-center items-center">
                    <span className="bg-[#00768A] p-2 rounded-full">
                      <FaTrophy className="text-2xl text-yellow-500" />
                    </span>
                    <p className="text-[#00768A] ml-3 bg-cyan-100 py-1 px-2 text-sm rounded-full font-bold">
                      {DrProfile.totalExperience} Years of Experience
                    </p>
                  </div>
                </div>
                <p className="text-lg sm:text-xl mb-4 font-semibold text-white shadow-md [text-shadow:_0_4px_8px_#00BCD4] mt-2">
                  Specialties In:
                  <span className="ml-2">
                    {DrProfile.specialitycategories?.length > 0 ? (
                      DrProfile.specialitycategories.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-[#00768A] px-3 py-1 rounded-full mr-2 text-sm"
                        >
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

            <div className="border-t my-8"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <ProfileDetail
                icon={<FaGlobe />}
                title="Languages"
                value={
                  DrProfile?.language?.length > 0
                    ? DrProfile.language.join(", ")
                    : "No languages available"
                }
              />
              <ProfileDetail
                icon={<FaGraduationCap />}
                title="Qualifications"
                value={
                  DrProfile?.qualifications?.length > 0
                    ? DrProfile.qualifications.map((q) => q.degree).join(", ")
                    : "Not available"
                }
              />
              <ProfileDetail
                icon={<FaHospital />}
                title="Hospital"
                value={DrProfile.hospitalName || "Not available"}
              />
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
          </div>
        )}
      </div>

      <div className="p-4 sm:p-6 lg:p-10">
        <DrAppointmentBooking IndiProfile={DrProfile} />
      </div>
    </div>
  );
}

export default BookingSlot;
