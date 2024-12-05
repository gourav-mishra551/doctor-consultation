import React, { useState, useEffect } from "react";
import { FaCheckCircle } from "react-icons/fa";
import toast from "react-hot-toast";
import axios from "axios";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

function DrAppointmentBooking({ IndiProfile, onNext }) {
  const { doctorAvailability } = IndiProfile;
  const [selectedDate, setSelectedDate] = useState(null);
  const [filter, setFilter] = useState("both");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loader, setLoader] = useState(false)
  const [patientDetails, setPatientDetails] = useState({
    name: "",
    gender: "",
    dateOfBirth: "",
    reasonForAppointment: "",
  });

  const token = localStorage.getItem("token");
  const idUser = localStorage.getItem("id");
  const userData = async () => {
    setLoader(true)
    try {
      const res = await axios.get(`https://api.assetorix.com/ah/api/v1/user`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: idUser,
          },
        }
      )
      setPatientDetails((prevState) => ({
        ...prevState,
        name: res.data.data.name,
        gender: res.data.data.gender,
        dateOfBirth: res.data.data.dateOfBirth,
      }));
    } catch (error) {
      console.error("Error fetching user data:", error)
    } finally {
      setLoader(false)
    }
  }

  const sliderRef = useState(null);

  useEffect(() => {
    userData()
  }, []);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -100, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 100, behavior: "smooth" });
    }
  };

  const bookingSlot = async (e) => {
    e.preventDefault();

    // Validate patient details
    if (
      !patientDetails.name.trim() ||
      !patientDetails.gender.trim() ||
      !patientDetails.dateOfBirth.trim() ||
      !patientDetails.reasonForAppointment.trim()
    ) {
      toast.error(
        "Please fill in all patient details before booking the slot."
      );
      return; // Exit the function without making the API call
    }

    try {
      const id = localStorage.getItem("Id");
      const token = localStorage.getItem("token");

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

      if (response.status === 201) {
        toast.success("Slot Data saved Successfully!");
        onNext();
      }
    } catch (error) {
      console.error("Error booking slot: ", error);

      const errorMessage =
        error.response?.data?.message ||
        "Failed to book slot. Please try again.";
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

  function formatTime(time) {
    const [hours, minutes] = time.split(":").map(Number); // Split and convert to numbers
    const period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format (handle 0 and 12)
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`; // Pad minutes with 0 if needed
  }

  // Render individual slot
  const renderSlot = (slot) => (
    <div
      key={slot._id}
      className={`p-4 relative border rounded-lg transition-transform ${slot.isBooked
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
        <span className="font-semibold font-serif">Time:</span>{" "}
        {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
      </p>

      <p className="text-sm">
        <span className="font-medium">Charge:</span> ₹ {slot.doctorCharge}
      </p>
      <button
        disabled={slot.isBooked}
        onClick={() => setSelectedSlot(slot)}
        className={`mt-4 w-full px-4 py-2 rounded-lg font-medium transition ${slot.isBooked
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

  if (loader) {
    return <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-500">Loading...</div>
  }

  return (
    <div className="flex flex-col lg:flex-row md:flex-col  border-2 sm:flex-row justify-center gap-8 sm:mx-auto p-4 sm:max-w-7xl">
      {/* Header Section */}
      <div className="sm:w-full md:max-w-[600px] max-w-[340px] bg-white sm:shadow-lg rounded-lg sm:p-6 px-6 sm:ml-0 -ml-4">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          Book Your Appointment
        </h2>

        {/* Slot Filter Buttons */}
        <div className="flex justify-center space-x-4 mb-8">
          {["online", "offline", "both"].map((type) => (
            <button
              key={type}
              type="button"
              className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${filter === type
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
          <div className="relative">
            <button
              onClick={scrollLeft}
              className="absolute flex justify-center items-center z-40 h-10 w-10 focus:outline-none top-1/2 -left-4 transform -translate-y-1/2 bg-transparent border-2 border-gray-300 text-black rounded-full shadow-lg hover:bg-gray-100 transition-all"
            >
              <MdKeyboardArrowLeft className="text-2xl" />
            </button>

            <div
              ref={sliderRef}
              className="flex space-x-4 p-4 bg-blue-50 rounded-md overflow-hidden "
            >
              {doctorAvailability.map((availability, index) => (
                <div
                  key={index}
                  className={`w-24 sm:mx-auto text-center p-4 rounded-lg cursor-pointer ${selectedDate?.selectDate === availability?.selectDate
                      ? "bg-[#00768A] text-white scale-105 shadow-lg"
                      : "bg-gray-200 hover:bg-blue-100 hover:scale-105"
                    }`}
                  onClick={() => setSelectedDate(availability)}
                >
                  <p className={`text-sm font-medium`}>
                    {new Date(availability?.selectDate).toLocaleDateString(
                      "en-US",
                      {
                        month: "short",
                      }
                    )}
                  </p>
                  <p className={`text-lg font-bold`}>
                    {new Date(availability?.selectDate).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={scrollRight}
              className="absolute flex justify-center items-center z-40 h-10 w-10 focus:outline-none top-1/2 -right-4 transform -translate-y-1/2 bg-transparent text-black border-2 border-gray-300 rounded-full shadow-lg hover:bg-gray-100 transition-all"
            >
              <MdKeyboardArrowRight className="text-2xl" />
            </button>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-4">
            No availability to display
          </div>
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
                  {new Date(availability?.selectDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                    }
                  )}
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
        <form
          onSubmit={bookingSlot}
          className="flex flex-col w-full md:w-[450px] p-6 bg-white shadow-lg rounded-lg"
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-semibold text-gray-700"
            >
              Name: <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              name="name"
              value={patientDetails.name}
              onChange={(e) => {
                const regex = /^[a-zA-Z\s]*$/; // Allows only letters and spaces
                if (regex.test(e.target.value)) {
                  handleChange(e); // Update state only if the input is valid
                }
              }}
              required
              type="text"
              placeholder="Enter Your Name"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-sm font-semibold text-gray-700"
            >
              Gender: <span className="text-red-500">*</span>
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
            <label
              htmlFor="dob"
              className="block text-sm font-semibold text-gray-700"
            >
              Date of Birth: <span className="text-red-500">*</span>
            </label>
            <input
              id="dob"
              name="dateOfBirth"
              value={patientDetails.dateOfBirth}
              onChange={handleChange}
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="reason"
              className="block text-sm font-semibold text-gray-700"
            >
              Reason for Appointment: <span className="text-red-500">*</span>
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
