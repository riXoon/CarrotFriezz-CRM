import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';

const AddTransaction = ({ onSave }) => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState('');
    const [selectedItems, setSelectedItems] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);

    const [formData, setFormData] = useState({
        name: '',
        items: [],
        payment: '',
        promo: '',
        salesperson: '',
        totalPrice: 0,
    });

    const items = [
        { name: 'Zzuper Mini Friezz', price: 59.00 },
        { name: 'Mini Friezz', price: 149.00 },
        { name: 'Midi Friezz', price: 189.00 },
        { name: 'Maxi Friezz', price: 229.00 },
        
    ];

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleItemClick = (item) => {
        const isSelected = selectedItems.find(selected => selected.name === item.name);
        let newSelectedItems;

        if (isSelected) {
            newSelectedItems = selectedItems.filter(selected => selected.name !== item.name);
        } else {
            newSelectedItems = [...selectedItems, item];
        }

        setSelectedItems(newSelectedItems);

        const newTotalPrice = newSelectedItems.reduce((acc, selected) => acc + selected.price, 0);
        setTotalPrice(newTotalPrice.toFixed(2));
    };

    const handleRemoveItem = (itemName) => {
        const newSelectedItems = selectedItems.filter(item => item.name !== itemName);
        setSelectedItems(newSelectedItems);

        const newTotalPrice = newSelectedItems.reduce((acc, selected) => acc + selected.price, 0);
        setTotalPrice(newTotalPrice.toFixed(2));
    };

    const handleSave = () => {
        // Validate form fields
        if (!formData.name || !selectedItems.length || !formData.payment || !formData.salesperson) {
            setIsLoading(true);
            setShowModal(false);
            
            // Set the failure message based on missing fields
            let failureMessage = 'Transaction Failed: ';
            if (!formData.name) failureMessage += 'Customer Name is required. ';
            if (!selectedItems.length) failureMessage += 'At least one item must be selected. ';
            if (!formData.payment) failureMessage += 'Payment Method is required. ';
            if (!formData.salesperson) failureMessage += 'Salesperson is required. ';

            setTimeout(() => {
                setIsLoading(false);
                setShowConfirmation(true);
                setConfirmationMessage(failureMessage);
            }, 2000);

            return;
        }

        // Proceed with the transaction if all required fields are valid
        setIsLoading(true);
        setShowModal(false);

        setTimeout(() => {
            setIsLoading(false);
            setShowConfirmation(true);
            setConfirmationMessage('Transaction Successful!');

            const currentDate = new Date().toLocaleDateString(); // Automatically record current date

            if (onSave) {
                const transaction = {
                    orderNo: Math.floor(Math.random() * 1000),  // Random order number
                    name: formData.name,
                    items: `${selectedItems.length} items`,
                    price: `₱${totalPrice}`,
                    payment: formData.payment,
                    promo: formData.promo,
                    salesperson: formData.salesperson,
                    date: currentDate,  // Adding the current date
                };
                onSave(transaction);
            }
        }, 2000);
    };

    const handleAddTransactionClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false);
    };

    return (
        <div>
            <button 
                onClick={handleAddTransactionClick} 
                className="bg-friezGreen text-white px-4 py-2 text-sm rounded-2xl hover:bg-green-600 duration-500"
            >
                + Add Transaction
            </button>

            {/* Transaction Modal */}
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
                            {/* Customer Name */}
                            <input 
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen" 
                                placeholder="Customer Name" 
                                value={formData.name} 
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
                            />
                            
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
                                    <span className="ml-2 text-gray-500">&#9662;</span>
                                </div>

                                {isDropdownOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-md rounded-lg z-10">
                                        {items.map((item, index) => (
                                            <div
                                                key={index}
                                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => handleItemClick(item)}
                                            >
                                                {item.name} - ₱{item.price.toFixed(2)}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Display Total Price */}
                            <input 
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen" 
                                placeholder="Total Amount" 
                                value={`₱${totalPrice}`} 
                                readOnly 
                            />

                            {/* Payment Method Dropdown */}
                            <select 
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen" 
                                value={formData.payment} 
                                onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                            >
                                <option>Payment Method</option>
                                <option>Cash</option>
                                <option>Gcash</option>
                                <option>Paymaya</option>
                                <option>Maya na pay</option>
                            </select>

                            {/* Promo Code */}
                            <input 
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen" 
                                placeholder="Promo Code" 
                                value={formData.promo} 
                                onChange={(e) => setFormData({ ...formData, promo: e.target.value })} 
                            />

                            {/* Salesperson */}
                            <input 
                                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen" 
                                placeholder="Salesperson" 
                                value={formData.salesperson} 
                                onChange={(e) => setFormData({ ...formData, salesperson: e.target.value })} 
                            />
                            
                            <div className="flex gap-4 justify-end">
                                <button
                                    onClick={handleCloseModal}
                                    className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="bg-friezGreen text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                >
                                    Save Transaction
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </CSSTransition>

            {/* Loading Modal */}
            <CSSTransition
                in={isLoading}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6">
                        <div className="flex justify-center">
                            <div className="animate-spin w-10 h-10 border-4 border-t-transparent border-friezGreen rounded-full"></div>
                        </div>
                    </div>
                </div>
            </CSSTransition>

            {/* Confirmation Modal */}
            <CSSTransition
                in={showConfirmation}
                timeout={300}
                classNames="modal"
                unmountOnExit
            >
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-[60%]">
                        <h2 className="text-2xl font-semibold text-center mb-4">{confirmationMessage}</h2>
                        <div className="flex justify-center">
                            <button 
                                onClick={handleCloseConfirmation} 
                                className="bg-friezGreen text-white px-4 py-2 rounded-lg hover:bg-green-600"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

export default AddTransaction;
