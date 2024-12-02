import React, { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import PdfGeneratorPrescription from "./PdfGeneratorPrescription/PdfGeneratorPrescription";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PrescriptionMaker = () => {
  const [showPdfGenerator, setShowPdfGenerator] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [editForm, setEditForm] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [editMedicineData, setEditMedicineData] = useState({
    medicineSelected: "",
    frequency: "",
    duration: "",
    instruction: "",
    dose: "",
  });
  const [medicineData, setMedicineData] = useState([]);
  const [formData, setFormData] = useState([
    { problems: "", observations: "", notes: "" },
  ]);
  const [medication, setMedication] = useState({
    medicineName: "",
    frequency: "",
    duration: "",
    dose: "",
    instruction: "",
  });
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [frequencySuggestions, setFrequencySuggestions] = useState([]);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const navigate = useNavigate();
  const searchBoxRef = useRef(null);
  const suggestionBoxRef = useRef(null);

  const handleAddMore = () => {
    setFormData([
      ...formData,
      { problems: "", observations: "", notes: "" }, // Add a new section
    ]);
  };

  const handleFormDataChange = (index, fieldName, value) => {
    const updatedFormData = [...formData];
    updatedFormData[index][fieldName] = value;
    setFormData(updatedFormData);
  };

  const handleMedicationChange = (e) => {
    const { name, value } = e.target;
    setMedication((prev) => ({ ...prev, [name]: value }));

    if (name === "medicineName" && value.trim()) {
      console.log("Search Query: ", value); // Log the search query
      searchProducts(value); // Trigger search
    } else if (name === "medicineName" && !value.trim()) {
      setSearchResults([]); // Clear search results if input is empty
    }
  };

  const handleAddMedication = () => {
    if (
      medication.medicineName &&
      medication.frequency &&
      medication.duration &&
      medication.instruction &&
      medication.dose
    ) {
      setMedicineData([...medicineData, medication]);
      setMedication({
        medicineName: "",
        frequency: "",
        duration: "",
        instruction: "",
        dose: "",
      });
    } else {
      alert("Please fill all medication fields.");
    }
  };

  const handleDeleteMedication = (index) => {
    setMedicineData(medicineData.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      formData,
      medicineData,
    });

    // Navigate to /pdf and pass data through state
    navigate("/pdf-genrate", {
      state: { formData, medicineData },
    });
  };

  const popupRef = useRef(null);

  const loadEditData = (data) => {
    setEditMedicineData({
      id: data.id, // Store the ID for tracking edits
      medicineName: data.medicineName,
      frequency: data.frequency,
      duration: data.duration,
      instruction: data.instruction,
      dose: data.dose,
    });
    setEditForm(true); // Open the form popup
  };

  // Close product list if clicked outside the popup or input
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setSearchTerm(""); // Clear search term
        setProducts([]); // Hide products list
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const deleteProduct = (id) => {
    setMedicineData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleDeleteFormData = (index) => {
    if (formData.length > 1) {
      const updatedFormData = formData.filter((_, i) => i !== index);
      setFormData(updatedFormData);
    }
  };

  const searchProducts = async (query) => {
    try {
      setLoading(true);
      setError("");
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/product/search`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
          params: { search: query }, // Pass the query as a parameter
        }
      );
      console.log("API Response:", response.data); // Log the response to check the structure
      setSearchResults(response.data.data); // Ensure default to an empty array
    } catch (err) {
      // setError("Failed to fetch products. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // const fetchMedicines = async (query) => {
  //   try {
  //     if (!query.trim()) {
  //       setSearchResults([]); // Clear results if the query is empty
  //       return;
  //     }
  //     setLoading(true);
  //     setError(null);

  //     const response = await axios.get(`/api/medicines?search=${query}`);
  //     console.log("API response:", response.data); // Log response to check the structure

  //     // Set search results from the 'data' key
  //     setSearchResults(response.data.data); // Accessing the 'data' property
  //   } catch (err) {
  //     console.error("Error fetching data:", err);
  //     setError("Failed to fetch medicines.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  console.log("searchResults", searchResults);

  useEffect(() => {
    if (searchTerm.trim()) {
      fetchMedicines(searchTerm); // Fetch results when the searchTerm changes
    }
  }, [searchTerm]);

  const handleClickOutside = (event) => {
    if (searchBoxRef.current && !searchBoxRef.current.contains(event.target)) {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleFocusFrequency = () => {
    const predefinedSuggestions = [
      "1-1-1",
      "1-0-0",
      "1-1-0",
      "0-1-1",
      "0-1-0",
      "0-0-1",
    ];
    setFrequencySuggestions(predefinedSuggestions);
  };

  const handleClickOutsideFreq = (event) => {
    if (
      suggestionBoxRef.current &&
      !suggestionBoxRef.current.contains(event.target)
    ) {
      setFrequencySuggestions([]); // Close suggestions
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideFreq);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideFreq);
    };
  }, []);

  return (
    <div className="bg-gray-100 p-5 sm:flex gap-5">
      {/* Left section */}
      <div className="patient-details sm:w-1/4 p-5 space-y-3 sm:shadow-xl bg-white rounded-lg">
        <p className="font-light text-2xl text-gray-800">Patient Details</p>
        <div className="space-y-1">
          <div className="flex">
            <p className="text-gray-800">Name:&nbsp;</p>
            <p className="text-gray-500">Abir Kazi</p>
          </div>
          <div className="flex">
            <p className="text-gray-800">Email:&nbsp;</p>
            <p className="text-gray-500">abirkazi@gmail.com</p>
          </div>
          <div className="flex">
            <p className="text-gray-800">Address:&nbsp;</p>
            <p className="text-gray-500">F11 Green Park Ex</p>
          </div>
        </div>

        <div className="bg-gray-300 opacity-40 h-[1px]"></div>

        <div className="space-y-1">
          <div className="flex">
            <p className="text-gray-800">Clinic Details:&nbsp;</p>
            <p className="text-gray-500">Valley Clinic</p>
          </div>
          <div className="flex">
            <p className="text-gray-800">Doctor Name:&nbsp;</p>
            <p className="text-gray-500">Ejajul Ansari</p>
          </div>
          <div className="flex">
            <p className="text-gray-800">Description:&nbsp;</p>
            <p className="text-gray-500">No record found</p>
          </div>
        </div>
      </div>

      {/* Right section */}
      <div className="prescription-detail sm:w-3/4 space-y-5 sm:mt-0 mt-5">
        <form onSubmit={handleSubmit}>
          {/* Problems, Observations, Notes */}
          {formData.map((data, index) => (
            <div
              key={index}
              className="relative flex gap-5 bg-white p-5 rounded-lg shadow-md mt-5"
            >
              {/* Delete Button */}
              {formData.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleDeleteFormData(index)}
                  className="absolute top-3 right-3 text-red-500 hover:text-red-600"
                  title="Delete Section"
                >
                  <MdDelete size={20} />
                </button>
              )}

              <div className="w-1/3">
                <p className="text-gray-800 font-semibold">Problems</p>
                <textarea
                  name={`problems-${index}`}
                  value={data.problems}
                  onChange={(e) =>
                    handleFormDataChange(index, "problems", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none min-h-[100px]"
                />
              </div>
              <div className="w-1/3">
                <p className="text-gray-800 font-semibold">Observation</p>
                <textarea
                  name={`observations-${index}`}
                  value={data.observations}
                  onChange={(e) =>
                    handleFormDataChange(index, "observations", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none min-h-[100px]"
                />
              </div>
              <div className="w-1/3">
                <p className="text-gray-800 font-semibold">Notes</p>
                <textarea
                  name={`notes-${index}`}
                  value={data.notes}
                  onChange={(e) =>
                    handleFormDataChange(index, "notes", e.target.value)
                  }
                  className="w-full border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none min-h-[100px]"
                />
              </div>
            </div>
          ))}

          <div className="text-right mt-4">
            <button
              type="button"
              onClick={handleAddMore}
              className="px-4 py-2 flex gap-1 items-center text-white rounded-md bg-[#00768A]"
            >
              Add More <FaPlus />
            </button>
          </div>

          {/* Medication Section */}
          <div className="bg-white p-5 mt-5">
            <div className="flex justify-between items-center">
              <p className="text-gray-800 font-semibold">Medication Details</p>
              <button
                type="button"
                onClick={handleAddMedication}
                className="px-4 py-2 flex gap-1 items-center text-white rounded-md bg-[#00768A]"
              >
                Add Medication <FaPlus />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div ref={searchBoxRef} className="relative">
                <input
                  type="text"
                  name="medicineName"
                  placeholder="Medicine Name"
                  value={medication.medicineName}
                  onChange={handleMedicationChange}
                  className="border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none w-full mb-2"
                />
                {searchResults.length > 0 && (
                  <ul className="absolute z-10 border rounded-md bg-white max-h-48 overflow-y-auto w-full mt-1 shadow-md">
                    {searchResults.map((product) => (
                      <li
                        key={product._id}
                        className="p-2 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setMedication((prev) => ({
                            ...prev,
                            medicineName: product.title,
                          }));
                          setSearchResults([]);
                        }}
                      >
                        {product.title}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="w-full">
                {/* Frequency Input with Suggestions */}
                <div ref={suggestionBoxRef} className="relative">
                  <textarea
                    name="frequency"
                    placeholder="1-1-1 (dose)"
                    value={medication.frequency}
                    onFocus={handleFocusFrequency}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^[\d-]*$/.test(value)) {
                        handleMedicationChange(e);
                      }
                    }}
                    className="border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none w-full resize-none"
                  />
                  {frequencySuggestions.length > 0 && (
                    <ul className="absolute z-10 border rounded-md bg-white max-h-48 overflow-y-auto w-full mt-1 shadow-md">
                      {frequencySuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="p-2 border-b last:border-b-0 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setMedication((prev) => ({
                              ...prev,
                              frequency: suggestion,
                            }));
                            setFrequencySuggestions([]);
                          }}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <input
                type="text"
                name="duration"
                placeholder="Duration (in days)"
                value={medication.duration}
                onChange={handleMedicationChange}
                className="border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none"
              />
              <textarea
                name="instruction"
                placeholder="Instruction"
                value={medication.instruction}
                onChange={handleMedicationChange}
                className="border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none resize-none"
              />
              <textarea
                name="dose"
                placeholder="Frequency"
                value={medication.dose}
                onChange={handleMedicationChange}
                className="border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none resize-none"
              />
            </div>

            <div className="overflow-x-auto block mt-5 border-2 p-5">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Medicine Name
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Frequency
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Duration
                    </th>
                    <th className="py-2 px-4 border-b border-gray-300 text-left">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {medicineData.map((data, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {data.medicineName}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {data.frequency}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        {data.duration}
                      </td>
                      <td className="py-2 px-4 border-b border-gray-300">
                        <MdDelete
                          onClick={() => handleDeleteMedication(index)}
                          className="text-red-500 cursor-pointer"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Submit Button */}

          <div className="text-center mt-5">
            <button
              type="submit"
              className="bg-[#1495AB] text-white px-4 py-2 rounded-md w-full font-semibold hover:bg-[#138c9d] transition-colors"
              onClick={handleSubmit} // Handle the button click
            >
              Submit
            </button>
          </div>
        </form>
        {deleteAlert && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="absolute inset-0 bg-gray-900 opacity-50"></div>
            <div className="bg-white p-6 rounded-lg border-2 z-10">
              <p className="text-lg mb-4">
                Are you sure you want to delete this item?
              </p>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    deleteProduct(deleteId);
                    setDeleteAlert(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
                >
                  Delete
                </button>
                <button
                  onClick={() => setDeleteAlert(false)}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrescriptionMaker;
