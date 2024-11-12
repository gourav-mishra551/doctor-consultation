import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

function MegaMenu() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);

  

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
    <div style={{ border: "1px solid red" }}>
      <div
        className="absolute  bg-[#F7F6F9] bg-opacity-40 z-50 w-[100%]"
        ref={containerRef}
      >
        <div className="flex justify-center gap-12 py-4 bg-[#00768A] text-white">
          {Object.keys(submenuData).map((menu, index) => (
            <div class="relative cursor-pointer group">
              <span
                key={index}
                className="cursor-pointer px-4 py-2 font-medium  hover:scale-110   duration-300 relative z-10"
                onMouseEnter={(e) => handleMouseEnter(menu, e)}
                onMouseLeave={handleMouseLeave}
              >
                {menu.replace(/([A-Z])/g, " $1")}
              </span>
              <span class="absolute left-0 bottom-0 h-0.5 w-full bg-[white] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100 group-hover:origin-left origin-left"></span>
            </div>
          ))}
        </div>
      </div>

      {hoveredItem && (
        <div
          className={`absolute p-4 bg-white rounded-lg shadow-lg flex justify-center gap-18 z-50 transition-all duration-300 ${
            hoveredItem === "CenterOfExcellence"
              ? "w-full  mr-[450px]"
              : "w-auto" // Full width for Center of Excellence, auto for others
          }`}
          style={{
            top: `${submenuPosition.top}px`,

            left:
              hoveredItem === "CenterOfExcellence"
                ? 0
                : `${submenuPosition.left}px`, // Adjust left for Center of Excellence
          }}
          onMouseEnter={() => setHoveredItem(hoveredItem)}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredItem === "CenterOfExcellence" ? (
            <div className="grid grid-cols-4 justify-items-right items-center gap-10 w-[88%] mx-auto">
              {submenuData[hoveredItem].map((subItem, index) => (
                <div key={index} className="flex align-top">
                  <div className="flex items-center justify-center">
                    {subItem === "Cardiology" && (
                      <img
                        src="src/Assests/heart-attack.png"
                        className="h-10 w-10"
                      />
                    )}
                    {subItem === "Orthopedics" && (
                      <img src="src/Assests/x-ray.png" className="h-10 w-10" />
                    )}
                    {subItem === "Spine" && (
                      <img
                        src="src/Assests/chiropractic.png"
                        className="h-10 w-10"
                      />
                    )}
                    {subItem === "Neurology" && (
                      <img
                        src="src/Assests/neurology.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "Gastroenterology" && (
                      <img
                        src="src/Assests/stomach.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "Oncology" && (
                      <img
                        src="src/Assests/cancer-cell.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "TransPlant" && (
                      <img
                        src="src/Assests/kidneys.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "ICU" && (
                      <img
                        src="src/Assests/emergency.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "Emergency" && (
                      <img
                        src="src/Assests/emergency-room.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "Preventive Health" && (
                      <img
                        src="src/Assests/anti-virus.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "Robotics" && (
                      <img
                        src="src/Assests/robot.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "Bariatric Surgery" && (
                      <img
                        src="src/Assests/back.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "Nephrology and Urology" && (
                      <img
                        src="src/Assests/support.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "Colorectal Surgery" && (
                      <img
                        src="src/Assests/colorectal-surgery.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "Obstetrics and Gynaecology" && (
                      <img
                        src="src/Assests/obstetrics.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                    {subItem === "Pulmonology" && (
                      <img
                        src="src/Assests/pulmonology.png"
                        className="inline mr-2 h-10 w-10"
                      />
                    )}
                  </div>
                  <div>
                    <div className="text-black-1000 hover:text-blue-700 transition-colors duration-200 mt-2 font-semibold">
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
