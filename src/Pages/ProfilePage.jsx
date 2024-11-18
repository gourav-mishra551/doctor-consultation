import React from "react";
import Footer from "../Components/Footer";
import Profile from "../Components/Profile";

const ProfilePage = () => {
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
