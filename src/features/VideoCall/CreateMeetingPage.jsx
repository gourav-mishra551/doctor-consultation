import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateMeetingPage = () => {
  const [meetingLink, setMeetingLink] = useState('');
  const [loading, setLoading] = useState(false);
  const userId = localStorage.getItem('Id') || 'default-user';
  const apiEndpoint = 'https://api.assetorix.com/ah/api/v1/create-meeting/';

  const navigate = useNavigate();

  const handleCreateMeeting = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${apiEndpoint}${userId}`);
      const meetingId = response.data.meetingId;
      setMeetingLink(`https://doctor-consultation.vercel.app/video-call/join?call_id=${meetingId}&call_type=default`);
    } catch (error) {
      console.error('Error creating meeting:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinMeeting = () => {
    if (meetingLink) {
      const url = new URL(meetingLink);
      navigate(`/join?${url.searchParams.toString()}`);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Create a Video Call</h1>
      <button onClick={handleCreateMeeting} disabled={loading} className='bg-green-400 p-3 rounded-md'>
        {loading ? 'Generating Meeting...' : 'Generate Meeting Link'}
      </button>
      {meetingLink && (
        <div>
          <p>Copy your meeting link:</p>
          <input type="text" value={meetingLink} readOnly style={{ width: '100%', padding: '0.5rem' }} />
          <button
            onClick={() => navigator.clipboard.writeText(meetingLink)}
            style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}
          >
            Copy Link
          </button>
          <br />
          <button
            onClick={handleJoinMeeting}
            className='p-2 text-white bg-green-200'
          >
            Join Meeting
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateMeetingPage;
