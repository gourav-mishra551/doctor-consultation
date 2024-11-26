import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaChevronRight } from "react-icons/fa6";
import { NavLink, useNavigate } from "react-router-dom";

function CategoryCard({ item, navigate }) {
  return (
    <div
      key={item._id}
    
      className="categories cursor-pointer sm:grid sm:grid-cols-4 md:grid-cols-3 grid-cols-2 justify-start items-start "
      onClick={() =>
        navigate(`/categories-details/${item._id}`, {
          state: { title: item.title },
        })
      }
    >
      <div className="cardio h-[170px] w-auto sm:h-[200px] sm:w-[260px] flex flex-col justify-between items-center bg-[#e4f8f6] md:rounded-3xl rounded-xl sm:rounded-3xl hover:bg-white hover:border-2 hover:border-[#1c8e81] transition-transform duration-300 transform hover:-translate-y-2 shadow-lg mt-[30px]">
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
        <div className="flex flex-col -translate-y-8 items-center sm:p-2 space-y-2 sm:absolute mb-[50px] top-[50px] sm:top-[100px]">
          <p className="font-semibold text-md sm:text-xl text-center text-gray-800">
            {item.specialtyName}
          </p>
          <p className="px-2 sm:px-5 text-sm sm:text-md text-gray-600 text-center font-medium">
            {item.sortDescription.substring(0, 25) + "..."}
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
  const [isLoading,setIsLoading]=useState(false)
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
      setIsLoading(true)
      try {
        const response = await axios.get(
          `https://api.assetorix.com/ah/api/v1/dc/user/Category?limit=${totalCount}`
        );
        setCategories(response.data.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }finally{
        setIsLoading(false)
      }
    };

    fetchCategories();
  }, [totalCount]);

  if(isLoading){
    return <div className="flex justify-center items-center min-h-screen">
    <div className="loader"></div>
  </div>
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 sm:mt-3 -mt-12">
      <div className="flex flex-row sm:flex-row gap-3 justify-between items-center max-w-5xl mx-auto mb-8">
        <p className="sm:text-4xl text-2xl font-bold tracking-wide text-center sm:text-start capitalize text-[#1c8e81]">
          Top Specialties
        </p>
        <NavLink to="/categories" className="hidden sm:block md:block">
          <button
            className="sm:w-[250px] w-[150px] sm:h-[60px] h-[50px] md:text-lg text-xs rounded-lg bg-[#1c8e81] text-white font-semibold hover:scale-105 transition-transform duration-300"
            aria-label="View All Services"
          >
            View All Services
          </button>
        </NavLink>
      </div>

      <div className="flex justify-center items-center w-full mt-[80px]">
        {categories.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 w-[100%]  md:px-8 lg:px-16">
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

      <div>
        <NavLink
          to="/categories"
          className="sm:hidden mt-[45px] md:hidden flex justify-center items-center"
        >
          <button
            className="sm:w-[250px] w-[150px] sm:h-[60px] h-[50px] md:text-lg text-xs rounded-lg bg-[#1c8e81] text-white font-semibold hover:scale-105 transition-transform duration-300"
            aria-label="View All Services"
          >
            View More
          </button>
        </NavLink>
      </div>
    </div>
  );
}

export default CategoriesHome;
