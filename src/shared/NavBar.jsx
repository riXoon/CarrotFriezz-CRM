import React, { useState } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    // Clear user data from localStorage to simulate logout
    localStorage.removeItem("user");

    // Redirect to the login page
    alert('Logging out');
    navigate('/'); // This will redirect to the login page ("/")
  };

  return (
    <div>
      <nav>
        {/* Search bar and nav bar */}
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
            <button type="submit" className="p-1 text-friezOrange-700">
              <FiSearch size={16} />
            </button>
          </form>

          {/* User Profile with Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="flex items-center text-gray-600">
              <FaUserCircle size={24} className="text-gray-600" />
              <span className="ml-2 text-gray-800 font-medium">Admin</span>
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
    </div>
  );
};

export default NavBar;
