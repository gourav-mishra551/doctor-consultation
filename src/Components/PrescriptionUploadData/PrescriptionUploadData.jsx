import React, { useState } from "react";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import toast from "react-hot-toast";

const PrescriptionUploadData = ({ upload }) => {
    const [files, setFiles] = useState([]);
    const [step, setStep] = useState(1);
    const [title, setDocumentName] = useState(''); // Capture document name
    const [doctorName, setDoctorName] = useState(''); // Capture
    const [disease, setDisease] = useState(''); // Capture
    const [typeOfRecord, setTypeOfRecord] = useState('Hospital Bill'); // Capture type of record
    // Handle file selection
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [firm, setFirm] = useState('');
    const [date, setDate] = useState('');
    const [notes, setNotes] = useState('');
    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const updatedFiles = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setSelectedFiles((prevFiles) => [...prevFiles, ...updatedFiles]);
    };

    const removeFile = (index) => {
        setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
    };

    const handleNextStep = () => {
        if (step === 1) setStep(2);
    };

    const handlePrevStep = () => {
        if (step === 2) setStep(1);
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        // Append step 1 data
        formData.append('title', title);
        formData.append('typeOfRecord', typeOfRecord);
        formData.append('doctorName', doctorName);
        formData.append('disease', disease);
        formData.append('firmName', firm);
        formData.append('recordGeneratedDate', date);
        formData.append('additionalNotes', notes);

        // Append files
        selectedFiles.forEach((fileObj) => {
            formData.append('files', fileObj.file);
        });

        try {
            const response = await fetch(`https://api.assetorix.com/ah/api/v1/health-record`, {
                method: 'POST',
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    id: localStorage.getItem("Id"),
                },
            });

            if (response.ok) {
                toast.success('Files uploaded successfully!');
                upload(false); // Call parent component's function to update the state
            } else {
                toast.error('Failed to upload files.');
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            toast.error('An error occurred while uploading files.');
        }
    };

    const renderFilePreview = (file) => {
        const fileType = file.file.type;
        if (fileType.startsWith('image/')) {
            return (
                <img
                    src={file.preview}
                    alt="Preview"
                    className="h-24 w-full object-cover mb-2 rounded"
                />
            );
        } else if (fileType === 'application/pdf') {
            return (
                <div className="flex justify-center items-center h-24 w-full bg-gray-200 mb-2 rounded">
                    <i className="fas fa-file-pdf fa-2x text-red-500"></i>
                </div>
            );
        } else {
            return (
                <div className="flex justify-center items-center h-24 w-full bg-gray-200 mb-2 rounded">
                    <i className="fas fa-file fa-2x text-gray-500"></i>
                </div>
            );
        }
    };

    return (
        <div>
            <div>
                <h1 className="text-lg font-semibold text-gray-700 mb-4">Upload Files</h1>
                <div className="max-w-2xl mx-auto  shadow-lg rounded-3xl " >
                    {/* Step 1: Document Information */}
                    {step === 1 && (
                        <div className="bg-white shadow-lg rounded-xl p-8 max-w-3xl mx-auto">
                            <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-4">
                                STEP 1: DOCUMENT INFORMATION
                            </h2>
                            <p className="text-center text-gray-600 mb-8">
                                Fill out the details below to begin documenting your record.
                            </p>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-2">
                                        Title
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1c8e81] focus:outline-none transition duration-300"
                                        type="text"
                                        placeholder="Enter the Title"
                                        name="title"
                                        value={title}
                                        onChange={(e) => setDocumentName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-2">
                                        Date of Record Creation
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1c8e81] focus:outline-none transition duration-300"
                                        type="date"
                                        name="recordGeneratedDate"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-2">
                                        Doctor's Name
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1c8e81] focus:outline-none transition duration-300"
                                        type="text"
                                        placeholder="Enter the Doctor's Name"
                                        name="doctorName"
                                        value={doctorName}
                                        onChange={(e) => setDoctorName(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-2">
                                        Disease Name
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1c8e81] focus:outline-none transition duration-300"
                                        type="text"
                                        placeholder="Enter the Disease Name"
                                        name="disease"
                                        value={disease}
                                        onChange={(e) => setDisease(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-2">
                                        Hospital, Clinic, or Firm Name
                                    </label>
                                    <input
                                        className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1c8e81] focus:outline-none transition duration-300"
                                        type="text"
                                        placeholder="Enter the Name"
                                        name="firmName"
                                        value={firm}
                                        onChange={(e) => setFirm(e.target.value)}
                                    />
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-2">
                                        Record Type
                                    </label>
                                    <select
                                        className="w-full px-4 py-3 rounded-lg text-gray-700 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1c8e81] focus:outline-none transition duration-300"
                                        name="typeOfRecord"
                                        value={typeOfRecord}
                                        onChange={(e) => setTypeOfRecord(e.target.value)}
                                    >
                                        <option value="">Select Record Type</option>
                                        <option value="Hospital Bill">Hospital Bill</option>
                                        <option value="Clinic Report">Clinic Report</option>
                                        <option value="X-Ray">X-Ray</option>
                                        <option value="Medical Record">Medical Record</option>
                                        <option value="Prescription">Prescription</option>
                                        <option value="Diet Plan">Diet Plan</option>
                                        <option value="Medical Insurance">Medical Insurance</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-lg font-medium text-gray-700 mb-2">
                                        Additional Notes <span className="text-gray-500">(Optional)</span>
                                    </label>
                                    <textarea
                                        className="w-full px-4 py-3 rounded-lg text-gray-700 placeholder-gray-400 bg-gray-50 border border-gray-300 focus:ring-2 focus:ring-[#1c8e81] focus:outline-none transition duration-300"
                                        placeholder="Add any additional information here"
                                        name="additionalNotes"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                </div>

                                <button
                                    onClick={handleNextStep}
                                    className="w-full py-3 rounded-lg text-lg font-bold text-white bg-gradient-to-r from-[#1c8e81] to-[#0f6b57] hover:from-[#176b63] hover:to-[#0d594a] transition duration-300"
                                >
                                    Next
                                </button>
                            </div>
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
                                    <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>

                            <div className="file-previews grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                                {selectedFiles.map((file, index) => (
                                    <div
                                        key={index}
                                        className="file-preview bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 relative"
                                    >
                                        {renderFilePreview(file)}
                                        <button
                                            onClick={() => removeFile(index)}
                                            className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-colors duration-300 shadow-md"
                                        >
                                            <RxCross1 />
                                        </button>
                                        <div className="px-4 py-2 text-sm text-gray-700 truncate text-center">
                                            {file.file.name}
                                        </div>
                                    </div>
                                ))}
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
                                    className="bg-[#00768A] text-white p-2 rounded-md text-lg font-semibold hover:bg-[#176b63] transition duration-300"
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

            </div>
        </div>
    )
}

export default PrescriptionUploadData