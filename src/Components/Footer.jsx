import React from 'react';
import { FaArrowRight, FaFacebook, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import Navbar from './Navbar';
import { FaInstagramSquare } from 'react-icons/fa';

const Footer = () => {
    const HandleScroll=()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // This will create a smooth scrolling effect
        });
    }
    return (
        <div className='footer flex flex-col bg-[#0b2033]'>

            <div className='top-footer bg-[#dbe0e0] flex sm:flex-row flex-col sm:max-w-6xl sm:mx-auto w-full sm:h-[130px] h-auto rounded-xl translate-y-[-50px] justify-between'>
                <div className='p-4'>
                    <p className='text-[#820582] font-bold p-3'> <NavLink to='https://www.ametheushealth.com' target='_blank'><span>www.ametheushealth.com</span></NavLink> is the easiest way to get top of the line medicines; Best in
                        segments, Global Delivery, Discreet Shipment. Email: <NavLink to={`mailto:info@ametheushealth.com?subject=Subject&body=Body`}><span>info@ametheushealth.com</span></NavLink>   ,
                        Whatsapp at: <NavLink to="whatsapp://send?phone=919999099538"><span>+91-9999099538</span></NavLink> ,
                        Message us on X: <NavLink to='https://twitter.com/ametheushealth' target='_blank'><span> www.twitter.com/ametheushealth.</span></NavLink> </p>
                </div>

                <div className='p-5 flex justify-center items-center'>
                    <div className='locate-btn w-[150px] h-[60px] flex items-center gap-2 rounded-xl bg-[#1c8e81] text-white p-5 mt-5 opacity-80 hover:opacity-100 transition ease-in-out delay-150 duration-300 cursor-pointer'>
                        <button className='font-bold'>LOCATE US
                        </button>
                        <FaArrowRight className='text-white mt-1' />
                    </div>
                </div>
            </div>

            <div className="footer-middle flex sm:flex-row flex-col max-w-6xl mx-auto text-white text-[15px] font-thin gap-5">

                <div className="footer-navs sm:w-[25%] w-full flex flex-col px-5">
                    <p className='font-bold'>Company</p>
                    <div className='h-[2px] w-[30px] bg-gray-500 mt-2'></div>
                    <ul className='sm:mt-8  flex flex-col gap-3'>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'> <NavLink className='text-white' to="/">Home</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to="/about">About</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-20'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to="/brand-ametheus">Brand Ametheus</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to="/why-we-are-different/">Why we are different</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-500 opacity-30'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to="/wellness-and-safety">Wellness and Safety</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to="/price-promise/">Price Promise</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to="/our-treatments/">Our Treatments</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to="/delivery">Delivery</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to="/contact-us">Contact</NavLink>
                        </li>
                    </ul>
                </div>

                <div className="footer-navs sm:w-[25%] w-full flex flex-col px-5">
                    <p className='font-bold'>Helpcentre</p>
                    <div className='h-[2px] w-[30px] bg-gray-500 mt-2'></div>
                    <ul className='sm:mt-8 mt-3  flex flex-col gap-3'>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to='/how-amatheus-work'>How AmetheusHealth.com Works</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to='/purchase-terms-conditions/'>Purchase Terms & Conditions</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to='/return-refunds/'>Return & Refunds</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li onClick={HandleScroll} className='cursor-pointer text-lg'> <NavLink className='text-white' to='/privacy'>Privacy</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to='/terms-of-use/'>Terms of Use of Website</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to='/faq'>FAQ’s</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to='/shipping-information/'>Shipping Information</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to='/support-center'>Support Centre</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li className='cursor-pointer text-lg'><NavLink className='text-white' to='/request-for-quote/' onClick={HandleScroll} >Fill RFQ Form</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>

                        <li className='cursor-pointer text-lg'><NavLink className='text-white' onClick={HandleScroll} to='/disclaimer/'>Disclaimer</NavLink>
                        </li>
                    </ul>
                </div>

                <div className="footer-navs sm:w-[25%] w-full flex flex-col px-5">
                    <p className='font-bold'>Popular Treatments</p>
                    <ul className='sm:mt-10 mt-3 flex flex-col gap-3'>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white'>Antiviral Drug</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white'>Anti-Cancer Drug</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>

                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white'>HIV Range</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white'>Prostate Treatment</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to='/covid-19-drug/'>Covid-19 Drug</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white' to='/vaccine/'>Vaccine</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li onClick={HandleScroll} className='cursor-pointer text-lg' ><NavLink className='text-white'>Neurological Medicine</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white'>Diabetes</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>


                        <li onClick={HandleScroll} className='cursor-pointer text-lg'><NavLink className='text-white'>Erectile Dysfunction</NavLink>
                            <div className='h-[1px] sm:w-[200px] w-full bg-gray-400 opacity-30'></div>
                        </li>
                    </ul>
                </div>

                <div className="footer-navs sm:w-[25%] w-full flex flex-col justify-center items-center">
                    <p className='font-bold'>Global Delivery of Fair Priced Medicines</p>
                    <p className='sm:mt-4 mt-3 px-5 sm:px-0'>Access to affordable prescription drugs is your right and It is the endeavor of
                        Ametheus to deliver you the medicines at fair price to any parts of the world.</p>
                    <div className='locate-btn font-semibold w-[100px] h-[45px] gap-2 flex bg-[#1c8e81] text-white mt-5 opacity-80 hover:opacity-100 transition ease-in-out delay-150 duration-300 cursor-pointer justify-center items-center'>
                        <button className=''>MORE
                        </button>
                        <FaArrowRight className='text-white' />
                    </div>
                </div>
            </div>

            <div className="footer-bottom mt-10 flex flex-col justify-center items-center mb-10 gap-5">
                <div className="footer-payment-icons w-[300px] ">
                    <img src="Footer-Payment-Icons.webp" alt="" />
                </div>

                <p className='text-white px-5 sm:px-0'>This online Medicine ordering site is regulated by the rules of Hong Kong.</p>

                <div className='flex gap-5'>
                    <p className='text-[#ffff] mt-3 font-bold'>Follow us on</p>
                    <div className='bg-[#1c9bf0] h-[50px] w-[50px] rounded-full flex justify-center items-center cursor-pointer group' style={{backgroundColor:"#ffff"}}>
                    <FaXTwitter className='text-2xl transition-transform ease-in-out duration-[300ms] group-hover:scale-125' style={{color:"black"}} />
                    </div>


                    <div className='bg-[#1c9bf0] h-[50px] w-[50px] rounded-full flex justify-center items-center cursor-pointer group' style={{backgroundColor:"#ffff"}}>
                      <FaFacebook className='text-2xl transition-transform ease-in-out duration-[1000ms] group-hover:scale-125' style={{color:"black"}} />
                    </div>

                    <div className='bg-[#1c9bf0] h-[50px] w-[50px] rounded-full flex justify-center items-center cursor-pointer group' style={{backgroundColor:"#ffff"}}>
                    <FaInstagramSquare className='text-2xl transition-transform ease-in-out duration-[1000ms] group-hover:scale-125' style={{color:"black"}} />
                    </div>


                    <div className='bg-[#1c9bf0] h-[50px] w-[50px] rounded-full flex justify-center items-center cursor-pointer group' style={{backgroundColor:"#ffff"}}>
                     <FaLinkedinIn className='text-2xl transition-transform ease-in-out duration-[1000ms] group-hover:scale-125' style={{color:"black"}} />
                     </div>


                    
                </div>

                <p className='text-white text-center px-5 sm:px-0'>©2010 - 2023 All rights reserved with Ametheus Holdings Pvt Ltd</p>

                <div className="total-visitors sm:w-[500px] sm:h-[100px] w-[200px] h-[100px] bg-white flex justify-center items-center flex-col rounded-md">
                    <p className='text-3xl font-bold'>607575</p>
                    <p className='text-gray-400'>Total Visitors</p>
                </div>

            </div>

        </div>
    )
}

export default Footer