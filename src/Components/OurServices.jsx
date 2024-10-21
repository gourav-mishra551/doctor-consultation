import React from 'react';

const OurServices = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center mx-auto max-w-[1200px] p-4">
      {/* Service Item */}
      <div className="group w-[150px] h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img src="./bookappt_icon.svg" alt="book appointment ametheus health" className="w-14 h-14 mb-3" />
        <p className="font-semibold text-center text-gray-700 group-hover:text-[#1C8E81] text-sm transition-colors duration-300">Book Appointment</p>
      </div>

      {/* Service Item */}
      <div className="group w-[150px] h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img src="./bookhelathcheck_icon.svg" alt="book health checkup ametheus health" className="w-14 h-14 mb-3" />
        <p className="font-semibold text-gray-700 text-sm group-hover:text-[#1C8E81] text-center transition-colors duration-300">Book Health Check-Up</p>
      </div>

      {/* Service Item */}
      <div className="group w-[150px] h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img src="./consultonline_icon.svg" alt="Consult Online icon ametheus health" className="w-14 h-14 mb-3" />
        <p className="font-semibold text-gray-700 text-sm group-hover:text-[#1C8E81] transition-colors duration-300">Consult Online</p>
      </div>

      {/* Service Item */}
      <div className="group w-[150px] h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img src="./buymedicines_icon.svg" alt="Buy Medicine icon ametheus health" className="w-14 h-14 mb-3" />
        <p className="font-semibold text-gray-700 text-sm group-hover:text-[#1C8E81] transition-colors duration-300">Buy Medicine</p>
      </div>

      {/* Service Item */}
      <div className="group w-[150px] h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img src="./findhsptl_icon.svg" alt="Find Hospital ametheus health" className="w-14 h-14 mb-3" />
        <p className="font-semibold text-gray-700 text-sm group-hover:text-[#1C8E81] transition-colors duration-300">Find Hospital</p>
      </div>

      {/* Service Item */}
      <div className="group w-[150px] h-[150px] flex justify-center items-center flex-col p-4 rounded-lg bg-gray-100 shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        <img src="./finddoctor_icon.svg" alt="View Health Record ametheus health" className="w-14 h-14 mb-3" />
        <p className="font-semibold text-center text-gray-700 text-sm group-hover:text-[#1C8E81] transition-colors duration-300">View Health Record</p>
      </div>
    </div>
  );
};

export default OurServices;
