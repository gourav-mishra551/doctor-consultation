import { useState } from "react";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
  const [ErrorShow,setErrorShow]=useState(false)
  const [Error,setError]=useState('')
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
  const handleSubmit = async(e) => {
    e.preventDefault();
    // setData((prev) => ({
    //   ...prev,
    //   selectSlotDuration: prev.selectSlotDuration, // Don't split the value, use as is
    // }));
    console.log(data);
    
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");
    try {
      const res=await axios.post("https://api.assetorix.com/ah/api/v1/dc/doctor/availbility",{
        selectDate:data.selectDate,
        selectSlotDuration:data.selectSlotDuration,
        visitingMode:data.visitingMode,
        offlineSlots:data.offlineSlots,
        onlineSlots:data.onlineSlots,
        availableTimeFrom:data.availableTimeFrom,
        availableTimeTo:data.availableTimeTo,
        doctorId:data.doctorId
      },
      {
        headers:{
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
    <div className="sm:w-[650px] mx-auto p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-2xl font-bold text-center mb-5">
        Appointment Creation
      </h2>
    
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Select Visiting Mode
          </label>
          <select
            onChange={handleChange}
            name="visitingMode"
            required
            value={data.visitingMode}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500"
          >
            <option value="">Select Visiting Mode</option>
            <option value="offline">offline</option>
            <option value="online">online</option>
            <option value="both">both</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">
            Date:
          </label>
          <input
            type="date"
            onChange={handleChange}
            required
            name="selectDate"
            value={data.selectDate}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500"
          />
        </div>

        <div className="mb-4 rounded-md flex justify-between">
          <div className="flex-1 mr-2">
            <label className="block text-gray-700 font-semibold mb-2">
              From:
            </label>
            <input
              type="time"
              required
              onChange={handleChange}
              name="availableTimeFrom"
              value={data.availableTimeFrom}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500"
            />
          </div>
          <div className="flex-1 ml-2">
            <label className="block text-gray-700 font-semibold mb-2">
              To:
            </label>
            <input
              required
              type="time"
              onChange={handleChange}
              name="availableTimeTo"
              value={data.availableTimeTo}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500"
            />
          </div>
        </div>

        <div className="mb-4 flex justify-between">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Select Slot Duration (minutes){" "}
            </label>
            <input
              required
              type="number"
              onChange={handleChange}
              name="selectSlotDuration"
              value={data.selectSlotDuration}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500"
            />
          </div>
          <div>
            {data.offlineSlots.length > 0 || data.onlineSlots.length > 0 ? (
              <>
                <label className="block text-gray-700 font-semibold mb-2">
                  Bulk Set Price
                </label>
                <div flex flex-col>
                  <input
                    type="number"
                    required
                    onChange={(e) => {
                      const value = e.target.value;
                      setPriceData(value); // Update PriceData

                    }}
                    value={PriceData}
                    name="Price"

                    placeholder="Set price for all slots"
                    className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500"
                  />
                  <button onClick={Submit} className="mt-2 w-[100px] bg-[#4BAAB3] text-white font-semibold py-2 rounded-md shadow-md hover:bg-[#3A8C8E] focus:outline-none focus:ring-2 focus:ring-[#4BAAB3] focus:ring-opacity-50 transition duration-200">Apply</button>
                </div>
              </>
            ) : null}
          </div>
        </div>

        <button
          onClick={generateSlots}
          type="button"
          className="w-full text-white py-2 px-4 rounded-md transition-all border-none"
          style={{ backgroundColor: "#49A6AF" }}
        >
          Generate Slots
        </button>

        <div className="mt-4">
          {data.offlineSlots.length > 0 && data.visitingMode !== "online" ? (
            <div>
              <h2 className="font-bold mb-2">Offline Slots</h2>
              {data.offlineSlots.map((slot, index) => (
                <div key={index} className="flex justify-around">
                  {editingSlot?.type === 'offline' && editingSlot.index === index ? (
                    <>
                      <input
                        type="time"
                        value={data.editingStartTime}
                        onChange={(e) => setData((prev) => ({ ...prev, editingStartTime: e.target.value }))}
                      />
                      <input
                        type="time"
                        value={data.editingEndTime}
                        onChange={(e) => setData((prev) => ({ ...prev, editingEndTime: e.target.value }))}
                      />
                      <input
                        type="number"
                        value={PriceData}
                        onChange={(e) => setPriceData(e.target.value)}
                      />
                      <button onClick={handleSaveSlot}>Save</button>
                    </>
                  ) : (
                    <>
                      <div>{`${slot.startTime} - ${slot.endTime}`}</div>
                      <div>Price: {slot.doctorCharge}</div>
                      <FaEdit onClick={() => handleEditSlot('offline', index)} style={{ cursor: 'pointer' }} />
                      <MdDelete onClick={() => handleOfflineDeleteSlot(index)} style={{ cursor: 'pointer' }} />
                    </>
                  )}
                </div>
              ))}
            </div>
          ) : null}

          {data.onlineSlots.length > 0 && data.visitingMode !== "offline" ? (
            <div>
              <h2 className="font-bold mb-2">Online Slots</h2>
              {data.onlineSlots.map((slot, index) => (
                <div key={index} className="flex justify-around">
                  {editingSlot?.type === 'online' && editingSlot.index === index ? (
                    <>
                      <input
                        type="time"
                        value={data.editingStartTime}
                        onChange={(e) => setData((prev) => ({ ...prev, editingStartTime: e.target.value }))}
                      />
                      <input
                        type="time"
                        value={data.editingEndTime}
                        onChange={(e) => setData((prev) => ({ ...prev, editingEndTime: e.target.value }))}
                      />
                      <input
                        type="number"
                        value={PriceData}
                        onChange={(e) => setPriceData(e.target.value)}
                      />
                      <button onClick={handleSaveSlot}>Save</button>
                    </>
                  ) : (
                    <>
                      <div>{`${slot.startTime} - ${slot.endTime}`}</div>
                      <div>Price: {slot.doctorCharge}</div>
                      <FaEdit onClick={() => handleEditSlot('online', index)} style={{ cursor: 'pointer' }} />
                      <MdDelete onClick={() => handleOnlineDeleteSlot(index)} style={{ cursor: 'pointer' }} />
                    </>
                  )}
                </div>
              ))}

            </div>
          ) : null}
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md mt-5"
        >
          Submit
        </button>
      </form>
      <ToastContainer />
    </div>
   
  );
};

export default DrExam;
