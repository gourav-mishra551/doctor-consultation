import axios from "axios";
import { div } from "framer-motion/m";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const BookingDetails = () => {
  const [bookingDetailsData, setBookingDetailsData] = useState();
  const { bid } = useParams();
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleRecordClick = (record) => {
    setSelectedRecord(record);
  };

  const closePopup = () => {
    setSelectedRecord(null);
  };

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const bookings = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/doctor/history/${bid}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setBookingDetailsData(response.data);
     
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    bookings();
  }, []);
  {console.log(bookingDetailsData)}


  return (
    <div className="mt-5">
      <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Patient Details
        </h2>
        {bookingDetailsData?.data?.patientDetails && (
          <div className="grid sm:grid-cols-2 gap-4 bg-gray-100 p-5">
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">Name:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.patientDetails.name}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">
                Reason of Appointment:
              </span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.patientDetails.reasonForAppointment}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">Gender:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.patientDetails.gender}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">Date of Birth:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.patientDetails.dateOfBirth}
              </span>
            </div>
          </div>
        )}
        <div className="bg-gray-300 bg-opacity-80 h-[1px] max-w-4xl mx-auto"></div>
        {/* available time for bookings */}
        {bookingDetailsData?.data?.specificSlotData && (
          <div className="grid sm:grid-cols-2 gap-4 bg-gray-100 p-5">
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">Start time:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.specificSlotData.startTime}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">End time:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.specificSlotData.endTime}
              </span>
            </div>
            <div className="flex gap-3">
              <span className="font-medium text-gray-600">Doctor Charge:</span>
              <span className="text-gray-800">
                {bookingDetailsData?.data?.specificSlotData.doctorCharge}
              </span>
            </div>
          </div>
        )}
        {/* Make Prescription */}
        <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold text-center mb-6">Health Records shared by patient</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookingDetailsData?.data?.healthRecords?.map((data) => (
          <div
            key={data._id}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 cursor-pointer"
            onClick={() => handleRecordClick(data)}
          >
            <div className="relative aspect-w-16 aspect-h-9">
              <iframe
                src={data.fileURL}
                frameBorder="0"
                className="w-full h-full"
                title={`Health Record ${data._id}`}
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800 truncate">
                {data.title || "Untitled Record"}
              </h3>
              <p className="text-sm text-gray-500">
                type of record: <span className="bg-[#00768A] text-white font-semibold p-2 rounded-md ml-2 text-xs"> {data.typeOfRecord} </span> 
              </p>
            </div>
          </div>
        ))}
      </div>

      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-3/4 lg:w-1/2">
            <div className="relative aspect-w-16 aspect-h-9">
              <iframe
                src={selectedRecord.fileURL}
                frameBorder="0"
                className="w-full h-[80vh]"
                title={`Health Record ${selectedRecord._id}`}
              ></iframe>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-800">
                {selectedRecord.title || "Untitled Record"}
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Type of record: <span className="bg-[#00768A] text-white font-semibold p-2 rounded-md ml-2 text-xs"> {selectedRecord.typeOfRecord} </span>
              </p>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={closePopup}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
        {/* {bookingDetailsData?.data} */}
        <div className="flex flex-col w-full sm:mt-5">
          <Link to={`/prescription-maker/${bid}`}>
            <button className="bg-[#944120] hover:bg-[#6e341d] transition-all duration-500 ease-in-out p-2 text-white rounded-md">
              Make Prescription
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
