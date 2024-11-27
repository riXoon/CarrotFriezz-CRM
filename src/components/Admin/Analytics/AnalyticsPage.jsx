import React from 'react';
import NavBar from '../../../shared/NavBar';
import VisitorInsights from './VisitorInsights';
import CustomerFeedback from './CustomerFeedback';
import DataCard from '../../../shared/DataCard';
import TopProducts from './TopProducts';

const AnalyticsPage = () => {
  

  const ratings = [
    { name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
    { name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
    { name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
    { name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
    { name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
    { name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
    { name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
    { name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
  ];

  const ratingsData = [
    { key: 'name', label: 'Name' },
    { key: 'order', label: 'Order' },
    { key: 'rating', label: 'Rating' },
    { key: 'date', label: 'Date' },
  ];

  return (
    <div className=" dark:bg-gray-900 min-h-screen text-gray-900 dark:text-gray-200">
      <NavBar />

      <h1 className="font-bold text-2xl mt-6">Analytics</h1>
      <div className="flex justify-center gap-6 mt-6 flex-wrap">
        {/* Visitor Insights Card */}
        <div className="w-full md:w-[48%] lg:w-[48%]">
          <VisitorInsights />
        </div>

        {/* Customer Feedback Card */}
        <div className="w-full md:w-[48%] lg:w-[48%]">
          <CustomerFeedback />
        </div>

        {/* Top Products Card */}
        <div className="w-full md:w-[48%] lg:w-[48%] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-96 overflow-y-auto mt-6">
          <TopProducts />
        </div>

        {/* Customer Rating Card */}
        <div className="w-full md:w-[48%] lg:w-[48%] p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 h-96 overflow-y-auto mt-6">
          <DataCard orders={ratings} columns={ratingsData} title="Customer Rating" showOrderCount={false} />
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
