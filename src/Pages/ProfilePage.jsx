import React, { useEffect } from "react";
import Footer from "../Components/Footer";
import Profile from "../Components/Profile";

const ProfilePage = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Smooth scrolling
    });
  }, []);
  
  return (
    <div>
      <Profile />
      <div className="mt-20">
        <Footer />
      </div>
    </div>
  );
};

export default ProfilePage;
