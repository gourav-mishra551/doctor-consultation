import React, { useState, useEffect } from "react";

const DrAppointmentBooking = ({ IndiProfile }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentDataState, setAppointmentDataState] = useState({});
  const [loading, setLoading] = useState(true); // For handling loading state
  const [selectedMode, setSelectedMode] = useState("both"); // Default to 'both'
  const [isBooking, setIsBooking] = useState(false); // For tracking booking status
  const [errorMessage, setErrorMessage] = useState(""); // For error handling

  // Function to fetch the doctor availability and structure it for display
  const fetchAvailability = () => {
    setLoading(true);
    const doctorAvailability = IndiProfile?.doctorAvailability || [];

    const structuredData = {};

    // Loop through each availability and structure the data by date
    doctorAvailability.forEach((availability) => {
      const date = new Date(availability.selectDate)
        .toISOString()
        .split("T")[0]; // Get just the date part

      // Filter based on visiting mode (online, offline, or both)
      let onlineSlots = [];
      let offlineSlots = [];

      if (selectedMode === "both") {
        onlineSlots = availability.onlineSlots;
        offlineSlots = availability.offlineSlots;
      } else if (selectedMode === "online") {
        onlineSlots = availability.onlineSlots;
      } else if (selectedMode === "offline") {
        offlineSlots = availability.offlineSlots;
      }

      // Filter out booked slots
      structuredData[date] = {
        online: onlineSlots.filter((slot) => !slot.isBooked),
        offline: offlineSlots.filter((slot) => !slot.isBooked),
      };
    });

    setAppointmentDataState(structuredData);
    setLoading(false);
  };

  useEffect(() => {
    if (IndiProfile) {
      fetchAvailability(); // Fetch doctor availability data on component mount
    }
  }, [IndiProfile, selectedMode]); // Re-fetch when visiting mode or IndiProfile changes

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
  };

  const handleTimeChange = (slotId, time) => {
    setSelectedTime({ slotId, time }); // Set the selected time by slot ID
  };

  const handleModeChange = (e) => {
    setSelectedMode(e.target.value); // Change visiting mode
  };

  const handleBooking = () => {
    if (selectedTime && selectedDate) {
      setIsBooking(true);
      setErrorMessage("");

      // Mock booking request - Replace with actual API call
      // You will need to implement an API function to handle this
      const bookingRequest = {
        date: selectedDate,
        timeSlotId: selectedTime.slotId,
        mode: selectedMode,
      };

      // Simulate successful booking
      setTimeout(() => {
        console.log("Booking successful:", bookingRequest);
        setIsBooking(false);
        setSelectedTime(null); // Reset after booking
        setErrorMessage("Booking confirmed!");
      }, 2000);
    } else {
      setErrorMessage("Please select a valid time slot.");
    }
  };

  return (
    <div
      className="appointment-section border-2 border-gray-300 rounded-xl p-5"
      style={{
        height: "auto",
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
      }}
    >
      <h2 className="text-2xl font-bold text-center">Book Appointment</h2>

      {/* Visiting Mode Selector */}
      <div className="visiting-mode-selector mt-5 flex justify-between items-center">
        <label className="mr-3 text-lg">Select Visiting Mode:</label>
        <select
          value={selectedMode}
          onChange={handleModeChange}
          className="border p-3 rounded-lg w-full sm:w-1/3 text-lg"
        >
          <option value="both">Both (Online & Offline)</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Calendar Slider */}
      <div className="calendar-slider flex gap-3 overflow-x-auto mt-5">
        {Object.keys(appointmentDataState).map((date) => {
          const dayName = new Date(date).toLocaleString("en-US", {
            weekday: "short",
          });
          return (
            <div
              key={date}
              className={`date-box p-3 border ${
                selectedDate === date
                  ? "border-blue-500 bg-blue-100"
                  : "border-gray-300"
              } rounded-lg cursor-pointer hover:bg-gray-200 transition-all`}
              onClick={() => handleDateChange(date)}
            >
              <p className="text-lg font-semibold text-center">{dayName}</p>
              <p className="text-md text-center">{date.split("-").pop()}</p>
            </div>
          );
        })}
      </div>

      {/* Available Time Slots */}
      <div className="time-slots mt-5">
        <h3 className="text-lg font-semibold">Available Time Slots</h3>
        {loading ? (
          <div className="flex justify-center mt-3">
            <div className="spinner"></div> {/* Add a spinner here */}
          </div>
        ) : (
          <div className="slots-list flex flex-col gap-5 mt-3">
            {/* Displaying Online Slots */}
            {selectedMode !== "offline" &&
              appointmentDataState[selectedDate]?.online.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold">Online Slots</h4>
                  <div className="flex gap-3 flex-wrap">
                    {appointmentDataState[selectedDate].online.map((slot) => (
                      <div
                        key={slot._id}
                        className={`slot-box p-4 border ${
                          selectedTime?.slotId === slot._id
                            ? "bg-blue-500 text-white"
                            : "border-gray-300"
                        } rounded-lg cursor-pointer hover:bg-blue-100 transition-all`}
                        onClick={() =>
                          handleTimeChange(
                            slot._id,
                            `${slot.startTime}:00 - ${slot.endTime}:00`
                          )
                        }
                      >
                        {slot.startTime}:00 - {slot.endTime}:00 - ₹
                        {slot.doctorCharge}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* Displaying Offline Slots */}
            {selectedMode !== "online" &&
              appointmentDataState[selectedDate]?.offline.length > 0 && (
                <div>
                  <h4 className="text-md font-semibold">Hospital Visit</h4>
                  <div className="flex gap-3 flex-wrap">
                    {appointmentDataState[selectedDate].offline.map((slot) => (
                      <div
                        key={slot._id}
                        className={`slot-box p-4 border ${
                          selectedTime?.slotId === slot._id
                            ? "bg-blue-500 text-white"
                            : "border-gray-300"
                        } rounded-lg cursor-pointer hover:bg-blue-100 transition-all`}
                        onClick={() =>
                          handleTimeChange(
                            slot._id,
                            `${slot.startTime}:00 - ${slot.endTime}:00`
                          )
                        }
                      >
                        {slot.startTime}:00 - {slot.endTime}:00 - ₹
                        {slot.doctorCharge}
                      </div>
                    ))}
                  </div>
                </div>
              )}

            {/* No available slots message */}
            {appointmentDataState[selectedDate]?.online.length === 0 &&
              appointmentDataState[selectedDate]?.offline.length === 0 && (
                <p className="text-center text-lg text-red-500">
                  No available slots for this date
                </p>
              )}
          </div>
        )}
      </div>

      {/* Error or Success Message */}
      {errorMessage && (
        <div
          className={`mt-3 text-lg ${
            errorMessage === "Booking confirmed!"
              ? "text-green-600"
              : "text-red-600"
          } text-center`}
        >
          {errorMessage}
        </div>
      )}

      {/* Booking Button */}
      <div className="mt-5 text-center">
        <button
          className="bg-green-500 text-white p-3 rounded-lg w-full sm:w-auto"
          disabled={!selectedTime || isBooking}
          onClick={handleBooking}
        >
          {isBooking
            ? "Booking..."
            : selectedTime
            ? `Book for ${selectedTime.time}`
            : "Select a time"}
        </button>
      </div>
    </div>
  );
};

export default DrAppointmentBooking;
