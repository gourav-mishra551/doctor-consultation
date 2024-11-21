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
import TestimonialSection from "../Components/Testimonial/Testimonial";
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
        <WhyChooseUs />
        <div className="py-10 bg-gray-50">
          <HowItWorks />
        </div>

        <div className="my-5">
          <TestimonialSection />
        </div>
        {/* appointment form */}

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
                <div className="book-btn h-[50px] w-[220px] text-sm text-white cursor-pointer font-bold rounded-xl flex justify-center items-center hover:bg-[#206e65] shadow-md shadow-slate-200 transition-all ease-in-out duration-300 delay-150">
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
                      <span className="text-white hover:text-gray-400">9999099538</span>
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
