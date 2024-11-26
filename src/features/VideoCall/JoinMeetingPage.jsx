import React, { useEffect, useState } from 'react';
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
import axios from 'axios';

const JoinMeetingPage = () => {
  const [call, setCall] = useState(null);
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);

  const urlParams = new URLSearchParams(window.location.search);
  const callId = urlParams.get('call_id');
  const callType = urlParams.get('call_type') || 'default';

  const userId = localStorage.getItem('Id') || 'default-user';
  const apiKey = 'x84krkabkgdr';
  const tokenEndpoint = 'https://api.assetorix.com/ah/api/v1/create-meeting/'; // Replace with your actual token API

  useEffect(() => {
    const initializeCall = async () => {
      try {
        const response = await axios.get(`${tokenEndpoint}${userId}`);
        const token = response.data.token;

        const user = {
          id: userId,
          name: 'Gourav',
          image: 'https://getstream.io/random_svg/?id=gourav&name=Gourav',
        };

        const newClient = new StreamVideoClient({ apiKey, user, token });
        setClient(newClient);

        const myCall = newClient.call(callType, callId);
        await myCall.join({ create: true });
        setCall(myCall);
      } catch (error) {
        console.error('Error joining the call:', error);
      } finally {
        setLoading(false);
      }
    };

    if (callId) {
      initializeCall();
    }
  }, [callId, callType, userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!client || !call) {
    return <div>Unable to join the meeting. Please check the meeting link.</div>;
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
    return <div>Connecting...</div>;
  }

  return (
    <StreamTheme>
      <SpeakerLayout participantsBarPosition="bottom" />
      <CallControls />
    </StreamTheme>
  );
};

export default JoinMeetingPage;
