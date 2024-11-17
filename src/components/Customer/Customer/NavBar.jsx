import React, { useState, useEffect } from 'react';
import { FaHome, FaBell, FaUserCircle } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fullName, setFullName] = useState("John Doe"); // Default name
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.fullName) {
      setFullName(storedUser.fullName);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    alert('Logging out');
    navigate('/');
  };

  const handleHome = () => {
    navigate('/Customer');
  };

  return (
    <div className="bg-orange-500 shadow-md">
      <nav className="flex items-center justify-between px-6 py-4">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-3">
          <h1 className="text-white font-bold text-2xl">FriseUp</h1>
        </div>

        {/* Right Side: Icons and User Profile */}
        <div className="flex items-center space-x-8">
          {/* Home Icon */}
          <button
            className="text-white text-2xl hover:text-gray-200 transition duration-200"
            title="Home"
            onClick={handleHome}
          >
            <FaHome />
          </button>

          {/* Notification Icon */}
          <button
            className="relative text-white text-2xl hover:text-gray-200 transition duration-200"
            title="Notifications"
          >
            <FaBell />
            {/* Notification Badge */}
            <span className="absolute -top-1 -right-1 bg-red-600 text-xs text-white rounded-full h-5 w-5 flex items-center justify-center font-bold">
              3
            </span>
          </button>

          {/* User Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none transition duration-200"
            >
              <FaUserCircle className="text-3xl" />
              <span className="font-medium text-lg">{fullName}</span>
              <MdKeyboardArrowDown className="text-xl" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md w-40 overflow-hidden">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
