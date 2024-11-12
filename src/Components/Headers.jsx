import image from "../Assests/hero-back.jpg"
import OurServices from "./OurServices";
import { Link } from "react-router-dom";

const Headers = () => {
  return (
    <>
      <div className="relative mb-32">  
        <div
          className="background bg-teal-100 -z-10 h-screen flex items-center"
          style={{
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="flex flex-col sm:flex-row w-full sm:w-[90vw] mx-auto px-4">
            {/* Left Side Content */}
            <div className="left p-5 flex-col justify-center relative xl:container space-y-5 animate-fadeIn">
              <h1 className="sm:mx-auto font-extrabold text-3xl sm:text-5xl lg:text-6xl text-[#1c8e81] text-center lg:text-left transition-transform transform">
                Your Partner in <br />
                Health and Wellness
              </h1>

              <div className="relative mt-8 md:mt-12 space-y-4 text-center sm:text-left font-semibold animate-slideIn">
                <p className="text-lg sm:text-xl lg:text-2xl text-gray-800 text-justify sm:text-left">
                  We are committed to providing you with the best medical and <br />
                  healthcare services to help you live healthier and happier.
                </p>
                <Link to="/appointments">
                  <button className="px-8 py-3 mt-5 text-white bg-teal-600 hover:bg-teal-700 rounded-full transition duration-300 ease-in-out transform hover:scale-105 shadow-lg">
                    Find a doctor
                  </button>
                </Link>

              </div>
            </div>
          </div>
        </div>

        {/* Centering OurServices Component */}
        <div className="absolute left-1/2 transform  -translate-x-1/2 sm:-bottom-[6rem]  w-[85vw] bg-white shadow-lg rounded-xl sm:px-8 sm:py-5 px-2 py-2">
          <OurServices />
        </div>
      </div>
    </>
  );
};

export default Headers;
