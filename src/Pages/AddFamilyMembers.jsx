import React from "react";
import TopHeader from "../Components/TopHeader";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import AddFamilyMembers from "../Components/AddFamilyMembers";

const AddFamilyMembers = () => {
  return (
    <div>
      <header className="App-header">
        <TopHeader />
        <Navbar />
        <AddFamilyMembers />
        <div className="mt-20">
          <Footer />
        </div>
      </header>
    </div>
  );
};

export default AddFamilyMembers;
