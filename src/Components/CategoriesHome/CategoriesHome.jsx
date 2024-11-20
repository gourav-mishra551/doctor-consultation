import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function CategoriesHome() {
  const [result, setResult] = useState([]); // State for storing categories
  const [totalCount, setTotalCount] = useState(8); // State for tracking how many categories to fetch
  const navigate = useNavigate();

  // Detect window width and adjust the number of items to fetch
  const updateScreenSize = () => {
    const width = window.innerWidth;
    if (width <= 640) {
      // Small screen (mobile)
      setTotalCount(4); // Show 4 items
    } else if (width <= 1024) {
      // Tablet screen
      setTotalCount(6); // Show 6 items
    } else {
      setTotalCount(8); // Show 8 items for larger screens (desktop)
    }
  };

  // Fetch categories when the component mounts or the totalCount changes
  useEffect(() => {
    updateScreenSize(); // Initial check for screen size
    FetchCategory(); // Fetch categories based on screen size

    // Add event listener for resizing the window
    window.addEventListener("resize", updateScreenSize);
    return () => window.removeEventListener("resize", updateScreenSize); // Cleanup on unmount
  }, [totalCount]); // Re-fetch when totalCount changes

  // Function to fetch categories
  const FetchCategory = async () => {
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/Category?limit=${totalCount}`
      );
      setResult(res.data.data); // Set the fetched categories
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[400px] sm:mt-[40px]">
      <div className="flex flex-col sm:flex-row gap-3 justify-between max-w-5xl mx-auto mb-8">
        <p className="sm:text-4xl text-2xl font-bold tracking-wider sm:text-start text-center capitalize text-[#1c8e81]">
          Top Specialties
        </p>
        <div className="flex justify-center items-center">
          <NavLink to="/categories">
            <button className="sm:w-[250px] w-[150px] sm:h-[60px] h-[50px] rounded-lg bg-[#1c8e81] text-white font-semibold hover:scale-105 transition ease-in-out duration-300">
              View All Services
            </button>
          </NavLink>
        </div>
      </div>

      <div className="flex justify-center items-center w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 justify-center">
          {result.map((item) => (
            <div
              key={item._id}
              className="categories sm:ml-auto mt-[30px] cursor-pointer sm:w-full w-[250px] flex-col justify-center items-center"
              onClick={() =>
                navigate(`/CategoriesDetails/${item._id}`, {
                  state: { title: item.title },
                })
              }
            >
              <div className="cardio h-[300px] flex flex-col justify-center items-center bg-[#e4f8f6] rounded-3xl hover:bg-white hover:border-2 hover:border-[#1c8e81] transition-all ease-in-out duration-300 hover:-translate-y-2">
                <div className="bg-white h-[110px] w-[110px] flex justify-center items-center rounded-full shadow translate-y-[-64px]">
                  <div className="cardio-logo h-[100px] w-[100px] rounded-full bg-gray-200 flex justify-center items-center">
                    <img
                      src={item.image}
                      className="w-[65px]"
                      alt={item.specialtyName}
                    />
                  </div>
                </div>
                <div className="translate-y-[-24px]">
                  <p className="font-bold text-xl text-center">
                    {item.specialtyName}
                  </p>
                </div>
                <div className="p-4">
                  <p className="px-2 sm:px-5 text-md text-start font-semibold">
                    {item.sortDescription
                      .split(" ") // Split the description into words
                      .slice(0, 9) // Take the first 25 words
                      .join(" ") + // Join them back into a string
                      (item.sortDescription.split(" ").length > 10
                        ? "..."
                        : "")}{" "}
                    {/* Add ellipsis if there are more words */}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoriesHome;
