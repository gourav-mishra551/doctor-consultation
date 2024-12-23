import React from "react";
import PrescriptionMaker from "../Components/PrescriptionMaker";
import Footer from "../Components/Footer";

const PrescriptionMakerPage = () => {
  return (
    <div>
      <div>
        <header className="App-header">
          <PrescriptionMaker />
          <div className="mt-20">
            <Footer />
          </div>
        </header>
      </div>
    </div>
  );
};

export default PrescriptionMakerPage;
