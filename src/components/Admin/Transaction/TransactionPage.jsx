import React, { useState, useEffect } from 'react';
import NavBar from '../../../shared/NavBar';
import AddTransaction from './AddTransaction';
import axios from 'axios';

const TransactionPage = () => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: '2-digit',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true, // AM/PM format
    };
    return date.toLocaleString('en-US', options);
  };

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions();
  }, []);

  const getTransactions = () => {
    axios
      .get("http://localhost:80/friseup_api/transaction")
      .then((response) => {
        console.log(response.data);
        setTransactions(response.data.transactions); // Extract transactions array
      })
      .catch((error) => {
        console.error("Error fetching transactions:", error);
      });
  };

  return (
    <div className="dark:bg-gray-900 dark:text-gray-200 min-h-screen">
      <NavBar />

      {/* Heading and Button Container */}
      <div className="flex justify-between items-center mt-6">
        <h1 className="font-bold text-2xl">Transactions</h1>
        <AddTransaction onSave={getTransactions} />
      </div>

      <div className="flex justify-center mt-6">
        <div className="min-h-[450px] bg-white rounded-xl shadow-2xl p-6 w-full dark:bg-gray-800 dark:shadow-gray-700">
          <div className="rounded-lg overflow-hidden">
            <div className="overflow-y-auto max-h-[450px]">
              <table className="min-w-full">
                <thead>
                  <tr className="bg-friezOrange-500 text-gray-700 uppercase text-sm leading-normal dark:bg-friezOrange-600 dark:text-gray-100">
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
                  {transactions && transactions.length === 0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="text-center py-3 px-6 text-gray-600 dark:text-gray-400"
                      >
                        No transactions found
                      </td>
                    </tr>
                  ) : (
                    transactions &&
                    transactions.map((transaction, index) => (
                      <tr
                        key={index}
                        className="border-b border-gray-200 text-gray-600 text-sm dark:border-gray-700 dark:text-gray-300"
                      >
                        <td className="py-3 px-6 text-left">{String(transaction.id).padStart(4, '0')}</td>
                        <td className="py-3 px-6 text-left">{transaction.firstName} {transaction.lastName}</td>
                        <td className="py-3 px-6 text-left">{formatDate(transaction.date)}</td>
                        <td className="py-3 px-6 text-left">{transaction.items}</td>
                        <td className="py-3 px-6 text-left">₱ {transaction.totalPrice}</td>
                        <td className="py-3 px-6 text-left">{transaction.payment}</td>
                        <td className="py-3 px-6 text-left">{transaction.promoCode}</td>
                        <td className="py-3 px-6 text-left">{transaction.salesperson}</td>
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

export default TransactionPage;
