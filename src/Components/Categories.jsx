import React, { useEffect, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const Categories = () => {
  const [result, setResult] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const navigate = useNavigate();

  const fetchData = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/Category`,
        {
          params: { page, limit: 10 }, // Assuming 10 items per page from backend
        }
      );
      const newData = res.data.data;

      // Filter out duplicates
      setResult((prevResult) => {
        const uniqueData = newData.filter(
          (item) => !prevResult.some((prevItem) => prevItem._id === item._id)
        );
        return [...prevResult, ...uniqueData];
      });

      setHasMore(newData.length > 0); // Stop if no new data is returned
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  }, [page, hasMore, loading]);

  useEffect(() => {
    fetchData();
  }, [fetchData, page]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !loading
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-[320px] sm:mt-[40px]">
      <div className="flex flex-col sm:flex-row gap-3 justify-between max-w-5xl mx-auto mb-8 ">
        <p className="sm:text-4xl text-2xl font-bold tracking-wider sm:text-start text-center capitalize text-[#1c8e81]">
          Top Specialties
        </p>
        <div className="flex justify-center items-center">
          <NavLink to="/categories">
            <button className="sm:w-[250px] w-[150px] sm:h-[60px] h-[50px] rounded-lg bg-[#1c8e81] text-white font-semibold hover:bg-green-400 transition ease-in-out duration-300">
              View All Services
            </button>
          </NavLink>
        </div>
      </div>

      <div
        className="flex justify-center items-center w-full"
        
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
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

      {error && <p className="text-center text-red-500">{error}</p>}
    </div>
  );
};

export default Categories;
