import React, { useEffect } from "react";
import TopHeader from "../Components/TopHeader";
import Navbar from "../Components/Navbar";
import DoctorsProfile from "../Components/DoctorsProfile";
import Footer from "../Components/Footer";

const DrProfilePage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <div>
      {/* <TopHeader />
      <Navbar /> */}
      <DoctorsProfile />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default DrProfilePage;
