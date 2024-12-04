import React, { useState } from "react";

const TimePicker = ({ value, onChange, label }) => {
  const [time, setTime] = useState(value || "12:00 AM");
 

  const handleTimeChange = (e) => {
    const newValue = e.target.value;
    setTime(newValue);
    onChange(newValue);
  };

  return (
    <div className="flex flex-col">
      {label && <label className="font-semibold mb-1">{label}</label>}
      <select
        value={time}
        onChange={handleTimeChange}
        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
      >
        {generateTimeOptions().map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};


const generateTimeOptions = () => {
  const times = [];
  const periods = ["AM", "PM"];

  periods.forEach((period) => {
    for (let hour = 1; hour <= 12; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const time = `${hour.toString().padStart(2, "0")}:${minute
          .toString()
          .padStart(2, "0")} ${period}`;
        times.push(time);
      }
    }
  });

  return times;
};

export default TimePicker;
