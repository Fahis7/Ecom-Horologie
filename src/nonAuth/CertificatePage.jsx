import React from "react";
import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../common/context/Authprovider";

const CertificatePage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const item = state?.item;
  const { user } = useContext(AuthContext);

  if (!item) {
    navigate("/orders");
    return null;
  }

  // Format date for certificate
  const certificateDate = new Date().toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 mt-6 sm:px-6 lg:px-8">
      {/* Certificate Container */}
      <div className="max-w-5xl mx-auto bg-white border border-gray-200 shadow-lg overflow-hidden">
        {/* Certificate Header */}
        <div className="bg-gray-900 py-8 px-8 text-center border-b border-gray-200 relative">
          {/* Official Seal */}
          <div className="absolute top-4 right-4 w-16 h-16 border-2 border-gold-500 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-gold-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          
          <h1 className="text-3xl font-serif font-medium text-gold-500 tracking-wider mb-2">
            CERTIFICATE OF AUTHENTICITY
          </h1>
          <p className="text-sm text-gray-300 uppercase tracking-wider">
            Official Documentation of Horological Ownership
          </p>
          <p className="text-xs text-gray-400 mt-2">
            Issued by ChronoWrist • {certificateDate}
          </p>
        </div>

        {/* Certificate Body */}
        <div className="p-8 md:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Watch Details */}
            <div>
              <div className="mb-8">
                <h2 className="font-serif text-xl font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Timepiece Specifications
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Model</p>
                    <p className="font-serif text-lg text-gray-900">{item.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Reference Number</p>
                    <p className="font-mono text-gray-800">CW-{item.id.slice(0, 8).toUpperCase()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Production Series</p>
                    <p className="text-gray-800">Limited Edition</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Date of Certification</p>
                    <p className="text-gray-800">{certificateDate}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="font-serif text-xl font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Ownership Details
                </h2>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mr-4 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Registered Owner</p>
                    <p className="font-serif text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Certificate ID: CW{item.id.slice(0, 6).toUpperCase()}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t border-gray-200 pt-6">
                <h2 className="font-serif text-xl font-medium text-gray-800 mb-4 pb-2 border-b border-gray-200">
                  Authentication
                </h2>
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-gray-100 rounded-full mr-4 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-gray-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider font-medium">Verification</p>
                    <p className="text-gray-800">This timepiece has been authenticated by ChronoWrist experts</p>
                    <p className="text-xs text-gray-500 mt-1">Verification ID: VF{item.id.slice(2, 8).toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Watch Image */}
            <div className="flex flex-col items-center justify-between">
              <div className="w-full h-72 mb-6 flex items-center justify-center  ">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full object-contain"
                />
              </div>
              
              <div className="w-full text-center">
                <div className="mb-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                    Manufacturer's Warranty
                  </p>
                  <p className="text-sm text-gray-700">
                    This timepiece is covered by a 5-year international warranty against manufacturing defects.
                  </p>
                </div>
                
                <div className="border-t border-gray-200 pt-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">
                    Official Documentation
                  </p>
                  <div className="flex justify-center space-x-4">
                    <div className="border border-gray-200 p-2 inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gold-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs">Warranty Card</span>
                    </div>
                    <div className="border border-gray-200 p-2 inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gold-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs">Care Guide</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Certificate Footer */}
        <div className="bg-gray-800 text-gray-300 p-6 text-center">
          <p className="text-xs text-gray-300 uppercase tracking-wider mb-4">
            This document serves as official proof of authenticity and ownership
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-8">
            <button 
              onClick={() => window.print()}
              className="text-xs text-gold-500 hover:text-white uppercase tracking-wider flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
                />
              </svg>
              Print Certificate
            </button>
            <button 
              onClick={() => navigate("/orders")}
              className="text-xs text-gold-500 hover:text-white uppercase tracking-wider flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Back to orders
            </button>
            <button 
              onClick={() => {}}
              className="text-xs text-gold-500 hover:text-white uppercase tracking-wider flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Security Features */}
      <div className="mt-8 text-center text-xs text-gray-500">
        <p>This document contains security features to prevent forgery, including microprinting and holographic elements.</p>
        <p className="mt-1">For verification questions, contact certificates@chronowrist.com</p>
      </div>

      {/* Watermark */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-[80vh] w-[80vh] text-gray-900"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
};

export default CertificatePage;