import { TbActivityHeartbeat } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { VscSave } from "react-icons/vsc";
import { CiPhone } from "react-icons/ci";
import Categories from "./Categories";
import { NavLink } from "react-router-dom";
import HowItWorks from "./HowItWorks";
import DownloadApp from "./DownloadApp";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Headers = () => {

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  return (
    <>
      <div className="background bg-teal-100 -z-10">
        <div className="flex sm:flex-row flex-col sm:w-[90vw] mx-auto " >


          <div className="left p-5 flex-col justify-center relative xl:container ">

            <h1 className="sm:mx-auto sm:mt-[70px] sm:w-10/12 md:w-2/3 font-[700]  sm:text-6xl text-3xl lg:w-auto lg:text-left text-[#1c8e81]">
              Your Partner in <br />
              Health and Wellness
            </h1>

            <div className="relative mt-8 md:mt-12 space-y-8 text-center sm:ml-5 font-semibold">
              <p className="sm:text-2xl  text-justify">
                We are committed to providing you with the best medical and
                healthcare services to help you live healthier and happier.
              </p>
            </div>
          </div>

          <div className="right">
            <img
              className="relative w-full sm:w-[100vw] sm:h-[80vh]"
              src="./hero_img.webp"
              alt=""
            />
          </div>


        </div>
      </div>

      <div className="py-10">
        <Categories />
      </div>

      <div className="treatment w-[80vw] mx-auto mt-20 ">
        <h1 className="text-xl sm:text-3xl font-bold text-center text-[#1c8e81]">
          Find your prescription treatment
        </h1>
        <p className="text-lg sm:text-2xl mt-5 space-y-8 text-center ">
          Ametheus Health offers a wide range of treatments through our
          dedicated online service. The service is safe, discreet and convenient
          and all medicines are dispensed from the licensed pharmacies through
          our online portal by insured courier.
        </p>

        <div className="diff-treatment mt-10">
          {/* list */}
          <div className=" mt-6 sm:mb-2 ">
            <ul className="grid-rows-3 grid-flow-row grid sm:w-[80vw] w-full mx-auto sm:pl-16  sm:flex gap-y-[1rem] overflow-y-auto ml-5 sm:ml-auto  mt-2 grid-cols-3 ">
              <li
                className="font-medium w-max text-[15px] sm:text-[15px] sm:mr-8 md:mr-14 link-underline-list link-underline-black-list text-[#1c8e81] hover:bg-green-600 hover:rounded-xl hover:text-white hover:px-2 hover:py-1 sm:hover:p-0 sm:hover:bg-white sm:hover:text-[#1c8e81]"
                style={{ lineHeight: "24px" }}
              >
                All Products
              </li>
              <li
                className="font-medium w-max text-[16px] sm:text-[15px] sm:mr-8 md:mr-14 link-underline-list link-underline-black-list hover:bg-green-600 hover:rounded-xl hover:text-white hover:px-2 hover:py-1 sm:hover:p-0 sm:hover:bg-white sm:hover:text-black"
                style={{ lineHeight: "24px" }}
              >
                Respiratory
              </li>

              <li
                className="font-medium w-max text-[15px] sm:text-[15px] sm:mr-8 md:mr-14 link-underline-list link-underline-black-list sm:pb-[25px] hover:bg-green-600 hover:rounded-xl hover:text-white hover:px-2 hover:py-1 sm:hover:p-0 sm:hover:bg-white sm:hover:text-black"
                style={{ lineHeight: "24px" }}
              >
                Male Health
              </li>
              <li
                className="font-medium w-max text-[15px] sm:text-[15px] sm:mr-8 md:mr-14 link-underline-list link-underline-black-list sm:pb-[25px] hover:bg-green-600 hover:rounded-xl hover:text-white hover:px-2 hover:py-1 sm:hover:p-0 sm:hover:bg-white sm:hover:text-black"
                style={{ lineHeight: "24px" }}
              >
                Female Health
              </li>
              <li
                className="font-medium w-max text-[15px] sm:text-[15px] sm:mr-8 md:mr-14 link-underline-list link-underline-black-list hover:bg-green-600 hover:rounded-xl hover:text-whitehover:px-2 hover:py-1 sm:hover:p-0 sm:hover:bg-white sm:hover:text-black"
                style={{ lineHeight: "24px" }}
              >
                Sexual Health
              </li>
              <li
                className="font-medium w-max text-[15px] sm:text-[15px] sm:mr-8 md:mr-14 link-underline-list link-underline-black-list sm:pb-[25px] hover:bg-green-600 hover:rounded-xl hover:text-white hover:px-2 hover:py-1 sm:hover:p-0 sm:hover:bg-white sm:hover:text-black"
                style={{ lineHeight: "24px" }}
              >
                Travel
              </li>
              <li
                className="font-medium w-max text-[15px] sm:text-[15px] sm:mr-8 md:mr-14 link-underline-list link-underline-black-list sm:pb-[25px] hover:bg-green-600 hover:rounded-xl hover:text-white hover:px-2 hover:py-1 sm:hover:p-0 sm:hover:bg-white sm:hover:text-black"
                style={{ lineHeight: "24px" }}
              >
                Popular Treatment
              </li>
            </ul>
          </div>
        </div>

        <div className="diff-categories w-[80vw] mx-auto">
          <div className="relative max-w-[20vw]  mt-20 ">
            <img className="h-64 w-[20vw] object-cover rounded-md" src="https://images.unsplash.com/photo-1680725779155-456faadefa26" alt="Random" />
            <div className="absolute inset-0 bg-gray-700 opacity-60 rounded-md" ></div>
            <div className="absolute inset-0 flex text-center justify-center bg-[#1c8e81]  top-[13rem]">
              <h2 className="text-white text-3xl font-bold">Get Lost in Mountains</h2>
            </div>
          </div>
        </div>

        <div className="py-10">
          <HowItWorks />
        </div>

        <div className="slider-container mt-10">
          <p className='text-xl sm:text-3xl font-bold text-center text-[#1c8e81]'>What our users say about their online consultation experience</p>

          <Slider {...settings}
            className="mt-10 gap-10"
          >

            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img src="dr-1.jpg" alt="" className="w-[40px] h-[40px] rounded-full" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">Excellent experience consulting on Practo. I could solve my heath issue without going to a clinic!
                  highly recomended</p>
              </div>
            </div>

            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img src="dr-1.jpg" alt="" className="w-[40px] h-[40px] rounded-full" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">Excellent experience consulting on Practo. I could solve my heath issue without going to a clinic!
                  highly recomended</p>
              </div>
            </div>

            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img src="dr-1.jpg" alt="" className="w-[40px] h-[40px] rounded-full" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">Excellent experience consulting on Practo. I could solve my heath issue without going to a clinic!
                  highly recomended</p>
              </div>
            </div>

            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img src="dr-1.jpg" alt="" className="w-[40px] h-[40px] rounded-full" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">Excellent experience consulting on Practo. I could solve my heath issue without going to a clinic!
                  highly recomended</p>
              </div>
            </div>

            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img src="dr-1.jpg" alt="" className="w-[40px] h-[40px] rounded-full" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">Excellent experience consulting on Practo. I could solve my heath issue without going to a clinic!
                  highly recomended</p>
              </div>
            </div>

            <div className="flex p-5 shadow-xl h-[200px] mb-5">
              <div className="flex gap-3">
                <div>
                  <img src="dr-1.jpg" alt="" className="w-[40px] h-[40px] rounded-full" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">Arman Ali</p>
                  <p className="font-semibold">Anonymous</p>
                </div>
              </div>
              <div>
                <p className="font-normal leading-5">Excellent experience consulting on Practo. I could solve my heath issue without going to a clinic!
                  highly recomended</p>
              </div>
            </div>


          </Slider>
        </div>

      </div>

      <div className="">
        <DownloadApp />
      </div>




      <div className="appointment-form bg-[#1c8e81] sm:h-[350px] h-auto mt-20">
        <div className="flex sm:flex-row flex-col sm:max-w-6xl w-full mx-auto">

          <div className="left sm:w-[50%] w-full p-10 flex flex-col gap-5">
            <div className="flex gap-2 mt-10">
              <TbActivityHeartbeat className='mt-1 text-2xl text-white' />
              <p className='text-xl text-white'>Get an appointment</p>
            </div>
            <p className="font-bold text-4xl text-white">The Wide Network of Best Healthcare</p>
            <p className="text-white">Our team of highly trained professionals uses the latest healing technologies to restore you to pain-free health quickly and easily. </p>
          </div>

          <div className="right sm:p-10 p-5">

            <div className="flex sm:flex-row flex-col sm:gap-5">
              <div className="">
                <CiUser className="relative top-[40px] left-2" />
                <input type="text"
                  name="full_Name"
                  placeholder="Name"
                  className="block w-full px-10 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <MdOutlineEmail className="relative top-[40px] left-2" />
                <input type="text"
                  name="full_Name"
                  placeholder="Email"
                  className="block w-full px-10 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>
            </div>

            <div className="flex sm:flex-row flex-col sm:gap-5">
              <div>
                <CiPhone className="relative top-[40px] left-2" />
                <input type="text"
                  name="full_Name"
                  placeholder="Phone"
                  className="block w-full px-10 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40" />
              </div>

              <div>
                <VscSave className="relative top-[40px] left-2" />
                <input type="text"
                  name="full_Name"
                  placeholder="Subject"
                  className="block w-full px-10 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40" />
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
                <p className="mt-1 font-bold text-xl text-white"> <NavLink to="tel:+9999099538"><span>9999099538</span></NavLink></p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default Headers;
