import React, { useState } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";

const PrescriptionUpload = ({ onNext, onPrevious }) => {
    const [files, setFiles] = useState([]);
    const [step, setStep] = useState(1);
    const [title, setDocumentName] = useState(''); // Capture document name
    const [doctorName , setDoctorName] = useState(''); // Capture
    const [disease , setDisease] = useState(''); // Capture
    const [typeOfRecord, setTypeOfRecord] = useState('Hospital Bill'); // Capture type of record

    // Handle file selection
    const handleFileChange = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const updatedFiles = selectedFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
    };

    const handleNextStep = () => {
        if (step === 1) setStep(2);
    };

    const handlePrevStep = () => {
        if (step === 2) setStep(1);
    };
    // Remove a file
    const removeFile = (index) => {
        setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    // Submit files
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        files.forEach(({ file }) => formData.append("files", file));

        try {
            const response = await axios.post("https://your-backend-url.com/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            alert("Files uploaded successfully!");
        } catch (error) {
            console.error("Error uploading files:", error);
            alert("Failed to upload files.");
        }
    };
    return (
        <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h1 className="text-lg font-semibold text-gray-700 mb-4">Upload Files</h1>
            <div className="max-w-2xl mx-auto p-6 shadow-lg rounded-3xl" style={{ backgroundColor: "rgb(240, 248, 247)" }}>
                    {/* Step 1: Document Information */}
                    {step === 1 && (
                        <div>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                                STEP 1: DOCUMENT INFORMATION
                            </h2>
                            <input
                                className="border p-2 rounded-md block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border-gray-300 focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={title}
                                onChange={(e) => setDocumentName(e.target.value)} // Update document name state
                            />
                          
                            <input
                                className="border p-2 rounded-md block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border-gray-300 focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                                type="text"
                                placeholder="Name of your doctor"
                                name="doctorName"
                                value={doctorName}
                                onChange={(e) => setDoctorName(e.target.value)} // Update document name state
                            />

                            <input
                                className="border p-2 rounded-md block w-full px-4 py-2 mb-4 text-gray-700 placeholder-gray-400 bg-white border-gray-300 focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                                type="text"
                                placeholder="Name of your disease"
                                name="disease"
                                value={disease}
                                onChange={(e) => setDisease(e.target.value)} // Update document name state
                            />
                            <select
                                className="border p-2 rounded-md block w-full px-4 py-2 mb-6 text-gray-700 bg-white border-gray-300 focus:border-blue-400 focus:ring-[#1c8e81] focus:outline-none focus:ring focus:ring-opacity-40"
                                name="typeOfRecord"
                                value={typeOfRecord}
                                onChange={(e) => setTypeOfRecord(e.target.value)} // Update type of record state
                            >
                                <option value="Select Category">Select Category</option>
                                <option value="Hospital Bill">Hospital Bill</option>
                                <option value="Clinic Report">Clinic Report</option>
                                <option value="X-Ray">X-Ray</option>
                                <option value="Medical Record">Medical Record</option>
                                <option value="Prescription">Prescription</option>
                                <option value="Diet Plan">Diet Plan</option>
                                <option value="Medical Insurance">Medical Insurance</option>
                                <option value="Other">Other</option>
                            </select>

                            <button
                                onClick={handleNextStep}
                                className="block w-full bg-[#1c8e81] text-white p-2 rounded-md text-lg font-semibold hover:bg-[#176b63] transition duration-300"
                            >
                                Next
                            </button>
                        </div>
                    )}

                    {/* Step 2: Upload Documents */}
                    {step === 2 && (
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
                                STEP 2: UPLOAD DOCUMENT
                            </h2>
                           
                            <div className="flex items-center justify-center w-full h-64">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100 ">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, PDF , JPG or GIF (MAX. 50Mb)</p>
                                    </div>
                                    <input   onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>
                            <div className="flex justify-between" style={{ padding: "15px", marginTop: "25px" }}>
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="bg-gray-500 text-white p-2 rounded-md text-lg font-semibold hover:bg-gray-400 transition duration-300"
                                >
                                    Previous
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="bg-[#1c8e81] text-white p-2 rounded-md text-lg font-semibold hover:bg-[#176b63] transition duration-300"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    )}
                </div>

            {/* Preview Section */}
            <div className="mt-4 grid grid-cols-2 gap-4">
                {files.map((fileData, index) => (
                    <div
                        key={index}
                        className="relative border rounded-lg p-2 shadow-md"
                    >
                        <img
                            src={fileData.preview}
                            alt="Preview"
                            className="h-32 w-full object-cover rounded-md"
                        />
                        <button
                            onClick={() => removeFile(index)}
                            className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 text-sm"
                        >
                         <RxCross1 />
                        </button>
                    </div>
                ))}
            </div>
            <div className="mt-4">
                <button
                    onClick={onPrevious}
                    className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
                >
                    Previous
                </button>
                <button
                    onClick={onNext}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Skip / Next
                </button>
            </div>
        </div>
    )
}

export default PrescriptionUpload