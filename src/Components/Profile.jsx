import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePopper } from "react-popper";
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
  const [userProfileData, setUserProfileData] = useState([]);
  const [doctorProfileData, setDoctorProfileData] = useState([]);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isUserProfileOpen, setIsUserProfileOpen] = useState(false);
  const [isDoctorProfileOpen, setIsDoctorProfileOpen] = useState(false);
  const [familyPopUp, setFamilyPopUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isFamilyOpen, setIsFamilyOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("selfuserprofile");
  const location = useLocation();
  const [isNewUser, setIsNewUser] = useState(false);
  const [tutorialStep, setTutorialStep] = useState(0);
  const [referenceElement, setReferenceElement] = useState(null);
  const [popperElement, setPopperElement] = useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    placement: "right",
    modifiers: [
      {
        name: "offset",
        options: { offset: [20, 10] },
      },
    ],
  });

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

  // const docotrData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://api.assetorix.com/ah/api/v1/dc/doctor",
  //       {
  //         headers: {
  //           authorization: `Bearer ${token}`,
  //           id: id,
  //         },
  //       }
  //     );
  //     setDoctorProfileData(response.data);
  //   } catch (error) {}
  // };

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

  const sidebarItems = [
    {
      title: "My Profile",
      icon: <FaUser className="mr-2" />,
      menuKey: "profile",
      description: "Manage your personal profile and settings.",
      items: [
        { label: "View Users", sectionKey: "selfuserprofile" },
        { label: "Edit User", sectionKey: "edituserprofile" },
      ],
    },
    {
      title: "My Doctor Profile",
      icon: <FaUserDoctor className="mr-2" />,
      menuKey: "settings",
      description: "View and manage your doctor profile and appointments.",
      items: [
        { label: "View Profile", sectionKey: "doctorselfprofile" },
        { label: "Appointments", sectionKey: "bookings" },
        { label: "View Slots", sectionKey: "view-slots" },
      ],
    },
    {
      title: "Family Members",
      icon: <FaUser className="mr-2" />,
      menuKey: "family",
      description: "Manage your family members and their profiles.",
      items: [
        { label: "View Members", sectionKey: "familyProfile" },
        { label: "Add Family", sectionKey: "addFamily" },
      ],
    },
    {
      title: "My Bookings", // Non-dropdown item
      icon: <TbBrandBooking className="mr-2" />,
      description: "View and manage your current bookings.",
      isStandalone: true,
    },
  ];

  useEffect(() => {
    const isReturningUser = localStorage.getItem("hasSeenTutorial");
    if (!isReturningUser) {
      setIsNewUser(true);
    }
  }, []);

  const handleNext = () => {
    // Skip hidden steps (e.g., 'My Doctor Profile' for non-doctor users)
    let nextStep = tutorialStep + 1;
    while (
      nextStep < filteredSidebarItems.length &&
      filteredSidebarItems[nextStep].menuKey === "settings"
    ) {
      nextStep++;
    }

    if (nextStep < filteredSidebarItems.length) {
      setTutorialStep(nextStep);
    } else {
      setIsNewUser(false);
      localStorage.setItem("hasSeenTutorial", true);
    }
  };

  const handleSkip = () => {
    setIsNewUser(false);
    localStorage.setItem("hasSeenTutorial", true);
  };

  const renderDropdownMenu = ({
    title,
    icon,
    description,
    items,
    menuKey,
    selectedMenu,
    toggleMenu,
    handleSectionChange,
  }) => (
    <li className="mb-2">
      <div
        className="flex items-center justify-between p-2 rounded-md hover:bg-[#00768A] hover:text-white cursor-pointer"
        onClick={() => toggleMenu(menuKey)}
        ref={
          tutorialStep ===
          sidebarItems.findIndex((item) => item.menuKey === menuKey)
            ? setReferenceElement
            : null
        }
      >
        <div className="flex items-center">
          {icon}
          {title}
        </div>
        {selectedMenu === menuKey ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {selectedMenu === menuKey && (
        <ul className="ml-6 mt-2 space-y-1 text-gray-300">
          {items.map((item, index) => (
            <li key={index}>
              <p
                onClick={() => handleSectionChange(item.sectionKey)}
                className="block p-1 hover:bg-[#00768A] rounded-md hover:text-white text-black cursor-pointer"
              >
                {item.label}
              </p>
            </li>
          ))}
        </ul>
      )}
    </li>
  );

  // Skip 'My Doctor Profile' if role is not doctor
  const filteredSidebarItems = sidebarItems.filter(
    (item) =>
      item.menuKey !== "settings" || userProfileData?.data?.role === "doctor"
  );

  return (
    <div>
      <div className="bg-gray-300 bg-opacity-50 w-full  mt-5"></div>
      <div className="sm:flex gap-10 p-10">
        {/* desktop section */}
        <div className="left h-[600px] w-[20%] sm:flex hidden flex-col mt-5 shadow-xl sticky top-[100px]">
          <nav className="flex-1 p-2">
            <ul>
              <li
                className={`mb-2 ${
                  tutorialStep ===
                  sidebarItems.findIndex((item) => item.title === "Home")
                    ? "bg-[#00768A] text-white"
                    : ""
                }`}
                ref={
                  tutorialStep ===
                  sidebarItems.findIndex((item) => item.title === "Home")
                    ? setReferenceElement
                    : null
                }
              >
                <a
                  href="/"
                  className="flex items-center p-2 rounded-md hover:bg-[#00768A] hover:text-white text-black"
                >
                  <FaHome className="mr-2" /> Home
                </a>
              </li>
              {filteredSidebarItems.map((item, index) => {
                return (
                  <React.Fragment key={index}>
                    <li
                      ref={tutorialStep === index ? setReferenceElement : null}
                      className={`mb-2 ${
                        tutorialStep === index ||
                        selectedMenu === sidebarItems[index].menuKey
                          ? "bg-[#00768A] text-white"
                          : ""
                      }`}
                    >
                      {item.isStandalone ? (
                        <div
                          className="flex items-center p-2 rounded-md hover:bg-[#00768A] hover:text-white text-black cursor-pointer"
                          onClick={() => handleSectionChange("user-bookings")}
                        >
                          {item.icon}
                          {item.title}
                        </div>
                      ) : (
                        renderDropdownMenu({
                          ...item,
                          selectedMenu,
                          toggleMenu,
                          handleSectionChange,
                        })
                      )}
                    </li>
                  </React.Fragment>
                );
              })}
            </ul>
          </nav>

          {/* Tooltip for tutorial */}
          {isNewUser && tutorialStep < filteredSidebarItems.length && (
            <div
              ref={setPopperElement}
              style={styles.popper}
              {...attributes.popper}
              className="p-4 bg-white shadow-lg border rounded-md"
            >
              {/* Ensure the popper description is only shown for the current tutorial step */}
              {filteredSidebarItems[tutorialStep]?.description && (
                <p className="text-sm text-gray-700">
                  {filteredSidebarItems[tutorialStep].description}
                </p>
              )}
              <div className="flex justify-end space-x-2 mt-3">
                <button
                  className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md"
                  onClick={handleSkip}
                >
                  Skip
                </button>
                <button
                  className="bg-[#00768A] text-white px-3 py-1 rounded-md"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          )}
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
          {activeSection === "bookings" && <Bookings />}
          {activeSection === "selfuserprofile" && (
            <SelfProfile userprofiledata={userProfileData} />
          )}
          {activeSection === "doctorselfprofile" && userProfileData.data && (
            <DoctorSelfProfile />
          )}
          {activeSection === "familyProfile" && <ViewFamilyMembers />}
          {activeSection === "user-bookings" && <UserBookings />}
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
