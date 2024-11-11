import React from 'react'
import NavBar from '../../shared/NavBar'
import VisitorInsights from './VisitorInsights'
import CustomerFeedback from './CustomerFeedback'
import DataCard from '../../shared/DataCard'

const AnalyticsPage = () => {

    const topProducts = [
        {product: 'Carrot Friezz', totalOrder: 'Total Orders', status: 'pending', price: '150.00' },
        {product: 'Carrot Friezz', totalOrder: 'Total Orders', status: 'pending', price: '200.00' },
        {product: 'Carrot Friezz', totalOrder: 'Total Orders', status: 'pending', price: '150.00' },
        {product: 'Carrot Friezz', totalOrder: 'Total Orders', status: 'pending', price: '200.00'},
        {product: 'Carrot Friezz', totalOrder: 'Total Orders', status: 'pending', price: '150.00' },
        {product: 'Carrot Friezz', totalOrder: 'Total Orders', status: 'pending', price: '200.00' },
        {product: 'Carrot Friezz', totalOrder: 'Total Orders', status: 'pending', price: '150.00' },
        {product: 'Carrot Friezz', totalOrder: 'Total Orders', status: 'pending', price: '200.00' },
      ];

      const topProductsData = [
        { key: 'product', label: 'Product' },
        { key: 'totalOrder', label: 'Total Order' },
        { key: 'status', label: 'Status' },
        { key: 'price', label: 'Price', render: (order) => `₱${order.price}` },

      ];

      const ratings = [
        {name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
        {name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
        {name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
        {name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24'},
        {name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
        {name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
        {name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
        {name: 'Liezette Aparri', order: 'Ordered Product', rating: '5 / 5', date: '11/11/24' },
      ];

      const ratingsData = [
        { key: 'name', label: 'Name' },
        { key: 'order', label: 'Order' },
        { key: 'rating', label: 'Rating' },
        { key: 'date', label: 'Date'},
      ];

  return (
    <div>
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
            <div className="w-full md:w-[48%] lg:w-[48%] p-6 bg-white rounded-lg shadow-lg border border-gray-200 h-96 overflow-y-auto mt-6">
                <DataCard orders={topProducts} columns={topProductsData} title="Top Products" showOrderCount={false} />
            </div>

            {/* Customer Rating Card */}
            <div className="w-full md:w-[48%] lg:w-[48%] p-6 bg-white rounded-lg shadow-lg border border-gray-200 h-96 overflow-y-auto mt-6">
                <DataCard orders={ratings} columns={ratingsData} title="Customer Rating" showOrderCount={false} />
            </div>
        </div>

    </div>

  )
}

export default AnalyticsPage