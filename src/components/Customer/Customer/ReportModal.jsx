import React, { useState, useEffect } from "react";
import { FaChevronDown } from "react-icons/fa";
import { CSSTransition } from "react-transition-group";
import axios from "axios";

const ReportModal = ({ isOpen, onClose }) => {
  const [isVisible, setIsVisible] = useState(isOpen);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsTransitioning(true), 10);
    } else {
      setIsTransitioning(false);
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
        setTimeout(() => {
          setIsLoading(false);

          if (response.data.success) {
            setConfirmationMessage("Thanks for your report!");
            setMessage("");
            setName("");
            setEmail("");
            setPhone("");
            onClose();

            // Delay the confirmation message before page reload
            setShowConfirmation(true);
            setTimeout(() => {
              setShowConfirmation(false);
              window.location.reload(); // Reload after confirmation disappears
            }, 5000); // Show confirmation for 5 seconds
          } else {
            alert(response.data.message);
          }
        }, 3000); // Simulate a 3-second delay for submission processing
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error submitting report:", error);
      });
  };

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
        <div
          className={`bg-white w-full max-w-sm sm:max-w-xl md:max-w-3xl rounded-t-lg p-4 sm:p-6 transform transition-transform ease-in-out animation-slide-up ${
            isTransitioning ? "animate-slide-up" : "opacity-0 translate-y-full"
          }`}
        >
          <div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 cursor-pointer text-2xl text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <FaChevronDown />
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4">Report a Problem</h2>
          <p className="text-gray-600 text-center mb-6 text-sm sm:text-base">
            Please provide as much detail as possible so we can see what we can do.
          </p>
          <textarea
            className="w-full border rounded-lg p-3 sm:p-4 mb-4 text-sm sm:text-lg"
            rows="4"
            placeholder="Message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          ></textarea>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <input
              type="text"
              className="border rounded-lg p-3 sm:p-4 text-sm sm:text-lg"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="email"
              className="border rounded-lg p-3 sm:p-4 text-sm sm:text-lg"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="tel"
              className="border rounded-lg p-3 sm:p-4 text-sm sm:text-lg"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-green-500 text-white text-sm sm:text-lg py-3 px-8 rounded-lg hover:bg-green-600"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit Report"}
            </button>
          </div>
        </div>
      </div>

      <CSSTransition in={isLoading} timeout={300} classNames="modal" unmountOnExit>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[40%] sm:w-[50%] flex flex-col items-center">
            <div className="loader mb-4"></div>
            <h2 className="text-xl sm:text-2xl font-semibold text-center">Submitting your report...</h2>
          </div>
        </div>
      </CSSTransition>

      <CSSTransition in={showConfirmation} timeout={300} classNames="modal" unmountOnExit>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[40%] sm:w-[50%]">
            <h2 className="text-xl sm:text-2xl font-semibold text-center">{confirmationMessage}</h2>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export default ReportModal;
