import React, { useState } from 'react';
import { FaTrash, FaStar, FaRegStar, FaArrowLeft } from 'react-icons/fa';

const Emails = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'Riva Mae S. Boongaling',
      subject: 'I am not satisfied with the service, I demand a refund NOW!...',
      content: 'I am not satisfied with the service, I demand a refund NOW!...',
      email: 'rivamaesboongaling@gmail.com',
      phone: '09458997821',
      time: '1:18 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 2,
      sender: 'Chino Pasia',
      subject: 'wrong item. need refund. plz fix this thx',
      content: 'wrong item. need refund. plz fix this thx',
      email: 'chinopasia@example.com',
      phone: '0987654321',
      time: '2:45 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 3,
      sender: 'Riva Mae S. Boongaling',
      subject: 'I am not satisfied with the service, I demand a refund NOW!...',
      content: 'I am not satisfied with the service, I demand a refund NOW!...',
      email: 'rivamaesboongaling@gmail.com',
      phone: '09458997821',
      time: '1:18 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 4,
      sender: 'Chino Pasia',
      subject: 'wrong item. need refund. plz fix this thx',
      content: 'wrong item. need refund. plz fix this thx',
      email: 'chinopasia@example.com',
      phone: '0987654321',
      time: '2:45 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 5,
      sender: 'Riva Mae S. Boongaling',
      subject: 'I am not satisfied with the service, I demand a refund NOW!...',
      content: 'I am not satisfied with the service, I demand a refund NOW!...',
      email: 'rivamaesboongaling@gmail.com',
      phone: '09458997821',
      time: '1:18 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 6,
      sender: 'Chino Pasia',
      subject: 'wrong item. need refund. plz fix this thx',
      content: 'wrong item. need refund. plz fix this thx',
      email: 'chinopasia@example.com',
      phone: '0987654321',
      time: '2:45 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 7,
      sender: 'Riva Mae S. Boongaling',
      subject: 'I am not satisfied with the service, I demand a refund NOW!...',
      content: 'I am not satisfied with the service, I demand a refund NOW!...',
      email: 'rivamaesboongaling@gmail.com',
      phone: '09458997821',
      time: '1:18 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 8,
      sender: 'Chino Pasia',
      subject: 'wrong item. need refund. plz fix this thx',
      content: 'wrong item. need refund. plz fix this thx',
      email: 'chinopasia@example.com',
      phone: '0987654321',
      time: '2:45 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 9,
      sender: 'Riva Mae S. Boongaling',
      subject: 'I am not satisfied with the service, I demand a refund NOW!...',
      content: 'I am not satisfied with the service, I demand a refund NOW!...',
      email: 'rivamaesboongaling@gmail.com',
      phone: '09458997821',
      time: '1:18 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 10,
      sender: 'Chino Pasia',
      subject: 'wrong item. need refund. plz fix this thx',
      content: 'wrong item. need refund. plz fix this thx',
      email: 'chinopasia@example.com',
      phone: '0987654321',
      time: '2:45 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 11,
      sender: 'Riva Mae S. Boongaling',
      subject: 'I am not satisfied with the service, I demand a refund NOW!...',
      content: 'I am not satisfied with the service, I demand a refund NOW!...',
      email: 'rivamaesboongaling@gmail.com',
      phone: '09458997821',
      time: '1:18 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 12,
      sender: 'Chino Pasia',
      subject: 'wrong item. need refund. plz fix this thx',
      content: 'wrong item. need refund. plz fix this thx',
      email: 'chinopasia@example.com',
      phone: '0987654321',
      time: '2:45 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 13,
      sender: 'Riva Mae S. Boongaling',
      subject: 'I am not satisfied with the service, I demand a refund NOW!...',
      content: 'I am not satisfied with the service, I demand a refund NOW!...',
      email: 'rivamaesboongaling@gmail.com',
      phone: '09458997821',
      time: '1:18 PM',
      isSelected: false,
      isFavorite: false,
    },
    {
      id: 14,
      sender: 'Chino Pasia',
      subject: 'wrong item. need refund. plz fix this thx',
      content: 'wrong item. need refund. plz fix this thx',
      email: 'chinopasia@example.com',
      phone: '0987654321',
      time: '2:45 PM',
      isSelected: false,
      isFavorite: false,
    },
   
  ]);

  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [selectAll, setSelectAll] = useState(false);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setReply('');
    setShowReplyBox(false); // Hide reply box when a new message is opened
  };

  const handleSendReply = () => {
    if (showReplyBox) {
      alert(`Reply sent: ${reply}`);
      setReply('');
      setShowReplyBox(false); // Hide reply box after sending
    } else {
      setShowReplyBox(true); // Show reply box if it’s not already visible
    }
  };

  const handleBack = () => {
    setSelectedMessage(null);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setMessages(messages.map((msg) => ({ ...msg, isSelected: !selectAll })));
  };

  const handleSelect = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, isSelected: !msg.isSelected } : msg
      )
    );
  };

  const toggleFavorite = (id) => {
    setMessages(
      messages.map((msg) =>
        msg.id === id ? { ...msg, isFavorite: !msg.isFavorite } : msg
      )
    );
  };

  return (
    <div className="flex h-[33rem] bg-gray-50 text-gray-800">
      {selectedMessage === null ? (
        // List View
        <div className="w-full p-6">
          <div className="flex items-center mb-4 space-x-4">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-green-500"
              checked={selectAll}
              onChange={handleSelectAll}
            />
            <FaTrash className="text-green-500 cursor-pointer hover:text-red-500" />
          </div>
          <div className="max-h-[30rem] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100 transition duration-200"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-green-500 mr-4 "
                  checked={message.isSelected}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleSelect(message.id);
                  }}
                />
                <div
                  className="mr-4 text-green-500 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(message.id);
                  }}
                >
                  {message.isFavorite ? <FaStar /> : <FaRegStar />}
                </div>
                <div
                  className="flex-grow cursor-pointer"
                  onClick={() => handleSelectMessage(message)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">{message.sender}</span>
                    <span className="text-sm text-gray-500">{message.time}</span>
                  </div>
                  <p className="text-gray-600">{message.subject}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        // Detail View
        <div className="w-full p-6 flex flex-col relative">
          <div className="flex items-center space-x-4 mb-4">
            <FaArrowLeft
              className="text-green-500 cursor-pointer"
              onClick={handleBack}
            />
            <FaTrash className="text-green-500 cursor-pointer hover:text-red-500" />
            <div
              className="text-green-500 cursor-pointer"
              onClick={() => toggleFavorite(selectedMessage.id)}
            >
              {selectedMessage.isFavorite ? <FaStar /> : <FaRegStar />}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-2xl font-semibold">{selectedMessage.sender}</h2>
            <p className="text-sm text-gray-500">{selectedMessage.email}</p>
            <p className="text-sm text-gray-500">{selectedMessage.phone}</p>
          </div>
          <div className="flex-grow mb-4">
            <p className="text-lg">{selectedMessage.content}</p>
          </div>
          <div className="absolute bottom-6 left-6">
            {showReplyBox && (
              <textarea
                className="w-full h-24 p-3 border border-green-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                placeholder="Write your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            )}
            <button
              className="mt-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-200"
              onClick={handleSendReply}
            >
              {showReplyBox ? 'Send Reply' : 'Reply'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emails;
