import React from "react";
import {
  useCall,
  useCallStateHooks,
  CallingState,
} from "@stream-io/video-react-sdk";

const MyUILayout = () => {
  const call = useCall();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Call "{call?.id}" has {participantCount} participant(s)
    </div>
  );
};

export default MyUILayout;
