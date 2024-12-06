import React, { useEffect, useState } from "react";
import { FaPhoneAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const DoctorSelfProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isFAQOpen, setIsFAQOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState(null); // To track which box is open
  const [doctorProfileData, setDoctorProfileData] = useState([]);

  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");

  const docotrData = async () => {
    try {
      const response = await axios.get(
        "https://api.assetorix.com/ah/api/v1/dc/doctor",
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setDoctorProfileData(response.data);
      console.log(response.data);
    } catch (error) {}
  };

  useEffect(() => {
    docotrData();
  }, []);

  const toggleBox = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  // Set the first speciality's ID as the default open box
  const [activeSpecialityId, setActiveSpecialityId] = useState(() => {
    const specialityCategories =
      doctorProfileData?.data?.specialitycategories || [];
    return specialityCategories.length > 0 ? specialityCategories[0]._id : null;
  });

  const navigate = useNavigate();

  const handleSpecialityClick = (id) => {
    // If the clicked ID is already open, close it; otherwise, open it and close others
    setActiveSpecialityId(activeSpecialityId === id ? null : id);
  };

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const convertToIST = (utcDate) => {
    if (!utcDate) return "--"; // Return fallback if date is invalid or missing
    const date = new Date(utcDate);
    return date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      ...options,
    });
  };

  return (
    <div>
      {/* {doctorProfileData.data.map((dr) => ( */}
      <>
        <div className="flex sm:justify-end ">
          <button
            className="bg-[#00768A] px-2 py-1 text-white rounded-md"
            onClick={() => navigate("/edit-profile")}
          >
            Edit profile
          </button>
        </div>
        <div className="top-bar mt-5">
          {/* top-bar is here */}
          <div className="sm:flex mb-2 justify-between sm:gap-5">
            <div className="email flex items-center gap-1">
              <MdEmail className="text-[#00768A] text-sm" />
              <p className="text-sm font-light">
                {doctorProfileData?.data?.userData?.email}
              </p>
            </div>
            {doctorProfileData?.data?.userData?.mobile && (
              <div className="email flex items-center gap-1">
                <FaPhoneAlt className="text-[#00768A] text-sm" />
                <p className="text-sm font-light">
                  +91 {doctorProfileData?.data?.userData?.mobile}
                </p>
              </div>
            )}
          </div>

          <div className="name">
            <p className="text-3xl font-light text-gray-800">
              Dr. {doctorProfileData?.data?.userData?.name}
            </p>
          </div>
          <div className="h-[1px] bg-gray-300 w-[100%] bg-opacity-40 sm:mt-3"></div>

          <div className="mt-10 sm:flex sm:gap-10">
            <div className="image sm:w-[50%] w-[100%]">
              <div>
                <img
                  src={doctorProfileData?.data?.userData?.avatar}
                  alt=""
                  className="opacity-80 w-[50%]"
                />
              </div>

              <div className="mt-10">
                <p className="text-2xl font-light text-gray-800 mb-3">
                  About Dr {doctorProfileData?.data?.userData?.name}
                </p>
                <p className="text-justify text-gray-500 font-normal text-sm">
                  {doctorProfileData?.data?.aboutDoctor}
                </p>
              </div>
              <div className="h-[2px] bg-gray-300 w-[100%] bg-opacity-40 mt-8"></div>

              {/* experience section added */}
              {doctorProfileData?.data?.years_of_experience.length > 0 ? (
                <div className="experience mt-10 border border-gray-300 rounded-lg p-4 shadow-sm">
                  {doctorProfileData.data.years_of_experience.map(
                    (experience, index) => (
                      <div
                        key={index}
                        className="experience-box border-b border-gray-200 py-3 last:border-none"
                      >
                        {/* Header Section */}
                        <div
                          className="flex justify-between items-center cursor-pointer"
                          onClick={() => toggleBox(index)}
                        >
                          <p className="text-2xl font-light">
                            Experience {index + 1}
                          </p>
                          {openIndex === index ? (
                            <AiFillCaretUp className="text-xl text-gray-600 transition-transform" />
                          ) : (
                            <AiFillCaretDown className="text-xl text-gray-600 transition-transform" />
                          )}
                        </div>

                        {/* Content Section */}
                        <div
                          className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            openIndex === index
                              ? "max-h-screen opacity-100"
                              : "max-h-0 opacity-0"
                          }`}
                        >
                          <div className="flex justify-between mt-3">
                            <p className="text-gray-800 text-sm">Job Title</p>
                            <p className="text-gray-500 text-sm">
                              {experience.jobTitle}
                            </p>
                          </div>
                          <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>

                          <div className="flex justify-between mt-3">
                            <p className="text-gray-800 text-sm">
                              Organisation Location
                            </p>
                            <p className="text-gray-500 text-sm">
                              {experience.organizationLocation}
                            </p>
                          </div>
                          <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>

                          <div className="flex justify-between mt-3">
                            <p className="text-gray-800 text-sm">
                              Organisation Name
                            </p>
                            <p className="text-gray-500 text-sm">
                              {experience.organizationName}
                            </p>
                          </div>
                          <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>

                          <div className="flex justify-between mt-3">
                            <p className="text-gray-800 text-sm">
                              Employment Type
                            </p>
                            <p className="text-gray-500 text-sm">
                              {experience.employmentType}
                            </p>
                          </div>
                          <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>

                          <div className="flex justify-between mt-3">
                            <p className="text-gray-800 text-sm">Skills</p>
                            <div className="text-gray-500 text-sm flex flex-wrap gap-2">
                              {experience.skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="bg-gray-200 rounded px-2 py-1 text-gray-600"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>

                          <div className="flex justify-between mt-3">
                            <p className="text-gray-800 text-sm">Start Date</p>
                            <p className="text-gray-500 text-sm">
                              {experience.startDate.month},{" "}
                              {experience.startDate.year}
                            </p>
                          </div>
                          <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>

                          <div className="flex justify-between mt-3">
                            <p className="text-gray-800 text-sm">End Date</p>
                            <p className="text-gray-500 text-sm">
                              {experience.endDate.month},{" "}
                              {experience.endDate.year}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ) : (
                <div className="flex justify-center items-center flex-col gap-5 h-[200px] w-auto">
                  <p className="font-normal">
                    No experience found Please add experience
                  </p>
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="bg-[#00768A] text-white px-3 py-1 rounded-md"
                  >
                    Add Experience
                  </button>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:w-[40%] w-[100%]">
              <div className="speciality-accordion">
                {doctorProfileData?.specialityCategories?.map(
                  (special, index) => (
                    <div
                      key={special._id}
                      className="informations-section mb-5 rounded-lg shadow-sm"
                    >
                      <div
                        className="flex justify-between items-center cursor-pointer"
                        onClick={() => handleSpecialityClick(special._id)}
                      >
                        <p className="text-2xl font-light">
                          Speciality {index + 1}
                        </p>
                        {activeSpecialityId === special._id ? (
                          <AiFillCaretUp className="text-xl text-gray-600 transition-transform" />
                        ) : (
                          <AiFillCaretDown className="text-xl text-gray-600 transition-transform" />
                        )}
                      </div>
                      <div className="flex gap-1 mt-3">
                        <div className="h-[2px] bg-[#00768A] w-[30%]"></div>
                        <div className="h-[2px] bg-gray-300 w-[70%] bg-opacity-40"></div>
                      </div>
                      {/* Conditional rendering based on activeSpecialityId */}
                      {activeSpecialityId === special._id && (
                        <div className="mt-3 transition-all duration-300 ease-in-out overflow-hidden">
                          <div className="flex justify-between mt-3">
                            <p className="text-gray-800 text-sm">Speciality</p>
                            <p className="text-gray-500 text-sm">
                              {special.specialtyName}
                            </p>
                          </div>
                          <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>

                          <div className="flex justify-between mt-3">
                            <p className="text-gray-800 text-sm">
                              Short Description
                            </p>
                            <p className="text-gray-500 text-sm">
                              {special?.sortDescription}
                            </p>
                          </div>
                          <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>

                          <div className="flex justify-between mt-3">
                            <p className="text-gray-800 text-sm">Created At</p>
                            <p className="text-gray-500 text-sm">
                              {convertToIST(special?.createdAt)}
                            </p>
                          </div>
                          <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>
                        </div>
                      )}
                    </div>
                  )
                )}
              </div>

              {/* graduation */}
              {doctorProfileData?.data?.qualifications?.map((qualification) => (
                <div>
                  <p className="text-2xl font-light mt-10">Graduation</p>
                  <div className="flex gap-1 mt-3">
                    <div className="h-[2px] bg-[#00768A] w-[30%]"></div>
                    <div className="h-[2px] bg-gray-300 w-[70%] bg-opacity-40"></div>
                  </div>
                  <div className="flex justify-between mt-3">
                    <p className="text-gray-800 text-sm">Degree</p>
                    <p className="text-gray-500 text-sm">
                      {qualification?.degree}
                    </p>
                  </div>
                  <div className="h-[2px] bg-gray-300 w-[100%] bg-opacity-40 mt-3"></div>

                  <div className="flex justify-between mt-3">
                    <p className="text-gray-800 text-sm">Field Of Study</p>
                    <p className="text-gray-500 text-sm">
                      {qualification?.fieldOfStudy}
                    </p>
                  </div>
                  <div className="h-[2px] bg-gray-300 w-[100%] bg-opacity-40 mt-3"></div>

                  <div className="flex justify-between mt-3">
                    <p className="text-gray-800 text-sm">Institute</p>
                    <p className="text-gray-500 text-sm">
                      {qualification?.instituteName}
                    </p>
                  </div>
                  <div className="h-[2px] bg-gray-300 w-[100%] bg-opacity-40 mt-3"></div>
                  <div className="flex justify-between mt-3">
                    <p className="text-gray-800 text-sm">Start Date</p>
                    <p className="text-gray-500 text-sm">
                      {qualification?.startDate?.month},{" "}
                      {qualification?.startDate?.year}
                    </p>
                  </div>
                  <div className="h-[2px] bg-gray-300 w-[100%] bg-opacity-40 mt-3"></div>
                  <div className="flex justify-between mt-3">
                    <p className="text-gray-800 text-sm">End Date</p>
                    <p className="text-gray-500 text-sm">
                      {qualification?.endDate?.month},{" "}
                      {qualification?.endDate?.year}
                    </p>
                  </div>
                  <div className="h-[2px] bg-gray-300 w-[100%] bg-opacity-40 mt-3"></div>
                  <div className="flex justify-between mt-3">
                    <p className="text-gray-800 text-sm">Skills</p>
                    <div className="flex gap-1">
                      {qualification?.skills?.map((skill) => (
                        <p className="text-gray-500 text-sm">{skill},</p>
                      ))}
                    </div>
                  </div>
                  <div className="h-[2px] bg-gray-300 w-[100%] bg-opacity-40 mt-3"></div>
                </div>
              ))}

              {/* hospital details */}
              {doctorProfileData?.data?.clinic_hospital_address ? (
                // If the hospital address exists, show the details
                <div className="hospital-details mt-10">
                  <p className="text-2xl font-light">Hospital Address</p>
                  <div className="flex gap-1 mt-3">
                    <div className="h-[2px] bg-[#00768A] w-[30%]"></div>
                    <div className="h-[2px] bg-gray-300 w-[70%] bg-opacity-40"></div>
                  </div>

                  {/* Permanent Address */}
                  <div className="flex justify-between mt-3">
                    <p className="text-gray-800 text-sm">Permanent Address</p>
                    <p className="text-gray-500 text-sm">
                      {doctorProfileData.data.clinic_hospital_address
                        .permanentAddress || "N/A"}
                    </p>
                  </div>
                  <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>

                  {/* City */}
                  <div className="flex justify-between mt-3">
                    <p className="text-gray-800 text-sm">City</p>
                    <p className="text-gray-500 text-sm">
                      {doctorProfileData.data.clinic_hospital_address.city ||
                        "N/A"}
                    </p>
                  </div>
                  <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>

                  {/* Pincode */}
                  <div className="flex justify-between mt-3">
                    <p className="text-gray-800 text-sm">Pincode</p>
                    <p className="text-gray-500 text-sm">
                      {doctorProfileData.data.clinic_hospital_address.PinCode ||
                        "N/A"}
                    </p>
                  </div>
                  <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>

                  {/* State */}
                  <div className="flex justify-between mt-3">
                    <p className="text-gray-800 text-sm">State</p>
                    <p className="text-gray-500 text-sm">
                      {doctorProfileData.data.clinic_hospital_address.state ||
                        "N/A"}
                    </p>
                  </div>
                  <div className="h-[2px] bg-gray-300 w-full bg-opacity-40 mt-3"></div>
                </div>
              ) : (
                // If no hospital address exists, show the message and button
                <div className="flex justify-center items-center flex-col gap-5 h-[200px] w-auto">
                  <p className="font-normal">
                    No hospital address found. Please add a hospital address.
                  </p>
                  <button
                    onClick={() => navigate("/edit-profile")}
                    className="bg-[#00768A] text-white px-3 py-1 rounded-md"
                  >
                    Add Hospital Address
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* faq section */}
        {doctorProfileData?.data?.FAQ.length > 0 ? (
          <div className="faq mt-10 border border-gray-300 rounded-lg p-4 shadow-sm">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setIsFAQOpen(!isFAQOpen)}
            >
              <p className="text-gray-800 font-light text-xl">FAQ's</p>
              {isFAQOpen ? (
                <AiFillCaretUp className="text-xl text-gray-600 transition-transform" />
              ) : (
                <AiFillCaretDown className="text-xl text-gray-600 transition-transform" />
              )}
            </div>
            {doctorProfileData?.data?.FAQ?.map((faq) => (
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isFAQOpen
                    ? "max-h-screen opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <p>{faq?.title}</p>
                <p className="text-gray-500 font-light">{faq?.value}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center flex-col gap-5 h-[200px] w-auto">
            <p className="font-normal">No FAQ found. Please add a FAQ.</p>
            <button
              onClick={() => navigate("/edit-profile")}
              className="bg-[#00768A] text-white px-3 py-1 rounded-md"
            >
              Add FAQ
            </button>
          </div>
        )}
      </>
      {/* ))}  */}
    </div>
  );
};

export default DoctorSelfProfile;
