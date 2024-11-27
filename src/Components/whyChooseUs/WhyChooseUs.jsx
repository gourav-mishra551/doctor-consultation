import React, { useEffect, useState, useRef } from "react";
import {
  FaGlobe,
  FaHandHoldingUsd,
  FaCheckCircle,
  FaMoneyBillWave,
  FaCapsules,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const keyPoints = [
    {
      icon: <FaGlobe className="text-4xl text-[#1c8e81]" />,
      title: "Global Patient Care",
      description: "Seamless support for international patients.",
    },
    {
      icon: <FaHandHoldingUsd className="text-4xl text-[#1c8e81]" />,
      title: "Medical Loans",
      description: "Affordable loans with flexible options.",
    },
    {
      icon: <FaCheckCircle className="text-4xl text-[#1c8e81]" />,
      title: "Best Service",
      description: "Committed to excellence in care.",
    },
    {
      icon: <FaMoneyBillWave className="text-4xl text-[#1c8e81]" />,
      title: "Cost Consultancy",
      description: "Transparent, competitive pricing.",
    },
    {
      icon: <FaCapsules className="text-4xl text-[#1c8e81]" />,
      title: "Quality Medicines",
      description: "Premium medicines for your recovery.",
    },
    {
      icon: <FaClock className="text-4xl text-[#1c8e81]" />,
      title: "24/7 Healthcare",
      description: "Always available when you need us.",
    },
  ];

  return (
    <div
      ref={sectionRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:my-20 my-10"
    >
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#1c8e81] mb-4">Why Choose Us?</h2>
        <p className="text-gray-600 text-lg">
          We are committed to revolutionizing healthcare by offering exceptional
          services tailored to your needs.
        </p>
      </div>

      <div className="flex md:flex-row-reverse flex-col justify-between items-center gap-10">
        {/* Left Section */}
        <motion.div
          className={`w-full  lg:w-[40%] transform transition-all duration-1500 ${
            isInView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
          }`}
        >
          <img
            src="./faq-img.webp"
            alt="Healthcare"
            className="rounded-lg  h-[290px] mx-auto  md:h-[400px] shadow-lg "
          />
        </motion.div>

        {/* Key Points Section */}
        <motion.div
          className={`w-full lg:w-[50%] grid grid-cols-1 sm:grid-cols-2 gap-8 ${
            isInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          }`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delayChildren: 0.5, staggerChildren: 0.3 }}
        >
          {keyPoints.map((point, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-4 bg-white p-4 rounded-lg "
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <div className="flex-shrink-0">{point.icon}</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{point.title}</h3>
                <p className="text-gray-600 text-sm">{point.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
