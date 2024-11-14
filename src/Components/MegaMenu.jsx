import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

function MegaMenu() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  const [activeMobileMenu, setActiveMobileMenu] = useState(null); // Initially no menu is active

  

  const handleMobileMenuToggle = (menu) => {
    // If the clicked menu is already active, close it, otherwise set it as active
    setActiveMobileMenu(activeMobileMenu === menu ? null : menu);
  };

  
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

  const handleMouseEnter = (item, event) => {
    setHoveredItem(item);
    const menuItemRect = event.target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    setSubmenuPosition({
      top: menuItemRect.bottom - containerRect.top + 90, // Adjusted for dropdown position
      left: menuItemRect.left - containerRect.left + 10, // Align to the left edge of the hovered item
    });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="bg-[#00768A]">
      {/* Main Container */}
      <div
        className=" bg-[#F7F6F9] max-w-[1200px] mx-auto bg-opacity-40 z-50 w-full md:block  sm:block hidden"
        ref={containerRef}
      >
        {/* Menu Bar (for larger screens) */}
        <div className="flex justify-center gap-6 py-4 bg-[#00768A] text-white">
          {Object.keys(submenuData).map((menu, index) => (
            <div className="relative cursor-pointer group max-w-[1200px] mx-auto">
              <span
                key={index}
                className="cursor-pointer px-4 py-2 font-medium hover:scale-110 duration-300 relative z-10"
                onMouseEnter={(e) => handleMouseEnter(menu, e)}
                onMouseLeave={handleMouseLeave}
              >
                {menu.replace(/([A-Z])/g, " $1")}
              </span>
              <span className="absolute left-0 bottom-0 h-0.5 w-full bg-[white] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 group-hover:origin-left origin-left"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Hovered Menu for Desktop (appears on mouse enter) */}
      {hoveredItem && (
        <div
          className={` absolute p-4 bg-white rounded-lg shadow-lg flex justify-center gap-18 z-50 transition-all duration-300 ${
            hoveredItem === "CenterOfExcellence"
              ? "w-full mr-[450px]"
              : "w-auto"
          }`}
          style={{
            top: `${submenuPosition.top}px`,
            left:
              hoveredItem === "CenterOfExcellence"
                ? 0
                : `${submenuPosition.left}px`,
          }}
          onMouseEnter={() => setHoveredItem(hoveredItem)}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredItem === "CenterOfExcellence" ? (
            <div className="grid grid-cols-4 justify-items-right items-center gap-10 w-[88%] mx-auto">
              {submenuData[hoveredItem].map((subItem, index) => (
                <div key={index} className="flex align-top">
                  <div className="flex items-center justify-center">
                    {/* Images for different subItems */}
                    {subItem === "Cardiology" && (
                      <img
                        src="src/Assests/heart-attack.png"
                        className="h-10 w-10"
                      />
                    )}
                    {subItem === "Orthopedics" && (
                      <img src="src/Assests/x-ray.png" className="h-10 w-10" />
                    )}
                    {/* Add other sub-items here similarly */}
                  </div>
                  <div>
                    <div className="text-black-1000  transition-colors duration-200 mt-2 font-semibold">
                      {subItem}
                    </div>
                    <span className="text-gray-800">See all Doctors</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ul className="flex flex-col gap-2">
              {submenuData[hoveredItem].map((subItem, index) => (
                <li
                  key={index}
                  className="text-gray-800 hover:bg-blue-100 px-3 py-2 rounded-lg transition-all duration-200"
                >
                  {subItem}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      
    </div>
  );
}

export default MegaMenu;
