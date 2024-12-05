import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { toast } from 'react-toastify';

// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        mobile: '',
        message: ''
    });

    useEffect(() => {
        gsap.to(window, { duration: 1, scrollTo: { y: 0 }, ease: "power2.inOut" });
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('https://api.assetorix.com/ah/api/v1contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast.success('Your request has been submitted successfully!');
                setFormData({
                    name: '',
                    email: '',
                    mobile: '',
                    message: ''
                });
            } else {
                toast.error('There was an error submitting your request. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('An error occurred. Please try again later.');
        }
    };

    return (
        <>
            
            <div className='w-[90vw] mx-auto flex flex-col sm:flex-row gap-10 sm:p-0 p-5 sm:mt-10'>
                {/* Background blur */}
                <div className="absolute inset-0 bg-[#a9f2ff]/70 backdrop-blur-sm backdrop-brightness-50 sm:h-[100vh] top-[10%] h-screen"></div>
                
                {/* Contact Info Section */}
                <div className='w-full sm:w-[60%] relative'>
                    <div className='sm:mt-10 mt-5'>
                        <p className='text-3xl text-black font-bold sm:mb-2'>CONTACT US</p>
                        <div className='h-[1px] max-w-6xl mx-auto bg-gray-500 mt-3'></div>
                    </div>

                    <div>
                        <NavLink to="https://www.ametheushealth.com" target="_blank">
                            <p className='font-bold text-xl'>www.ametheushealth.com</p>
                        </NavLink>
                    </div>

                    <div>
                        <p className='text-lg sm:text-xl '>Ametheus Holdings Pvt Ltd<br />
                            17, Aurobindo Marg, 1st Floor, Green Park Extension,<br />
                            Yusuf Sarai, New Delhi 110016, India</p>
                    </div>

                    <div>
                        <p className='text-lg sm:text-xl'>If you ever feel like you can’t find the right product for you on our site or you need a little more information or assistance please get in touch with the sales team.</p>
                    </div>

                    <div>
                        <ul className="text-lg">
                            <li>WhatsApp Support:
                                <a href="https://wa.me/9990032288" target="_blank" className="text-blue-600">
                                    +91-9990032288
                                </a>
                            </li>
                            <li>Customer Care:
                                <a href="tel:+91-9990032288" target="_blank" className="text-blue-600">
                                    +91-9990032288,
                                </a>
                                <a href="tel:+9990045588" target="_blank" className="ml-2 text-blue-600">
                                    +91-9990045588
                                </a>
                            </li>
                            <li>Email: <NavLink to="mailto:info@ametheushealth.com" className="text-blue-600">info@ametheushealth.com</NavLink></li>
                            <li>Twitter Support: 
                                <NavLink to='https://twitter.com/ametheushealth' target='_blank' className="text-blue-600">
                                    @ametheushealth
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Form Section */}
                <form onSubmit={handleSubmit} className="request-form flex flex-col gap-5 relative w-full sm:w-[40%]">
                    <div className="flex flex-col">
                        <label className="font-semibold">First Name<span className="text-red-700">*</span></label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-opacity-40"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Email <span className="text-red-700">*</span></label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-opacity-40"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Phone <span className="text-red-700">*</span></label>
                        <input
                            type="tel"
                            name="mobile"
                            value={formData.mobile}
                            onChange={handleInputChange}
                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-opacity-40"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="font-semibold">Request Description <span className="text-red-700">*</span></label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring focus:ring-opacity-40"
                            required
                        />
                        <p className="text-[10px] font-normal">0 of 1000 max words.</p>
                    </div>

                    <div className="flex justify-end">
                        <button type="submit" className="font-bold text-white h-[40px] w-[150px] bg-[#1c8e81] rounded-md border-none hover:bg-[#055f9c] transition-all duration-200">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            
        </>
    );
};

export default ContactUs;
