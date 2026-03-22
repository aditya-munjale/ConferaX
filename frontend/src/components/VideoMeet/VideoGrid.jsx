import React, { useEffect, useState } from 'react';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import FullscreenExitIcon from '@mui/icons-material/FullscreenExit';

export default function VideoGrid({ localVideoRef, videos }) {
  // Track which video is currently expanded
  const [pinnedVideoId, setPinnedVideoId] = useState(null);

  // Keep local video attached
  useEffect(() => {
    if (localVideoRef.current && window.localStream) {
      localVideoRef.current.srcObject = window.localStream;
    }
  }, [localVideoRef]);

  // If the person we pinned leaves the meeting, unpin them automatically
  useEffect(() => {
    if (pinnedVideoId && !videos.find(v => v.socketId === pinnedVideoId)) {
      setPinnedVideoId(null);
    }
  }, [videos, pinnedVideoId]);

  const togglePin = (id) => {
    if (pinnedVideoId === id) setPinnedVideoId(null);
    else setPinnedVideoId(id);
  };

  const pinnedVideo = videos.find(v => v.socketId === pinnedVideoId);
  const unpinnedVideos = videos.filter(v => v.socketId !== pinnedVideoId);

  return (
    <div className="flex-1 p-4 sm:p-6 pt-24 pb-32 flex flex-col lg:flex-row gap-4 h-full relative">
      
      {/* Local Video (Always floating in the bottom right) */}
      <div className={`absolute z-40 shadow-2xl transition-all duration-300 cursor-pointer ${pinnedVideo ? 'bottom-32 right-6 w-32 sm:w-48' : 'bottom-32 right-6 w-48 sm:w-64'}`}>
        <div className="p-1 bg-gray-800 rounded-2xl border border-gray-700">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            className="w-full aspect-video rounded-xl bg-gray-900 object-cover"
          ></video>
          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-white px-2 py-1 rounded text-xs font-bold">
            You
          </div>
        </div>
      </div>

      {pinnedVideo ? (
        /* --- PINNED (EXPANDED) LAYOUT --- */
        <div className="flex flex-col lg:flex-row w-full h-full gap-4">
          
          {/* Main Large Video */}
          <div className="flex-1 bg-black rounded-3xl overflow-hidden border border-gray-800 shadow-2xl relative group">
            <video
              autoPlay
              className="w-full h-full object-contain" // object-contain ensures NO CROPPING for screen shares
              ref={(ref) => { if (ref && pinnedVideo.stream) ref.srcObject = pinnedVideo.stream; }}
            ></video>
            
            <div className="absolute bottom-6 left-6 bg-gray-900/80 backdrop-blur-md border border-gray-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center shadow-lg">
              <div className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></div>
              {pinnedVideo.username || "Participant"}
            </div>

            <button 
              onClick={() => togglePin(pinnedVideo.socketId)} 
              className="absolute top-6 right-6 bg-gray-900/80 hover:bg-gray-700 backdrop-blur-md text-white p-3 rounded-xl border border-gray-600 transition-all shadow-lg"
              title="Unpin Video"
            >
              <FullscreenExitIcon />
            </button>
          </div>

          {/* Sidebar for the rest of the users */}
          {unpinnedVideos.length > 0 && (
            <div className="w-full lg:w-72 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto pb-4 lg:pb-0 scrollbar-hide">
              {unpinnedVideos.map((video) => (
                <div key={video.socketId} className="relative bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 shadow-md aspect-video flex-shrink-0 w-48 lg:w-full group">
                  <video 
                    autoPlay 
                    className="w-full h-full object-contain bg-black" 
                    ref={(ref) => { if (ref && video.stream) ref.srcObject = video.stream; }}
                  ></video>
                  <div className="absolute bottom-2 left-2 bg-gray-900/80 backdrop-blur-md border border-gray-700 text-white px-2 py-1 rounded-lg text-xs font-bold">
                     {video.username || "Participant"}
                  </div>
                  <button 
                    onClick={() => togglePin(video.socketId)} 
                    className="absolute top-2 right-2 bg-gray-900/80 hover:bg-gray-700 backdrop-blur-md text-white p-1.5 rounded-lg border border-gray-600 transition-all opacity-0 group-hover:opacity-100"
                  >
                    <FullscreenIcon fontSize="small" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* --- STANDARD GRID LAYOUT --- */
        <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-center justify-center">
          {videos.map((video) => (
            <div
              key={video.socketId}
              className="relative bg-black rounded-3xl overflow-hidden border border-gray-800 shadow-xl h-full max-h-[80vh] w-full group transition-all duration-300 hover:border-purple-500/50"
            >
              <video
                autoPlay
                className="w-full h-full object-contain" // Fixed cropping issue here too!
                ref={(ref) => {
                  if (ref && video.stream) ref.srcObject = video.stream;
                }}
              ></video>
              
              <div className="absolute bottom-6 left-6 bg-gray-900/80 backdrop-blur-md border border-gray-700 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center shadow-lg">
                <div className="w-2 h-2 rounded-full bg-green-400 mr-2"></div>
                {video.username || "Participant"}
              </div>

              {/* Expand Button (Shows on Hover) */}
              <button 
                onClick={() => togglePin(video.socketId)} 
                className="absolute top-6 right-6 bg-gray-900/80 hover:bg-gray-700 backdrop-blur-md text-white p-3 rounded-xl border border-gray-600 transition-all opacity-0 group-hover:opacity-100 shadow-lg"
                title="Pin to main screen"
              >
                <FullscreenIcon />
              </button>
            </div>
          ))}

          {/* Empty state filler if alone */}
          {videos.length === 0 && (
            <div className="col-span-full h-full flex flex-col items-center justify-center opacity-50">
              <div className="w-24 h-24 rounded-full bg-gray-800 flex items-center justify-center mb-4">
                <span className="text-4xl text-gray-600">👤</span>
              </div>
              <p className="text-gray-500 font-medium text-lg">Waiting for others to join...</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}