import React from "react";
import "./footer.css";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import AmethusImage from "../Assests/ametheus-logo.webp";
import { NavLink } from "react-router-dom";
import { TbActivityHeartbeat } from "react-icons/tb";
import { CiUser } from "react-icons/ci";
import { MdOutlineEmail } from "react-icons/md";
import { VscSave } from "react-icons/vsc";
import { CiPhone } from "react-icons/ci";

const Footer = () => {
  return (
    <div>
      <footer className="footer-section">
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
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="">
                  <div className=" single-cta flex">
                    <FaLocationDot className="text-xl mt-2" />
                    <div className="cta-text">
                      <h4>Find us</h4>
                      <span>f-11 , green park extension new delhi</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta flex">
                  <IoIosCall className="text-xl mt-2" />
                  <div className="cta-text">
                    <h4>Call us</h4>
                    <span>+91-9999099538</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta flex">
                  <IoMdMail className="text-xl mt-2 text-black" />
                  <div className="cta-text">
                    <h4>Mail us</h4>
                    <span>info@ametheus.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <a href="index.html">
                      <img
                        src={AmethusImage}
                        className="img-fluid"
                        alt="logo"
                      />
                    </a>
                  </div>
                  <div className="footer-text">
                    <p>
                      At Ametheus, we believe that access to affordable prescription medicines is a basic right. We are committed to delivering essential, top-of-the-line medicines at fair prices to patients worldwide.
                    </p>
                  </div>
                  <div className="footer-social-icon ">
                    <span>Follow us</span>
                    <div className="flex gap-4">
                      <a href="#">
                        <i className="text-2xl text-blue-600 ">
                          {" "}
                          <FaFacebook />
                        </i>
                      </a>
                      <a href="#">
                        <i className="text-2xl text-[#55ACEE] ">
                          <FaSquareXTwitter />
                        </i>
                      </a>
                      <a href="#">
                        <i className="text-2xl text-blue-800">
                          <FaLinkedin />
                        </i>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="/about">about</a>
                    </li>
                    <li>
                      <a href="#">services</a>
                    </li>
                    <li>
                      <a href="/price-promise">price promise</a>
                    </li>
                    <li>
                      <a href="/contact-us">Contact</a>
                    </li>
                    <li>
                      <a href="/return-refunds">Return & Refund</a>
                    </li>
                    <li>
                      <a href="/terms-of-use">Term of website</a>
                    </li>
                    <li>
                      <a href="/faq">FAQ</a>
                    </li>
                    <li>
                      <a href="/why-we-are-different">Why we are different</a>
                    </li>
                    <li>
                      <a href="/disclaimer/">Disclamer</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Subscribe</h3>
                  </div>
                  <div className="footer-text mb-25">
                    <p>
                      Don’t miss to subscribe to our new feeds, kindly fill the
                      form below.
                    </p>
                  </div>
                  <div className="subscribe-form">
                    <form action="#">
                      <input type="text" placeholder="Email Address" />
                      <button>
                        <i className="fab fa-telegram-plane"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row ">
              <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                <div className="copyright-text">
                  <p>Copyright &copy; 2024, All Right Reserved </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right hover:text-white">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="/support-center">Support center</a>
                    </li>
                    <li>
                      <a href="/privacy">Privacy</a>
                    </li>
                    <li>
                      <a href="/wellness-and-safety">wellness and safety</a>
                    </li>
                    <li>
                      <a href="/support-center">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
