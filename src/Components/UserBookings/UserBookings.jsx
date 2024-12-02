import React, { useState } from "react";
import { CiChat1 } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  MdOutlineBookOnline,
  MdOutlineVideoCall,
  MdSpatialAudioOff,
} from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoCloudOffline } from "react-icons/io5";

const UserBookings = ({ setUserBooking, userBooking }) => {
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const convertToIST = (utcDate) => {
    if (!utcDate) return "--"; // Return fallback if date is invalid or missing
    const date = new Date(utcDate);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      ...options,
    });
  };
  function formatTime(time) {
    const [hours, minutes] = time.split(":").map(Number); // Split and convert to numbers
    const period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format (handle 0 and 12)
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`; // Pad minutes with 0 if needed
  }



  return (
    <div>
      <div className="sm:max-w-5xl w-full mx-auto sm:my-8 space-y-4">
      <div className="top-detail-section">
                <p className="text-gray-500 font-light">
                  Your Previous Bookings
                </p>
              </div>
        {userBooking?.data?.length > 0 ? (
          userBooking?.data?.map((consultation, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg">
              
              <div
                className="flex sm:mt-5 justify-between items-center p-4 cursor-pointer bg-[#1495AB] text-white rounded-t-lg"
                onClick={() => toggleSection(index)}
              >
                <h3 className="text-sm font-bold text-white">
                  Consultation Date: {convertToIST(consultation?.createdAt)}
                </h3>
                {openSection === index ? <FaChevronUp /> : <FaChevronDown />}
              </div>

              {openSection === index && (
                <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4 space-y-2 sm:space-y-0">
                  {/* Consultation Formats */}
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">
                      Consultation Formats
                    </span>
                    <span className="text-sm text-gray-800 font-bold">
                      {consultation?.consultation_formats === "videoCall" ? (
                        <div className="flex gap-2 border sm:w-[30%] w-full rounded-xl justify-center items-center p-1">
                          <p className="text-xm">Video Call</p>
                          <MdOutlineVideoCall className="text-xl" />
                        </div>
                      ) : consultation?.consultation_formats === "chat" ? (
                        <div className="flex gap-2 border sm:w-[30%] w-full rounded-xl justify-center items-center p-2">
                          <p>Chat </p>
                          <CiChat1 />
                        </div>
                      ) : consultation?.consultation_formats === "phoneCall" ? (
                        <div className="flex gap-2 border sm:w-[30%] w-full rounded-xl justify-center items-center p-2">
                          <p>Audio Call</p>
                          <MdSpatialAudioOff />
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </span>
                  </div>

                  {/* Select Mode */}
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Select Mode</span>
                    <span className="text-lg font-semibold text-gray-800">
                      <div className="flex">
                        {consultation?.selectMode === "online" ? (
                          <div className="flex gap-2 border sm:w-[30%] w-full rounded-xl justify-center items-center p-1">
                            <p className="text-sm">Online</p>
                            <MdOutlineBookOnline className="text-xl" />
                          </div>
                        ) : consultation?.selectMode === "offline" ? (
                          <div className="flex gap-2 border sm:w-[30%] w-full rounded-xl justify-center items-center p-1">
                            <p className="text-sm">Offline</p>
                            <IoCloudOffline className="text-xl" />
                          </div>
                        ) : consultation?.selectMode === "both" ? (
                          <div className="flex gap-2 border sm:w-[30%] w-full rounded-xl justify-center items-center p-1">
                            <p className="text-sm">Both</p>
                            <BsFillPersonLinesFill className="text-xl" />
                          </div>
                        ) : null}
                      </div>
                    </span>
                  </div>

                  {/* Short Description */}
                  {consultation.short_description && (
                    <div className="flex flex-col md:col-span-2">
                      <span className="text-sm text-gray-500">
                        Patient Problem
                      </span>
                      <p className="font-medium text-gray-800 text-sm">

                      </p>
                    </div>
                  )}


                  {/* Start Time */}
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Start Time</span>
                    <span className="text-lg font-semibold text-gray-800">
                       {formatTime(consultation?.specificSlotData?.startTime)}
                    </span>
                  </div>

                  {/* End Time */}
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">End Time</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {formatTime(consultation?.specificSlotData?.endTime)}
                    </span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-gray-500 text-center">
            <p>No bookings till now</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
