import React from "react";
import { Link } from "react-router-dom";

const OurServices = () => {
  return (
    <div className="flex flex-wrap sm:gap-10 md:gap-6 lg:gap-10 gap-5 justify-center  max-w-[1200px] mx-auto p-4">
      {/* Service Item */}
      <Link to="/all-doctors">
        <div className="group w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <img src="./bookappt_icon.svg" alt="book appointment ametheus health" className="w-10 h-10 sm:w-14 sm:h-14 mb-2 sm:mb-3" />
          <p className="font-semibold text-center text-gray-700 group-hover:text-[#1C8E81] text-xs sm:text-sm transition-colors duration-300">
            Book Appointment
          </p>
        </div>
      </Link>

      {/* Service Item */}
      {/* <div className="group w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img src="./bookhelathcheck_icon.svg" alt="book health checkup ametheus health" className="w-10 h-10 sm:w-14 sm:h-14 mb-2 sm:mb-3" />
        <p className="font-semibold text-gray-700 text-xs sm:text-sm group-hover:text-[#1C8E81] text-center transition-colors duration-300">
          Book Health Check-Up
        </p>
      </div> */}

      {/* Service Item */}
      <Link to="https://ametheushealth.com/international-patient-services">
        <div className="group w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <img src="./buymedicines_icon.svg" alt="Buy Medicine icon ametheus health" className="w-10 h-10 sm:w-14 sm:h-14 mb-2 sm:mb-3" />
          <p className="font-semibold text-center text-gray-700 text-xs sm:text-sm group-hover:text-[#1C8E81] transition-colors duration-300">
            Medical Tourism
          </p>
        </div>
      </Link>


      {/* Service Item */}
      <Link to="https://ametheushealth.com/">
        <div className="group w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <img src="./consultonline_icon.svg" alt="Consult Online icon ametheus health" className="w-10 h-10 sm:w-14 sm:h-14 mb-2 sm:mb-3" />

          <p className="font-semibold text-gray-700 text-xs sm:text-sm group-hover:text-[#1C8E81] transition-colors duration-300">
            Buy Medicine
          </p>
        </div>
      </Link>


      {/* Service Item */}
      <div className="group w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img src="./findhsptl_icon.svg" alt="Find Hospital ametheus health" className="w-10 h-10 sm:w-14 sm:h-14 mb-2 sm:mb-3" />
        <p className="font-semibold text-gray-700 text-xs sm:text-sm group-hover:text-[#1C8E81] transition-colors duration-300">
          Find Hospital
        </p>
      </div>

      {/* Service Item */}
      <Link to="https://ametheushealth.com/medical-records">
        <div className="group w-[120px] sm:w-[150px] h-[120px] sm:h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
          <img src="./finddoctor_icon.svg" alt="View Health Record ametheus health" className="w-10 h-10 sm:w-14 sm:h-14 mb-2 sm:mb-3" />
          <p className="font-semibold text-gray-700 text-xs sm:text-sm group-hover:text-[#1C8E81] text-center transition-colors duration-300">
            View Health Record
          </p>
        </div>
      </Link>

    </div>
  );
};

export default OurServices;
