import React from 'react';
import { useNavigate } from 'react-router-dom';
import carrotpfp from '../../../assets/carrotpfp.png';
import promoBanner from '../../../assets/promoBanner.png'

const notifications = [
  {
    id: 1,
    sender: 'Carrot Friezz',
    isAutomated: false,
    recipient: 'Ms/Mr. Riva Mae S. Boongaling',
    message: `Dear Ms/Mr. Riva Mae S. Boongaling,

I apologize for the inconvenience and frustration you've experienced. We take customer satisfaction very seriously, and it's disappointing to hear that your recent order didn't meet your expectations.

I understand that receiving a disappointing product is frustrating. Unfortunately, we cannot refund your order. However, to resolve this, please refer to your email. We have sent you a promo as a compensation. Present the email to any Carrot Friezz branch counter to claim your coupon.

Thank you for bringing this to our attention. We value your business and hope to regain your trust.

Sincerely,
Lizit
Co-founder
Carrot Friezz`,
    time: '1:00 PM',
    image: carrotpfp,
  },

  {
    id: 2,
    type: 'notification', // Use type 'notification' for a regular notification
    sender: 'Carrot Friezz',
    isAutomated: true,
    recipient: 'Customer',
    message: `Thank you for joining us! Enjoy our exclusive Buy 2 Maxi Take 1 Mini offer!

    <img src="${promoBanner}" alt="Promo Banner" class="w-[50rem] h-auto mt-8 mb-8 relative left-52" />

    We have sent the redeem code to your email.`,
    time: '12:00 PM',
    image: carrotpfp,
  },
  // Other notifications...
];


const NotificationPage = () => {
  const navigate = useNavigate();

  const handleOpenNotification = (notification) => {
    navigate('/Customer/notification-detail', { state: { notification } });
  };

  return (
    <div className="fixed inset-0 bg-gray-100 flex flex-col overflow-y-auto mt-[4.2rem] p-3 h-[40rem] z-50">
      <div className="bg-white shadow-lg flex-1">
        <h2 className="text-2xl font-semibold text-gray-800 px-6 py-4 border-b border-gray-200">Notifications</h2>

        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleOpenNotification(notification)}
            className="flex items-start p-4 border-b border-gray-200 cursor-pointer"
          >
            <div className="relative">
              <img src={notification.image} alt="Carrot Friezz Logo" className="w-12 h-12 rounded-full mr-4" />
              <span className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full border border-white"></span>
            </div>
            <div className="flex-1">
              <p className="text-gray-700 font-semibold">
                {notification.sender} 
                {notification.isAutomated && <span className="text-sm text-gray-500"> Automated Message</span>}
              </p>
              {notification.recipient && <p className="text-sm text-gray-500">Dear {notification.recipient},</p>}
              <p className="text-sm text-gray-600 mt-1 truncate">{notification.message.slice(0, 100)}...</p>
            </div>
            <span className="text-sm text-gray-400">{notification.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationPage;
