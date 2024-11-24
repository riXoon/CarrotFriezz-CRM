import React, { useState, useEffect } from 'react';
import { FaHome, FaBell, FaUserCircle } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import friseUpLogo from '../../../assets/friseup-logo.png';
import axios from 'axios';
import NotificationPage from '../Notification/NotificationPage'; // Import the NotificationPage component

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false); // State to toggle NotificationPage visibility
  const [username, setUsername] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      console.error("User ID is missing in localStorage.");
      return;
    }
    axios
      .get(`http://localhost:80/friseup_api/username.php?userId=${userId}`)
      .then((response) => {
        if (response.data.status === 1) {
          const { firstName, lastName } = response.data.data;
          setUsername(`${firstName} ${lastName}`);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:80/friseup_api/logout.php");
      localStorage.removeItem("user");
      alert("Logged out successfully");
  
      // Redirect to the login page and replace the current history
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Failed to log out. Please try again.");
    }
  };
  

  const handleEditProfile = () => {
    navigate('/Customer/edit-profile');
  }

  const handleHome = () => {
    navigate('/Customer');
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="bg-friezOrange-700 shadow-md z-50 fixed w-full">
      <nav className="flex items-center justify-between px-20 py-4">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-3 cursor-pointer">
          <img src={friseUpLogo} alt="FriseUp Logo" onClick={handleHome} />
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
            className={`relative text-2xl transition duration-200 ${
              showNotifications ? 'text-green-500' : 'text-white hover:text-gray-200'
            }`}
            title="Notifications"
            onClick={toggleNotifications}
          >
            <FaBell />
            {/* Notification indicator */}
            {showNotifications && (
              <span className="absolute top-0 right-0 block h-2 w-2 bg-green-500 rounded-full"></span>
            )}
          </button>

          {/* User Profile with Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none transition duration-200"
            >
              <FaUserCircle className="text-3xl" />
              <span className="font-medium text-lg">{username}</span>
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

                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Conditionally render NotificationPage */}
      {showNotifications && (
        <div className="absolute top-16 right-20">
          <NotificationPage />
        </div>
      )}
    </div>
  );
};

export default NavBar;
