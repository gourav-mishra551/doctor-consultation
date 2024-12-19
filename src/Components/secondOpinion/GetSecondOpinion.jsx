import axios from 'axios'
import React, { useEffect, useState } from 'react'

function GetSecondOpinion() {
  const [Data, setData] = useState([])

  useEffect(() => {
    FetchSecondOpinionData()
  }, [])

  const FetchSecondOpinionData = async () => {
    const token = localStorage.getItem('token')
    const id = localStorage.getItem('Id')
    try {
      const res = await axios.get('https://api.assetorix.com/ah/api/v1/second-opinion', {
        headers: {
          Authorization: `Bearer ${token}`,
          id,
        },
      })
      setData(res.data.data)
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-semibold text-center mb-8">Second Opinion Requests</h1>
      <div className="flex flex-wrap justify-center gap-8 ">
        {Data.length === 0 ? (
          <p className="text-center text-xl">No data available</p>
        ) : (
          Data.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-lg shadow-lg w-80 sm:w-auto md:w-auto lg:w-full"
            >
              <h2 className="text-xl font-bold mb-4">{item.name}</h2>
              <p className="text-gray-700 mb-2"><strong>Email:</strong> {item.email}</p>
              <p className="text-gray-700 mb-4"><strong>Mobile:</strong> {item.mobile}</p>
              <div className="mb-4">
                <strong>Specialties:</strong>
                <ul className="list-disc pl-5">
                  {JSON.parse(item.speciality[0]).map((spec, index) => (
                    <li key={index} className="text-gray-700">{spec}</li>
                  ))}
                </ul>
              </div>
              <div className="mb-4">
                <strong>Documents:</strong>
                <div className="flex space-x-4">
                  {item.document.map((doc) => (
                    <a key={doc._id} href={doc.url} target="_blank" rel="noopener noreferrer">
                      <img src={doc.url} alt="Document" className="w-20 h-20 object-cover rounded" />
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <strong>Reason:</strong>
                <p className="text-gray-700">{item.reason}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default GetSecondOpinion
