import React, { useState, useEffect } from 'react';

const DrAppointmentBooking = ({ IndiProfile }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentDataState, setAppointmentDataState] = useState({});
  const [loading, setLoading] = useState(true); // For handling loading state
  const [selectedMode, setSelectedMode] = useState("both"); // Default to 'both'

  // Function to fetch the doctor availability and structure it for display
  const fetchAvailability = () => {
    const doctorAvailability = IndiProfile?.doctorAvailability || [];

    const structuredData = {};

    // Loop through each availability and structure the data by date
    doctorAvailability.forEach((availability) => {
      const date = new Date(availability.selectDate).toISOString().split('T')[0]; // Get just the date part

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
        online: onlineSlots.filter(slot => !slot.isBooked),
        offline: offlineSlots.filter(slot => !slot.isBooked),
      };
    });

    setAppointmentDataState(structuredData);
    setLoading(false);
  };

  useEffect(() => {
    fetchAvailability(); // Fetch doctor availability data on component mount
  }, [IndiProfile, selectedMode]); // Re-fetch when visiting mode or IndiProfile changes

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when date changes
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time); // Set the selected time
  };

  const handleModeChange = (e) => {
    setSelectedMode(e.target.value); // Change visiting mode
  };

  return (
    <div className="appointment-section border-2 border-gray-300 rounded-xl p-5" style={{ height: "420px", width: "100%" }}>
      <h2 className="text-2xl font-bold">Book Appointment</h2>

      {/* Visiting Mode Selector */}
      <div className="visiting-mode-selector mt-3">
        <label className="mr-3">Select Visiting Mode: </label>
        <select
          value={selectedMode}
          onChange={handleModeChange}
          className="border p-2 rounded-lg"
        >
          <option value="both">Both (Online & Offline)</option>
          <option value="online">Online</option>
          <option value="offline">Offline</option>
        </select>
      </div>

      {/* Calendar Slider */}
      <div className="calendar-slider flex gap-3 overflow-x-auto mt-5">
        {Object.keys(appointmentDataState).map((date) => {
          const dayName = new Date(date).toLocaleString('en-US', { weekday: 'short' });
          return (
            <div
              key={date}
              className={`date-box p-3 border ${selectedDate === date ? 'border-blue-500' : 'border-gray-300'} rounded-lg cursor-pointer`}
              onClick={() => handleDateChange(date)}
            >
              <p className="text-lg font-semibold">{dayName}</p>
              <p className="text-md">{date.split('-').pop()}</p>
            </div>
          );
        })}
      </div>

      {/* Available Time Slots */}
      <div className="time-slots mt-5">
        <h3 className="text-lg font-semibold">Available Time Slots</h3>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="slots-list flex flex-col gap-5 mt-3">
            {/* Displaying Online Slots */}
            {selectedMode !== "offline" && appointmentDataState[selectedDate]?.online.length > 0 && (
              <div>
                <h4 className="text-md font-semibold">Online Slots</h4>
                <div className="flex gap-3">
                  {appointmentDataState[selectedDate].online.map((slot) => (
                    <div
                      key={slot._id}
                      className={`slot-box p-3 border ${selectedTime === slot.time ? 'bg-blue-500 text-white' : 'border-gray-300'} rounded-lg cursor-pointer`}
                      onClick={() => handleTimeChange(slot.time)}
                    >
                      {slot.startTime}:00 - {slot.endTime}:00 - ₹{slot.charge}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Displaying Offline Slots */}
            {selectedMode !== "online" && appointmentDataState[selectedDate]?.offline.length > 0 && (
              <div>
                <h4 className="text-md font-semibold">Offline Slots</h4>
                <div className="flex gap-3">
                  {appointmentDataState[selectedDate].offline.map((slot) => (
                    <div
                      key={slot._id}
                      className={`slot-box p-3 border ${selectedTime === slot.time ? 'bg-blue-500 text-white' : 'border-gray-300'} rounded-lg cursor-pointer`}
                      onClick={() => handleTimeChange(slot.time)}
                    >
                      {slot.startTime}:00 - {slot.endTime}:00 - ₹{slot.charge}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No available slots message */}
            {appointmentDataState[selectedDate]?.online.length === 0 &&
              appointmentDataState[selectedDate]?.offline.length === 0 && (
                <p>No available slots for this date</p>
            )}
          </div>
        )}
      </div>

      {/* Booking Button */}
      <div className="mt-5">
        <button className="bg-green-500 text-white p-3 rounded-lg" disabled={!selectedTime}>
          {selectedTime ? `Book for ${selectedTime}` : "Select a time"}
        </button>
      </div>
    </div>
  );
};

export default DrAppointmentBooking;
