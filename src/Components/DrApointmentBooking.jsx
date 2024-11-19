import React, { useState } from "react";

function DrAppointmentBooking({ IndiProfile, onNext }) {
  const { doctorAvailability } = IndiProfile;
  const [selectedDate, setSelectedDate] = useState(null);
  const [filter, setFilter] = useState("both"); // Default to "both"
  const [selectedSlot, setSelectedSlot] = useState(null); // Track the selected slot for booking

  // Filter function for slots
  const filterSlots = (availability) => {
    if (filter === "online") {
      return availability.visitingMode === "online";
    } else if (filter === "offline") {
      return availability.visitingMode === "offline";
    }
    return true; // Show both online and offline slots
  };

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookingDetails = Object.fromEntries(formData.entries());
    console.log("Booking Details:", bookingDetails);
    alert("Booking confirmed!");
    setSelectedSlot(null); // Reset selected slot after submission
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <div className="flex flex-col gap-5">
      {/* Month and Date Slider */}

      {/* Main Content */}
      <div className="flex gap-5">
        {/* Header Section */}
        <div className="max-w-5xl mx-auto p-8 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">
            Book Your Appointment
          </h2>

          {/* Slot Filter Buttons */}
          <div className="flex justify-center space-x-4 mb-10">
            <button
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
                filter === "online"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 hover:bg-blue-100"
              }`}
              onClick={() => setFilter("online")}
            >
              Online
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
                filter === "offline"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 hover:bg-blue-100"
              }`}
              onClick={() => setFilter("offline")}
            >
              Offline
            </button>
            <button
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${
                filter === "both"
                  ? "bg-blue-500 text-white shadow-md"
                  : "bg-gray-200 hover:bg-blue-100"
              }`}
              onClick={() => setFilter("both")}
            >
              Both
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-4">
            {doctorAvailability.map((availability) => (
              <div
                key={availability._id}
                className={`min-w-[100px] p-4 text-center rounded-lg cursor-pointer ${
                  selectedDate === availability.selectDate
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 hover:bg-blue-100"
                }`}
                onClick={() => setSelectedDate(availability.selectDate)} // Set selected date
              >
                <p className="text-sm font-medium text-gray-700">
                  {new Date(availability.selectDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                    }
                  )}
                </p>
                <p className="text-lg font-bold">
                  {new Date(availability.selectDate).toLocaleDateString(
                    "en-US",
                    {
                      day: "numeric",
                    }
                  )}
                </p>
              </div>
            ))}
          </div>

          {/* Doctor Availability Slots */}
          <div className="space-y-6">
            {doctorAvailability
              .filter(
                (availability) =>
                  filterSlots(availability) &&
                  new Date(availability.selectDate).toDateString() ===
                    new Date(selectedDate).toDateString() // Match the selected date
              )
              .map((availability) => (
                <div
                  key={availability._id}
                  className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow"
                >
                  <p className="font-bold text-lg text-blue-600 mb-2">
                    {new Date(availability.selectDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>

                  <p className="text-sm font-semibold text-gray-600 bg-blue-100 px-3 py-1 rounded-lg inline-block">
                    {availability.visitingMode} Slots
                  </p>

                  <p className="text-gray-700 mb-4">
                    <span className="font-medium">Available From:</span>{" "}
                    {new Date(
                      availability.availableTimeFrom
                    ).toLocaleTimeString()}{" "}
                    to{" "}
                    {new Date(
                      availability.availableTimeTo
                    ).toLocaleTimeString()}
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    {availability.offlineSlots.map((slot) => (
                      <div
                        key={slot._id}
                        className={`p-4 border rounded-lg transition-transform ${
                          slot.isBooked
                            ? "bg-red-100 text-gray-700"
                            : "bg-green-100 hover:scale-105"
                        }`}
                      >
                        <p className="text-sm">
                          <span className="font-medium">Time:</span>{" "}
                          {slot.startTime} - {slot.endTime}
                        </p>
                        <p className="text-sm">
                          <span className="font-medium">Charge:</span> ₹
                          {slot.doctorCharge}
                        </p>
                        <button
                          disabled={slot.isBooked}
                          onClick={() => setSelectedSlot(slot)}
                          className={`mt-4 w-full px-4 py-2 rounded-lg font-medium transition ${
                            slot.isBooked
                              ? "bg-gray-400 text-white cursor-not-allowed"
                              : "bg-blue-500 text-white hover:bg-blue-600"
                          }`}
                        >
                          {slot.isBooked ? "Booked" : "Book Now"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
          </div>
        </div>

        {/* Booking Form */}
        <div>
          {selectedSlot ? (
            <form
              onSubmit={handleFormSubmit}
              className="flex flex-col max-w-3xl w-[450px]   p-6 bg-white shadow-lg rounded-lg"
            >
              {/* Name Input */}
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Name:
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  type="text"
                  onChange={handleChange}
                  placeholder="Enter Your Name"
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="gender"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Gender:
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
                  name="gender"
                  id=""
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="dob"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Date of birth (DOB):
                </label>
                <input
                  id="dob"
                  name="dob"
                  type="date"
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
                />
              </div>

              {/* Reason for Appointment */}
              <div className="mb-4">
                <label
                  htmlFor="reason"
                  className="block text-sm font-semibold text-gray-700"
                >
                  Reason for Appointment:
                </label>
                <textarea
                  id="reason"
                  required
                  name="reason"
                  onChange={handleChange}
                  rows="4"
                  placeholder="Please describe the reason for your visit"
                  className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
                ></textarea>
              </div>

              {/* Booking Button */}
              <div className="mt-6 w-full">
                <button
                  onClick={onNext}
                  className="px-6 py-3 bg-[#00768A] text-white rounded-lg w-full text-lg transition-all duration-300 hover:bg-[#00768A]"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DrAppointmentBooking;

// import { h1 } from "framer-motion/m";
// import { useState, useEffect } from "react";
// import { GrRadialSelected } from "react-icons/gr";
// import { Link } from "react-router-dom";

// const DrAppointmentBooking = ({ IndiProfile, onNext }) => {
//   const [selectedMode, setSelectedMode] = useState("both"); // Default to both
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [appointmentData, setAppointmentData] = useState(null);

//   const [formdata, setformData] = useState({
//     name: "",
//     gender: "",
//     dob: "",
//     reason: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setformData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };
//   // Fetch doctor's availability data
//   useEffect(() => {
//     if (IndiProfile && IndiProfile.doctorAvailability) {
//       setAppointmentData(IndiProfile.doctorAvailability);

//       setLoading(false);
//     }
//   }, [IndiProfile]);

//   const handleModeChange = (mode) => {
//     setSelectedMode(mode); // Set the selected mode: "online", "offline", "both"
//   };

//   const handleDateSelect = (date) => {
//     setSelectedDate(date); // Update selected date when a user clicks a date
//     // Optionally, you can also filter slots based on the selected date here
//     const slotsForSelectedDate = getSlotsForDate(date); // You can implement getSlotsForDate to fetch slots
//     setFilteredSlots(slotsForSelectedDate); // Update filtered slots state
//   };

//   // Filter slots based on selected mode and selected date
//   const getFilteredSlots = (slots, selectedDate) => {
//     if (!selectedDate) return [];

//     const formattedSelectedDate = formatDate(selectedDate);

//     return slots.filter((slot) => {
//       // Assuming `startTime` is in hours (0-23) and adding it to the selectedDate to compare
//       const slotDate = new Date(selectedDate);
//       slotDate.setHours(slot.startTime); // Set the time from the slot's startTime

//       return formatDate(slotDate) === formattedSelectedDate;
//     });
//   };

//   const handleSlotSelect = (slot) => {
//     // setSelectedDate(slot.startTime);
//     setSelectedDate(formatDate(slot.startTime));
//     setSelectedTime(slot); // Store the selected time slot details
//   };

//   // Group the appointments by date for easier access
//   const groupAppointmentsByDate = () => {
//     const grouped = {};
//     appointmentData?.forEach((data) => {
//       const formattedDate = formatDate(data.selectDate);
//       if (!grouped[formattedDate]) {
//         grouped[formattedDate] = [];
//       }
//       grouped[formattedDate].push(data);
//     });
//     return grouped;
//   };

//   const groupedAppointments = groupAppointmentsByDate();
//   // Render slots with price and time
//   const renderSlots = (slots) => {
//     return slots.map((slot, index) => (
//       <div
//         key={index}

//         onClick={() => handleSlotSelect(slot)}
//         className="slot-item p-4 bg-white rounded-lg border shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer w-full mx-auto mb-6"
//       >
//         <div className="flex justify-between items-center">
//           <div>
//             <span className="text-lg font-semibold text-gray-700">
//               {slot.startTime}:00 - {slot.endTime}:00
//             </span>
//             <div className="text-green-500 text-lg font-semibold">
//               {slot.doctorCharge} USD
//             </div>
//           </div>
//           {selectedTime?.startTime === slot.startTime && (
//             <GrRadialSelected size={24} color="#00768A" />
//           )}
//         </div>
//       </div>
//     ));
//   };
//   const getSlotsForDate = (selectedDate) => {
//     const formattedSelectedDate = formatDate(selectedDate); // Ensure it's in the same format as in slot data

//     // Filter the slots for the selected date from the appointment data
//     const filteredSlots = appointmentData?.flatMap((data) => {
//       // Combine both online and offline slots
//       return [
//         ...data.onlineSlots,
//         ...data.offlineSlots,
//       ].filter((slot) => {
//         const slotDate = new Date(slot.date); // Assuming each slot has a date property
//         return formatDate(slotDate) === formattedSelectedDate;
//       });
//     });

//     return filteredSlots || [];
//   };

//   const handleBooking = () => {
//     if (selectedTime && formdata.name && formdata.reason) {
//       alert(
//         `Booking successful for ${selectedTime.startTime}:00 - ${selectedTime.endTime}:00`
//       );
//       // You can add the actual booking logic here, like calling an API to save the booking.
//     } else {
//       alert("Please Field the required fields");
//     }

//     console.log(formdata);
//   };

//   // if (loading) {
//   //   return (
//   //     <div className="flex justify-center items-center h-screen">
//   //       <p className="text-xl">Loading...</p>
//   //     </div>
//   //   );

//   // }

//   function isValidDate(dateString) {
//     const date = new Date(dateString);
//     return !isNaN(date.getTime());
//   }

//   function formatDate(dateString) {
//     const date = new Date(dateString);
//     return date.toLocaleString("en-US", {
//       weekday: "long",
//       month: "long",
//       day: "numeric",
//       year: "numeric",
//     });
//   }

//   // Helper function to format the date
//   function formatShortDate(date) {
//     const options = {
//       weekday: "short",
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//     };
//     return new Date(date).toLocaleDateString("en-US", options);
//   }

//   return (
//     <div className="flex md:flex-row flex-col justify-center gap-8" style={{border:"1px solid red"}}>
//       {console.log(IndiProfile)}
//       <div className="flex flex-wrap flex-col items-center max-w-2xl  p-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//           Book an Appointment with Dr. {IndiProfile.userData.name}
//         </h2>
//         {/* Mode Selection */}
//         <div className="w-full mb-6 border border-gray-300 rounded-lg p-6 bg-white shadow-lg">
//           {/* Mode Selection */}
//           <div className="flex justify-center gap-4 mb-6">
//             <button
//               onClick={() => handleModeChange("online")}
//               className={`px-6 py-2 rounded-lg text-lg transition-all duration-200 ${
//                 selectedMode === "online"
//                   ? "bg-[#00768A] text-white shadow-md"
//                   : "bg-gray-200 text-gray-800 hover:bg-[#00768A] hover:text-white hover:shadow-lg"
//               }`}
//             >
//               Online Slots
//             </button>
//             <button
//               onClick={() => handleModeChange("offline")}
//               className={`px-6 py-2 rounded-lg text-lg transition-all duration-200 ${
//                 selectedMode === "offline"
//                   ? "bg-[#00768A] text-white shadow-md"
//                   : "bg-gray-200 text-gray-800 hover:bg-[#00768A] hover:text-white hover:shadow-lg"
//               }`}
//             >
//               Offline Slots
//             </button>
//             <button
//               onClick={() => handleModeChange("both")}
//               className={`px-6 py-2 rounded-lg text-lg transition-all duration-200 ${
//                 selectedMode === "both"
//                   ? "bg-[#00768A] text-white shadow-md"
//                   : "bg-gray-200 text-gray-800 hover:bg-[#00768A] hover:text-white hover:shadow-lg"
//               }`}
//             >
//               Both
//             </button>
//           </div>

//           {/* Display Available Dates */}
//           <div className="grid grid-cols-3 gap-5">
//             {appointmentData && appointmentData.length > 0 ? (
//               appointmentData.map((data, index) => {
//                 const formattedDate = formatShortDate(data.selectDate); // Using the helper function here

//                 return (
//                   <div key={index}>
//                     {/* Date Clickable Item */}
//                     <div className="flex">
//                       <h3
//                         onClick={() => handleDateSelect(formattedDate)}
//                         className="text-xl font-semibold text-gray-800 mt-2 bg-[#f0f8ff] px-4 py-2 rounded-lg shadow-md cursor-pointer transition-all duration-200 hover:bg-[#00768A] hover:text-white"
//                       >
//                         {formattedDate} {/* Display the formatted short date */}
//                       </h3>
//                     </div>

//                     {/* Slot List Container */}

//                     <div className="mt-4 p-4 bg-white rounded-lg">
//                       {/* Filter Slots Based on Selected Mode and Date */}
//                       {selectedDate === formattedDate && ( // Only show slots if the date matches the selected date
//                         <>
//                           {selectedMode === "online" && data.onlineSlots && (
//                             <div>
//                               <h3 className="text-lg font-bold mt-4 text-gray-800">
//                                 Online Slots
//                               </h3>
//                               <div className="flex flex-wrap gap-6 mt-3 justify-start">
//                                 {/* Flexbox layout for online slots, wrapping when necessary */}
//                                 {renderSlots(
//                                   getFilteredSlots(
//                                     data.onlineSlots,
//                                     selectedDate
//                                   )
//                                 )}
//                               </div>
//                             </div>
//                           )}

//                           {selectedMode === "offline" && data.offlineSlots && (
//                             <>
//                               <h3 className="text-lg font-bold mt-4 text-gray-800">
//                                 Offline Slots
//                               </h3>
//                               <div className="flex flex-wrap gap-6 mt-3 justify-start">
//                                 {/* Flexbox layout for offline slots, wrapping when necessary */}
//                                 {renderSlots(
//                                   getFilteredSlots(
//                                     data.offlineSlots,
//                                     selectedDate
//                                   )
//                                 )}
//                               </div>
//                             </>
//                           )}

//                           {selectedMode === "both" && (
//                             <div>
//                               {data.onlineSlots && (
//                                 <>
//                                   <h3 className="text-lg font-bold mt-4 text-gray-800">
//                                     Online Slots
//                                   </h3>
//                                   <div className="flex flex-wrap gap-6 mt-3 justify-start">
//                                     {/* Flexbox layout for online slots, wrapping when necessary */}
//                                     {renderSlots(
//                                       getFilteredSlots(
//                                         data.onlineSlots,
//                                         selectedDate
//                                       )
//                                     )}
//                                   </div>
//                                 </>
//                               )}

//                               {data.offlineSlots && (
//                                 <>
//                                   <h3 className="text-lg font-bold mt-4 text-gray-800">
//                                     Offline Slots
//                                   </h3>
//                                   <div className="flex flex-wrap gap-6 mt-3 justify-start">
//                                     {/* Flexbox layout for offline slots, wrapping when necessary */}
//                                     {renderSlots(
//                                       getFilteredSlots(
//                                         data.offlineSlots,
//                                         selectedDate
//                                       )
//                                     )}
//                                   </div>
//                                 </>
//                               )}
//                             </div>
//                           )}
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 );
//               })
//             ) : (
//               <h3 className="text-xl font-semibold text-gray-800 mt-2 bg-[#f0f8ff] px-4 py-2 rounded-lg shadow-md">
//                 No Slots are Available for this Doctor
//               </h3>
//             )}

