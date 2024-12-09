import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import axios from "axios";
import DoctorCard from "./DoctorCard/DoctorCard";
import { RxCross1 } from "react-icons/rx";
const DoctorsProfile = () => {
  const [DoctorData, setDoctorData] = useState([]);
  const [Price, setPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState([])
  const [filters, setFilters] = useState({
    categoryID: "",
    name: "",
    gender: "",
    rating: "",
    visitingMode: "",
  });
  // const currency=localStorage.getItem("currency")



  // Function to fetch categories (initial fetch or when "View More" is clicked)
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/Category`
      ); // Fetching all the categories (100 in this case, you can adjust the limit)
      setResult(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCategories();
    FetchDrProfile();
  }, []);

  useEffect(()=>{
     window.addEventListener('currencyChange' , FetchDrProfile)
      return (()=>{
        window.removeEventListener('currencyChange' , FetchDrProfile)
      })
  }, [])

 
  const FetchDrProfile = async () => {
    setIsLoading(true);
  
    const currency = localStorage.getItem("currency") || "INR"; // Fetch the currency from localStorage
    const endpoint = `https://api.assetorix.com/ah/api/v1/dc/user/doctors?currency=${currency}`; // Add currency as a query parameter
  
    try {
      const res = await axios.get(endpoint);
      console.log(res);
      
      setDoctorData(res.data.data);
    } catch (error) {
      console.error("Error fetching doctor profile:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const [showFilter, setShowFilter] = useState(false);
  const CheckLowestPrice = (DoctorData) => {
    if (!DoctorData || DoctorData.length === 0) {
      console.error("DoctorData is empty or invalid.");
      setIsLoading(false);
      return null;
    }

    // Get visiting mode and slots for both offline and online
    const visitingMode = DoctorData[0]?.doctorAvailability?.map(
      (availability) => availability.visitingMode
    );

    // const offlineSlots =DoctorData[0]?.doctorAvailability[0]?.offlineSlots ?? [];
    const offlineSlots =
      DoctorData[0]?.doctorAvailability
        ?.map((avail) => avail?.offlineSlots)
        .flat() ?? [];
    const onlineSlots =
      DoctorData[0]?.doctorAvailability
        ?.map((avail) => avail?.onlineSlots)
        .flat() ?? [];
    // const onlineSlots = DoctorData[0]?.doctorAvailability[0]?.onlineSlots ?? [];

   

    // Extract doctor charges
    const offlineCharge = offlineSlots
      .map((drCharge) => drCharge?.doctorCharge)
      .filter((charge) => charge != null);
    const onlineCharge = onlineSlots
      .map((drCharge) => drCharge?.doctorCharge)
      .filter((charge) => charge != null);

 

    // Initialize price variable
    let price = null;

    if (visitingMode && visitingMode.includes("both")) {
      // If visitingMode is "both", compare both offline and online charges
      if (offlineCharge.length > 0 && onlineCharge.length > 0) {
        price = Math.min(Math.min(...offlineCharge), Math.min(...onlineCharge));
      } else if (offlineCharge.length > 0) {
        price = Math.min(...offlineCharge);
      } else if (onlineCharge.length > 0) {
        price = Math.min(...onlineCharge);
      }
    } else if (visitingMode && visitingMode.includes("online")) {
      // If visitingMode is "online", return the minimum of online charges
      if (onlineCharge.length > 0) {
        price = Math.min(...onlineCharge);
      }
    } else if (visitingMode && visitingMode.includes("offline")) {
      // If visitingMode is "offline", return the minimum of offline charges
      if (offlineCharge.length > 0) {
        price = Math.min(...offlineCharge);
      }
    }

    setPrice(price); // Update state with the lowest price
    setIsLoading(false); // Set loading to false when done
    return price;
  };

  // Effect for logging Price updates
  useEffect(() => {
   
  }, [Price]);

  // Effect to run CheckLowestPrice once DoctorData is available
  useEffect(() => {
    if (DoctorData && DoctorData.length > 0 && isLoading) {
      CheckLowestPrice(DoctorData); // Only call if DoctorData is available and loading
    }
  }, [DoctorData, isLoading]); // Dependency on DoctorData and isLoading

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
    )
  }

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
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors?${query}`
      );
      setDoctorData(res.data.data);
    } catch (error) {
      console.error("Error fetching filtered data", error);
    }
    setShowFilter(false);
  };

  return (
    <div className="bg-[#CEDDE4] pb-9">
      {
        isLoading ? (
          <div>
            <div className="flex justify-center items-center min-h-screen">
              <div className="loader"></div>
            </div>
          </div>
        ) : (
          <div >
            <div
              className="h-[300px] lg:h-[400px] bg-cover bg-no-repeat flex flex-col justify-center items-center relative"
              style={{
                backgroundImage: "url('https://wallpapercave.com/wp/wp2968489.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50"></div>

              {/* Content */}
              <div className="relative text-center text-white p-4 max-w-[600px]">
                <h1 className="font-bold text-3xl lg:text-4xl tracking-wide mb-2 text-[#a4f1ff]">Our Expert Doctors</h1>
                <div className="h-[2px] w-[80px] mx-auto bg-white mb-4"></div>
                <p className=" text-lg lg:text-xl font-semibold">
                  At the forefront of healthcare innovation, our dedicated team of doctors is committed to delivering personalized, top-quality care.
                </p>
               
              </div>
            </div>


            <div className="bg-[#CEDDE4]">
              <div className="max-w-[1200px] justify-between mx-auto pt-10 flex flex-col-reverse md:flex-row gap-10 bg-[#CEDDE4] ">
                {/* filter section */}
                <div className="hidden md:flex flex-col gap-5 md:w-[40%] w-[40%] sm:w-[25%] h-max rounded-xl shadow-md bg-white py-6 px-6 sticky top-0 ">
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
                          handleFilterChange("categoryID", e.target.value)
                        }
                      >
                        <option value="">All</option>
                        {result?.map((specialist, index) => (
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

                <div className="w-[auto] sm:w-[85%] flex flex-col gap-10">
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
                          className="absolute top-3 right-3 text-black text-2xl "
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
                                {result.map((specialist, index) => (
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

                  <div className="flex w-[100%] flex-wrap gap-8 md:gap-10">
                    <DoctorCard doctorData={DoctorData} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>

  );
};

export default DoctorsProfile;
