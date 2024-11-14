import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const AddTransaction = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    
    // Sample products with prices
    const items = [
        { name: 'Carrot Friezz', price: 25.00 },
        { name: 'Friezz Carrot', price: 35.50 },
        { name: 'Carrot Friezz', price: 25.75 },
        { name: 'Friezz Carrot', price: 65.00 },
    ];

    // Toggle dropdown
    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    // Select or deselect an item
    const handleItemClick = (item) => {
        const isSelected = selectedItems.find(selected => selected.name === item.name);
        let newSelectedItems;

        if (isSelected) {
            newSelectedItems = selectedItems.filter(selected => selected.name !== item.name);
        } else {
            newSelectedItems = [...selectedItems, item];
        }

        setSelectedItems(newSelectedItems);

        // Update total price
        const newTotalPrice = newSelectedItems.reduce((acc, selected) => acc + selected.price, 0);
        setTotalPrice(newTotalPrice.toFixed(2));
    };

    // Remove an item from selection
    const handleRemoveItem = (itemName) => {
        const newSelectedItems = selectedItems.filter(item => item.name !== itemName);
        setSelectedItems(newSelectedItems);

        // Update total price
        const newTotalPrice = newSelectedItems.reduce((acc, selected) => acc + selected.price, 0);
        setTotalPrice(newTotalPrice.toFixed(2));
    };

    const handleAddTransactionClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <button 
                onClick={handleAddTransactionClick} 
                className="bg-friezGreen text-white px-4 py-2 text-sm rounded-2xl hover:bg-green-600 duration-500"
            >
                + Add Transaction
            </button>

            {/* Modal with CSSTransition */}
            <CSSTransition
                in={showModal}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-[60%]">
                        <h2 className="text-2xl font-semibold text-center mb-4">New Transaction</h2>
                        <form className="space-y-4">
                            {/* Full-width fields */}
                            <input className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen" placeholder="Customer Name" />
                            <input type="date" className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen" placeholder="Date" />
                            
                            {/* Multi-select dropdown for Product Name */}
                            <div className="relative">
                                <div 
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen cursor-pointer flex items-center justify-between"
                                    onClick={toggleDropdown}
                                >
                                    {selectedItems.length === 0 ? (
                                        <span className="text-gray-500">Items</span>
                                    ) : (
                                        <div className="flex flex-wrap gap-2">
                                            {selectedItems.map((item, index) => (
                                                <span 
                                                    key={index} 
                                                    className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center gap-1"
                                                >
                                                    {item.name}
                                                    <button 
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleRemoveItem(item.name);
                                                        }}
                                                        className="text-red-500"
                                                    >
                                                        &times;
                                                    </button>
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                    <span className="ml-2 text-gray-500">&#9662;</span> {/* Dropdown arrow icon */}
                                </div>

                                {/* Dropdown menu */}
                                {isDropdownOpen && (
                                    <div className="absolute z-10 bg-white border rounded-lg mt-1 w-full max-h-40 overflow-y-auto">
                                        {items.map((item, index) => (
                                            <div
                                                key={index}
                                                onClick={() => handleItemClick(item)}
                                                className={`p-2 hover:bg-gray-200 cursor-pointer ${selectedItems.find(selected => selected.name === item.name) ? 'bg-gray-100' : ''}`}
                                            >
                                                {item.name} - ₱{item.price.toFixed(2)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            {/* Displaying the total price in the Total Amount field */}
                            <div className="grid grid-cols-2 gap-4">
                                <input 
                                    className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen" 
                                    placeholder="Total Amount" 
                                    value={`$${totalPrice}`} 
                                    readOnly 
                                />
                                <select className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen">
                                    <option>Payment Method</option>
                                    <option>Cash</option>
                                    <option>Gcash</option>
                                    <option>Paymaya</option>
                                    <option>Maya na pay</option>
                                </select>
                            </div>

                            {/* Full-width fields */}
                            <input className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen" placeholder="Promo" />
                            <input className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen" placeholder="Salesperson" />
                        </form>
                        <div className="flex justify-end mt-6">
                            <button 
                                onClick={handleCloseModal} 
                                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button 
                                type="submit" 
                                className="bg-friezGreen text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default AddTransaction;
