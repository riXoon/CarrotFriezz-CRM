import React, { useState, useEffect } from 'react';
import { FaRegChartBar } from 'react-icons/fa';
import { FiPieChart } from 'react-icons/fi';
import { IoCubeOutline, IoWalletOutline, IoChatbubblesOutline } from "react-icons/io5";
import logo from '../../assets/friezLogo.png';
import DashboardPage from '../../components/Admin/Dashboard/DashboardPage';
import AnalyticsPage from '../../components/Admin/Analytics/AnalyticsPage';
import TransactionPage from '../../components/Admin/Transaction/TransactionPage';
import SupportPage from '../../components/Admin/Support/SupportPage';

const SideBar = () => {
  const [activeLink, setActiveLink] = useState(() => {
    // Retrieve the active link from localStorage, default to 'Dashboard'
    return localStorage.getItem('activeLink') || 'Dashboard';
  });

  const [pageKey, setPageKey] = useState(0); // Key to force re-render on page change

  useEffect(() => {
    // Update localStorage whenever activeLink changes
    localStorage.setItem('activeLink', activeLink);
  }, [activeLink]);

  const handleLinkClick = (link) => {
    setActiveLink(link);
    setPageKey((prevKey) => prevKey + 1); // Increment key to force re-render
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'Dashboard':
        return <DashboardPage />;
      case 'Analytics':
        return <div><AnalyticsPage /></div>;
      case 'Transactions':
        return <div><TransactionPage /></div>;
      case 'Support':
        return <div><SupportPage /></div>;
      default:
        return <div>Select a tab to see the content.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 p-4">
      <div className="bg-friezOrange-700 w-56 h-full p-4 rounded-lg shadow-lg flex flex-col items-center">
        <img src={logo} alt="Carrot Friezz Logo" className="mb-4" />

        <ul className="text-md text-white flex flex-col gap-5 w-full">
          <li
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 pl-8 ${
              activeLink === 'Dashboard' ? 'bg-friezGreen' : 'hover:bg-friezGreen'
            }`}
            onClick={() => handleLinkClick('Dashboard')}
          >
            <FiPieChart size={24} />
            <span>Dashboard</span>
          </li>
          <li
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 pl-8 ${
              activeLink === 'Analytics' ? 'bg-friezGreen' : 'hover:bg-friezGreen'
            }`}
            onClick={() => handleLinkClick('Analytics')}
          >
            <FaRegChartBar size={24} />
            <span>Analytics</span>
          </li>
          <li
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 pl-8 ${
              activeLink === 'Transactions' ? 'bg-friezGreen' : 'hover:bg-friezGreen'
            }`}
            onClick={() => handleLinkClick('Transactions')}
          >
            <IoWalletOutline size={24} />
            <span>Transactions</span>
          </li>
          <li
            className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-all duration-300 pl-8 ${
              activeLink === 'Support' ? 'bg-friezGreen' : 'hover:bg-friezGreen'
            }`}
            onClick={() => handleLinkClick('Support')}
          >
            <IoChatbubblesOutline size={24} />
            <span>Support</span>
          </li>
        </ul>
      </div>

      {/* Content Area with Full Height and Transition */}
      <div className="flex-1 h-full p-6 bg-white rounded-lg shadow-lg ml-4 overflow-auto">
        {/* Wrapper for content with fade-in effect */}
        <div key={pageKey} className="fade-in">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
