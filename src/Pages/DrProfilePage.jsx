import React, { useEffect } from "react";
import DoctorsProfile from "../Components/DoctorsProfile";
import Footer from "../Components/Footer";

const DrProfilePage = () => {
  useEffect(()=>{
    window.scrollTo(0, 0);
  },[])
  return (
    <div>
      <DoctorsProfile />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default DrProfilePage;
