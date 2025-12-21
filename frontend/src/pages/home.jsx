import React, { useContext, useState } from "react";
import withAuth from "../utils/withAuth";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, TextField } from "@mui/material";
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
    // Generate a random meeting code
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Navigation Bar */}
      <nav className="px-4 sm:px-6 lg:px-8 py-4 bg-white/80 backdrop-blur-lg shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
              <VideoCallIcon className="text-white" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ConferaX
              </h2>
              <p className="text-xs text-gray-500 hidden sm:block">
                Premium Video Conferencing
              </p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4 sm:space-x-6">
            {/* History Button */}
            <button
              onClick={() => navigate("/history")}
              className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-300 group"
            >
              <div className="p-2 bg-gray-100 rounded-lg group-hover:bg-blue-50 transition-colors duration-300">
                <HistoryIcon className="text-gray-600 group-hover:text-blue-600" />
              </div>
              <span className="font-medium hidden sm:inline">History</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/auth");
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <LogoutIcon className="text-sm" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8">
            {/* Left Panel - Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              {/* Welcome Message */}
              <div className="mb-6 sm:mb-8">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-medium text-sm mb-4">
                  <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
                  Welcome back! Ready to connect?
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Seamless
                  </span>{" "}
                  Video Conferencing
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-8 sm:mb-10 max-w-2xl">
                  Professional-grade video calls with crystal clear audio,
                  screen sharing, and collaboration tools for teams of all
                  sizes.
                </p>
              </div>

              {/* Meeting Actions */}
              <div className="space-y-6">
                {/* Join Meeting Section */}
                <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mr-2"></span>
                    Join a Meeting
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <TextField
                      fullWidth
                      onChange={(e) => {
                        setMeetingCode(e.target.value);
                        setIsCreatingMeeting(false);
                      }}
                      onKeyPress={handleKeyPress}
                      value={meetingCode}
                      id="meeting-code"
                      label="Meeting Code"
                      variant="outlined"
                      size="medium"
                      className="bg-gray-50 rounded-xl"
                      InputProps={{
                        className: "rounded-xl",
                      }}
                    />
                    <Button
                      onClick={handleJoinMeeting}
                      variant="contained"
                      size="large"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 whitespace-nowrap"
                    >
                      Join Meeting
                    </Button>
                  </div>
                  {isCreatingMeeting && (
                    <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-blue-700 text-sm">
                        ✅ Created meeting code:{" "}
                        <span className="font-mono font-bold">
                          {meetingCode}
                        </span>
                      </p>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={handleCreateMeeting}
                    className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white p-4 sm:p-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-300">
                        <VideoCallIcon className="text-2xl" />
                      </div>
                      <h4 className="font-bold text-lg mb-1">Create Meeting</h4>
                      <p className="text-sm opacity-90">
                        Start a new video call
                      </p>
                    </div>
                  </button>

                  <button
                    onClick={() => navigate("/history")}
                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white p-4 sm:p-6 rounded-xl text-center transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
                  >
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3 group-hover:rotate-12 transition-transform duration-300">
                        <RestoreIcon className="text-2xl" />
                      </div>
                      <h4 className="font-bold text-lg mb-1">
                        Meeting History
                      </h4>
                      <p className="text-sm opacity-90">View past meetings</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Features Grid */}
              <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-blue-600">📹</span>
                  </div>
                  <h4 className="font-bold text-gray-900">HD Video</h4>
                  <p className="text-sm text-gray-600">1080p quality</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-purple-600">🔒</span>
                  </div>
                  <h4 className="font-bold text-gray-900">Secure</h4>
                  <p className="text-sm text-gray-600">End-to-end encrypted</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-xl border border-gray-200">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-green-600">👥</span>
                  </div>
                  <h4 className="font-bold text-gray-900">Unlimited</h4>
                  <p className="text-sm text-gray-600">
                    Up to 100 participants
                  </p>
                </div>
              </div>
            </div>

            {/* Right Panel - Image */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative max-w-lg w-full">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-200/50 to-purple-200/50 blur-3xl rounded-full"></div>
                <div className="relative bg-gradient-to-b from-white to-gray-50 rounded-3xl p-6 sm:p-8 shadow-2xl border border-gray-200">
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      srcSet="/logo3.png"
                      alt="Video Conferencing Interface"
                      className="w-full h-auto rounded-2xl transform hover:scale-105 transition-transform duration-700 shadow-xl"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                      }}
                    />
                  </div>

                  {/* Floating Stats */}
                  <div className="absolute -top-4 -left-4 bg-white p-4 rounded-2xl shadow-xl border border-gray-100">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-gray-900">
                        99%
                      </div>
                      <div className="text-xs text-gray-600">Uptime</div>
                    </div>
                  </div>

                  <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-2xl shadow-xl">
                    <div className="text-center">
                      <div className="text-2xl font-bold">50K+</div>
                      <div className="text-xs opacity-90">Active Users</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Section */}
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-6 sm:p-8 text-center border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Need help getting started?
            </h3>
            <p className="text-gray-600 mb-4">
              Check out our guide or contact support
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl border border-blue-200 transition-colors duration-300">
                View Tutorial
              </button>
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105">
                Contact Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(HomeComponent);
