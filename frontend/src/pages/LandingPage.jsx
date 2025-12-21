import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white">
      {/* Navigation */}
      <nav className="px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="font-bold text-lg">C</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
              ConferaX
            </h2>
          </div>
          
          <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8">
            <button
              onClick={() => router("/aljk23")}
              className="text-sm sm:text-base hover:text-orange-300 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-white/10"
            >
              Join as Guest
            </button>
            <button
              onClick={() => router("/auth")}
              className="text-sm sm:text-base hover:text-orange-300 transition-colors duration-300 px-3 py-1 rounded-lg hover:bg-white/10"
            >
              Register
            </button>
            <button
              onClick={() => router("/auth")}
              className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            {/* Left Content */}
            <div className="lg:w-1/2 mb-10 lg:mb-0 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-6">
                <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Connect
                </span>{" "}
                with your loved Ones
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Bridge the distance with crystal clear video calls
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-start">
                <Link
                  to={"/auth"}
                  className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl text-center"
                >
                  Get Started Free
                </Link>
                
                <button
                  onClick={() => router("/aljk23")}
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/30 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Join as Guest
                </button>
              </div>

              {/* Features Grid */}
              <div className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-500/20 to-pink-500/20 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-xl sm:text-2xl">🎥</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base mb-1">HD Video</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Crystal clear quality</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-xl sm:text-2xl">🔒</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base mb-1">Secure</h3>
                  <p className="text-xs sm:text-sm text-gray-400">End-to-end encrypted</p>
                </div>
                
                <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-5 rounded-xl border border-white/10 sm:col-span-2 lg:col-span-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500/20 to-teal-500/20 rounded-lg flex items-center justify-center mb-3">
                    <span className="text-xl sm:text-2xl">📱</span>
                  </div>
                  <h3 className="font-bold text-sm sm:text-base mb-1">Any Device</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Works on all platforms</p>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative max-w-lg w-full">
                <div className="absolute -inset-4 bg-gradient-to-r from-orange-500/20 to-purple-500/20 blur-3xl rounded-full"></div>
                <div className="relative bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl">
                  <img 
                    src="/mobile.png" 
                    alt="Video Conferencing App" 
                    className="w-full h-auto rounded-2xl transform hover:scale-105 transition-transform duration-500 shadow-lg"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://images.unsplash.com/photo-1596574202467-915fa42375c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
                    }}
                  />
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-orange-500 to-pink-500 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <span className="text-sm sm:text-base font-bold">LIVE</span>
                  </div>
                  
                  <div className="absolute -bottom-4 -left-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                    <span className="text-sm sm:text-base font-bold">24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400 text-sm sm:text-base">
            Join millions of users worldwide who trust ConferaX for their video calls
          </p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-4 sm:mt-6 text-gray-400 text-xs sm:text-sm">
            <span>✓ No downloads required</span>
            <span>✓ Free to use</span>
            <span>✓ Unlimited meetings</span>
            <span>✓ Screen sharing</span>
          </div>
        </div>
      </footer>
    </div>
  );
}