import React, { useState, useEffect } from 'react';
import { FaHeart, FaStar, FaStarHalfAlt, FaExclamationTriangle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import CustomerModal from '../Customer/CustomerModal';
import NavBar from './NavBar';

const ViewReviews = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [fullName, setFullName] = useState("Anonymous");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.fullName) {
      setFullName(storedUser.fullName);
    }
  }, []);

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
    {
      id: 3,
      name: 'Emily Clark',
      rating: 4,
      date: '11/15/2024',
      comment: 'Great flavor, but a bit too salty for my taste.',
    },
    {
      id: 4,
      name: 'Mark Johnson',
      rating: 3.5,
      date: '11/14/2024',
      comment: 'The fries were okay, nothing too special about them.',
    },
  ]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  // State to track whether more reviews are visible
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleRatingChange = (newRating) => setRating(newRating);

  const addReview = () => {
    if (newComment.trim()) {
      setComments([
        {
          id: comments.length + 1,
          name: fullName,
          rating,
          date: new Date().toLocaleDateString(),
          comment: newComment,
        },
        ...comments,
      ]);
      setNewComment("");
      setIsModalOpen(false);
    }
  };

  const handleHeartClick = () => setLiked(!liked);

  // Filter comments to show only 2 by default, based on showMoreReviews flag
  const displayedComments = showMoreReviews ? comments : comments.slice(0, 2);

  return (
    <div>
      <NavBar />

      <div className="w-full min-h-screen bg-gray-100 font-sans">
        <div className="w-full max-w-full mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          
          <div className="w-full flex justify-center">
            <div className="relative w-full max-w-5xl h-[30rem]">
              <img
                src={product?.image}
                alt={product?.name}
                className="w-full h-full object-contain object-center"
              />
            </div>
          </div>
          
          <div className="px-8 py-12 lg:px-24 lg:py-16">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between">
              <div className='flex gap-5'>
                  <h2 className="text-2xl font-bold text-gray-800 mb-6 md:mb-0">{product?.name}</h2>
                  <p className="text-yellow-500 text-md flex items-center gap-1">
                      {[...Array(Math.floor(product?.rating || 0))].map((_, i) => <FaStar key={i} />)}
                      {product?.rating % 1 ? <FaStarHalfAlt /> : null}
                      <span className="ml-2 text-gray-700">{product?.rating}</span>
                    </p>
              </div>
              <div className="flex items-center space-x-6">
                <button
                  className=" bg-transparent border border-green-500 text-sm text-green-500 px-4 py-1 rounded-xl shadow-lg hover:bg-green-600 transition duration-300 hover:text-white "
                  onClick={handleModalOpen}
                >
                  Add a Review
                </button>
                <button
                  className={`text-2xl ${liked ? 'text-green-500 animate-beat' : 'text-gray-400'} hover:text-green-500 transition duration-300`}
                  onClick={handleHeartClick}
                >
                  <FaHeart />
                </button>
                <FaExclamationTriangle className="text-yellow-500 text-2xl" />
              </div>
            </div>
            <p className='mt-5'>Carrot Friezz’s buy 1 take 2 something something priced at ₱59.00 only!</p>
          </div>

          {/* Review Section */}
          <div className="px-8 md:px-24 py-12 bg-gray-50">
            <h1 className='text-2xl font-semibold mb-8'>Reviews</h1>
            {displayedComments.map((review) => (
              <div key={review.id} className="border border-gray-200 rounded-lg p-8 mb-8 bg-white shadow-md">
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gray-300 mr-6 flex-shrink-0 flex items-center justify-center text-gray-500 text-3xl">
                    👤
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 text-lg flex items-center">
                      {review.name}
                      <span className="text-yellow-500 ml-2 flex items-center text-sm">
                        {[...Array(Math.floor(review.rating))].map((_, i) => <FaStar key={i} />)}
                        {review.rating % 1 ? <FaStarHalfAlt /> : null}
                      </span>
                    </h4>
                    <p className="text-gray-400 text-md">{review.date}</p>
                  </div>
                  <button className="text-red-400 hover:text-red-500 transition duration-200">
                    <FaHeart />
                  </button>
                </div>
                <p className="text-gray-700 leading-relaxed text-lg">{review.comment}</p>
              </div>
            ))}

            {/* Button to toggle reviews visibility */}
            <div className="text-center mt-6">
              {!showMoreReviews ? (
                <button
                  className="bg-green-500 text-white border border-green-500 px-4 py-2 rounded-xl hover:bg-transparent hover:text-green-500 transition duration-500"
                  onClick={() => setShowMoreReviews(true)}
                >
                  See more reviews
                </button>
              ) : (
                <button
                  className="bg-green-500 text-white border border-green-500 px-4 py-2 rounded-xl hover:bg-transparent hover:text-green-500 transition duration-500"
                  onClick={() => setShowMoreReviews(false)}
                >
                  See less reviews
                </button>
              )}
            </div>
          </div>

          {/* Modal for Adding a Review */}
          {isModalOpen && (
            <CustomerModal
              isOpen={isModalOpen}
              onClose={handleModalClose}
              title={`Write your review for ${product?.name}`}
              rating={rating}
              onRatingChange={handleRatingChange}
              onSubmit={addReview}
              newComment={newComment}
              setNewComment={setNewComment}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewReviews;
