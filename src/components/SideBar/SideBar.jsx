import React, { useState } from 'react';
import { FaRegChartBar } from 'react-icons/fa';
import { FiPieChart } from 'react-icons/fi';
import { IoCubeOutline, IoWalletOutline, IoChatbubblesOutline } from "react-icons/io5";
import logo from '../../assets/friezLogo.png';

const SideBar = () => {
  const [activeLink, setActiveLink] = useState('Dashboard');

  const handleLinkClick = (link) => {
    setActiveLink(link);
  };

  return (
    <div className="p-4 h-screen bg-gray-100 overflow-hidden">
      <nav className="flex flex-col justify-start items-center bg-friezOrange w-56 h-[95%] p-4 rounded-lg shadow-lg overflow-x-hidden">
        <img src={logo} alt="Carrot Friezz Logo" className="mb-4 right-6 relative" />
        
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
              activeLink === 'Promotions' ? 'bg-friezGreen' : 'hover:bg-friezGreen'
            }`}
            onClick={() => handleLinkClick('Promotions')}
          >
            <IoCubeOutline size={24} />
            <span>Promotions</span>
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
      </nav>
    </div>
  );
};

export default SideBar;
