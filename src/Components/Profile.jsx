import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  FaHome,
  FaUser,
  FaChevronDown,
  FaChevronUp,
  FaQuestion,
} from "react-icons/fa";
import { FaCheckToSlot, FaUserDoctor } from "react-icons/fa6";
import { TbBrandBooking } from "react-icons/tb";
import Bookings from "./Bookings";
import SelfProfile from "./SelfProfile";
import DoctorSelfProfile from "./DoctorSelfProfile";
import {
  MdClose,
  MdFamilyRestroom,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { IoPerson } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import AddFamilyMembers from "./AddFamilyMembers";
import { RxCross2 } from "react-icons/rx";
import ViewFamilyMembers from "./ViewFamilyMembers/ViewFamilyMembers";
import UserBookings from "./UserBookings/UserBookings";
import EditUserDetails from "./EditUserDetails/EditUserDetails";
import CreateSlotsByDr from "./CreateSlotsByDr/CreateSlotsByDr";
import AllSlots from "./AllSlots/AllSlots";
const Profile = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [history, setHistory] = useState([]);
  const [userProfileData, setUserProfileData] = useState([]);
  const [doctorProfileData, setDoctorProfileData] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isDoctorProfileOpen, setIsDoctorProfileOpen] = useState(false);
  const [familyPopUp, setFamilyPopUp] = useState(false);
  const [familyData, setFamilyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);
  const [userBooking, setUserBooking] = useState([]);
  const [activeSection, setActiveSection] = useState("selfuserprofile");
  const location = useLocation();

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  useEffect(() => {
    // Extract query parameter from the URL
    const params = new URLSearchParams(location.search);
    const section = params.get("section");
    if (section && section !== activeSection) {
      setActiveSection(section); // Only update if the value is different
    }
  }, [location.search, activeSection]);

  const handleSectionChange = (newSection) => {
    if (newSection !== activeSection) {
      setActiveSection(newSection);
      navigate(`/profile?section=${newSection}`);
    }
  };

  const toggleMenu = (menu) => {
    if (selectedMenu === menu) {
      setSelectedMenu(null);
    } else {
      setSelectedMenu(menu);
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
    } catch (error) {}
  };

  useEffect(() => {
    userData();
  }, []);

  const navigate = useNavigate();

  // / Function to toggle the profile bar
  const toggleProfileBar = () => setIsProfileOpen(!isProfileOpen);
  const closeProfileBar = () => setIsProfileOpen(false);

  const toggleUserProfile = () => setIsUserProfileOpen((prev) => !prev);

  const toggleDoctorProfile = () => setIsDoctorProfileOpen((prev) => !prev);

  const toggleFamily = () => setIsFamilyOpen((prev) => !prev);

  if (loading) {
    return <div className="loader"></div>; // Loader is displayed
  }

  return (
    <div>
      <div className="bg-gray-300 bg-opacity-50 w-full h-[1px] mt-5"></div>
      <div className="sm:flex gap-10 p-10">
        {/* desktop section */}
        <div className="left h-[600px] w-[20%] sm:flex hidden flex-col mt-5 shadow-xl sticky top-[100px]">
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

              {/* user bookings */}
              {(userProfileData?.data?.role === "customer" ||
                userProfileData?.data?.role === "doctor" ||
                userProfileData?.data?.role === "admin") && (
                <li className="mb-2">
                  <a
                    onClick={() => handleSectionChange("user-bookings")}
                    href="#"
                    className="flex items-center p-2 rounded-md hover:bg-[#00768A] hover:text-white text-black"
                  >
                    <TbBrandBooking className="mr-2" />
                    My Bookings
                  </a>
                </li>
              )}

              <li className="mb-2">
                <div
                  className="flex items-center justify-between p-2 rounded-md hover:bg-[#00768A] hover:text-white cursor-pointer"
                  onClick={() => toggleMenu("profile")}
                >
                  <div className="flex items-center">
                    <FaUser className="mr-2" /> My Profile
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
                        onClick={() => handleSectionChange("selfuserprofile")}
                        className="block p-1 hover:bg-[#00768A] rounded-md hover:text-white text-black cursor-pointer"
                      >
                        View Users
                      </p>
                    </li>
                    <li>
                      <p
                        onClick={() => handleSectionChange("edituserprofile")}
                        className="block cursor-pointer p-1 hover:bg-[#00768A] rounded-md hover:text-white text-black"
                      >
                        Edit User
                      </p>
                    </li>
                  </ul>
                )}
              </li>

              {/* Settings Section with Subsections */}
              {userProfileData?.data?.role === "doctor" && (
                <li className="mb-2">
                  <div
                    className="flex items-center justify-between p-2 rounded-md hover:bg-[#00768A] hover:text-white cursor-pointer"
                    onClick={() => toggleMenu("settings")}
                  >
                    <div className="flex items-center">
                      <FaUserDoctor className="mr-2" />
                      My Doctor Profile
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
                          onClick={() =>
                            handleSectionChange("doctorselfprofile")
                          }
                          className="block p-1 hover:bg-[#00768A] rounded-md hover:text-white text-black cursor-pointer"
                        >
                          View Profile
                        </p>
                      </li>
                      <li className="mb-2">
                        <a
                          onClick={() => handleSectionChange("bookings")}
                          className="flex cursor-pointer items-center p-2 rounded-md hover:bg-[#00768A] hover:text-white text-black"
                        >
                          Appointments
                        </a>
                      </li>
                      <li>
                        <p
                          onClick={() => handleSectionChange("view-slots")}
                          className="block cursor-pointer p-1 hover:bg-[#00768A] rounded-md hover:text-white text-black"
                        >
                          View Slots
                        </p>
                      </li>
                    </ul>
                  )}
                </li>
              )}

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
                        onClick={() => handleSectionChange("familyProfile")}
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
        <div className="sm:hidden">
          {/* Profile Button at the top */}
          <div
            onClick={toggleProfileBar}
            className="flex z-50 justify-center items-center w-full"
          >
            <button
              type="button"
              className="bg-blue-500 text-[22px] text-white p-4 rounded-xl shadow-lg md:hidden focus:outline-none w-full"
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
                  handleSectionChange("bookings");
                }}
                className="flex justify-center items-center gap-2 border w-[100%] p-2 bg-[#00768A] rounded-xl text-white"
              >
                <FaQuestion />
                <button type="button" className="text-xl">
                  Bookings
                </button>
              </div>

              {/* User Profile Section */}
              {userProfileData?.data?.role === "customer" && (
                <div>
                  <div
                    onClick={toggleUserProfile}
                    className="flex justify-center items-center gap-2 border w-full p-2 bg-[#00768A] rounded-xl text-white cursor-pointer"
                  >
                    <IoPerson />
                    <button
                      type="button"
                      className="text-xl focus:outline-none"
                    >
                      My Profile
                    </button>
                  </div>
                  {isUserProfileOpen && (
                    <div className="flex flex-col space-y-2 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          handleSectionChange("selfuserprofile");
                          setIsProfileOpen(false);
                        }}
                        className="text-white bg-gray-500 w-full py-2 rounded-lg"
                      >
                        View Profile
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSectionChange("edituserprofile")}
                        className="text-white bg-gray-500 w-full py-2 rounded-lg"
                      >
                        Edit Profile
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Doctor Profile Section */}
              {userProfileData?.data?.role === "doctor" && (
                <div>
                  <div
                    onClick={toggleDoctorProfile}
                    className="flex justify-center items-center gap-2 border w-full p-2 bg-[#00768A] rounded-xl text-white cursor-pointer"
                  >
                    <FaUserDoctor />
                    <button
                      type="button"
                      className="text-xl focus:outline-none"
                    >
                      Doctor Profile
                    </button>
                  </div>
                  {isDoctorProfileOpen && (
                    <div className="flex flex-col space-y-2 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          handleSectionChange("doctorselfprofile");
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
              )}

              {/* slots */}
              {userProfileData?.data?.role === "doctor" && (
                <div>
                  <div
                    onClick={toggleUserProfile}
                    className="flex justify-center items-center gap-2 border w-full p-2 bg-[#00768A] rounded-xl text-white cursor-pointer"
                  >
                    <IoPerson />
                    <button
                      type="button"
                      className="text-xl focus:outline-none"
                    >
                      Slots
                    </button>
                  </div>
                  {isUserProfileOpen && (
                    <div className="flex flex-col space-y-2 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          handleSectionChange("create-slots");
                          setIsProfileOpen(false);
                        }}
                        className="text-white bg-gray-500 w-full py-2 rounded-lg"
                      >
                        Create Slots
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleSectionChange("view-slots");
                          setIsProfileOpen(false);
                        }}
                        className="text-white bg-gray-500 w-full py-2 rounded-lg"
                      >
                        View Slots
                      </button>
                    </div>
                  )}
                </div>
              )}

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
                        handleSectionChange("familyProfile");
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
          {/* booking data for doctor */}
          {activeSection === "bookings" && <Bookings history={history} />}
          {activeSection === "selfuserprofile" && (
            <SelfProfile userprofiledata={userProfileData} />
          )}
          {activeSection === "doctorselfprofile" && userProfileData.data && (
            <DoctorSelfProfile doctorProfileData={doctorProfileData} />
          )}
          {activeSection === "familyProfile" && (
            <ViewFamilyMembers familyData={familyData} />
          )}
          {activeSection === "user-bookings" && (
            <UserBookings
              userBooking={userBooking}
              setUserBooking={setUserBooking}
            />
          )}
          {activeSection === "edituserprofile" && <EditUserDetails />}
          {activeSection === "create-slots" && <CreateSlotsByDr />}
          {activeSection === "view-slots" && (
            <AllSlots
              activeSection={activeSection}
              setActiveSection={setActiveSection}
              handleSectionChange={handleSectionChange}
            />
          )}
        </div>
      </div>

      {familyPopUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-3 sm:p-0 lg:p-2">
          <div className="bg-white rounded-lg border-2 z-10 w-full max-w-md mx-4 md:mx-0">
            {/* Scrollable container with a fixed height */}
            <div className="flex justify-between gap-10 items-center px-10 translate-y-5">
              <p className="uppercase sm:font-bold sm:text-xl text-sm">
                Add Family members
              </p>
              <RxCross2
                className="font-bold cursor-pointer"
                onClick={() => setFamilyPopUp(false)}
              />
            </div>

            <div className="sm:h-[90vh] overflow-y-auto sm:p-6 px-3 py-2 sm:space-y-6">
              <div className="bg-gray-500 h-[1px] w-full bg-opacity-30 mt-5"></div>
              {/* Close button to hide the popup */}
              <AddFamilyMembers
                handleSectionChange={handleSectionChange}
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
