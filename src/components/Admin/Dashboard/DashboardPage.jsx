import React, { useState } from 'react';


import Card from './Card';
import SalesAnalytics from './SalesAnalytics';
import DataCard from '../../../shared/DataCard'
import NavBar from '../../../shared/NavBar';

const DashboardPage = () => {
  

  const orders = [
    { orderNo: '12345', date: '11-11-24', customer: 'Liezette Aparri', total: '150.00', items: '3' },
    { orderNo: '12346', date: '11-11-24', customer: 'Meryl Alcantra', total: '200.00', items: '5' },
    { orderNo: '12345', date: '11-11-24', customer: 'Liezette Aparri', total: '150.00', items: '3' },
    { orderNo: '12346', date: '11-11-24', customer: 'Meryl Alcantra', total: '200.00', items: '5' },
    { orderNo: '12345', date: '11-11-24', customer: 'Liezette Aparri', total: '150.00', items: '3' },
    { orderNo: '12346', date: '11-11-24', customer: 'Meryl Alcantra', total: '200.00', items: '5' },
    { orderNo: '12345', date: '11-11-24', customer: 'Liezette Aparri', total: '150.00', items: '3' },
    { orderNo: '12346', date: '11-11-24', customer: 'Meryl Alcantra', total: '200.00', items: '5' },
  ];
  
  const columns = [
    { key: 'orderNo', label: 'Order No.', render: (order) => `#${order.orderNo}` },
    { key: 'date', label: 'Date' },
    { key: 'customer', label: 'Customer' },
    { key: 'total', label: 'Total', render: (order) => `₱${order.total}` },
    { key: 'items', label: 'Items' }
  ];

  return (
    <div>
      <NavBar />

      <h1 className='font-bold text-2xl mt-6'>Dashboard</h1>

      <div className='flex gap-5 justify-center w-full'>

        {/* Dito ko inimport yung Card component for better optimization at much cleaner code */}

        <Card
          title = "Total Earnings"
          subTitle = "₱ 130k"
          linkText = "View Total Earnings" 
        />

        <Card
          title = "Total Orders"
          subTitle = "14, 892"
          showlinkText = {false} 
        />

        <Card
          title = "Customers"
          subTitle = "100,000"
          showlinkText = {false}
          
        />

      </div>

      {/* Sales Analuytics container to man */}
      <div className="flex gap-5 w-full mt-6 h-full">
          {/* Sales Analytics Section */}
        <div className="flex flex-col w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg border border-gray-200">
          <h1 className="text-left w-full text-xl font-semibold mb-4 uppercase">
            Sales Analytics
          </h1>
          <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md h-72">
            <SalesAnalytics />
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="flex flex-col w-full lg:w-1/2 p-6 bg-white rounded-lg shadow-lg border border-gray-200 h-96 overflow-y-auto">
          <DataCard orders={orders} columns={columns} title="Recent Orders" showOrderCount={true} />
        </div>

      </div>



      </div>
  );
};

export default DashboardPage;
