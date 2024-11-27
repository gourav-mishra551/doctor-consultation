import React, { useEffect, useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";

const EditUserDetails = () => {
  const [userData, setUserData] = useState([]);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [formData, setFormData] = useState({
    mobile: "",
    name: "",
    gender: "",
    dateOfBirth: " ",
    email: "user@example.com",
    avatar: "",
  });

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const fetechUserProfileData = async () => {
    try {
      const response = await axios.get(
        "https://api.assetorix.com/ah/api/v1/user",
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setUserData(userData);
    
      const data = response.data.data;
      setFormData({
        avatar: data.avatar,
        name: data.name || "N/A",
        mobile: data.mobile || "N/A",
        gender: data.gender || "N/A",
        dateOfBirth: data.dateOfBirth || "N/A",
        email: data.email || "N/A",
      });
    } catch (error) {
      
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetechUserProfileData();
  }, []);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const avatarFormData = new FormData();
      avatarFormData.append("avatar", file); // Append the avatar file correctly
      axios
        .patch(
          `https://api.assetorix.com/ah/api/v1/user/avatar`,
          avatarFormData,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              id: localStorage.getItem("Id"),
              // Do not set 'Content-Type' manually, let axios handle i
            },
          }
        )
        .then((response) => {
          toast.success("Avatar updated successfully");
          fetechUserProfileData(); // Fetch updated data after success
        })
        .catch((error) => {
          toast.error("Error updating avatar");
        });
    }
  };

  const patchUser = async (e) => {
    e.preventDefault();
    setUpdateLoader(true);
    try {
      const response = await axios.patch(
        `https://api.assetorix.com/ah/api/v1/user`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
    } catch (error) {
      
    } finally {
      setUpdateLoader(false);
    }
  };

  const handleDeleteAvatar = async () => {
    try {
      const response = await axios.delete(
        `https://api.assetorix.com/ah/api/v1/user/avatar`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      toast.success("Avatar deleted successfully");
      setFormData((prev) => ({ ...prev, avatar: "" })); // Clear the avatar in state
    } catch (error) {
      toast.error("Error deleting Avatar");
      
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg max-w-5xl mx-auto">
      <div className="flex justify-center items-center mb-4 relative">
        {/* Avatar Image */}
        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-300">
          <img
            loading="lazy"
            src={formData.avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
            className="w-full h-full object-cover"
          />
          {/* File Input for Avatar */}
          <input
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Add/Delete Button */}
        <button
          onClick={
            formData.avatar
              ? handleDeleteAvatar // Delete avatar if one exists
              : () => document.querySelector('input[type="file"]').click() // Trigger file input for upload
          }
          className="absolute -bottom-1 right-[45%] bg-white p-1 rounded-full border border-gray-300 shadow-md hover:bg-gray-100"
        >
          {formData.avatar ? (
            <FaTrash className="text-red-500 focus:outline-none" />
          ) : (
            <FaPlus className="text-green-500 focus:outline-none" />
          )}
        </button>
      </div>

      <form className="space-y-4" onSubmit={patchUser}>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mobile
          </label>
          <input
            type="text"
            name="mobile"
            value={formData.mobile}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Gender
          </label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded-md"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Date of Birth
          </label>
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="mt-1 p-2 border w-full rounded-md"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-[#48A8B3] text-white p-2 sm:w-[10vw]  w-auto rounded-md hover:bg-[#00768A] shadow-md sm:text-lg text-xs"
          >
            {updateLoader ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditUserDetails;
