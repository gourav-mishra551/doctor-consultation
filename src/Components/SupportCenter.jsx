import React, { useState, useEffect } from 'react';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { toast } from 'react-toastify';


// Register the ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

const SupportCenter = () => {
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
                // Clear form data after successful submission
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
          
            <div className="max-w-6xl mx-auto flex flex-col gap-10 sm:p-0 sm:px-10 px-3 mt-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 ">
                    {/* Left Column: Contact Information */}
                    <div className="flex flex-col justify-center items-start gap-4 " style={{
                        backgroundImage: "url('https://blog.ipleaders.in/wp-content/uploads/2020/01/Health-Insurance.jpg')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                        width: "100%",
                        height: "400px"
                    }}>
                        <div className="absolute inset-0 bg-[#a9f2ff]/70 backdrop-blur-sm backdrop-brightness-50 sm:h-[100vh] top-[10%] h-auto"></div>
                        <div className="relative z-10 p-4">
                            <p className="font-bold sm:text-3xl text-[#1494AA] text-xl text-start">Support Centre</p>
                            <p className="font-semibold text-start"><span className='text-black text-lg font-bold'> Call or Whatsapp at: </span> +91-9990032288</p>
                            <p className="font-semibold text-start"><span className='text-black text-lg font-bold'> Whatsapp Support:</span> +91-9990032288 ,+91-9990045588</p>
                            <p className="font-semibold text-start"><span className='text-black text-lg font-bold'>Email: </span> info@ametheushealth.com</p>
                            <p className="font-semibold text-start"><span className='text-[#1DA1F2] font-bold'> Message us on X: </span> www.twitter.com/ametheushealth</p>
                        </div>
                    </div>

                    {/* Right Column: Request Form */}
                    <form onSubmit={handleSubmit} className="request-form flex flex-col gap-5 relative">
                        <div className=" gap-5">
                            <div className="flex flex-col">
                                <p className="font-semibold">First Name<span className="text-red-700">*</span></p>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                                    required
                                />
                            </div>
                            
                        </div>

                        <div>
                            <p className="font-semibold">Email <span className="text-red-700">*</span></p>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>

                        <div>
                            <p className="font-semibold">Phone <span className="text-red-700">*</span></p>
                            <input
                                type="tel"
                                name="mobile"
                                value={formData.mobile}
                                onChange={handleInputChange}
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                                required
                            />
                        </div>

                        <div>
                            <p className="font-semibold">Request Description <span className="text-red-700">*</span></p>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
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
            </div>
        
        </>
    );
};

export default SupportCenter;
