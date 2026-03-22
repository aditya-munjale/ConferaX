import React from "react";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import CallEndIcon from "@mui/icons-material/CallEnd";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import ChatIcon from "@mui/icons-material/Chat";

export default function ControlBar({
  audio,
  video,
  screen,
  screenAvailable,
  showModal,
  newMessages,
  handleAudio,
  handleVideo,
  handleScreen,
  handleEndCall,
  toggleChat,
}) {
  return (
    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-40 w-full max-w-2xl px-4">
      <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-4 shadow-2xl flex items-center justify-center space-x-4 sm:space-x-6">
        <button
          onClick={handleAudio}
          className={`p-4 rounded-2xl transition-all ${
            audio
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
          }`}
        >
          {audio ? (
            <MicIcon fontSize="medium" />
          ) : (
            <MicOffIcon fontSize="medium" />
          )}
        </button>

        <button
          onClick={handleVideo}
          className={`p-4 rounded-2xl transition-all ${
            video
              ? "bg-gray-800 hover:bg-gray-700 text-white"
              : "bg-red-500/20 text-red-500 hover:bg-red-500/30"
          }`}
        >
          {video ? (
            <VideocamIcon fontSize="medium" />
          ) : (
            <VideocamOffIcon fontSize="medium" />
          )}
        </button>

        {screenAvailable && (
          <button
            onClick={handleScreen}
            className={`p-4 rounded-2xl transition-all ${
              screen
                ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50"
                : "bg-gray-800 hover:bg-gray-700 text-gray-300"
            }`}
          >
            {screen ? (
              <StopScreenShareIcon fontSize="medium" />
            ) : (
              <ScreenShareIcon fontSize="medium" />
            )}
          </button>
        )}

        <button
          onClick={toggleChat}
          className={`p-4 rounded-2xl transition-all relative ${
            showModal
              ? "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-900/50"
              : "bg-gray-800 hover:bg-gray-700 text-gray-300"
          }`}
        >
          <ChatIcon fontSize="medium" />
          {newMessages > 0 && (
            <span className="absolute -top-2 -right-2 bg-fuchsia-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-gray-900">
              {newMessages > 99 ? "99+" : newMessages}
            </span>
          )}
        </button>

        <div className="w-px h-10 bg-gray-700 mx-2"></div>

        <button
          onClick={handleEndCall}
          className="px-8 py-4 bg-red-600 hover:bg-red-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-red-900/30 flex items-center"
        >
          <CallEndIcon className="mr-2" />
          <span className="hidden sm:inline">Leave</span>
        </button>
      </div>
    </div>
  );
}
