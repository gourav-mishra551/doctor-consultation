import React, { useState } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";

const PrescriptionMaker = () => {
  const [sections, setSections] = useState([]);

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
                className="w-full border px-3 py-2 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-1/3">
            <p className="text-gray-800 font-semibold">Observation</p>
            <div className="mt-5">
              <textarea
                placeholder=""
                className="w-full border px-3 py-2 rounded-md focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <div className="w-1/3">
            <p className="text-gray-800 font-semibold">Notes</p>
            <div className="mt-5">
              <textarea
                placeholder=""
                className="w-full border px-3 py-2 rounded-md focus:border-blue-500 focus:outline-none"
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
                  className="w-full border px-3 py-2 rounded-md focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-gray-800 font-semibold">Observation</p>
              <div className="mt-5">
                <textarea
                  placeholder=""
                  className="w-full border px-3 py-2 rounded-md focus:border-blue-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="w-1/3">
              <p className="text-gray-800 font-semibold">Notes</p>
              <div className="mt-5">
                <textarea
                  placeholder=""
                  className="w-full border px-3 py-2 rounded-md focus:border-blue-500 focus:outline-none    "
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
              <button className="px-4 py-2 flex gap-1 justify-center items-center text-[16px] font-normal text-white rounded-md bg-[#00768A]">
                Add Prescription
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrescriptionMaker;
