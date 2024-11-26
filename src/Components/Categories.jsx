import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";
import { FaChevronRight } from "react-icons/fa6";

const Categories = () => {
  const [result, setResult] = useState([]); // State for the categories
  const [hasMore, setHasMore] = useState(true); // State to manage whether to show the 'View More' button
  const [loading, setLoading] = useState(false); // State to manage the loading state
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(100);
  useEffect(() => {
    fetchCategories();
    window.scroll(0, 0);
  }, []);

  // Function to fetch categories (initial fetch or when "View More" is clicked)
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/Category?limit=${totalCount}`
      ); // Fetching all the categories (100 in this case, you can adjust the limit)
      setResult(res.data.data);
      setTotalCount(res.data.totalCount);
      setHasMore(false); // Once all data is loaded, hide the "View More" button
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to load more categories
  const loadMore = () => {
    fetchCategories();
  };
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[20px] sm:mt-[40px] mb-8">
        <div className="flex flex-col sm:flex-row gap-3 justify-between max-w-5xl mx-auto mb-8">
          <p className="sm:text-4xl text-2xl font-bold tracking-wider sm:text-start text-center capitalize text-[#1c8e81]">
            Top Specialties
          </p>
        </div>

        <div className="flex justify-center items-center w-full border-collapse">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-8 justify-center">
            {result.map((item) => (
              <div
                key={item._id}
                className="categories cursor-pointer sm:grid sm:grid-cols-4 md:grid-cols-2  grid-cols-1 justify-start items-center"
                onClick={() =>
                  navigate(`/categories-details/${item._id}`, {
                    state: { title: item.title },
                  })
                }
              >
                <div className="cardio h-[170px] w-auto sm:h-[200px] sm:w-[260px] flex flex-col justify-between items-center bg-[#e4f8f6] rounded-3xl hover:bg-white hover:border-2 hover:border-[#1c8e81] transition-transform duration-300 transform hover:-translate-y-2 shadow-lg mt-[30px]">
                  {/* Image Container */}
                  <div className="bg-white -translate-y-10 h-[90px] w-[90px] sm:h-[100px] sm:w-[100px] flex justify-center items-center rounded-full shadow-lg ">
                    <div className="cardio-logo  h-[80px] w-[80px] sm:h-[90px] sm:w-[90px] rounded-full bg-gray-200 flex justify-center items-center">
                      <img
                        src={item.image}
                        className="w-[50px] sm:w-[60px]"
                        alt={item.specialtyName}
                      />
                    </div>
                  </div>

                  {/* Title and Description */}
                  <div className="flex flex-col -translate-y-8 items-center p-2 space-y-2 sm:absolute mb-[50px] top-[50px] sm:top-[100px]">
                    <p className="font-semibold text-md sm:text-xl text-center text-gray-800">
                      {item.specialtyName}
                    </p>
                    <p className="px-2 sm:px-5 text-sm sm:text-md text-gray-600 text-center font-medium">
                      {item.sortDescription.substring(0, 25) + "..."}
                    </p>

                    
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show View More button if there is more data to load */}
        {/* {hasMore && !loading && (
          <div className="text-center my-6">
            <button
              onClick={loadMore}
              className="bg-[#1c8e81] text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-400 transition ease-in-out duration-300"
            >
              {loading ? "Loading..." : "View More"}
            </button>
          </div>
        )} */}

        {loading && (
           <div className="flex justify-center items-center min-h-screen">
           <div className="loader"></div>
         </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
