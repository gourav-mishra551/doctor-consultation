import Headers from "../Components/Headers";
import Footer from "../Components/Footer";
import HowItWorks from "../Components/HowItWorks";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { NavLink } from "react-router-dom";
import { TbActivityHeartbeat } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { VscSave } from "react-icons/vsc";
import { CiPhone } from "react-icons/ci";
import MegaMenu from "../Components/MegaMenu";
import { useState } from "react";
import CategoriesHome from "../Components/CategoriesHome/CategoriesHome";
import WhyChooseUs from "../Components/whyChooseUs/WhyChooseUs";
const Home = () => {
  const [MegaMenubtn, setMegaMenubtn] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true, // Disable default arrows
  };

  return (
    <div>
      <header className="App-header">
        <Headers />

        <div className="py-10">
          {/* <Categories /> */}
          <CategoriesHome />
        </div>
        <WhyChooseUs/>
        <div className="py-10">
          <HowItWorks />
        </div>
        <div className="slider-container mt-10">
          <p className="text-xl sm:text-3xl font-bold text-center text-[#1c8e81]">
            What our users say about their online consultation experience
          </p>

          <Slider
            {...settings}
            className="mt-10 flex gap-6 max-w-[380px] sm:max-w-[1200px] mx-auto p-10" // Adjust gap as needed
          >
            {/* Testimonial Card 1 */}
            <div className="relative bg-[#001439] rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:opacity-90 hover:translate-y-2 p-5">
              <div className="flex gap-5">
                {/* Avatar */}
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-200 border-4 border-[#00768A] shadow-lg">
                  <img
                    src="dr-1.jpg"
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Profile Info */}
                <div className="flex flex-col justify-center">
                  <p className="text-xl text-[#ffff] font-semibold leading-6">
                    Arman Ali
                  </p>
                  <p className="text-sm text-[#00768A] font-semibold">
                    Anonymous
                  </p>
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="px-6 pb-6">
                <p className="text-base text-[#ffff] leading-7 font-medium">
                  Excellent experience consulting on Practo. I could solve my
                  health issue without going to a clinic! Highly recommended.
                </p>
                <p className="mt-4 text-sm text-[#ffff] italic">
                  - An easy, effective solution!
                </p>
              </div>
            </div>

            <div className="relative bg-[#001439] rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl hover:opacity-90 hover:translate-y-2 p-5">
              <div className="flex gap-5">
                {/* Avatar */}
                <div className="w-[120px] h-[120px] rounded-full overflow-hidden bg-gray-200 border-4 border-[#00768A] shadow-lg">
                  <img
                    src="dr-1.jpg"
                    alt="Profile"
                    className="object-cover w-full h-full"
                  />
                </div>

                {/* Profile Info */}
                <div className="flex flex-col justify-center">
                  <p className="text-xl text-[#ffff] font-semibold leading-6">
                    Arman Ali
                  </p>
                  <p className="text-sm text-[#00768A] font-semibold">
                    Anonymous
                  </p>
                </div>
              </div>

              {/* Testimonial Text */}
              <div className="px-6 pb-6">
                <p className="text-base text-[#ffff] leading-7 font-medium">
                  Excellent experience consulting on Practo. I could solve my
                  health issue without going to a clinic! Highly recommended.
                </p>
                <p className="mt-4 text-sm text-[#ffff] italic">
                  - An easy, effective solution!
                </p>
              </div>
            </div>

            {/* Duplicate cards can follow the same structure */}
          </Slider>
        </div>

        <div className="appointment-form bg-[#1c8e81] sm:h-[350px] h-auto mt-20 pb-10">
          <div className="flex sm:flex-row flex-col sm:max-w-6xl w-full mx-auto">
            <div className="left sm:w-[50%] w-full p-10 flex flex-col gap-5">
              <div className="flex gap-2 mt-10">
                <TbActivityHeartbeat className="mt-1 text-2xl text-white" />
                <p className="text-xl text-white">Get an appointment</p>
              </div>
              <p className="font-bold text-4xl text-white">
                The Wide Network of Best Healthcare
              </p>
              <p className="text-white">
                Our team of highly trained professionals uses the latest healing
                technologies to restore you to pain-free health quickly and
                easily.{" "}
              </p>
            </div>

            <div className="right sm:p-10 p-5">
              <div className="flex sm:flex-row flex-col sm:gap-5">
                <div className="">
                  <CiUser className="relative top-[40px] left-2" />
                  <input
                    type="text"
                    name="full_Name"
                    placeholder="Name"
                    className="block w-full px-10 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <MdOutlineEmail className="relative top-[40px] left-2" />
                  <input
                    type="text"
                    name="full_Name"
                    placeholder="Email"
                    className="block w-full px-10 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div className="flex sm:flex-row flex-col sm:gap-5">
                <div>
                  <CiPhone className="relative top-[40px] left-2" />
                  <input
                    type="text"
                    name="full_Name"
                    placeholder="Phone"
                    className="block w-full px-10 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <VscSave className="relative top-[40px] left-2" />
                  <input
                    type="text"
                    name="full_Name"
                    placeholder="Subject"
                    className="block w-full px-10 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </div>

              <div className="mt-7 flex sm:flex-row flex-col gap-5">
                <div className="book-btn h-[50px] w-[220px] text-sm text-white cursor-pointer font-bold bg-red-700 rounded-xl flex justify-center items-center hover:bg-green-950 transition-all ease-in-out duration-300 delay-150">
                  <button className="">BOOK AN APPOINTMENT</button>
                </div>
                <p className="font-bold mt-2 text-white">(OR)</p>

                <div className="flex gap-2">
                  <div className="h-[40px] w-[40px] rounded-2xl border border-white flex justify-center items-center">
                    <NavLink to="tel:+9999099538">
                      <CiPhone className="text-3xl text-white" />
                    </NavLink>
                  </div>
                  <p className="mt-1 font-bold text-xl text-white">
                    {" "}
                    <NavLink to="tel:+9999099538">
                      <span>9999099538</span>
                    </NavLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div >
          <Footer />
        </div>
      </header>
    </div>
  );
};

export default Home;
