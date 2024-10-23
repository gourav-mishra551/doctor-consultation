import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import TopHeader from "../Components/TopHeader";
const DrExam = () => {
  const [data, setData] = useState({
    selectDate: Date.now(),
    selectSlotDuration: [""],
    visitingMode: "",
    offlineSlots: [],
    onlineSlots: [],
    availableTimeFrom: "",
    availableTimeTo: "",
    doctorId: ""
  });
  const [ErrorShow, setErrorShow] = useState(false)
  const [Error, setError] = useState('')
  const [PriceData, setPriceData] = useState('')
  const [editingSlot, setEditingSlot] = useState(null); // { type: 'offline' or 'online', index: number }


  //slotDuration




  const updatedPrice = Number(PriceData);
  const generateSlots = () => {
    const {
      availableTimeFrom,
      availableTimeTo,
      selectSlotDuration,
      visitingMode,
    } = data;

    if (
      !availableTimeFrom ||
      !availableTimeTo ||
      !selectSlotDuration ||
      !visitingMode
    )
      return;

    const startTime = new Date(`1970-01-01T${availableTimeFrom}:00`);
    const endTime = new Date(`1970-01-01T${availableTimeTo}:00`);
    const durationInMinutes = parseInt(selectSlotDuration, 10);

    const newOfflineSlots = [];
    const newOnlineSlots = [];

    for (
      let time = startTime;
      time < endTime;
      time.setMinutes(time.getMinutes() + durationInMinutes)
    ) {
      const slot = {
        startTime: time.toTimeString().slice(0, 5), // Format to HH:mm
        endTime: new Date(time.getTime() + durationInMinutes * 60000)
          .toTimeString()
          .slice(0, 5), // Format to HH:mm
        doctorCharge: 0, // Default charge, can be updated by the user
      };

      if (visitingMode === "offline" || visitingMode === "both") {
        newOfflineSlots.push(slot);
      }

      if (visitingMode === "online" || visitingMode === "both") {
        newOnlineSlots.push(slot);
      }
    }

    setData((prev) => ({
      ...prev,
      offlineSlots: newOfflineSlots,
      onlineSlots: newOnlineSlots,
    }));
  };

  // Handle changes for individual fields and slots
  const handleChange = (e, slotIndex, isOffline) => {
    const { name, value } = e.target;

    // If handling doctorCharge, update specific slot's doctorCharge as a number
    if (name === "doctorCharge") {
      const updatedSlots = (
        isOffline ? data.offlineSlots : data.onlineSlots
      ).map((slot, index) =>
        index === slotIndex ? { ...slot, doctorCharge: Number(value) } : slot
      );
      setData((prev) => ({
        ...prev,
        [isOffline ? "offlineSlots" : "onlineSlots"]: updatedSlots,
      }));
    }
    // Handle selectSlotDuration to convert string into an array of strings
    else if (name === "selectSlotDuration") {
      // Split the input by commas or spaces and leave as strings
      const updatedSlotDuration = value.split(','); // Assuming comma-separated input like "30, 45, 60"

      setData((prev) => ({
        ...prev,
        selectSlotDuration: updatedSlotDuration, // Set it as an array of strings
      }));
    }
    // Handle other fields
    else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };


  // Handle bulk update of doctorCharge for all slots
  const handleBulkPriceUpdate = (e) => {
    const { value } = e.target;
    const updatedPrice = Number(value);

    const updatedOfflineSlots = data.offlineSlots.map((slot) => ({
      ...slot,
      doctorCharge: updatedPrice,
    }));

    const updatedOnlineSlots = data.onlineSlots.map((slot) => ({
      ...slot,
      doctorCharge: updatedPrice,
    }));

    setData((prev) => ({
      ...prev,
      offlineSlots: updatedOfflineSlots,
      onlineSlots: updatedOnlineSlots,
    }));
  };

  // Handle form submission and console log form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setData((prev) => ({
    //   ...prev,
    //   selectSlotDuration: prev.selectSlotDuration, // Don't split the value, use as is
    // }));
    console.log(data);

    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    try {
      const res = await axios.post("https://api.assetorix.com/ah/api/v1/dc/doctor/availbility", {
        selectDate: data.selectDate,
        selectSlotDuration: data.selectSlotDuration,
        visitingMode: data.visitingMode,
        offlineSlots: data.offlineSlots,
        onlineSlots: data.onlineSlots,
        availableTimeFrom: data.availableTimeFrom,
        availableTimeTo: data.availableTimeTo,
        doctorId: data.doctorId
      },
        {
          headers: {
            "authorization": `Bearer ${token}`,
            "id": id
          }
        }

      )
      console.log("result", res.data);
    } catch (error) {
      setErrorShow(true)
      toast.success(error.message, {
        position: "top-right",
      });


    }
  };


  // Submit function
  function Submit() {
    const updatedPrice = Number(PriceData); // Convert PriceData to a number

    const updatedOfflineSlots = data.offlineSlots.map(slot => ({
      ...slot,
      doctorCharge: updatedPrice,
    }));

    const updatedOnlineSlots = data.onlineSlots.map(slot => ({
      ...slot,
      doctorCharge: updatedPrice,
    }));

    setData((prevData) => ({
      ...prevData,
      offlineSlots: updatedOfflineSlots,
      onlineSlots: updatedOnlineSlots,
    }));
  }

  // Rest of your component code...


  //Edit Function

  const handleEditSlot = (type, index) => {
    const slot = type === 'offline' ? data.offlineSlots[index] : data.onlineSlots[index];
    setEditingSlot({ type, index });
    setPriceData(slot.doctorCharge); // Set initial doctorCharge for the input
    setData((prev) => ({
      ...prev,
      editingStartTime: slot.startTime,
      editingEndTime: slot.endTime,
    }));
  };


  const handleSaveSlot = () => {
    const updatedSlot = {
      startTime: data.editingStartTime,
      endTime: data.editingEndTime,
      doctorCharge: Number(PriceData),
    };

    setData((prev) => {
      const updatedSlots = prev[editingSlot.type + 'Slots'].map((slot, index) =>
        index === editingSlot.index ? updatedSlot : slot
      );

      return {
        ...prev,
        [editingSlot.type + 'Slots']: updatedSlots,
      };
    });

    setEditingSlot(null); // Reset editing state
  };


  const handleOfflineDeleteSlot = (index) => {
    setData((prev) => ({
      ...prev,
      offlineSlots: prev.offlineSlots.filter((_, i) => i !== index),
    }));
  };


  const handleOnlineDeleteSlot = (index) => {
    setData((prev) => ({
      ...prev,
      onlineSlots: prev.onlineSlots.filter((_, i) => i !== index),
    }));
  };
  return (
    <div className="bg-[#E1EAEF]">
      <TopHeader />
      <Navbar />
      <div className="relative max-w-[1200px] shadow-md shadow-[#00768A]  mx-auto flex flex-col lg:flex-row  mb-20 mt-10">
        {/* Image Section */}
        <div className="lg:w-1/2  h-min w-full  sticky top-0 hidden lg:block">
          <img
            className="w-[100%] h-[80%] mx-auto object-cover  shadow-lg"
            src="./doctor-gloves.jpg"
            alt="Doctor with gloves"
          />
        </div>

        {/* Form Section */}
        <div className="lg:w-1/2 w-full mx-auto p-5 border  shadow-lg bg-white ">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">
            Appointment Creation
          </h2>

          <form onSubmit={handleSubmit}>
            {/* Visiting Mode */}
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold mb-2">
                Select Visiting Mode
              </label>
              <select
                onChange={handleChange}
                name="visitingMode"
                required
                value={data.visitingMode}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4BAAB3]-500 transition duration-300"
              >
                <option value="">Select Visiting Mode</option>
                <option value="offline">Offline</option>
                <option value="online">Online</option>
                <option value="both">Both</option>
              </select>
            </div>

            {/* Date Field */}
            <div className="mb-6">
              <label className="block text-gray-600 font-semibold mb-2">
                Date
              </label>
              <input
                type="date"
                onChange={handleChange}
                required
                name="selectDate"
                value={data.selectDate}
                className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4BAAB3]-500 transition duration-300"
              />
            </div>

            {/* Time Fields */}
            <div className="mb-6 flex gap-4">
              <div className="w-1/2">
                <label className="block text-gray-600 font-semibold mb-2">From</label>
                <input
                  type="time"
                  required
                  onChange={handleChange}
                  name="availableTimeFrom"
                  value={data.availableTimeFrom}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4BAAB3]-500 transition duration-300"
                />
              </div>
              <div className="w-1/2">
                <label className="block text-gray-600 font-semibold mb-2">To</label>
                <input
                  type="time"
                  required
                  onChange={handleChange}
                  name="availableTimeTo"
                  value={data.availableTimeTo}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4BAAB3]-500 transition duration-300"
                />
              </div>
            </div>

            {/* Slot Duration and Price */}
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              <div className="w-full">
                <label className="block text-gray-600 font-semibold mb-2">
                  Select Slot Duration (minutes)
                </label>
                <input
                  type="number"
                  required
                  onChange={handleChange}
                  name="selectSlotDuration"
                  value={data.selectSlotDuration}
                  className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4BAAB3]-500 transition duration-300"
                />
              </div>

              {/* Bulk Price */}
              {(data.offlineSlots.length > 0 || data.onlineSlots.length > 0) && (
                <div className="w-full">
                  <label className="block text-gray-600 font-semibold mb-2">
                    Bulk Set Price
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      required
                      onChange={(e) => setPriceData(e.target.value)}
                      value={PriceData}
                      placeholder="Set price"
                      className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4BAAB3]-500 transition duration-300"
                    />
                    <button
                      onClick={Submit}
                      className="bg-[#4BAAB3] text-white font-semibold py-2 px-4 rounded-md hover:bg-[#3A8C8E] transition duration-300"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Generate Slots Button */}
            <button
              onClick={generateSlots}
              type="button"
              className="w-full bg-[#49A6AF] text-white py-3 rounded-md shadow-md transition-all hover:bg-[#3A8C8E]"
            >
              Generate Slots
            </button>

            {/* Slots Display */}
            <div className="mt-6">
              {/* Offline Slots */}
              {data.offlineSlots.length > 0 && data.visitingMode !== "online" && (
                <div>
                  <h2 className="font-bold text-gray-700 mb-4">Offline Slots</h2>
                  {data.offlineSlots.map((slot, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      {editingSlot?.type === "offline" && editingSlot.index === index ? (
                        <>
                          <input
                            type="time"
                            value={data.editingStartTime}
                            onChange={(e) =>
                              setData((prev) => ({ ...prev, editingStartTime: e.target.value }))
                            }
                            className="border p-2 rounded-md"
                          />
                          <input
                            type="time"
                            value={data.editingEndTime}
                            onChange={(e) =>
                              setData((prev) => ({ ...prev, editingEndTime: e.target.value }))
                            }
                            className="border p-2 rounded-md"
                          />
                          <input
                            type="number"
                            value={PriceData}
                            onChange={(e) => setPriceData(e.target.value)}
                            className="border p-2 rounded-md"
                          />
                          <button
                            onClick={handleSaveSlot}
                            className="ml-2 bg-green-500 text-white p-2 rounded-md"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="text-gray-600">{`${slot.startTime} - ${slot.endTime}`}</div>
                          <div className="text-gray-600">Price: {slot.doctorCharge}</div>
                          <FaEdit onClick={() => handleEditSlot("offline", index)} className="text-blue-500 cursor-pointer" />
                          <MdDelete onClick={() => handleOfflineDeleteSlot(index)} className="text-red-500 cursor-pointer" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Online Slots */}
              {data.onlineSlots.length > 0 && data.visitingMode !== "offline" && (
                <div>
                  <h2 className="font-bold text-gray-700 mb-4">Online Slots</h2>
                  {data.onlineSlots.map((slot, index) => (
                    <div key={index} className="flex justify-between items-center mb-2">
                      {editingSlot?.type === "online" && editingSlot.index === index ? (
                        <>
                          <input
                            type="time"
                            value={data.editingStartTime}
                            onChange={(e) =>
                              setData((prev) => ({ ...prev, editingStartTime: e.target.value }))
                            }
                            className="border p-2 rounded-md"
                          />
                          <input
                            type="time"
                            value={data.editingEndTime}
                            onChange={(e) =>
                              setData((prev) => ({ ...prev, editingEndTime: e.target.value }))
                            }
                            className="border p-2 rounded-md"
                          />
                          <input
                            type="number"
                            value={PriceData}
                            onChange={(e) => setPriceData(e.target.value)}
                            className="border p-2 rounded-md"
                          />
                          <button
                            onClick={handleSaveSlot}
                            className="ml-2 bg-green-500 text-white p-2 rounded-md"
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <div className="text-gray-600">{`${slot.startTime} - ${slot.endTime}`}</div>
                          <div className="text-gray-600">Price: {slot.doctorCharge}</div>
                          <FaEdit onClick={() => handleEditSlot("online", index)} className="text-blue-500 cursor-pointer" />
                          <MdDelete onClick={() => handleOnlineDeleteSlot(index)} className="text-red-500 cursor-pointer" />
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {data.offlineSlots.length > 0 || data.onlineSlots.length > 0 ? (
              <button
                type="submit"
                className="w-full bg-[#00768A] font-semibold shadow-md text-white py-2 px-4 rounded-md mt-5"
              >
                Submit
              </button>
            ) : null}
          </form>
        </div>
      </div>

      <Footer />
    </div>

  );
};

export default DrExam;
