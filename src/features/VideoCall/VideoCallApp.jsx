import React, { useEffect } from "react";
import {
  CallControls,
  CallingState,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

// API credentials
const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0pvcnV1c19DX0Jhb3RoIiwidXNlcl9pZCI6IkpvcnV1c19DX0Jhb3RoIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MzIxODA2MTksImV4cCI6MTczMjc4NTQxOX0.ezOqboQnU8K9E5ImLv847NB6vz9YP3hch1pc2qIIEbw";
const userId = "Joruus_C_Baoth";
const callId = "elxAsO9roVyi";
const callType = "default";

// Initialize Stream Video Client
const client = new StreamVideoClient({
  apiKey,
  token,
  user: {
    id: userId,
    name: "This is a test user",
    image: "link/to/profile/image",
    role: "User",
  },
});

// Create a call instance
const call = client.call(callType, callId);

export default function App() {
  useEffect(() => {
    // Join the call on mount
    (async () => {
      try {
        await call.join({ create: true });
      } catch (err) {
        console.error("Error joining call:", err);
      }
    })();
  }, []);

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

// MyUILayout Component
export const MyUILayout = () => {
  const {
    useCallCallingState,
    useCallMembers,
    useCallCreatedBy,
    useCameraState,
  } = useCallStateHooks();

  const callingState = useCallCallingState();
  const members = useCallMembers();
  const creator = useCallCreatedBy();
  const { camera, isMuted: isCameraMuted } = useCameraState();

  useEffect(() => {
    // Enable the camera by default for all calls
    camera
      .enable()
      .catch((err) => console.error("Failed to enable the camera:", err));
  }, [camera]);

  // Show loading until joined
  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  // Determine members to show
  let membersToShow = [];
  if (call.isCreatedByMe) {
    membersToShow =
      members
        ?.slice(0, 3)
        .map(({ user }) => user)
        .filter(Boolean) || [];
  } else if (creator) {
    membersToShow = [creator];
  }

  return (
    <StreamTheme>
      <div style={{ display: "flex", flexDirection: "column", height: "auto" }}>
        {/* Show video preview or call members */}
        <div style={{ flex: 1 }}>
          {isCameraMuted ? (
            <CallMembers members={membersToShow} />
          ) : (
            <VideoPreview />
          )}
        </div>

        {/* Call Controls and Layout */}
        <div>
          <SpeakerLayout participantsBarPosition="bottom" />
          <CallControls />
        </div>
      </div>
    </StreamTheme>
  );
};

// CallMembers Component
const CallMembers = ({ members }) => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
    {members.map((member, index) => (
      <div
        key={index}
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <img
          src={member.image || "https://via.placeholder.com/50"}
          alt={member.name}
          style={{ borderRadius: "50%", marginBottom: "5px" }}
        />
        <div>{member.name || "Unknown"}</div>
      </div>
    ))}
  </div>
);
