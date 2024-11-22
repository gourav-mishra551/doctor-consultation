import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaPlus, FaCheckCircle } from "react-icons/fa";
import axios from "axios";
import PrescriptionUploadData from "../PrescriptionUploadData/PrescriptionUploadData";
import { RxCross1 } from "react-icons/rx";

const PrescriptionUpload = ({ onPrevious }) => {
    const [healthData, setHealthData] = useState(null); // State to store the API data
    const [error, setError] = useState(null); // State to store errors
    const [upload, setUpload] = useState(false); // State for upload toggle
    const [selectedFiles, setSelectedFiles] = useState([]); // Store selected file IDs

    // Fetch health data from API
    const getHealthData = async () => {
        try {
            const response = await axios.get("https://api.assetorix.com/ah/api/v1/health-record", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    id: localStorage.getItem("Id"),
                },
            });
            setHealthData(response.data); // Store the response data in state
        } catch (err) {
            console.error("Error fetching health data:", err);
            setError(err.message); // Store the error message
        }
    };

    // Submit selected file IDs
    const submitSelectedFiles = async () => {
        try {
            await axios.post(
                "https://api.assetorix.com/ah/api/v1/dc/user/booking",
                { fileIds: selectedFiles },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        id: localStorage.getItem("Id"),
                    },
                }
            );
            alert("Files submitted successfully!");
        } catch (err) {
            console.error("Error submitting files:", err);
            alert("Error submitting files.");
        }
    };

    // Handle file selection
    const toggleFileSelection = (fileId) => {
        setSelectedFiles((prevSelected) =>
            prevSelected.includes(fileId)
                ? prevSelected.filter((id) => id !== fileId)
                : [...prevSelected, fileId]
        );
    };

    useEffect(() => {
        getHealthData();
    }, [upload]);

    return (
        <div className="md:w-[60vw] w-[95%] mx-auto p-6 bg-white shadow-lg rounded-lg bg-gradient-to-r from-[#E3FDFD] via-[#fcfcfc] to-[#87dce7]">
            <div className="flex justify-between items-center mb-4">
                <button
                    onClick={onPrevious}
                    className="flex items-center text-blue-500 hover:text-blue-700"
                >
                    <FaArrowLeft className="mr-2" />
                    Back
                </button>
                <button
                    onClick={() => setUpload(true)}
                    className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    <FaPlus className="mr-2" />
                    Add Data
                </button>
            </div>

            <h1 className="text-center text-lg font-semibold uppercase mb-6">
                Share Your Health Record with Doctor
            </h1>
            <div className="flex flex-wrap justify-between">
                {healthData?.data?.length > 0 ? (
                    healthData.data.map((data) => (
                        <div
                            key={data?._id}
                            className={`relative md:w-[46%] p-4 mb-4 border rounded-lg cursor-pointer ${selectedFiles.includes(data._id) ? "bg-blue-100" : "bg-white"
                                }`}
                            onClick={() => toggleFileSelection(data._id)}
                        >
                            <h2 className="text-lg font-medium">File: {data?.title}</h2>
                            <h3 className="text-sm">Disease: {data?.disease}</h3>
                            <h3 className="text-sm">Doctor: {data?.doctorName}</h3>
                            <div className="mt-2">
                                <iframe
                                    src={data?.fileURL}
                                    frameBorder="0"
                                    className="w-full h-40"
                                ></iframe>
                            </div>
                            {selectedFiles.includes(data._id) && (
                                <FaCheckCircle className="absolute top-2 right-2 text-green-500 text-xl" />
                            )}
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-500">
                        {error ? `Error: ${error}` : "No health records found."}
                    </p>
                )}
            </div>

            {upload && (
                <div className="mt-6 relative">
                    <PrescriptionUploadData upload={setUpload} />
                    <RxCross1 onClick={ ()=>  setUpload(false)} className="absolute top-10 z-50 right-1 bg-red-600 text-white rounded-full p-1 text-2xl cursor-pointer" />
                </div>
            )}

            <button
                onClick={submitSelectedFiles}
                className="mt-6 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700 block mx-auto"
                disabled={selectedFiles.length === 0}
            >
                Submit Selected Files
            </button>
        </div>
    );
};

export default PrescriptionUpload;
