import React from "react";
import TopHeader from "../Components/TopHeader";
import Headers from "../Components/Headers";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Profile from "../Components/Profile";

const ProfilePage = () => {
  return (
    <div>
      <TopHeader />
      <Navbar />
      <Profile />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
