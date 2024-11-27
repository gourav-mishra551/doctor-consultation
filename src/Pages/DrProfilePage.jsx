import React, { useState, useEffect, CSSProperties } from "react"; // Importing CSSProperties
import DoctorsProfile from "../Components/DoctorsProfile";
import Footer from "../Components/Footer";
import { ClipLoader } from "react-spinners";
import { img } from "framer-motion/m";



const DrProfilePage = () => {

  useEffect(()=>{
    window.scroll(0,0)
  })

  return (
    <div>
          <DoctorsProfile />
          <div>
            <Footer />
          </div>
     
    </div>
  );
};

export default DrProfilePage;
