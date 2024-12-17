import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import axios from 'axios';
import NavBar from '../Customer/NavBar';
import carrotpfp from '../../../assets/carrotpfp.png';

const NotificationDetail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [notification, setNotification] = useState(location.state?.notification || null);
  const { id } = useParams(); // Use dynamic routing for notification IDs
  const [loading, setLoading] = useState(!notification);

  useEffect(() => {
    if (!notification) {
      const fetchNotification = async () => {
        try {
          const response = await axios.get(`http://localhost/friseup_api/notification-detail.php?id=${id}`);
          if (response.data.success) {
            setNotification(response.data.notification);
          } else {
            console.error("Failed to fetch notification:", response.data.message);
          }
        } catch (error) {
          console.error("Error fetching notification:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchNotification();
    }
  }, [id, notification]);

  const handleBack = () => navigate(-1);

  if (loading) {
    return <p className="text-center text-gray-500">Loading notification details...</p>;
  }

  if (!notification) {
    return <p className="text-center text-gray-500">Notification not found.</p>;
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <NavBar />
      <h1 className="relative top-0 left-10 md:top-10 md:left-20 text-3xl sm:text-4xl  font-semibold mt-20">Notifications</h1>
      <div className="p-4 sm:p-8 md:p-20">
        <div className="flex bg-gray-50 text-gray-800 overflow-x-hidden">
          <div className="w-full p-4 sm:p-8 flex flex-col relative border rounded-xl shadow-xl">
            <div className="flex items-center space-x-4 mb-4">
              <FaArrowLeft className="text-green-500 cursor-pointer text-xl sm:text-2xl" onClick={handleBack} />
            </div>
            <div className="flex items-center space-x-4 mb-6 mt-6">
              <img
                src={carrotpfp}
                alt="Sender Logo"
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full"
              />
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold">Customer Support</h2>
                <p className="text-sm text-gray-500">Dear {notification.recipient}</p>
              </div>
            </div>
            {/* Display the message */}
            <div className="flex-grow mb-4 mt-10 p-4">
              <div
                className="text-md sm:text-lg mb-10 leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: notification.message }}
              />
            </div>

            {/* Display the promo image if it exists */}
            {notification.promoImage && (
              <div className="mb-6">
                <img
                  src={notification.promoImage}
                  alt="Promo"
                  className="w-full rounded-lg"
                />
              </div>
            )}


            <div className="flex mt-4">
              <h3 className="text-lg font-semibold"></h3>
            </div>

            {/* Optionally, display a reply */}
            {/* <div className="flex mt-2">
              <div
                className="text-md mb-10 leading-relaxed font-normal"
                dangerouslySetInnerHTML={{ __html: notification.reply || "No reply yet" }}
              />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationDetail;
