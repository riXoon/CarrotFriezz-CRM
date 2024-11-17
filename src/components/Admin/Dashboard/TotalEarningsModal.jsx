import React, { useState } from "react";

const TotalEarningsModal = ({ isOpen, onClose }) => {
  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`bg-white p-6 rounded-lg shadow-lg w-2/3 relative overflow-hidden transform transition-transform duration-300 ${
          isOpen ? "scale-100" : "scale-90"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Total Earnings</h1>
          <button
            onClick={onClose}
            className="text-black font-bold text-xl focus:outline-none"
          >
            &times;
          </button>
        </div>

        {/* Content */}
        <div>
          <h2 className="font-bold text-lg mb-4">Sales Report</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr className="bg-orange-200">
                  <th className="p-3 font-medium">Product</th>
                  <th className="p-3 font-medium">Purchases</th>
                  <th className="p-3 font-medium">%</th>
                  <th className="p-3 font-medium">Revenue</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-3">Zsuper Mini</td>
                  <td className="p-3">125</td>
                  <td className="p-3 text-green-600">+12% ▲</td>
                  <td className="p-3">₱12,412</td>
                </tr>
                <tr>
                  <td className="p-3">Zsuper Mini</td>
                  <td className="p-3">85</td>
                  <td className="p-3 text-red-600">-8% ▼</td>
                  <td className="p-3">₱5,992</td>
                </tr>
                {/* Add additional rows as needed */}
                {[...Array(3)].map((_, index) => (
                  <tr key={index}>
                    <td className="p-3">{index + 3}</td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                    <td className="p-3"></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <div className="text-sm text-gray-500">
            <button className="bg-orange-100 text-orange-700 px-3 py-1 rounded">
              All time <span className="ml-1">▼</span>
            </button>
          </div>
          <div className="text-lg font-bold">
            Total Revenue: <span className="text-orange-700">₱18,404</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalEarningsModal;
