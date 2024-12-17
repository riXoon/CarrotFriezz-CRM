import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import carrotpfp from '../../../assets/carrotpfp.png';
import promoBanner from '../../../assets/promoBanner.png'; // Assuming this is the promo image path

const NotificationPage = () => {
  const navigate = useNavigate();

  // Default notification with image content
  const defaultNotification = {
    notification_id: 'default-promo',
    recipient: 'New User',
    message: '🎉 Welcome to Friseup! Check out our special promo for new users.',
    reply: null,
    time: 'Just now',
    image: carrotpfp,
    promoImage: promoBanner
  };

  const [notifications, setNotifications] = useState([defaultNotification]);
  const [reply, setReply] = useState('');
  const [selectedNotification, setSelectedNotification] = useState(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:80/friseup_api/notifications.php');
        if (response.data.success) {
          setNotifications([defaultNotification, ...response.data.notifications]);
        } else {
          console.error('Error fetching notifications:', response.data.message);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleOpenNotification = (notification) => {
    setSelectedNotification(notification);
    navigate('/Customer/notification-detail', { state: { notification } });
  };

  const handleSendReply = async () => {
    if (!reply) {
      alert('Please enter a reply');
      return;
    }

    try {
      const response = await axios.post('http://localhost:80/friseup_api/reply.php', {
        report_id: selectedNotification.report_id,
        reply,
        sender: 'Admin',
        recipient: selectedNotification.recipient,
      });

      if (response.data.success) {
        alert('Reply sent successfully');
        setReply('');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      alert('Error sending reply');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col overflow-y-auto mt-[4.2rem] p-3 h-[40rem] z-50">
      <div className="bg-white shadow-lg flex-1">
        <h2 className="text-2xl font-semibold text-gray-800 px-6 py-4 border-b border-gray-200">
          Notifications
        </h2>

        {notifications.length === 0 ? (
          <p className="text-center text-gray-500">No notifications available</p>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.notification_id}
              onClick={() => handleOpenNotification(notification)}
              className="flex flex-row items-start p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50"
            >
              {/* Image Section */}
              <div className="relative mb-4">
                <img
                  src={notification.image || carrotpfp}
                  alt="Notification"
                  className="w-12 h-12 rounded-full mr-4"
                />
                <span className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
              </div>

              {/* Text Section */}
              <div className="flex flex-col flex-1 mb-4">
                <p className="text-gray-700 font-semibold">Customer Support</p>
                {notification.recipient && (
                  <p className="text-sm text-gray-500">Dear {notification.recipient},</p>
                )}
                <p className="text-sm text-gray-600 mt-1">
                  {notification.reply ? notification.reply : notification.message}
                </p>

                {/* Display the promo image */}
                {/* {notification.promoImage && (
                  <div className="w-full mt-2 mb-4">
                    <img src={notification.promoImage} alt="Promo" className="w-full h-auto rounded-md shadow-md" />
                  </div>
                )} */}
              </div>

              {/* Time Section */}
              <span className="text-sm text-gray-400 self-end">{notification.time}</span>
            </div>
          ))
        )}

        {selectedNotification && (
          <div className="mt-4 p-4 bg-white shadow-md">
            <textarea
              className="w-full p-2 border border-gray-300"
              placeholder="Write your reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button
              onClick={handleSendReply}
              className="mt-2 px-4 py-2 bg-blue-500 text-white"
            >
              Send Reply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationPage;