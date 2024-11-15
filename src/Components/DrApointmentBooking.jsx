import { useState, useEffect } from "react";

const DrAppointmentBooking = ({ IndiProfile }) => {
  const [selectedMode, setSelectedMode] = useState("both"); // Default to both
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [appointmentData, setAppointmentData] = useState(null);

  const [formdata, setformData] = useState({
    name: "",
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
          className={`slot p-4 border rounded-lg cursor-pointer mb-4 transition-all ${
            selectedTime?._id === slot._id ? "bg-blue-100" : "bg-white"
          }`}
          onClick={() => handleSlotSelect(slot)}
        >
          <p className="font-semibold text-lg">
            {dayName}, {formattedDate}
          </p>
          <p className="text-md">{slotTime}</p>
          <p className="text-sm text-gray-500">Price: ₹{slot.doctorCharge}</p>
        </div>
      );
    });
  };

  const handleBooking = () => {
    if (selectedTime) {
      alert(
        `Booking successful for ${selectedTime.startTime}:00 - ${selectedTime.endTime}:00`
      );
      // You can add the actual booking logic here, like calling an API to save the booking.
    } else {
      alert("Please select a time slot first.");
    }

    console.log(formdata);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Loading...</p>
      </div>
    );
    
    
  }

  return (
    <div className="flex justify-center gap-8">
      <div className="flex flex-col items-center max-w-2xl  p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
          Book an Appointment with Dr. {IndiProfile.userData.name}
        </h2>

        {/* Mode Selection Buttons */}
        <div className="flex justify-center gap-5 mb-6">
          <button
            onClick={() => handleModeChange("online")}
            className={`px-6 py-2 rounded-lg text-lg transition-all duration-200 ${
              selectedMode === "online"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Online Slots
          </button>
          <button
            onClick={() => handleModeChange("offline")}
            className={`px-6 py-2 rounded-lg text-lg transition-all duration-200 ${
              selectedMode === "offline"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Offline Slots
          </button>
          <button
            onClick={() => handleModeChange("both")}
            className={`px-6 py-2 rounded-lg text-lg transition-all duration-200 ${
              selectedMode === "both" ? "bg-blue-500 text-white" : "bg-gray-200"
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
        <div className="flex flex-col max-w-2xl w-[50%]  p-6 bg-white shadow-lg rounded-lg">
        
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
                type="text"
                onChange={handleChange}
                placeholder="Enter Your Name"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                name="reason"
                onChange={handleChange}
                rows="4"
                placeholder="Please describe the reason for your visit"
                className="w-full p-3 border border-gray-300 rounded-lg mt-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            {/* Booking Button */}
            <div className="mt-6 w-full">
              <button
                onClick={handleBooking}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg w-full text-lg transition-all duration-300 hover:bg-blue-600"
              >
                {selectedTime
                  ? `Book Appointment for ${selectedTime.startTime}:00 - ${selectedTime.endTime}:00`
                  : "Select a Slot"}
              </button>
            </div>
          
        </div>
      ) : null}
    </div>
  );
};

export default DrAppointmentBooking;
