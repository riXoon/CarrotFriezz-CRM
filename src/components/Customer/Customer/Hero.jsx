import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaExclamationTriangle } from 'react-icons/fa';
import product1 from '../../../assets/product1.png';
import product2 from '../../../assets/product2.png';
import product3 from '../../../assets/product3.png';
import product4 from '../../../assets/product4.png';
import CustomerModal from '../Customer/CustomerModal';
import ReportModal from '../../Customer/Customer/ReportModal';
import axios from 'axios';

const Hero = () => {
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState({});
  const [animateHeart, setAnimateHeart] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false); // State for report modal
  const [currentProduct, setCurrentProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [firstName, setFirstName] = useState([]);

  useEffect(() => {
    getFirstName();
  }, []);

  const getFirstName = () => {
    const userId = localStorage.getItem('id');
    if (!userId) {
      console.error('User ID is missing in localStorage.');
      return;
    }
    axios
      .get(`http://localhost:80/friseup_api/username.php?userId=${userId}`)
      .then((response) => {
        if (response.data.status === 1) {
          const { firstName } = response.data.data;
          setFirstName(`${firstName}`);
        } else {
          console.error(response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error fetching firstname:', error);
      });
  };

  const products = [
    { id: 1, name: 'Zsuper Mini', image: product1, rating: '4.9', description: 'Enjoy our Zusper Mini Carrot Friezz priced at ₱59.00 only!' },
    { id: 2, name: 'Carrot Friezz Mini', image: product2, rating: '4.9', description: 'Enjoy our Carrot Friezz Mini priced at ₱149.00 only!' },
    { id: 3, name: 'Carrot Friezz Midi', image: product3, rating: '4.9', description: 'Enjoy our Carrot Friezz Midi priced at ₱189.00 only!' },
    { id: 4, name: 'Carrot Friezz Maxi', image: product4, rating: '4.9', description: 'Enjoy our Carrot Friezz Maxi priced at ₱229.00 only!' },
  ];

  const toggleLike = (productId) => {
    setLikedProducts((prevLikes) => ({
      ...prevLikes,
      [productId]: !prevLikes[productId],
    }));
    setAnimateHeart((prevAnimate) => ({
      ...prevAnimate,
      [productId]: !prevAnimate[productId],
    }));
  };

  const handleProductSelect = (product) => {
    navigate('/Customer/view-reviews', { state: { product } });
  };

  const handleModalOpen = (product) => {
    setCurrentProduct(product);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setCurrentProduct(null);
  };

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const addReview = () => {
    if (newComment.trim()) {
      console.log('New review:', {
        product: currentProduct.name,
        rating,
        comment: newComment,
      });
      setNewComment('');
      setRating(0);
      handleModalClose();
    }
  };

  return (
    <div className="p-4 md:p-8 md:px-44">
      <div className="text-left mb-6 mt-20 md:mt-20">
        <h1 className="text-2xl md:text-3xl font-bold mb-2">Hello, {firstName}!</h1>
        <p className="text-sm md:text-md text-gray-600">
          Enjoy our mouth-watering carrot fries at affordable prices
        </p>
      </div>

      {/* Grid Layout: 2 products per row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-6 gap-y-10">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col gap-4 border rounded-lg shadow-lg p-4">
            <img src={product.image} alt={product.name} className="mx-auto mb-4 w-full h-48 object-contain" />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-base md:text-lg font-semibold">{product.name}</h2>
                <p className="text-green-500 font-semibold text-base">
                  <span className="text-black text-sm">{product.rating}</span> ★
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaHeart
                  className={`cursor-pointer text-lg transform ${
                    likedProducts[product.id] ? 'text-green-500' : 'text-gray-400'
                  } ${animateHeart[product.id] ? 'animate-beat' : ''}`}
                  onClick={() => toggleLike(product.id)}
                />
                <FaExclamationTriangle
                  className="cursor-pointer text-yellow-500 text-lg"
                  onClick={() => setIsReportModalOpen(true)} // Open report modal
                />
              </div>
            </div>
            <p className="text-sm text-gray-500">{product.description}</p>

            <div className="flex items-center justify-center gap-7">
              <button
                className="mt-4 bg-transparent text-green-500 text-sm px-4 py-1 rounded-xl border border-green-500 hover:bg-green-600 duration-500 hover:text-white"
                onClick={() => handleProductSelect(product)}
              >
                View Reviews
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Existing CustomerModal */}
      {isModalOpen && (
        <CustomerModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          title={`Write your review for ${currentProduct?.name}`}
          rating={rating}
          onRatingChange={handleRatingChange}
          onSubmit={addReview}
          newComment={newComment}
          setNewComment={setNewComment}
        />
      )}

      {/* Report Modal */}
      <ReportModal isOpen={isReportModalOpen} onClose={() => setIsReportModalOpen(false)} />
    </div>
  );
};

export default Hero;
