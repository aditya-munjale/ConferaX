import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { IconButton } from "@mui/material";

export default function History() {
  const { getHistoryOfUser } = useContext(AuthContext);
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const routeTo = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const history = await getHistoryOfUser();
        setMeetings(history);
      } catch (error) {
        console.error("Error fetching history:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [getHistoryOfUser]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${day}/${month}/${year} • ${hours}:${minutes}`;
  };

  const getTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now - date) / (1000 * 60));
      return `${diffInMinutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hours ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays} days ago`;
    }
  };

  const handleJoinMeeting = (meetingCode) => {
    routeTo(`/${meetingCode}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 sm:mb-12 gap-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => routeTo("/home")}
              className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-xl shadow-md hover:shadow-lg hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 group"
            >
              <HomeIcon className="text-gray-700 group-hover:text-blue-600" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 flex items-center">
                <HistoryIcon className="mr-3 text-blue-600" />
                Meeting History
              </h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">
                View and join your recent video conferences
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="hidden sm:flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl">
              <span className="font-bold mr-2">{meetings.length}</span>
              <span>Meetings</span>
            </div>
            <button
              onClick={() => routeTo("/home")}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <HomeIcon className="mr-2" />
              <span className="hidden sm:inline">Back to Home</span>
              <span className="sm:hidden">Home</span>
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Meetings</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {meetings.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <HistoryIcon className="text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900">
                  {
                    meetings.filter((meeting) => {
                      const meetingDate = new Date(meeting.date);
                      const now = new Date();
                      return (
                        meetingDate.getMonth() === now.getMonth() &&
                        meetingDate.getFullYear() === now.getFullYear()
                      );
                    }).length
                  }
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CalendarTodayIcon className="text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 sm:p-6 shadow-md border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Last Meeting</p>
                <p className="text-lg sm:text-xl font-bold text-gray-900">
                  {meetings.length > 0
                    ? getTimeAgo(meetings[0].date)
                    : "No meetings"}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <AccessTimeIcon className="text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-gray-600 text-lg">
              Loading your meeting history...
            </p>
          </div>
        ) : (
          <>
            {/* Meetings Grid */}
            {meetings.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {meetings.map((meeting, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.02] border border-gray-200 overflow-hidden group"
                  >
                    <div className="p-5 sm:p-6">
                      {/* Meeting Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                            <MeetingRoomIcon className="text-white text-lg sm:text-xl" />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg sm:text-xl text-gray-900">
                              Meeting #{index + 1}
                            </h3>
                            <p className="text-sm text-gray-500 flex items-center mt-1">
                              <AccessTimeIcon className="mr-1 text-xs" />
                              {getTimeAgo(meeting.date)}
                            </p>
                          </div>
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                          #{index + 1}
                        </span>
                      </div>

                      {/* Meeting Details */}
                      <div className="space-y-4">
                        <div className="bg-gray-50 rounded-xl p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-600 mb-1">
                                Meeting Code
                              </p>
                              <p className="font-mono text-lg sm:text-xl font-bold text-gray-900">
                                {meeting.meetingCode}
                              </p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                              <span className="text-blue-600 font-bold">#</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center text-gray-700">
                          <CalendarTodayIcon className="text-gray-400 mr-3" />
                          <div>
                            <p className="text-sm text-gray-600">Date & Time</p>
                            <p className="font-medium">
                              {formatDate(meeting.date)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 pt-4 border-t border-gray-100">
                        <div className="flex flex-col sm:flex-row gap-3">
                          <button
                            onClick={() =>
                              handleJoinMeeting(meeting.meetingCode)
                            }
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center justify-center group"
                          >
                            <MeetingRoomIcon className="mr-2 group-hover:scale-110 transition-transform" />
                            Join Again
                          </button>
                          <button
                            onClick={() =>
                              navigator.clipboard.writeText(meeting.meetingCode)
                            }
                            className="flex-1 bg-white text-blue-600 hover:bg-blue-50 font-semibold py-3 px-4 rounded-xl border border-blue-200 transition-colors duration-300 flex items-center justify-center group"
                          >
                            <span className="mr-2 group-hover:scale-110 transition-transform">
                              📋
                            </span>
                            Copy Code
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Decorative Element */}
                    <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 w-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-16 sm:py-24">
                <div className="w-32 h-32 sm:w-48 sm:h-48 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full flex items-center justify-center mb-6">
                  <HistoryIcon className="text-gray-400 text-4xl sm:text-6xl" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  No Meeting History
                </h3>
                <p className="text-gray-600 text-center max-w-md mb-8">
                  You haven't joined any meetings yet. Start by creating or
                  joining a video call.
                </p>
                <button
                  onClick={() => routeTo("/home")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center"
                >
                  <MeetingRoomIcon className="mr-3" />
                  Start Your First Meeting
                </button>
              </div>
            )}

            {/* Footer Info */}
            {meetings.length > 0 && (
              <div className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                <div className="flex flex-col sm:flex-row items-center justify-between">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">
                      Need help with past meetings?
                    </h4>
                    <p className="text-gray-600 text-sm">
                      You can join any meeting from your history by clicking
                      "Join Again"
                    </p>
                  </div>
                  <button
                    onClick={() => routeTo("/home")}
                    className="mt-4 sm:mt-0 bg-white text-blue-600 hover:bg-blue-50 font-semibold px-6 py-3 rounded-xl border border-blue-200 transition-colors duration-300"
                  >
                    Create New Meeting
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
