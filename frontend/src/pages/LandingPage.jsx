import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="px-4 py-3 sm:py-4 lg:px-8 border-b border-gray-200 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 w-full sm:w-auto justify-between sm:justify-start mb-2 sm:mb-0">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="font-bold text-white text-sm sm:text-lg">
                  C
                </span>
              </div>
              <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
                ConferaX
              </h2>
            </div>

            {/* Mobile menu toggle (optional) */}
            <div className="sm:hidden"></div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={() => router("/auth")}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 px-2 sm:px-3 py-1 text-sm sm:text-base rounded"
            >
              Register
            </button>
            <button
              onClick={() => router("/auth")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-3 sm:px-4 py-1 sm:py-2 text-sm sm:text-base rounded-lg transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12 lg:py-16">
        <div className="max-w-6xl mx-auto">
          {/* Stack layout on mobile, side-by-side on desktop */}
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
            {/* Left Content - Comes first on mobile */}
            <div className="lg:w-1/2 text-center lg:text-left order-1 lg:order-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Connect with your{" "}
                <span className="text-blue-600">loved ones</span>
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8 max-w-xl mx-auto lg:mx-0">
                Simple, reliable video calls for everyone
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start mb-8 sm:mb-10">
                <Link
                  to={"/auth"}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-colors shadow-sm hover:shadow text-sm sm:text-base text-center"
                >
                  Get Started Free
                </Link>
              </div>

              {/* Features Grid */}
              <div className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl">📹</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">
                    HD Video
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Clear quality calls
                  </p>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl">🔒</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">
                    Secure
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Private and safe
                  </p>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                    <span className="text-lg sm:text-xl">📱</span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm sm:text-base mb-1 sm:mb-2">
                    Any Device
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Works everywhere
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="lg:w-1/2 flex justify-center order-2 lg:order-2">
              <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
                <div className="bg-white rounded-xl sm:rounded-2xl p-3 sm:p-4 shadow-lg border border-gray-200 overflow-hidden">
                  <img
                    src="https://imgs.search.brave.com/RERZk_llFvZ1JmTcoO1nwgOtt_42rooZ4PuJNbvltDU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9tZW4t/d2VhcmluZy1nbGFz/c2VzLWhvbGRpbmct/c21hcnQtcGhvbmUt/bWFrZS12aWRlby1j/YWxsLWdpcmwtc2Ny/ZWVuLWZsYXQtY2Fy/dG9vbi1zdHlsZS12/ZWN0b3ItZGVzaWdu/LTE4OTg5NDIwNy5q/cGc"
                    alt="Video call illustration"
                    className="w-full h-auto rounded-lg sm:rounded-xl"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://via.placeholder.com/500x350/3B82F6/FFFFFF?text=Video+Call";
                    }}
                  />
                  <div className="mt-3 sm:mt-4 text-center">
                    <p className="text-xs sm:text-sm text-gray-600">
                      Join meetings with just one click
                    </p>
                  </div>
                </div>

                {/* Mobile-only extra info */}
                <div className="mt-4 sm:hidden bg-blue-50 p-3 rounded-lg border border-blue-100">
                  <p className="text-xs text-blue-700 text-center">
                    <span className="font-semibold">No downloads needed</span> •
                    Works in any browser
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Simple footer for mobile */}
      <footer className="px-4 py-4 sm:py-6 border-t border-gray-200 bg-white mt-4 sm:mt-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between text-center sm:text-left">
            <div className="mb-3 sm:mb-0">
              <p className="text-gray-700 text-sm font-medium">ConferaX</p>
              <p className="text-gray-500 text-xs mt-1">
                Simple video calls for everyone
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <button className="text-gray-600 hover:text-blue-600 text-xs">
                Privacy
              </button>
              <button className="text-gray-600 hover:text-blue-600 text-xs">
                Terms
              </button>
              <button className="text-gray-600 hover:text-blue-600 text-xs">
                Help
              </button>
              <button className="text-gray-600 hover:text-blue-600 text-xs">
                Contact
              </button>
            </div>
          </div>
          <div className="mt-3 sm:mt-4 text-center">
            <p className="text-gray-400 text-xs">
              © {new Date().getFullYear()} ConferaX. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
