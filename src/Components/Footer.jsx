import React from "react";
import { useState } from "react";
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
import toast from "react-hot-toast";
import { FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    message: "",
    contactType:"Consultation",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://api.assetorix.com/ah/api/v1/contact",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        toast.success("Your request has been submitted successfully!");
        setFormData({
          name: "",
          email: "",
          mobile: "",
          message: "",
        });
      } else {
        toast.error(
          "There was an error submitting your request. Please try again."
        );
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email address.");
      return;
    }
    try {
      const response = await fetch("https://api.assetorix.com/ah/api/v1/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
  
      if (response.ok) {
        toast.success("Thank you for subscribing!");
        setEmail(""); // Clear the input field
      } else {
        // Handle response errors
        const errorData = await response.json();
        console.log(errorData)
        const errorMessage = errorData?.msg || "Something went wrong.";
        toast.error(` ${errorMessage}`);
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error:", error); // Log the error for debugging
      const errorMessage = error?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    }
  };
  

  return (
    <div>
      <footer className="footer-section">
        <div className="appointment-form bg-[#1c8e81] sm:h-auto mt-20 pb-10">
          <div className="flex sm:flex-row flex-col sm:max-w-6xl w-full mx-auto">
            {/* Left Section */}
            <div className="left sm:w-[50%] w-full p-10 flex flex-col gap-5">
              <div className="flex gap-2 mt-10">
                <TbActivityHeartbeat className="mt-1 text-2xl text-white" />
                <p className="text-xl text-white">Get an Appointment</p>
              </div>
              <p className="font-bold text-4xl text-white">
                The Wide Network of Best Healthcare
              </p>
              <p className="text-white">
                Our team of highly trained professionals uses the latest healing
                technologies to restore you to pain-free health quickly and easily.
              </p>
            </div>

            {/* Right Section */}
            <div className="right sm:w-[50%] w-full sm:p-10 p-5">
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and Email */}
                <div className="flex sm:flex-row flex-col sm:gap-5 gap-4">
                  <div className="relative">
                    <CiUser className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="block w-full px-10 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:ring-opacity-40 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="relative">
                    <MdOutlineEmail className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full px-10 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:ring-opacity-40 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Phone and Subject */}
                <div className="flex sm:flex-row flex-col sm:gap-5 gap-4">
                  <div className="relative">
                    <CiPhone className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="number"
                      name="mobile"
                      placeholder="Phone"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="block w-full px-10 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:ring-opacity-40 focus:outline-none"
                      required
                    />
                  </div>
                  <div className="relative">
                    <VscSave className="absolute top-3 left-3 text-gray-400" />
                    <input
                      type="text"
                      name="message"
                      placeholder="Subject"
                      value={formData.message}
                      onChange={handleChange}
                      className="block w-full px-10 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:ring-opacity-40 focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                  <button
                    type="submit"
                    className="h-[50px] w-[220px] text-sm text-white font-bold bg-[#206e65] rounded-xl flex justify-center items-center shadow-md shadow-slate-200 transition-all ease-in-out duration-300"
                  >
                    BOOK AN APPOINTMENT
                  </button>
                  <p className="font-bold text-white">(OR)</p>
                  <div className="flex gap-2 items-center">
                    <div className="h-[40px] w-[40px] rounded-2xl border border-white flex justify-center items-center">
                      <a href="tel:+9999099538">
                        <CiPhone className="text-3xl text-white" />
                      </a>
                    </div>
                    <p className="font-bold text-xl text-white">
                      <a
                        href="tel:+9999099538"
                        className="hover:text-gray-400 transition-colors"
                      >
                        9999099538
                      </a>
                    </p>
                  </div>
                </div>
              </form>
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
                    <form
                      onSubmit={handleSubscribe}
                      className="flex items-center gap-2   rounded-md"
                    >
                      <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow px-4  text-black bg-gray-200 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-opacity-50 "
                        required
                      />
                      <button
                        type="submit"
                        className=" text-white bg-[#206e65]  hover:bg-[#1c8e81] transition-all duration-300"
                      >
                        <FaTelegramPlane className="text-xl" />
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
