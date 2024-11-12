import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { CiLogin } from "react-icons/ci";
import { SignUpSchema } from "../Schemas/SignupSchema";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { IoHomeOutline } from "react-icons/io5";

const initialValues = {
  name: "",
  gender: "",
  mobile: "",
  email: "",
  password: "",
  confirm_password: "",
};

const SignupLogin = () => {
  const [showLoginPage, setShowLoginPage] = useState(true);
  const [signupData, setSignupData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleBtnClick = () => {
    setShowLoginPage(!showLoginPage);
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const loginHandle = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://api.assetorix.com/ah/api/v1/user/login",
        loginData
      );
      console.log(response);
      if (response.status === 200) {
        navigate("/");
        localStorage.setItem("token", response.data.x_auth_token);
        localStorage.setItem("id", response.data.x_userid);
        localStorage.setItem("user", response.data.x_user);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
    useFormik({
      initialValues,
      validationSchema: SignUpSchema,
      onSubmit: async (values) => {
        try {
          console.log(values);
          setLoading(true);
          const response = await axios.post(
            "https://api.assetorix.com/ah/user/register",
            values
          );
          setSignupData(response.data);
          console.log(response.data);
          if (response.status === 200) {
            navigate("/dr-otp");
          }
        } catch (error) {
          setError(error);
          console.error("Error signing up:", error);
        } finally {
          setLoading(false);
        }
        localStorage.setItem("signupemail", values.email);
        console.log(values);
      },
    });

  // if (loading) return <div>loading...</div>
  if (error) return <div>{error.message}</div>;
  if (!signupData) return null;

  return (
    <>
      {showLoginPage ? (
        //Login page
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
                <div className="flex justify-center">
                  <img className="h-20" src="./ametheus.webp" alt="ametheus" />
                </div>

                <div className="flex justify-center items-center mb-3">
                  <button className="flex justify-center w-full px-6 py-3 text-white bg-[#1c8e81] rounded-md md:w-auto md:mx-2 focus:outline-none">
                    <IoHomeOutline className="w-5 h-5" />

                    <span className="mx-2">
                      <Link to="/" className="text-white">
                        Go to home
                      </Link>
                    </span>
                  </button>
                </div>

                <h1 className="text-2xl font-bold  tracking-wider  capitalize text-center text-[#1c8e81]">
                  Login Yourself
                </h1>

                <p className="mt-4 text-lg text-[#1c8e81]">
                  Let’s get you all set up so you can verify your personal
                  account and begin setting up your profile.
                </p>

                <div className="mt-6">
                  <div className="mt-3 md:flex md:items-center md:-mx-2">
                    <button className="flex justify-center w-full px-6 py-3 text-white bg-[#1c8e81] rounded-md md:w-auto md:mx-2 focus:outline-none">
                      <CiLogin className="w-6 h-6" />

                      <span className="mx-2">Login</span>
                    </button>

                    <button
                      onClick={handleBtnClick}
                      className="flex justify-center w-full px-6 py-3 text-[#1c8e81] border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-[#1c8e81] dark:text-[#1c8e81]-400 focus:outline-none"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>

                      <span className="mx-2 text-[#1c8e81]">Signup</span>
                    </button>
                  </div>
                </div>

                {/* login form */}
                <form
                  onSubmit={loginHandle}
                  className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
                >
                  <div>
                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={loginData.email}
                      onChange={handleLoginChange}
                      onBlur={handleBlur}
                      placeholder="johnsnow@example.com"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={loginData.password}
                      onChange={handleLoginChange}
                      onBlur={handleBlur}
                      placeholder="Enter your password"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1c8e81] rounded-md focus:outline-none focus:ring focus:ring-[#1c8e81] focus:ring-opacity-50"
                  >
                    <span>Login </span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 rtl:-scale-x-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      ) : (
        //Signup page
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
                <div className="flex justify-center">
                  <img className="h-20 " src="./ametheus.webp" alt="ametheus" />
                </div>

                <div className="flex justify-center items-center mb-3">
                  <button className="flex justify-center w-full px-6 py-3 text-white bg-[#1c8e81] rounded-md md:w-auto md:mx-2 focus:outline-none">
                    <IoHomeOutline className="w-5 h-5" />

                    <span className="mx-2">
                      <NavLink to="/" className="text-white">
                        Go to home
                      </NavLink>
                    </span>
                  </button>
                </div>

                <h1 className="text-2xl font-bold text-center  tracking-wider  capitalize text-[#1c8e81]">
                  Register Yourself
                </h1>

                <p className="mt-4 text-lg text-[#1c8e81]">
                  Let’s get you all set up so you can verify your personal
                  account and begin setting up your profile.
                </p>

                <div className="mt-6">
                  <div className="mt-3 md:flex md:items-center md:-mx-2 sm:gap-0">
                    <button
                      onClick={handleBtnClick}
                      className="flex justify-center w-full px-6 py-3 text-[#1c8e81] border border-blue-500 rounded-md md:mt-0 md:w-auto md:mx-2 dark:border-[#1c8e81] dark:text-[#1c8e81]-400 focus:outline-none"
                    >
                      <CiLogin className="w-6 h-6" />
                      <span className="mx-2 text-[#1c8e81]">Login</span>
                    </button>

                    <button className="flex justify-center w-full px-6 py-3 text-white bg-[#1c8e81] rounded-md md:w-auto md:mx-2 focus:outline-none">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>

                      <span className="mx-2">Signup</span>
                    </button>
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2"
                >
                  <div>
                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="John Snow"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="off"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.name && touched.name ? (
                      <p className="text-red-700">{errors.name}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                      Gender
                    </label>
                    <select
                      name="gender"
                      placeholder="John Snow"
                      value={values.gender}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-3 w-[300px] block px-5 py-3 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                      Phone number
                    </label>
                    <input
                      type="text"
                      placeholder="XXX-XX-XXXX-XXX"
                      name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="off"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.mobile && touched.mobile ? (
                      <p className="text-red-700">{errors.mobile}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                      Email address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="johnsnow@example.com"
                      autoComplete="off"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.email && touched.email ? (
                      <p className="text-red-700">{errors.email}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your password"
                      autoComplete="off"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                    />

                    {errors.password && touched.password ? (
                      <p className="text-red-700">{errors.password}</p>
                    ) : null}
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-[#1c8e81] font-bold">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="confirm_password"
                      value={values.confirm_password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter your password"
                      autoComplete="off"
                      className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600  dark:text-[#1c8e81] dark:border-[#1c8e81] focus:border-blue-400 dark:focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                    {errors.confirm_password && touched.confirm_password ? (
                      <p className="text-red-700">{errors.confirm_password}</p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-[#1c8e81] rounded-md  focus:outline-none focus:ring focus:ring-[#1c8e81] focus:ring-opacity-50"
                  >
                    <span>Sign Up</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 rtl:-scale-x-100"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default SignupLogin;
