import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import axios from "axios";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";

import { FaChevronUp } from "react-icons/fa";

import { gsap } from "gsap";
import "./Navbar.css"; // Import the CSS file
import Image from "../../src/Assests/ametheus.webp";
import { FaChevronDown } from "react-icons/fa6";
import MegaMenu from "./MegaMenu";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "INR"
  );
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const menuRef = useRef(null);
  const [openSubMenus, setOpenSubMenus] = useState({});
  const [isMegaMenuVisible, setIsMegaMenuVisible] = useState(false);
  const [Categoriesdata, setCategorydata] = useState([]);
  const [loading, setLoading] = useState(false)

  const submenuData = {
    PatientCare: [
      "Find A doctor",
      "Apollo Surgery-Assured Price",
      "Clinical Quality and Outcome",
      "Service Excellence",
      "Patient Testimonials",
      "Value Added Services",
      "Health and LifeStyle",
      "Pay Online",
      "Medical Feed",
    ],
    CenterOfExcellence: (
      <div className="grid grid-cols-2 gap-4 mt-5">
        {Categoriesdata.map((ele, index) => (
          <Link
            to={`/categories-details/${ele._id}`}
            onClick={() => setIsOpen(false)}
            key={index}
          >
            <div
              key={index}
              className="flex flex-col items-center cursor-pointer bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300 h-full min-h-[150px] justify-between"
            >
              <img
                src={ele?.image}
                alt={ele?.specialtyName}
                className="h-14 w-14 rounded-full object-cover mb-3"
              />
              <p className="text-sm font-semibold text-gray-700 mb-1 text-center">
                {ele.specialtyName}
              </p>
              <p className="text-xs font-medium text-blue-600 hover:underline">
                See all Doctors
              </p>
            </div>
          </Link>
        ))}
      </div>

    ),
    HealthInformation: [
      "Diseases and Condition",
      "Tests and Procedures",
      "Medical Glossary Decoded",
      "Understanding Investigation",
    ],
    InternationalPatients: [
      "Plan your Trip",
      "Online Consultation",
      "Visa",
      "Amethus Insurance",
    ],
    HospitalsDetails: [
      "Courses",
      "Academics",
      "Clinical Research",
      "Honors List",
      "Amethus Torch: Alumni Network",
      "New Medicine",
    ],
    OurServices: ["Medicine"],
    ContactUs: [
      "Post A Query",
      "Consult Doctor Online",
      "Book Physical Appointment",
      "Amethus Lifetime",
    ],
  };


  const toggleSubMenu = (menuKey) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [menuKey]: !prevState[menuKey], // Toggle the submenu for the specified key
    }));
  };

  const handleHover = () => {
    if (!isMegaMenuVisible) {
      setIsMegaMenuVisible(true); // Set to true on the first hover
    }
  };

  const handleCategoryClick = (Categoriesdata) => { };
  handleCategoryClick();

  // Handle click outside
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMegaMenuVisible(false); // Hide the MegaMenu
    }
  };

 
  useEffect(() => {
    // Add event listener to detect clicks outside the menu
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dropdownOpen = () => {
    setDropdown(!dropdown);
    if (dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  };

  const HandleProfile = () => {
    setIsOpen(false);
  };

  useEffect(()=>{
    if(localStorage.getItem("Id")&&  localStorage.getItem("user") && localStorage.getItem("token")){
      setIsLogin(true);
    }
  },[])

  const logout = () => {
    localStorage.removeItem("Id");
    localStorage.removeItem("user");
    localStorage.removeItem("signupemail");
    localStorage.removeItem("token"); 
    setIsLogin(false);
    setIsOpen(false);
    {
      localStorage.getItem("token") ? navigate("/") : navigate("/auth");
    }
  };

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);
  
    // Dispatch a custom event to notify other parts of the application
    const event = new Event("currencyChange");
    window.dispatchEvent(event);
  
    // Update the currency in the URL without reloading the page
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.set("currency", newCurrency);
  
    // Push or replace the state in the URL
    window.history.replaceState(null, "", currentUrl.toString());
  };

  useEffect(() => {
    FetchCategoriesData();
  }, []);

  const FetchCategoriesData = async () => {
    try {
      setLoading(true)
      const res = await axios(
        "https://api.assetorix.com/ah/api/v1/dc/user/Category?limit=20"
      );
      setCategorydata(res.data.data);
    } catch (error) { 
      console.error("Error fetching categories data: ", error);
    }finally{
      setLoading(false);
    }
  };

  const HandleScrolling = () => {
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }, []);
  };

  return (
    <div className="bg-white sticky top-[-2px] z-50 shadow-md">
      <nav className="text-black  max-w-[92vw] top-0 z-50 bg-white mx-auto">
        <div className="sm:max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="text-xl font-bold flex-shrink-0 "
              onClick={HandleScrolling}
            >
              <img
                className="h-14 w-[50vw] sm:w-[20vw]"
                src={Image}
                alt="logo"
              />
            </Link>

            {/* Menu Items */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex gap-10">
                <div className="relative cursor-pointer group">
                  <span className="relative z-10">
                    <Link to="/about">About</Link>
                  </span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[#00768A] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </div>

                <div
                  className="relative cursor-pointer group"
                  ref={menuRef}
                  onMouseEnter={handleHover}
                >
                  <span className="relative z-10">Service</span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[#00768A] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </div>

                <div className="relative cursor-pointer group">
                  <span className="relative z-10">
                    <Link to="/contact-us">Contact</Link>
                  </span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </div>
              </div>

              {/* Currency Selector */}
              <select
                className="border p-2 rounded-md ml-4 text-sm"
                defaultValue={localStorage.getItem("currency")}
                onChange={handleCurrencyChange}
              >
                <option value="INR">₹ INR</option>
                <option value="USD">$ USD</option>
                <option value="NPR">रु NPR</option>
                <option value="BDT">৳ BDT</option>
                <option value="EUR">€ EUR</option>
                <option value="GBP">£ GBP</option>
                <option value="AED">د.إ. AED</option>
              </select>

              {/* Profile section */}
              <div
                className="hover:cursor-pointer px-3 py-2 rounded-md text-2xl relative hidden sm:block"
                onClick={dropdownOpen}
              >
                <FiUser />
                <div
                  ref={dropdownRef}
                  className={`absolute bg-white rounded-xl shadow-lg p-4 z-50  flex -left-[10rem] top-[50px] flex-col w-[20vw]   h-max ${dropdown ? "block" : "hidden"
                    }`}
                >
                  {isLogin ? (
                    <div className="flex flex-col justify-betwee">
                      <div
                        className="shadow-sm rounded-lg "
                        onClick={() => navigate("/profile")}
                      >
                        <p className="text-semibold text-gray-400 text-[16px] capitalize leading-4 py-1 text-center ">
                          Welcome <br />{" "}
                          <span className=" font-bold text-[#00768A] opacity-85">
                            {localStorage.getItem("user")}
                          </span>
                        </p>
                      </div>
                      <div className="py-3">
                        <Link to="/profile">
                          <h4 className="sm:text-[16px] text-[14px] my-1">
                            Profile
                          </h4>
                        </Link>

                        <Link to="/support-center">
                          <h4 className="sm:text-[16px] text-[14px] my-1">
                            Report a problem
                          </h4>
                        </Link>
                      </div>
                      <div className="float-end ">
                        <button
                          className="text-lg font-semibold text-gray-600 rounded-md border w-full text-center mx-auto"
                          onClick={logout}
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4
                        className="sm:text-[16px] text-[14px] my-1 cursor-pointer"
                        onClick={() => navigate("/auth")}
                      >
                        Login
                      </h4>

                      <Link to="/support-center">
                        <h4 className="sm:text-[16px] text-[14px] my-1">
                          Report a problem
                        </h4>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="block sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-black p-2 rounded-md focus:outline-none focus:ring-0 focus:border-0 !border-none !outline-none"
              >
                {isOpen ? (
                  <RxCross1 size={24} />
                ) : (
                  <RxHamburgerMenu
                    size={24}
                    className="focus:outline-none focus:ring-0 focus:border-0 !border-none !outline-none"
                  />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div>
          {isOpen && (
            <div className="md:hidden w-full -translate-x-3 bg-white text-black h-max pb-32 absolute z-50 border  overflow-y-auto max-h-screen">
              <div className="flex flex-col justify-between p-4 space-y-6">
                {/* Profile Section */}
                <Link
                  to="/profile"
                  className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all"
                  onClick={HandleProfile}
                >
                  <div className="relative h-[60px] w-[60px] flex justify-center items-center bg-[#00768A] rounded-full shadow-lg">
                    <CgProfile className="h-[40px] w-[40px] text-white" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h4 className="text-lg font-semibold text-gray-700">
                      Hi there,{" "}
                      <span className="font-bold text-[#00768A]">
                        {localStorage.getItem("user")}
                      </span>
                    </h4>
                  </div>
                </Link>
              </div>

              <div className="px-2 pt-2 space-y-1">
                <Link
                  to="/about"
                  className="block px-3 py-2 rounded-md font-bold uppercase text-sm"
                >
                  About
                </Link>

                {/* MegaMenu Dropdown */}
                <div className="pl-3 space-y-1">
                  {Object.keys(submenuData).map((menu, index) => (
                    <div key={index}>
                      <div
                        className="font-bold py-2 rounded-md text-sm  cursor-pointer flex "
                        onClick={() => toggleSubMenu(menu)}
                      >
                        {menu.replace(/([A-Z])/g, " $1").toUpperCase()}

                        {/* Format the menu name */}
                        {openSubMenus[menu] ? (
                          <span className="ml-2 p-1">
                            <FaChevronUp />
                          </span>
                        ) : (
                          <span className="ml-2 p-1">
                            <FaChevronDown />
                          </span>
                        )}
                      </div>
                      {openSubMenus[menu] && (
                        <ul className="pl-4 space-y-1">
                          {/* Check if submenuData[menu] is an array */}
                          {
                            Array.isArray(submenuData[menu])
                              ? submenuData[menu].map((subItem, index) => (
                                <li
                                  key={index}
                                  className="block px-3 py-2 rounded-md text-sm hover:bg-blue-100 "
                                >
                                  <span className="p-2 mt-2">{subItem}</span>
                                  <hr />
                                </li>
                              ))
                              : submenuData[menu] // Render the component (like CenterOfExcellence) for non-array data
                          }
                        </ul>
                      )}
                    </div>
                  ))}
                </div>

                <Link
                  to="/all-doctors"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md font-bold uppercase text-sm"
                >
                  Doctors
                </Link>
                <Link
                  to="/contact-us"
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md font-bold uppercase text-sm "
                >
                  Contact
                </Link>

                {/* Logout Button */}
                <div className="flex justify-start">
                  <button
                    onClick={logout}
                    className="px-4 py-3 mt-3 w-[110px] flex items-center justify-center  text-black rounded-lg text-lg font-semibold transition-colors duration-300  hover:shadow-lg focus:outline-none"
                  >
                    <AiOutlineLogout className="text-2xl mr-1" />{" "}
                    {/* Increased icon size with margin to separate from text */}
                    <span className="text-md font-medium">
                      {localStorage.getItem("Id") && localStorage.getItem("token") ? (
                        <span>Logout</span>
                      ) : (
                        <span>Login</span>
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* MegaMenu for Desktop */}
      <div>
        {/* MegaMenu Component */}
        <div
          ref={menuRef} // Attach ref to the container
          onMouseEnter={handleHover}
        >
          {isMegaMenuVisible && (
            <div className=" top-full left-0 mt-2 bg-white text-black shadow-lg">
              <MegaMenu  Categoriesdata = {Categoriesdata} loading = {loading} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
