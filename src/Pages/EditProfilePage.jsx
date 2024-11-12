import React from "react";
import TopHeader from "../Components/TopHeader";
import Navbar from "../Components/Navbar";
import EditProfile from "../Components/EditProfile";
import Footer from "../Components/Footer";

const EditProfilePage = () => {
  return (
    <div>
      <TopHeader />
      <Navbar />
      <EditProfile />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default EditProfilePage;
