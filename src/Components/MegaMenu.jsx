import axios from "axios";
import React, { useState, useRef, useEffect } from "react";

function MegaMenu() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const containerRef = useRef(null);
  const [category, setCategory] = useState([]);
  const [activeMobileMenu, setActiveMobileMenu] = useState(null);

  const handleMobileMenuToggle = (menu) => {
    setActiveMobileMenu(activeMobileMenu === menu ? null : menu);
  };

  useEffect(() => {
    FetchCategory();
  }, []);

  const FetchCategory = async () => {
    try {
      const res = await axios("https://api.assetorix.com/ah/api/v1/dc/user/Category?limit=100");
      setCategory(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
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
      top: menuItemRect.bottom - containerRect.top + 90,
      left: menuItemRect.left - containerRect.left + 10,
    });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  return (
    <div className="bg-[#00768A]">
      <div className="bg-[#F7F6F9] max-w-[1200px] mx-auto bg-opacity-40 z-50 w-full md:block sm:block hidden" ref={containerRef}>
        <div className="flex justify-center gap-6 py-4 bg-[#00768A] text-white">
          {Object.keys(submenuData).map((menu, index) => (
            <div key={index} className="relative cursor-pointer group max-w-[1200px] mx-auto">
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
          className={`absolute p-4 bg-white rounded-lg shadow-lg flex justify-center gap-18 z-50 transition-all duration-300 ${
            hoveredItem === "CenterOfExcellence" ? "w-full mr-[450px]" : "w-auto"
          }`}
          style={{
            top: `${submenuPosition.top}px`,
            left: hoveredItem === "CenterOfExcellence" ? 0 : `${submenuPosition.left}px`,
          }}
          onMouseEnter={() => setHoveredItem(hoveredItem)}
          onMouseLeave={handleMouseLeave}
        >
          {hoveredItem === "CenterOfExcellence" ? (
            <div className="grid grid-cols-4 gap-10 w-[88%] mx-auto cursor-pointer">
              {category.map((subItem, index) => (
                <div key={index} className="flex items-start gap-3">
                  <img src={subItem.image} alt={subItem.specialtyName} className="h-10 w-10" />
                  <div>
                    <div className="text-black font-semibold hover:text-blue-700 transition-colors duration-200">
                      {subItem.specialtyName}
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
