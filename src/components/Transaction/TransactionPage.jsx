import React, { useState } from 'react';
import NavBar from '../../shared/NavBar';
import AddTransaction from './AddTransaction';

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([
    {
      transactionNo: '#12345',
      name: 'Liezette',
      date: '11-14-24',
      time: '10:00 AM',
      price: '₱150.00',
      items: '3 items',
      payment: 'Paymaya',
      promo: 'Promo',
      salesperson: 'Liezette'
    },
    // ... other sample data
  ]);

  const addTransaction = (newTransaction) => {
    // Generate transaction number as a zero-padded value (e.g., 0001, 0002, etc.)
    const transactionNo = `#${(transactions.length + 1).toString().padStart(4, '0')}`;

    // Format the date to mm-dd-yy
    const date = new Date();
    const formattedDate = `${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}-${date.getFullYear().toString().slice(2)}`;

        setTransactions((prev) => [
            ...prev,
            {
                ...newTransaction,
                transactionNo,  // Add the formatted transaction number
                date: formattedDate  // Add the formatted date
            }
        ]);
    };


  return (
    <div>
      <NavBar />

      {/* Heading and Button Container */}
      <div className="flex justify-between items-center mt-6">
        <h1 className="font-bold text-2xl">Transactions</h1>
        <AddTransaction onSave={addTransaction} />
      </div>

      <div className="flex justify-center bg-gray-100 mt-6">
        <div className="min-h-[450px] bg-white rounded-xl shadow-2xl p-6 w-full">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="overflow-y-auto max-h-[450px]">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-friezOrange-500 text-gray-700 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left font-semibold">Order No.</th>
                    <th className="py-3 px-6 text-left font-semibold">Name</th>
                    <th className="py-3 px-6 text-left font-semibold">Date</th>
                    <th className="py-3 px-6 text-left font-semibold">Items</th>
                    <th className="py-3 px-6 text-left font-semibold">Total Price</th>
                    <th className="py-3 px-6 text-left font-semibold">Payment</th>
                    <th className="py-3 px-6 text-left font-semibold">Promo</th>
                    <th className="py-3 px-6 text-left font-semibold">Salesperson</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction, index) => (
                    <tr key={index} className="border-b border-gray-200 text-gray-600 text-sm">
                      <td className="py-3 px-6 text-left">{transaction.transactionNo}</td>
                      <td className="py-3 px-6 text-left">{transaction.name}</td>
                      <td className="py-3 px-6 text-left">{transaction.date}</td>
                      <td className="py-3 px-6 text-left">{transaction.items}</td>
                      <td className="py-3 px-6 text-left">{transaction.price}</td>
                      <td className="py-3 px-6 text-left">{transaction.payment}</td>
                      <td className="py-3 px-6 text-left">{transaction.promo}</td>
                      <td className="py-3 px-6 text-left">{transaction.salesperson}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionPage;
