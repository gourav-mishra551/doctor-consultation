import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmarkCheck } from "react-icons/ci";

const AllSlots = () => {
  const [slotsData, setSlotsData] = useState([]);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const allSlots = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/doctor`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setSlotsData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    allSlots();
  }, []);

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":").map(Number); // Split time into hours and minutes
    const period = hours >= 12 ? "PM" : "AM"; // Determine AM/PM
    const formattedHours = hours % 12 || 12; // Convert 24-hour format to 12-hour format
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  function formatDateWithTodayOrTomorrow(dateString) {
    if (!dateString) return "N/A";

    const inputDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    // Strip time for comparison
    const isToday = inputDate.toDateString() === today.toDateString();
    const isTomorrow = inputDate.toDateString() === tomorrow.toDateString();

    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";

    // Format the date otherwise
    return inputDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }
  
  return (
    <>
      <div className="indictors flex justify-center items-center gap-5">
        <div className="red flex items-center gap-1">
          <div className="h-[15px] w-[15px] bg-blue-800"></div>
          <p>Online slots</p>
        </div>
        <div className="green flex items-center gap-1">
          <div className="h-[15px] w-[15px] bg-red-800"></div>
          <p>Booked slots</p>
        </div>
        <div className="blue flex items-center gap-1">
          <div className="h-[15px] w-[15px] bg-green-800"></div>
          <p>Offline slots</p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 sm:p-6 h-auto">
        {slotsData?.doctorAvailabilities?.map((data, index) => (
          <div
            key={index}
            className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 h-auto"
          >
            {/* Header */}
            <div className="mb-6">
              <h2 className="sm:text-2xl text-xl text-center font-bold text-[#00768A]">
                Appointment Details
              </h2>
              <p className="text-sm text-gray-500 font-semibold text-end">
                {formatDateWithTodayOrTomorrow(data?.selectDate)}
              </p>
            </div>

            {/* Details Section */}
            <div className="grid grid-cols-2 gap-2 mb-8">
              <div>
                <p className="text-sm font-semibold text-gray-600">Currency</p>
                <p className="text-gray-800">{data?.currency || "N/A"}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600">
                  Visiting Mode
                </p>
                <p className="text-gray-800">{data?.visitingMode || "N/A"}</p>
              </div>
            </div>

            {/* Slots Section */}
            <div>
              <div className="space-y-6">
                {/* Online Slots Slider */}
                {data?.onlineSlots?.length > 0 && (
                  <div>
                    <h4 className="text-md font-medium text-blue-600 mb-2">
                      Online Slots
                    </h4>
                    <div className="flex overflow-x-auto scrollbar-hide space-x-4 p-4 bg-blue-50 rounded-md">
                      {data?.onlineSlots.map((slot, index) => (
                        <div
                          key={index}
                          className={`min-w-max px-4 py-2 rounded-lg shadow-md text-center ${
                            slot?.isBooked
                              ? "bg-red-100 text-red-800"
                              : "bg-blue-100 text-blue-800"
                          }`}
                        >
                          {slot?.isBooked && (
                            <CiBookmarkCheck className="inline-block mr-2" />
                          )}
                          {convertTo12HourFormat(slot?.startTime)} -{" "}
                          {convertTo12HourFormat(slot?.endTime)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Offline Slots Slider */}
                {data?.offlineSlots?.length > 0 && (
                  <div>
                    <h4 className="text-md font-medium text-green-600 mb-2">
                      Offline Slots
                    </h4>
                    <div className="flex overflow-x-auto scrollbar-hide space-x-4 p-4 bg-green-50 rounded-md">
                      {data?.offlineSlots.map((slot, index) => (
                        <div
                          key={index}
                          className={`min-w-max px-4 py-2 rounded-lg shadow-md text-center ${
                            slot?.isBooked
                              ? "bg-red-100 text-red-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {convertTo12HourFormat(slot?.startTime)} -{" "}
                          {convertTo12HourFormat(slot?.endTime)}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AllSlots;
