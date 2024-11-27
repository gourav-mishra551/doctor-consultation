import React, { useState, useEffect } from "react";
import { CiLogin } from "react-icons/ci";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    gender: "male",
    dateOfBirth: "", 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(String(email).toLowerCase());
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const endpoint = isLogin
        ? "https://api.assetorix.com/ah/api/v1/user/login"
        : "https://api.assetorix.com/ah/api/v1/user/register";
      const response = await axios.post(endpoint, formData);
      if (response.status === 200) {
        toast.success(response.data?.msg);
        localStorage.setItem("token", response.data.x_auth_token);
        localStorage.setItem("user", response.data.x_user);
        localStorage.setItem("Id", response.data.x_userid);
        if (isLogin) {
          navigate("/");
        } else {
          navigate("/otp");
        }
      }
    } catch (error) {
      
    
      // Check if the error response contains an array of errors
      if (Array.isArray(error.response?.data?.errors) && error.response.data.errors.length > 0) {
        // Loop through the array and show each error message
        error.response.data.errors.forEach(err => {
          toast.error("Error: " + err.msg);
        });
      } else if (typeof error.response?.data?.msg === 'string') {
        // Show the error message directly if it's a string
        toast.error("Error: " + error.response.data.msg);
      } else {
        // Fallback in case the error structure is unexpected
        toast.error("An unknown error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }

    localStorage.setItem("signupemail", formData.email);
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      
  
      const { data } = await axios.post('https://api.assetorix.com/ah/auth/google/callback', {
        token: credentialResponse.credential,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin' : "*"
        },
        withCredentials: true, // Ensure cookies are sent if needed
      });
  
    
  
      // Store received data in local storage
      localStorage.setItem("token", data.x_auth_token);
      localStorage.setItem("user", data.x_user);
      localStorage.setItem("Id", data.x_userid);
  
     
      navigate("/");
    } catch (error) {
    
      toast.error("Google Sign-In failed. Please try again.");
    }
  };
  
  const handleGoogleFailure = (error) => {
    console.error("Google Sign-In failure:", error);
    toast.error("Google Sign-In was unsuccessful. Try again later.");
  };

  return (
    <section className="bg-white">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1638202993928-7267aad84c31?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        ></div>
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <Link to="/">
              <div className="flex justify-center">
                <img className="h-20" src="./ametheus.webp" alt="ametheus" />
              </div>
            </Link>
            <h1 className="text-2xl font-bold tracking-wider capitalize text-center text-[#1c8e81]">
              {isLogin ? "Login here" : "Sign Up here"}
            </h1>
            <p className="mt-4 text-lg text-[#1c8e81]">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>
            <div className="mt-6">
              <div className="mt-3 md:flex sm:flex-row sm:justify-start flex justify-between flex-row  md:items-center md:-mx-2">
                <button
                  className="flex justify-center w-max px-6 py-3 text-white bg-[#1c8e81] rounded-md md:w-auto md:mx-2 focus:outline-none"
                  onClick={() => setIsLogin(true)}
                >
                  <CiLogin className="w-6 h-6" />
                  <span className="mx-2">{isLogin ? "Login" : "Signup"}</span>
                </button>
                <button
                  onClick={toggleForm}
                  className="flex justify-center w-max px-6 py-3 text-[#1c8e81] border border-[#1c8e81] rounded-md md:mt-0 md:w-auto md:mx-2 focus:outline-none"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="mx-2 text-[#1c8e81]">
                    {isLogin ? "Signup" : "Login"}
                  </span>
                </button>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className= "grid gap-6 mt-8 sm:grid-cols-1 md:grid-cols-2">
              <div className= {isLogin ? "hidden" : "block"}>
                  <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="user1234"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                    
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="user@email.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                </div>
                <div className= {isLogin ? "hidden" : "block"}>
                  <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                    Gender
                  </label>
                  <select  className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40" defaultValue={"male"} name="gender" id="gender" value={formData.gender} onChange={handleChange}>
                    <option value="male">Male</option>
                    <option value="femail">Femail</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className= {isLogin ? "hidden" : "block"}>
                  <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                    Date of Birth (DOB)
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    placeholder="user@email.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                   
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter Password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                    required
                  />
                </div>
                {!isLogin && (
                  <div>
                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                      required
                    />
                  </div>
                )}
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1c8e81] rounded-md hover:bg-[#1c8e81] focus:outline-none focus:ring focus:ring-[#1c8e81] focus:ring-opacity-50"
                >
                  {loading ? "Loading..." : isLogin ? "Login" : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b md:w-1/4"></span>
              <span className="text-xs text-[#1c8e81] uppercase">or login with</span>
              <span className="w-1/5 border-b md:w-1/4"></span>
            </div>
            <div className="mt-6">
              <GoogleOAuthProvider className = "w-full mx-auto text-center" clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                className = "w-full mx-auto text-center"
                  onSuccess={handleGoogleSuccess}
                  onFailure={handleGoogleFailure}
                  useOneTap
                />
              </GoogleOAuthProvider>
            </div>
            <div className="mt-8">
              <p className="text-xs text-[#1c8e81] text-center">
                Forget your password ?{" "}
                <Link
                  to="/forget-password"
                  className="font-medium text-[#1c8e81] hover:underline underline ml-2"
                >
                  Forget Password
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
