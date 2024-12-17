import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import { Chart, BarElement, CategoryScale, LinearScale, BarController, Title, Tooltip, Legend } from 'chart.js';

Chart.register(BarElement, CategoryScale, LinearScale, BarController, Title, Tooltip, Legend);

const SalesAnalytics = () => {
  const chartContainerRef = useRef(null);
  const canvasRef = useRef(null);
  const chartInstanceRef = useRef(null); // Ref to store the chart instance
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:80/friseup_api/sales_data.php'); // Adjust to your API URL
        const data = response.data;

        if (data.error) {
          console.error(data.error);
          return;
        }

        const allMonths = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
        ];

        const dataMap = data.reduce((acc, item) => {
          acc[item.month] = {
            sales: item.sales,
            customers: item.customers,
            orders: item.orders,
          };
          return acc;
        }, {});

        const labels = allMonths;
        const sales = labels.map(month => dataMap[month]?.sales || 0);
        const customers = labels.map(month => dataMap[month]?.customers || 0);
        const orders = labels.map(month => dataMap[month]?.orders || 0);

        setChartData({
          labels,
          datasets: [
            {
              label: 'Sales',
              data: sales,
              backgroundColor: 'rgba(29, 174, 0, 0.6)',
              borderColor: 'rgba(34, 197, 94, 1)',
              borderWidth: 1,
            },
            {
              label: 'Customers',
              data: customers,
              backgroundColor: 'rgba(233, 228, 97, 0.6)',
              borderColor: 'rgba(252, 211, 77, 1)',
              borderWidth: 1,
            },
            {
              label: 'Orders',
              data: orders,
              backgroundColor: 'rgba(254, 130, 53, 0.6)',
              borderColor: 'rgba(251, 146, 60, 1)',
              borderWidth: 1,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData && chartContainerRef.current) {
      const ctx = canvasRef.current.getContext('2d');
  
      // Destroy the existing chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
  
      // Create a new chart instance
      chartInstanceRef.current = new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                callback: function (value) {
                  // Always show "₱" by default
                  const activeSales =
                    chartInstanceRef.current &&
                    chartInstanceRef.current.legend &&
                    chartInstanceRef.current.legend.legendItems.find(
                      (item) => item.text === 'Sales' && item.hidden
                    );
                  return activeSales ? value : `₱${value}`;
                },
                color: '#9ca3af', // Fixed text color for light mode
              },
              grid: {
                display: false,
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: '#9ca3af', // Fixed text color for light mode
              },
            },
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
              labels: {
                color: '#9ca3af', // Fixed legend text color
              },
              onClick: (e, legendItem) => {
                // Default behavior for legend click
                const index = legendItem.datasetIndex;
                const meta = chartInstanceRef.current.getDatasetMeta(index);
                meta.hidden = !meta.hidden;
                chartInstanceRef.current.update(); // Trigger chart update
              },
            },
          },
        },
      });
    }
  }, [chartData]);
  
  

  return (
    <div ref={chartContainerRef} className="w-full h-full">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};

export default SalesAnalytics;
