import axios from "axios";
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
import { Link, useNavigate } from "react-router-dom";

const Bookings = () => {
  const [openSection, setOpenSection] = useState(null);
  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };
  const [doctorBookingsData, setDoctorBookingsData] = useState([]);
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(false);
  const [status, setStatus] = useState("Accepted");

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

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
    const [hours, minutes] = time?.split(":").map(Number); // Split and convert to numbers
    const period = hours >= 12 ? "PM" : "AM"; // Determine AM or PM
    const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format (handle 0 and 12)
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`; // Pad minutes with 0 if needed
  }

  const bookings = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/doctor/history?status=${status}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setHistory(response.data);
      setisLoading(false);
      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    bookings();
  }, [status]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center sm:mt-10">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div>
      <div>
        <div className="sm:max-w-5xl w-full mx-auto sm:my-8 space-y-4">
          <div className="flex justify-between">
            <div className="top-detail-section">
              <p className="text-gray-500 font-light">Your Appointments</p>
            </div>

            <div className="w-full max-w-xs mx-auto mt-4">
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Status
              </label>
              <select
                value={status} // Bind the current state value here
                onChange={(e) => setStatus(e.target.value)} // Update state on change
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
              >
                <option value="Accepted">Accepted</option>
                <option value="Completed">Complete</option>
              </select>
            </div>

            <div
              className="mr-2"
              onClick={() => navigate("/profile?section=doctorselfprofile")}
            >
              <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                Back
              </button>
            </div>
          </div>
          {history?.data?.length > 0 ? (
            history?.data?.map((consultation, index) => (
              <div key={index} className="bg-white shadow-lg rounded-lg ">
                <div
                  className="flex justify-between items-center sm:p-4 py-4 px-4 cursor-pointer bg-[#1495AB] text-white rounded-t-lg"
                  onClick={() => toggleSection(index)}
                >
                  <h3 className="sm:text-sm text-[12px] font-bold text-white">
                    Consultation Date:{" "}
                    {convertToIST(
                      consultation?.bookingDetails?.availibileTimeSlotsData
                        ?.selectDate
                    )}
                  </h3>
                  {openSection === index ? <FaChevronUp /> : <FaChevronDown />}
                </div>

                {openSection === index && (
                  <div className="p-6 flex flex-col">
                    <div className="grid sm:grid-cols-3 grid-cols-2 gap-5 sm:gap-0 justify-between items-center">
                      {/* Consultation Formats */}
                      <div className="flex flex-col sm:w-[50%]">
                        <span className="text-sm text-gray-500">
                          Consultation Formats
                        </span>
                        <span className="text-sm text-gray-800 font-bold">
                          {consultation?.bookingDetails
                            ?.consultation_formats === "videoCall" ? (
                            <div className="flex gap-2 border sm:w-[100%] w-full rounded-xl justify-center items-center p-1">
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
                      <div className="flex flex-col sm:w-[50%]">
                        <span className="text-sm text-gray-500">
                          Select Mode
                        </span>
                        <span className="text-lg font-semibold text-gray-800">
                          {consultation?.bookingDetails?.selectMode ===
                          "online" ? (
                            <div className="flex gap-2 border sm:w-[100%] w-full rounded-xl justify-center items-center p-1">
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

                      {/* Button */}
                      <div className="bg-[#25a53b] text-white px-2 py-1 rounded-md sm:w-[50%] flex justify-center">
                        <button
                          onClick={() =>
                            navigate(
                              `/booking-details/${consultation?.bookingDetails?._id}`
                            )
                          }
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-500">No Booking Till Now</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Bookings;
