import axios from "axios";
import React, { useEffect, useState } from "react";

const SelfProfile = ({ handleSectionChange }) => {
  const [isLoading, setisLoading] = useState(false);
  const [userProfileData, setUserProfileData] = useState([]);
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const userData = async () => {
    setisLoading(true);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/user`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setUserProfileData(response.data);
      setisLoading(false);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userData();
  }, []);

  const dummyImage =
    "https://storage.needpix.com/rsynced_images/head-659651_1280.png";

  if (isLoading) {
    return (
      <div className="flex justify-center items-center sm:mt-10">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div>
     
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl mx-auto my-8">
        {/* Header with Avatar and Name */}
        <div className="flex justify-between space-x-4 border-b pb-4 mb-4">
          <div>
          <img
            src={userProfileData?.data?.avatar || dummyImage}
            alt="userprofiledata.data Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              {userProfileData?.data?.name}
            </h2>
            <p className="text-sm text-gray-500">
              UHID: {userProfileData?.data?.uhid}
            </p>
          </div>
          </div>
          <div className="flex justify-end h-[30px]  ">
          <button
            onClick={() => handleSectionChange("edituserprofile")}
            className="bg-[#00768A] text-white px-5 py-1 rounded-[5px]"
          >
            Edit
          </button>
        </div>
        </div>

        
        {/* userprofiledata.data Details Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Authentication Method */}
          {/* Date of Birth */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Date of Birth</span>
            <span className="text-lg font-semibold text-gray-800">
              {userProfileData?.data?.dateOfBirth || "N/A"}
            </span>
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Email</span>
            <span className="text-lg font-semibold text-gray-800">
              {userProfileData?.data?.email}
            </span>
          </div>

          {/* Gender */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Gender</span>
            <span className="text-lg font-semibold text-gray-800">
              {userProfileData?.data?.gender || "N/A"}
            </span>
          </div>
          {/* Mobile */}
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">Mobile</span>
            <span className="text-lg font-semibold text-gray-800">
              {userProfileData?.data?.mobile || "N/A"}
            </span>
          </div>
          {userProfileData?.doctorStatusDetail && (
            <div className="flex flex-col">
              <span className="text-sm text-gray-500">
                Your status to become a doctor at Ametheus health{" "}
              </span>
              <span className="text-lg font-semibold text-gray-800">
                {userProfileData?.doctorStatusDetail || "N/A"}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SelfProfile;
