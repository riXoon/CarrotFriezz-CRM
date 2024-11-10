import React, { useState } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

import Card from './Card';
import SalesAnalytics from './SalesAnalytics';

const DashboardPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  /* ito maghahandle everytime hinihit yung search button, not functionable pa as of now nov 9 */
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  /* fcuntion na magtrigger sa dropdown pag naclick */
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  /* maghahandle ng logout function, di rin functionable */
  const handleLogout = () => {
    console.log("Logging out...");
    // Perform logout action here
  };

  return (
    <div>
      <nav>

        {/* Sa searchbar at nav bar to */}
        <div className="flex items-center justify-between">
          <form
            onSubmit={handleSubmit}
            className="flex items-center bg-white rounded-lg overflow-hidden shadow-md"
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearch}
              className="px-2 py-1 w-40 outline-none text-sm"
            />
            <button type="submit" className="p-1 text-friezOrange">
              <FiSearch size={16} />
            </button>
          </form>

          {/* User Profile with Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center text-gray-600">
              <FaUserCircle size={24} className="text-gray-600" />
              <span className="ml-2 text-gray-800 font-medium">User</span>
              <FiChevronDown size={16} className="ml-1 text-gray-600" />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border">
                <button
                  onClick={handleLogout}
                  className="block px-4 py-2 text-sm text-gray-800 hover:bg-gray-200 w-full text-left"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

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
          linkText = "View Total Orders" 
        />

        <Card
          title = "Customers"
          subTitle = "100,000"
          linkText = "See Details" 
        />

      </div>

      {/* Sales Analuytics container to man */}

      <div className="flex flex-col items-center w-6/12 p-6 bg-white rounded-lg shadow-lg border border-gray-200 mt-6">
        <h1 className="text-left w-full text-xl font-semibold mb-4 uppercase">Sales Analytics</h1>

        <div className="flex justify-center gap-8 text-gray-700 mb-6">
          <p><span className="font-bold text-friezGreen">₱190.99k</span> Income</p>
          <p><span className="font-bold text-friezGreen">1023</span> Sales</p>
          <p><span className="font-bold text-friezGreen">721</span> Customers</p>
        </div>

        <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
          <SalesAnalytics />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
