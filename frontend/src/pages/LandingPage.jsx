import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LandingPage() {
  const router = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="px-4 py-4 sm:px-6 lg:px-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 sm:mb-0">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="font-bold text-white text-lg">C</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
              ConferaX
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={() => router("/auth")}
              className="text-gray-700 hover:text-blue-600 transition-colors duration-300 px-3 py-1 rounded"
            >
              Register
            </button>
            <button
              onClick={() => router("/auth")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Left Content */}
            <div className="lg:w-1/2 text-center lg:text-left">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Connect with your{" "}
                <span className="text-blue-600">loved ones</span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-xl mx-auto lg:mx-0">
                Simple, reliable video calls for everyone
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to={"/auth"}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors shadow-sm hover:shadow"
                >
                  Get Started
                </Link>
              </div>

              {/* Features Grid */}
              <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-xl">📹</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">HD Video</h3>
                  <p className="text-sm text-gray-600">Clear quality calls</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-xl">🔒</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Secure</h3>
                  <p className="text-sm text-gray-600">Private and safe</p>
                </div>

                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <span className="text-xl">📱</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Any Device</h3>
                  <p className="text-sm text-gray-600">Works everywhere</p>
                </div>
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="lg:w-1/2 flex justify-center">
              <div className="max-w-md w-full">
                <div className="bg-white rounded-2xl p-4 shadow-lg border border-gray-200 overflow-hidden">
                  <img
                    src="https://imgs.search.brave.com/RERZk_llFvZ1JmTcoO1nwgOtt_42rooZ4PuJNbvltDU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9tZW4t/d2VhcmluZy1nbGFz/c2VzLWhvbGRpbmct/c21hcnQtcGhvbmUt/bWFrZS12aWRlby1j/YWxsLWdpcmwtc2Ny/ZWVuLWZsYXQtY2Fy/dG9vbi1zdHlsZS12/ZWN0b3ItZGVzaWdu/LTE4OTg5NDIwNy5q/cGc"
                    alt="Team video conference"
                    className="w-full h-auto rounded-lg object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src =
                        "https://imgs.search.brave.com/RERZk_llFvZ1JmTcoO1nwgOtt_42rooZ4PuJNbvltDU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly90aHVt/YnMuZHJlYW1zdGlt/ZS5jb20vYi9tZW4t/d2VhcmluZy1nbGFz/c2VzLWhvbGRpbmct/c21hcnQtcGhvbmUt/bWFrZS12aWRlby1j/YWxsLWdpcmwtc2Ny/ZWVuLWZsYXQtY2Fy/dG9vbi1zdHlsZS12/ZWN0b3ItZGVzaWdu/LTE4OTg5NDIwNy5q/cGc";
                    }}
                  />
                  <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                      Join meetings with just one click
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
