import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function SecondOpinion() {
  return (
    <div>
      <section className="flex flex-col md:flex-row items-center justify-between pt-8 pb-8 md:pt-12 md:pb-12 bg-[#E1F0F3] bg-no-repeat bg-[415px] bg-bottom min-h-[350px] overflow-hidden">
        {/* Image Section */}
        <div className="flex justify-center items-center w-full md:w-1/2 h-[350px] mb-6 md:mb-0">
          <img
            className="max-w-full h-auto object-contain"
            src="src/Assests/cta_img.png"
            alt="Second Opinion"
          />
        </div>

        {/* Text Section */}
        <div className="w-full md:w-1/2 container mx-auto px-6 md:px-8 text-center md:text-left">
          <h1 className="text-2xl md:text-4xl text-[#00768A] font-bold mb-6">
            Get a Second Opinion
          </h1>
          <p className="text-[#00768A] text-lg leading-relaxed hidden md:block mb-4">
            Submit your reports and get a second opinion from Ametheus Health
            experts. Our team of specialists provides detailed reviews of your
            medical reports, offering insights that can make a significant
            difference in your care plan. At Ametheus Health, we ensure you
            receive an informed opinion backed by expert knowledge and advanced
            medical practices.
          </p>
          <p className="text-[#00768A] text-lg leading-relaxed md:hidden mb-4">
            Submit your reports and get a second opinion from Ametheus Doctors.
          </p>
          <Link to="/second-opinion-form">
            <button className="bg-[#00768A] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#005F6F] transition duration-300">
            Submit Reports
          </button>
          </Link>
          
        </div>
      </section>
      <Footer/>
    </div>
  );
}

export default SecondOpinion;
