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

  const [filters, setFilters] = useState({
    name: "",
    gender: "",
    rating: "",
    visitingMode: "",
    specialtyName: "",
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  const applyFilters = async () => {
    try {
      const query = Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors?categoryID=${id}&${query}`
      );
      setDoctersData(res.data.data);
      
    } catch (error) {
      console.error("Error fetching filtered data", error);
    }
    setShowFilter(false)
  };

  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    FetchCategory();
    FetchDoctersData();
  }, []);

  const FetchCategory = async () => {
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/category/${id}`
      );
      console.log(res);

      setResult(res.data.data);
      const categoryData = res.data.data;
    } catch (error) {}
  };

  const FetchDoctersData = async () => {
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors?categoryID=${id}`
      );
      setDoctersData(res.data.data);
    } catch (error) {}
  };

  const stripHtmlTags = (str) => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.body.textContent || "";
  };
  return (
    <div className="bg-[#CEDDE4]">
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

      <div className="md:hidden flex justify-center mb-5 mt-8">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="bg-[#00768A] text-white px-4 py-2 rounded-lg"
        >
          Filter Options
        </button>
      </div>

      {/* Mobile/Tablet Filter Modal */}
      {showFilter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 sm:p-4 w-[90%] sm:w-[80%] md:w-[400px] rounded-lg shadow-lg overflow-hidden relative">
            {/* Close Button */}
            <button
              onClick={() => setShowFilter(false)}
              className="absolute top-3 right-3 text-black text-xl sm:text-lg  focus:outline-none"
            >
              X
            </button>

            {/* Modal Content */}
            <div className="flex flex-col gap-5 w-full h-auto rounded-xl shadow-md bg-white py-6 px-6">
              <p className="font-semibold text-center text-2xl text-[#00768A]">
                Doctor Profile
              </p>

              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search doctor..."
                  className="p-3 border border-[#00768A] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00768A] bg-[#f5f7fa]"
                  onChange={(e) => handleFilterChange("name", e.target.value)}
                />
                <CiSearch className="absolute top-4 right-4 text-xl font-bold text-[#00768A]" />
              </div>

              {/* Filters */}
              <div className="flex flex-col gap-3">
                {/* Rating */}
                <div>
                  <p className="font-semibold">Rating</p>
                  <select
                    className="p-2 border border-[#00768A] rounded-lg w-full bg-[#f5f7fa] focus:outline-none"
                    onChange={(e) =>
                      handleFilterChange("rating", e.target.value)
                    }
                  >
                    <option value="">All</option>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <option key={rating} value={rating}>
                        {rating} Star{rating > 1 ? "s" : ""}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Visiting Mode */}
                <div>
                  <p className="font-semibold">Visiting Mode</p>
                  <select
                    className="p-2 border border-[#00768A] rounded-lg w-full bg-[#f5f7fa] focus:outline-none"
                    onChange={(e) =>
                      handleFilterChange("visitingMode", e.target.value)
                    }
                  >
                    <option value="">All</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    <option value="both">Both</option>
                  </select>
                </div>

                {/* Gender */}
                <div>
                  <p className="font-semibold">Gender</p>
                  <div className="flex gap-3">
                    {["Male", "Female"].map((gender) => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="radio"
                          name="gender"
                          value={gender.toLowerCase()}
                          onChange={(e) =>
                            handleFilterChange("gender", e.target.value)
                          }
                          className="form-radio h-4 w-4 text-[#00768A]"
                        />
                        <span className="ml-2">{gender}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Specialist */}
                <div>
                  <p className="font-semibold">Specialist</p>
                  <select
                    className="p-2 border border-[#00768A] rounded-lg w-full bg-[#f5f7fa] focus:outline-none"
                    onChange={(e) =>
                      handleFilterChange("specialtyName", e.target.value)
                    }
                  >
                    <option value="">All</option>
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
                      <option key={specialist} value={specialist}>
                        {specialist}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Search Button */}
              <div className="mt-4">
                <button
                  onClick={applyFilters}
                  className="h-[40px] w-full bg-[#00768A] text-white rounded-lg font-semibold hover:bg-[#005d71]"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="max-w-[1200px] justify-between mx-auto mt-10 flex flex-col-reverse md:flex-row gap-10 bg-[#CEDDE4] p-5">
        {/* Filter Section (Desktop Only) */}
        <div className="hidden md:flex flex-col gap-5 w-[25%] h-max rounded-xl shadow-md bg-white py-6 px-6 sticky top-0">
          <p className="font-semibold text-center text-2xl text-[#00768A]">
            Doctor Profile
          </p>

          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search doctor..."
              className="p-3 border border-[#00768A] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00768A] bg-[#f5f7fa]"
              onChange={(e) => handleFilterChange("name", e.target.value)}
            />
            <CiSearch className="absolute top-4 right-4 text-xl font-bold text-[#00768A]" />
          </div>

          {/* Filters */}
          <div className="flex flex-col gap-3">
            {/* Rating */}
            <div>
              <p className="font-semibold">Rating</p>
              <select
                className="p-2 border border-[#00768A] rounded-lg w-full bg-[#f5f7fa] focus:outline-none"
                onChange={(e) => handleFilterChange("rating", e.target.value)}
              >
                <option value="">All</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>

            {/* Visiting Mode */}
            <div>
              <p className="font-semibold">Visiting Mode</p>
              <select
                className="p-2 border border-[#00768A] rounded-lg w-full bg-[#f5f7fa] focus:outline-none"
                onChange={(e) =>
                  handleFilterChange("visitingMode", e.target.value)
                }
              >
                <option value="">All</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <p className="font-semibold">Gender</p>
              <div className="flex gap-3">
                {["Male", "Female"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender.toLowerCase()}
                      onChange={(e) =>
                        handleFilterChange("gender", e.target.value)
                      }
                      className="form-radio h-4 w-4 text-[#00768A]"
                    />
                    <span className="ml-2">{gender}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Specialist */}
            <div>
              <p className="font-semibold">Specialist</p>
              <select
                className="p-2 border border-[#00768A] rounded-lg w-full bg-[#f5f7fa] focus:outline-none"
                onChange={(e) =>
                  handleFilterChange("specialtyName", e.target.value)
                }
              >
                <option value="">All</option>
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
                  <option key={specialist} value={specialist}>
                    {specialist}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="mt-4">
            <button
              onClick={applyFilters}
              className="h-[40px] w-full bg-[#00768A] text-white rounded-lg font-semibold hover:bg-[#005d71]"
            >
              Apply Filters
            </button>
          </div>
        </div>

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
