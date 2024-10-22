import React, { useState, useRef } from 'react';

function MegaMenu() {
  const [hoveredItem, setHoveredItem] = useState(null); // State to track the hovered item
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 }); // Position of submenu
  const containerRef = useRef(null); // Reference to the main menu container

  // Submenu data for each specialty
  const submenuData = {
    PatientCare: ['Find A doctor', 'Apollo Surgery-Assured  Price', 'Clinical Quality and Outcome','Service Excellence','Patient Testimonials','Value Added Services','Health and LifeStyle','Pay Online','Medical Feed'],
    CenterOfExcellence: ['Cadiology', 'Orthopedics', 'Spine', 'Nuerology','Gastroentology','Oncology','TransPlant','ICU','Emergency','Preventive Health','Robotics','Bariatric Surgury','Nephrology and Urology','Colorectal Surgery','Obstetrics and Gynaelogy','Pulmonoloy'],
    HealthInformation: ['Diseases and Condition', 'Tests and Procedures', 'Medical glosarry Decoded','Understanding Investigation'],
    InternationalPatients: ['Plan your Trip', 'Online Consultation', 'Visa','Ametheus Insurance'],
    AcademicsResearch: ['Courses', 'Academics', 'Clinical Research','Honors List','Amethus Torch:Alumini Network','New Medicine'],
    ContactUs:['Post A Quary','Consult Doctor Online','Book Physical Appointment','Amethus Lifetime']
  };

  const handleMouseEnter = (item, event) => {
    setHoveredItem(item);
    const menuItemRect = event.target.getBoundingClientRect();
    const containerRect = containerRef.current.getBoundingClientRect();
    setSubmenuPosition({
      top: menuItemRect.bottom - containerRect.top+90, // Position submenu directly below
      left: menuItemRect.left - containerRect.left-50, // Align submenu with the hovered item
    });
  };

  const handleMouseLeave = () => {
    setHoveredItem(null); // Reset hovered item when leaving the main menu and submenu
  };


  return (
    <>
      <div className='flex relative' ref={containerRef}>
        {/* Main Mega Menu */}
        <div
          className='flex justify-center gap-8 p-2 bg-00768A'
          style={{ border: '1px solid red', width: '100%', backgroundColor: '#00768A', color: 'white' }}
        >
          <div
            className='cursor-pointer p-2'
            
            onMouseEnter={(e) => handleMouseEnter('PatientCare', e)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Patient Care
          </div>
          <div
            className='cursor-pointer p-2'
            onMouseEnter={(e) => handleMouseEnter('CenterOfExcellence', e)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            Center Of Excellence
          </div>
          <div
            className='cursor-pointer p-2'
            onMouseEnter={(e) => handleMouseEnter('HealthInformation', e)}
            onMouseLeave={() => setHoveredItem(null)}
          >
           Health Information
          </div>
          <div
            className='cursor-pointer p-2'
            onMouseEnter={(e) => handleMouseEnter('InternationalPatients', e)}
            onMouseLeave={() => setHoveredItem(null)}
          >
           International Patients
          </div>
          <div
            className='cursor-pointer p-2'
            onMouseEnter={(e) => handleMouseEnter('AcademicsResearch', e)}
            onMouseLeave={() => setHoveredItem(null)}
          >
           Academics & Research 
          </div>

          <div
            className='cursor-pointer p-2'
            onMouseEnter={(e) => handleMouseEnter('ContactUs', e)}
            onMouseLeave={() => setHoveredItem(null)}
          >
           Contact Us
          </div>
        </div>
      </div>
      
      {/* Submenu (conditionally rendered based on hoveredItem) */}
      {hoveredItem && (
        <div
          className='absolute p-4 z-50'
          style={{
            backgroundColor: 'white',
            border: '1px solid blue',
            position: 'absolute',
            top: `${submenuPosition.top}px`,
            left: `${submenuPosition.left}px`,
            borderRadius:"10px",
            
           
          }}
          onMouseEnter={() => setHoveredItem(hoveredItem)} // Keep submenu open when hovered
          onMouseLeave={handleMouseLeave}
        >
          
          <ul className='flex flex-col gap-4 cursor-pointer' >
            {submenuData[hoveredItem].map((subItem, index) => (
                <>
              <li className='p-2 hover:bg-[#CCFBF1]' key={index}>{subItem}</li>
              <hr />
              </>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default MegaMenu;
