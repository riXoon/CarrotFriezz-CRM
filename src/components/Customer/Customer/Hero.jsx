import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaExclamationTriangle } from 'react-icons/fa';
import product1 from '../../../assets/product1.png';
import product2 from '../../../assets/product2.png';
import product3 from '../../../assets/product3.png';
import product4 from '../../../assets/product4.png';
import CustomerModal from '../Customer/CustomerModal';

const Hero = () => {
  const navigate = useNavigate();
  const [likedProducts, setLikedProducts] = useState({});
  const [animateHeart, setAnimateHeart] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [fullName, setFullName] = useState("User"); // Default to "User" if no name found

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.fullName) {
      setFullName(storedUser.fullName);
    }
  }, []);

  const products = [
    { id: 1, name: 'Zsuper Mini', image: product1, rating: '4.9', description: 'Enjoy our Zusper Mini Carrot Friezz priced at ₱58.00 only!' },
    { id: 2, name: 'Carrot Friezz Mini', image: product2, rating: '4.9', description: 'Enjoy our Carrot Friezz Mini priced at ₱48.00 only!' },
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
      console.log("New review:", {
        product: currentProduct.name,
        rating,
        comment: newComment,
      });
      setNewComment("");
      setRating(0);
      handleModalClose();
    }
  };

  return (
    <div className="p-8 px-44">
      <div className="text-left mb-6">
        <h1 className="text-3xl font-bold mb-2">Hello, {fullName}!</h1>
        <p className="text-md text-gray-600">Enjoy our mouth-watering carrot fries at affordable prices</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 gap-y-14">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col gap-4 border rounded-lg shadow-lg p-4">
            <img src={product.image} alt={product.name} className="mx-auto mb-4 w-90" />
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-green-500 font-semibold text-lg">
                  <span className="text-black text-base">{product.rating}</span> ★
                </p>
              </div>
              <div className="flex items-center gap-2">
                <FaHeart
                  className={`cursor-pointer text-lg transform ${likedProducts[product.id] ? 'text-green-500' : 'text-gray-400'} ${animateHeart[product.id] ? 'animate-beat' : ''}`}
                  onClick={() => toggleLike(product.id)}
                />
                <FaExclamationTriangle className="text-yellow-500 text-lg" />
              </div>
            </div>
            <p className="text-sm text-gray-500">{product.description}</p>

            <div className="flex items-center justify-center gap-7">
              <button
                className="mt-4 bg-transparent text-green-500 text-sm px-4 py-1 rounded-xl border border-green-500 hover:bg-green-600 duration-500 hover:text-white"
                onClick={() => handleModalOpen(product)}
              >
                Add a review
              </button>

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
    </div>
  );
};

export default Hero;
