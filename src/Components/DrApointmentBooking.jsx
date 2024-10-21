import React, { useState } from 'react';
import DrAppointmentCreation from '../Components/DrAppoinmentCreation'; // Import the new component

const appointmentData = {
  "2024-10-09": ["10:00 AM", "10:30 AM", "11:00 AM"],
  "2024-10-10": ["11:00 AM", "11:30 AM", "12:00 PM"],
  "2024-10-11": ["1:00 PM", "1:30 PM", "2:00 PM"],
};

const days = [
  { day: 'Wed', date: '2024-10-09' },
  { day: 'Thu', date: '2024-10-10' },
  { day: 'Fri', date: '2024-10-11' },
  { day: 'Sat', date: '2024-10-12' },
  { day: 'Sun', date: '2024-10-13' },
  { day: 'Mon', date: '2024-10-14' },
  { day: 'Tue', date: '2024-10-15' }
];

const DrAppointmentBooking = () => {
  const [selectedDate, setSelectedDate] = useState(days[0].date);
  const [selectedTime, setSelectedTime] = useState(null);
  const [appointmentDataState, setAppointmentDataState] = useState(appointmentData);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // reset time when date changes
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const addAvailableTime = (date, time) => {
    setAppointmentDataState((prev) => ({
      ...prev,
      [date]: prev[date] ? [...prev[date], time] : [time],
    }));
  };

  

  return (
    <div className="appointment-section border-2 border-gray-300 rounded-xl p-5" style={{ height: "420px", width: "100%" }}>
      <h2 className="text-2xl font-bold">Book Appointment</h2>

      {/* Calendar Slider */}
      <div className="calendar-slider flex gap-3 overflow-x-auto mt-5">
        {days.map(({ day, date }) => (
          <div
            key={date}
            className={`date-box p-3 border ${selectedDate === date ? 'border-blue-500' : 'border-gray-300'} rounded-lg cursor-pointer`}
            onClick={() => handleDateChange(date)}
          >
            <p className="text-lg font-semibold">{day}</p>
            <p className="text-md">{date.split('-').pop()}</p>
          </div>
        ))}
      </div>

      {/* Available Time Slots */}
      <div className="time-slots mt-5">
        <h3 className="text-lg font-semibold">Available Time Slots</h3>
        <div className="slots-list flex gap-3 mt-3">
          {appointmentDataState[selectedDate] ? (
            appointmentDataState[selectedDate].map((time) => (
              <div
                key={time}
                className={`slot-box p-3 border ${selectedTime === time ? 'bg-blue-500 text-white' : 'border-gray-300'} rounded-lg cursor-pointer`}
                onClick={() => handleTimeChange(time)}
              >
                {time}
              </div>
            ))
          ) : (
            <p>No slots available</p>
          )}
        </div>
      </div>

      {/* Booking Button */}
      <div className="mt-5">
        <button className="bg-green-500 text-white p-3 rounded-lg" disabled={!selectedTime}>
          {selectedTime ? `Book for ${selectedTime}` : "Select a time"}
        </button>
      </div>

      {/* Appointment Creation Component */}
      {/* <DrAppointmentCreation addAvailableTime={addAvailableTime} /> */}
    </div>
  );
};

export default DrAppointmentBooking;
