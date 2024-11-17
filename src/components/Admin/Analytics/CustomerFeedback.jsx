import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CustomerFeedback = () => {
  const data = {
    labels: ['Very Satisfied', 'Satisfied', 'Neutral', 'Dissatisfied', 'Very Dissatisfied'],
    datasets: [
      {
        data: [50, 30, 20, 10, 5], // Sample data; adjust as needed
        backgroundColor: ['#FE8235', '#FFFF00', '#008000', '#0000FF', '#FF0000'],
        hoverOffset: 10,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset.data;
            const value = dataset[tooltipItem.dataIndex];
            const total = dataset.reduce((acc, item) => acc + item, 0);
            const percentage = ((value / total) * 100).toFixed(2);
            return `${tooltipItem.label}: ${percentage}%`;
          },
        },
      },
      legend: {
        display: true,
        position: 'right',
        labels: {
          usePointStyle: true,
          padding: 20, // Space between legend and chart
          color: '#333',
          font: {
            size: 14,
            family: 'Arial, sans-serif',
          },
        },
      },
    },
    layout: {
      padding: {
        right: 50, // Padding between chart and legend
      },
    },
    maintainAspectRatio: false, // Control the chart's height and width
  };

  return (
    <div className="p-6 w-full max-w-2xl mx-auto bg-white rounded-lg shadow-md flex flex-col items-center h-[324px]">
      <h2 className="text-lg font-bold text-gray-700 self-start mb-4">Customer Feedback</h2>
      <div className="w-3/4 h-3/4">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default CustomerFeedback;
