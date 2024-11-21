import {
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0pvcnV1c19DX0Jhb3RoIiwidXNlcl9pZCI6IkpvcnV1c19DX0Jhb3RoIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MzIxODA2MTksImV4cCI6MTczMjc4NTQxOX0.ezOqboQnU8K9E5ImLv847NB6vz9YP3hch1pc2qIIEbw";
const userId = "Joruus_C_Baoth";
const callId = "elxAsO9roVyi";

// set up the user object
const user = {
  id: userId,
  name: "Arman",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

console.log(client);

export default function App() {
  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <MyUILayout />
      </StreamCall>
    </StreamVideo>
  );
}

export const MyUILayout = () => {
  const call = useCall();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();

  if (callingState !== CallingState.JOINED) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Call "{call.id}" has {participantCount} participants
    </div>
  );
};
