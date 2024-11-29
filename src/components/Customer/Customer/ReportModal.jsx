import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaChevronDown } from "react-icons/fa";

const ReportModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const handleSubmit = () => {
    const payload = {
      massage: message,
      name: name,
      email: email,
      phone: phone,
    };
  
    console.log("Submitting payload:", payload);
  
    setIsLoading(true);
  
    axios
      .post("http://localhost/friseup_api/report.php", payload)
      .then((response) => {
        setIsLoading(false);
  
        if (response.data.success) {
          setShowConfirmation(true);
          setConfirmationMessage("Thanks for your report!");
          setMessage("");
          setName("");
          setEmail("");
          setPhone("");
          onClose();
  
          setTimeout(() => setShowConfirmation(false), 2000);
        } else {
          alert(response.data.message);
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error submitting report:", error);
      });
  };
  

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
      <div
        className={`bg-white w-full max-w-3xl rounded-t-lg p-8 transform transition-transform ease-in-out animation-slide-up ${
          isOpen ? "animate-slide-up" : "opacity-0 translate-y-full"
        }`}
      >
        <div
          className="absolute top-2 left-1/2 transform -translate-x-1/2 cursor-pointer text-2xl text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <FaChevronDown />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-4">Report a Problem</h2>
        <p className="text-gray-600 text-center mb-6">
          Please provide as much detail as possible so we can see what we can do.
        </p>
        <textarea
          className="w-full border rounded-lg p-4 mb-4 text-lg"
          rows="5"
          placeholder="Message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <input
            type="text"
            className="border rounded-lg p-4 text-lg"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="border rounded-lg p-4 text-lg"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            className="border rounded-lg p-4 text-lg"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex justify-center">
          <button
            className="bg-green-500 text-white text-lg py-3 px-8 rounded-lg hover:bg-green-600"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Submitting..." : "Submit Report"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
