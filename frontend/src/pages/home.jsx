import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { TextField, Button } from "@mui/material";
import RestoreIcon from "@mui/icons-material/Restore";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import LogoutIcon from "@mui/icons-material/Logout";
import HistoryIcon from "@mui/icons-material/History";
import { AuthContext } from "../contexts/AuthContext";

function HomeComponent() {
  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");
  const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);

  const { addToUserHistory } = useContext(AuthContext);

  let handleJoinVideoCall = async () => {
    if (meetingCode.trim()) {
      await addToUserHistory(meetingCode);
      navigate(`/${meetingCode}`);
    }
  };

  const handleCreateMeeting = () => {
    const randomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    setMeetingCode(randomCode);
    setIsCreatingMeeting(true);
  };

  const handleJoinMeeting = () => {
    if (meetingCode.trim()) {
      handleJoinVideoCall();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleJoinMeeting();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="px-4 py-4 sm:px-6 lg:px-8 border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <VideoCallIcon className="text-white text-sm" />
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              ConferaX
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate("/history")}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600"
            >
              <HistoryIcon />
              <span className="hidden sm:inline">History</span>
            </button>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth");
              }}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              <LogoutIcon className="text-sm" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Start or join a <span className="text-blue-600">meeting</span>
              </h1>

              <p className="text-gray-600 mb-8">
                Create a new video call or join an existing one
              </p>

              {/* Join Meeting Section */}
              <div className="bg-white rounded-xl p-6 mb-6 border border-gray-200">
                <h3 className="font-bold text-gray-900 mb-4">Join a Meeting</h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <TextField
                    fullWidth
                    onChange={(e) => {
                      setMeetingCode(e.target.value);
                      setIsCreatingMeeting(false);
                    }}
                    onKeyPress={handleKeyPress}
                    value={meetingCode}
                    label="Meeting Code"
                    variant="outlined"
                    size="medium"
                  />
                  <Button
                    onClick={handleJoinMeeting}
                    variant="contained"
                    size="large"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Join
                  </Button>
                </div>
                {isCreatingMeeting && (
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <p className="text-blue-700 text-sm">
                      Meeting code:{" "}
                      <span className="font-mono font-bold">{meetingCode}</span>
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={handleCreateMeeting}
                  className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                      <VideoCallIcon className="text-blue-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Create Meeting
                    </h4>
                    <p className="text-sm text-gray-600">
                      Start a new video call
                    </p>
                  </div>
                </button>

                <button
                  onClick={() => navigate("/history")}
                  className="bg-white border border-gray-200 rounded-xl p-6 text-center hover:bg-gray-50"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-3">
                      <RestoreIcon className="text-gray-600" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Meeting History
                    </h4>
                    <p className="text-sm text-gray-600">View past meetings</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default withAuth(HomeComponent);
