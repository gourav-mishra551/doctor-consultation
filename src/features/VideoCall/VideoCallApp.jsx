import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import MyUILayout from "./MyUILayout";

const apiKey = "mmhfdzb5evj2";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0hhbl9Tb2xvIiwidXNlcl9pZCI6Ikhhbl9Tb2xvIiwidmFsaWRpdHlfaW5fc2Vjb25kcyI6NjA0ODAwLCJpYXQiOjE3MzIxNjgwNjgsImV4cCI6MTczMjc3Mjg2OH0.wLdyf4duA0I3jO4pGOzIaNhPr3PInInma3vCM5-KTFI";
const userId = "Han_Solo";
const callId = "41FBEO0AjsDr";

const user = {
  id: userId,
  name: "Oliver",
  image: "https://getstream.io/random_svg/?id=oliver&name=Oliver",
};

const client = new StreamVideoClient({ apiKey, user, token });
const call = client.call("default", callId);
call.join({ create: true });

export default function VideoCallApp() {
  return (
    <StreamVideo client={client}>
      <MyUILayout call={call} />
    </StreamVideo>
  );
}
