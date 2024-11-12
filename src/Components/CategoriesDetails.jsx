import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link, useLocation, useParams } from "react-router-dom";
import { FiDollarSign } from "react-icons/fi";
import { FaComment, FaLocationArrow, FaRegThumbsUp } from "react-icons/fa";
import { IoMdStar } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import TopHeader from "./TopHeader";
import Faq from "./Faq";

function CategoriesDetails() {
  const location = useLocation();
  const [showFilter, setShowFilter] = useState(false);
  const { title } = location.state || {};
  const [result, setResult] = useState({});
  const [DoctorsData, setDoctersData] = useState([]);
  const { id } = useParams();
  const [minPrice, setMinPrice] = useState(null);

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
    } catch (error) {}
  };

  const calculateMinPrice = (doctors) => {
    let minPrice = Infinity;

    doctors.forEach((doctor) => {
      // Check if doctor.slots exists
      if (doctor.slots) {
        // Check online slots if the visiting mode allows it
        if (
          doctor.slots.visitingMode === "online" ||
          doctor.slots.visitingMode === "both"
        ) {
          const availableOnlineSlots = doctor.slots.onlineSlots?.filter(
            (slot) =>
              !slot.isBooked &&
              typeof slot.doctorCharge === "number" &&
              !isNaN(slot.doctorCharge)
          );

          if (availableOnlineSlots?.length > 0) {
            minPrice = Math.min(
              minPrice,
              ...availableOnlineSlots.map((slot) => slot.doctorCharge)
            );
          }
        }

        // Check offline slots if the visiting mode allows it
        if (
          doctor.slots.visitingMode === "offline" ||
          doctor.slots.visitingMode === "both"
        ) {
          const availableOfflineSlots = doctor.slots.offlineSlots?.filter(
            (slot) =>
              !slot.isBooked &&
              typeof slot.doctorCharge === "number" &&
              !isNaN(slot.doctorCharge)
          );

          if (availableOfflineSlots?.length > 0) {
            minPrice = Math.min(
              minPrice,
              ...availableOfflineSlots.map((slot) => slot.doctorCharge)
            );
          }
        }
      }
    });

    // If no valid price is found, return null
    return minPrice === Infinity ? null : minPrice;
  };

  useEffect(() => {
    if (result?.doctors && result.doctors.length > 0) {
      const calculatedMinPrice = calculateMinPrice(result.doctors);
      console.log("Calculated Min Price:", calculatedMinPrice); // Check the calculated minPrice
      setMinPrice(calculatedMinPrice); // Store the minPrice in state
    } else {
      console.log("No doctors available or result is not yet populated.");
    }
  }, [result.doctors]);

  const FetchDoctersData = async () => {
    try {
      const res = await axios.get(
        "https://api.assetorix.com/ah/api/v1/dc/user/doctors"
      );
      setDoctersData(res.data.data);
    } catch (error) {}
    console.log(DoctorsData);
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
      <div className="max-w-7xl mx-auto mt-10 flex flex-col-reverse md:flex-row gap-10 bg-[#CEDDE4] p-5">
        {/* Filter Section (Desktop Only) */}
        <div className="hidden md:flex filter-section flex-col gap-3 w-[25%] h-[870px] rounded-xl shadow-md bg-[#fff] p-5 sticky top-0">
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
        <div className="w-full md:w-[75%] flex flex-wrap gap-10">
          {result?.doctors?.map((doctor, index) => (
            <div
              key={index}
              className="dr-profile-section w-full sm:w-[48%] md:w-full bg-white p-8 flex flex-col md:flex-row justify-between rounded-lg shadow-lg"
              style={{ border: "1px solid #e1e1e1" }}
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Profile Image */}
                <div className="img bg-[#f3f3f3] flex justify-center items-center h-[160px] w-[160px] sm:h-[160px] sm:w-[160px] rounded-full border-2 border-[#00768A] mx-auto sm:mx-0">
                  <img
                    src="/image.png"
                    alt="dr-image"
                    className="h-[150px] w-[150px] sm:h-[150px] sm:w-[150px] rounded-full object-cover"
                  />
                </div>

                {/* Doctor Info */}
                <div className="dr-profilee text-[#333333] text-center sm:text-left">
                  <p className="text-[#00768A] text-2xl font-bold">
                    {doctor.name}
                  </p>
                  <div className="flex gap-4 flex-wrap mt-2 justify-center sm:justify-start">
                    {doctor.services_offered.map((service, idx) => (
                      <div key={idx} className="bg-[#f0f9f9] p-2 rounded-lg">
                        <p className="text-[#00768A] font-semibold">
                          {service}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Experience */}
                  <p className="text-lg font-semibold text-orange-600 mt-2">
                    Experience: {doctor.experience} years
                  </p>

                  {/* Skills */}
                  {doctor?.years_of_experience?.map((experience, index) => (
                    <div
                      className="flex flex-wrap mt-2 justify-center sm:justify-start"
                      key={index}
                    >
                      {experience.skills.map((skill, skillIndex) => (
                        <p
                          key={skillIndex}
                          className="font-bold mr-3 text-sm text-gray-600"
                        >
                          {skill}
                        </p>
                      ))}
                    </div>
                  ))}

                  {/* About Doctor */}
                  <p className="mt-4 text-sm text-gray-600">
                    {doctor.aboutDoctor}
                  </p>
                </div>
              </div>

              {/* Price and Action Buttons */}
              <div className="ratings flex flex-col sm:justify-start sm:items-start justify-center  items-center gap-4 mt-6 md:items-start">
                {/* Ratings */}
                <div className="flex items-center justify-center mt-2">
                  {[...Array(4)].map((_, i) => (
                    <IoMdStar key={i} className="text-yellow-500 text-3xl" />
                  ))}
                  <span className="ml-2 text-gray-500">4.0</span>
                </div>
                {/* Price */}
                <div className="flex gap-2 items-center">
                  Price:
                  <p className="ml-2 mt-1 text-lg font-semibold">
                    {minPrice !== null ? (
                      <span className="text-green-600">{`INR ${minPrice}`}</span>
                    ) : (
                      <span className="text-gray-500">Price not available</span>
                    )}
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 mt-6">
                  <button className="h-[40px] w-[220px] border-2 rounded-lg border-[#00768A] hover:bg-[#00768A] hover:text-white transition-all ease-in-out duration-300">
                    <Link
                      to={`/dr-indi/${doctor.doctorId}`}
                      className="flex justify-center items-center"
                    >
                      VIEW PROFILE
                    </Link>
                  </button>
                  <button className="h-[40px] w-[220px] text-white rounded-lg bg-[#00768A] border-2 border-[#00768A] hover:scale-105">
                    BOOK APPOINTMENT
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
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
    </div>
  );
}

export default CategoriesDetails;
