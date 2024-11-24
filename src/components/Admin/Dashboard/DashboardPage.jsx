import React, { useState, useEffect } from 'react';
import Card from './Card';
import SalesAnalytics from './SalesAnalytics';
import DataCard from '../../../shared/DataCard';
import NavBar from '../../../shared/NavBar';

const DashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const orderCount = orders.length;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:80/friseup_api/recentorder.php');
        const data = await response.json();
        console.log('Fetched Orders:', data); 
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, 
    };
    return date.toLocaleString('en-US', options);
  };

  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    const fetchTotalEarnings = async () => {
      try {
        const response = await fetch('http://localhost:80/friseup_api/transaction.php');
        const data = await response.json();
        setTotalEarnings(data.totalEarnings); 
      } catch (error) {
        console.error('Error fetching total earnings:', error);
      }
    };

    fetchTotalEarnings();
  }, []); 

  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    const fetchTotalOrders = async () => {
      try {
        const response = await fetch('http://localhost:80/friseup_api/transaction.php');
        const data = await response.json();
        setTotalOrders(data.totalOrders); 
      } catch (error) {
        console.error('Error fetching total orders:', error);
      }
    };

    fetchTotalOrders();
  }, []); 

  const [totalCustomers, setTotalCustomers] = useState(0);

  useEffect(() => {
    const fetchTotalCustomers = async () => {
      try {
        const response = await fetch('http://localhost:80/friseup_api/transaction.php');
        const data = await response.json();
        setTotalCustomers(data.totalCustomers); 
      } catch (error) {
        console.error('Error fetching total customers:', error);
      }
    };

    fetchTotalCustomers();
  }, []); 

  return (
    <div>
      <NavBar />

      <h1 className="font-bold text-2xl mt-6">Dashboard</h1>

      <div className="flex gap-5 justify-center w-full">
        <Card
          title="Total Earnings"
          subTitle={`₱ ${totalEarnings.toLocaleString()}`}
          linkText="View Total Earnings"
        />

        <Card
          title="Total Orders"
          subTitle={totalOrders}
          showlinkText={false}
        />
        <Card
          title="Customers"
          subTitle={totalCustomers}
          showlinkText={false}
        />
      </div>

      <div className="flex gap-5 w-full mt-6 h-full">
        <div className="flex flex-col w-full lg:w-1/2 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <h1 className="text-left w-full text-xl font-semibold mb-4 uppercase text-gray-800 dark:text-white">
            Sales Analytics
          </h1>
          <div className="w-full p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md h-72">
            <SalesAnalytics />
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-1/2 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-96 overflow-y-auto">
          <header className="flex justify-between items-center mb-4">
            <h1 className="text-left w-full text-lg font-semibold mb-4 uppercase text-gray-800 dark:text-white">
              Recent Orders <span className="text-green-600">({orderCount})</span>
            </h1>
          </header>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-y-auto max-h-full custom-scrollbar">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-friezOrange-500 dark:bg-friezOrange-700 text-gray-700 dark:text-gray-200 uppercase text-sm text-nowrap leading-normal">
                    <th className="py-3 px-6 text-left font-semibold">Order No.</th>
                    <th className="py-3 px-6 text-left font-semibold">Date</th>
                    <th className="py-3 px-6 text-left font-semibold">Customer</th>
                    <th className="py-3 px-6 text-left font-semibold">Total</th>
                    <th className="py-3 px-6 text-left font-semibold">Items</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-3 px-6 text-gray-600 dark:text-gray-400">No transactions found</td>
                    </tr>
                  ) : (
                    orders.map((order, index) => (
                      <tr key={index} className="border-b border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-200 text-sm text-nowrap">
                        <td className="py-3 px-6 text-left">{String(order.id).padStart(4, '0')}</td>
                        <td className="py-3 px-6 text-left">{formatDate(order.date)}</td>
                        <td className="py-3 px-6 text-left">{order.firstName} {order.lastName}</td>
                        <td className="py-3 px-6 text-left">₱ {order.totalPrice}</td>
                        <td className="py-3 px-6 text-left">{order.items}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
