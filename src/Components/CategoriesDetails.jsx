import React, { useEffect, useState } from "react";
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
  const [categories, setCategories] = useState([]);
  const { id } = useParams();

  const [filters, setFilters] = useState({
    name: '',
    gender: '',
    rating: '',
    visitingMode: '',
    specialtyName: '',
  });

  const handleFilterChange = (filterType, value) => {
    setFilters((prevFilters) => ({ ...prevFilters, [filterType]: value }));
  };

  const applyFilters = async () => {
    try {
      const query = Object.entries(filters)
        .filter(([_, value]) => value)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join('&');
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors?categoryID=${id}&${query}`
      );
      setDoctersData(res.data.data);
    } catch (error) {
      console.error('Error fetching filtered data', error);
    }
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

      setResult(res.data.data);
      setCategories(res.data.categoryList)

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
     

      {/* Banner Section */}
      <div
        className="relative h-[40vh] flex justify-center items-center"
        style={{
          backgroundImage: `url(${result?.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-60"></div>

        {/* Content with animation */}
        <div className="relative text-center text-white px-4 flex flex-col justify-center items-center animate-slideIn">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 transform transition-transform duration-500 ease-in-out hover:scale-105">
            Consult {result?.specialtyName}
          </h1>
          <p className="max-w-[500px] text-base sm:text-lg md:text-xl transform transition-transform duration-500 ease-in-out hover:scale-105">
            {result?.sortDescription}
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
      <div className="max-w-[1200px] justify-between mx-auto mt-10 flex flex-col-reverse md:flex-row gap-10 bg-[#CEDDE4] p-5" >
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
              onChange={(e) => handleFilterChange('name', e.target.value)}
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
                onChange={(e) => handleFilterChange('rating', e.target.value)}
              >
                <option value="">All</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>
                    {rating} Star{rating > 1 ? 's' : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Visiting Mode */}
            <div>
              <p className="font-semibold">Visiting Mode</p>
              <select
                className="p-2 border border-[#00768A] rounded-lg w-full bg-[#f5f7fa] focus:outline-none"
                onChange={(e) => handleFilterChange('visitingMode', e.target.value)}
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
                {['Male', 'Female'].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender.toLowerCase()}
                      onChange={(e) => handleFilterChange('gender', e.target.value)}
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
                onChange={(e) => handleFilterChange('specialtyName', e.target.value)}
              >
                <option value="">All</option>
                {categories.map((specialist) => (
                  <option key={specialist._id} value={specialist.specialtyName}>
                    {specialist.specialtyName}
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
                  <div>
                    <p className="font-semibold">Specialist</p>
                    <select
                      className="p-2 border border-[#00768A] rounded-lg w-full bg-[#f5f7fa] focus:outline-none"
                      onChange={(e) => handleFilterChange('specialtyName', e.target.value)}
                    >
                      <option value="">All</option>
                      {categories.map((specialist) => (
                        <option key={specialist._id} value={specialist.specialtyName}>
                          {specialist.specialtyName}
                        </option>
                      ))}
                    </select>
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
