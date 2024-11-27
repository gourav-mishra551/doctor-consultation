import React, { useState } from 'react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function DrAppointmentCreation() {
    const [Price , setPrice]  = useState('')
    const [data, setData] = useState({
        visitingMode: '',
        selectDate: '',
        availableTimeFrom: '',
        availableTimeTo: '',
        selectSlotDuration: '',
        Durations: [],
        Price: '',
        offlineSlots: [{ startTime: '', endTime: '', doctorCharge: Price }],
        onlineSlots: [{ startTime: '', endTime: '', doctorCharge: Price }],
    });

    const [generatedPrices, setGeneratedPrices] = useState([]);

    const [generatedPrice, setGeneratedPrice] = useState('');  // Store the generated price
    const [editSlotIndex, setEditSlotIndex] = useState(null);  // Track the index of the slot being edited (both online/offline)
    const [isEditingOnline, setIsEditingOnline] = useState(false); // Track if we're editing online or offline slot
    const [newSlotValue, setNewSlotValue] = useState('');  // Store the updated slot value
    const [inputPrice, setInputPrice] = useState('');  // To store the value of input
    const [Error, setError] = useState(null)
    const [isEditingPrice, setIsEditingPrice] = useState(false);
    const [newPriceValue, setNewPriceValue] = useState('');
    const [newPrice, setNewPrice] = useState('')
    const [isEditingPriceSlot, setIsEditingPriceSlot] = useState(false);
    const handlePriceInputChange = (e) => {
        setInputPrice(e.target.value);  // Update input price as user types
    };

    const applyPriceToSlot = (index, isOnline) => {
        const updatedPrices = [...generatedPrices];
        updatedPrices[index] = inputPrice; // Update the price at the corresponding index
        setGeneratedPrices(updatedPrices);
    };
    const handleEditSlotAndPrice = (index, isOnline) => {
        setEditSlotIndex(index);  // Set the index of the slot being edited
        setIsEditingOnline(isOnline); // Determine if we're editing an online or offline slot
        setNewSlotValue(isOnline ? data.onlineSlots[index] : data.offlineSlots[index]);  // Set the value of the slot being edited
        setNewPriceValue(generatedPrices[index]); // Set the current price for editing
        setIsEditingPriceSlot(true); // Enable editing mode for both slot and price
    };

    const HandleGeneratedPrice = () => {
        setGeneratedPrice(inputPrice);  // Set the generated price to the value entered in the input
    };

    const HandleChange = (e) => {
        const { name, value } = e.target;
        setData(prev => ({
            ...prev,
            [name]: value
        }));

    };


    const saveSlotAndPrice = async () => {
        setData((prev) => {
            const updatedSlots = isEditingOnline ? [...prev.onlineSlots] : [...prev.offlineSlots];
            updatedSlots[editSlotIndex] = newSlotValue; // Update the slot

            const updatedPrices = [...generatedPrices];
            updatedPrices[editSlotIndex] = newPriceValue; // Update the price

            if (isEditingOnline) {
                return { ...prev, onlineSlots: updatedSlots };
            } else {
                return { ...prev, offlineSlots: updatedSlots };
            }
        });

        // setGeneratedPrices(updatedPrices); // Save the updated prices
        // Clear editing states
        setEditSlotIndex(null);
        setNewSlotValue('');
        setNewPriceValue('');
        setIsEditingPriceSlot(false);
        const Token = localStorage.getItem('token')
        const id = localStorage.getItem('id')
        // Use the latest state after the updates
        try {
            const requestData = {
                visitingMode: data.visitingMode,
                selectDate: data.selectDate,
                availableTimeFrom: data.availableTimeFrom,
                availableTimeTo: data.availableTimeTo,
                selectSlotDuration: data.selectSlotDuration,
                Durations: data.Durations,
                Price: data.Price,  // Make sure you are using the updated price
                offlineSlots: data.offlineSlots,
                onlineSlots: data.onlineSlots
            };

            const response = await fetch("https://api.assetorix.com/ah/api/v1/dc/doctor/availbility", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${Token}`,
                    "id": `${id}`
                },
                body: JSON.stringify(requestData)  // Send the requestData in the body
            });

            const result = await response.json();  // No need to pass requestData here
         
        } catch (error) {
            console.error("Error:", error);  // Log any errors
        }
    };

    const HandleGeneratedSlots = (e) => {
        e.preventDefault();
        if (isValidDate(data.selectDate)) {
            setError(''); // Clear the error if the date is valid
            generateSlots();
        } else {
            setError('Please select a valid date (current or future).');
        }
    };

    const isValidDate = (selectDate) => {
        const selectedDate = new Date(selectDate).setHours(0, 0, 0, 0); // Normalize to 00:00:00
        const currentDate = new Date().setHours(0, 0, 0, 0); // Normalize to 00:00:00
        return selectedDate >= currentDate;
    };

    const generateSlots = () => {
        const { availableTimeFrom, availableTimeTo, selectSlotDuration, visitingMode } = data;

        if (!availableTimeFrom || !availableTimeTo || !selectSlotDuration) {
            setError("Please fill all fields to generate time slots.");
            return;
        }

        const startTime = new Date(`${data.selectDate}T${availableTimeFrom}:00`);
        const endTime = new Date(`${data.selectDate}T${availableTimeTo}:00`);
        const slotDuration = parseInt(selectSlotDuration); // duration in minutes
        if (startTime >= endTime) {
            setError("Please select a valid time. 'From' time cannot be greater than 'To' time.");
            return; // Stop execution if the times are invalid
        }

        const slots = [];
        let currentTime = startTime;

        while (currentTime < endTime) {
            const nextSlot = new Date(currentTime.getTime() + slotDuration * 60000); // Adding slot duration in milliseconds
            if (nextSlot > endTime) break;

            const slotStart = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            const slotEnd = nextSlot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            slots.push({ startTime: slotStart, endTime: slotEnd });  // Corrected this line

            currentTime = nextSlot;
        }

        // Save slots based on visiting mode
        if (visitingMode === "Online") {
            setData((prev) => ({
                ...prev,
                onlineSlots: slots,
                offlineSlots: [],
            }));
        } else if (visitingMode === "Offline") {
            setData((prev) => ({
                ...prev,
                offlineSlots: slots,
                onlineSlots: [],
            }));
        } else {
            // For "Both" or other modes, save to both online and offline slots
            setData((prev) => ({
                ...prev,
                onlineSlots: slots,
                offlineSlots: slots
            }));
        }
        setError('');
    };

    // Handle editing the slot (both online and offline)
    const handleEditSlot = (index, isOnline) => {
        setEditSlotIndex(index);  // Set the index of the slot being edited
        setIsEditingOnline(isOnline); // Determine if we're editing an online or offline slot
        setNewSlotValue(isOnline ? data.onlineSlots[index] : data.offlineSlots[index]);  // Set the value of the slot being edited
    };

    // Save the edited slot (both online and offline)
    const saveSlot = () => {
        setData((prev) => {
            if (isEditingOnline) {
                const updatedOnlineSlots = [...prev.onlineSlots];
                updatedOnlineSlots[editSlotIndex] = newSlotValue; // Update the edited online slot
                return { ...prev, onlineSlots: updatedOnlineSlots };
            } else {
                const updatedOfflineSlots = [...prev.offlineSlots];
                updatedOfflineSlots[editSlotIndex] = newSlotValue; // Update the edited offline slot
                return { ...prev, offlineSlots: updatedOfflineSlots };
            }
        });
        setEditSlotIndex(null);  // Clear the edit state after saving
        setNewSlotValue('');  // Reset the input value
    };

    // Handle deleting the slot (both online and offline)
    const handleDeleteSlot = (index, isOnline) => {
        setData((prev) => {
            if (isOnline) {
                return {
                    ...prev,
                    onlineSlots: prev.onlineSlots.filter((_, i) => i !== index) // Remove the online slot by filtering
                };
            } else {
                return {
                    ...prev,
                    offlineSlots: prev.offlineSlots.filter((_, i) => i !== index) // Remove the offline slot by filtering
                };
            }
        });
    };


    // Handle editing the price
    const handleEditPrice = () => {
        setIsEditingPrice(true);  // Enable price editing
        setNewPriceValue(generatedPrice);  // Set the value to current price
    };

    // Save the edited price
    const savePrice = () => {
        setGeneratedPrice(newPriceValue);  // Update the price with the new value
        setIsEditingPrice(false);  // Disable price editing mode
    };



    const HandleSubmit = async () => {

    }




    return (
        <div className="sm:w-[650px] mx-auto p-5 border rounded-lg shadow-lg bg-white">
            <h2 className="text-2xl font-bold text-center mb-5">Appointment Creation</h2>
            <form onSubmit={HandleGeneratedSlots}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Select Visiting Mode</label>
                    <select onChange={HandleChange} name="visitingMode" className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500">
                        <option>Select Visiting Mode</option>
                        <option value="offline">offline</option>
                        <option value="online">online</option>
                        <option value="both">both</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 font-semibold mb-2">Date:</label>
                    <input type='date' name='selectDate' onChange={HandleChange} className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500" />
                </div>

                <div className="mb-4 rounded-md flex justify-between" >
                    <div className="flex-1 mr-2">
                        <label className="block text-gray-700 font-semibold mb-2">From:</label>
                        <input onChange={HandleChange} name='availableTimeFrom' type='time' className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500" />

                    </div>
                    <div className="flex-1 ml-2">
                        <label className="block text-gray-700 font-semibold mb-2">To:</label>
                        <input onChange={HandleChange} type='time' name='availableTimeTo' className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500" />
                    </div>

                </div>
                <div className="mb-[20px]" style={{ color: "red" }}>{Error ? <p>{Error}</p> : null}</div>

                <div className="mb-4 flex justify-between">
                    <div>
                        <label className="block text-gray-700 font-semibold mb-2">Select Slot Duration (minutes) </label>
                        <input type='number' onChange={HandleChange} name='selectSlotDuration' className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500" />
                    </div>
                    <div>
                        {data.offlineSlots.length === 0 && data.onlineSlots.length === 0 ? null : (
                            <>
                                <label className="block text-gray-700 font-semibold mb-2">Price</label>
                                <div className="relative">
                                    <input
                                        value="Price"
                                        onChange={HandleChange}
                                        className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-[#4BAAB3]-500"
                                        type="number"
                                    />
                                    <button
                                        onClick={(e) => setData(e.target.value)}
                                        className="absolute top-0 right-0 px-2 py-1 text-white rounded-r-md hover:bg-[#4BAAB3]-600 focus:outline-none"
                                        style={{ height: "41px", backgroundColor: "#4BAAB3" }}
                                    >
                                        Apply
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>

                <button type='submit' className="w-full  text-white py-2 px-4 rounded-md transition-all border-none" style={{ backgroundColor: "#49A6AF" }}>
                    Generate Slots
                </button>
            </form>

            <div className="mt-4">
                {data.visitingMode === 'offline' || data.visitingMode === 'both' ? (
                    <>
                        <h2 className="font-bold mb-2">Offline Slots</h2>
                        {data.offlineSlots.length > 0 ? (
                            <ul className="space-y-2">
                                {data.offlineSlots.map((slot, index) => (
                                    <li key={index} className="flex justify-between items-center border rounded-lg px-4 py-2">
                                        {editSlotIndex === index && !isEditingOnline && isEditingPriceSlot ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={newSlotValue}
                                                    onChange={(e) => setNewSlotValue(e.target.value)}
                                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-500"
                                                />
                                                <input
                                                    type="number"
                                                    value={newPriceValue}
                                                    onChange={(e) => setNewPriceValue(e.target.value)}
                                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-500 ml-4"
                                                />
                                                <button
                                                    onClick={saveSlotAndPrice}
                                                    className="ml-2 text-green-500"
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    {`Start Time: ${slot.startTime || 'N/A'}, End Time: ${slot.endTime || 'N/A'}, Charge: ${slot.doctorCharge || 0}`}
                                                </span>
                                                {generatedPrice && (
                                                    <div className="mt-0 p-2 rounded-[5px]" style={{ border: "1px dashed gray" }}>
                                                        <h5 className="font-semibold">Price: {generatedPrice}</h5>
                                                    </div>
                                                )}
                                                <div className='flex'>
                                                    <CiEdit className="mr-2 cursor-pointer text-xl text-blue-500" onClick={() => handleEditSlotAndPrice(index, false)} />
                                                    <MdDelete className="text-xl cursor-pointer text-red-500" onClick={() => handleDeleteSlot(index, false)} />
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-red-500">No offline slots available.</p>
                        )}
                    </>
                ) : null}

                {data.visitingMode === 'online' || data.visitingMode === 'both' ? (
                    <>
                        <h2 className="font-bold mb-2 mt-4">Online Slots</h2>
                        {data.onlineSlots.length > 0 ? (
                            <ul className="space-y-2">
                                {data.onlineSlots.map((slot, index) => (
                                    <li key={index} className="flex justify-between items-center border rounded-lg px-4 py-2">
                                        {editSlotIndex === index && isEditingOnline && isEditingPriceSlot ? (
                                            <>
                                                <input
                                                    type="text"
                                                    value={newSlotValue}
                                                    onChange={(e) => setNewSlotValue(e.target.value)}
                                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-500"
                                                />
                                                <input
                                                    type="number"
                                                    value={newPriceValue}
                                                    onChange={(e) => setNewPriceValue(e.target.value)}
                                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-green-500 ml-4"
                                                />
                                                <button
                                                    onClick={saveSlotAndPrice}
                                                    className="ml-2 text-green-500"
                                                >
                                                    Save
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <span>
                                                    {`Start Time: ${slot.startTime || 'N/A'}, End Time: ${slot.endTime || 'N/A'}, Charge: ${slot.doctorCharge || 0}`}
                                                </span>
                                                {generatedPrice && (
                                                    <div className="mt-0 p-2 rounded-[5px]" style={{ border: "1px dashed gray" }}>
                                                        <h5 className="font-semibold">Price: {generatedPrice}</h5>
                                                    </div>
                                                )}
                                                <div className='flex'>
                                                    <CiEdit className="mr-2 cursor-pointer text-xl text-blue-500" onClick={() => handleEditSlotAndPrice(index, true)} />
                                                    <MdDelete className="text-xl cursor-pointer text-red-500" onClick={() => handleDeleteSlot(index, true)} />
                                                </div>
                                            </>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-red-500">No online slots available.</p>
                        )}
                    </>
                ) : null}
            </div>


            {
                data.offlineSlots.length === 0 && data.onlineSlots.length === 0 ? null : (
                    <button type='submit' style={{ backgroundColor: "#49A6AF" }} onClick={saveSlotAndPrice} className="w-full  text-white py-2 px-4 rounded-md transition-all mt-4">
                        Submit
                    </button>
                )
            }
        </div>
    );
}


export default DrAppointmentCreation