import React, { useState, useEffect } from "react";
import { IoMdStar } from "react-icons/io";
import { Link, useParams } from "react-router-dom";

const DoctorCard = ({ doctorData }) => {
  const [minPrice, setMinPrice] = useState(null);
  const {id}=useParams()
  const calculateMinPrice = (doctors) => {
    let minPrice = Infinity;

    doctors.forEach((doctor) => {
      if (doctor.slots) {
        if (
          doctor.slots.visitingMode === "online" ||
          doctor.slots.visitingMode === "both"
        ) {
          const availableOnlineSlots = doctor.slots.onlineSlots?.filter(
            (slot) =>
              !slot.isBooked &&
              typeof slot.doctorCharge === "number" &&
              !isNaN(slot.doctorCharge)
          );

          if (availableOnlineSlots?.length > 0) {
            minPrice = Math.min(
              minPrice,
              ...availableOnlineSlots.map((slot) => slot.doctorCharge)
            );
          }
        }

        if (
          doctor.slots.visitingMode === "offline" ||
          doctor.slots.visitingMode === "both"
        ) {
          const availableOfflineSlots = doctor.slots.offlineSlots?.filter(
            (slot) =>
              !slot.isBooked &&
              typeof slot.doctorCharge === "number" &&
              !isNaN(slot.doctorCharge)
          );

          if (availableOfflineSlots?.length > 0) {
            minPrice = Math.min(
              minPrice,
              ...availableOfflineSlots.map((slot) => slot.doctorCharge)
            );
          }
        }
      }
    });

    return minPrice === Infinity ? null : minPrice;
  };

  useEffect(() => {
    if (doctorData && doctorData.length > 0) {
      const calculatedMinPrice = calculateMinPrice(doctorData);
      setMinPrice(calculatedMinPrice);
    }
  }, [doctorData]);

  return (
    <div className="flex w-[100%] flex-wrap gap-8 md:gap-10 m-auto">
      {doctorData?.map((doctor, index) => (
        <div
          
          key={index}
          className="w-full h-min sm:w-[48%] md:w-[100%] lg:flex bg-white p-4 md:p-6 flex flex-col lg:flex-row items-start rounded-lg shadow-md border border-gray-200 transition-transform duration-300 hover:scale-105"
        >
          <div>
            <div className="flex flex-col lg:flex-row gap-6 items-center lg:items-start w-full">
              {/* Profile Image */}
              <div className="flex-shrink-0 bg-[#f3f3f3] rounded-full border-2 border-[#00768A] h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 overflow-hidden">
                <img
                  src={doctor.userData.avatar}
                  alt="Doctor"
                  className="h-full w-full object-cover"
                />
              </div>

              {/* Doctor Info */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex  justify-between border-b pb-2 flex-row md:justify-between items-center lg:items-start">
                  <div className="flex flex-col md:flex-row md:gap-4 items-center">
                    <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#00768A] capitalize">
                      Dr. {doctor.userData.name}
                    </h2>
                    <p className="text-md text-sm md:text-lg text-[#8B4513] font-semibold">
                      Experience: {doctor?.totalExperience} years
                    </p>
                  </div>

                  {/* Price for larger screens */}
                  <div className="md:w-auto w-[40%] lg:flex flex-col items-center mt-3 lg:mt-0">
                    <div className="flex items-center justify-center mb-2 bg-[#47A7B5] rounded-md px-3 py-1">
                      <IoMdStar className="text-yellow-500 text-lg" />
                      <span className="ml-2 text-sm text-white">4.0</span>
                    </div>
                    <div className="text-sm font-semibold text-gray-700">
                      Price:
                      <span className="ml-2 text-green-600">
                        {minPrice !== null
                          ? `INR ${minPrice}`
                          : "Not available"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 flex-wrap mt-2 justify-center lg:justify-start">
                  {doctor.services_offered.map((service, idx) => (
                    <span
                      key={idx}
                      className="bg-[#f0f9f9] px-3 py-1 rounded-lg text-[#00768A] font-medium text-sm"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2 mt-2 justify-center lg:justify-start">
                  {doctor?.years_of_experience?.map((experience, idx) => (
                    <React.Fragment key={idx}>
                      {experience.skills.map((skill, skillIdx) => (
                        <span
                          key={skillIdx}
                          className="text-sm text-gray-600 font-semibold"
                        >
                          {skill}
                        </span>
                      ))}
                    </React.Fragment>
                  ))}
                </div>
                <p className="mt-4 text-sm text-gray-600">
                  {doctor.aboutDoctor}
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-3 mt-4 w-full lg:w-auto">
              <Link to={`/doctors-individual-profile/${doctor._id}`}>
                <button class="md:w-[160px] w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600  dark:text-white focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800">
                  <span class="relative w-full px-8 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                    View Profile
                  </span>
                </button>
              </Link>

              <Link to={`/booking-slot/${doctor._id}`}>
              <button
                type="button"
                class="text-white md:w-[160px] w-full font-semibold bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800  rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 shadow-md"
              >
                Book
              </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DoctorCard;
