import React from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { Link } from "react-router-dom";

function SecondOpinion() {
  return (
    <div>
      

      {/* Hero Section */}
      <section className="flex flex-col  md:flex-row items-center justify-between pt-8 pb-8 md:pt-12 md:pb-12 bg-[#E1F0F3] bg-no-repeat bg-[415px] bg-bottom min-h-[350px] overflow-hidden">
        {/* Image Section */}
        <div className="flex justify-center items-center my-3 w-full md:w-1/2 h-[350px] mb-6 md:mb-0">
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

      {/* Why Choose Us Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00768A] mb-6">
            Why Choose Ametheus Health?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg shadow-lg">
              <img
                src="src/Assests/51302.jpg"
                alt="Expert Team"
                className="w-[150px] h-[150px] mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-[#00768A] mb-2">
                Expert Team
              </h3>
              <p className="text-gray-600">
                Our specialists are highly qualified with years of experience
                in diagnosing and treating complex medical conditions.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-lg">
              <img
                src="src/Assests/metaverse-avatar-collage-concept.jpg"
                alt="Advanced Technology"
                className="w-[150px] h-[150px] mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-[#00768A] mb-2">
                Advanced Technology
              </h3>
              <p className="text-gray-600">
                We use the latest medical tools and technologies to ensure
                accurate and reliable second opinions.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-lg">
              <img
                src="src/Assests/3904913.jpg"
                alt="Personalized Care"
                className="w-[150px] h-[150px]  mx-auto mb-4"
              />
              <h3 className="text-xl font-semibold text-[#00768A] mb-2">
                Personalized Care
              </h3>
              <p className="text-gray-600">
                We provide detailed reviews tailored to your medical needs,
                ensuring you get the best care plan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-[#F8FBFC]">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00768A] mb-6">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#00768A] mb-2">
                Step 1
              </h3>
              <p className="text-gray-600">
                Upload your medical reports securely using our online portal.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#00768A] mb-2">
                Step 2
              </h3>
              <p className="text-gray-600">
                Our experts thoroughly review your reports and provide detailed
                insights.
              </p>
            </div>
            <div className="p-6 border rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-[#00768A] mb-2">
                Step 3
              </h3>
              <p className="text-gray-600">
                Receive a comprehensive second opinion with actionable
                recommendations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-[#00768A] mb-6">
            What Our Patients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border rounded-lg shadow-lg">
              <p className="text-gray-600 italic mb-4">
                "Ametheus Health provided me with detailed insights that helped
                me make an informed decision about my treatment."
              </p>
              <h3 className="text-lg font-semibold text-[#00768A]">
                - John Doe
              </h3>
            </div>
            <div className="p-6 border rounded-lg shadow-lg">
              <p className="text-gray-600 italic mb-4">
                "The team was professional and responsive. Highly recommend
                their second opinion services!"
              </p>
              <h3 className="text-lg font-semibold text-[#00768A]">
                - Jane Smith
              </h3>
            </div>
            <div className="p-6 border rounded-lg shadow-lg">
              <p className="text-gray-600 italic mb-4">
                "Thanks to Ametheus Health, I received the best care plan and
                peace of mind."
              </p>
              <h3 className="text-lg font-semibold text-[#00768A]">
                - Michael Johnson
              </h3>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default SecondOpinion;
