// import React, { useState } from "react";

// const EditDoctorExperience = ({ doctorData }) => {
//   const [openSection, setOpenSection] = useState(null);
//   const [experiences, setExperiences] = useState([
//     {
//       description:
//         "Led the development of a web application for project management.",
//       employmentType: "Full-time",
//       startDate: "2022-01-01",
//       endDate: "2023-01-01",
//       jobTitle: "Frontend Developer",
//       organisationLocation: "New York, USA",
//       organisationName: "Tech Solutions Inc.",
//       skills: ["JavaScript", "React", "CSS", "HTML", "Tailwind CSS"],
//     },
//     {
//       description:
//         "Managed a team to improve user experience for the company website.",
//       employmentType: "Part-time",
//       startDate: "2021-05-01",
//       endDate: "2022-12-01",
//       jobTitle: "UI/UX Designer",
//       organisationLocation: "San Francisco, USA",
//       organisationName: "Creative Minds Studio",
//       skills: ["Figma", "Sketch", "User Research", "Prototyping", "CSS"],
//     },
//   ]);

//   console.log(doctorData);

//   const toggleSection = (index) => {
//     setOpenSection(openSection === index ? null : index);
//   };

//   const handleInputChange = (index, field, value) => {
//     const updatedExperiences = [...experiences];
//     updatedExperiences[index][field] = value;
//     setExperiences(updatedExperiences);
//   };

//   const handleSkillChange = (expIndex, skillIndex, value) => {
//     const updatedExperiences = [...experiences];
//     updatedExperiences[expIndex].skills[skillIndex] = value;
//     setExperiences(updatedExperiences);
//   };

//   const handleAddSkill = (expIndex) => {
//     const updatedExperiences = [...experiences];
//     updatedExperiences[expIndex].skills.push("");
//     setExperiences(updatedExperiences);
//   };

//   const handleDeleteSkill = (expIndex, skillIndex) => {
//     const updatedExperiences = [...experiences];
//     updatedExperiences[expIndex].skills.splice(skillIndex, 1);
//     setExperiences(updatedExperiences);
//   };

//   const monthMap = {
//     January: "01",
//     February: "02",
//     March: "03",
//     April: "04",
//     May: "05",
//     June: "06",
//     July: "07",
//     August: "08",
//     September: "09",
//     October: "10",
//     November: "11",
//     December: "12",
//   };

//   const formatDate = (month, year) => {
//     const monthNumber = monthMap[month]; // Convert month name to number
//     return `${year}-${monthNumber}-01`; // Assuming the day is the 1st, you can modify this if needed
//   };

//   return (
//     <div className="space-y-4">
//       {doctorData?.data?.yearsOfExperience?.map((experience, index) => (
//         <div key={index}>
//           {/* Toggle Button */}
//           <button
//             className="w-full text-left font-bold bg-gray-100 p-4 rounded-md focus:border-[#4358f6] focus:outline-none"
//             onClick={() => toggleSection(index)}
//           >
//             {experience.jobTitle || `Experience ${index + 1}`}
//           </button>

//           {/* Collapsible Content */}
//           {openSection === index && (
//             <div className="p-4 border border-gray-200 rounded-md space-y-4">
//               {/* Description */}
//               <div className="flex flex-col gap-1">
//                 <label className="px-2 font-bold">Description</label>
//                 <input
//                   type="text"
//                   value={experience.description}
//                   placeholder="Enter Description"
//                   className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//                   onChange={(e) =>
//                     handleInputChange(index, "description", e.target.value)
//                   }
//                 />
//               </div>

//               {/* Employment Type */}
//               <div className="flex flex-col gap-1">
//                 <label className="px-2 font-bold">Employment Type</label>
//                 <input
//                   type="text"
//                   value={experience.employmentType}
//                   placeholder="Enter Employment Type"
//                   className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//                   onChange={(e) =>
//                     handleInputChange(index, "employmentType", e.target.value)
//                   }
//                 />
//               </div>

//               {/* Start Date and End Date */}
//               <div className="flex gap-4">
//                 <div className="flex flex-col gap-1 w-full">
//                   <label className="px-2 font-bold">Start Date</label>
//                   <input
//                     type="date"
//                     value={formatDate(
//                       experience.startDate.month,
//                       experience.startDate.year
//                     )}
//                     className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//                     onChange={(e) =>
//                       handleInputChange(index, "startDate", e.target.value)
//                     }
//                   />
//                 </div>
//                 <div className="flex flex-col gap-1 w-full">
//                   <label className="px-2 font-bold">End Date</label>
//                   <input
//                     type="date"
//                     value={formatDate(
//                       experience.endDate.month,
//                       experience.endDate.year
//                     )}
//                     className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//                     onChange={(e) =>
//                       handleInputChange(index, "endDate", e.target.value)
//                     }
//                   />
//                 </div>
//               </div>

//               {/* Job Title */}
//               <div className="flex flex-col gap-1">
//                 <label className="px-2 font-bold">Job Title</label>
//                 <input
//                   type="text"
//                   value={experience.jobTitle}
//                   placeholder="Enter Job Title"
//                   className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//                   onChange={(e) =>
//                     handleInputChange(index, "jobTitle", e.target.value)
//                   }
//                 />
//               </div>

//               {/* Organisation Location */}
//               <div className="flex flex-col gap-1">
//                 <label className="px-2 font-bold">Organisation Location</label>
//                 <input
//                   type="text"
//                   value={experience.organizationLocation}
//                   placeholder="Enter Location"
//                   className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//                   onChange={(e) =>
//                     handleInputChange(
//                       index,
//                       "organisationLocation",
//                       e.target.value
//                     )
//                   }
//                 />
//               </div>

//               {/* Organisation Name */}
//               <div className="flex flex-col gap-1">
//                 <label className="px-2 font-bold">Organisation Name</label>
//                 <input
//                   type="text"
//                   value={experience.organizationName}
//                   placeholder="Enter Organisation Name"
//                   className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//                   onChange={(e) =>
//                     handleInputChange(index, "organisationName", e.target.value)
//                   }
//                 />
//               </div>

//               {/* Skills Section */}
//               <div className="flex flex-col gap-1">
//                 <label className="px-2 font-bold">Skills</label>
//                 <div className="flex flex-wrap gap-2">
//                   {experience.skills.map((skill, skillIndex) => (
//                     <div key={skillIndex} className="flex items-center gap-2">
//                       <input
//                         type="text"
//                         value={skill}
//                         className="border border-gray-400 px-2 py-1 rounded-md focus:border-[#4358f6]"
//                         onChange={(e) =>
//                           handleSkillChange(index, skillIndex, e.target.value)
//                         }
//                       />
//                       <button
//                         onClick={() => handleDeleteSkill(index, skillIndex)}
//                         className="text-red-500 px-2 py-1 rounded-md"
//                       >
//                         Delete
//                       </button>
//                     </div>
//                   ))}
//                 </div>
//                 {/* Add New Skill Button */}
//                 <button
//                   onClick={() => handleAddSkill(index)}
//                   className="mt-2 px-3 py-1 bg-blue-500 text-white rounded-md"
//                 >
//                   Add Skill
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EditDoctorExperience;
