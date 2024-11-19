import React from "react";
import TopHeader from "../../Components/TopHeader";
import Navbar from "../../Components/Navbar";
import ViewFamilyMembers from "../../Components/ViewFamilyMembers/ViewFamilyMembers";
import Footer from "../../Components/Footer";

const ViewFamilyMembersPage = () => {
  return (
    <div>
      <header className="App-header">
        <TopHeader />
        <Navbar />
        <ViewFamilyMembers />
        <div className="mt-20">
          <Footer />
        </div>
      </header>
    </div>
  );
};

export default ViewFamilyMembersPage;