//             {/* Back Button if No Appointments */}
//             {appointmentData && appointmentData.length === 0 && (
//               <Link to="/drs-profile">
//                 <button className="mt-6 px-6 py-2 rounded-lg text-lg transition-all duration-200 bg-red-600 text-white focus:outline-none hover:bg-red-700">
//                   Back
//                 </button>
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* Form Section */}
//       {selectedTime ? (
//         <form
//           onSubmit={handleBooking}
//           className="flex flex-col max-w-2xl md:w-[60%]   p-6 bg-white shadow-lg rounded-lg"
//         >
//           {/* Name Input */}
//           <div className="mb-4">
//             <label
//               htmlFor="name"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               Name:
//             </label>
//             <input
//               id="name"
//               name="name"
//               required
//               type="text"
//               onChange={handleChange}
//               placeholder="Enter Your Name"
//               className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
//             />
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="gender"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               Gender:
//             </label>
//             <select
//               className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
//               name="gender"
//               id=""
//               onChange={handleChange}
//             >
//               <option value="male">Male</option>
//               <option value="female">Female</option>
//               <option value="other">Other</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label
//               htmlFor="dob"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               Date of birth (DOB):
//             </label>
//             <input
//               id="dob"
//               name="dob"
//               type="date"
//               onChange={handleChange}
//               className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
//             />
//           </div>

//           {/* Reason for Appointment */}
//           <div className="mb-4">
//             <label
//               htmlFor="reason"
//               className="block text-sm font-semibold text-gray-700"
//             >
//               Reason for Appointment:
//             </label>
//             <textarea
//               id="reason"
//               required
//               name="reason"
//               onChange={handleChange}
//               rows="4"
//               placeholder="Please describe the reason for your visit"
//               className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
//             ></textarea>
//           </div>

//           {/* Booking Button */}
//           <div className="mt-6 w-full">
//             <button
//               onClick={onNext}
//               className="px-6 py-3 bg-[#00768A] text-white rounded-lg w-full text-lg transition-all duration-300 hover:bg-[#00768A]"
//             >
//               {selectedTime
//                 ? `Book Appointment for ${selectedTime.startTime}:00 - ${selectedTime.endTime}:00`
//                 : "Select a Slot"}
//             </button>
//           </div>
//         </form>
//       ) : null}
//     </div>
//   );
// };

// export default DrAppointmentBooking;
