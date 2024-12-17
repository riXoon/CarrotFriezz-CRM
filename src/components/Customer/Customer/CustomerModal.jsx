import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { CSSTransition } from 'react-transition-group';
import axios from "axios";

const CustomerModal = ({
  isOpen,
  onClose,
  title: propTitle,
  rating,
  onRatingChange,
  onSubmit,
  newComment,
  setNewComment,
  productId, // Receive productId as prop
}) => {
  const [localRating, setLocalRating] = useState(rating || 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen);
  const [title, setTitle] = useState(propTitle);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [confirmationMessage, setConfirmationMessage] = useState('');

  useEffect(() => {
    if (propTitle) setTitle(propTitle);
  }, [propTitle]);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setTimeout(() => setIsTransitioning(true), 10);
    } else {
      setIsTransitioning(false);
      setTimeout(() => setIsVisible(false), 300);
    }
  }, [isOpen]);

  const handleRating = (index) => {
    setLocalRating(index + 1);
    onRatingChange(index + 1);
  };

  const handleSubmit = () => {
    const userId = localStorage.getItem("id");
  
    if (!userId) {
      console.error("User ID is missing in localStorage.");
      return;
    }
  
    if (!localRating) {
      alert("Please select a rating!");
      return; // Prevent submission if no rating is selected
    }
  
    const comment = newComment || "";
  
    if (!comment.trim()) {
      alert("Please enter a comment!");
      return; // Prevent submission if no comment is entered
    }
  
    const payload = {
      user_id: parseInt(userId, 10),
      product_id: productId,
      stars: localRating,
      review: comment,
    };
  
    console.log("Submitting payload:", payload);
  
    setIsLoading(true);
  
    axios
      .post("http://localhost/friseup_api/reviews.php", payload)
      .then((response) => {
        setTimeout(() => {
          setIsLoading(false);
          if (response.data.success) {
            setShowConfirmation(true);
            setConfirmationMessage("Thanks for your review!");
            setNewComment(""); // Clear the comment field
            onClose();

            setTimeout(() => {
              setShowConfirmation(false);
              // Refresh the page after the confirmation message disappears
              window.location.reload();
            }, 2000);
          } else {
            alert(response.data.message);
          }
        }, 3000);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error submitting review:", error);
      });
  };
  

  if (!isVisible) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
        <div
          className={`flex flex-col gap-4 w-full max-w-2xl sm:max-w-lg md:max-w-2xl bg-white rounded-t-2xl p-8 sm:p-12 md:p-20 relative transition-all duration-300 ${isTransitioning ? 'customerModal slide-up' : 'customerModal slide-down'}`}
        >
          <div
            className="absolute top-2 left-1/2 transform -translate-x-1/2 cursor-pointer text-2xl text-gray-400 hover:text-gray-600"
            onClick={onClose}
          >
            <FaChevronDown />
          </div>

          <h2 className="text-xl sm:text-2xl font-bold text-center mb-4">Write your review.</h2>

          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, index) => (
              <span
                key={index}
                onClick={() => handleRating(index)}
                className={`text-4xl sm:text-6xl cursor-pointer ${index < localRating ? 'text-orange-500' : 'text-gray-300'}`}
              >
                ★
              </span>
            ))}
          </div>

          <h2 className="text-xl sm:text-lg text-center">Tell us more about your experience.</h2>

          <textarea
            className="w-full border rounded-lg p-4 text-base sm:text-lg mb-4"
            rows="5"
            placeholder="Tell us more about your experience"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            disabled={isLoading}
          ></textarea>

          <div className="flex justify-center">
            <button
              className="w-auto bg-green-500 text-white text-base sm:text-lg py-3 px-8 rounded-lg hover:bg-green-600 disabled:opacity-50"
              onClick={handleSubmit}
              disabled={isLoading}
            >
              Submit review
            </button>
          </div>
        </div>
      </div>

      <CSSTransition in={isLoading} timeout={300} classNames="modal" unmountOnExit>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-[40%] sm:w-[50%] flex flex-col items-center">
            <div className="loader mb-4"></div>
            <h2 className="text-xl sm:text-2xl font-semibold text-center">Submitting your review...</h2>
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

export default CustomerModal;
