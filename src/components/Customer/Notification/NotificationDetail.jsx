import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import NavBar from '../Customer/NavBar';

const NotificationDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { notification } = location.state || {};

  if (!notification) {
    return <p className="text-gray-600 text-center">Notification not found.</p>;
  }

  const handleBack = () => navigate(-1);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <NavBar />
      <h1 className="relative top-10 left-20 text-3xl font-semibold mt-20">Notifications</h1>
      <div className="p-20">
        <div className="flex bg-gray-50 text-gray-800 overflow-x-hidden">
          <div className="w-full p-10 flex flex-col relative border rounded-xl shadow-xl">
            {/* Header Section */}
            <div className="flex items-center space-x-4 mb-4">
              <FaArrowLeft
                className="text-green-500 cursor-pointer"
                onClick={handleBack}
              />
            </div>

            {/* Display Sender's Image */}
            <div className="flex items-center space-x-4 mb-6 mt-6">
              <img src={notification.image} alt="Sender Logo" className="w-16 h-16 rounded-full" />
              <div>
                <h2 className="text-2xl font-semibold">{notification.sender}</h2>
              </div>
            </div>

            {/* Message Content with HTML Rendering */}
            <div className="flex-grow mb-4 mt-10 p-4">
              {/* Render message as HTML inside a full container */}
              <div
                className="text-md mb-10 leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: notification.message }}
              />
            </div>

            {/* Footer / Actions */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
