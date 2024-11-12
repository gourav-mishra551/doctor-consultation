import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHome, FaUser, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import Bookings from "./Bookings";
import SelfProfile from "./SelfProfile";
import DoctorSelfProfile from "./DoctorSelfProfile";
const Profile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [history, setHistory] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);
  const [doctorProfileData, setDoctorProfileData] = useState([]);
  const [activeSection, setActiveSection] = useState("bookings");

  const toggleMenu = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menu);
    }
  };

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

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
    } catch (error) {
      console.log(error);
    }
  };

  const userData = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/user`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setUserProfileData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const docotrData = async () => {
    try {
      const response = await axios.get(
        "https://api.assetorix.com/ah/api/v1/dc/doctor",
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setDoctorProfileData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bookings();
    userData();
    docotrData();
  }, []);

  const convertToIndianDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  return (
    <div>
      <div className="bg-gray-300 bg-opacity-50 w-full h-[1px] mt-5"></div>
      <div className="flex gap-10 p-10">
        <div className="left h-[400px] w-[20%] flex flex-col mt-5 shadow-xl">
          <nav className="flex-1 p-2">
            <ul>
              {/* Home Section */}
              <li className="mb-2">
                <a
                  href="/"
                  className="flex items-center p-2 rounded-md hover:bg-[#00768A] hover:text-white text-black"
                >
                  <FaHome className="mr-2" /> Home
                </a>
              </li>

              {/* Bookings Section */}
              <li className="mb-2">
                <a
                  onClick={() => setActiveSection("bookings")}
                  href="#"
                  className="flex items-center p-2 rounded-md hover:bg-[#00768A] hover:text-white text-black"
                >
                  <TbBrandBooking className="mr-2" /> Bookings
                </a>
              </li>

              {/* Profile Section with Subsections */}
              <li className="mb-2">
                <div
                  className="flex items-center justify-between p-2 rounded-md hover:bg-[#00768A] hover:text-white cursor-pointer"
                  onClick={() => toggleMenu("profile")}
                >
                  <div className="flex items-center">
                    <FaUser className="mr-2" /> User Profile
                  </div>
                  {selectedMenu === "profile" ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {selectedMenu === "profile" && (
                  <ul className="ml-6 mt-2 space-y-1 text-gray-300">
                    <li>
                      <p
                        onClick={() => setActiveSection("selfuserprofile")}
                        className="block p-1 hover:bg-[#00768A] rounded-md hover:text-white text-black cursor-pointer"
                      >
                        View Users
                      </p>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block p-1 hover:bg-[#00768A] rounded-md hover:text-white text-black"
                      >
                        Edit User
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* Settings Section with Subsections */}
              <li className="mb-2">
                <div
                  className="flex items-center justify-between p-2 rounded-md hover:bg-[#00768A] hover:text-white cursor-pointer"
                  onClick={() => toggleMenu("settings")}
                >
                  <div className="flex items-center">
                    <FaUserDoctor className="mr-2" /> Doctor Profile
                  </div>
                  {selectedMenu === "settings" ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {selectedMenu === "settings" && (
                  <ul className="ml-6 mt-2 space-y-1 text-gray-300">
                    <li>
                      <p
                        onClick={() => setActiveSection("doctorselfprofile")}
                        className="block p-1 hover:bg-[#00768A] rounded-md hover:text-white text-black cursor-pointer"
                      >
                        View Profile
                      </p>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block p-1 hover:bg-[#00768A] rounded-md hover:text-white text-black"
                      >
                        Edit Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block p-1 hover:bg-[#00768A] rounded-md hover:text-white text-black"
                      >
                        Security
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>

        <div className="right w-[80%] mt-5">
          {activeSection === "bookings" && <Bookings history={history} />}
          {activeSection === "selfuserprofile" && (
            <SelfProfile userprofiledata={userProfileData} />
          )}
          {activeSection === "doctorselfprofile" && (
            <DoctorSelfProfile doctorProfileData={doctorProfileData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
