import React from "react";
import { TbMoodShare } from "react-icons/tb";
import { TbMessage } from "react-icons/tb";
import { FaDigitalOcean } from "react-icons/fa";

const HowItWorks = () => {
  return (
    <div className="px-6 py-12 bg-gray-50 border border-gray-200 rounded-lg shadow-md">
      {/* Heading */}
      <p className="text-3xl sm:text-4xl font-extrabold text-center text-[#1c8e81] mb-12">
        How It Works
      </p>

      {/* Icons and Horizontal Line */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-12">
        {/* Step 1 */}
        <div className="flex items-center">
          <TbMoodShare className="text-[60px] text-[#1c8e81] hover:text-[#145c57] transform hover:scale-110 transition duration-300 ease-in-out" />
          <div className="hidden sm:block h-[2px] w-[100px] bg-gray-300 mx-3"></div>
        </div>

        {/* Step 2 */}
        <div className="flex items-center">
          <TbMessage className="text-[60px] text-[#1c8e81] hover:text-[#145c57] transform hover:scale-110 transition duration-300 ease-in-out" />
          <div className="hidden sm:block h-[2px] w-[100px] bg-gray-300 mx-3"></div>
        </div>

        {/* Step 3 */}
        <div>
          <FaDigitalOcean className="text-[60px] text-[#1c8e81] hover:text-[#145c57] transform hover:scale-110 transition duration-300 ease-in-out" />
        </div>
      </div>

      {/* Step Descriptions */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-12 mt-8">
        <div className="text-center sm:text-left max-w-xs">
          <p className="text-gray-700 font-medium text-lg">
            Select a speciality or symptom
          </p>
        </div>

        <div className="text-center sm:text-left max-w-xs">
          <p className="text-gray-700 font-medium text-lg">
            Audio/video call with a verified doctor
          </p>
        </div>

        <div className="text-center sm:text-left max-w-xs">
          <p className="text-gray-700 font-medium text-lg">
            Get a digital prescription & a free follow-up
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
