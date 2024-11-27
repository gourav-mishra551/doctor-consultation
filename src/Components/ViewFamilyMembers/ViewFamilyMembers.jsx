import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditFamilyMemebrs from "../EditFamilyMemebrs";
import { RxCross2 } from "react-icons/rx";
import AddFamilyMembers from "../AddFamilyMembers";

const ViewFamilyMembers = ({ familyData, getFamilyEdit }) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editFamilyPopUp, setEditFamilyPopUp] = useState(false);
  const [addFamilyPopup, setAddFamilyPopup] = useState(false);

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



  return (
    <>
      {user && id ? (
        <div className="flex flex-col gap-5">
          <div className="flex justify-end">
            <button
              onClick={() => setAddFamilyPopup(true)}
              className="bg-[#00768A] text-white px-2 py-1 rounded-md "
            >
              Add members
            </button>
          </div>
          {familyData?.data?.map((family) => (
            <div
              key={family._id}
              className="flex gap-5 bg-gray-100 p-3 shadow-md cursor-pointer"
            >
              <div className="sm:w-[10%] w-[20%] flex justify-center items-center">
                <img
                  src={family?.avatar || ""}
                  className="sm:h-[100px] sm:w-[100px] rounded-full h-[60px] w-[60px]"
                />
              </div>

              <div className="sm:w-[90%] w-[80%] space-y-1">
                <div className="flex justify-end gap-1">
                  <FaUserEdit
                    onClick={() => {
                      setEditFamilyPopUp(true), setDeleteId(family._id);
                    }}
                  />
                  <MdDelete
                    onClick={() => {
                      setDeleteAlert(true);
                      setDeleteId(family._id);
                    }}
                    className="text-red-500 cursor-pointer"
                  />
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
                    <AddFamilyMembers
                      addFamilyPopup={addFamilyPopup}
                      setAddFamilyPopup={setAddFamilyPopup}
                    />
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
