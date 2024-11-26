import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Call,
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
} from '@stream-io/video-react-sdk';

import '@stream-io/video-react-sdk/dist/css/styles.css';

const VideoCallApp = () => {
  const [meetingId, setMeetingId] = useState('');
  const [token, setToken] = useState('');
  const [call, setCall] = useState(null);
  const [client, setClient] = useState(null);

  const userId = localStorage.getItem('Id') || 'default-user';
  const apiKey = 'x84krkabkgdr';

  useEffect(() => {
    // Fetch meeting ID and token on mount
    const handleCreateMeeting = async () => {
      try {
        const response = await axios.get(`https://api.assetorix.com/ah/api/v1/create-meeting${userId}`);
        setMeetingId(response.data.meetingId);
        setToken(response.data.token);
      } catch (error) {
        console.error('Error creating meeting:', error);
      }
    };

    handleCreateMeeting();
  }, []);

  useEffect(() => {
    // Initialize StreamVideoClient when token and meetingId are available
    if (token && meetingId) {
      const user = {
        id: userId,
        name: 'Gourav',
        image: 'https://getstream.io/random_svg/?id=oliver&name=Oliver',
      };

      const newClient = new StreamVideoClient({ apiKey, user, token });
      setClient(newClient);

      // Initialize and join the call
      const myCall = newClient.call('default', meetingId);
      myCall
        .join({ create: true })
        .then(() => setCall(myCall))
        .catch((err) => {
          console.error('Failed to join the call:', err);
        });

      // Cleanup on component unmount
      return () => {
        myCall.leave().catch((err) => {
          console.error('Failed to leave the call:', err);
        });
        setCall(null);
        setClient(null);
      };
    }
  }, [token, meetingId]);

  if (!client || !call) {
    return <div>Loading...</div>;
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <UILayout />
      </StreamCall>
    </StreamVideo>
  );
};

const UILayout = () => {
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};

export default VideoCallApp;
