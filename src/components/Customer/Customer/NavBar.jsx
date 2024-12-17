import React, { useState, useEffect } from 'react';
import { FaHome, FaBell, FaUserCircle } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import friseUpLogo from '../../../assets/friseup-logo.png';
import axios from 'axios';
import NotificationPage from '../Notification/NotificationPage';

const LoadingModal = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80 text-center animate-slide-up">
        <div className="flex items-center justify-center mb-4 animate-spin">
          <div className="w-12 h-12 border-4 border-t-transparent border-friezOrange-700 rounded-full"></div>
        </div>
        <p className="text-sm font-medium text-gray-800">Logging out, please wait...</p>
      </div>
    </div>
  );
};

const LogoutConfirmationModal = ({ isVisible, onConfirm, onCancel }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl shadow-xl w-96 max-w-lg text-center transform transition-all duration-300 ease-in-out scale-105">
        <h2 className="text-2xl font-semibold mb-4 text-friezOrange-700">Confirm Logout</h2>
        <p className="text-lg mb-6 text-gray-700">Are you sure you want to log out?</p>
        <div className="flex justify-center space-x-4">
          <button
            className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all text-sm font-medium"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-6 py-3 bg-friezOrange-700 text-white rounded-lg hover:bg-friezOrange-800 transition-all text-sm font-medium"
            onClick={onConfirm}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

const NavBar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [username, setUsername] = useState('');
  const [notificationCount, setNotificationCount] = useState(0);
  const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUsername();
    fetchNotificationCount();
  }, []);

  const getUsername = () => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('User ID is missing in localStorage.');
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
        console.error('Error fetching username:', error);
      });
  };

  const fetchNotificationCount = () => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('User ID is missing in localStorage.');
      return;
    }

    axios
      .get(`http://localhost:80/friseup_api/notifications.php?userId=${userId}`)
      .then((response) => {
        if (response.data.success) {
          setNotificationCount(response.data.count);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching notifications:', error);
      });
  };

  const handleLogout = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        await axios.get('http://localhost:80/friseup_api/logout.php');
        localStorage.removeItem('user');
        navigate('/signup', { replace: true });
      } catch (error) {
        console.error('Error during logout:', error);
        alert('Failed to log out. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }, 3000); // 3-second delay
  };

  const handleEditProfile = () => navigate('/Customer/edit-profile');
  const handleViewProfile = () => navigate('/Customer/view-profile');
  const handleHome = () => navigate('/Customer');

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div className="bg-friezOrange-700 shadow-md fixed w-full z-50">
      <nav className="flex items-center justify-between px-4 py-3 md:px-40">
        {/* Left: Logo */}
        <div className="flex items-center cursor-pointer" onClick={handleHome}>
          <img
            src={friseUpLogo}
            alt="FriseUp Logo"
            className="h-8 md:h-10"
          />
        </div>

        {/* Right: Notifications and User Profile */}
        <div className="flex items-center space-x-4">
          <button
            className="hidden md:block text-white text-2xl hover:text-gray-200 transition duration-200"
            title="Home"
            onClick={handleHome}
          >
            <FaHome />
          </button>
          <button
            className={`relative text-2xl transition duration-200 ${
              showNotifications ? 'text-green-500' : 'text-white hover:text-gray-200'
            }`}
            title="Notifications"
            onClick={toggleNotifications}
          >
            <FaBell />
            {notificationCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold h-5 w-5 flex items-center justify-center rounded-full">
                {notificationCount}
              </span>
            )}
          </button>
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 text-white hover:text-gray-200 focus:outline-none transition duration-200"
            >
              <FaUserCircle className="text-3xl" />
              {/* Display Username */}
              <span className="hidden sm:block text-sm md:text-base font-medium">{username || 'Loading...'}</span>
              <MdKeyboardArrowDown className="text-xl" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-gray-800 shadow-lg rounded-md w-40 overflow-hidden">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={handleViewProfile}
                >
                  View Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={handleEditProfile}
                >
                  Edit Profile
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
                  onClick={() => setLogoutModalVisible(true)}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Notifications */}
      {showNotifications && (
        <div className="absolute top-16 right-6 md:right-10">
          <NotificationPage />
        </div>
      )}

      {/* Logout Confirmation Modal */}
      <LogoutConfirmationModal
        isVisible={isLogoutModalVisible}
        onConfirm={handleLogout}
        onCancel={() => setLogoutModalVisible(false)}
      />

      {/* Loading Modal */}
      <LoadingModal isVisible={isLoading} />
    </div>
  );
};

export default NavBar;
