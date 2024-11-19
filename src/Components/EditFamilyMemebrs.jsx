import axios from "axios";
import React, { useEffect, useState } from "react";

const EditFamilyMemebrs = ({ editFamilyPopUp, setEditFamilyPopUp }) => {
  const [editData, setEditData] = useState({
    name: "",
    gender: "Male",
    relation: "",
    dateOfBirth: "",
    avatar: "",
    isOther: false,
    otherRelation: "",
  });

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const getFamilyEdit = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/user/family`,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setEditData({
        name: response.data,
      });
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFamilyEdit();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-5 py-1 px-5 rounded-xl bg-gray-100">
      <div className="form-section border mt-10 p-5 rounded-xl relative">
        <form>
          <div className="absolute w-16 h-16 -top-8 right-[20px] border-4 border-white rounded-full bg-gray-300 overflow-hidden shadow-md cursor-pointer flex items-center justify-center">
            {/* Image Icon */}
            {/* {!avatar && (
            <FaImage className="text-gray-500 text-[15px] pointer-events-none" />
          )} */}

            {/* Image Preview */}
            {/* {avatar && (
            <img
              src={avatar}
              alt="Uploaded Avatar"
              className="w-full h-full object-cover"
            />
          )} */}

            {/* Hidden Input */}
            {/* <label htmlFor="avatarUpload" className="absolute w-full h-full">
            <input
              id="avatarUpload"
              type="file"
              className="hidden"
              accept="image/*"
              name="avatar"
              onChange={handleFileChange}
            />
          </label> */}
          </div>

          <div className="mb-4 mt-5">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
              placeholder="Enter your full name"
              name="name"
              // value={formData.name}
              // onChange={handleChange}
            />
          </div>

          <div className="mb-4 mt-5">
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Date of Birth
            </label>
            <input
              type="date"
              // value={formData.dateOfBirth}
              id="dateOfBirth"
              name="dateOfBirth"
              // onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-4 mt-5">
            <label
              htmlFor="relation"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Relation
            </label>
            <select
              id="relation"
              className="w-full p-2 border rounded-md focus:outline-none text-gray-700 bg-white mb-2"
              // value={formData.relation || ""} // Default to empty value
              name="relation"
              // onChange={(e) => {
              //   const value = e.target.value;
              //   if (value === "OTHER") {
              //     setFormData({
              //       ...formData,
              //       relation: value, // Set selected value to "OTHER"
              //       isOther: true, // Show custom input field
              //     });
              //   } else {
              //     setFormData({
              //       ...formData,
              //       relation: value, // Set the selected relation value
              //       isOther: false, // Hide the custom input field
              //       otherRelation: "", // Clear the other relation input when a selection is made
              //     });
              //   }
              // }}
            >
              <option value="">Select Relation</option>
              <option value="GRANDMOTHER">GRANDMOTHER</option>
              <option value="GRANDFATHER">GRANDFATHER</option>
              <option value="MOTHER">MOTHER</option>
              <option value="FATHER">FATHER</option>
              <option value="SISTER">SISTER</option>
              <option value="BROTHER">BROTHER</option>
              <option value="COUSIN">COUSIN</option>
              <option value="DAUGHTER">DAUGHTER</option>
              <option value="SON">SON</option>
              <option value="GRANDDAUGHTER">GRANDDAUGHTER</option>
              <option value="GRANDSON">GRANDSON</option>
              <option value="WIFE">WIFE</option>
              <option value="HUSBAND">HUSBAND</option>
              <option value="OTHER">OTHER</option>
            </select>

            {/* Manual input for relation when "OTHER" is selected */}
            {/* {formData.isOther && ( */}
            <input
              type="text"
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
              placeholder="Enter relation"
              name="otherRelation"
              //   value={formData.otherRelation}
              //   onChange={(e) =>
              //     setFormData({ ...formData, otherRelation: e.target.value })
              //   }
            />
            {/* )} */}
          </div>

          <div className="mb-4 mt-5">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-600 mb-1 "
            >
              Gender
            </label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none text-gray-700 bg-white"
              // value={formData.gender}
              name="gender"
              // onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4 mt-5 flex gap-5">
            <div>
              <button
                type="button"
                onClick={() => setEditFamilyPopUp(false)}
                className="bg-[#00768A] hover:bg-[#176e7e] text-white px-2 py-1 rounded-md focus:outline-none"
              >
                Cancel
              </button>
            </div>
            <div>
              <button
                type="submit"
                className="bg-[#00768A] hover:bg-[#176e7e] text-white px-2 py-1 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFamilyMemebrs;
