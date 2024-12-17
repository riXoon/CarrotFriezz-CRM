import React, { useState, useEffect } from 'react';
import { FaTrash, FaStar, FaRegStar, FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';

const Emails = () => {
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [reply, setReply] = useState('');
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios
      .get('http://localhost/friseup_api/report.php')
      .then((response) => {
        if (response.data.success) {
          const fetchedMessages = response.data.data.map((message) => ({
            id: message.id,
            sender: message.name,
            subject: message.massage.slice(0, 50),
            content: message.massage,
            email: message.email,
            phone: message.phone,
            isSelected: false,
            isFavorite: false,
          }));
          setMessages(fetchedMessages);
        } else {
          console.error('Failed to fetch messages:', response.data.message);
        }
        setIsFetching(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsFetching(false);
      });
  }, []);

  const handleSelectMessage = (message) => {
    setSelectedMessage(message);
    setReply('');
    setShowReplyBox(false);
  };

  const handleSendReply = () => {
    if (!selectedMessage) {
      alert('No message selected.');
      return;
    }

    if (showReplyBox) {
      if (!reply.trim()) {
        alert('Reply cannot be empty.');
        return;
      }

      setIsLoading(true);

      axios
        .post('http://localhost/friseup_api/reply.php', {
          report_id: selectedMessage.id,
          reply: reply.trim(),
        })
        .then((response) => {
          if (response.data.success) {
            alert('Reply sent successfully.');
            setReply('');
            setShowReplyBox(false);
          } else {
            console.error('Failed to send reply:', response.data.message);
            alert(response.data.message);
          }
        })
        .catch((error) => {
          console.error('Error while sending reply:', error);
          alert('Failed to send reply.');
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setShowReplyBox(true);
    }
  };

  const handleBack = () => {
    setSelectedMessage(null);
  };

  if (isFetching) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="flex max-h-[31rem] bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {selectedMessage === null ? (
        <div className="w-full p-6">
          <div className="flex items-center mb-4 space-x-4">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-green-500 dark:text-green-400"
              checked={selectAll}
              onChange={() => setSelectAll(!selectAll)}
            />
            <FaTrash className="text-green-500 dark:text-green-400 cursor-pointer hover:text-red-500" />
          </div>
          <div className="max-h-[26rem] overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition duration-200"
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-green-500 dark:text-green-400 mr-4"
                  checked={message.isSelected}
                  onChange={() =>
                    setMessages(
                      messages.map((msg) =>
                        msg.id === message.id
                          ? { ...msg, isSelected: !msg.isSelected }
                          : msg
                      )
                    )
                  }
                />
                <div
                  className="mr-4 text-green-500 dark:text-green-400 cursor-pointer"
                  onClick={() =>
                    setMessages(
                      messages.map((msg) =>
                        msg.id === message.id
                          ? { ...msg, isFavorite: !msg.isFavorite }
                          : msg
                      )
                    )
                  }
                >
                  {message.isFavorite ? <FaStar /> : <FaRegStar />}
                </div>
                <div
                  className="flex-grow cursor-pointer"
                  onClick={() => handleSelectMessage(message)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-lg">{message.sender}</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    {message.subject}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full p-6 flex flex-col">
          <div className="flex items-center space-x-4 mb-4">
            <FaArrowLeft
              className="text-green-500 dark:text-green-400 cursor-pointer"
              onClick={handleBack}
            />
            <FaTrash className="text-green-500 dark:text-green-400 cursor-pointer hover:text-red-500" />
            <div
              className="text-green-500 dark:text-green-400 cursor-pointer"
              onClick={() =>
                setMessages(
                  messages.map((msg) =>
                    msg.id === selectedMessage.id
                      ? { ...msg, isFavorite: !msg.isFavorite }
                      : msg
                  )
                )
              }
            >
              {selectedMessage.isFavorite ? <FaStar /> : <FaRegStar />}
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{selectedMessage.sender}</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedMessage.email}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedMessage.phone}
            </p>
          </div>
          <div className="flex-grow mb-4 overflow-y-auto">
            <p className="text-base">{selectedMessage.content}</p>
          </div>
          <div className="flex items-center space-x-4 mt-4">
            {showReplyBox && (
              <textarea
                className="flex-grow h-24 p-3 border border-green-500 dark:border-green-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 resize-none bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                placeholder="Write your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
            )}
            <button
              className={`px-4 py-2 ${
                isLoading
                  ? 'bg-gray-500 dark:bg-gray-600 cursor-wait'
                  : 'bg-green-500 hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500'
              } text-white dark:text-gray-900 rounded-lg transition duration-300`}
              onClick={handleSendReply}
              disabled={isLoading}
            >
              {isLoading ? 'Sending...' : showReplyBox ? 'Send Reply' : 'Reply'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Emails;
