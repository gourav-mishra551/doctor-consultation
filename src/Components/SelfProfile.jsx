import React from "react";

const SelfProfile = ({ userprofiledata }) => {
  
  return (
    <div>
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto my-8">
        {/* Header with Avatar and Name */}
        <div className="flex items-center space-x-4 border-b pb-4 mb-4">
          <img
            src={userprofiledata?.data?.avatar}
            alt="userprofiledata.data Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {userprofiledata?.data?.name}
            </h2>
            <p className="text-sm text-gray-500">
              UHID: {userprofiledata?.data?.uhid}
            </p>
          </div>
        </div>

        {/* userprofiledata.data Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Authentication Method */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Authentication Method</span>
            <span className="text-lg font-semibold text-gray-800 uppercase">
              {userprofiledata?.data?.authMethod}
            </span>
          </div>

          {/* Date of Birth */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Date of Birth</span>
            <span className="text-lg font-semibold text-gray-800">
              {userprofiledata?.data?.dateOfBirth || "N/A"}
            </span>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-lg font-semibold text-gray-800">
              {userprofiledata?.data?.email}
            </span>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Gender</span>
            <span className="text-lg font-semibold text-gray-800">
              {userprofiledata?.data?.gender || "N/A"}
            </span>
          </div>

          {/* Google ID */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Google ID</span>
            <span className="text-lg font-semibold text-gray-800">
              {userprofiledata?.data?.googleId || "N/A"}
            </span>
          </div>

          {/* Mobile */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Mobile</span>
            <span className="text-lg font-semibold text-gray-800">
              {userprofiledata?.data?.mobile || "N/A"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelfProfile;
