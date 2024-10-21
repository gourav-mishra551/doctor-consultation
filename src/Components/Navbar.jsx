import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiSearch, FiUser } from "react-icons/fi";
import axios from "axios";
import { RxHamburgerMenu, RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
// import SubNavbar from "../SubNavbar/SubNavbar";
import { BsCart3, BsCartPlus } from "react-icons/bs";
import { gsap } from "gsap";
import "./Navbar.css"; // Import the CSS file
import Image from "../../src/Assests/ametheus.webp";
// import SubNavMobile from "../SubNavbar/SubNavMobile";


const Navbar = () => {
  const cart = useSelector((state) => state.cart);
  const [isOpen, setIsOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [currency, setCurrency] = useState(
    localStorage.getItem("currency") || "INR"
  );
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const searchResultsRef = useRef(null);
  const [showCart, setShowCart] = useState(false);
  const cartRef = useRef(null);
  const location = useLocation();


 



//   useEffect(() => {
//     const currentPath = location.pathname;
//     // Check if the current path is '/cart' or '/checkout'
//     if (currentPath !== '/cart' && currentPath !== '/checkout' && currentPath !== '/blog' && currentPath !== '/contact' && currentPath !== '/blog/:slug' && currentPath !== '/profile' && currentPath !== '/support-center') {
//       if (cart.items.length > 0) {
//         setShowCart(true);
//         animateCartIcon();

//         const timeout = setTimeout(() => {
//           gsap.to(cartRef.current, {
//             opacity: 0,
//             y: 50,
//             duration: 4,
//             ease: 'power2.in',
//             onComplete: () => setShowCart(false),
//           });
//         }, 3000);

//         return () => clearTimeout(timeout);
//       }
//     } else {
//       setShowCart(false);
//     }
//   }, [cart.items.length, location.pathname]);

  const animateCartIcon = () => {
    gsap.fromTo(
      cartRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
    );
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const dropdownOpen = () => {
    setDropdown(!dropdown);
    if (dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5 }
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("Id");
    localStorage.removeItem("User");
    localStorage.removeItem("signupemail");
    localStorage.removeItem("token");
    setIsLogin(false);
    navigate("/");
  };

  useEffect(() => {
    if (
      localStorage.getItem("Id") &&
      localStorage.getItem("user") &&
      localStorage.getItem("token")
    ) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }

    const fetchData = async () => {
      if (query.length > 2) {
        let queries = encodeURIComponent(query)
        try {
          const response = await axios.get(
            `https://api.assetorix.com/ah/api/v1/product/search/?currency=${currency}&search=${queries}`
          );
          const data = response.data.data; // Adjust based on the actual response structure

          if (data.length > 0) {
            setResults(data);
            setShowResults(true);
            setNoResults(false);
            if (searchResultsRef.current) {
              gsap.fromTo(
                searchResultsRef.current,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.5 }
              );
            }
          } else {
            setResults([]);
            setShowResults(false);
            setNoResults(true);
            setTimeout(() => setNoResults(false), 4000); // Hide no results message after 4 seconds
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setResults([]);
        setShowResults(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchData();
    }, 500); // Debounce input to avoid too many API calls

    return () => clearTimeout(timeoutId);
  }, [query, currency]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      navigate(`/all-product?search=${query}`);
    }
  };

  const handleProductClick = (slug) => {
    navigate(`/product/${slug}`);
  };

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    setCurrency(newCurrency);
    localStorage.setItem("currency", newCurrency);

    // Dispatch a custom event to notify other parts of the application
    const event = new Event("currencyChange");
    window.dispatchEvent(event);

  };

  return (
    <nav className="text-black sticky -top-2 z-50 bg-white ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-row items-center justify-between h-16">
          <Link to="/" className="text-xl flex justify-start font-bold">
            <img className="h-14 w-30" src={Image} alt="ametheus health logo" />
          </Link>
          <div className="relative flex-grow mx-4 sm:block hidden">
            <div className="relative">
              <input
                type="text"
                className="border rounded-full px-4 pl-10 py-2 w-[25vw]"
                placeholder="Find your medicine here"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <FiSearch
                className="absolute left-3 top-3 text-gray-500"
                size={20}
              />
            </div>
            {noResults && (
              <div
                ref={searchResultsRef}
                className="absolute mt-2 sm:w-full w-[80vw] sm:left-0 left-[20px] border rounded-lg shadow-lg p-4 bg-white max-h-64 overflow-y-auto z-10"
              >
                <div
                  className="product-item flex items-center space-x-4 mb-2 cursor-pointer"
                >
                  <span className="text-sm text-red-600">No Product Found</span>
                </div>
              </div>
            )}
            {showResults && (
              <div
                ref={searchResultsRef}
                className="absolute mt-2 sm:w-full w-[80vw] sm:left-0 left-[-100px] border rounded-lg shadow-lg p-4 bg-white max-h-64 overflow-y-auto z-10"
              >
                {results.map((product) => (
                  <div
                    key={product?._id}
                    className="product-item flex items-center space-x-4 mb-2 cursor-pointer"
                    onClick={() => handleProductClick(product?.slug)}
                  >
                    {
                      Array.isArray(product?.images) && product.images.length > 0 ? <img
                        src={product?.images[0]?.url || "./default.jpg"}
                        alt={product?.images[0]?.alt || product?.title}
                        className="w-12 h-12 object-cover rounded"
                      /> : <img
                        loading="lazy"
                        className="w-12 h-12 object-cover rounded"
                        src="/default.jpg"
                        alt="default alt text"
                      />
                    }

                    <span className="text-sm">{product?.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <select
              className="w-max border sm:p-2 p-1 leading-0 rounded-md text-black sm:text-[16px] text-sm"
              name="country"
              id="country"
              defaultValue={localStorage.getItem("currency")}
              onChange={handleCurrencyChange}
            >
              <option value="INR">₹ INR</option>
              <option value="USD">$ USD</option>
              <option value="NPR">रु NPR</option>
              <option value="BDT"> ৳ BDT</option>
              <option value="EUR">€ EUR</option>
              <option value="GBP">£ GBP</option>
              <option value="AED">د.إ. AED</option>
            </select>
          </div>
          <div className="hidden md:flex space-x-4">
            <Link
              to="/"
              className="hover:bg-[#00768a] hover:bg-opacity-10 px-3 py-2 rounded-md ml-4"
            >
              Home
            </Link>
            {/* <Link
              to="/special-offer"
              className="hover:bg-[#00768a] hover:bg-opacity-10 px-3 py-2 rounded-md"
            >
              Special Offer
            </Link> */}
            <div
              className="hover:cursor-pointer px-3 py-2 rounded-md text-2xl relative"
              onClick={dropdownOpen}
            >
              <FiUser />
              <div
                ref={dropdownRef}
                className={`absolute bg-white rounded-xl shadow-lg p-4 z-50 flex -left-[6rem] flex-col w-[20vw] h-max ${dropdown ? "block" : "hidden"
                  }`}
              >
                {isLogin ? (
                  <div className="flex flex-col justify-between">
                    <div className="border rounded-lg ">
                      <p className="text-semibold text-gray-400 text-[16px] capitalize text-center ">
                     Welcome {localStorage.getItem("user")}
                      </p>
                    </div>
                    <div>
                      <Link to="/profile">
                        <h4 className="sm:text-[16px] text-[14px] my-1">
                          Profile
                        </h4>
                      </Link>
                      <Link to="/profile">
                        <h4 className="sm:text-[16px] text-[14px] my-1">
                          Your Order
                        </h4>
                      </Link>
                      <Link to="/support-center">
                        <h4 className="sm:text-[16px] text-[14px] my-1">
                          Report a problem
                        </h4>
                      </Link>

                      <Link to='/contact'>
                        <h4 className="sm:text-[16px] text-[14px] my-1">
                          Bulk Buy
                        </h4>
                      </Link>

                    </div>
                    <div className="float-end ">
                      <button
                        className="text-lg font-semibold text-gray-600 rounded-md border w-full   text-center mx-auto"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <h4
                      className="sm:text-[16px] text-[14px] my-1 cursor-pointer"
                      onClick={() => navigate("/auth")}
                    >
                     
                      Login
                   
                    </h4>
                    
                    <Link to="/support-center">
                      <h4 className="sm:text-[16px] text-[14px] my-1">
                        Report a problem
                      </h4>
                    </Link>
                   
                  </div>
                )}
              </div>
            </div>
            {/* <Link
              to="/cart"
              className="hover:bg-[#00768a] hover:bg-opacity-10 px-3 py-2 rounded-md relative"
            >
              <BsCart3 size={25} className="relative" />
              {cart.items.length > 0 && (
                <div className="absolute top-0 right-0 bg-gray-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.items.length}
                </div>
              )}
            </Link> */}
          </div>
          <div className="flex md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black p-2 rounded-md focus:outline-none"
            >
              {isOpen ? <RxCross1 size={24} /> : <RxHamburgerMenu size={24} />}
            </button>
          </div>
        </div>
      </div>
      {/* <div className="sm:block hidden shadow-md">
        <SubNavbar />
      </div> */}
      {isOpen && (

        <div className="md:hidden bg-[#47A9B3] text-white  h-max md:h-max md:pb-0 pb-32 overflow-y-auto">
          <div className="px-2 pt-2  space-y-1 sm:px-3">
            <div className="flex  justify-between relative">
              <Link
                to="/"
                className="block px-3 py-1  rounded-md  font-bold  uppercase text-[13px] hover:text-white"
              >
                Home
              </Link>
              <Link
                to="/cart"
                className="block px-3 py-3 bg-[#D36B79] rounded-full   font-bold  absolute right-0  uppercase  text-[23px] hover:text-white"
              >
                <BsCart3 />
              </Link>
            </div>

            {/* <Link
              to="/special-offer"
              className="block px-3 py-1 rounded-md  font-bold   uppercase text-[13px] hover:text-white"
            >
              Special Offer
            </Link> */}
            <Link
              to="/profile"
              className="block px-3 py-1 rounded-md  font-bold   uppercase text-[13px]  hover:text-white"
            >
              Profile
            </Link>
            <div>
              <Link
                to="/kn95-respirator"
                className="block px-3 py-1 rounded-md  font-bold   uppercase text-[13px]  hover:text-white"
              >
                KN95 Mask
              </Link>
              <Link
                to="/3-ply-face-mask"
                className="block px-3 py-1 rounded-md  font-bold   uppercase text-[13px]  hover:text-white"
              >
                3 Ply face mask
              </Link>
            </div>

          </div>
          {/* <SubNavMobile /> */}
        </div>

      )}


      <div className={isOpen ? "hidden" : "relative flex-grow px-5 py-3 block sm:hidden bg-gray-100"} >
        <div className="relative">
          <input
            type="text"
            className="border rounded-full px-4 pl-10 py-2 w-full"
            placeholder="Find your medicine here"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <FiSearch
            className="absolute left-3 top-3 text-gray-500"
            size={20}
          />
        </div>
        {noResults && (
          <div
            ref={searchResultsRef}
            className="absolute mt-2 sm:w-full w-[80vw] sm:left-0 left-[20px] border rounded-lg shadow-lg p-4 bg-white max-h-64 overflow-y-auto z-10"
          >
            <div
              className="product-item flex items-center space-x-4 mb-2 cursor-pointer"
            >
              <span className="text-sm text-red-600">No Product Found</span>
            </div>
          </div>
        )}
        {showResults && (
          <div
            ref={searchResultsRef}
            className="absolute mt-2 sm:w-full w-[80vw] sm:left-0 left-[20px] border rounded-lg shadow-lg p-4 bg-white max-h-64 overflow-y-auto z-10"
          >
            {results.map((product) => (
              <div
                key={product?._id}
                className="product-item flex items-center space-x-4 mb-2 cursor-pointer"
                onClick={() => handleProductClick(product?.slug)}
              >
                <img
                  src={product?.images[0]?.url || ""}
                  alt={product?.images[0]?.alt}
                  className="w-12 h-12 object-cover rounded"
                />
                <span className="text-sm">{product?.title}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="sm:w-[95%] w-auto  block fixed sm:bottom-[-20px] bottom-[-15px] sm:left-0 left-[-15px] right-0 mb-4 mx-auto ">
        {showCart && (
          <div
            ref={cartRef}
            className="bg-[#1495AB]  rounded-[10px] text-white sm:px-5 px-10 py-3  flex items-center justify-between"
          >
            <span>{cart.items.length} item(s) in your cart</span>
            <Link to="/cart">
              <button className="ml-2 bg-[#11B28E] text-white px-3 sm:py-2 py-1 sm:text-[14px] text-sm rounded">
                View Cart
              </button>
            </Link>
          </div>
        )}
      </div>
      
    </nav>
  );
};

export default Navbar;
