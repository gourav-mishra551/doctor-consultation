import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

function MegaMenu({Categoriesdata , loading}) {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  const submenuData = {
    PatientCare: [
      "Find A doctor",
      "Ametheus Surgery-Assured Price",
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
      "Ametheus Insurance",
    ],
    OurServices: [
      "Medicine",
      "General Medicine",
      "Pediatrics",
      "Cardiology",
      "Emergency Care",
      "Physical Therapy",
      "Vaccination Services",
    ],
    ContactUs: [
      "Post A Query",
      "Consult Doctor Online",
      "Book Physical Appointment",
      "Ametheus Lifetime",
    ],
  };

  const handleMouseEnter = (item, event) => {
    setHoveredItem(item);
    const menuItemRect = event.target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    setSubmenuPosition({
      top: menuItemRect.bottom - containerRect.top + 72,
      left: menuItemRect.left - containerRect.left + 60,
    });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  
  const skeletonCount = Categoriesdata.length > 0 ? Categoriesdata.length : 8
  
  return (
    <div className="bg-[#00768A]">
      <div
        className="bg-[#F7F6F9] max-w-[1200px] mx-auto bg-opacity-40 z-50 w-full md:block sm:block hidden"
        ref={containerRef}
      >
        <div className="flex justify-center gap-4   bg-[#00768A] text-white">
          {Object.keys(submenuData).map((menu, index) => (
            <div
              key={index}
              className="relative cursor-pointer flex justify-center h-[40px]  group max-w-[1200px] mx-auto"
            >
              <span
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

      {hoveredItem && (
        <div
          className={`absolute p-4 bg-white  shadow-lg flex justify-center gap-18 z-50 transition-all duration-300 cursor-pointer  ${
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
            <div className="grid grid-cols-4 gap-10 w-[88%] mx-auto cursor-pointer">
              {loading
                ? // Render skeleton loader while data is loading
                  Array.from({length: skeletonCount}).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 animate-pulse cursor-pointer"
                    >
                      <div className="h-16 w-16 bg-gray-300 rounded-md" />
                      <div className="ml-2 flex-1">
                        <div className="h-4 w-3/4 bg-gray-300 mb-2 rounded-md" />
                        <div className="h-3 w-1/2 bg-gray-300 rounded-md" />
                      </div>
                    </div>
                  ))
                : // Render actual data when loading is complete
                Categoriesdata.map((subItem, index) => (
                    <a href={`/categories-details/${subItem._id}`} key={index}>
                      <div className="flex items-start gap-3 cursor-pointer">
                        <img
                          src={subItem.image}
                          alt={subItem.specialtyName}
                          className="h-16 hover:scale-105 transition ease-out shadow-md shadow-slate-400 w-16 border p-2 bg-gray-200 rounded-md"
                        />
                        <div className="ml-2">
                          <div className="text-black font-semibold hover:text-[#00768A] transition-colors duration-200">
                            {subItem.specialtyName}
                          </div>
                          <span className="text-gray-800 text-xs font-semibold underline underline-offset-4 hover:text-[#00768A]">
                            See all Doctors
                          </span>
                        </div>
                      </div>
                    </a>
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
