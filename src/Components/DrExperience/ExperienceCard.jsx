import React from "react";
import { motion } from "framer-motion";

const ExperienceCard = ({ experience }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md rounded-lg p-6 mb-4 border-l-4 border-teal-500"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold text-[#00768A]">{experience.jobTitle}</h3>
        <span className="text-sm text-gray-500">
          {experience.startDate.month} {experience.startDate.year} -{" "}
          {experience.isPresent
            ? "Present"
            : `${experience.endDate.month} ${experience.endDate.year}`}
        </span>
      </div>
      <p className="text-gray-600 font-semibold mt-1">
        {experience.organizationName}, {experience.organizationLocation}
      </p>
      <p className="text-gray-500 mt-2">{experience.description}</p>
      <div className="flex gap-2 flex-wrap mt-3">
        {experience.skills.map((skill, index) => (
          <span
            key={index}
            className="bg-teal-100 text-teal-800 text-sm font-medium py-1 px-3 rounded-full"
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  );
};

export default ExperienceCard;
