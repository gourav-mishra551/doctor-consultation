import React from "react";
import "./footer.css";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { IoMdMail } from "react-icons/io";
import { IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import AmethusImage from "../Assests/ametheus-logo.webp";

const Footer = () => {
  return (
    <div>
      <footer className="footer-section">
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
                    <span>mail@info.com</span>
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
