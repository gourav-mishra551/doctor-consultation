import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaImage } from "react-icons/fa6";
  
const AddFamilyMembers = ({
  setFamilyPopUp,
  setActiveSection,
  getFamilyEdit,
  addFamilyPopup,
  familyPopUp,
  setAddFamilyPopup,
}) => {
  const [avatar, setAvatar] = useState(null);
  const [saveLoader, setSaveLoader] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "Male",
    relation: "",
    dateOfBirth: "",
    avatar: "",
    isOther: false,
    otherRelation: "",
  });
  const [check, setCheck] = useState(familyPopUp);

  // console.log(setFamilyPopUp);
  // console.log(familyPopUp);
  console.log(getFamilyEdit);
  console.log("Add family popup", addFamilyPopup);
  console.log("set Add family popup", setAddFamilyPopup);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        toast.error("Only JPEG and PNG files are allowed.");
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        // 2MB limit
        toast.error("File size must be under 2MB.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
        setFormData({
          ...formData,
          avatar: file,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to append file data
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("gender", formData.gender);
    formDataToSend.append("relation", formData.relation);
    formDataToSend.append("dateOfBirth", formData.dateOfBirth);

    if (formData.avatar) {
      formDataToSend.append("avatar", formData.avatar); // Appending the avatar file
    }

    if (formData.isOther) {
      formDataToSend.append("otherRelation", formData.otherRelation); // If "Other" is selected, append other relation
    }

    try {
      const response = await axios.post(
        `https://api.assetorix.com/ah/api/v1/user/family`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      console.log(response.data);

      // Success actions
      setSaveLoader(false);
      setFamilyPopUp(false);
      setAddFamilyPopup(false);
      toast.success("Family member added successfully!");
    } catch (error) {
      console.error("Error submitting data:", error);

      // Enhanced error handling
      const errorMessage =
        error?.response?.data?.msg ||
        error?.message ||
        "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      // Ensure this runs after the request, whether success or failure
      getFamilyEdit();
      setActiveSection("familyProfile");
      setSaveLoader(false); // Stop the loader after the process completes
    }
  };

  console.log(addFamilyPopup);
  console.log("100 number", setFamilyPopUp);
  console.log("101 number", check);
  console.log(getFamilyEdit);

  return (
    <div className="max-w-xl mx-auto mt-5 py-1 px-5 rounded-xl bg-gray-100">
      <div className="form-section border mt-10 p-5 rounded-xl relative">
        <form onSubmit={handleSubmit}>
          <div className="absolute w-16 h-16 -top-8 right-[20px] border-4 border-white rounded-full bg-gray-300 overflow-hidden shadow-md cursor-pointer flex items-center justify-center">
            {/* Image Icon */}
            {!avatar && (
              <FaImage className="text-gray-500 text-[15px] pointer-events-none" />
            )}

            {/* Image Preview */}
            {avatar && (
              <img
                src={avatar}
                alt="Uploaded Avatar"
                className="w-full h-full object-cover"
              />
            )}

            {/* Hidden Input */}
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
              value={formData.name}
              onChange={handleChange}
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
              value={formData.dateOfBirth}
              id="dateOfBirth"
              name="dateOfBirth"
              onChange={handleChange}
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
              value={formData.relation || ""} // Default to empty value
              name="relation"
              onChange={(e) => {
                const value = e.target.value;
                if (value === "OTHER") {
                  setFormData({
                    ...formData,
                    relation: value, // Set selected value to "OTHER"
                    isOther: true, // Show custom input field
                  });
                } else {
                  setFormData({
                    ...formData,
                    relation: value, // Set the selected relation value
                    isOther: false, // Hide the custom input field
                    otherRelation: "", // Clear the other relation input when a selection is made
                  });
                }
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

            {/* Manual input for relation when "OTHER" is selected */}
            {formData.isOther && (
              <input
                type="text"
                className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
                placeholder="Enter relation"
                name="otherRelation"
                value={formData.otherRelation}
                onChange={(e) =>
                  setFormData({ ...formData, otherRelation: e.target.value })
                }
              />
            )}
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
              value={formData.gender}
              name="gender"
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="mb-4 mt-5 flex gap-5">
            <button
              type="button"
              onClick={() => {
                setFamilyPopUp(false);
              }}
              className="bg-[#00768A] hover:bg-[#176e7e] text-white px-2 py-1 rounded-md focus:outline-none"
            >
              Cancel
            </button>

            <div>
              <button
                type="submit"
                className="bg-[#00768A] hover:bg-[#176e7e] text-white px-2 py-1 rounded-md focus:outline-none"
              >
                {saveLoader ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFamilyMembers;
