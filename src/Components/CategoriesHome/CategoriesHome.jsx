import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

function CategoryCard({ item, navigate }) {
  return (
    <div
      key={item._id}
      className="categories cursor-pointer flex-col justify-center items-center"
      onClick={() =>
        navigate(`/CategoriesDetails/${item._id}`, {
          state: { title: item.title },
        })
      }
    >
      <div className="cardio h-[300px] flex flex-col justify-center items-center bg-[#e4f8f6] rounded-3xl hover:bg-white hover:border-2 hover:border-[#1c8e81] transition-transform duration-300 transform hover:-translate-y-2 shadow-lg">
        <div className="bg-white h-[110px] w-[110px] flex justify-center items-center rounded-full shadow-lg translate-y-[-64px]">
          <div className="cardio-logo md:h-[100px] md:w-[100px] rounded-full bg-gray-200 flex justify-center items-center">
            <img
              src={item.image}
              className="w-[65px]"
              alt={item.specialtyName}
            />
          </div>
        </div>
        <div className="translate-y-[-24px]">
          <p className="font-bold text-xl text-center text-gray-800">
            {item.specialtyName}
          </p>
        </div>
        <div className="p-2">
          <p className="px-2 sm:px-5 text-md text-gray-600 text-center font-medium">
            {item.sortDescription.split(" ").slice(0, 9).join(" ") + "..."}
          </p>
        </div>
      </div>
    </div>
  );
}

function CategoriesHome() {
  const [categories, setCategories] = useState([]);
  const [totalCount, setTotalCount] = useState(8);
  const navigate = useNavigate();

  // Adjust category count based on screen size
  const updateScreenSize = () => {
    const width = window.innerWidth;
    setTotalCount(width <= 640 ? 4 : width <= 1024 ? 6 : 8);
  };

  useEffect(() => {
    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `https://api.assetorix.com/ah/api/v1/dc/user/Category?limit=${totalCount}`
        );
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [totalCount]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
      <div className="flex flex-row sm:flex-row gap-3 justify-between items-center max-w-5xl mx-auto mb-8">
        <p className="sm:text-4xl text-2xl font-bold tracking-wide text-center sm:text-start capitalize text-[#1c8e81]">
          Top Specialties
        </p>
        <NavLink to="/categories">
          <button
            className="sm:w-[250px] w-[150px] sm:h-[60px] h-[50px] md:text-lg text-xs rounded-lg bg-[#1c8e81] text-white font-semibold hover:scale-105 transition-transform duration-300"
            aria-label="View All Services"
          >
            View All Services
          </button>
        </NavLink>
      </div>

      <div className="flex justify-center items-center w-full">
        {categories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {categories.map((item) => (
              <CategoryCard key={item._id} item={item} navigate={navigate} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 font-medium">
            No categories available.
          </p>
        )}
      </div>
    </div>
  );
}

export default CategoriesHome;
