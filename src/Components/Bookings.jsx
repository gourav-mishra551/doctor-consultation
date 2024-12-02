import React, { useEffect, useState } from "react";
import { CiChat1 } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { IoCloudOffline } from "react-icons/io5";
import {
  MdOutlineBookOnline,
  MdOutlineVideoCall,
  MdSpatialAudioOff,
} from "react-icons/md";

const Bookings = () => {
  const [openSection, setOpenSection] = useState(null);
  const [name, setName] = useState("");
  const [history, setHistory] = useState([]);

  const bookings = async () => {
    try {
      const response = await axios.get(
        "https://api.assetorix.com/ah/api/v1/dc/doctor/history",
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setHistory(response.data);
      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    bookings();
  });

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

  return (
    <div>
      {history?.data?.length > 0 ? (
        <div>
          <div className="sm:max-w-5xl w-full mx-auto sm:my-8 space-y-4">
            <div className="top-detail-section">
              <p className="text-gray-500 font-light">Your Previous Bookings</p>
            </div>
            {history?.data?.map((consultation, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg">
                <div
                  className="flex justify-between items-center p-4 cursor-pointer bg-[#1495AB] text-white rounded-t-lg"
                  onClick={() => toggleSection(index)}
                >
                  <h3 className="text-sm font-bold text-white">
                    Consultation Date:{" "}
                    {convertToIST(consultation?.bookingDetails?.createdAt)}
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
                        {consultation?.bookingDetails?.consultation_formats ===
                        "videoCall" ? (
                          <div className="flex gap-2 border sm:w-[30%] w-full rounded-xl justify-center items-center p-1">
                            <p className="text-xm">Video Call</p>
                            <MdOutlineVideoCall className="text-xl" />
                          </div>
                        ) : consultation?.bookingDetails
                            ?.consultation_formats === "chat" ? (
                          <div className="flex gap-2 border sm:w-[30%] w-full rounded-xl justify-center items-center p-2">
                            <p>Chat</p>
                            <CiChat1 />
                          </div>
                        ) : consultation?.bookingDetails
                            ?.consultation_formats === "phoneCall" ? (
                          <div className="flex gap-2 border sm:w-[30%] w-full rounded-xl justify-center items-center p-2">
                            <p>Audio Call</p>
                            <MdSpatialAudioOff />
                          </div>
                        ) : null}
                      </span>
                    </div>

                    {/* Select Mode */}
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Select Mode</span>
                      <span className="text-lg font-semibold text-gray-800">
                        {consultation?.bookingDetails?.selectMode ===
                        "online" ? (
                          <div className="flex gap-2 border sm:w-[30%] w-full rounded-xl justify-center items-center p-1">
                            <p className="text-sm">Online</p>
                            <MdOutlineBookOnline className="text-xl" />
                          </div>
                        ) : consultation?.bookingDetails?.selectMode ===
                          "offline" ? (
                          <div>
                            <p>{consultation?.bookingDetails?.selectMode}</p>
                            <IoCloudOffline />
                          </div>
                        ) : null}
                      </span>
                    </div>

                    {/* Short Description */}
                    <div className="flex flex-col md:col-span-2">
                      <span className="text-sm text-gray-500">
                        Patient Problem
                      </span>
                      <p className="font-medium text-gray-800 text-sm">
                        {consultation?.bookingDetails?.short_description}
                      </p>
                    </div>

                    {/* Start Time */}
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Start Time</span>
                      <span className="text-lg font-semibold text-gray-800">
                        {
                          consultation?.bookingDetails?.specificSlotData
                            ?.startTime
                        }
                      </span>
                    </div>

                    {/* End Time */}
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">End Time</span>
                      <span className="text-lg font-semibold text-gray-800">
                        {
                          consultation?.bookingDetails?.specificSlotData
                            ?.endTime
                        }
                      </span>
                    </div>

                    {/* Updated At */}
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        Last Updated
                      </span>
                      <span className="text-sm font-semibold text-gray-800">
                        <div className="flex sm:w-[30%] w-full rounded-xl border justify-center items-center p-1 gap-2">
                          <span>
                            {convertToIST(
                              consultation?.bookingDetails?.updatedAt
                            )}
                          </span>
                          <IoIosTimer />
                        </div>
                      </span>
                    </div>

                    {/* User ID */}
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">Booking ID</span>
                      <span className="text-sm font-semibold text-gray-800">
                        {consultation?.bookingDetails?._id}
                      </span>
                    </div>

                    {/* Make Prescription */}
                    <div className="flex flex-col sm:w-[150px] w-full">
                      <button className="bg-[#944120] hover:bg-[#6e341d] transition-all duration-500 ease-in-out p-2 text-white rounded-md">
                        Make Prescription
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">No Booking Till Now</div>
      )}
    </div>
  );
};

export default Bookings;
