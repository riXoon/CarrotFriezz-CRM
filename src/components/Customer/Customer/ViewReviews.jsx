import React, { useState } from 'react';
import { FaHeart, FaStar, FaStarHalfAlt, FaExclamationTriangle } from 'react-icons/fa'; // Import icons
import { useLocation } from 'react-router-dom'; // Import useLocation to retrieve passed data
import CustomerModal from '../Customer/CustomerModal'; // Modal component for adding reviews
import NavBar from './NavBar'; // Navbar component

const ViewReviews = () => {
  // Retrieve product data from the navigation state
  const location = useLocation();
  const { product } = location.state || {}; // Destructure product from passed state

  const [comments, setComments] = useState([
    {
      id: 1,
      name: 'Jane Doe',
      rating: 4.5,
      date: '11/17/2024',
      comment: 'Absolutely loved these carrot fries! Crispy and full of flavor. A must-try for snack lovers!',
    },
    {
      id: 2,
      name: 'John Smith',
      rating: 5,
      date: '11/16/2024',
      comment: 'Best carrot fries I’ve had! The buy 1 take 2 offer makes it even better!',
    },
  ]);
  const [newComment, setNewComment] = useState(""); // Text for the new review
  const [liked, setLiked] = useState(false); // Heart icon state for liking the product
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [rating, setRating] = useState(0); // Rating for the new review

  const handleModalOpen = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true); // Open modal
  };

  const handleModalClose = () => {
    setIsModalOpen(false); // Close modal
    setCurrentProduct(null); // Reset current product
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating); // Set the new rating
  };

  const addReview = () => {
    if (newComment.trim()) {
      const newReview = {
        id: comments.length + 1,
        name: 'Anonymous', // Placeholder name, can be modified later
        rating: rating,
        date: new Date().toLocaleDateString(), // Current date
        comment: newComment, // Comment text
      };
      setComments([...comments, newReview]); // Add new review to the list
      setNewComment(""); // Reset comment input field
      setIsModalOpen(false); // Close modal
    }
  };

  const handleHeartClick = () => {
    setLiked(!liked); // Toggle liked state
  };

  return (
    <div>
      <NavBar /> {/* Navbar component */}

      <div className="w-full min-h-screen p-8 bg-gray-50 font-sans">
        {/* Product Section */}
        <div className="text-center mb-10">
          <img
            src={product?.image} // Display the image of the selected product
            alt={product?.name} // Display the name of the selected product
            className="w-[24rem] md:w-[100rem] mx-auto rounded-lg shadow-lg px-[25rem]"
          />
          <div className='mt-4 flex items-center justify-evenly gap-[30rem]'>
            <div className='flex items-center gap-4'>
              <h2 className="text-xl font-semibold text-gray-800">{product?.name}</h2> {/* Display the product name */}
              <p className="text-green-500 text-md flex justify-center items-center gap-1">
                <span>{product?.rating}</span> <FaStar /><FaStar /><FaStar /><FaStar /><FaStarHalfAlt /> {/* Display rating */}
              </p>
            </div>
            <div className='flex items-center gap-4'>
              <button
                className="bg-transparent text-green-500 text-sm px-4 py-1 rounded-xl border border-green-500 hover:bg-green-600 duration-500 hover:text-white"
                onClick={() => handleModalOpen(product)} // Open modal to add review
              >
                Add a review
              </button>
              <div className="flex items-center gap-2">
                <button
                  className={`transition duration-200 ${liked ? 'text-green-500' : 'text-gray-500'}`}
                  onClick={handleHeartClick} // Toggle heart icon state
                >
                  <FaHeart />
                </button>
                <FaExclamationTriangle className="text-yellow-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Review Section */}
        <div className="max-w-3xl mx-auto">
          {comments.map((review) => (
            <div key={review.id} className="border border-gray-200 rounded-lg p-6 mb-6 bg-white shadow-lg">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-300 mr-4 flex-shrink-0">
                  {/* Placeholder profile icon */}
                  <span className="text-xl text-gray-500 flex items-center justify-center h-full">👤</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-800 flex items-center">
                    {review.name}
                    <span className="text-orange-500 ml-2 flex items-center text-sm">
                      {[...Array(Math.floor(review.rating))].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                      {review.rating % 1 ? <FaStarHalfAlt /> : null}
                    </span>
                  </h4>
                  <p className="text-gray-400 text-sm">{review.date}</p>
                </div>
                <button className="text-red-400 hover:text-red-500 transition duration-200">
                  <FaHeart />
                </button>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {review.comment}
              </p>
            </div>
          ))}
        </div>

        {/* Modal Component for Adding a Review */}
        {isModalOpen && (
          <CustomerModal
            isOpen={isModalOpen}
            onClose={handleModalClose} // Close modal
            title={`Write your review for ${product?.name}`} // Modal title with product name
            rating={rating} // Rating state
            onRatingChange={handleRatingChange} // Handle rating change in the modal
            onSubmit={addReview} // Submit new review logic
            newComment={newComment} // Pass the comment text
            setNewComment={setNewComment} // Function to update the comment text
          />
        )}
      </div>
    </div>
  );
};

export default ViewReviews;
