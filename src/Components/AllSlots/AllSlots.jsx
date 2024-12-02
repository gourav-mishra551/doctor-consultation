import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiBookmarkCheck } from "react-icons/ci";
import { FaEdit } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const AllSlots = ({ setActiveSection, handleSectionChange }) => {
  const [slotsData, setSlotsData] = useState([]);
  const [popUp, setPopUp] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);
  const [subId, setSubId] = useState(null);
  const [updateLoader, setUpdateLoader] = useState(false);

  const [formData, setFormData] = useState({
    startTime: "",
    endTime: "",
    doctorCharge: "",
    isBooked: "",
  });

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const allSlots = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/doctor`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setSlotsData(response.data.data);
    } catch (error) {}
  };

  useEffect(() => {
    allSlots();
  }, []);

  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  function formatDateWithTodayOrTomorrow(dateString) {
    if (!dateString) return "N/A";

    const inputDate = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const isToday = inputDate.toDateString() === today.toDateString();
    const isTomorrow = inputDate.toDateString() === tomorrow.toDateString();

    if (isToday) return "Today";
    if (isTomorrow) return "Tomorrow";

    return inputDate.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  }

  const handleEditClick = (slot) => {
    setPopUp(true);
    setFormData({
      startTime: slot.startTime,
      endTime: slot.endTime,
      doctorCharge: slot.doctorCharge,
      isBooked: slot.isBooked,
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const patchSlots = async (e) => {
    e.preventDefault();
    try {
      setUpdateLoader(true);
      const response = await axios.patch(
        `https://api.assetorix.com/ah/api/v1/dc/doctor/availbility/${appointmentId}/${subId}`,
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      toast.success("Updated Successfully...");
      allSlots();
      setPopUp(false);
      console.log(formData);
    } catch (error) {
      console.log(error.response.data.msg);
      toast.error(error.response.data.msg);
      setPopUp(false);
    } finally {
      allSlots();
      setUpdateLoader(false);
    }
  };

  console.log(setActiveSection);

  return (
    <>
      {slotsData?.doctorAvailabilities?.length > 0 ? (
        <>
          <div className="indictors flex justify-center items-center gap-5">
            <div className="red flex items-center gap-1">
              <div className="h-[15px] w-[15px] bg-blue-800"></div>
              <p>Online slots</p>
            </div>
            <div className="green flex items-center gap-1">
              <div className="h-[15px] w-[15px] bg-red-800"></div>
              <p>Booked slots</p>
            </div>
            <div className="blue flex items-center gap-1">
              <div className="h-[15px] w-[15px] bg-green-800"></div>
              <p>Offline slots</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              onClick={() => {
                handleSectionChange("create-slots"), console.log("Clicked");
              }}
              className="bg-[#00768A] text-white py-1 px-2 rounded-xl"
            >
              Create Slots
            </button>
          </div>
          <div className="grid sm:grid-cols-2 grid-cols-1 gap-5 sm:p-6 h-auto">
            {slotsData?.doctorAvailabilities?.map((data, index) => (
              <div
                key={index}
                className="w-full mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200 h-auto"
              >
                <div className="mb-6">
                  <h2 className="sm:text-2xl text-xl text-center font-bold text-[#00768A]">
                    Appointment Details
                  </h2>
                  <p className="text-sm text-gray-500 font-semibold text-end">
                    {formatDateWithTodayOrTomorrow(data?.selectDate)}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 mb-8">
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Currency
                    </p>
                    <p className="text-gray-800">{data?.currency || "N/A"}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600">
                      Visiting Mode
                    </p>
                    <p className="text-gray-800">
                      {data?.visitingMode || "N/A"}
                    </p>
                  </div>
                </div>
                <div>
                  <div className="space-y-6">
                    {data?.onlineSlots?.length > 0 && (
                      <div>
                        <h4 className="text-md font-medium text-blue-600 mb-2">
                          Online Slots
                        </h4>
                        <div className="flex overflow-x-auto scrollbar-hide space-x-4 p-4 bg-blue-50 rounded-md">
                          {data?.onlineSlots.map((slot) => (
                            <div
                              key={slot._id}
                              className={`min-w-max px-4 py-2 rounded-lg shadow-md text-center ${
                                slot?.isBooked
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {slot?.isBooked ? (
                                <CiBookmarkCheck className="inline-block mr-2" />
                              ) : (
                                <FaEdit
                                  onClick={() => {
                                    handleEditClick(slot), setSubId(slot._id);
                                    setAppointmentId(data._id);
                                  }}
                                  className="inline-block mr-2 cursor-pointer text-sm"
                                />
                              )}
                              {convertTo12HourFormat(slot?.startTime)} -{" "}
                              {convertTo12HourFormat(slot?.endTime)}
                              {data.currency && (
                                <span className="ml-4 bg-[#00768A] text-white rounded-sm px-3">
                                  {data.currency === "INR" &&
                                    `₹ ${slot.doctorCharge}`}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {data?.offlineSlots?.length > 0 && (
                      <div>
                        <h4 className="text-md font-medium text-green-600 mb-2">
                          Offline Slots
                        </h4>
                        <div className="flex overflow-x-auto scrollbar-hide space-x-4 p-4 bg-green-50 rounded-md">
                          {data?.offlineSlots.map((slot) => (
                            <div
                              key={slot._id}
                              className={`min-w-max px-4 py-2 rounded-lg shadow-md text-center ${
                                slot?.isBooked
                                  ? "bg-red-100 text-red-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {slot?.isBooked ? (
                                <CiBookmarkCheck className="inline-block mr-2" />
                              ) : (
                                <FaEdit
                                  onClick={() => {
                                    handleEditClick(slot), setSubId(slot._id);
                                    setAppointmentId(data._id);
                                  }}
                                  className="inline-block mr-2 cursor-pointer text-sm"
                                />
                              )}
                              {convertTo12HourFormat(slot?.startTime)} -{" "}
                              {convertTo12HourFormat(slot?.endTime)}
                              {data.currency && (
                                <span className="ml-4 bg-[#00768A] text-white rounded-sm px-3">
                                  {data.currency === "INR" &&
                                    `₹ ${slot.doctorCharge}`}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-3 justify-center items-center">
          <p className="text-center text-gray-500">No Slots Available</p>
          <button
            onClick={() => handleSectionChange("create-slots")}
            className="bg-[#00768A] text-white py-1 px-2 rounded-xl"
          >
            Create Slots
          </button>
        </div>
      )}

      {popUp && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-3 sm:p-0 lg:p-2">
          <div className="bg-white rounded-lg border-2 z-10 w-full max-w-md mx-4 md:mx-0">
            <div className="flex justify-between gap-10 items-center sm:px-10 px-5 translate-y-5">
              <p className="uppercase sm:font-bold">Edit Slot Details</p>
              <RxCross2
                className="font-bold cursor-pointer"
                onClick={() => setPopUp(false)}
              />
            </div>
            <div className="form-section border mt-10 p-5 rounded-xl">
              <form onSubmit={patchSlots}>
                <div className="flex gap-5">
                  <div className="mb-4 mt-5">
                    <label
                      htmlFor="startTime"
                      className="block text-sm font-medium text-gray-600 mb-1"
                    >
                      Start Time
                    </label>
                    <input
                      type="time" // Changed to type="time"
                      name="startTime"
                      value={formData.startTime}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
                    />
                  </div>
                  <div className="mb-4 mt-5">
                    <label
                      htmlFor="endTime"
                      className="block text-sm font-medium text-gray-600 mb-1"
                    >
                      End Time
                    </label>
                    <input
                      type="time" // Changed to type="time"
                      name="endTime"
                      value={formData.endTime}
                      onChange={handleInputChange}
                      className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="doctorCharge"
                    value={formData.doctorCharge}
                    onChange={(e) => {
                      const value = Math.max(0, e.target.value); // Ensure the value is not less than 0
                      handleInputChange(e, value); // Assuming you update formData correctly here
                    }}
                    min="0" // Ensures the input cannot be less than 0
                    className="w-full p-2 border rounded-md focus:ring-2 focus:outline-none"
                  />
                </div>

                <div className="mb-4 ">
                  <label
                    htmlFor="Change Booking?"
                    className="block text-sm font-medium text-gray-600 mb-1"
                  >
                    Change Booking?
                  </label>
                  <select
                    name="isBooked"
                    value={formData.isBooked}
                    onChange={handleInputChange}
                    id="Change Booking?"
                    className="w-full p-2 border rounded-md focus:outline-none text-gray-700 bg-white mb-2"
                  >
                    <option value="">Change Status</option>
                    <option value="true">Make Available</option>
                    <option value="false">Make unavailable</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4"
                >
                  {updateLoader ? "updating..." : "Save Changes"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AllSlots;
