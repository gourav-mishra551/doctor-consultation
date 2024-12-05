import React, { useState } from "react";

const TimePicker = ({ value, onChange, label }) => {
  const [time, setTime] = useState(value || "00:00");

  // Static time data
  const timeOptions = [
    { display: "12:00 AM", value: "00:00" },
    { display: "12:15 AM", value: "00:15" },
    { display: "12:30 AM", value: "00:30" },
    { display: "12:45 AM", value: "00:45" },
    { display: "01:00 AM", value: "01:00" },
    { display: "01:15 AM", value: "01:15" },
    { display: "01:30 AM", value: "01:30" },
    { display: "01:45 AM", value: "01:45" },
    { display: "02:00 AM", value: "02:00" },
    { display: "02:15 AM", value: "02:15" },
    { display: "02:30 AM", value: "02:30" },
    { display: "02:45 AM", value: "02:45" },
    { display: "03:00 AM", value: "03:00" },
    { display: "03:15 AM", value: "03:15" },
    { display: "03:30 AM", value: "03:30" },
    { display: "03:45 AM", value: "03:45" },
    { display: "04:00 AM", value: "04:00" },
    { display: "04:15 AM", value: "04:15" },
    { display: "04:30 AM", value: "04:30" },
    { display: "04:45 AM", value: "04:45" },
    { display: "05:00 AM", value: "05:00" },
    { display: "05:15 AM", value: "05:15" },
    { display: "05:30 AM", value: "05:30" },
    { display: "05:45 AM", value: "05:45" },
    { display: "06:00 AM", value: "06:00" },
    { display: "06:15 AM", value: "06:15" },
    { display: "06:30 AM", value: "06:30" },
    { display: "06:45 AM", value: "06:45" },
    { display: "07:00 AM", value: "07:00" },
    { display: "07:15 AM", value: "07:15" },
    { display: "07:30 AM", value: "07:30" },
    { display: "07:45 AM", value: "07:45" },
    { display: "08:00 AM", value: "08:00" },
    { display: "08:15 AM", value: "08:15" },
    { display: "08:30 AM", value: "08:30" },
    { display: "08:45 AM", value: "08:45" },
    { display: "09:00 AM", value: "09:00" },
    { display: "09:15 AM", value: "09:15" },
    { display: "09:30 AM", value: "09:30" },
    { display: "09:45 AM", value: "09:45" },
    { display: "10:00 AM", value: "10:00" },
    { display: "10:15 AM", value: "10:15" },
    { display: "10:30 AM", value: "10:30" },
    { display: "10:45 AM", value: "10:45" },
    { display: "11:00 AM", value: "11:00" },
    { display: "11:15 AM", value: "11:15" },
    { display: "11:30 AM", value: "11:30" },
    { display: "11:45 AM", value: "11:45" },
    { display: "12:00 PM", value: "12:00" },
    { display: "12:15 PM", value: "12:15" },
    { display: "12:30 PM", value: "12:30" },
    { display: "12:45 PM", value: "12:45" },
    { display: "01:00 PM", value: "13:00" },
    { display: "01:15 PM", value: "13:15" },
    { display: "01:30 PM", value: "13:30" },
    { display: "01:45 PM", value: "13:45" },
    { display: "02:00 PM", value: "14:00" },
    { display: "02:15 PM", value: "14:15" },
    { display: "02:30 PM", value: "14:30" },
    { display: "02:45 PM", value: "14:45" },
    { display: "03:00 PM", value: "15:00" },
    { display: "03:15 PM", value: "15:15" },
    { display: "03:30 PM", value: "15:30" },
    { display: "03:45 PM", value: "15:45" },
    { display: "04:00 PM", value: "16:00" },
    { display: "04:15 PM", value: "16:15" },
    { display: "04:30 PM", value: "16:30" },
    { display: "04:45 PM", value: "16:45" },
    { display: "05:00 PM", value: "17:00" },
    { display: "05:15 PM", value: "17:15" },
    { display: "05:30 PM", value: "17:30" },
    { display: "05:45 PM", value: "17:45" },
    { display: "06:00 PM", value: "18:00" },
    { display: "06:15 PM", value: "18:15" },
    { display: "06:30 PM", value: "18:30" },
    { display: "06:45 PM", value: "18:45" },
    { display: "07:00 PM", value: "19:00" },
    { display: "07:15 PM", value: "19:15" },
    { display: "07:30 PM", value: "19:30" },
    { display: "07:45 PM", value: "19:45" },
    { display: "08:00 PM", value: "20:00" },
    { display: "08:15 PM", value: "20:15" },
    { display: "08:30 PM", value: "20:30" },
    { display: "08:45 PM", value: "20:45" },
    { display: "09:00 PM", value: "21:00" },
    { display: "09:15 PM", value: "21:15" },
    { display: "09:30 PM", value: "21:30" },
    { display: "09:45 PM", value: "21:45" },
    { display: "10:00 PM", value: "22:00" },
    { display: "10:15 PM", value: "22:15" },
    { display: "10:30 PM", value: "22:30" },
    { display: "10:45 PM", value: "22:45" },
    { display: "11:00 PM", value: "23:00" },
    { display: "11:15 PM", value: "23:15" },
    { display: "11:30 PM", value: "23:30" },
    { display: "11:45 PM", value: "23:45" },
  ];

  const handleTimeChange = (e) => {
    const selectedValue = e.target.value;
    setTime(selectedValue);
    onChange(selectedValue);
  };

  return (
    <div className="flex flex-col">
      {label && <label className="font-semibold mb-1">{label}</label>}
      <select
        value={time}
        onChange={handleTimeChange}
        className="border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500"
      >
        {timeOptions.map(({ display, value }) => (
          <option key={value} value={value}>
            {display}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TimePicker;
