import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import friseUpLogo from '../../assets/friseup-logo.png';

const NavBar = ({ darkMode, toggleDarkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Sign up button handler
  const handleSignUp = () => {
    navigate('/signup');
  };

  // Toggle mobile menu visibility
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close the menu when a link is clicked
  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className={`bg-friezOrange-700 shadow-md fixed w-full z-50 ${darkMode ? 'dark' : ''}`}>
      <nav className="flex items-center justify-between px-4 py-3 md:px-40">
        {/* Left: Logo */}
        <div className="flex items-center cursor-pointer">
          <img src={friseUpLogo} alt="FriseUp Logo" className="h-8 md:h-10" />
        </div>

        {/* Center: Navigation Links (Desktop and Tablet view) */}
        <div className="hidden md:flex space-x-8">
          <a href="#home" className="text-white hover:text-gray-200 transition duration-200">
            Home
          </a>
          <a href="#services" className="text-white hover:text-gray-200 transition duration-200">
            Services
          </a>
          <a href="#about-us" className="text-white hover:text-gray-200 transition duration-200">
            About Us
          </a>
          <a href="#client" className="text-white hover:text-gray-200 transition duration-200">
            Client
          </a>
        </div>

        {/* Right: Dark Mode Toggle and Sign Up Button (Desktop and Tablet view) */}
        <div className="hidden md:flex items-center space-x-4">
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              type="checkbox"
              onChange={toggleDarkMode} // Toggle dark mode
              checked={darkMode} // Bind the state
            />
            <div className="w-16 h-8 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-6 before:w-6 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-6 after:h-6 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"
            ></div>
          </label>

          {/* Sign Up Button */}
          <button
            onClick={handleSignUp}
            className="px-8 py-1 border border-green-500 bg-friezOrange-700 text-white rounded-3xl hover:bg-green-600 transition duration-200"
          >
            Sign Up
          </button>
        </div>

        {/* Hamburger Icon (for mobile and tablet) */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </nav>

      {/* Mobile and Tablet Menu (Full-screen slide-in effect) */}
      <div
        className={`md:hidden fixed inset-0 bg-friezOrange-700 text-white flex flex-col items-center justify-center space-y-6 transition-all ease-in-out duration-500 transform ${
          isMenuOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
      >
        {/* Close Button (X Icon) */}
        <button
          onClick={closeMenu}
          className="absolute top-4 right-4 text-white text-3xl"
        >
          &times;
        </button>

        {/* Mobile/Tablet Navigation Links */}
        <a
          href="#home"
          onClick={closeMenu} // Close menu when a link is clicked
          className="text-white text-lg hover:text-gray-200 transition duration-200"
        >
          Home
        </a>
        <a
          href="#services"
          onClick={closeMenu}
          className="text-white text-lg hover:text-gray-200 transition duration-200"
        >
          Services
        </a>
        <a
          href="#about-us"
          onClick={closeMenu}
          className="text-white text-lg hover:text-gray-200 transition duration-200"
        >
          About Us
        </a>
        <a
          href="#client"
          onClick={closeMenu}
          className="text-white text-lg hover:text-gray-200 transition duration-200"
        >
          Client
        </a>

        {/* Mobile Dark Mode Toggle */}
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            className="sr-only peer"
            type="checkbox"
            onChange={toggleDarkMode} // Toggle dark mode
            checked={darkMode} // Bind the state
          />
          <div className="w-16 h-8 rounded-full ring-0 peer duration-500 outline-none bg-gray-200 overflow-hidden before:flex before:items-center before:justify-center after:flex after:items-center after:justify-center before:content-['☀️'] before:absolute before:h-6 before:w-6 before:top-1/2 before:bg-white before:rounded-full before:left-1 before:-translate-y-1/2 before:transition-all before:duration-700 peer-checked:before:opacity-0 peer-checked:before:rotate-90 peer-checked:before:-translate-y-full shadow-lg shadow-gray-400 peer-checked:shadow-lg peer-checked:shadow-gray-700 peer-checked:bg-[#383838] after:content-['🌑'] after:absolute after:bg-[#1d1d1d] after:rounded-full after:top-[4px] after:right-1 after:translate-y-full after:w-6 after:h-6 after:opacity-0 after:transition-all after:duration-700 peer-checked:after:opacity-100 peer-checked:after:rotate-180 peer-checked:after:translate-y-0"
          ></div>
        </label>

        {/* Mobile Sign Up Button */}
        <button
          onClick={handleSignUp}
          className="px-8 py-2 border border-green-500 bg-friezOrange-700 text-white rounded-3xl hover:bg-green-600 transition duration-200"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default NavBar;
