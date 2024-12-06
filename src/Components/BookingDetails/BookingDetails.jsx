import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookingDetails = () => {
  const [bookingDetailsData, setBookingDetailsData] = useState();
  const { bid } = useParams();

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const bookings = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/doctor/history/${bid}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setBookingDetailsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bookings();
  }, []);

  console.log(bookingDetailsData);

  const convertToIST = (utcDate) => {
    if (!utcDate) return "--"; // Return fallback if date is invalid or missing
    const date = new Date(utcDate);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      ...options,
    });
  };

  function formatTime(time) {
    const [hours, minutes] = time?.split(":").map(Number); // Split and convert to numbers
    const period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format (handle 0 and 12)
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`; // Pad minutes with 0 if needed
  }

  return (
    <div className="mt-5">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Patient Details
        </h2>
        {bookingDetailsData?.data?.patientDetails && (
          <div className="grid sm:grid-cols-2 gap-4 bg-gray-100 p-5">
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">Name:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.patientDetails.name}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">
                Reason of Appointment:
              </span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.patientDetails.reasonForAppointment}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">Gender:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.patientDetails.gender}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">Date of Birth:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.patientDetails.dateOfBirth}
              </span>
            </div>
          </div>
        )}
        <div className="bg-gray-300 bg-opacity-80 h-[1px] max-w-4xl mx-auto"></div>
        {/* available time for bookings */}
        {bookingDetailsData?.data?.specificSlotData && (
          <div className="grid sm:grid-cols-2 gap-4 bg-gray-100 p-5">
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">Start time:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.specificSlotData.startTime}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">End time:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.specificSlotData.endTime}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">Doctor Charge:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.specificSlotData.doctorCharge}
              </span>
            </div>
          </div>
        )}
        {/* Make Prescription */}
        {/* {bookingDetailsData?.data} */}
        <div className="flex flex-col w-full sm:mt-5">
          <Link to={`/prescription-maker/${bid}`}>
            <button className="bg-[#944120] hover:bg-[#6e341d] transition-all duration-500 ease-in-out p-2 text-white rounded-md">
              Make Prescription
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
