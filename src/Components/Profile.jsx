import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FaHome,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaQuestion,
} from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import Bookings from "./Bookings";
import SelfProfile from "./SelfProfile";
import DoctorSelfProfile from "./DoctorSelfProfile";
import {
  MdClose,
  MdFamilyRestroom,
  MdKeyboardDoubleArrowUp,
  MdOutlineTimer,
} from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import AddFamilyMembers from "./AddFamilyMembers";
import { RxCross2 } from "react-icons/rx";
import ViewFamilyMembers from "./ViewFamilyMembers/ViewFamilyMembers";
import toast from "react-hot-toast";
const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [history, setHistory] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);
  const [doctorProfileData, setDoctorProfileData] = useState([]);
  const [activeSection, setActiveSection] = useState("bookings");
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isDoctorProfileOpen, setIsDoctorProfileOpen] = useState(false);
  const [familyPopUp, setFamilyPopUp] = useState(false);
  const [editFamilyPopUp, setEditFamilyPopUp] = useState(false);
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);

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
    if (id && token) {
      bookings();
      userData();
      docotrData();
      getFamilyEdit();
    }
  }, [id, token]);

  const convertToIndianDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  const navigate = useNavigate();

  // / Function to toggle the profile bar
  const toggleProfileBar = () => setIsProfileOpen(!isProfileOpen);
  const closeProfileBar = () => setIsProfileOpen(false);

  const toggleUserProfile = () => setIsUserProfileOpen((prev) => !prev);

  const toggleDoctorProfile = () => setIsDoctorProfileOpen((prev) => !prev);

  const toggleFamily = () => setIsFamilyOpen((prev) => !prev);

  const getFamilyEdit = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/user/family`,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setFamilyData(response.data);
      console.log(familyData.data);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data);
    }
  };

  console.log(getFamilyEdit);

  if (loading) {
    return <div>Loading...</div>; // Loader is displayed
  }
  return (
    <div>
      <div className="bg-gray-300 bg-opacity-50 w-full h-[1px] mt-5"></div>
      <div className="sm:flex gap-10 p-10">
        {/* desktop section */}
        <div className="left h-[400px] w-[20%] sm:flex hidden flex-col mt-5 shadow-xl">
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
                        href="/edit-profile"
                        className="block p-1 hover:bg-[#00768A] rounded-md hover:text-white text-black"
                      >
                        Edit Profile
                      </a>
                    </li>
                  </ul>
                )}
              </li>

              {/* family members */}
              <li className="mb-2">
                <div
                  className="flex items-center justify-between p-2 rounded-md hover:bg-[#00768A] hover:text-white cursor-pointer"
                  onClick={() => toggleMenu("family")}
                >
                  <div className="flex items-center">
                    <FaUser className="mr-2" /> Family Members
                  </div>
                  {selectedMenu === "family" ? (
                    <FaChevronUp />
                  ) : (
                    <FaChevronDown />
                  )}
                </div>
                {selectedMenu === "family" && (
                  <ul className="ml-6 mt-2 space-y-1 text-gray-300">
                    <li>
                      <p
                        onClick={() => setActiveSection("familyProfile")}
                        className="block font-normal p-1 hover:bg-[#00768A] rounded-md hover:text-white text-gray-500 cursor-pointer"
                      >
                        View Members
                      </p>
                    </li>
                    <li>
                      <Link
                        onClick={() => setFamilyPopUp(true)}
                        className="block p-1 hover:bg-[#00768A] rounded-md hover:text-white text-gray-500"
                      >
                        Add Family
                      </Link>
                    </li>
                  </ul>
                )}
              </li>
            </ul>
          </nav>
        </div>

        {/* for mobile section */}
        <div className="relative sm:hidden">
          {/* Profile Button at the top */}
          <div
            onClick={toggleProfileBar}
            className="flex fixed bottom-0 z-50 -ml-[22px]"
          >
            <button
              type="button"
              className="bg-blue-500 w-[355px] text-[22px] text-white p-4 rounded-xl shadow-lg md:hidden focus:outline-none"
            >
              Profile
            </button>
            <MdKeyboardDoubleArrowUp className="text-white absolute top-[21px] left-[110px] text-[25px]" />
          </div>

          {/* Background Overlay (Visible when profile bar is open) */}
          {isProfileOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-40"
              onClick={closeProfileBar}
            />
          )}

          {/* Profile Bar (Visible only on mobile) */}
          <div
            className={`shadow-xl bg-gray-100 fixed bottom-0 left-0 w-full transition-transform duration-300 md:hidden z-50 ${
              isProfileOpen
                ? "transform translate-y-0"
                : "transform translate-y-full"
            }`}
            style={{
              height: "80%",
            }}
          >
            {/* Profile Options */}
            <div className="flex flex-col space-y-4 p-6">
              {/* Close Button (Cross Icon) */}
              <div className="flex justify-between">
                <p className="text-[21px] text-gray-500 font-bold">
                  Select the section
                </p>
                <div className="flex justify-end">
                  <MdClose
                    onClick={closeProfileBar}
                    className="text-2xl cursor-pointer text-gray-600"
                  />
                </div>
              </div>

              <div
                onClick={() => {
                  setIsProfileOpen(false);
                  navigate("/");
                }}
                className="flex justify-center items-center gap-2 border w-[100%] p-2 bg-[#00768A] rounded-xl text-white"
              >
                <FaHome />

                <button type="button" className="text-xl">
                  Home
                </button>
              </div>

              <div
                onClick={() => {
                  setIsProfileOpen(false);
                  setActiveSection("bookings");
                }}
                className="flex justify-center items-center gap-2 border w-[100%] p-2 bg-[#00768A] rounded-xl text-white"
              >
                <FaQuestion />
                <button type="button" className="text-xl">
                  Bookings
                </button>
              </div>

              {/* User Profile Section */}
              <div>
                <div
                  onClick={toggleUserProfile}
                  className="flex justify-center items-center gap-2 border w-full p-2 bg-[#00768A] rounded-xl text-white cursor-pointer"
                >
                  <IoPerson />
                  <button type="button" className="text-xl focus:outline-none">
                    User Profile
                  </button>
                </div>
                {isUserProfileOpen && (
                  <div className="flex flex-col space-y-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSection("selfuserprofile");
                        setIsProfileOpen(false);
                      }}
                      className="text-white bg-gray-500 w-full py-2 rounded-lg"
                    >
                      View Profile
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        console.log("Edit User Profile");
                      }}
                      className="text-white bg-gray-500 w-full py-2 rounded-lg"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Doctor Profile Section */}
              <div>
                <div
                  onClick={toggleDoctorProfile}
                  className="flex justify-center items-center gap-2 border w-full p-2 bg-[#00768A] rounded-xl text-white cursor-pointer"
                >
                  <FaUserDoctor />
                  <button type="button" className="text-xl focus:outline-none">
                    Doctor Profile
                  </button>
                </div>
                {isDoctorProfileOpen && (
                  <div className="flex flex-col space-y-2 mt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveSection("doctorselfprofile");
                        setIsProfileOpen(false);
                      }}
                      className="text-white bg-gray-500 w-full py-2 rounded-lg"
                    >
                      View Profile
                    </button>
                    <button
                      onClick={() => navigate("/edit-profile")}
                      type="button"
                      className="text-white bg-gray-500 w-full py-2 rounded-lg"
                    >
                      Edit Profile
                    </button>
                  </div>
                )}
              </div>

              {/* Add Family Section */}
              <div>
                <div
                  onClick={toggleFamily}
                  className="flex justify-center items-center gap-2 border w-full p-2 bg-[#00768A] rounded-xl text-white cursor-pointer"
                >
                  <MdFamilyRestroom />
                  <button type="button" className="text-xl focus:outline-none">
                    Family
                  </button>
                </div>
                {isFamilyOpen && (
                  <div className="flex flex-col space-y-2 mt-2">
                    <button
                      onClick={() => {
                        setActiveSection("familyProfile");
                        setIsProfileOpen(false);
                      }}
                      className="text-white bg-gray-500 w-full py-2 rounded-lg"
                    >
                      View Members
                    </button>
                    <button
                      onClick={() => {
                        setFamilyPopUp(true);
                        setIsProfileOpen(false);
                      }}
                      className="text-white bg-gray-500 w-full py-2 rounded-lg"
                    >
                      Add Family
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="right sm:w-[80%] w-[100%] mt-5">
          {activeSection === "bookings" && <Bookings history={history} />}
          {activeSection === "selfuserprofile" && (
            <SelfProfile userprofiledata={userProfileData} />
          )}
          {activeSection === "doctorselfprofile" && (
            <DoctorSelfProfile doctorProfileData={doctorProfileData} />
          )}
          {activeSection === "familyProfile" && (
            <ViewFamilyMembers
              familyData={familyData}
              getFamilyEdit={getFamilyEdit}
            />
          )}
        </div>
      </div>

      {familyPopUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-3 sm:p-0 lg:p-2">
          <div className="bg-white rounded-lg border-2 z-10 w-full max-w-md mx-4 md:mx-0">
            {/* Scrollable container with a fixed height */}
            <div className="flex justify-between gap-10 items-center px-10 translate-y-5">
              <p className="uppercase font-bold">Add Family members</p>
              <RxCross2
                className="font-bold cursor-pointer"
                onClick={() => setFamilyPopUp(false)}
              />
            </div>

            <div className="h-[90vh] overflow-y-auto p-6 space-y-6">
              <div className="bg-gray-500 h-[1px] w-full bg-opacity-30 mt-5"></div>
              {/* Close button to hide the popup */}
              <AddFamilyMembers
                getFamilyEdit={getFamilyEdit}
                setActiveSection={setActiveSection}
                activeSection={activeSection}
                familyPopUp={familyPopUp}
                setFamilyPopUp={setFamilyPopUp}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
