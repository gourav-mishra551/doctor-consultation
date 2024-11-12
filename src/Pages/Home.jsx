import TopHeader from "../Components/TopHeader";
import Navbar from "../Components/Navbar";
import Headers from "../Components/Headers";
import Footer from "../Components/Footer";
import Categories from "../Components/Categories";
import HowItWorks from "../Components/HowItWorks";
import DownloadApp from "../Components/DownloadApp";
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
const Home = () => {
  const [MegaMenubtn, setMegaMenubtn] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 1024, // Screens smaller than 1024px
        settings: {
          slidesToShow: 2, // Show 2 slides on medium screens
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 768, // Screens smaller than 768px
        settings: {
          slidesToShow: 1, // Show 1 slide on small screens
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480, // Screens smaller than 480px
        settings: {
          slidesToShow: 1, // Show 1 slide on very small screens
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <div className="">
      <header className="App-header">
        <TopHeader />
        <Navbar />
        {/* {
          MegaMenubtn ? <MegaMenu /> :null
        } */}

        <Headers />

        <div className="py-10">
          <Categories />
        </div>
        <div className="py-10">
          <HowItWorks />
        </div>
        <div className="slider-container mt-10">
          <p className="text-xl sm:text-3xl font-bold text-center text-[#1c8e81]">
            What our users say about their online consultation experience
          </p>

          <Slider {...settings} className="mt-10 gap-10 max-w-[1200px] mx-auto">
            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img
                    src="dr-1.jpg"
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">
                  Excellent experience consulting on Practo. I could solve my
                  heath issue without going to a clinic! highly recomended
                </p>
              </div>
            </div>

            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img
                    src="dr-1.jpg"
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">
                  Excellent experience consulting on Practo. I could solve my
                  heath issue without going to a clinic! highly recomended
                </p>
              </div>
            </div>

            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img
                    src="dr-1.jpg"
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">
                  Excellent experience consulting on Practo. I could solve my
                  heath issue without going to a clinic! highly recomended
                </p>
              </div>
            </div>

            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img
                    src="dr-1.jpg"
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">
                  Excellent experience consulting on Practo. I could solve my
                  heath issue without going to a clinic! highly recomended
                </p>
              </div>
            </div>

            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img
                    src="dr-1.jpg"
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">
                  Excellent experience consulting on Practo. I could solve my
                  heath issue without going to a clinic! highly recomended
                </p>
              </div>
            </div>

            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img
                    src="dr-1.jpg"
                    alt=""
                    className="w-[40px] h-[40px] rounded-full"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">
                  Excellent experience consulting on Practo. I could solve my
                  heath issue without going to a clinic! highly recomended
                </p>
              </div>
            </div>
          </Slider>
        </div>

        <div className="">
          <DownloadApp />
        </div>
        <div className="appointment-form bg-[#1c8e81] sm:h-[350px] h-auto mt-20">
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
        <div className="mt-20">
          <Footer />
        </div>
      </header>
    </div>
  );
};

export default Home;
