// import React from "react";

// const EditDoctorDetails = ({ doctorData, setDoctorData }) => {
//   // Helper function to update nested doctor data
//   const handleChange = (path, value) => {
//     setDoctorData((prev) => {
//       const newData = { ...prev };
//       path.reduce((acc, key, index) => {
//         if (index === path.length - 1) {
//           acc[key] = value;
//         } else {
//           acc[key] = { ...acc[key] };
//         }
//         return acc[key];
//       }, newData);
//       return newData;
//     });
//   };

//   console.log(doctorData);

//   return (
//     <div className="space-y-5">
//       {/* Doctor Name */}
//       <div className="flex flex-col gap-1">
//         <label className="px-2 font-bold">Doctor Name</label>
//         <input
//           type="text"
//           placeholder="Enter Full Name"
//           className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//           value={doctorData?.data?.userData?.name || ""}
//           onChange={(e) =>
//             handleChange(["data", "userData", "name"], e.target.value)
//           }
//         />
//       </div>

//       {/* About Doctor */}
//       <div className="flex flex-col gap-1">
//         <label className="px-2 font-bold">About Doctor</label>
//         <textarea
//           placeholder="Enter details about the doctor"
//           className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6] focus:outline-none"
//           value={doctorData?.data?.aboutDoctor || ""}
//           onChange={(e) =>
//             handleChange(["data", "aboutDoctor"], e.target.value)
//           }
//         />
//       </div>

//       {/* Hospital Address */}
//       <p className="px-2 font-bold text-gray-500">Hospital Address</p>

//       <div className="grid grid-cols-2 gap-5">
//         {/* Permanent Address */}
//         <div className="flex flex-col gap-1">
//           <label className="px-2 font-bold">Permanent Address</label>
//           <input
//             type="text"
//             placeholder="Enter Permanent Address"
//             className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//             value={
//               doctorData?.data?.clinicHospitalAddress?.permanentAddress || ""
//             }
//             onChange={(e) =>
//               handleChange(
//                 ["data", "clinicHospitalAddress", "permanentAddress"],
//                 e.target.value
//               )
//             }
//           />
//         </div>

//         {/* State */}
//         <div className="flex flex-col gap-1">
//           <label className="px-2 font-bold">State</label>
//           <input
//             type="text"
//             placeholder="Enter State"
//             className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//             value={doctorData?.data?.clinicHospitalAddress?.state || ""}
//             onChange={(e) =>
//               handleChange(
//                 ["data", "clinicHospitalAddress", "state"],
//                 e.target.value
//               )
//             }
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 gap-5">
//         {/* City */}
//         <div className="flex flex-col gap-1">
//           <label className="px-2 font-bold">City</label>
//           <input
//             type="text"
//             placeholder="Enter City"
//             className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//             value={doctorData?.data?.clinicHospitalAddress?.city || ""}
//             onChange={(e) =>
//               handleChange(
//                 ["data", "clinicHospitalAddress", "city"],
//                 e.target.value
//               )
//             }
//           />
//         </div>

//         {/* Pincode */}
//         <div className="flex flex-col gap-1">
//           <label className="px-2 font-bold">Pincode</label>
//           <input
//             type="text"
//             placeholder="Enter Pincode"
//             className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//             value={doctorData?.data?.clinicHospitalAddress?.PinCode || ""}
//             onChange={(e) =>
//               handleChange(
//                 ["data", "clinicHospitalAddress", "PinCode"],
//                 e.target.value
//               )
//             }
//           />
//         </div>
//       </div>

//       {/* Services Offered */}
//       <div className="flex flex-col gap-1">
//         <label className="px-2 font-bold">Services</label>
//         <div className="flex gap-5">
//           {doctorData?.data?.servicesOffered?.map((service, index) => (
//             <input
//               key={index}
//               type="text"
//               placeholder="Enter Service"
//               className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//               value={service || ""}
//               onChange={(e) => {
//                 const updatedServices = [
//                   ...(doctorData?.data?.servicesOffered || []),
//                 ];
//                 updatedServices[index] = e.target.value;
//                 handleChange(["data", "servicesOffered"], updatedServices);
//               }}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditDoctorDetails;
