import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { StreamChat } from "stream-chat";
import {
  Chat,
  Channel,
  MessageList,
  MessageInput,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import axios from "axios";
import { RxCross1 } from "react-icons/rx";
import { Navigate } from "react-router-dom";

const JoinMeetingPage = () => {
  const [call, setCall] = useState(null);
  const [videoClient, setVideoClient] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const urlParams = new URLSearchParams(window.location.search);
  const callId = urlParams.get("call_id");
  const callType = urlParams.get("call_type") || "default";
  const userId = localStorage.getItem("Id") || "default-user";
  const user = localStorage.getItem("user");
  const apiKey = "x84krkabkgdr"; // Replace with your API key
  const tokenEndpoint = "https://api.assetorix.com/ah/api/v1/create-meeting/"; // Replace with your actual token API

  useEffect(() => {
    const initialize = async () => {
      try {
        const response = await axios.get(`${tokenEndpoint}${userId}`);
        const token = response.data.token;
        const videoUser = {
          id: userId,
          name: localStorage.getItem("user") || "Anonymous",
          image: `https://getstream.io/random_svg/?id=random&name=${user}`,
        };
        const videoClient = StreamVideoClient.getOrCreateInstance({
          apiKey,
          user: videoUser,
          token,
        });
        setVideoClient(videoClient);

        const videoCall = videoClient.call(callType, callId);
        await videoCall.join({ create: true });
        setCall(videoCall);

        const chatClient = new StreamChat(apiKey);
        await chatClient.connectUser(videoUser, token);
        setChatClient(chatClient);

        const channel = chatClient.channel("messaging", callId, {
          name: `Chat for ${callId}`,
          members: [userId],
        });
        await channel.watch();
        setChannel(channel);
      } catch (error) {
        console.error("Error initializing meeting and chat:", error);
      } finally {
        setLoading(false);
      }
    };

    if (callId) {
      initialize();
    }
  }, [callId, callType, userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-lg font-semibold">
        Loading...
      </div>
    );
  }

  if (!videoClient || !call || !chatClient || !channel) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-lg text-red-600 font-semibold">
        Unable to join the meeting. Please check the meeting link. ddfda
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen">
      <div className="flex-grow flex">
        <StreamVideo client={videoClient} className="w-full lg:w-2/3">
          <StreamCall call={call}>
            <UILayout />
          </StreamCall>
        </StreamVideo>
        {/* Chat Section for larger screens */}
        <div className="hidden lg:block w-1/3">
          <ChatSection chatClient={chatClient} channel={channel} />
        </div>
      </div>

      {/* Chat Button for mobile */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed bottom-4 right-4 p-3 bg-blue-600 text-white rounded-full lg:hidden shadow-lg"
      >
        Chat
      </button>

      {/* Chat Modal for mobile */}
      {isChatOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-11/12 h-3/4 p-4 relative">
            <button
              onClick={() => setIsChatOpen(false)}
              className="absolute top-2 z-50 left-2 p-2 rounded-full bg-gray-200 text-gray-600 hover:text-gray-800"
            >
              <RxCross1 size={24} />
            </button>
            <ChatSection chatClient={chatClient} channel={channel} />
          </div>
        </div>
      )}
    </div>
  );
};

const ChatSection = ({ chatClient, channel }) => (
  <Chat client={chatClient} theme="messaging light" className="h-full">
    <Channel channel={channel}>
      <Window>
        <MessageList />
        <MessageInput />
      </Window>
    </Channel>
  </Chat>
);

const UILayout = () => {
  const navigate = useNavigate()
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  const renderConnectingState = () => (
    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-lg font-semibold">
      Connecting...
    </div>
  );

  // const renderLeftState = () => (
  //   <div className="flex flex-col items-center justify-center w-full h-full bg-gradient-to-b from-gray-100 to-gray-300 text-center">
  //     <div className="p-6 bg-white rounded-lg shadow-lg animate-fade-in">
  //       <div className="text-xl font-bold text-red-600 mb-4">
  //         🚫 You have left the call.
  //       </div>
  //       <p className="text-gray-700 mb-6">
  //         It looks like you've left the meeting. You can return to your profile or join another session.
  //       </p>
  //       <button
  //         className="px-6 py-2 bg-blue-600 text-white font-medium text-sm rounded-md shadow hover:bg-blue-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50"
  //         onClick={() => {
  //           navigate("/profile")
  //         }}
  //       >
  //         Go to Your Profile
  //       </button>
  //     </div>
  //   </div>
  // );
  
  switch (callingState) {
    case CallingState.UNKNOWN:
    case CallingState.IDLE:
    case CallingState.RINGING:
    case CallingState.JOINING:
    case CallingState.RECONNECTING:
    case CallingState.RECONNECTING_FAILED:
    case CallingState.OFFLINE:
      return renderConnectingState();

    case CallingState.JOINED:
      return (
        <StreamTheme>
          <div className="flex-grow relative">
            <SpeakerLayout participantsBarPosition="bottom" />
            <CallControls className="absolute bottom-4 left-0 right-0" />
          </div>
        </StreamTheme>
      );

    case CallingState.LEFT:
      return navigate("/profile?section=user-bookings#");

    default:
      return (
        <div className="flex items-center justify-center w-full h-full bg-gray-200 text-lg text-red-600 font-semibold">
          Unknown state. Please refresh the page.
        </div>
      );
  }
};


export default JoinMeetingPage;
