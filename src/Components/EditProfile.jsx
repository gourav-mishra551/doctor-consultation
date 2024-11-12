import React, { useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";
import { MdOutlineTimer } from "react-icons/md";

const EditProfile = () => {
  const [activesection, setActiveSection] = useState("Personal-Details");
  return (
    <div className="flex">
      <div className="w-[30%] bg-white shadow-sm px-5 py-10 flex flex-col">
        {/* Personal details part is here */}
        <div className="flex gap-3 justify-start items-center ml-5">
          <div
            className={`${
              activesection == "Personal-Details"
                ? "rounded-full border-blue-500 text-blue-500 h-[40px] w-[40px] flex justify-center items-center border"
                : "rounded-full bg-[#4358f6] flex justify-center items-center p-2 h-[40px] w-[40px]"
            }`}
          >
            <IoPerson
              className={`${
                activesection == "Personal-Details"
                  ? "text-blue-500 text-[20px]"
                  : "text-white text-[20px]"
              }`}
            />
          </div>

          <div>
            <p
              onClick={() => setActiveSection("Personal-Details")}
              className={`${
                activesection == "Personal-Details"
                  ? "text-blue-500 font-bold text-xl cursor-pointer"
                  : "text-black font-bold text-xl cursor-pointer"
              }`}
            >
              Personal Details
            </p>
          </div>
        </div>
        <div className="bg-gray-300 h-[50px] w-[1px] ml-[40px]"></div>

        {/* FAQ part is here */}
        <div className="flex gap-3 justify-start items-center ml-5">
          <div
            className={`${
              activesection == "FAQ"
                ? "rounded-full border-[#46b8bc] text-blue-500 h-[40px] w-[40px] flex justify-center items-center border"
                : "rounded-full bg-[#46b8bc] flex justify-center h-[40px] w-[40px] items-center"
            }`}
          >
            <FaQuestion
              className={`${
                activesection == "FAQ"
                  ? "text-[#46b8bc] text-[22px]"
                  : "text-white text-[22px]"
              }`}
            />
          </div>

          <div>
            <p
              onClick={() => setActiveSection("FAQ")}
              className={`${
                activesection == "FAQ"
                  ? "text-[#46b8bc] font-bold text-xl cursor-pointer"
                  : "text-black font-bold text-xl cursor-pointer"
              }`}
            >
              FAQ's
            </p>
          </div>
        </div>
        <div className="bg-gray-300 h-[50px] w-[1px] ml-[40px]"></div>

        {/* user-details part is here */}
        <div className="flex gap-3 justify-start items-center ml-5">
          <div
            className={`${
              activesection == "user-details"
                ? "rounded-full border-[#cc926e] text-blue-500 h-[40px] w-[40px] flex justify-center items-center border"
                : "rounded-full bg-[#cc926e] flex justify-center items-center h-[40px] w-[40px]"
            }`}
          >
            <IoPerson
              className={`${
                activesection == "user-details"
                  ? "text-[#cc926e] text-[22px]"
                  : "text-white text-[22px]"
              }`}
            />
          </div>

          <div>
            <p
              onClick={() => {
                setActiveSection("user-details");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`${
                activesection == "user-details"
                  ? "text-[#cc926e] font-bold text-xl cursor-pointer"
                  : "text-black font-bold text-xl cursor-pointer"
              }`}
            >
              User-details
            </p>
          </div>
        </div>
        <div className="bg-gray-300 h-[50px] w-[1px] ml-[40px]"></div>

        {/* Experience part is here */}
        <div className="flex gap-3 justify-start items-center ml-5">
          <div
            className={`${
              activesection == "Experience"
                ? "rounded-full border-[#6fcd9e] text-blue-500 h-[40px] w-[40px] flex justify-center items-center border"
                : "rounded-full bg-[#6fcd9e] flex justify-center items-center h-[40px] w-[40px]"
            }`}
          >
            <MdOutlineTimer
              className={`${
                activesection == "Experience"
                  ? "text-[#6fcd9e] text-[22px]"
                  : "text-white text-[22px]"
              }`}
            />
          </div>

          <div>
            <p
              onClick={() => {
                setActiveSection("Experience");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`${
                activesection == "Experience"
                  ? "text-[#6fcd9e] font-bold text-xl cursor-pointer"
                  : "text-black font-bold text-xl cursor-pointer"
              }`}
            >
              Experience
            </p>
          </div>
        </div>
        {/* <div className="bg-gray-300 h-[50px] w-[1px] ml-[40px]"></div> */}

        {/* Skills & Interests part is here */}
        {/* <div className="flex gap-3 justify-start items-center ml-5">
          <div
            className={`${
              activesection == "Skills-Interests"
                ? "rounded-full border-[#5d8de9] text-blue-500 h-[40px] w-[40px] flex justify-center items-center border"
                : "rounded-full bg-[#5d8de9] flex justify-center items-center h-[40px] w-[40px]"
            }`}
          >
            <FaStar
              className={`${
                activesection == "Skills-Interests"
                  ? "text-[#5d8de9] text-[22px]"
                  : "text-white text-[22px]"
              }`}
            />
          </div>

          <div>
            <p
              onClick={() => {
                setActiveSection("Skills-Interests");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`${
                activesection == "Skills-Interests"
                  ? "text-[#5d8de9] font-bold text-xl cursor-pointer"
                  : "text-black font-bold text-xl cursor-pointer"
              }`}
            >
              Skills & Interests
            </p>
          </div>
        </div> */}
        {/* <div className="bg-gray-300 h-[50px] w-[1px] ml-[40px]"></div> */}

        {/* Certifications part is here */}
        {/* <div className="flex gap-3 justify-start items-center ml-5">
          <div
            className={`${
              activesection == "Certifications"
                ? "rounded-full border-[#46b8bc] text-[#46b8bc] h-[40px] w-[40px] flex justify-center items-center border"
                : "rounded-full bg-[#46b8bc] flex justify-center items-center h-[40px] w-[40px]"
            }`}
          >
            <GrCertificate
              className={`${
                activesection == "Certifications"
                  ? "text-[#46b8bc] text-[22px]"
                  : "text-white text-[22px]"
              }`}
            />
          </div>

          <div>
            <p
              onClick={() => {
                setActiveSection("Certifications");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`${
                activesection == "Certifications"
                  ? "text-[#46b8bc] font-bold text-xl cursor-pointer"
                  : "text-black font-bold text-xl cursor-pointer"
              }`}
            >
              Certifications
            </p>
          </div>
        </div> */}
        {/* <div className="bg-gray-300 h-[50px] w-[1px] ml-[40px]"></div> */}

        {/* Achievements part is here */}
        {/* <div className="flex gap-3 justify-start items-center ml-5">
          <div
            className={`${
              activesection == "Achievements"
                ? "rounded-full border-[#cc926e] text-[#cc926e] h-[40px] w-[40px] flex justify-center items-center border"
                : "rounded-full bg-[#cc926e] flex justify-center items-center h-[40px] w-[40px]"
            }`}
          >
            <LiaCertificateSolid
              className={`${
                activesection == "Achievements"
                  ? "text-[#cc926e] text-[22px]"
                  : "text-white text-[22px]"
              }`}
            />
          </div>

          <div>
            <p
              onClick={() => {
                setActiveSection("Achievements");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className={`${
                activesection == "Achievements"
                  ? "text-[#cc926e] font-bold text-xl cursor-pointer"
                  : "text-black font-bold text-xl cursor-pointer"
              }`}
            >
              Achievements
            </p>
          </div>
        </div> */}
      </div>

      <div className="w-[70%] bg-white shadow-sm px-5 py-10">
        {activesection === "Personal-Details" && (
          <div className="space-y-5">
            <div className="flex flex-col gap-1">
              <label className="px-2 font-bold">Doctor Name</label>
              <input
                type="text"
                placeholder="Enter Full Name"
                className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                name="name"
                // value={detailsData.name}
                // onChange={(e) =>
                //   setDetailsData((prevState) => ({
                //     ...prevState,
                //     name: e.target.value,
                //   }))
                // }
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="px-2 font-bold">About Doctor</label>
              <textarea
                type="text"
                placeholder="Enter Full Name"
                className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                name="name"
                // value={detailsData.name}
                // onChange={(e) =>
                //   setDetailsData((prevState) => ({
                //     ...prevState,
                //     name: e.target.value,
                //   }))
                // }
              />
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-1">
                <label className="px-2 font-bold">About Doctor</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                  name="name"
                  // value={detailsData.name}
                  // onChange={(e) =>
                  //   setDetailsData((prevState) => ({
                  //     ...prevState,
                  //     name: e.target.value,
                  //   }))
                  // }
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="px-2 font-bold">About Doctor</label>
                <input
                  type="text"
                  placeholder="Enter Full Name"
                  className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
                  name="name"
                  // value={detailsData.name}
                  // onChange={(e) =>
                  //   setDetailsData((prevState) => ({
                  //     ...prevState,
                  //     name: e.target.value,
                  //   }))
                  // }
                />
              </div>
            </div>
          </div>
        )}
        {activesection === "FAQ" && (
          <div>
            <p>Faq section is here</p>
          </div>
        )}
        {activesection === "user-details" && (
          <div>
            <p>User details</p>
          </div>
        )}
        {activesection === "Experience" && (
          <div>
            <p>This is Experience section</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditProfile;
