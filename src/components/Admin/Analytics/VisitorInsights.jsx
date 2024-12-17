import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Filler);

const VisitorInsights = () => {
  // Function to create gradient for the chart
  const createGradient = (ctx, area) => {
    const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);
    gradient.addColorStop(0, 'rgba(249, 115, 22, 0)');
    gradient.addColorStop(1, 'rgba(249, 115, 22, 0.3)'); // Reduced opacity
    return gradient;
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Visitor Insights',
        data: [100, 450, 425, 140, 200, 267, 300, 120, 320, 370, 470, 380],
        fill: true,
        borderColor: '#f97316',
        backgroundColor: (context) => {
          const { chart } = context;
          const { ctx, chartArea } = chart;
          if (!chartArea) return null;
          return createGradient(ctx, chartArea);
        },
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
        hoverBorderWidth: 3,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: '#f97316', // Tooltip background color
        titleColor: '#ffffff',
        titleFont: { weight: 'bold' },
        bodyColor: '#ffffff',
        bodyFont: { size: 12 },
        padding: 8,
        cornerRadius: 4,
        callbacks: {
          title: () => 'Visitors', // Tooltip title
          label: (context) => `${context.raw} visitors`, // Tooltip content
        },
      },
    },
    layout: {
      padding: {
        top: 20,
        bottom: 10,
        left: 0,
        right: 0,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
          color: '#9ca3af', // Light text color
        },
      },
      y: {
        min: 0,
        max: 500,
        ticks: {
          stepSize: 100,
          color: '#9ca3af', // Light text color
          font: {
            size: 12,
          },
        },
        grid: {
          color: '#e5e7eb', // Light grid color
          drawBorder: false,
        },
      },
    },
    hover: {
      mode: 'index', // Display tooltip on line hover
      intersect: false,
    },
  };

  return (
    <div className="w-full max-w-lg p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Visitor Insights</h2>
      <div className="relative h-64">
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default VisitorInsights;
