import React, { useEffect, useState } from "react";
import PrescriptionUploadData from "../PrescriptionUploadData/PrescriptionUploadData";
import axios from "axios";

const PrescriptionUpload = ({ onNext, onPrevious }) => {
    const [healthData, setHealthData] = useState(null); // State to store the API data
    const [error, setError] = useState(null); // State to store errors
    const [upload, setUpload] = useState(false)

    const getHealthData = async () => {
        try {
          const response = await axios.get('https://api.assetorix.com/ah/api/v1/health-record', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`,
              'id': localStorage.getItem('Id'),
            },
          });
          setHealthData(response.data); // Store the response data in state
        } catch (err) {
          console.error("Error fetching health data:", err);
          setError(err.message); // Store the error message
        }
      };

    useEffect(()=> {
            getHealthData()
    }, [])


    return (
        <div className="w-[60vw] mx-auto p-6 bg-white shadow-lg rounded-lg bg-gradient-to-r from-[#E3FDFD] via-[#fcfcfc] to-[#87dce7]">
            <div>
                <h1 className="text-center font-semibold uppercase">
                    share your health record with doctor
                </h1>
                {
                    healthData?.data?.map((data)=>{
                        return (
                            <div key={data?._id}>
                                <h2>File :{data?.title}</h2> 
                                <h2>Disease : {data?.disease}</h2>
                                <h2>Doctor :{data?.doctorName}</h2>
                                <div>
                                    <iframe src= {data?.fileURL} frameborder="0"></iframe>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            {upload &&
                <div>
                    <PrescriptionUploadData />
                    <div className="mt-4  flex justify-between">
                        <button
                            onClick={onPrevious}
                            className="mr-2 px-4 py-2 bg-gray-500 text-white rounded-lg"
                        >
                            Previous
                        </button>
                        <button
                            onClick={onNext}
                            className="px-4 py-2 bg-[#00768A] text-white rounded-lg"
                        >
                            Skip / Next
                        </button>
                    </div>
                </div>
            }
        </div>
    )
}

export default PrescriptionUpload