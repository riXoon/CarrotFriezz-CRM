import React, { useState, useEffect } from 'react';
import { FaHeart, FaStar, FaStarHalfAlt, FaExclamationTriangle } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import CustomerModal from '../Customer/CustomerModal';
import NavBar from './NavBar';
import axios from 'axios';
import ReportModal from '../../Customer/Customer/ReportModal';

const ViewReviews = () => {
  const location = useLocation();
  const { product } = location.state || {};  // Destructure product, fallback to an empty object

  const [username, setUsername] = useState("");
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  useEffect(() => {
    getUsername();
  }, []);

  const getUsername = () => {
    const userId = localStorage.getItem("id");
    if (!userId) {
      console.error("User ID is missing in localStorage.");
      return;
    }
    axios
      .get(`http://localhost:80/friseup_api/username.php?userId=${userId}`)
      .then((response) => {
        if (response.data.status === 1) {
          const { firstName, lastName } = response.data.data;
          setUsername(`${firstName} ${lastName}`);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching username:", error);
      });
  };

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [liked, setLiked] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);

  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
  const handleRatingChange = (newRating) => setRating(newRating);

  useEffect(() => {
    if (product?.id) {
      axios
        .get(`http://localhost:80/friseup_api/reviews.php?product_id=${product.id}`)
        .then((response) => {
          console.log("API Response:", response.data);
          if (response.data.success && Array.isArray(response.data.reviews)) {
            setComments(response.data.reviews);
          } else {
            console.error('Error fetching reviews:', response.data.message);
          }
        })
        .catch((error) => console.error('Error fetching reviews:', error));
    }
  }, [product?.id]);
  
  
  

  const addReview = () => {
    if (!product || !product.id) {
      console.error("Product ID is not available.");
      return;  // Return early if product or product.id is not available
    }

    if (newComment.trim()) {
      const newReview = {
        id: comments.length + 1,
        name: username,
        rating,
        date: new Date().toLocaleDateString(),
        comment: newComment,
        productId: product?.id,  // Ensure the product ID is included
      };

      // Submit the review to the backend
      axios.post('http://localhost:80/friseup_api/reviews.php', newReview)
      .then(response => {
        if (response.data.status === 1) {
          setComments([newReview, ...comments]);  // Add the new review to the local state
          setNewComment(""); // Reset the new comment field
          setIsModalOpen(false); // Close the modal
          fetchReviews(); // Optionally, call the function that fetches reviews from the server again
        } else {
          console.error(response.data.message);
        }
      })
      .catch(error => {
        console.error("Error adding review:", error);
      });
    
    }
  };

  const handleHeartClick = () => setLiked(!liked);

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
                  {product?.rating ? (
                    [...Array(Math.floor(product?.rating ?? 0))].map((_, i) => <FaStar key={i} />)
                  ) : null}
                  {product?.rating && product?.rating % 1 ? <FaStarHalfAlt /> : null}
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
                <FaExclamationTriangle className="text-yellow-500 text-2xl cursor-pointer" 
                  onClick ={() => setIsReportModalOpen(true)}/>
              </div>
            </div>
            <p className='mt-5'>Carrot Friezz’s buy 1 take 2 something something priced at ₱59.00 only!</p>
          </div>

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
                    {review.firstName} {review.lastName}
                    <span className="text-yellow-500 ml-2 flex items-center text-sm">
                      {review.stars ? (
                        [...Array(Math.floor(review.stars ?? 0))].map((_, i) => <FaStar key={i} />)
                      ) : null}
                      {review.stars && review.stars% 1 ? <FaStarHalfAlt /> : null}
                    </span>
                  </h4>
                  <span className="text-gray-400 text-sm">{review.date}</span>
                </div>
              </div>

              <div className="text-gray-600">{review.review}</div>
            </div>
          ))}



          {comments.length > 2 && !showMoreReviews && (
            <div className="text-center mt-4">
              <button
                onClick={() => setShowMoreReviews(true)}
                className="bg-green-500 text-white border border-green-500 px-4 py-2 rounded-xl hover:bg-transparent hover:text-green-500 transition duration-500"
              >
                See More Reviews
              </button>
            </div>
          )}


            {showMoreReviews && (
              <div className="text-center mt-4">
                <button
                  onClick={() => setShowMoreReviews(false)}
                  className="bg-red-500 text-white border border-red-500 px-4 py-2 rounded-xl hover:bg-transparent hover:text-red-500 transition duration-500"
                >
                  Hide Reviews
                </button>
              </div>
            )}
          </div>

          <CustomerModal 
            isOpen={isModalOpen} 
            onClose={handleModalClose} 
            title="Add Your Review" 
            rating={rating} 
            onRatingChange={handleRatingChange}  // Pass handleRatingChange function here
            newComment={newComment} 
            setNewComment={setNewComment} 
            productId={product?.id}  // Make sure productId is passed if needed
            onSubmit={addReview}  // Pass the onSubmit prop as well
          />

          <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
        </div>
      </div>
    </div>
  );
};

export default ViewReviews;
