import React from "react";
import Footer from "../Components/Footer";
import AddFamilyMembers from "../Components/AddFamilyMembers";

const AddFamilyMembersPage = () => {
  return (
    <div>
      <div className="App-header">
        <AddFamilyMembers />
        <div className="mt-20">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AddFamilyMembersPage;