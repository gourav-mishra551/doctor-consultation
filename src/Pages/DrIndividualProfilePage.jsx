import React from "react";
import TopHeader from "../Components/TopHeader";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import DrIndividualProfile from "../Components/DrIndividualProfile";

const DrIndividualProfilePage = () => {
  return (
    <div>
      {/* <TopHeader />
      <Navbar /> */}
      <DrIndividualProfile />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default DrIndividualProfilePage;
