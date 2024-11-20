import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaCheckCircle } from "react-icons/fa";

function DrAppointmentBooking({ IndiProfile, onNext }) {
  const { doctorAvailability } = IndiProfile;
  const [selectedDate, setSelectedDate] = useState(null);
  const [filter, setFilter] = useState("both");
  const [selectedSlot, setSelectedSlot] = useState(null);


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
    )
  }

  const settings = {
    dots: false,
    infinite: false,
    slidesToShow: 5,
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
        return [...(availability.onlineSlots || []), ...(availability.offlineSlots || [])];
      default:
        return [];
    }
  };

  // Render individual slot
  const renderSlot = (slot) => (
    
    <div
      key={slot._id}
      className={`p-4 relative border rounded-lg transition-transform ${slot.isBooked
        ? "bg-red-100 text-gray-700 cursor-not-allowed"
        : "bg-green-100 hover:scale-105" 
        }`}
    >
      <FaCheckCircle className= {selectedSlot?._id === slot?._id ? "block absolute -top-2 right-0 text-xl text-green-800" : "hidden"}/>
      <p className="text-sm">
        <span className="font-semibold font-serif ">Time:</span> {slot.startTime > 12 ? (slot.startTime) - 12  :slot.startTime} {slot.startTime >= 12 ? "PM" : "AM"} -  { slot.endTime > 12 ? (slot.endTime)-12  : slot.endTime }  {slot.endTime >= 12 ? "PM" : "AM"}
      </p>
      <p className="text-sm">
        <span className="font-medium">Charge:</span> ₹ {slot.doctorCharge}
      </p>
      <button
        disabled={slot.isBooked}
        onClick={() => setSelectedSlot(slot)}
        className={`mt-4 w-full px-4 py-2 rounded-lg font-medium transition ${slot.isBooked
          ? "bg-gray-400 text-white"
          : selectedSlot?._id === slot?._id ? "bg-green-700 text-white font-semibold shadow-xl"
          : "bg-[#00768A] text-white "
          }`}
      >
        {slot.isBooked ? "Slot is booked" : selectedSlot?._id === slot?._id ? "Selected" : "Book" }
      </button>
    </div>
  );

  // Handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const bookingDetails = Object.fromEntries(formData.entries());
    alert("Booking confirmed!");
    setSelectedSlot(null);
  };

  return (
    <div className="flex md:flex-row flex-col gap-5 max-w-[1200px] justify-between">
      {/* Header Section */}
      <div className="md:max-w-[50vw] w-[100%] mx-auto p-8 bg-white shadow-lg rounded-lg ">
        <h2 className="text-2xl font-bold text-center mb-8 text-gray-700">
          Book Your Appointment
        </h2>

        {/* Slot Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-10">
          {["online", "offline", "both"].map((type) => (
            <button
              key={type}
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

        {/* Date Selection */}
        <Slider {...settings} className="flex flex-row items-center">
          {doctorAvailability.map((availability) => (
            <div
              key={availability._id}
              className={`w-[100px] p-4 text-center rounded-lg cursor-pointer ${selectedDate === availability.selectDate
                ? "bg-[#00768A] text-white"
                : "bg-gray-200 hover:bg-blue-100"
                }`}
              onClick={() => setSelectedDate(availability.selectDate)}
            >
              <p className={`text-sm font-medium text-gray-700 ${selectedDate === availability.selectDate
                ? "bg-[#00768A] text-white"
                : "bg-gray-200 hover:bg-blue-100"
                }`}>
                {new Date(availability.selectDate).toLocaleDateString("en-US", { month: "short" })}
              </p>
              <p className="text-lg font-bold">
                {new Date(availability.selectDate).toLocaleDateString("en-US", { day: "numeric" })}
              </p>
            </div>
          ))}
        </Slider>


        {/* Slots Section */}
        <div className="space-y-6">
          {doctorAvailability
            .filter(
              (availability) =>
                getFilteredSlots(availability).length > 0 &&
                new Date(availability.selectDate).toDateString() ===
                new Date(selectedDate).toDateString()
            )
            .map((availability) => (
              <div
                key={availability._id}
                className="p-6 border rounded-lg shadow-sm hover:shadow-lg transition-shadow"
              >
                <p className="font-bold text-lg text-[#00768A] mb-2">
                  {new Date(availability.selectDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <p className="text-sm font-semibold text-gray-600 bg-blue-100 px-3 py-1 rounded-lg inline-block">
                  Showing {filter} Slots
                </p>
                <div className="grid grid-cols-2 gap-4 mt-4 ">
                  {getFilteredSlots(availability).map(renderSlot)}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Booking Form */}
      {selectedSlot && (
        <form
          onSubmit={handleFormSubmit}
          className="flex flex-col max-w-3xl w-[450px] p-6 bg-white shadow-lg rounded-lg"
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
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
            >
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
              name="dob"
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
              name="reason"
              rows="4"
              required
              placeholder="Please describe the reason for your visit"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
            ></textarea>
          </div>

          <button
            onClick={onNext}
            className="mt-6 w-full px-6 py-3 bg-[#00768A] text-white rounded-lg text-lg transition-all duration-300 hover:bg-[#005f6e]"
          >
            Confirm Booking
          </button>
        </form>
      )}
    </div>
  );
}

export default DrAppointmentBooking;
