import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../../shared/NavBar';
import VisitorInsights from './VisitorInsights';
import CustomerFeedback from './CustomerFeedback';
import DataCard from '../../../shared/DataCard';
import TopProducts from './TopProducts';

const AnalyticsPage = () => {
  const [ratings, setRatings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRatings = async () => {
    try {
      const response = await axios.get('http://localhost:80/friseup_api/customerRating.php'); // URL for the new PHP file
      if (response.data.success) {
        setRatings(response.data.reviews);
      } else {
        console.error('Error fetching reviews:', response.data.message);
      }
    } catch (error) {
      console.error('Failed to fetch reviews:', error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchRatings();
  }, []);

  const ratingsData = [
    { key: 'name', label: 'Name' },
    { key: 'product', label: 'Product' },
    { key: 'stars', label: 'Rating' },
    { key: 'date', label: 'Date' },
  ];

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-200">
      <NavBar />
      <h1 className="font-bold text-2xl mt-6">Analytics</h1>
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        <div className="w-full md:w-[48%] lg:w-[48%]">
          <VisitorInsights />
        </div>
        <div className="w-full md:w-[48%] lg:w-[48%]">
          <CustomerFeedback />
        </div>
        <div className="w-full md:w-[48%] lg:w-[48%] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-96 overflow-y-auto mt-6">
          <TopProducts />
        </div>
        <div className="w-full md:w-[48%] lg:w-[48%] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-96 overflow-y-auto mt-6">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
          ) : (
            <DataCard orders={ratings} columns={ratingsData} title="Customer Ratings" showOrderCount={false} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
