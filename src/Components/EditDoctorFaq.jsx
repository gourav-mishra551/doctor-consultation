// import React, { useState } from "react";

// const EditDoctorFaq = ({ doctorData }) => {
//   //   const [faqs, setFaqs] = useState([
//   //     { title: "Sample FAQ Title 1", value: "Sample FAQ answer 1 goes here." },
//   //     { title: "Sample FAQ Title 2", value: "Sample FAQ answer 2 goes here." },
//   //   ]);
//   const [openIndex, setOpenIndex] = useState(null);

//   const handleInputChange = (index, field, value) => {
//     const updatedFaqs = [...faqs];
//     updatedFaqs[index][field] = value;
//     setFaqs(updatedFaqs);
//   };

//   const toggleOpen = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   console.log(doctorData);

//   return (
//     <div className="space-y-4">
//       <h2 className="font-bold text-lg">FAQs</h2>
//       {doctorData?.data?.FAQ?.map((faq, index) => (
//         <div
//           key={index}
//           className="p-4 bg-gray-50 border border-gray-200 rounded-md space-y-4"
//         >
//           {/* FAQ Title - Click to Expand/Collapse */}
//           <button
//             onClick={() => toggleOpen(index)}
//             className="w-full text-left font-bold bg-gray-200 p-2 rounded-md"
//           >
//             {faq.title}
//           </button>

//           {/* Collapsible Content */}
//           {openIndex === index && (
//             <div className="space-y-4 mt-4">
//               {/* Editable FAQ Title */}
//               <div className="flex flex-col gap-1">
//                 <label className="px-2 font-bold">FAQ Title</label>
//                 <input
//                   type="text"
//                   value={faq.title}
//                   onChange={(e) =>
//                     handleInputChange(index, "title", e.target.value)
//                   }
//                   className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//                   placeholder="Enter FAQ title"
//                 />
//               </div>

//               {/* Editable FAQ Value */}
//               <div className="flex flex-col gap-1">
//                 <label className="px-2 font-bold">FAQ Value</label>
//                 <input
//                   type="text"
//                   value={faq.value}
//                   onChange={(e) =>
//                     handleInputChange(index, "value", e.target.value)
//                   }
//                   className="border border-gray-400 p-2 w-full rounded-xl focus:border-[#4358f6]"
//                   placeholder="Enter FAQ answer"
//                 />
//               </div>

//               <button
//                 className="bg-blue-500 text-white p-2 rounded-md"
//                 onClick={() => toggleOpen(null)}
//               >
//                 Save FAQ
//               </button>
//             </div>
//           )}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default EditDoctorFaq;
