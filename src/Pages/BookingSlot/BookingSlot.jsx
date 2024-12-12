import axios from "axios";
import React, { useEffect, useState } from "react";
import { GiGraduateCap } from "react-icons/gi";
import { useParams } from "react-router-dom";
import DrAppointmentBooking from "../../Components/DrApointmentBooking";
import {
  FaGraduationCap,
  FaHospital,
  FaMapMarkerAlt,
  FaTrophy,
  FaGlobe,
} from "react-icons/fa";
import PrescriptionUpload from "../../Components/PrescriptionUpload/PrescriptionUpload";
import Payment from "../../Components/Payment/Payment";
import { RiNumber1, RiNumber2, RiNumber3 } from "react-icons/ri";
import Loader from "../../Components/Loading/Loader";

function BookingSlot() {
  const [DrProfile, setDrProfile] = useState(null);
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [Loading,setLoading]=useState(false)
  const [paymentData, setPaymentData] = useState(null);

  const handlePaymentData = (data) => {
    setPaymentData(data); // Update parent's state with data from child
    console.log("Received data from child:", data);
  };
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };
  const handleStepClick = (stepNumber) => {
    setStep(stepNumber);
  };

  useEffect(() => {
    DrProfileFetch();

  }, []);

  const DrProfileFetch = async () => {
   setLoading(true)
    try {
      const res = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/doctors/${id}`
      );
      setDrProfile(res.data.data);
    } catch (error) {
      console.error("Error fetching doctor profile data:", error);
    }finally{
      setLoading(false)
    }
  };
  



  if (!DrProfile) {
    return (
      
        <div className="flex justify-center items-center min-h-screen">
        <div className="loader"></div>
      </div>
      
    );
  }

  const ProfileDetail = ({ icon, title, value }) => (
    <div className="flex items-center">
      <span className="flex items-center justify-center bg-[#00768A] text-white w-14 h-14 p-4 leading-none rounded-full shadow-lg text-xl">
        {icon}
      </span>
      <div className="ml-4">
        <p className="text-base sm:text-lg font-semibold text-gray-700">
          {title}
        </p>
        <p className="text-sm sm:text-base text-gray-600">{value}</p>
      </div>
    </div>
  );

  return (

    <div className=" flex flex-col">


      <div className="bg-gradient-to-r from-[#E3FDFD] via-[#FFE6FA] to-[#FBF4E9] flex-grow py-6 px-4 sm:px-6 lg:px-8">
        {DrProfile?.userData && (
          <div className="bg-white rounded-3xl shadow-2xl max-w-[1180px] mx-auto p-4 sm:p-6  lg:p-10">
            <div
              className="relative bg-cover bg-center rounded-3xl overflow-hidden flex flex-col lg:flex-row lg:items-center gap-1 lg:gap-8"
              style={{
                backgroundImage: `url('https://img.freepik.com/free-vector/cartoon-stomatology-clinic-hospital-interior-empty-dental-hall-waiting-room-with-chair-elevator-reception-doctor-office-doors-tooth-treatment-oral-care-teeth-hygiene-concept_88138-885.jpg')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/40 z-0"></div>

              <div className="flex-shrink-0 flex justify-center lg:justify-start z-10">
                <img
                  src={
                    DrProfile.userData?.avatar ||
                    "https://via.placeholder.com/150"
                  }
                  alt="Doctor Avatar"
                  className="h-28 w-28 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-full object-cover shadow-lg border-4 border-white"
                />
              </div>

              <div className="text-center lg:text-left z-10">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white uppercase [text-shadow:_0_1px_0_rgb(0_0_0_/_40%)]">
                    {DrProfile.userData?.name || "Doctor's Name"}
                  </h1>
                  <div className="flex justify-center items-center">
                    <span className="bg-[#00768A] p-2 rounded-full">
                      <FaTrophy className="text-2xl text-yellow-500" />
                    </span>
                    <p className="text-[#00768A] ml-3 bg-cyan-100 py-1 px-2 text-sm rounded-full font-bold">
                      {DrProfile.totalExperience} Years of Experience
                    </p>
                  </div>
                </div>
                <p className="text-lg sm:text-xl mb-4 font-semibold text-white shadow-md [text-shadow:_0_4px_8px_#00BCD4] mt-2">
                  Specialties In:
                  <span className="ml-2">
                    {DrProfile.specialitycategories?.length > 0 ? (
                      DrProfile.specialitycategories.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-block bg-blue-100 text-[#00768A] px-3 py-1 rounded-full mr-2 text-sm"
                        >
                          {specialty.specialtyName}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-500">Not available</span>
                    )}
                  </span>
                </p>
              </div>
            </div>

            <div className="border-t my-8"></div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
              <ProfileDetail
                icon={<FaGlobe />}
                title="Languages"
                value={
                  DrProfile?.language?.length > 0
                    ? DrProfile.language.join(", ")
                    : "No languages available"
                }
              />
              <ProfileDetail
                icon={<FaGraduationCap />}
                title="Qualifications"
                value={
                  DrProfile?.qualifications?.length > 0
                    ? DrProfile.qualifications.map((q) => q.degree).join(", ")
                    : "Not available"
                }
              />
              <ProfileDetail
                icon={<FaHospital />}
                title="Hospital"
                value={DrProfile.hospitalName || "Not available"}
              />
              <ProfileDetail
                icon={<FaMapMarkerAlt />}
                title="Address"
                value={
                  DrProfile?.clinic_hospital_address
                    ? `${
                        DrProfile.clinic_hospital_address.permanentAddress || ""
                      }, ${DrProfile.clinic_hospital_address.state || ""}, ${
                        DrProfile.clinic_hospital_address.city || ""
                      }, ${DrProfile.clinic_hospital_address.PinCode || ""}`
                    : "Not available"
                }
              />
            </div>
          </div>
        )}
      </div>
      <div className="flex flex-col items-center w-full py-6 ">
        <div className="relative flex items-center w-full max-w-md justify-between">
          {/* Step 1 */}
          <div
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
              step >= 1 ? "text-white bg-[#00768A]" : "text-gray-500"
            } p-4 rounded-full border border-gray-300 w-16 h-16 md:w-20 md:h-20`}
            onClick={() => handleStepClick(1)}
          >
            <RiNumber1 size={22} />
            <span className="text-sm mt-1 hidden md:block">Step 1</span>
          </div>

          {/* Animated Line */}
          <div className="absolute top-1/2 left-1/4 w-1/2 h-1 bg-gray-300 -z-10">
            <div
              className={`h-1 bg-[#00768A] transition-all z-5 duration-500`}
              style={{
                width: `${step === 1 ? "0%" : step === 2 ? "50%" : "100%"}`,
              }}
            ></div>
          </div>

          {/* Step 2 */}
          <div
            className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
              step >= 2 ? "text-white bg-[#00768A] " : "text-white bg-gray-500"
            } p-4 rounded-full border border-gray-300 w-16 h-16 md:w-20 md:h-20`}
            onClick={() => handleStepClick(2)}
          >
            <RiNumber2 size={22} />
            <span className="text-sm mt-1 hidden md:block">Step 2</span>
          </div>

          {/* Step 3 */}
          <div
            className={`flex  z-10 flex-col items-center cursor-pointer transition-all duration-300 ${
              step >= 3 ? "text-white bg-[#00768A]" : "text-white bg-gray-500"
            } p-4 rounded-full border border-gray-300 w-16 h-16 md:w-20 md:h-20 <z-10></z-10>`}
            onClick={() => handleStepClick(3)}
          >
            <RiNumber3 size={22} />
            <span className="text-sm mt-1 hidden md:block">Step 3</span>
          </div>
        </div>
      </div>

      <div className=" mx-auto py-10">
        {step === 1 ? (
          <DrAppointmentBooking
            IndiProfile={DrProfile}
            onNext={handleNextStep}
            onSendPaymentData={handlePaymentData}
          />
        ) : step === 3 ? (
          <PrescriptionUpload
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
          />
        ) : (
          <Payment onPrevious={handlePreviousStep}  userData = {paymentData} doctorId = {DrProfile} />
        )}
      </div>
    </div>
  );
}

export default BookingSlot;
