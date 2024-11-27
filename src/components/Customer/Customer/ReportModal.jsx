import React, { useEffect, useState } from "react";
import { FaChevronDown } from "react-icons/fa";

const ReportModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true); // Show modal
    } else {
      setTimeout(() => setIsVisible(false), 300); // Wait for animation before hiding
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
      <div
        className={`bg-white w-full max-w-3xl rounded-t-lg p-8 transform transition-transform ease-in-out animation-slide-up ${
          isOpen ? "animate-slide-up" : "opacity-0 translate-y-full"
        }`}
      >
        {/* Chevron for Closing */}
        <div
          className="absolute top-2 left-1/2 transform -translate-x-1/2 cursor-pointer text-2xl text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <FaChevronDown />
        </div>

        {/* Modal Content */}
        <h2 className="text-2xl font-semibold text-center mb-4">Report a Problem</h2>
        <p className="text-gray-600 text-center mb-6">
          Please provide as much detail as possible so we can see what we can do.
        </p>

        {/* Message Input */}
        <textarea
          className="w-full border rounded-lg p-4 mb-4 text-lg"
          rows="5"
          placeholder="Message here..."
        ></textarea>

        {/* Name, Email, Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            className="border rounded-lg p-4 text-lg"
            placeholder="Name"
          />
          <input
            type="email"
            className="border rounded-lg p-4 text-lg"
            placeholder="Email Address"
          />
          <input
            type="tel"
            className="border rounded-lg p-4 text-lg"
            placeholder="Phone Number"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button className="bg-green-500 text-white text-lg py-3 px-8 rounded-lg hover:bg-green-600">
            Submit Report
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
