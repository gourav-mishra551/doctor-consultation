import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import Faq from "./Faq";
import DoctorCard from "./DoctorCard/DoctorCard";
import Footer from "./Footer";
import { RxCross1 } from "react-icons/rx";
import { filter } from "lodash";

function CategoriesDetails() {
  const [showFilter, setShowFilter] = useState(false);
  const [result, setResult] = useState({});
  const [loading, setLoading] = useState(false);
  const [DoctorsData, setDoctersData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();
  const [filters, setFilters] = useState({
    categoryID:  id,
    name: "",
    gender: "",
    rating: "",
    visitingMode: "",
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

      // Update the URL with the filters
      window.history.pushState(null, "", `?${query}`);

      // Fetch filtered data
       const currency =  localStorage.getItem("currency") || "INR"
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors?${query}&currency=${currency}`
      );
      setDoctersData(res.data.data);
    } catch (error) {
      console.error("Error fetching filtered data", error);
    }
    setShowFilter(false);
  };

 
  const FetchCategory = async (id) => {
    try {
      setIsLoading(true);
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/category/${id}`
      );

      setResult(res.data);
    } catch (error) {
      console.error("Error fetching category data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const FetchDoctorsData = async (id, currency) => {
    try {
      setLoading(true); // Set loading state to true
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors?categoryID=${id}&currency=${currency}`
      );
      setDoctersData(res.data.data); // Ensure the correct spelling (Doctors instead of Docters)
    } catch (error) {
      console.error("Error fetching data", error);
    } finally {
      setLoading(false); // Set loading state to false once the request is complete
    }
  };

  useEffect(() => {
    FetchCategory(id);
    FetchDoctorsData(id, localStorage.getItem("currency") || "INR"); // Ensure currency is passed here
    window.scroll(0, 0);
  }, [id]);

  useEffect(() => {
    const handleCurrencyChange = () => {
      const currency = localStorage.getItem("currency"); // Get the updated currency
      FetchDoctorsData(id, currency); // Pass currency to FetchDoctorsData
    };

    window.addEventListener("currencyChange", handleCurrencyChange);

    return () => {
      window.removeEventListener("currencyChange", handleCurrencyChange);
    };
  }, [id]);

  const stripHtmlTags = (str) => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return doc.body.textContent || "";
  };

  return (
    <div>
      {isLoading ? (
        <div>
          <div className="flex justify-center items-center min-h-screen">
            <div className="loader"></div>
          </div>
        </div>
      ) : (
        <div className="bg-[#CEDDE4]">
          {/* Banner Section */}
          <div
            className="relative h-[40vh] flex justify-center items-center"
            style={{
              backgroundImage: `url(${result?.data?.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-60"></div>

            {/* Content with animation */}
            <div className="relative text-center text-white px-4 flex flex-col justify-center items-center animate-slideIn">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 transform transition-transform duration-500 ease-in-out hover:scale-105">
                Consult {result?.data?.specialtyName}
              </h1>
              <p className="max-w-[500px] text-base sm:text-lg md:text-xl transform transition-transform duration-500 ease-in-out hover:scale-105">
                {result?.data?.sortDescription}
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
                  className="absolute top-3 right-3 text-black text-2xl   focus:outline-none"
                >
                  <RxCross1 />
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
                      value={filters.name}
                      placeholder="Search doctor..."
                      className="p-3 border border-[#00768A] rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#00768A] bg-[#f5f7fa]"
                      onChange={(e) =>
                        handleFilterChange("name", e.target.value)
                      }
                    />
                    <CiSearch className="absolute top-4 right-4 text-xl font-bold text-[#00768A]" />
                  </div>

                  {/* Filters */}
                  <div className="flex flex-col gap-3">
                    {/* Rating */}
                    <div>
                      <p className="font-semibold">Rating</p>
                      <select
                        value={filters.rating}
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
                        value={filters.visitingMode}
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
                              value={filters.gender}
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
                          handleFilterChange("categoryID", e.target.value)
                        }
                      >
                        <option value="">All</option>
                        {result?.categoryList?.map((specialist, index) => (
                          <option key={index} value={specialist?._id}>
                            {specialist?.specialtyName}
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
            <div className="hidden md:flex flex-col gap-5    sm:w-[100%] md:w-[100%] max-w-[350px]  h-max rounded-xl shadow-md bg-white py-6 px-6 sticky top-0  ">
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
                      handleFilterChange("categoryID", e.target.value)
                    }
                  >
                    <option value="">All</option>
                    {result?.categoryList?.map((specialist, index) => (
                      <option key={index} value={specialist?._id}>
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
            {/* Doctor Profile Section */}
            <DoctorCard doctorData={DoctorsData} />
          </div>

          {/* Long Description */}
          <div className="mt-8 bg-gray-50 p-16">
            <div
              className="text-justify w-4/5 mx-auto font-serif text-gray-800"
              dangerouslySetInnerHTML={{ __html: result?.data.longDescription }}
            ></div>
          </div>

          {/* FAQ */}
          <Faq result={result?.data} />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default CategoriesDetails;
