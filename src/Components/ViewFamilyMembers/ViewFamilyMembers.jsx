import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import EditFamilyMemebrs from "../EditFamilyMemebrs";
import { RxCross2 } from "react-icons/rx";

const ViewFamilyMembers = ({ familyData, getFamilyEdit }) => {
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [editFamilyPopUp, setEditFamilyPopUp] = useState(false);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

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
      console.log(error);
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
      <div className="flex flex-col gap-5">
        <div className="flex justify-end">
          <button className="bg-[#00768A] text-white px-2 py-1 rounded-md ">
            Add members
          </button>
        </div>
        {familyData?.data?.map((family, index) => (
          <div
            key={index}
            className="flex gap-5 bg-gray-100 p-3 shadow-md cursor-pointer"
          >
            <div className="w-[10%]">
              <img
                src={family?.avatar}
                className="h-[100px] w-[100px] rounded-full"
              />
            </div>

            <div className="w-[90%] space-y-1">
              <div className="flex justify-end gap-1">
                <FaUserEdit onClick={() => setEditFamilyPopUp(true)} />
                <MdDelete
                  onClick={() => {
                    setDeleteAlert(true);
                    setDeleteId(family._id);
                  }}
                  className="text-red-500 cursor-pointer"
                />
              </div>
              <div className="flex justify-between mt-3">
                <p className="font-bold text-[#00768A] text-xl">
                  {family?.name}
                </p>
                <p className="text-[#00768A] font-semibold">
                  {family?.relation}
                </p>
              </div>
              <div className="w-full h-[1px] bg-gray-500"></div>
              <div className="flex justify-between mt-3">
                <p className="text-[#00768A] font-semibold">
                  UHID:{family?.uhid}
                </p>
                <p className="text-[#00768A] font-semibold">
                  DOB: {formatDateToReadable(family?.dateOfBirth)}
                </p>
              </div>
            </div>
          </div>
        ))}
        {deleteAlert && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0"></div>
            <div className="bg-white p-6 rounded-lg border-2 z-10">
              <p className="text-lg mb-4">
                Are you sure you want to delete this item?
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
                <p className="uppercase font-bold">Edit Family members</p>
                <RxCross2
                  className="font-bold cursor-pointer"
                  onClick={() => setEditFamilyPopUp(false)}
                />
              </div>
              <div className="h-[90vh] overflow-y-auto p-6 space-y-6">
                <div className="bg-gray-500 h-[1px] w-full bg-opacity-30 mt-5">
                  <EditFamilyMemebrs
                    editFamilyPopUp={editFamilyPopUp}
                    setEditFamilyPopUp={setEditFamilyPopUp}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ViewFamilyMembers;
