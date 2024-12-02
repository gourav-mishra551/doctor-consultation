import React, { useState } from "react";
import { CiChat1 } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { IoIosTimer } from "react-icons/io";
import { Link } from "react-router-dom";
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



  return (
    <div>
      <div className="sm:max-w-5xl w-full mx-auto sm:my-8 space-y-4">
        {userBooking?.data?.length > 0 ? (
          userBooking?.data?.map((consultation, index) => (
            <div key={index} className="bg-white shadow-lg rounded-lg">
              <div className="top-detail-section">
                <p className="text-gray-500 font-light">
                  Your Previous Bookings
                </p>
              </div>
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
                  <div className="flex flex-col md:col-span-2">
                    <span className="text-sm text-gray-500">
                      Patient Problem
                    </span>
                    <p className="font-medium text-gray-800 text-sm">
                      {consultation.short_description}
                    </p>
                  </div>

                  {/* Start Time */}
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Start Time</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {consultation?.specificSlotData?.startTime}
                    </span>
                  </div>

                  {/* End Time */}
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">End Time</span>
                    <span className="text-lg font-semibold text-gray-800">
                      {consultation?.specificSlotData?.endTime}
                    </span>
                  </div>

                  {/* Updated At */}
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Last Updated</span>
                    <span className="text-sm font-semibold text-gray-800">
                      <div className="flex sm:w-[30%] w-full rounded-xl border justify-center items-center p-1 gap-2">
                        <span>{convertToIST(consultation?.updatedAt)}</span>
                        <IoIosTimer />
                      </div>
                    </span>
                  </div>

                  {/* User ID */}
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-500">Booking ID</span>
                    <span className="text-sm font-semibold text-gray-800">
                      {consultation?._id}
                    </span>
                  </div>

                  {/* make prescription */}
                  <div className="flex flex-col sm:w-[150px] w-full ">
                    <Link to={`/prescription-maker/${consultation?._id}`}>
                      <button className="bg-[#944120] hover:bg-[#6e341d] transition-all duration-500 ease-in-out p-2 text-white rounded-md">
                        Make Prescription
                      </button>
                    </Link>
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
