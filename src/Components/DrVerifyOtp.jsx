import axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const DrVerifyOtp = () => {

    const [otp, setOtp] = useState("")

    const navigate = useNavigate()

    const storedSignupEmail = localStorage.getItem('signupemail')

    const handleChange = (e) => {
        const otp = e.target.value
        setOtp(otp)
    }

    console.log(storedSignupEmail)

    const submitOtp = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('https://api.assetorix.com/ah/user/verify', { "email": storedSignupEmail, otp })
            if (response.status === 201) {
                localStorage.setItem('authorization', response.data.x_auth_token)
                localStorage.setItem('id', response.data.x_userid)
                navigate('/home')
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <section className="bg-white">

                <div className="flex justify-center min-h-screen" >
                    <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
                    </div>

                    <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5" >

                        <div className="w-full">
                            <div className="flex justify-center">
                                <img className="h-20" src="./ametheus.webp" alt="ametheus" />
                            </div>

                            <h1 className="text-2xl font-bold  tracking-wider  capitalize text-center text-[#1c8e81]">
                                Verify Here
                            </h1>

                            <p className="mt-4 text-lg text-[#1c8e81]">
                                Let’s get you all set up so you can verify your personal account and begin setting up your profile.
                            </p>

                            <div className="mt-6">
                                <h1 className="text-[#1c8e81] font-semibold">Otp sent to <span className="text-red-700">{storedSignupEmail}</span> </h1>

                            </div>

                            {/* login form */}
                            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1">

                                <div>
                                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">Enter Otp</label>
                                    <input
                                        type="email"
                                        name="email"
                                        onChange={handleChange}
                                        // onBlur={handleBlur}
                                        placeholder=""
                                        className="block w-full px-5 py-3 mt-2 sm:w-[300px] text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>


                                <button
                                    type="submit"
                                    onClick={submitOtp}
                                    className="flex items-center sm:w-[300px] justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1c8e81] rounded-md  focus:outline-none focus:ring focus:ring-[#1c8e81] focus:ring-opacity-50">
                                    <span>Verify Here </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clip-rule="evenodd" />
                                    </svg>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            )
        </>
    )
}

export default DrVerifyOtp