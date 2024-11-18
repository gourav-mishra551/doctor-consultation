import { useState, useEffect } from "react";
import { GrRadialSelected } from "react-icons/gr";

const DrAppointmentBooking = ({ IndiProfile, onNext }) => {
  const [selectedMode, setSelectedMode] = useState("both"); // Default to both
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointmentData, setAppointmentData] = useState(null);

  const [formdata, setformData] = useState({
    name: "",
    gender: '',
    dob: "",
    reason: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  // Fetch doctor's availability data
  useEffect(() => {
    if (IndiProfile && IndiProfile.doctorAvailability) {
      setAppointmentData(IndiProfile.doctorAvailability);
      setLoading(false);
    }
  }, [IndiProfile]);

  const handleModeChange = (mode) => {
    setSelectedMode(mode); // Set the selected mode: "online", "offline", "both"
  };

  const handleSlotSelect = (slot) => {
    setSelectedDate(slot.startTime); // Save the selected time slot
    setSelectedTime(slot); // Store the selected time slot details
  };

  const renderSlots = (slots) => {
    return slots.map((slot) => {
      const slotTime = `${slot.startTime}:00 - ${slot.endTime}:00`;
      const slotDate = new Date(appointmentData.selectDate);
      const dayName = slotDate.toLocaleString("en-US", { weekday: "short" });
      const formattedDate = slotDate.toLocaleDateString("en-US");

      return (
        <div
          key={slot._id}
          className={`slot relative p-4 border rounded-lg cursor-pointer mb-4 transition-all ${selectedTime?._id === slot._id ? " bg-gray-200  shadow-lg bg-gradient-to-r from-[#ecfcfc] via-[#ffff] to-[#75c5cf] border-4 border-[#00768A]" : "bg-gradient-to-r from-[#E3FDFD] via-[#fcfcfc] to-[#87dce7]"
            }`}
          onClick={() => handleSlotSelect(slot)}
        >
          <p className="font-semibold text-[15.5px] bg-[#00768A] text-white w-max rounded-md p-3">
            {dayName}, {formattedDate}
          </p>
          <p className="text-md text-black">{slotTime}</p>
          <p className="text-sm text-lime-800 font-semibold">Price: ₹{slot.doctorCharge}</p>
          <p className={selectedTime?._id === slot._id ? "absolute right-1 top-1 text-green-800 font-bold" : "absolute right-0 top-0 text-green-400 font-bold hidden "}> <GrRadialSelected size={20} /></p>
        </div>
      );
    });
  };

  const handleBooking = () => {
    if (selectedTime && formdata.name && formdata.reason) {
      alert(
        `Booking successful for ${selectedTime.startTime}:00 - ${selectedTime.endTime}:00`
      );
      // You can add the actual booking logic here, like calling an API to save the booking.
    } else {
      alert("Please Field the required fields");
    }

    console.log(formdata);
  };

  // if (loading) {
  //   return (
  //     <div className="flex justify-center items-center h-screen">
  //       <p className="text-xl">Loading...</p>
  //     </div>
  //   );


  // }

  return (
    <div className="flex md:flex-row flex-col justify-center gap-8">
      <div className="flex flex-wrap flex-col items-center max-w-2xl  p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Book an Appointment with Dr. {IndiProfile.userData.name}
        </h2>

        {/* Mode Selection Buttons */}
        <div className="flex justify-center gap-5 mb-6">
          <button
            onClick={() => handleModeChange("online")}
            className={`px-6 py-2 rounded-lg text-lg transition-all duration-200 ${selectedMode === "online"
                ? "bg-[#00768A] text-white"
                : "bg-gray-200"
              }`}
          >
            Online Slots
          </button>
          <button
            onClick={() => handleModeChange("offline")}
            className={`px-6 py-2 rounded-lg text-lg transition-all duration-200 ${selectedMode === "offline"
                ? "bg-[#00768A] text-white"
                : "bg-gray-200"
              }`}
          >
            Offline Slots
          </button>
          <button
            onClick={() => handleModeChange("both")}
            className={`px-6 py-2 rounded-lg text-lg transition-all duration-200 ${selectedMode === "both" ? "bg-[#00768A] text-white" : "bg-gray-200"
              }`}
          >
            Both
          </button>
        </div>

        {/* Date and Day Display */}
        <div className="w-full mb-6">
          <h3 className="text-xl font-semibold text-gray-800">
            {new Date(appointmentData?.selectDate).toLocaleString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </h3>
        </div>

        {/* Offline Slots Section */}
        {selectedMode === "offline" || selectedMode === "both" ? (
          <div className="w-full mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Offline Slots
            </h3>
            <div className="slots-list">
              {renderSlots(appointmentData?.offlineSlots || [])}
            </div>
          </div>
        ) : null}

        {/* Online Slots Section */}
        {selectedMode === "online" || selectedMode === "both" ? (
          <div className="w-full mb-6">
            <h3 className="text-lg font-bold mb-4 text-gray-800">
              Online Slots
            </h3>
            <div className="slots-list">
              {renderSlots(appointmentData?.onlineSlots || [])}
            </div>
          </div>
        ) : null}
      </div>

      {/* Form Section */}
      {selectedTime ? (
        <form
          onSubmit={handleBooking}
          className="flex flex-col max-w-2xl md:w-[60%]   p-6 bg-white shadow-lg rounded-lg">

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
            <select className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-[#00768A]" name="gender" id="" onChange={handleChange}>
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
              {selectedTime
                ? `Book Appointment for ${selectedTime.startTime}:00 - ${selectedTime.endTime}:00`
                : "Select a Slot"}
            </button>
          </div>

        </form>
      ) : null}
    </div>
  );
};

export default DrAppointmentBooking;
