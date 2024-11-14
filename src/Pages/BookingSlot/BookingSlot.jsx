import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function BookingSlot() {
  const [DrProfile, setDrProfile] = useState({});
  const { id } = useParams();

  useEffect(() => {
    DrProfileFetch();
  }, []);

  const DrProfileFetch = async () => {
    try {
      const res = await axios.get(`https://api.assetorix.com/ah/api/v1/dc/user/doctors/${id}`);
      setDrProfile(res.data.data);
    } catch (error) {
      console.error('Error fetching doctor profile data:', error);
    }
  };

  return (
    <div className="min-h-screen bg-[#E0EBF1] flex justify-center items-center py-6">
      {DrProfile && (
        <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl p-8 space-y-6">
          {/* Profile Header */}
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-[#00768A]">{DrProfile.name}</h1>
            <p className="text-lg text-gray-600 mt-2">{DrProfile.specialty || 'Specialty Not Available'}</p>
          </div>

          {/* Profile Details */}
          <div className="space-y-4">
            <div className="flex justify-between text-lg text-gray-700">
              <span className="font-medium text-[#00768A]">Experience:</span>
              <span>{DrProfile.experience} years</span>
            </div>

            

           

            <div className="flex justify-between text-lg text-gray-700">
              <span className="font-medium text-[#00768A]">Address:</span>
              <span>{DrProfile.address || 'Address Not Available'}</span>
            </div>
          </div>

          {/* Book Appointment Button */}
          <div className="flex justify-center mt-6">
            <button className="bg-[#00768A] text-white px-6 py-3 rounded-full text-xl hover:bg-[#005c67] focus:outline-none transform transition-all hover:scale-105 active:scale-95">
              Book Appointment
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookingSlot;
