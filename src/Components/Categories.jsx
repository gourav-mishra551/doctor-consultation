import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "./Footer";

const Categories = () => {
  const [result, setResult] = useState([]); // State for the categories
  const [hasMore, setHasMore] = useState(true); // State to manage whether to show the 'View More' button
  const [loading, setLoading] = useState(false); // State to manage the loading state
  const navigate = useNavigate();
  const [totalCount, setTotalCount] = useState(100)
  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch categories (initial fetch or when "View More" is clicked)
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/Category?limit=${totalCount}`
      ); // Fetching all the categories (100 in this case, you can adjust the limit)
      setResult(res.data.data);
      setTotalCount(res.data.totalCount)
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[320px] sm:mt-[40px] mb-8">
        <div className="flex flex-col sm:flex-row gap-3 justify-between max-w-5xl mx-auto mb-8">
          <p className="sm:text-4xl text-2xl font-bold tracking-wider sm:text-start text-center capitalize text-[#1c8e81]">
            Top Specialties
          </p>

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
                    <p className="px-2 sm:px-5 text-md text-center font-semibold">
                      {item.sortDescription}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Show View More button if there is more data to load */}
        {hasMore && !loading && (
          <div className="text-center my-6">
            <button
              onClick={loadMore}
              className="bg-[#1c8e81] text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-400 transition ease-in-out duration-300"
            >
              {loading ? "Loading..." : "View More"}
            </button>
          </div>
        )}

        {loading && <div className="spinner">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
        }
      </div>
      <Footer />
    </div>
  );
};

export default Categories;
