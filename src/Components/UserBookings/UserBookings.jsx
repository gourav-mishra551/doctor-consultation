import React, { useEffect, useState } from "react";
import axios from "axios"; // Ensure axios is imported
import { CiChat1 } from "react-icons/ci";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  MdOutlineBookOnline,
  MdOutlineVideoCall,
  MdSpatialAudioOff,
} from "react-icons/md";
import { BsFillPersonLinesFill } from "react-icons/bs";
import { IoCloudOffline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import noSlotsImage from "../../Assests/images.png";

const UserBookings = () => {
  const [userBooking, setUserBooking] = useState([]);
  const [openSection, setOpenSection] = useState(null);
  const [isLoading, setisLoading] = useState(false);

  // Mock tokens and IDs (Replace these with your actual logic)
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const navigate = useNavigate();

  const userBookings = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/history`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setUserBooking(response.data);
      setisLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    if (!utcDate) return "--";
    const date = new Date(utcDate);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      ...options,
    });
  };

  const formatTime = (time) => {
    if (!time) return "--";
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${String(minutes).padStart(2, "0")} ${period}`;
  };

  useEffect(() => {
    userBookings();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center sm:mt-10">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="sm:max-w-5xl w-full mx-auto sm:my-8 space-y-4">
        <div className="flex justify-between">
          <div className="top-detail-section">
            <p className="text-gray-500 font-light">Your Previous Bookings</p>
          </div>
          <div
            className="mr-2"
            onClick={() => navigate("/profile?section=selfuserprofile")}
          >
            <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
              Back
            </button>
          </div>
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
                <div className="p-6 flex flex-col">
                  <div className="flex justify-between items-center">
                    {/* Consultation Formats */}
                    <div className="">
                      <span className="text-sm text-gray-500">
                        Consultation Formats
                      </span>
                      <span className="text-sm text-gray-800 font-bold">
                        {consultation?.consultation_formats === "videoCall" ? (
                          <div className="flex gap-2 border sm:w-[100%] w-full rounded-xl justify-center items-center p-1">
                            <p className="text-xm">Video Call</p>
                            <MdOutlineVideoCall className="text-xl" />
                          </div>
                        ) : consultation?.consultation_formats === "chat" ? (
                          <div className="flex gap-2 border sm:w-[100%] w-full rounded-xl justify-center items-center p-2">
                            <p>Chat </p>
                            <CiChat1 />
                          </div>
                        ) : consultation?.consultation_formats ===
                          "phoneCall" ? (
                          <div className="flex gap-2 border sm:w-[100%] w-full rounded-xl justify-center items-center p-2">
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
                            <div className="flex gap-2 border sm:w-[100%] w-full rounded-xl justify-center items-center p-1">
                              <p className="text-sm">Online</p>
                              <MdOutlineBookOnline className="text-xl" />
                            </div>
                          ) : consultation?.selectMode === "offline" ? (
                            <div className="flex gap-2 border sm:w-[100%] w-full rounded-xl justify-center items-center p-1">
                              <p className="text-sm">Offline</p>
                              <IoCloudOffline className="text-xl" />
                            </div>
                          ) : consultation?.selectMode === "both" ? (
                            <div className="flex gap-2 border sm:w-[100%] w-full rounded-xl justify-center items-center p-1">
                              <p className="text-sm">Both</p>
                              <BsFillPersonLinesFill className="text-xl" />
                            </div>
                          ) : null}
                        </div>
                      </span>
                    </div>

                    {/* button */}
                    <div className="bg-[#25a53b] text-white px-2 py-1 rounded-md">
                      <button
                        onClick={() =>
                          navigate(`/user-booking-details/${consultation?._id}`)
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
          <div className=" text-center">
            <div className="flex flex-col items-center justify-center text-center mt-4  rounded-lg p-4 shadow-lg">
              <img
                src={noSlotsImage}
                alt="noSlotsImage"
                className="sm:w-[200px] object-contain mb-2"
              />
              <p className="text-center text-gray-500 mt-5">
                No Bookings till now
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserBookings;
