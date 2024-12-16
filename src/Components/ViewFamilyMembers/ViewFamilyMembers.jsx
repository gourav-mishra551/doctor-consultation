import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaImage, FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditFamilyMemebrs from "../EditFamilyMemebrs";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import noSlotsImage from '../../../src/Assests/images.png'
const ViewFamilyMembers = ({ setActiveSection }) => {
  const [isLoading, setisLoading] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editFamilyPopUp, setEditFamilyPopUp] = useState(false);
  const [addFamilyPopup, setAddFamilyPopup] = useState(false);
  const [familyData, setFamilyData] = useState([]);
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

  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("Id");
  const user = localStorage.getItem("user");

  const deleteFamily = async () => {
    try {
      const response = await axios.delete(
        `https://api.assetorix.com/ah/api/v1/user/family/${deleteId}`,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      toast.success("Deleted Successfully...");
    } catch (error) {
    } finally {
      getFamilyEdit();
    }
  };

  function formatDateToReadable(dateString) {
    const date = new Date(dateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  }

  const getFamilyEdit = async () => {
    setisLoading(true);
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
      setFamilyData(response.data);
      setisLoading(false);
      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    getFamilyEdit();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaveLoader(true); // Show loader during the process

    try {
      // Create FormData to append file data
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name || "");
      formDataToSend.append("gender", formData.gender || "Male"); // Ensure gender has a default value
      formDataToSend.append("relation", formData.relation || "");
      formDataToSend.append("dateOfBirth", formData.dateOfBirth || "");

      if (formData.avatar) {
        formDataToSend.append("avatar", formData.avatar); // Appending the avatar file
      }

      if (formData.isOther && formData.otherRelation) {
        formDataToSend.append("otherRelation", formData.otherRelation); // Append otherRelation only if valid
      }

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

      // Success actions
      toast.success("Family member added successfully!");
      setActiveSection("familyProfile"); // Navigate to family profile section
      getFamilyEdit(); // Refresh family data
      setAddFamilyPopup(false); // Close the family popup
      setFormData(""); // Reset form data to initial state
    } catch (error) {
      console.error("Error submitting family data:", error);
      toast.error(error?.response?.data?.msg);
    } finally {
      // Ensure the loader stops after the process completes
      setSaveLoader(false);
    }
  };

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

  // Handle change function
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      {user && id ? (
        <div className="flex flex-col gap-5">
          <div className="flex justify-between">
            <div
              className="mr-2"
              onClick={() => navigate("/profile?section=selfuserprofile")}
            >
              <button className="px-4 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400">
                Back
              </button>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setAddFamilyPopup(true)}
                className="bg-[#00768A] text-white px-2 py-1 rounded-md "
              >
                Add members
              </button>
            </div>
          </div>
          {familyData?.data?.length > 0 ? (
            <>
              {familyData?.data?.map((family) => (
                <div
                  key={family._id}
                  className="flex gap-5 bg-gray-100 p-3 shadow-md cursor-pointer"
                >
                  <div className="sm:w-[10%] w-[20%] flex justify-center items-center">
                    <img
                      src={
                        family?.avatar || "https://pixy.org/src/31/315160.png"
                      }
                      className="sm:h-[100px] sm:w-[100px] rounded-full h-[60px] w-[60px]"
                    />
                  </div>

                  <div className="sm:w-[90%] w-[80%] space-y-1">
                    <div className="flex justify-end sm:gap-3">
                      <div className="bg-blue-500 flex justify-center items-center h-[30px] w-[30px] rounded-full">
                        <FaUserEdit
                          className="text-white cursor-pointer"
                          onClick={() => {
                            setEditFamilyPopUp(true), setDeleteId(family._id);
                          }}
                        />
                      </div>

                      <div className="bg-red-500 flex justify-center items-center h-[30px] w-[30px] rounded-full">
                        <MdDelete
                          onClick={() => {
                            setDeleteAlert(true);
                            setDeleteId(family._id);
                          }}
                          className="text-white cursor-pointer"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between mt-3">
                      <p className="font-bold text-[#00768A] sm:text-xl">
                        {family?.name}
                      </p>
                      <p className="text-[#00768A] font-semibold sm:text-xl text-sm">
                        {family?.relation}
                      </p>
                    </div>
                    <div className="w-full h-[1px] bg-gray-500"></div>
                    <div className="flex justify-between mt-3">
                      <p className="text-[#00768A] font-semibold sm:text-sm text-xs">
                        UHID:{family?.uhid}
                      </p>
                      <p className="text-[#00768A] font-semibold sm:text-sm text-xs">
                        DOB: {formatDateToReadable(family?.dateOfBirth)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <div className="flex flex-col gap-3 justify-center items-center">
              <div className="flex flex-col items-center justify-center text-center text-gray-500 mt-4  rounded-lg p-4 shadow-lg bg-gray-100">
                <img
                  src={noSlotsImage}
                  alt="noSlotsImage"
                  className="sm:w-[200px] object-contain mb-2"
                />
              </div>
              <p className="text-center text-gray-500">No Data Available</p>
            </div>
          )}

          {deleteAlert && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-3 sm:p-0 lg:p-2">
              <div className="absolute inset-0"></div>
              <div className="bg-white p-6 rounded-lg border-2 z-10">
                <p className="text-lg mb-4">
                  Do you sure you want to delete this member?
                </p>
                <div className="flex justify-end">
                  <button
                    onClick={() => {
                      deleteFamily(deleteId);
                      setDeleteAlert(false);
                    }}
                    className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => setDeleteAlert(false)}
                    className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
          {editFamilyPopUp && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-3 sm:p-0 lg:p-2">
              <div className="bg-white rounded-lg border-2 z-10 w-full max-w-md mx-4 md:mx-0">
                {/* Scrollable container with a fixed height */}
                <div className="flex justify-between gap-10 items-center px-10 translate-y-5">
                  <p className="uppercase sm:font-bold sm:text-xl text-sm">
                    Edit Family members
                  </p>
                  <RxCross2
                    className="font-bold cursor-pointer"
                    onClick={() => setEditFamilyPopUp(false)}
                  />
                </div>
                <div className="sm:h-[90vh] h-[550px] overflow-y-auto sm:p-6 px-3 py-2 sm:space-y-6">
                  <div className="bg-gray-500 h-[1px] w-full bg-opacity-30 mt-5">
                    <EditFamilyMemebrs
                      deleteId={deleteId}
                      editFamilyPopUp={editFamilyPopUp}
                      setEditFamilyPopUp={setEditFamilyPopUp}
                      getFamilyEdit={getFamilyEdit}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
          {addFamilyPopup && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-3 sm:p-0 lg:p-2">
              <div className="bg-white rounded-lg border-2 z-10 w-full max-w-md mx-4 md:mx-0">
                {/* Scrollable container with a fixed height */}
                <div className="flex justify-between gap-10 items-center sm:px-10 px-5 translate-y-5">
                  <p className="uppercase sm:font-bold">Add Family members</p>
                  <RxCross2
                    className="font-bold cursor-pointer"
                    onClick={() => setAddFamilyPopup(false)}
                  />
                </div>
                <div className="sm:h-[90vh] h-[550px] overflow-y-auto sm:p-6 px-3 py-2 sm:space-y-6">
                  <div className="bg-gray-500 h-[1px] w-full bg-opacity-30 mt-5">
                    <div className="sm:max-w-xl mx-auto mt-5 py-1 px-5 rounded-xl bg-gray-100">
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
                            <label
                              htmlFor="avatarUpload"
                              className="absolute w-full h-full"
                            >
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
                              <option value="GRANDDAUGHTER">
                                GRANDDAUGHTER
                              </option>
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
                                  setFormData({
                                    ...formData,
                                    otherRelation: e.target.value,
                                  })
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
                                setAddFamilyPopup(false);
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
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        "No user found, please login first"
      )}
    </>
  );
};

export default ViewFamilyMembers;
