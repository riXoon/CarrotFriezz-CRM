import React, { useState, useEffect } from "react";
import axios from "axios";

const TotalEarningsModal = ({ isOpen, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(""); // Single date for filtering
  const [salesReport, setSalesReport] = useState([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
  };

  const fetchSalesForDate = async (date) => {
    try {
      const response = await axios.get("http://localhost:80/friseup_api/sales_report.php", {
        params: { startDate: date }, // Single date sent to backend
        withCredentials: true,
      });

      if (response.data && response.data.status === 1) {
        const data = response.data;
        const reportData = Object.entries(data.data).map(([product, details]) => ({
          product,
          purchases: details.purchases,
          revenue: details.revenue,
        }));
        setSalesReport(reportData);
        setTotalRevenue(data.totalRevenue);
      } else {
        setSalesReport([]);
        setTotalRevenue(0);
        console.error("Error in API response:", response.data?.message || "Unknown error");
      }
    } catch (error) {
      console.error("Error fetching sales report:", error);
    }
  };

  // Automatically fetch the most recent day's sales when the modal opens
  useEffect(() => {
    if (isOpen) {
      const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
      setSelectedDate(today);
      fetchSalesForDate(today);
    }
  }, [isOpen]);

  const applyDateFilter = async () => {
    if (!selectedDate) {
      console.error("No date selected.");
      return;
    }
    await fetchSalesForDate(selectedDate);
  };

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative overflow-hidden"
        style={{
          transform: isOpen ? "scale(1)" : "scale(0.9)",
          width: "800px",
          height: "660px",
          color: "#000",
          backgroundColor: "#fff",
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Total Earnings</h1>
          <button
            onClick={onClose}
            className="font-bold text-xl focus:outline-none"
          >
            &times;
          </button>
        </div>

        <div className="overflow-y-auto" style={{ maxHeight: "calc(100% - 160px)" }}>
          <h2 className="font-bold text-md mb-4">
            {selectedDate ? formatDate(selectedDate) : "Today"}
          </h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full text-left border-collapse">
              <thead>
                <tr style={{ backgroundColor: "#FED7AA" }}>
                  <th className="p-3 font-medium">Product</th>
                  <th className="p-3 font-medium">Purchases</th>
                  <th className="p-3 font-medium">Total Earnings</th>
                </tr>
              </thead>
              <tbody>
                {salesReport.length > 0 ? (
                  salesReport.map((item, index) => (
                    <tr key={index}>
                      <td className="p-3">{item.product}</td>
                      <td className="p-3">{item.purchases}</td>
                      <td className="p-3">₱{parseFloat(item.revenue).toLocaleString()}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td className="p-3" colSpan="3">
                      No sales data available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex justify-between items-center mt-6 border-t pt-4">
          <div className="relative">
            <label className="block text-sm text-gray-700">
              Select Date
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="mt-1 px-3 py-2 border rounded focus:outline-none focus:ring w-full"
              />
            </label>
            <button
              onClick={applyDateFilter}
              className="mt-2 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600"
            >
              Apply Filter
            </button>
          </div>
          <div className="text-lg font-bold text-orange-700">
            Total Revenue: ₱{totalRevenue.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalEarningsModal;
