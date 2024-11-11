import React, { useRef, useEffect } from 'react';

/* Importing all of the parts and tools that we need to create the chart, lahat to galing sa chartjs library */
import { Chart, BarElement, CategoryScale, LinearScale, BarController, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components, dito parang inaactivate yung inimport na parts/tools from chartjs library para magamit natin sa canvas
Chart.register(BarElement, CategoryScale, LinearScale, BarController, Title, Tooltip, Legend);

const SalesAnalytics = () => {

  /* Dito ko na crineate yung parang pointers or guide sa layout, yung chartCointainerRef
  is dito nya pinopoint saang part ng box or container natin ilalagay yung chart, yung canvas
  ref naman pinopoint mismo kung saan exactly sa container or canvas mag aappear yung chart */
  const chartContainerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (chartContainerRef.current) {
      const ctx = canvasRef.current.getContext('2d');

      // Destroy any previous chart instance to avoid errors
      if (canvasRef.current.chart) {
        canvasRef.current.chart.destroy();
      }

      // Create the chart instance
      //ctx = context
      //everything here is built in names from chartjs
      //dito yung na i store yung data and content ng chart, dito na rin magbebase ng idodraw doon sa canvas.
      const chart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Sales',
              data: [300, 500, 200, 800, 1500, 700, 2500],
              backgroundColor: 'rgba(29, 174, 0, 0.6)',
              borderColor: 'rgba(34, 197, 94, 1)',
              borderWidth: 1,
            },
            {
              label: 'Customers',
              data: [150, 300, 100, 400, 700, 350, 1200],
              backgroundColor: 'rgba(233, 228, 97, 0.6)',
              borderColor: 'rgba(252, 211, 77, 1)',
              borderWidth: 1,
            },
            {
              label: 'Orders',
              data: [100, 200, 150, 250, 500, 300, 700],
              backgroundColor: 'rgba(254, 130, 53, 0.6)',
              borderColor: 'rgba(251, 146, 60, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: (value) => `₱${value}`,
              },
              grid: {
                display: false, // Remove y-axis grid lines
              },
            },
            x: {
              grid: {
                display: false, // Remove x-axis grid lines
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom', // Move legend to the bottom
            },
          },
        },
      });

      // Store the chart instance on the canvas for cleanup
      canvasRef.current.chart = chart;
    }

    // Cleanup chart on component unmount
   /*  return () => {
      if (canvasRef.current.chart) {
        canvasRef.current.chart.destroy();
      }
    }; */
  }, []);

  return (
    <div ref={chartContainerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default SalesAnalytics;
