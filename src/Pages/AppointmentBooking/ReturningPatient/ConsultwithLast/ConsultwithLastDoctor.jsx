import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const ConsultwithLastDoctor = () => {
  const [userBooking, setUserBooking] = useState([]);

  // Mock tokens and IDs (Replace these with your actual logic)
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id");
  const userBookings = async () => {
    try {
      const response = await axios.get(
        `https://api.assetorix.com/ah/api/v1/dc/user/history`,
        {
          headers: {
            authorization: `Bearer ${token}`,
            id: id,
          },
        }
      );
      setUserBooking(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    userBookings();
  }, []);
  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-[1200px] mx-auto">
      {userBooking?.data?.length > 0 ? (
        userBooking.data.map((booking, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <Link to= {`/doctors-individual-profile/${booking?.doctorId?._id}`}>
              <div className="p-4 flex flex-col items-center">
                <img
                  className="h-32 w-32 rounded-full object-cover"
                  src={
                    booking?.doctorId.userId.avatar ||
                    "https://via.placeholder.com/150?text=Default+Profile"
                  }
                  alt={booking.doctorId.userId?.name || "Doctor"}
                />
                <h1 className="text-xl font-semibold mt-4 text-gray-800">
                  {
                    booking?.doctorId.userId?.name
                      ? booking?.doctorId.userId?.name.match(/^Dr\.?\s?/i)
                        ? booking?.doctorId.userId?.name
                        : `Dr. ${booking?.doctorId.userId?.name}`
                      : "Unknown Name"
                  }
                </h1>

                <div className="mt-2 text-gray-600">
                  {booking?.doctorId.qualifications.map((data, idx) => (
                    <p key={idx} className="text-sm font-medium">
                      {data?.degree}
                    </p>
                  ))}
                </div>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-lg">No bookings found.</p>
      )}
    </div>

  )
}

export default ConsultwithLastDoctor