import React, { useState, useEffect, CSSProperties } from "react"; // Importing CSSProperties
import DoctorsProfile from "../Components/DoctorsProfile";
import Footer from "../Components/Footer";
import { ClipLoader } from "react-spinners";
import { img } from "framer-motion/m";



const DrProfilePage = () => {
  const [isLoading, setIsLoading] = useState(true);
  

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts

    // Simulate data fetching or component loading with a timer
    const timer = setTimeout(() => {
      setIsLoading(false); // Stop loading after 2 seconds (adjust if necessary)
    }, 500);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []); // The empty dependency array ensures the effect runs only once when the component mounts

  return (
    <div>
      {isLoading ? (
        // Loader content
       <div className="flex justify-center  min-h-screen">
         <img src="src/Assests/Spinner@1x-0.5s-200px-200px.svg"  alt="Loading..."/>
       </div>
       
      ) : (
        // Main content
        <>
          <DoctorsProfile />
          <div className="mt-20">
            <Footer />
          </div>
        </>
      )}
    </div>
  );
};

export default DrProfilePage;
