import React, { useState, useEffect } from 'react';
import { FaRegChartBar } from 'react-icons/fa';
import { FiPieChart } from 'react-icons/fi';
import { IoWalletOutline, IoChatbubblesOutline } from "react-icons/io5";
import logo from '../../assets/friezLogo.png';
import DashboardPage from '../../components/Admin/Dashboard/DashboardPage';
import AnalyticsPage from '../../components/Admin/Analytics/AnalyticsPage';
import TransactionPage from '../../components/Admin/Transaction/TransactionPage';
import SupportPage from '../../components/Admin/Support/SupportPage';

const SideBar = () => {
  const [activeLink, setActiveLink] = useState(localStorage.getItem('activeLink') || 'Dashboard');
  const [pageKey, setPageKey] = useState(0);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Retrieve the dark mode state from localStorage or default to false (light mode)
    const savedDarkMode = localStorage.getItem('isDarkMode');
    return savedDarkMode === 'true'; // Convert string to boolean
  });

  // Effect to update the body class and localStorage whenever dark mode state changes
  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }

    // Save the dark mode preference to localStorage
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setPageKey((prevKey) => prevKey + 1); // Increment key to force re-render
    localStorage.setItem('activeLink', link); // Save the active link in localStorage
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Analytics':
        return <AnalyticsPage />;
      case 'Transactions':
        return <TransactionPage />;
      case 'Support':
        return <SupportPage />;
      default:
        return <div>Select a tab to see the content.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4 dark:bg-darkBackground dark:text-darkText">
      <div className="bg-friezOrange-700 w-56 h-full p-4 rounded-lg shadow-lg flex flex-col items-center dark:bg-friezOrange-800">
        <img src={logo} alt="Carrot Friezz Logo" className="mb-4" />

        <ul className="text-md text-white flex flex-col gap-5 w-full">
          <li
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 pl-8 ${activeLink === 'Dashboard' ? 'bg-friezGreen' : 'hover:bg-friezGreen'}`}
            onClick={() => handleLinkClick('Dashboard')}
          >
            <FiPieChart size={24} />
            <span>Dashboard</span>
          </li>
          <li
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 pl-8 ${activeLink === 'Analytics' ? 'bg-friezGreen' : 'hover:bg-friezGreen'}`}
            onClick={() => handleLinkClick('Analytics')}
          >
            <FaRegChartBar size={24} />
            <span>Analytics</span>
          </li>
          <li
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 pl-8 ${activeLink === 'Transactions' ? 'bg-friezGreen' : 'hover:bg-friezGreen'}`}
            onClick={() => handleLinkClick('Transactions')}
          >
            <IoWalletOutline size={24} />
            <span>Transactions</span>
          </li>
          <li
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 pl-8 ${activeLink === 'Support' ? 'bg-friezGreen' : 'hover:bg-friezGreen'}`}
            onClick={() => handleLinkClick('Support')}
          >
            <IoChatbubblesOutline size={24} />
            <span>Support</span>
          </li>
        </ul>

        {/* Dark Mode Toggle */}
        <div className="mt-auto">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              checked={isDarkMode}
              onChange={() => setIsDarkMode((prev) => !prev)} // Toggle dark mode
            />
            <div className="w-16 h-8 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-6 before:w-6 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-6 after:h-6 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"
            ></div>
          </label>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 h-full p-6 bg-white rounded-lg shadow-lg ml-4 overflow-auto dark:bg-darkBackground dark:text-darkText">
        <div key={pageKey} className="fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
