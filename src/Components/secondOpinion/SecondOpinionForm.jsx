import axios from "axios";
import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";

function SecondOpinionForm() {
  const [cateories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    speciality: [],
    document: [],
    reason: "",
   
  });
  useEffect(() => {
    const Name = localStorage.getItem("user");
    const Email = localStorage.getItem("signupemail");
    if (Name || Email) {
      setFormData((prev) => ({
        ...prev,
        name: Name,
        email: Email,
      }));
    }
  }, []);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files); // Convert FileList to an array
    setFormData((prevData) => ({
      ...prevData,
      document: [...prevData.document, ...files], // Append new files to the existing array
    }));
  };

  const removeFile = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      document: prevData.document.filter((_, i) => i !== index), // Remove file at the specified index
    }));
  };

  const renderFilePreview = (file) => {
    const fileType = file.type;
    if (fileType.startsWith("image/")) {
      return (
        <img
          src={URL.createObjectURL(file)}
          alt="Preview"
          className="w-full h-32 object-cover"
        />
      );
    } else {
      return (
        <div className="flex items-center justify-center w-full h-32 bg-gray-100 text-gray-600">
          {fileType.split("/")[1]?.toUpperCase() || "FILE"}
        </div>
      );
    }
  };

  const HandleChange = (e) => {
    const { name, value } = e.target;

    if (name === "speciality") {
      setFormData((prevState) => {
        // Check if the value is already in the array
        const updatedSpeciality = prevState[name].includes(value)
          ? prevState[name] // Keep the array unchanged if the value is already present
          : [...prevState[name], value]; // Add the new value otherwise

        return {
          ...prevState,
          [name]: updatedSpeciality,
        };
      });
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
  
    const id = localStorage.getItem("Id");
    const token = localStorage.getItem("token");
  
    try {
      const formDataToSend = new FormData();
  
      // Append non-file data to FormData
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("mobile", formData.mobile);
      formDataToSend.append("reason", formData.reason);
      formDataToSend.append("speciality", JSON.stringify(formData.speciality)); // If it's an array, you may need to stringify
  
      // Append files to FormData
      formData.document.forEach((file) => {
        formDataToSend.append("document", file);
      });
  
      const result = await axios.post(
        "https://api.assetorix.com/ah/api/v1/second-opinion/submit",
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            id,
          },
        }
      );
  
      console.log(result);
    } catch (error) {
      console.error("Error submitting the form", error);
    }
  };
  

  useEffect(() => {
    FetchCategory();
  }, []);

  const FetchCategory = async () => {
    try {
      const res = await axios.get(
        "https://api.assetorix.com/ah/api/v1/dc/user/Category"
      );
      setCategories(res.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };


  
console.log(formData.document)
  return (
    <div className="flex flex-col lg:flex-row lg:space-x-10">
      <div className="flex-grow px-6 lg:px-20 py-8 bg-white rounded-lg shadow-lg">
        <form onSubmit={HandleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Name Field */}
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="fname"
              >
                Name
              </label>
              <input
                type="text"
                id="fname"
                name="name"
                value={formData.name}
                onChange={HandleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#00768A] focus:ring-1 focus:ring-[#00768A]"
                placeholder="Enter your name"
                required
                maxLength="64"
                minLength="2"
              />
            </div>
            {/* Email Field */}
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="email"
              >
                Email ID
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={HandleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#00768A] focus:ring-1 focus:ring-[#00768A]"
                placeholder="Ex: example@gmail.com"
                maxLength="128"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Mobile Field */}
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="mobile"
              >
                Mobile No.
              </label>
              <input
                type="tel"
                name="mobile"
                id="mobile"
                value={formData.mobile}
                onChange={HandleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#00768A] focus:ring-1 focus:ring-[#00768A]"
                placeholder="Ex: 1234567890"
                maxLength="10"
                required
              />
            </div>

            {/* Speciality Dropdown */}
            <div>
              <label
                className="block text-gray-700 text-sm font-medium mb-2"
                htmlFor="speciality"
              >
                Speciality
              </label>
              <select
                name="speciality"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#00768A] focus:ring-1 focus:ring-[#00768A]"
                defaultValue=""
                onChange={HandleChange}
                required
              >
                <option value="">Select speciality</option>
                {cateories.map((ele, index) => (
                  <option key={index} value={ele.specialtyName || ""}>
                    {ele.specialtyName || "Unnamed speciality"}
                  </option>
                ))}
              </select>
              {/* Display Selected Specialities */}
              <div className="mt-2 text-gray-600 text-sm space-x-2">
                {formData.speciality.map((ele, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md"
                  >
                    {ele}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Upload Documents */}
          <div>
            <div className="flex items-center justify-center w-full h-64">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, PDF , JPG or GIF (MAX. 50Mb)
                  </p>
                </div>
                <input
                  onChange={handleFileChange}
                  id="dropzone-file"
                  type="file"
                  className="hidden"
                  multiple
                />
              </label>
            </div>

            <div className="file-previews grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
              {formData.document.map((file, index) => (
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
                    {file.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Reason for Consultation */}
          <div>
            <label
              className="block text-gray-700 text-sm font-medium mb-2"
              htmlFor="reason"
            >
              Reason for Consultation
            </label>
            <textarea
              name="reason"
              id="reason"
              rows="4"
              onChange={HandleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-[#00768A] focus:ring-1 focus:ring-[#00768A]"
              placeholder="Enter the reason for consultation"
              maxLength="500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full lg:w-auto px-6 py-3 bg-[#00768A] text-white text-sm font-medium rounded-lg shadow-md hover:bg-[#005f72] transition duration-200"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default SecondOpinionForm;
