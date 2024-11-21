import React from "react";
import { CiSearch } from "react-icons/ci";
import { FiUserCheck } from "react-icons/fi";
import { GrSchedule } from "react-icons/gr";
import { SiTicktick } from "react-icons/si";
import { motion } from "framer-motion";

const HowItWorks = () => {
  const steps = [
    {
      Icon: CiSearch,
      title: "Search Doctor",
      description:
        "Search for a doctor based on specialization, location, or availability.",
    },
    {
      Icon: FiUserCheck,
      title: "Check Doctor Profile",
      description:
        "Explore detailed doctor profiles on our platform to make informed decisions.",
    },
    {
      Icon: GrSchedule,
      title: "Schedule Appointment",
      description:
        "Choose your preferred doctor, select a convenient time slot, & confirm your appointment.",
    },
    {
      Icon: SiTicktick,
      title: "Get Your Solution",
      description:
        "Discuss your health concerns with the doctor and receive personalized advice & solution.",
    },
  ];

  return (
    <div className="flex flex-wrap justify-center items-center p-6 bg-gray-50 max-w-[1200px] mx-auto" >
      {/* Image Section */}
      <div className="w-full lg:w-1/2 p-4">
        <img
          src="./image.webp"
          alt="How it works"
          className=" w-[80%] md:mx-0 mx-auto h-auto"
        />
      </div>

      {/* Text and Steps Section */}
      <div className="w-full lg:w-1/2 p-4">
        <h1 className="font-bold text-3xl text-[#00768A] text-start lg:text-left">
          How it Works
        </h1>
        <h2 className="text-black text-2xl lg:text-4xl font-bold my-4 text-start lg:text-left">
          4 easy steps to get your solution
        </h2>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-10">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex items-start"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <step.Icon className="bg-[#00768A] text-white text-5xl p-3 rounded-full shadow-md" />
              </div>
              {/* Step Details */}
              <div className="ml-4">
                <h2 className="text-xl font-semibold text-gray-800">
                  {step.title}
                </h2>
                <p className="text-[15px] mt-2 text-gray-700 font-[400]">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
