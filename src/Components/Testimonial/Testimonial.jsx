import React from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const testimonials = [
  {
    name: "John Doe",
    position: "CEO, Example Inc.",
    image: "https://img.freepik.com/free-photo/young-bearded-man-with-round-glasses_273609-11431.jpg?uid=R137934808&ga=GA1.1.1945718664.1716983455&semt=ais_hybrid",
    feedback:
      "This service has been exceptional. The attention to detail and care for customers is unmatched!",
  },
  {
    name: "Jane Smith",
    position: "Marketing Manager, XYZ Ltd.",
    image: "https://img.freepik.com/free-photo/little-girl-t-shirt-jacket-showing-gun-gesture-looking-confident_176474-19109.jpg?uid=R137934808&ga=GA1.1.1945718664.1716983455&semt=ais_hybrid",
    feedback:
      "Absolutely fantastic! I couldn’t have asked for better service. Highly recommended.",
  },
  {
    name: "Robert Johnson",
    position: "Entrepreneur",
    image: "https://img.freepik.com/free-photo/surprised-smiling-curly-girl-white-wall_176420-178.jpg?uid=R137934808&ga=GA1.1.1945718664.1716983455&semt=ais_hybrid",
    feedback:
      "A wonderful experience from start to finish. The team is professional and dedicated.",
  },
];

const TestimonialSection = () => {
  const sliderRef = React.useRef();

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-20">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-4xl font-bold text-[#00768A] mb-4">What Our Clients Say</h2>
        <p className="text-gray-600 font-semibold">
          See how we've helped clients achieve their goals with our outstanding service.
        </p>
      </motion.div>

      <div className="relative">
        <Slider {...settings} ref={sliderRef}>
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center px-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 * index }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-36 h-36 mx-auto rounded-full shadow-lg shadow-slate-300 mb-4"
              />
              <p className="text-lg text-gray-700 italic mb-4 font-semibold">
                "{testimonial.feedback}"
              </p>
              <h4 className="text-xl font-semibold text-gray-800">{testimonial.name}</h4>
              <p className="text-sm text-gray-500">{testimonial.position}</p>
            </motion.div>
          ))}
        </Slider>

        {/* Custom Buttons */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4">
          <button
            onClick={() => sliderRef.current.slickPrev()}
            className="p-2 rounded-full bg-[#00768A] text-white border shadow-lg hover:bg-[#1c8e81] transition duration-300"
          >
            <FaChevronLeft />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-4">
          <button
            onClick={() => sliderRef.current.slickNext()}
            className="p-2 rounded-full bg-[#00768A] border-white text-white shadow-lg hover:bg-[#1c8e81] transition duration-300"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
