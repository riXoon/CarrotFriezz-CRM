import React, { useState } from 'react';
import { FiSearch, FiChevronDown } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';

const NavBar = () => {

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
    alert('Logging out');
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
            <button type="submit" className="p-1 text-friezOrange-700">
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
    </div>
  )
}

export default NavBar