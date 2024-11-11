import React, { useEffect, useRef, useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaClipboard, FaEdit, FaPlus } from "react-icons/fa";
import { MdCancel, MdDelete } from "react-icons/md";
import axios from "axios";

const PrescriptionMaker = () => {
  const [sections, setSections] = useState([]);
  const [openPopUp, setPopUp] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [frequency, setFrequency] = useState("");
  const [duration, setDuration] = useState("");
  const [instruction, setInstruction] = useState("");
  const [medicineData, setMedicineData] = useState([]);
  const [medicineSelected, setMedicineSelected] = useState(false);
  const [editForm, setEditForm] = useState(false);
  const [medicineName, setMedicineName] = useState("");
  const [editMedicineData, setEditMedicineData] = useState({
    medicineSelected: "",
    frequency: "",
    duration: "",
    instruction: "",
  });

  const popupRef = useRef(null);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const loadEditData = (data) => {
    setEditMedicineData({
      medicine: data.medicine,
      frequency: data.frequency,
      duration: data.duration,
      instruction: data.instruction,
    });
    setEditForm(true); // Open the form popup
  };

  // Function to handle input changes for the edit form
  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditMedicineData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Function to submit the edited data
  const handleEditSubmit = (e, editedData) => {
    e.preventDefault();
    setTableData((prevData) =>
      prevData.map((item) =>
        item.id === editedData.id ? { ...item, ...editedData } : item
      )
    );
  };

  const addSection = () => {
    setSections((prevSections) => [
      ...prevSections,
      { id: Date.now(), problem: "", observation: "", notes: "" },
    ]);
  };

  const deleteSection = (id) => {
    setSections((prevSections) =>
      prevSections.filter((section) => section.id !== id)
    );
  };

  // / Handle input change and search products
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.length > 2) {
      // Optional: Trigger search after 3 characters
      searchProduct(value);
      setMedicineSelected(false); // Reset the selection flag
    } else {
      setProducts([]); // Clear products when search term is short
    }
  };

  // Handle product selection
  const handleClickProduct = (productName) => {
    setSearchTerm(productName); // Set selected product name in the input field
    setMedicineSelected(true); // Set flag to true, indicating that a medicine was selected
    setProducts([]); // Hide search suggestions after selection
  };

  // Search product API
  const searchProduct = async (term) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/product/search?search=${term}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setProducts(response.data.data); // Assuming the data is in the 'data' field
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const medicineName = searchTerm; // Whether typed manually or selected from search
    if (medicineName) {
      // Add data to the table
      setMedicineData([
        ...medicineData,
        { medicineName, frequency, duration, instruction },
      ]);
      // Clear fields after submission
      setSearchTerm("");
      setFrequency("");
      setDuration("");
      setInstruction("");
      setMedicineSelected(false); // Reset the flag after submission
      setPopUp(false);
    }
  };

  console.log(medicineName);

  return (
    <div className="bg-gray-100 p-5 flex gap-5">
      {/* Left section */}
      <div className="patient-details w-1/4 p-5 space-y-3 shadow-xl bg-white rounded-lg">
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
      <div className="prescription-detail w-3/4 space-y-5">
        <div className="flex justify-end">
          <button
            onClick={addSection}
            className="text-[16px] font-normal text-white px-4 py-2 rounded-md bg-[#00768A]"
          >
            Add More
          </button>
        </div>

        {/* Initial input section */}
        <div className="flex gap-5 bg-white p-5 rounded-lg shadow-md">
          <div className="w-1/3">
            <p className="text-gray-800 font-semibold">Problems</p>
            <div className="mt-5">
              <textarea
                placeholder=""
                className="w-full border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none min-h-[100px]"
              />
            </div>
          </div>
          <div className="w-1/3">
            <p className="text-gray-800 font-semibold">Observation</p>
            <div className="mt-5">
              <textarea
                placeholder=""
                className="w-full border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none min-h-[100px]"
              />
            </div>
          </div>
          <div className="w-1/3">
            <p className="text-gray-800 font-semibold">Notes</p>
            <div className="mt-5">
              <textarea
                placeholder=""
                className="w-full border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none min-h-[100px]"
              />
            </div>
          </div>
        </div>

        {/* Additional sections */}
        {sections.map((section) => (
          <div
            key={section.id}
            className="flex gap-5 bg-white p-5 rounded-lg shadow-md relative"
          >
            <button
              onClick={() => deleteSection(section.id)}
              className="absolute top-2 right-2 text-gray-600 hover:text-red-500"
            >
              <AiOutlineDelete className="text-xl" />
            </button>
            <div className="w-1/3">
              <p className="text-gray-800 font-semibold">Problems</p>
              <div className="mt-5">
                <textarea
                  placeholder=""
                  className="w-full border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none min-h-[100px]"
                />
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-gray-800 font-semibold">Observation</p>
              <div className="mt-5">
                <textarea
                  placeholder=""
                  className="w-full border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none min-h-[100px]"
                />
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-gray-800 font-semibold">Notes</p>
              <div className="mt-5">
                <textarea
                  placeholder=""
                  className="w-full border px-3 py-2 rounded-md focus:border-[#1495AB] focus:outline-none min-h-[100px]"
                />
              </div>
            </div>
          </div>
        ))}

        {/* prescription details */}
        <div className="bg-white p-5">
          <div className="flex justify-between">
            <p className="text-gray-800 font-semibold">Prescription Detials</p>
            <div className="">
              <button
                onClick={() => setPopUp(true)}
                className="px-4 py-2 flex gap-1 justify-center items-center text-[16px] font-normal text-white rounded-md bg-[#00768A]"
              >
                Add Medication
                <FaPlus />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto mt-5 border-2 p-5">
            <div className="overflow-x-auto">
              {/* Table */}
              <table className="min-w-full table-auto border-collapse mt-6">
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
                        <div className="flex gap-2">
                          <FaEdit
                            onClick={() => loadEditData(data)}
                            className="text-[#00768A] cursor-pointer"
                          />
                          <MdDelete className="text-red-500 cursor-pointer" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {openPopUp && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-3 sm:p-0 lg:p-2">
              <div
                ref={popupRef}
                className="bg-white p-6 rounded-lg border-2 z-10 w-full max-w-3xl mx-4 md:mx-0 space-y-6"
              >
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">Add Medication</p>
                  <MdCancel
                    onClick={() => setPopUp(false)}
                    className="cursor-pointer text-gray-500 hover:text-gray-800"
                  />
                </div>

                <div className="space-y-4">
                  <form onSubmit={handleFormSubmit} className="space-y-5">
                    {/* Medicine and Frequency fields */}
                    <div className="relative flex gap-4">
                      <div className="w-full">
                        <input
                          name="search"
                          placeholder="Enter/search medicines with strength"
                          type="text"
                          value={searchTerm}
                          onChange={handleInputChange}
                          className="px-4 py-2 rounded-lg border w-full focus:outline-none focus:border-[#1495AB] focus:ring-2 focus:ring-[#1495AB] h-[68px]"
                        />
                        {loading && (
                          <p className="text-sm text-gray-500">Loading...</p>
                        )}
                        {/* Show suggestions only if no medicine is selected */}
                        {searchTerm &&
                          !medicineSelected &&
                          products.length > 0 && (
                            <ul className="absolute z-50 bg-white border border-gray-200 rounded-lg mt-1 w-full max-h-40 overflow-y-auto shadow-lg">
                              {products.map((product, index) => (
                                <li
                                  key={index}
                                  className="flex justify-between items-center py-2 px-4 hover:bg-[#f0f0f0] cursor-pointer"
                                  onClick={() => {
                                    handleClickProduct(product.title);
                                    setMedicineName(product.title);
                                  }}
                                >
                                  <span>{product.title}</span>
                                  <FaClipboard
                                    onClick={() => handleCopy(product.title)}
                                    className="cursor-pointer text-gray-500 hover:text-gray-800"
                                  />
                                </li>
                              ))}
                            </ul>
                          )}
                        {/* Show a message if no products found */}
                        {searchTerm &&
                          !medicineSelected &&
                          products.length === 0 && (
                            <p className="text-sm text-gray-500">
                              No products found, you can type the name manually.
                            </p>
                          )}
                      </div>
                      <textarea
                        name="frequency"
                        placeholder="Frequency"
                        value={frequency}
                        onChange={(e) => setFrequency(e.target.value)}
                        className="px-4 py-2 rounded-lg border w-full resize-none focus:outline-none focus:border-[#1495AB] focus:ring-[#1495AB]"
                      />
                    </div>

                    {/* Duration and Instruction fields */}
                    <div className="flex gap-4">
                      <input
                        name="duration"
                        placeholder="Duration (in days)"
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="px-4 py-2 rounded-lg border w-full focus:outline-none focus:border-[#1495AB] focus:ring-[#1495AB]"
                      />
                      <textarea
                        name="instruction"
                        placeholder="Instruction"
                        value={instruction}
                        onChange={(e) => setInstruction(e.target.value)}
                        className="px-4 py-2 rounded-lg border w-full resize-none focus:outline-none focus:border-[#1495AB] focus:ring-[#1495AB]"
                      />
                    </div>

                    {/* Submit Button */}
                    <div className="text-center">
                      <button
                        type="submit"
                        className="bg-[#1495AB] text-white px-4 py-2 rounded-md w-full font-semibold hover:bg-[#138c9d] transition-colors"
                      >
                        Add
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
          {editForm && (
            <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm p-3 sm:p-0 lg:p-2">
              <div className="bg-white p-6 rounded-lg border-2 z-10 w-full max-w-3xl mx-4 md:mx-0 space-y-6">
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold">Edit Medication</p>
                  <MdCancel
                    onClick={() => setEditForm(false)}
                    className="cursor-pointer text-gray-500 hover:text-gray-800"
                  />
                </div>

                <form onSubmit={handleEditSubmit} className="space-y-5">
                  <div className="relative flex gap-4">
                    <div className="w-full">
                      <input
                        name="medicineSelected"
                        placeholder="Enter medicine name"
                        type="text"
                        value={medicineName}
                        onChange={(e) => setMedicineName(e.target.value)}
                        className="px-4 py-2 rounded-lg border w-full focus:outline-none focus:border-[#1495AB] focus:ring-2 focus:ring-[#1495AB] h-[68px]"
                      />
                    </div>
                    <textarea
                      name="frequency"
                      placeholder="Frequency"
                      value={editMedicineData.frequency}
                      onChange={(e) => setFrequency(e.target.validationMessage)}
                      className="px-4 py-2 rounded-lg border w-full resize-none focus:outline-none focus:border-[#1495AB] focus:ring-[#1495AB]"
                    />
                  </div>

                  <div className="flex gap-4">
                    <input
                      name="duration"
                      placeholder="Duration (in days)"
                      type="text"
                      value={editMedicineData.duration}
                      onChange={(e) =>
                        setEditMedicineData({
                          ...editMedicineData,
                          duration: e.target.value,
                        })
                      }
                      className="px-4 py-2 rounded-lg border w-full focus:outline-none focus:border-[#1495AB] focus:ring-[#1495AB]"
                    />
                    <textarea
                      name="instruction"
                      placeholder="Instruction"
                      value={editMedicineData.instruction}
                      onChange={(e) =>
                        setEditMedicineData({
                          ...editMedicineData,
                          instruction: e.target.value,
                        })
                      }
                      className="px-4 py-2 rounded-lg border w-full resize-none focus:outline-none focus:border-[#1495AB] focus:ring-[#1495AB]"
                    />
                  </div>

                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-[#1495AB] text-white px-4 py-2 rounded-md w-full font-semibold hover:bg-[#138c9d] transition-colors"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrescriptionMaker;
