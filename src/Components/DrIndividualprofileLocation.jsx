import React from "react";

const DrIndividualprofileLocation = ({ profile }) => {
  return (
    <div className="bg-[#f3f3f3] w-full h-auto p-5 rounded-xl shadow-md">
      <div className="flex flex-col sm:gap-10 gap-5">
        {/* Left Section: Location Information */}
        <div className="location-1 sm:w-1/2">
          <p className="text-blue-700 font-bold text-xl">
            {profile?.hospitalName || "Hospital not available"}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Address:</span>{" "}
            {profile?.clinic_hospital_address?.permanentAddress},{" "}
            {profile?.clinic_hospital_address?.city},{" "}
            {profile?.clinic_hospital_address?.state} -{" "}
            {profile?.clinic_hospital_address?.PinCode}
          </p>
        </div>

        {/* Right Section: Contact & Specialties */}
        <div className="sm:w-1/2">
          <p className="text-blue-700 font-bold text-xl">Contact Information</p>
          <p className="mt-2">
            <span className="font-semibold">Languages:</span>{" "}
            {profile?.language.join(", ") || "Not available"}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Registration No:</span>{" "}
            {profile?.RegistrationNumber || "Not available"}
          </p>
          <p className="mt-2">
            <span className="font-semibold">Council Name:</span>{" "}
            {profile?.councilName || "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DrIndividualprofileLocation;
