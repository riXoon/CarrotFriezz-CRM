import React, { useState, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa';

const CustomerModal = ({ isOpen, onClose, title: propTitle, rating, onRatingChange, onSubmit, newComment, setNewComment }) => {
  const [localRating, setLocalRating] = useState(rating || 0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVisible, setIsVisible] = useState(isOpen);
  const [title, setTitle] = useState(propTitle); // Local title state

  // Update local title state only on initial render or if propTitle changes
  useEffect(() => {
    if (propTitle) setTitle(propTitle);
  }, [propTitle]);

  // Handle modal visibility and transitions
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
    onSubmit(localRating, newComment); // Submit both rating and comment
    onClose();
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end justify-center">
      {/* Modal */}
      <div
        className={`w-full max-w-2xl bg-white rounded-t-2xl p-16 relative transition-all duration-300 ${
          isTransitioning ? 'customerModal slide-up' : 'customerModal slide-down'
        }`}
      >
        {/* Arrow Down */}
        <div
          className="absolute top-2 left-1/2 transform -translate-x-1/2 cursor-pointer text-2xl text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <FaChevronDown />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>

        {/* Interactive Stars */}
        <div className="flex justify-center mb-6">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              onClick={() => handleRating(index)}
              className={`text-6xl cursor-pointer ${index < localRating ? 'text-orange-500' : 'text-gray-300'}`}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comment Section */}
        <textarea
          className="w-full border rounded-lg p-4 text-lg mb-6"
          rows="5"
          placeholder="Tell us more about your experience"
          value={newComment} // Set the value to the newComment prop
          onChange={(e) => setNewComment(e.target.value)} // Update the comment state
        ></textarea>

        <div className="flex justify-center">
          <button
            className="w-auto bg-green-500 text-white text-lg py-3 px-8 rounded-lg hover:bg-green-600"
            onClick={handleSubmit}
          >
            Submit review
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerModal;
