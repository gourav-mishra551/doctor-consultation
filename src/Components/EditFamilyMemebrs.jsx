import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaImage } from "react-icons/fa";

const EditFamilyMemebrs = ({
  setEditFamilyPopUp,
  deleteId,
  getFamilyEdit,
}) => {
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

  const getFamilyData = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/user/family/${deleteId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      const data = response.data.data;
      setEditData({
        name: data.name,
        gender: data.gender,
        relation: data.relation,
        dateOfBirth: data.dateOfBirth,
        avatar: data.avatar,
        isOther: data.relation === "OTHER",
        otherRelation:
          data.relation === "OTHER" ? data.otherRelation || "" : "",
      });
    } catch (error) {
      
    }
  };

  useEffect(() => {
    getFamilyData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData({
      ...editData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditData({
          ...editData,
          avatar: reader.result, // Preview the uploaded image
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const patchFamily = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://api.assetorix.com/ah/api/v1/user/family/${deleteId}`,
        editData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
    } catch (error) {
      
    } finally {
      setEditFamilyPopUp(false);
      getFamilyEdit();
    }
  };



  return (
    <div className="max-w-xl mx-auto mt-5 py-1 px-5 rounded-xl bg-gray-100">
      <div className="form-section border mt-10 p-5 rounded-xl relative">
        <form onSubmit={patchFamily}>
          <div className="absolute w-16 h-16 -top-8 right-[20px] border-4 border-white rounded-full bg-gray-300 overflow-hidden shadow-md cursor-pointer flex items-center justify-center">
            {!editData.avatar && (
              <FaImage className="text-gray-500 text-[15px] pointer-events-none" />
            )}
            {editData.avatar && (
              <img
                src={editData.avatar}
                alt="Uploaded Avatar"
                className="w-full h-full object-cover"
              />
            )}
            <label htmlFor="avatarUpload" className="absolute w-full h-full">
              <input
                id="avatarUpload"
                type="file"
                className="hidden"
                accept="image/*"
                name="avatar"
                onChange={handleFileChange}
              />
            </label>
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
              value={editData.name}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4 mt-5">
            <label
              htmlFor="date"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Date of Birth
            </label>
            <input
              type="date"
              value={editData.dateOfBirth}
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={handleChange}
              className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
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
              value={editData.relation || ""}
              name="relation"
              onChange={(e) => {
                const value = e.target.value;
                setEditData({
                  ...editData,
                  relation: value,
                  isOther: value === "OTHER",
                  otherRelation:
                    value === "OTHER" ? editData.otherRelation : "",
                });
              }}
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
            {editData.isOther && (
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
                placeholder="Enter relation"
                name="otherRelation"
                value={editData.otherRelation}
                onChange={handleChange}
              />
            )}
          </div>

          <div className="mb-4 mt-5">
            <label
              htmlFor="gender"
              className="block text-sm font-medium text-gray-600 mb-1"
            >
              Gender
            </label>
            <select
              className="w-full p-2 border rounded-md focus:outline-none text-gray-700 bg-white"
              value={editData.gender}
              name="gender"
              onChange={handleChange}
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
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFamilyMemebrs;
