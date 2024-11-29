import React, { useEffect, useState, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerFeedback = () => {
  const [feedbackData, setFeedbackData] = useState([0, 0, 0, 0, 0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeedbackData = async () => {
      try {
        const response = await axios.get('http://localhost:80/friseup_api/fetchStars.php'); // No product ID needed
  
        console.log('Response from fetchStars.php:', response.data);
  
        if (response.data.success && Array.isArray(response.data.stars)) {
          // Initialize ratings array
          const ratings = [0, 0, 0, 0, 0];
  
          // Map database stars data to the ratings array
          response.data.stars.forEach((item) => {
            const starValue = parseInt(item.stars, 10);
            const count = parseInt(item.count, 10);
  
            if (starValue >= 1 && starValue <= 5) {
              ratings[5 - starValue] = count;
            } else {
              console.warn(`Unexpected star value: ${starValue}`);
            }
          });
  
          console.log('Aggregated Ratings:', ratings);
          setFeedbackData(ratings);
        } else {
          console.error('Failed to fetch stars:', response.data.message || 'Unknown error.');
        }
      } catch (error) {
        console.error('Error fetching star data:', error.response || error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchFeedbackData();
  }, []);
  
  

  const data = useMemo(() => ({
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
    datasets: [
      {
        data: feedbackData,
        backgroundColor: ['#FE8235', '#FFFF00', '#008000', '#0000FF', '#FF0000'],
        hoverOffset: 10,
      },
    ],
  }), [feedbackData]);

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset.data;
            const value = dataset[tooltipItem.dataIndex];
            const total = dataset.reduce((acc, item) => acc + item, 0);
            const percentage = total > 0 ? ((value / total) * 100).toFixed(2) : '0.00';
            return `${tooltipItem.label}: ${value} (${percentage}%)`;
          },
        },
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20,
          color: '#9ca3af',
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
    },
    layout: {
      padding: {
        right: 50,
      },
    },
    maintainAspectRatio: false,
  };

  if (loading) {
    return <div className="text-center text-gray-500">Loading feedback...</div>;
  }

  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col items-center h-[324px]">
      <h2 className="text-lg font-bold text-gray-700 dark:text-white self-start mb-4">Customer Feedback</h2>
      <div className="w-3/4 h-3/4">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default CustomerFeedback;
