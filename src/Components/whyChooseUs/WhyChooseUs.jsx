import React, { useEffect, useState, useRef } from "react";
import { FaGlobe, FaHandHoldingUsd, FaCheckCircle, FaMoneyBillWave, FaCapsules, FaClock } from "react-icons/fa";
import { motion } from "framer-motion";

const WhyChooseUs = () => {
    const [isInView, setIsInView] = useState(false); // Track if the section is in view
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    setIsInView(true);
                }
            },
            { threshold: 0.2 } // Trigger when 20% of the section is visible
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
            title: "International Patient Service",
            description:
                "We provide dedicated support to international patients, ensuring a seamless healthcare experience across borders.",
        },
        {
            icon: <FaHandHoldingUsd className="text-4xl text-[#1c8e81]" />,
            title: "Medical Loan Assistance",
            description:
                "Get access to affordable medical loans with flexible repayment options to manage your treatment expenses.",
        },
        {
            icon: <FaCheckCircle className="text-4xl text-[#1c8e81]" />,
            title: "Promise for Best Service",
            description:
                "Our commitment to excellence ensures that you receive top-notch medical services tailored to your needs.",
        },
        {
            icon: <FaMoneyBillWave className="text-4xl text-[#1c8e81]" />,
            title: "Best Cost Consultancy",
            description:
                "Receive transparent and competitive pricing, along with expert advice on cost-effective treatment plans.",
        },
        {
            icon: <FaCapsules className="text-4xl text-[#1c8e81]" />,
            title: "Best Class Medicine",
            description:
                "Access premium-quality medicines from trusted sources to support your recovery and well-being.",
        },
        {
            icon: <FaClock className="text-4xl text-[#1c8e81]" />,
            title: "24/7 Access to Healthcare",
            description:
                "Round-the-clock access to our healthcare services ensures that help is just a call away at any time.",
        },
    ];

    return (
        <div
            ref={sectionRef}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20"
        >
            <div className="flex flex-col  justify-between lg:flex-row items-center gap-10">
                {/* Left Section */}
                <div
                    className={`w-full lg:w-1/2 transform transition-all duration-1500 ${isInView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
                        }`}
                >
                    <h2 className="text-4xl font-bold text-[#1c8e81] mb-6">
                        Why Choose Us?
                    </h2>
                    <p className="text-gray-600 text-lg mb-8">
                        We are committed to revolutionizing healthcare by offering exceptional services tailored to your needs.
                    </p>
                    <ul className="space-y-6">
                        {keyPoints.map((point, index) => (
                            <motion.div
                                key={index}
                                className="flex items-center gap-4"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 200 }}
                            >
                                <div className="flex-shrink-0">{point.icon}</div>
                                <div>
                                    <h3 className="text-xl font-semibold text-gray-800">
                                        {point.title}
                                    </h3>
                                    <p className="text-gray-600">{point.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </ul>
                </div>

                {/* Right Section */}
                <div
                    className={`w-full lg:w-1/2 transform transition-all duration-1000 ${isInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
                        }`}
                >
                    <img
                        src="./whychooseus.jpg"
                        alt="Healthcare"
                        className="rounded-lg shadow-lg"
                    />
                </div>
            </div>
        </div>
    );
};

export default WhyChooseUs;
