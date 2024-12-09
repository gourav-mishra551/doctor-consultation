import React, { useState, useEffect } from "react";
import { IoMdStar } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import noDoctor from "../../Assests/no-dcotor.png";
import Avatar from "../../Assests/DrAvatar.jpg";

const DoctorCard = ({ doctorData }) => {
  const [minPrice, setMinPrice] = useState(null);
  const [queryPrice, setQueryPrice] = useState(null);

  useEffect(() => {
    // Get the price from the query string in the URL
    const queryParams = new URLSearchParams(window.location.search);
    const priceFromQuery = queryParams.get("price"); // Assuming 'price' is the query key

    if (priceFromQuery) {
      setQueryPrice(Number(priceFromQuery)); // Convert to a number and set the query price
    }
  }, []);
  console.log(queryPrice);
  const calculateMinimumPrice = (doctor, queryPrice = null) => {
    let minPrice = Infinity;
    let currencySymbol = ""; // To hold the currency symbol

    // Ensure doctorAvailability exists and is not empty
    if (!doctor?.doctorAvailability || doctor.doctorAvailability.length === 0) {
      return "No Slots";
    }

    // Extract prices and currency symbols for offline slots
    const offlineSlots = doctor.doctorAvailability.flatMap(
      (doc) => doc.offlineSlots || []
    );
    const availableOfflineSlots = offlineSlots.filter((slot) => !slot.isBooked);
    const offlineSlotsPrice = availableOfflineSlots.map(
      (slot) => slot.doctorCharge
    );

    // Extract prices and currency symbols for online slots
    const onlineSlots = doctor.doctorAvailability.flatMap(
      (doc) => doc.onlineSlots || []
    );
    const availableOnlineSlots = onlineSlots.filter((slot) => !slot.isBooked);
    const onlineSlotsPrice = availableOnlineSlots.map(
      (slot) => slot.doctorCharge
    );

    // Determine the currency symbol from the first available slot (offline or online)
    if (availableOfflineSlots.length > 0) {
      currencySymbol = availableOfflineSlots[0]?.currencyCode || "";
    } else if (availableOnlineSlots.length > 0) {
      currencySymbol = availableOnlineSlots[0]?.currencyCode || "";
    }

    // Find the minimum price from available slots
    if (offlineSlotsPrice.length > 0) {
      minPrice = Math.min(minPrice, ...offlineSlotsPrice);
    }
    if (onlineSlotsPrice.length > 0) {
      minPrice = Math.min(minPrice, ...onlineSlotsPrice);
    }

    // Handle case where no unbooked slots are available
    if (minPrice === Infinity) {
      return "No Slots";
    }

    // Compare with query price if available
    if (queryPrice !== null) {
      minPrice = Math.min(minPrice, queryPrice);
    }

    // Return the formatted price with the currency symbol
    return `${currencySymbol} ${minPrice}`;
  };

  useEffect(() => {
    if (doctorData) {
      const price = calculateMinimumPrice(doctorData);
      setMinPrice(price);
    }
  }, [doctorData, queryPrice]);
  // useEffect(() => {
  //   if (doctorData && doctorData.length > 0) {
  //     const calculatedMinPrice = calculateMinPrice(doctorData);
  //     setMinPrice(calculatedMinPrice);
  //   }
  // }, [doctorData]);

  return (
    <div className="flex  flex-wrap w-[100%] gap-8 md:gap-10 m-auto">
      {doctorData && doctorData.length > 0 ? (
        doctorData?.map((doctor, index) => (
          <div
            key={index}
            className="w-[95%] mx-auto   h-min  md:w-[90%] lg:flex bg-white p-3 -translate-x-1 sm:translate-x-0  md:p-6 flex flex-col justify-start items-start lg:flex-row  rounded-lg shadow-md border border-gray-200 transition-transform duration-300 hover:scale-105"
          >
            <div className="w-[100%]">
              <div className="flex flex-col lg:flex-row gap-6 items-center  lg:items-start w-full ">
                {/* Profile Image */}
                <div className="flex-shrink-0 bg-[#f3f3f3] rounded-full border-2 border-[#00768A] h-24 w-24 md:h-32 md:w-32 lg:h-40 lg:w-40 overflow-hidden">
                  <img
                    src={doctor?.userData?.avatar || Avatar}
                    alt={Avatar}
                    className="h-full w-full object-cover"
                  />
                </div>

                {/* Doctor Info */}
                <div className="flex-1 md:justify-center md:gap-[128px] lg:text-left">
                  {/* Doctor's Header */}
                  <div className="flex flex-col justify-center border-b pb-2 md:flex-row md:justify-between md:gap-[20px] lg:gap-0 lg:items-start">
                    {/* Doctor's Details */}
                    <div className="w-full md:w-auto lg:flex lg:flex-col lg:items-start mt-3 lg:mt-0">
                      {doctor?.userData?.name == 0 ? null : (
                        <h2 className="text-lg text-center sm:text-start md:text-xl  w-full  lg:text-2xl font-bold text-[#00768A] capitalize">
                          {doctor?.userData?.name?.startsWith("Dr")
                            ? doctor?.userData?.name
                            : `Dr. ${doctor?.userData?.name}`}
                        </h2>
                      )}

                      {doctor?.totalExperience <= 0 ? null : (
                        <p className="text-sm text-center sm:text-start md:text-lg font-semibold text-[#8B4513]">
                          Experience: {doctor?.totalExperience} years
                        </p>
                      )}
                    </div>

                    {/* Pricing Section */}
                    <div className="w-full md:w-auto lg:flex lg:flex-col lg:items-center mt-3 lg:mt-0">
                      <div className="flex items-center justify-center mb-2 bg-[#47A7B5] rounded-md px-3 py-1 w-[80px] mx-auto md:mx-0">
                        <IoMdStar className="text-yellow-500 text-lg" />
                        <span className="ml-2 text-sm text-white">4.0</span>
                      </div>
                      <div className="text-sm text-center md:text-start font-semibold text-gray-700">
                        Price:
                        <span className="ml-2 text-green-600">
                          {doctor && calculateMinimumPrice(doctor)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Services Offered */}
                  <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                    {doctor?.services_offered?.map((service, idx) => (
                      <span
                        key={idx}
                        className="bg-[#f0f9f9] px-3 py-1 rounded-lg text-[#00768A] font-medium text-sm"
                      >
                        {service}
                      </span>
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mt-2 justify-center md:justify-start">
                    {doctor?.years_of_experience?.map((experience, idx) => (
                      <React.Fragment key={idx}>
                        {experience?.skills?.map((skill, skillIdx) => (
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

                  {/* About Doctor */}
                  <p className="mt-4 text-sm text-gray-600 text-center md:text-start">
                    {doctor.aboutDoctor}
                  </p>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col md:flex-row gap-3 mt-4 w-full lg:w-auto">
                <Link to={`/doctors-individual-profile/${doctor._id}`}>
                  <button class="md:w-[160px] w-full relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-green-400 to-blue-600 group-hover:from-green-400 group-hover:to-blue-600   focus:ring-4 focus:outline-none focus:ring-green-200 ">
                    <span class="relative w-full px-8 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
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
        ))
      ) : (
        <div className="w-[60%] mx-auto flex flex-col ">
          <img
            src={noDoctor}
            alt="No Data Available"
            className="w-[100%] h-[80%] mb-4 mx-auto"
          />
          <p className="text-gray-700 text-lg font-semibold text-center">
            No doctors available at the moment. Please check back later.
          </p>
        </div>
      )}
    </div>
  );
};

export default DoctorCard;
