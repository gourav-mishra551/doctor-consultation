import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import TimePicker from "../TimePicker/TimePicker";
import { useNavigate } from "react-router-dom";
import AllSlots from "../AllSlots/AllSlots";
const CreateSlotsByDr = () => {
  const [data, setData] = useState({
    selectDate: Date.now(),
    selectSlotDuration: [""],
    visitingMode: "",
    offlineSlots: [],
    onlineSlots: [],
    availableTimeFrom: "",
    availableTimeTo: "",
    doctorId: "",
  });
  const navigate=useNavigate()
  const [GetDrProfile, SetDrProfile] = useState({});
  const [ErrorShow, setErrorShow] = useState(false);
  const [PriceData, setPriceData] = useState("");
  const [editingSlot, setEditingSlot] = useState(null); // { type: 'offline' or 'online', index: number }
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => setIsModalOpen(false);
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
    // Case: Updating doctorCharge (convert value to number)
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
    // Case: Updating selectSlotDuration (convert string to array of strings)
    else if (name === "selectSlotDuration") {
      const updatedSlotDuration = value
        .split(",")
        .map((duration) => duration.trim());
      setData((prev) => ({
        ...prev,
        selectSlotDuration: updatedSlotDuration,
      }));
    }
    // Default Case: Updating other fields directly
    else {
      setData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  // Handle form submission and console log form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    try {
      const res = await axios.post(
        "https://api.assetorix.com/ah/api/v1/dc/doctor/availbility",
        {
          selectDate: data.selectDate,
          selectSlotDuration: data.selectSlotDuration,
          visitingMode: data.visitingMode,
          offlineSlots: data.offlineSlots,
          onlineSlots: data.onlineSlots,
          availableTimeFrom: data.availableTimeFrom,
          availableTimeTo: data.availableTimeTo,
          doctorId: data.doctorId,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      console.log(res.data.msg)
      toast.success(res.data.msg)
     navigate("/profile?section=view-slots")
    } catch (res) {
      setErrorShow(true);
      toast.error(res.response.data.msg);
    }
  };
  // Submit function
  function Submit() {
    const updatedPrice = Number(PriceData); // Convert PriceData to a number
    const updatedOfflineSlots = data.offlineSlots.map((slot) => ({
      ...slot,
      doctorCharge: updatedPrice,
    }));
    const updatedOnlineSlots = data.onlineSlots.map((slot) => ({
      ...slot,
      doctorCharge: updatedPrice,
    }));
    setData((prevData) => ({
      ...prevData,
      offlineSlots: updatedOfflineSlots,
      onlineSlots: updatedOnlineSlots,
    }));
  }
  const handleEditSlot = (type, index) => {
    const slot =
      type === "offline" ? data.offlineSlots[index] : data.onlineSlots[index];
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
      const updatedSlots = prev[editingSlot.type + "Slots"].map((slot, index) =>
        index === editingSlot.index ? updatedSlot : slot
      );

      return {
        ...prev,
        [editingSlot.type + "Slots"]: updatedSlots,
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

  const FetchGetProfile = async () => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(
        "https://api.assetorix.com/ah/api/v1/dc/doctor",
        {
          headers: {
            id: id,
            authorization: `Bearer ${token}`,
          },
        }
      );
      SetDrProfile(res.data.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  useEffect(() => {
    FetchGetProfile();
  }, []);

  const TimeInput = ({ value, onChange }) => {
    const handleTimeChange = (e) => {
      const input = e.target.value;
      if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(input)) {
        onChange(input); // Only update if the input matches HH:mm format
      }
    };

    return (
      <input
        type="text"
        value={value}
        onChange={handleTimeChange}
        placeholder="HH:mm"
        className="border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4BAAB3]-500 transition duration-300"
      />
    );
  };

  return (
    <div className="relative sm:max-w-[1200px] w-[100%] shadow-md mx-auto flex flex-col lg:flex-row  mb-20 mt-10">
      {/* Form Section */}
      <div className="lg:w-full w-full mx-auto p-5 border  shadow-lg bg-white ">
        <h2 className="sm:text-4xl sm:font-extrabold font-semibold text-center mb-8 text-[#00768A]">
          Appointment Creation
        </h2>
        {(data.visitingMode === "offline" || data.visitingMode === "both") &&
          (GetDrProfile.hospitalName === "" ||
            GetDrProfile.clinicHospitalAddress?.permanentAddress === "" ||
            GetDrProfile.clinicHospitalAddress?.city === "") && (
            isModalOpen && (
              <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
                <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
                  <div className="text-center">
                    <img
                      src="https://via.placeholder.com/150" // Replace with your image URL
                      alt="warning"
                      className="mx-auto mb-4"
                    />
                    <p className="text-red-600 text-lg">
                      You haven't added your hospital/clinic details. Please add it first.
                    </p>
                    <div className="mt-4">
                      <button
                        onClick={closeModal}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
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
              max={new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().split("T")[0]}
              min={new Date().toISOString().split("T")[0]} // Set minimum date to today
             
              className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4BAAB3]-500 transition duration-300"
            />
          </div>
          {/* Time Fields */}
          <div className="mb-6 flex gap-4">
            <div className="w-1/2">
             
              <TimePicker
                label="From"
                value={data.availableTimeFrom}
                onChange={(value) =>
                  setData((prev) => ({ ...prev, availableTimeFrom: value }))
                }
              />
            </div>
            <div className="w-1/2">
             
              <TimePicker
                label="To"
                value={data.availableTimeTo}
                onChange={(value) =>
                  setData((prev) => ({ ...prev, availableTimeTo: value }))
                }
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
                step="1"
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
                    autoFocus="On"
                    value={PriceData}
                    placeholder="Set price"
                    className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-[#4BAAB3]-500 transition duration-300"
                  />
                  <button
                    onClick={Submit}
                    type="button"
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
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    {editingSlot?.type === "offline" &&
                      editingSlot.index === index ? (
                      <>
                        <input
                          type="time"
                          value={data.editingStartTime}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              editingStartTime: e.target.value,
                            }))
                          }
                          className="border p-2 rounded-md"
                        />
                        <input
                          type="time"
                          value={data.editingEndTime}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              editingEndTime: e.target.value,
                            }))
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
                        <div className="text-gray-600">
                          Price: {slot.doctorCharge}
                        </div>
                        <FaEdit
                          onClick={() => handleEditSlot("offline", index)}
                          className="text-blue-500 cursor-pointer"
                        />
                        <MdDelete
                          onClick={() => handleOfflineDeleteSlot(index)}
                          className="text-red-500 cursor-pointer"
                        />
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
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    {editingSlot?.type === "online" &&
                      editingSlot.index === index ? (
                      <>
                        <input
                          type="time"
                          value={data.editingStartTime}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              editingStartTime: e.target.value,
                            }))
                          }
                          className="border p-2 rounded-md"
                        />
                        <input
                          type="time"
                          value={data.editingEndTime}
                          onChange={(e) =>
                            setData((prev) => ({
                              ...prev,
                              editingEndTime: e.target.value,
                            }))
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
                        <div className="text-gray-600">
                          Price: {slot.doctorCharge}
                        </div>
                        <FaEdit
                          onClick={() => handleEditSlot("online", index)}
                          className="text-blue-500 cursor-pointer"
                        />
                        <MdDelete
                          onClick={() => handleOnlineDeleteSlot(index)}
                          className="text-red-500 cursor-pointer"
                        />
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
  );
};

export default CreateSlotsByDr;
