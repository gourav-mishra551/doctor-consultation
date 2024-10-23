import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import axios from "axios";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { FaChevronUp } from "react-icons/fa";
// import SubNavbar from "../SubNavbar/SubNavbar";
import { BsCart3, BsCartPlus } from "react-icons/bs";
import { gsap } from "gsap";
import "./Navbar.css"; // Import the CSS file
import Image from "../../src/Assests/ametheus.webp";
import { FaChevronDown } from "react-icons/fa6";
// import SubNavMobile from "../SubNavbar/SubNavMobile";


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
  const [MegaMenubtn,setMegaMenubtn]=useState(false)
  const [hoveredItem, setHoveredItem] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [openSubMenus, setOpenSubMenus] = useState({});

  const submenuData = {
    PatientCare: ['Find A doctor', 'Apollo Surgery-Assured Price', 'Clinical Quality and Outcome', 'Service Excellence', 'Patient Testimonials', 'Value Added Services', 'Health and LifeStyle', 'Pay Online', 'Medical Feed'],
    CenterOfExcellence: ['Cardiology', 'Orthopedics', 'Spine', 'Neurology', 'Gastroenterology', 'Oncology', 'TransPlant', 'ICU', 'Emergency', 'Preventive Health', 'Robotics', 'Bariatric Surgery', 'Nephrology and Urology', 'Colorectal Surgery', 'Obstetrics and Gynaecology', 'Pulmonology'],
    HealthInformation: ['Diseases and Condition', 'Tests and Procedures', 'Medical Glossary Decoded', 'Understanding Investigation'],
    InternationalPatients: ['Plan your Trip', 'Online Consultation', 'Visa', 'Amethus Insurance'],
    HospitalsDetails: ['Courses', 'Academics', 'Clinical Research', 'Honors List', 'Amethus Torch: Alumni Network', 'New Medicine'],
    OurServices:["Medicine"],
    ContactUs: ['Post A Query', 'Consult Doctor Online', 'Book Physical Appointment', 'Amethus Lifetime']
  };


  const toggleSubMenu = (menuKey) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [menuKey]: !prevState[menuKey] // Toggle the submenu for the specified key
    }));
  };
  

  const handleMouseEnter = (item, event) => {
    setHoveredItem(item);
    const menuItemRect = event.target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    setSubmenuPosition({
      top: menuItemRect.bottom - containerRect.top + 90, // Adjusted for dropdown position
      left: menuItemRect.left - containerRect.left +10// Align to the left edge of the hovered item
    });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const toggleMegaMenu = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
  };
  


  const megaMenuRef = useRef(null);
  const handleClickOutside = (event) => {
    // If the click was outside the Mega Menu, hide it
    if (megaMenuRef.current && !megaMenuRef.current.contains(event.target)) {
      setMegaMenubtn(false);
      setIsHoveringServices(false);
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


  const [isHoveringServices, setIsHoveringServices] = useState(false);
  const serviceRef = useRef(null);


  const animateCartIcon = () => {
    gsap.fromTo(
      cartRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
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
      localStorage.getItem("Id") &&
      localStorage.getItem("user") &&
      localStorage.getItem("token")
    ) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    const fetchData = async () => {
      if (query.length > 2) {
        let queries = encodeURIComponent(query)
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

  return (
//     <div>
//     <nav className="text-black sticky top-0 z-50 bg-white sm:w-full w-[680px]">
//   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//     <div className="flex items-center justify-between h-16">
//       <Link to="/" className="text-xl font-bold flex-shrink-0">
//         <img className="h-14 w-auto" src={Image} alt="logo" />
//       </Link>
      
//       {/* Search Input Section (Hidden on Small Screens) */}
//       <div className="relative flex-grow mx-4 hidden sm:block">
//         {noResults && (
//           <div ref={searchResultsRef} className="absolute w-full left-0 border rounded-lg shadow-lg p-4 bg-white max-h-64 overflow-y-auto z-10">
//             <div className="text-sm text-red-600">No Product Found</div>
//           </div>
//         )}
//         {showResults && (
//           <div ref={searchResultsRef} className="absolute w-full left-0 border rounded-lg shadow-lg p-4 bg-white max-h-64 overflow-y-auto z-10">
//             {results.map((product) => (
//               <div key={product?._id} className="flex items-center space-x-4 mb-2 cursor-pointer" onClick={() => handleProductClick(product?.slug)}>
//                 {Array.isArray(product?.images) && product.images.length > 0 ? (
//                   <img src={product?.images[0]?.url || "./default.jpg"} alt={product?.images[0]?.alt || product?.title} className="w-12 h-12 object-cover rounded" />
//                 ) : (
//                   <img className="w-12 h-12 object-cover rounded" src="/default.jpg" alt="default alt text" />
//                 )}
//                 <span className="text-sm">{product?.title}</span>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
      
//       {/* Menu Items */}
//       <div className="flex items-center ">
//         <div className="  hidden sm:flex justify-end gap-10">
//           <div className="relative cursor-pointer group">
//             <span className="relative z-10">Home</span>
//             <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
//           </div>
          
//           <div className="relative cursor-pointer group">
//             <span className="relative z-10">About</span>
//             <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
//           </div>
          
//           <div className="relative cursor-pointer group" 
//            ref={megaMenuRef}
//            onMouseEnter={() => {
//              setMegaMenubtn(true); // Activate Mega Menu on hover
//              setIsHoveringServices(true);
//            }}
//            onMouseLeave={() => {
//              setIsHoveringServices(false);
//            }}>
//             <span className="relative z-10">Service</span>
//             <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
//           </div>
          
//           <div className="relative cursor-pointer group">
//             <span className="relative z-10">Doctors</span>
//             <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
//           </div>
          
//           <div className="relative cursor-pointer group">
//             <span className="relative z-10">Contact</span>
//             <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
//           </div>
//         </div>

//         {/* Currency Selector */}
//         <select className="border p-2 rounded-md ml-4 text-sm" defaultValue={localStorage.getItem("currency")} onChange={handleCurrencyChange}>
//           <option value="INR">₹ INR</option>
//           <option value="USD">$ USD</option>
//           <option value="NPR">रु NPR</option>
//           <option value="BDT">৳ BDT</option>
//           <option value="EUR">€ EUR</option>
//           <option value="GBP">£ GBP</option>
//           <option value="AED">د.إ. AED</option>
//         </select>
//       </div>

//       {/* Mobile Menu Button */}
//       <div className="md:hidden">
//         <button onClick={toggleMenu} className="text-black p-2 rounded-md">
//           {isOpen ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
//         </button>
//       </div>
//     </div>
//   </div>

//   {/* Mobile Menu */}
//   {isOpen && (
//     <div className="md:hidden bg-gray-200 text-black h-max pb-32 overflow-y-auto">
//       <div className="px-2 pt-2 space-y-1">
//         <Link to="/" className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white">
//           Home
//         </Link>

//         <Link to="/" className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white">
//           About
//         </Link>

//         <Link to="/" className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white">
//           Services
//         </Link>

//         <Link to="/" className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white">
//           Doctors
//         </Link>

//         <Link to="/" className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white">
//          Contact
//         </Link>

//       </div>
//     </div>
//   )}
// </nav>

// {
//   MegaMenubtn == true ? 
//     <div>
//       <div className='absolute bg-[#F7F6F9] bg-opacity-40 z-50 w-[100%]' ref={containerRef}>
//         <div className='flex justify-center gap-12 py-4 bg-[#00768A] text-white flex-wrap md:flex-nowrap'>
//           {Object.keys(submenuData).map((menu, index) => (
//             <div className="relative cursor-pointer group">
//               <span
//                 key={index}
//                 className='cursor-pointer px-4 py-2 font-medium hover:scale-110 duration-300 relative z-10'
//                 onMouseEnter={(e) => handleMouseEnter(menu, e)}
//                 onMouseLeave={handleMouseLeave}
//               >
//                 {menu.replace(/([A-Z])/g, ' $1')}
//               </span>
//               <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[white] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 group-hover:origin-left origin-left"></span>
//             </div>
//           ))}
//         </div>
//       </div>

//       {hoveredItem && (
//         <div
//           className={`absolute p-4 bg-white rounded-lg shadow-lg flex justify-center gap-18 z-50 transition-all duration-300 ${hoveredItem === 'CenterOfExcellence' ? 'w-full  mr-[450px]' : 'w-auto' // Full width for Center of Excellence, auto for others
//           }`}
//           style={{
//             top: `${submenuPosition.top}px`,
//             left: hoveredItem === 'CenterOfExcellence' ? 0 : `${submenuPosition.left}px`, // Adjust left for Center of Excellence
//           }}
//           onMouseEnter={() => setHoveredItem(hoveredItem)}
//           onMouseLeave={handleMouseLeave}
//         >
//           {hoveredItem === 'CenterOfExcellence' ? (
//             <div className='grid grid-cols-2 sm:grid-cols-4 justify-items-right items-center gap-4 sm:gap-10 w-[90%] mx-auto'>
//               {submenuData[hoveredItem].map((subItem, index) => (
//                 <div key={index} className='flex align-top'>
//                   <div className='flex items-center justify-center'>
//                     {subItem === 'Cardiology' && <img src='src/Assests/heart-attack.png' className="h-8 w-8 sm:h-10 sm:w-10" />}
//                     {subItem === 'Orthopedics' && <img src='src/Assests/x-ray.png' className="h-8 w-8 sm:h-10 sm:w-10" />}
//                     {subItem === 'Spine' && <img src='src/Assests/chiropractic.png' className="h-8 w-8 sm:h-10 sm:w-10" />}
//                     {subItem === 'Neurology' && <img src='src/Assests/neurology.png' className='h-8 w-8 sm:h-10 sm:w-10' />}
//                     {/* Add more subItem checks and images */}
//                   </div>
//                   <div className='ml-2'>
//                     <div className='text-black-1000 hover:text-blue-700 transition-colors duration-200 mt-1 sm:mt-2 font-semibold'>
//                       {subItem}
//                     </div>
//                     <span className='text-gray-800 text-xs sm:text-sm'>See all Doctors</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <ul className='flex flex-col gap-2'   >
//               {submenuData[hoveredItem].map((subItem, index) => (
//                 <li
//                   key={index}
//                   className='text-gray-800 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-200'
//                 >
//                   {subItem}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )}
//     </div>
//     : null
// }

    
//     </div>

<div>
  <nav className="text-black sticky top-0 z-50 bg-white sm:w-full w-[680px]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <Link to="/" className="text-xl font-bold flex-shrink-0">
          <img className="h-14 w-auto" src={Image} alt="logo" />
        </Link>

        {/* Search Input Section (Hidden on Small Screens) */}
        <div className="relative flex-grow mx-4 hidden sm:block">
          {noResults && (
            <div ref={searchResultsRef} className="absolute w-full left-0 border rounded-lg shadow-lg p-4 bg-white max-h-64 overflow-y-auto z-10">
              <div className="text-sm text-red-600">No Product Found</div>
            </div>
          )}
          {showResults && (
            <div ref={searchResultsRef} className="absolute w-full left-0 border rounded-lg shadow-lg p-4 bg-white max-h-64 overflow-y-auto z-10">
              {results.map((product) => (
                <div key={product?._id} className="flex items-center space-x-4 mb-2 cursor-pointer" onClick={() => handleProductClick(product?.slug)}>
                  {Array.isArray(product?.images) && product.images.length > 0 ? (
                    <img src={product?.images[0]?.url || "./default.jpg"} alt={product?.images[0]?.alt || product?.title} className="w-12 h-12 object-cover rounded" />
                  ) : (
                    <img className="w-12 h-12 object-cover rounded" src="/default.jpg" alt="default alt text" />
                  )}
                  <span className="text-sm">{product?.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Menu Items */}
        <div className="flex items-center">
          <div className="hidden sm:flex justify-end gap-10">
            <div className="relative cursor-pointer group">
              <span className="relative z-10"><Link to="/">Home</Link></span>
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </div>

            <div className="relative cursor-pointer group">
              <span className="relative z-10"><Link to="/about">About</Link></span>
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </div>

            <div className="relative cursor-pointer group"
              ref={megaMenuRef}
              onMouseEnter={() => {
                setMegaMenubtn(true); // Activate Mega Menu on hover
                setIsHoveringServices(true);
              }}
              onMouseLeave={() => {
                setIsHoveringServices(false);
              }}>
              <span className="relative z-10">Service</span>
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </div>

            <div className="relative cursor-pointer group">
              <span className="relative z-10"><Link to="/CategoriesDetails/:id">Doctors</Link></span>
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </div>

            <div className="relative cursor-pointer group">
              <span className="relative z-10"><Link to="/contact-us">Contact</Link></span>
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-blue-500 scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </div>
          </div>

          {/* Currency Selector */}
          <select className="border p-2 rounded-md ml-4 text-sm" defaultValue={localStorage.getItem("currency")} onChange={handleCurrencyChange}>
            <option value="INR">₹ INR</option>
            <option value="USD">$ USD</option>
            <option value="NPR">रु NPR</option>
            <option value="BDT">৳ BDT</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
            <option value="AED">د.إ. AED</option>
          </select>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-black p-2 rounded-md">
            {isOpen ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
          </button>
        </div>
      </div>
    </div>

    {/* Mobile Menu */}
    {isOpen && (
      <div className="md:hidden bg-white-200 text-black h-max pb-32 overflow-y-auto">
        <div className="px-2 pt-2 space-y-1">
          <Link to="/" className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white">
            Home
          </Link>

          <Link to="/about" className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white">
            About
          </Link>

          {/* MegaMenu Dropdown */}
          {/* <div className="px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white flex" onClick={toggleMegaMenu}>
            Services
            {isMegaMenuOpen ? <span className="ml-2 pt-1"><FaChevronUp /></span> : <span className="ml-2 p-1"><FaChevronDown /></span>}
          </div> */}

          {/* SubMenu Items for MegaMenu */}
           
            <div className="pl-4 space-y-1">
              {Object.keys(submenuData).map((menu, index) => (
                <div key={index}>
                  <div className=" px-3 py-2 rounded-md text-sm hover:bg-blue-500 hover:text-white cursor-pointer flex" onClick={() => toggleSubMenu(menu)}>
                    {menu.replace(/([A-Z])/g, ' $1')}
                    {openSubMenus[menu] ? <span className="ml-2 p-1"><FaChevronUp /></span> : <span className="ml-2 p-1"><FaChevronDown /></span>}
                  </div>
                  {openSubMenus[menu] && (
                    <ul className="pl-4 space-y-1">
                      {submenuData[menu].map((subItem, index) => (
                        <li key={index} className="block px-3 py-2 rounded-md text-sm hover:bg-blue-100">
                          <span className="p-2 mt-2">{subItem}</span>
                          <hr  />
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          

          <Link to="/CategoriesDetails/:id" className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white">
            Doctors
          </Link>

          <Link to="/contact-us" className="block px-3 py-2 rounded-md font-bold uppercase text-sm hover:bg-blue-500 hover:text-white">
            Contact
          </Link>
        </div>
      </div>
    )}
  </nav>

  {/* MegaMenu for Desktop */}
  {
   MegaMenubtn == true ? 
     <div>
       <div className='absolute bg-[#F7F6F9] bg-opacity-40 z-50 w-[100%]' ref={containerRef}>
         <div className='flex justify-center gap-12 py-4 bg-[#00768A] text-white flex-wrap md:flex-nowrap'>
           {Object.keys(submenuData).map((menu, index) => (
            <div className="relative cursor-pointer group">
              <span
                key={index}
               className='cursor-pointer px-4 py-2 font-medium hover:scale-110 duration-300 relative z-10'
                 onMouseEnter={(e) => handleMouseEnter(menu, e)}
                onMouseLeave={handleMouseLeave}
              >
               {menu.replace(/([A-Z])/g, ' $1')}
               </span>
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[white] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 group-hover:origin-left origin-left"></span>
            </div>
          ))}
        </div>
       </div>

      {hoveredItem && (
        <div
          className={`absolute p-4 bg-white rounded-lg shadow-lg flex justify-center gap-18 z-50 transition-all duration-300 ${hoveredItem === 'CenterOfExcellence' ? 'w-full  mr-[450px]' : 'w-auto' // Full width for Center of Excellence, auto for others
          }`}
          style={{
             top: `${submenuPosition.top}px`,
            left: hoveredItem === 'CenterOfExcellence' ? 0 : `${submenuPosition.left}px`, // Adjust left for Center of Excellence
          }}
           onMouseEnter={() => setHoveredItem(hoveredItem)}
           onMouseLeave={handleMouseLeave}
          >
          {hoveredItem === 'CenterOfExcellence' ? (
             <div className='grid grid-cols-2 sm:grid-cols-4 justify-items-right items-center gap-4 sm:gap-10 w-[90%] mx-auto'>
               {submenuData[hoveredItem].map((subItem, index) => (
                 <div key={index} className='flex align-top'>
                  <div className='flex items-center justify-center'>
                     {subItem === 'Cardiology' && <img src='src/Assests/heart-attack.png' className="h-8 w-8 sm:h-10 sm:w-10" />}
                     {subItem === 'Orthopedics' && <img src='src/Assests/x-ray.png' className="h-8 w-8 sm:h-10 sm:w-10" />}
                    {subItem === 'Spine' && <img src='src/Assests/chiropractic.png' className="h-8 w-8 sm:h-10 sm:w-10" />}
                    {subItem === 'Neurology' && <img src='src/Assests/neurology.png' className='h-8 w-8 sm:h-10 sm:w-10' />}
                    {/* Add more subItem checks and images */}
                   </div>
                  <div className='ml-2'>
                     <div className='text-black-1000 hover:text-blue-700 transition-colors duration-200 mt-1 sm:mt-2 font-semibold'>
                       {subItem}
                    </div>
                    <span className='text-gray-800 text-xs sm:text-sm'>See all Doctors</span>
                   </div>
                 </div>
              ))}
            </div>
           ) : (
            <ul className='flex flex-col gap-2'   >
              {submenuData[hoveredItem].map((subItem, index) => (
                 <li
                   key={index}
                  className='text-gray-800 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-200'
                >
                  {subItem}
                </li>
               ))}
            </ul>
           )}
         </div>
      )}
    </div>
    : null
 }
</div>

  );
};

export default Navbar;
