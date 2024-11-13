import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import axios from "axios";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { FaChevronUp } from "react-icons/fa";
import { BsCart3, BsCartPlus } from "react-icons/bs";
import { gsap } from "gsap";
import "./Navbar.css"; // Import the CSS file
import Image from "../../src/Assests/ametheus.webp";
import { FaChevronDown } from "react-icons/fa6";
import MegaMenu from "./MegaMenu";
import TopHeader from "./TopHeader";

const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "INR"
  );
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchResultsRef = useRef(null);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);
  const location = useLocation();
  const [MegaMenubtn, setMegaMenubtn] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });

  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});

  const [Categoriesdata, setCategorydata] = useState([]);
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
    CenterOfExcellence: [
      "Cardiology",
      "Orthopedics",
      "Spine",
      "Neurology",
      "Gastroenterology",
      "Oncology",
      "TransPlant",
      "ICU",
      "Emergency",
      "Preventive Health",
      "Robotics",
      "Bariatric Surgery",
      "Nephrology and Urology",
      "Colorectal Surgery",
      "Obstetrics and Gynaecology",
      "Pulmonology",
    ],
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

  const handleCategoryClick = (Categoriesdata) => {
    console.log(Categoriesdata);
  };
  handleCategoryClick();

  const handleMouseEnter = (item, event) => {
    setHoveredItem(item); // Set the hovered item
    const menuItemRect = event.target.getBoundingClientRect();
    setSubmenuPosition({
      top: menuItemRect.bottom + window.scrollY, // Position the submenu below the hovered item
      left: menuItemRect.left + window.scrollX, // Position the submenu aligned to the left of the hovered item
    });
    // Open the corresponding submenu when hovering
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [item]: true,
    }));
  };


  const handleMouseLeave = (item) => {
  setHoveredItem(null); // Reset the hovered item
  // Close the submenu when mouse leaves the item
  setOpenSubMenus((prevState) => ({
    ...prevState,
    [item]: false,
  }));
};
  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
  };
  const containerRef = useRef(null);
  const megaMenuRef = useRef(null);
  const handleClickOutside = (event) => {
    // If the click was outside the Mega Menu, hide it
    if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
      setMegaMenubtn(false);
      setIsHoveringServices(false);
    }
  };

  const setBothRefs = (node) => {
    containerRef.current = node;
    megaMenuRef.current = node;
  };
  useEffect(() => {
    // Add event listener to detect clicks outside the menu
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [isHoveringServices, setIsHoveringServices] = useState(false);
  const serviceRef = useRef(null);

  const animateCartIcon = () => {
    gsap.fromTo(
      cartRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
    );
  };

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

  const logout = () => {
    localStorage.removeItem("Id");
    localStorage.removeItem("User");
    localStorage.removeItem("signupemail");
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/");
  };

  useEffect(() => {
    if (
      localStorage.getItem("id") &&
      localStorage.getItem("token") &&
      localStorage.getItem("user")
    ) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    const fetchData = async () => {
      if (query.length > 2) {
        let queries = encodeURIComponent(query);
        try {
          const response = await axios.get(
            `https://api.assetorix.com/ah/api/v1/product/search/?currency=${currency}&search=${queries}`
          );
          const data = response.data.data; // Adjust based on the actual response structure

          if (data.length > 0) {
            setResults(data);
            setShowResults(true);
            setNoResults(false);
            if (searchResultsRef.current) {
              gsap.fromTo(
                searchResultsRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5 }
              );
            }
          } else {
            setResults([]);
            setShowResults(false);
            setNoResults(true);
            setTimeout(() => setNoResults(false), 4000); // Hide no results message after 4 seconds
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500); // Debounce input to avoid too many API calls

    return () => clearTimeout(timeoutId);
  }, [query, currency]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/all-product?search=${query}`);
    }
  };

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);

    // Dispatch a custom event to notify other parts of the application
    const event = new Event("currencyChange");
    window.dispatchEvent(event);
  };

  useEffect(() => {
    FetchCategoriesData();
  }, []);

  const FetchCategoriesData = async () => {
    try {
      const res = await axios(
        "https://api.assetorix.com/ah/api/v1/dc/user/Category"
      );
      setCategorydata(res.data.data);
    } catch (error) {}
  };

  return (
    
    <div className="">
      <nav className="text-black  top-0 z-50 bg-white w-full">
        <div className="sm:max-w-7xl w-full px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="text-xl font-bold flex-shrink-0 ">
              <img
                className="h-14 w-[50vw] sm:w-[20vw]"
                src={Image}
                alt="logo"
              />
            </Link>

            {/* Search Input Section */}
            <div className="relative flex-grow mx-4 hidden sm:block">
              {noResults && (
                <div
                  ref={searchResultsRef}
                  className="absolute w-full left-0 border rounded-lg shadow-lg p-4 bg-white max-h-64 overflow-y-auto z-10"
                >
                  <div className="text-sm text-red-600">No Product Found</div>
                </div>
              )}
              {showResults && (
                <div
                  ref={searchResultsRef}
                  className="absolute w-full left-0 border rounded-lg shadow-lg p-4 bg-white max-h-64 overflow-y-auto z-10"
                >
                  {results.map((product) => (
                    <div
                      key={product?._id}
                      className="flex items-center space-x-4 mb-2 cursor-pointer"
                      onClick={() => handleProductClick(product?.slug)}
                    >
                      {Array.isArray(product?.images) &&
                      product.images.length > 0 ? (
                        <img
                          src={product?.images[0]?.url || "./default.jpg"}
                          alt={product?.images[0]?.alt || product?.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <img
                          className="w-12 h-12 object-cover rounded"
                          src="/default.jpg"
                          alt="default alt text"
                        />
                      )}
                      <span className="text-sm">{product?.title}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex gap-10">
                <div className="relative cursor-pointer group">
                  <span className="relative z-10">
                    <Link to="/">Home</Link>
                  </span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[#00768A] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </div>

                <div className="relative cursor-pointer group">
                  <span className="relative z-10">
                    <Link to="/about">About</Link>
                  </span>
                  <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[#00768A] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
                </div>

                <div
                  className="relative cursor-pointer group"
                  ref={megaMenuRef}
                  onMouseEnter={() => {
                    setMegaMenubtn(true);
                    setIsHoveringServices(true);
                  }}
                  onMouseLeave={() => {
                    setIsHoveringServices(false);
                  }}
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
                  className={`absolute bg-white rounded-xl shadow-lg p-4 z-50 flex -left-[6rem] flex-col w-[15vw] h-max ${
                    dropdown ? "block" : "hidden"
                  }`}
                >
                  {isLogin ? (
                    <div className="flex flex-col justify-between">
                      <div className="border rounded-lg ">
                        <p className="text-semibold text-gray-400 text-[16px] capitalize text-center ">
                          Welcome {localStorage.getItem("user")}
                        </p>
                      </div>
                      <div>
                        <Link to="/profile">
                          <h4 className="sm:text-[16px] text-[14px] my-1">
                            Profile
                          </h4>
                        </Link>
                        <Link to="/profile">
                          <h4 className="sm:text-[16px] text-[14px] my-1">
                            Your Order
                          </h4>
                        </Link>
                        <Link to="/support-center">
                          <h4 className="sm:text-[16px] text-[14px] my-1">
                            Report a problem
                          </h4>
                        </Link>
                        <Link to="/contact">
                          <h4 className="sm:text-[16px] text-[14px] my-1">
                            Bulk Buy
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
                      <Link to="/profile">
                        <h4 className="sm:text-[16px] text-[14px] my-1">
                          Your Order
                        </h4>
                      </Link>
                      <Link to="/support-center">
                        <h4 className="sm:text-[16px] text-[14px] my-1">
                          Report a problem
                        </h4>
                      </Link>
                      <h4 className="sm:text-[16px] text-[14px] my-1">
                        Bulk Buy
                      </h4>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="block sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-black p-2 rounded-md"
              >
                {isOpen ? (
                  <RxCross1 size={24} />
                ) : (
                  <RxHamburgerMenu size={24} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white-200 text-black h-max pb-32 ">
            <div className="px-2 pt-2 space-y-1">
              <Link
                to="/"
                className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white"
              >
                Home
              </Link>

              <Link
                to="/about"
                className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white"
              >
                About
              </Link>

              {/* MegaMenu Dropdown */}
              <div className="pl-4 space-y-1">
                {Object.keys(submenuData).map((menu, index) => (
                  <div key={index}>
                    <div
                      className=" px-3 py-2 rounded-md text-sm hover:bg-blue-500 hover:text-white cursor-pointer flex"
                      onClick={() => toggleSubMenu(menu)}
                    >
                      {menu.replace(/([A-Z])/g, " $1")}
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
                        {submenuData[menu].map((subItem, index) => (
                          <li
                            key={index}
                            className="block px-3 py-2 rounded-md text-sm hover:bg-blue-100"
                          >
                            <span className="p-2 mt-2">{subItem}</span>
                            <hr />
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>

              <Link
                to="/CategoriesDetails/:id"
                className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white"
              >
                Doctors
              </Link>
              <Link
                to="/contact-us"
                className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* MegaMenu for Desktop */}
      <div>
      {/* {MegaMenubtn && (
        <div className="bg-[#F7F6F9] bg-opacity-40 z-50">
          <div className="flex justify-center gap-8 py-4 bg-[#00768A] text-white flex-wrap md:flex-nowrap">
            {Object.keys(submenuData).map((menu, index) => (
              <div key={index} className="relative cursor-pointer group">
                <span
                  className="cursor-pointer px-4 py-2 font-medium hover:scale-110 duration-300 relative z-10"
                  onMouseEnter={(e) => handleMouseEnter(menu, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  {menu.replace(/([A-Z])/g, " $1")}
                </span>
                <span className="absolute left-0 bottom-0 h-0.5 w-full bg-white scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 group-hover:origin-left origin-left"></span>
              </div>
            ))}
            
          </div>
        </div>
      )} */}
      <MegaMenu/>
      </div>
    </div>
    
  );
};

export default Navbar;
