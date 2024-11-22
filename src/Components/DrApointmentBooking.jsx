import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";

function DrAppointmentBooking({ IndiProfile, onNext }) {
  const { doctorAvailability } = IndiProfile;
  const [selectedDate, setSelectedDate] = useState(null);
  const [filter, setFilter] = useState("both");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    reasonForAppointment: ""
  })

  const bookingSlot = async (e) => {
    e.preventDefault();
    try {
      const id = localStorage.getItem("Id");
      const token = localStorage.getItem("token")

      const response = await axios.post(
        `https://api.assetorix.com/ah/api/v1/dc/user/booking/${IndiProfile._id}`,
        {
          selectMode: filter,
          consultation_formats: "videoCall",
          patientDetails: patientDetails,
          specificSlot: selectedSlot._id,
          availabletimeSlots: selectedDate._id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );

      console.log("Response: ", response);

      if (response.status === 201) {
        toast.success("Slot Data saved Successfully!");
        onNext();
      }
    } catch (error) {
      console.error("Error booking slot: ", error);
      console.log("Error Details: ", error.response);

      const errorMessage =
        error.response?.data?.message || "Failed to book slot. Please try again.";
      toast.error(errorMessage);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatientDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const SampleNextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} bg-[#00768A] text-white rounded-full p-3 shadow-lg hover:bg-gray-400`}
        style={{ ...style, right: "-25px", zIndex: 2 }}
        onClick={onClick}
      >
        ➡️
      </div>
    );
  };

  console.log(IndiProfile);

  const SamplePrevArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} bg-[#00768A] text-white rounded-full p-3 shadow-lg hover:bg-gray-400`}
        style={{ ...style, left: "-25px", zIndex: 2 }}
        onClick={onClick}
      >
        ⬅️
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: Math.min(5, doctorAvailability.length), // Show up to 5 or less if data is fewer
    slidesToScroll: 1,
    autoplay: false,
    cssEase: "linear",
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };


  // Filter slots based on the selected filter
  const getFilteredSlots = (availability) => {
    switch (filter) {
      case "online":
        return availability.onlineSlots || [];
      case "offline":
        return availability.offlineSlots || [];
      case "both":
        return [
          ...(availability.onlineSlots || []),
          ...(availability.offlineSlots || []),
        ];
      default:
        return [];
    }
  };

  // Render individual slot
  const renderSlot = (slot) => (
    <div
      key={slot._id}
      className={`p-4 relative border rounded-lg transition-transform ${
        slot.isBooked
          ? "bg-red-100 text-gray-700 cursor-not-allowed"
          : "bg-green-100 hover:scale-105"
      }`}
    >
      <FaCheckCircle
        className={
          selectedSlot?._id === slot?._id
            ? "block absolute -top-2 right-0 text-xl text-green-800"
            : "hidden"
        }
      />
      <p className="text-sm">
        <span className="font-semibold font-serif ">Time:</span>{" "}
        {slot.startTime > 12 ? slot.startTime - 12 : slot.startTime}{" "}
        {slot.startTime >= 12 ? "PM" : "AM"} -{" "}
        {slot.endTime > 12 ? slot.endTime - 12 : slot.endTime}{" "}
        {slot.endTime >= 12 ? "PM" : "AM"}

      </p>
      <p className="text-sm">
        <span className="font-medium">Charge:</span> ₹ {slot.doctorCharge}
      </p>
      <button
        disabled={slot.isBooked}
        onClick={() => setSelectedSlot(slot)}
        className={`mt-4 w-full px-4 py-2 rounded-lg font-medium transition ${
          slot.isBooked
            ? "bg-gray-400 text-white"
            : selectedSlot?._id === slot?._id
            ? "bg-green-700 text-white font-semibold shadow-xl"
            : "bg-[#00768A] text-white "
        }`}
      >
        {slot.isBooked
          ? "Slot is booked"
          : selectedSlot?._id === slot?._id
          ? "Selected"
          : "Book"}

      </button>
    </div>
  );



  return (
    <div className="flex flex-col md:flex-row gap-8  mx-auto md:p-4">
      {/* Header Section */}
      <div className="md:w-[600px] w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Book Your Appointment
        </h2>

        {/* Slot Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          {["online", "offline", "both"].map((type) => (
            <button
              key={type}

              type="button"
              className={`px-6 py-2 text-sm font-medium rounded-lg transition-all ${filter === type
                ? "bg-[#00768A] text-white shadow-md"
                : "bg-gray-200 hover:bg-blue-100"
                }`}
              onClick={() => setFilter(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>


        {/* Date Slider */}
        {doctorAvailability.length > 1 ? (
          <Slider {...settings} className="flex items-center">
            {doctorAvailability.map((availability, index) => (
              <div
                key={index}
                className={`w-[90px] md:w-[100px] mx-auto text-center p-3 rounded-lg cursor-pointer transition-all ${selectedDate?.selectDate === availability?.selectDate
                  ? "bg-[#00768A] text-white"
                  : "bg-gray-200 hover:bg-blue-100"
                  }`}
                onClick={() => setSelectedDate(availability)}
              >
                <p className="text-sm font-medium">
                  {new Date(availability?.selectDate).toLocaleDateString("en-US", { month: "short" })}
                </p>
                <p className="text-lg font-bold">
                  {new Date(availability?.selectDate).toLocaleDateString("en-US", { day: "numeric" })}
                </p>
              </div>
            ))}
          </Slider>
        ) : (
          <div className="text-center text-gray-500 mt-4">No availability to display</div>
        )}


        {/* Slots Section */}
        <div className="mt-8 space-y-6">
          {doctorAvailability
            .filter(
              (availability) =>
                getFilteredSlots(availability).length > 0 &&
                new Date(availability?.selectDate).toDateString() ===
                new Date(selectedDate?.selectDate).toDateString()
            )
            .map((availability) => (
              <div
                key={availability._id}
                className="p-4 border rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <p className="font-bold text-lg text-[#00768A] mb-2">

                  {new Date(availability?.selectDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm font-semibold text-gray-600 bg-blue-100 px-3 py-1 rounded-lg inline-block">
                  Showing {filter} Slots
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                  {getFilteredSlots(availability).map(renderSlot)}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Booking Form */}
      {selectedSlot && (
        <div className="md:w-[40%] mx-auto w-[90vw] bg-white shadow-lg rounded-lg md:p-6">
          <form
            onSubmit={bookingSlot}
            className="flex flex-col max-w-3xl md:w-[450px] p-6 bg-white shadow-lg rounded-lg"
          >
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
                value={patientDetails.name}
                onChange={handleChange}
                required
                type="text"
                placeholder="Enter Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="gender" className="block text-sm font-semibold text-gray-700">
                Gender:
              </label>
              <select
                name="gender"
                value={patientDetails.gender}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="dob" className="block text-sm font-semibold text-gray-700">
                Date of Birth:
              </label>
              <input
                id="dob"
                name="dateOfBirth"
                value={patientDetails.dateOfBirth}
                onChange={handleChange}
                type="date"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
              />
            </div>


            <div className="mb-4">
              <label
                htmlFor="reason"
                className="block text-sm font-semibold text-gray-700"
              >
                Reason for Appointment:
              </label>
              <textarea
                id="reason"
                name="reasonForAppointment"
                value={patientDetails.reasonForAppointment}
                onChange={handleChange}
                rows="4"
                required
                placeholder="Please describe the reason for your visit"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
              ></textarea>
            </div>

            <button
              type="submit"
                onClick={bookingSlot}
              className="mt-6 w-full px-6 py-3 bg-[#00768A] text-white rounded-lg text-lg transition-all duration-300 hover:bg-[#005f6e]"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </div>

  );
}

export default DrAppointmentBooking;
