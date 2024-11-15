import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation, useParams } from "react-router-dom";

import { CiSearch } from "react-icons/ci";
import axios from "axios";
import TopHeader from "./TopHeader";
import Faq from "./Faq";
import DoctorCard from "./DoctorCard/DoctorCard";
import Footer from "./Footer";

function CategoriesDetails() {
  const location = useLocation();
  const [showFilter, setShowFilter] = useState(false);
  const { title } = location.state || {};
  const [result, setResult] = useState({});
  const [DoctorsData, setDoctersData] = useState([]);
  const { id } = useParams();

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    FetchCategory();
    FetchDoctersData();
  }, []);

  const FetchCategory = async () => {
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/category/${id}`
      );
      console.log(res)

      setResult(res.data.data);
      const categoryData = res.data.data;
    } catch (error) { }
  };





  const FetchDoctersData = async () => {
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors?categoryID=${id}`
      );
      setDoctersData(res.data.data);
    } catch (error) { }

  };

  const stripHtmlTags = (str) => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.body.textContent || "";
  };
  return (
    <div className="bg-[#CEDDE4]">
      <TopHeader />
      <Navbar />

      {/* Banner Section */}
      <div
        className="relative h-[40vh] flex justify-center items-center"
        style={{
          backgroundImage: `url(${result?.banner})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content with animation */}
        <div className="relative text-center text-white px-4 flex flex-col justify-center items-center animate-slideIn">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 transform transition-transform duration-500 ease-in-out hover:scale-105">
            Consult {result.categoryName}
          </h1>
          <p className="max-w-[500px] text-base sm:text-lg md:text-xl transform transition-transform duration-500 ease-in-out hover:scale-105">
            {result.sortDescription}
          </p>
        </div>
      </div>

      {/* Mobile/Tablet Filter Button */}
      <div className="md:hidden flex justify-center mb-5 mt-8">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-[#00768A] text-white px-4 py-2 rounded-lg"
        >
          Filter Options
        </button>
      </div>
      <div className="max-w-[1200px] mx-auto mt-10 flex flex-col-reverse md:flex-row gap-10 bg-[#CEDDE4] p-5">
        {/* Filter Section (Desktop Only) */}
        <div className="hidden  md:flex filter-section flex-col gap-3 md:w-[35vw] h-[870px] rounded-xl shadow-md bg-[#fff] p-5 sticky top-0">
          <p className="font-semibold text-center text-2xl text-[#00768A]">
            Doctor Profile
          </p>
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="p-2 border border-[#00768A] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-rgb(73,168,173)-500 bg-[#e4eaec]"
            />
            <CiSearch className="absolute top-3 right-5 text-xl font-bold" />
          </div>

          <div className="mb-2">
            <p className="font-semibold">Date Range</p>
            <input
              type="date"
              className="p-2 border border-[#00768A] bg-[#e4eaec] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-rgb(73,168,173)-500"
            />
          </div>
          <hr />

          <div className="flex flex-col mb-2">
            <p className="font-semibold">Gender</p>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-checkbox text-[#00768A] h-4 w-4"
                name="Gender"
              />
              <span className="ml-1">Male</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                className="form-checkbox text-[#00768A] h-4 w-4"
                name="Gender"
              />
              <span className="ml-1">Female</span>
            </label>
          </div>
          <hr />

          <div className="mb-2">
            <p className="font-semibold">Price Range</p>
            <input type="range" />
          </div>
          <hr />

          <div className="flex flex-col">
            <p className="font-semibold">Select Specialist</p>
            {[
              "Cardiologist",
              "Dermatologist",
              "Orthopedic Surgeon",
              "Gynecologist",
              "Neurologist",
              "Ophthalmologist",
              "Pediatrician",
              "Endocrinologist",
              "Gastroenterologist",
              "Pulmonologist",
              "Orthopedic",
            ].map((specialist) => (
              <label key={specialist} className="inline-flex items-center">
                <input
                  type="radio"
                  className="form-checkbox text-[#00768A] h-4 w-4"
                  name="Specialist"
                />
                <span className="ml-1">{specialist}</span>
              </label>
            ))}
          </div>

          <div className="text-white flex justify-center items-center">
            <button className="h-[40px] w-full bg-[#00768A] rounded-xl">
              Search
            </button>
          </div>
        </div>

        {/* Mobile/Tablet Filter Modal */}
        {showFilter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div
              className="bg-white p-5 sm:p-4 w-[90%] sm:w-[80%] md:w-[400px] rounded-lg shadow-lg overflow-hidden"

            >
              {/* Close Button */}
              <button
                onClick={() => setShowFilter(false)}
                className="absolute top-3 right-3 text-black text-xl sm:text-lg"
              >
                X
              </button>

              {/* Modal Content */}
              <div className="flex flex-col h-full">
                <h2 className="text-xl sm:text-2xl font-semibold text-[#00768A] mb-4">
                  Filter
                </h2>

                {/* Scrollable Filter Content */}
                <div className="overflow-y-auto flex-1 max-h-[70vh] sm:max-h-[60vh]">
                  {/* Search Input */}
                  <div className="relative mb-4">
                    <input
                      type="text"
                      placeholder="Search..."
                      className="p-2 sm:p-3 border border-[#00768A] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#49a8ad] bg-[#e4eaec] text-sm sm:text-base"
                    />
                    <CiSearch className="absolute top-3 right-5 text-xl sm:text-2xl font-bold text-[#00768A]" />
                  </div>

                  {/* Date Range */}
                  <div className="mb-4">
                    <p className="font-semibold text-sm sm:text-base">
                      Date Range
                    </p>
                    <input
                      type="date"
                      className="p-2 sm:p-3 border border-[#00768A] bg-[#e4eaec] rounded-xl w-full focus:outline-none focus:ring-2 focus:ring-[#49a8ad]"
                    />
                  </div>

                  <hr className="my-4" />

                  {/* Gender Filter */}
                  <div className="flex flex-col mb-4">
                    <p className="font-semibold text-sm sm:text-base">Gender</p>
                    <label className="inline-flex items-center mb-2 text-sm sm:text-base">
                      <input
                        type="radio"
                        className="form-checkbox text-[#00768A] h-4 w-4"
                        name="Gender"
                      />
                      <span className="ml-1">Male</span>
                    </label>
                    <label className="inline-flex items-center text-sm sm:text-base">
                      <input
                        type="radio"
                        className="form-checkbox text-[#00768A] h-4 w-4"
                        name="Gender"
                      />
                      <span className="ml-1">Female</span>
                    </label>
                  </div>

                  <hr className="my-4" />

                  {/* Price Range */}
                  <div className="mb-4">
                    <p className="font-semibold text-sm sm:text-base">
                      Price Range
                    </p>
                    <input type="range" className="w-full" />
                  </div>

                  <hr className="my-4" />

                  {/* Specialist Filter */}
                  <div className="flex flex-col mb-4">
                    <p className="font-semibold text-sm sm:text-base">
                      Select Specialist
                    </p>
                    {[
                      "Cardiologist",
                      "Dermatologist",
                      "Orthopedic Surgeon",
                      "Gynecologist",
                      "Neurologist",
                      "Ophthalmologist",
                      "Pediatrician",
                      "Endocrinologist",
                      "Gastroenterologist",
                      "Pulmonologist",
                      "Orthopedic",
                    ].map((specialist) => (
                      <label
                        key={specialist}
                        className="inline-flex items-center mb-2 text-sm sm:text-base"
                      >
                        <input
                          type="radio"
                          className="form-checkbox text-[#00768A] h-4 w-4"
                          name="Specialist"
                        />
                        <span className="ml-1">{specialist}</span>
                      </label>
                    ))}
                  </div>

                  {/* Search Button */}
                  <div className="text-white flex justify-center items-center">
                    <button className="h-[40px] sm:h-[45px] w-full bg-[#00768A] rounded-xl text-sm sm:text-base">
                      Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Doctor Profile Section */}
        <DoctorCard doctorData={DoctorsData} />
      </div>

      {/* Long Description */}
      <div
        style={{
          marginTop: "30px",
          height: "auto",
          backgroundColor: "rgb(249,250,251)",
          padding: "60px",
        }}
      >
        <p
          style={{
            textAlign: "center",
            width: "80%",
            alignItems: "center",
            margin: "auto",
            justifyContent: "center",
          }}
        >
          {stripHtmlTags(result.longDescription)}
        </p>
      </div>

      {/* FAQ */}
      <Faq result={result} />
      <Footer />
    </div>
  );
}

export default CategoriesDetails;
