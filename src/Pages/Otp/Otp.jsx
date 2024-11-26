import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Otp = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: localStorage.getItem('signupemail'),
        otp: "",
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post('https://api.assetorix.com/ah/api/v1/user/verify', formData);
            if(response.statusCode === 201) {
                toast.success('OTP verified successfully!');
            }
            navigate('/');
        } catch (error) {
            toast.error('OTP verification failed: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <section className="bg-white">
                <div className="flex justify-center min-h-screen">
                    <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                    </div>
                    <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                        <div className="w-full">
                            <div className="flex justify-center">
                                <img className="h-20" src="./ametheus.webp" alt="ametheus" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-wider capitalize text-center text-[#1c8e81]">
                                OTP Verification
                            </h1>
                            <p className="mt-4 text-lg text-[#1c8e81]">
                                Please enter the OTP sent to your email to verify your account.
                            </p>
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                                <div>
                                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                                        readOnly
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">OTP</label>
                                    <input
                                        type="text"
                                        name="otp"
                                        value={formData.otp}
                                        onChange={handleChange}
                                        placeholder="Enter your OTP"
                                        className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="col-span-2">
                                    <button
                                        type="submit"
                                        className="flex items-center justify-between w-[15vw] px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1c8e81] rounded-md focus:outline-none focus:ring focus:ring-[#1c8e81] focus:ring-opacity-50">
                                        <span>Verify OTP</span>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd"
                                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </form>
                            {loading && <div>Loading...</div>}
                        </div>
                    </div>
                </div>
             
            </section>
        </div>
    );
};

export default Otp;
