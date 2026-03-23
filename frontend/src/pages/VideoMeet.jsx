import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
  LiveKitRoom,
  VideoConference,
  RoomAudioRenderer,
} from "@livekit/components-react";
import "@livekit/components-styles";
import useSpeechToText from "../hooks/useSpeechToText";
import ReactMarkdown from "react-markdown";

export default function VideoMeetComponent() {
  const { url } = useParams();
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState(url || "");
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [sessionTitle, setSessionTitle] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const [meetingEnded, setMeetingEnded] = useState(false);
  const [summary, setSummary] = useState(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  const liveKitUrl = "wss://conferax-bnet0895.livekit.cloud";

  const handleJoin = async () => {
    if (!username.trim() || !roomName.trim()) {
      setError("Please enter your name and room code.");
      return;
    }
    try {
      setIsLoading(true);
      setError("");
      const response = await fetch(
        "http://localhost:8000/api/v1/livekit/getToken",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ roomName, participantName: username }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setToken(data.token);
        setMeetingEnded(false);
        setSummary(null);
      } else {
        setError(data.message || "Failed to get token");
      }
    } catch (err) {
      setError("Could not connect to server.");
    } finally {
      setIsLoading(false);
    }
  };

  // --- THIS NOW ACCEPTS THE FINAL SCRIPT FROM THE CHILD COMPONENT ---
  const triggerMeetingSummary = async (finalTranscript) => {
    setToken(""); // Disconnect from room
    setMeetingEnded(true); // Show dashboard

    if (!finalTranscript || finalTranscript.trim() === "") {
      setSummary("No conversation was recorded during this meeting.");
      return;
    }

    setIsSummarizing(true);
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/meetings/summary",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ transcript: finalTranscript }),
        },
      );
      const data = await response.json();
      if (response.ok) {
        setSummary(data.summary);
      } else {
        setSummary("Failed to generate summary: " + data.message);
      }
    } catch (err) {
      setSummary("Error connecting to the AI server.");
    } finally {
      setIsSummarizing(false);
    }
  };

  const handleSaveToLibrary = async () => {
    if (!sessionTitle.trim()) {
      setSaveMessage("Please enter a title for this reading session!");
      return;
    }
    setIsSaving(true);
    setSaveMessage("");
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/library/save",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: sessionTitle, content: summary }),
        },
      );
      if (response.ok) {
        setSaveMessage("✨ Successfully saved to the Community Library!");
      } else {
        setSaveMessage("Failed to save. Please try again.");
      }
    } catch (err) {
      setSaveMessage("Error connecting to the database.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- UI: POST-MEETING DASHBOARD ---
  if (meetingEnded) {
    return (
      <div className="min-h-screen flex flex-col items-center p-8 bg-gradient-to-b from-gray-900 to-[#0f111a] font-sans text-white">
        <div className="max-w-3xl w-full bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl mt-10">
          <h2 className="text-3xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            Meeting Summary
          </h2>
          <div className="bg-gray-900/50 rounded-xl p-6 min-h-[200px] border border-gray-700">
            {isSummarizing ? (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-4 pt-10 pb-10">
                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="animate-pulse">
                  Gemini AI is analyzing the transcript...
                </p>
              </div>
            ) : (
              <div className="text-gray-200 text-lg leading-relaxed">
                <ReactMarkdown
                  components={{
                    strong: ({ node, ...props }) => (
                      <span className="font-bold text-purple-300" {...props} />
                    ),
                    ul: ({ node, ...props }) => (
                      <ul
                        className="list-disc pl-6 space-y-3 my-4 marker:text-purple-500"
                        {...props}
                      />
                    ),
                    li: ({ node, ...props }) => <li {...props} />,
                    h3: ({ node, ...props }) => (
                      <h3
                        className="text-2xl font-bold mt-8 mb-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400"
                        {...props}
                      />
                    ),
                    p: ({ node, ...props }) => (
                      <p className="mb-4" {...props} />
                    ),
                  }}
                >
                  {summary}
                </ReactMarkdown>
              </div>
            )}
          </div>

          {!isSummarizing && summary && (
            <div className="mt-8 bg-gray-900/50 p-6 rounded-xl border border-gray-700">
              <h3 className="text-xl font-bold mb-4 text-purple-400">
                Save this Session
              </h3>
              <input
                type="text"
                value={sessionTitle}
                onChange={(e) => setSessionTitle(e.target.value)}
                placeholder="e.g., Team Sync"
                className="w-full px-5 py-3 mb-4 bg-gray-800 border border-gray-600 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500"
              />
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSaveToLibrary}
                  disabled={isSaving}
                  className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg disabled:opacity-50"
                >
                  {isSaving ? "Saving..." : "📚 Publish to Library"}
                </button>
                <button
                  onClick={() => setMeetingEnded(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 rounded-xl transition-all"
                >
                  Return to Lobby
                </button>
              </div>
              {saveMessage && (
                <p
                  className={`mt-4 text-center font-bold ${saveMessage.includes("✨") ? "text-green-400" : "text-red-400"}`}
                >
                  {saveMessage}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }

  // --- UI: THE LOBBY ---
  if (token === "") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-gray-900 to-[#0f111a]">
        <div className="bg-gray-800/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <h2 className="text-3xl font-black mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">
            Join ConferaX
          </h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-5 py-4 mb-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Display Name"
          />
          <input
            type="text"
            value={roomName}
            onChange={(e) => setRoomName(e.target.value)}
            className="w-full px-5 py-4 mb-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white uppercase outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Room Code"
          />
          {error && (
            <p className="text-red-500 text-sm font-bold text-center mb-4">
              {error}
            </p>
          )}
          <button
            onClick={handleJoin}
            disabled={isLoading}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
          >
            {isLoading ? "Connecting..." : "Join Meeting"}
          </button>
        </div>
      </div>
    );
  }

  // --- UI: THE LIVE VIDEO ROOM WRAPPER ---
  return (
    <div
      style={{
        height: "100vh",
        backgroundColor: "#0f111a",
        position: "relative",
      }}
    >
      <LiveKitRoom
        video={true}
        audio={true}
        token={token}
        serverUrl={liveKitUrl}
        data-lk-theme="default"
        style={{ height: "100%" }}
      >
        {/* WE RENDER THE CHILD COMPONENT HERE, SAFELY INSIDE THE ROOM */}
        <ActiveRoomFeatures onMeetingEnd={triggerMeetingSummary} />
      </LiveKitRoom>
    </div>
  );
}

// =====================================================================
// NEW CHILD COMPONENT: This runs safely INSIDE the LiveKit network!
// =====================================================================
function ActiveRoomFeatures({ onMeetingEnd }) {
  // 1. Because we are inside the room, useDataChannel inside this hook works perfectly!
  const { caption, fullTranscriptRef, isListening, toggleListening } =
    useSpeechToText();

  // 2. Custom button logic to grab the notes BEFORE disconnecting
  const handleCustomDisconnect = () => {
    const finalNotes = fullTranscriptRef.current;
    onMeetingEnd(finalNotes);
  };

  return (
    <>
      <VideoConference />
      <RoomAudioRenderer />

      {/* --- NEW: CUSTOM "END MEETING" BUTTON --- */}
      <button
        onClick={handleCustomDisconnect}
        className="absolute top-6 right-6 z-50 bg-red-600 hover:bg-red-500 text-white px-6 py-3 rounded-xl font-bold shadow-2xl transition-all border border-red-400"
      >
        🚪 End Meeting & Summarize
      </button>

      <button
        onClick={toggleListening}
        className={`absolute bottom-24 left-6 z-50 px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-all ${
          isListening
            ? "bg-red-500 text-white animate-pulse"
            : "bg-gray-800 text-gray-300 border border-gray-600 hover:bg-gray-700"
        }`}
      >
        {isListening ? "🔴 Stop Captions" : "💬 Start Captions"}
      </button>

      {isListening && caption && (
        <div className="absolute bottom-32 left-0 right-0 z-40 flex justify-center pointer-events-none">
          <div className="bg-black/70 backdrop-blur-md px-6 py-3 rounded-2xl max-w-3xl border border-gray-700/50 shadow-2xl mx-4">
            <p className="text-white text-lg md:text-xl font-medium tracking-wide text-center">
              {caption}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
