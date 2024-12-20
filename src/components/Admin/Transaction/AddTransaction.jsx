import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";
import axios from "axios";

const AddTransaction = ({ onSave }) => {
    const [showModal, setShowModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationMessage, setConfirmationMessage] = useState("");
    const [selectedItems, setSelectedItems] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const salespersons = ["Emelie Uson", "Jamela Uson"];
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        items: [],
        payment: "",
        promoCode: "",
        salesperson: "",
        totalPrice: "",
    });

    const items = [
        { name: "Zsuper Mini Friezz", price: 59.0 },
        { name: "Mini Friezz", price: 149.0 },
        { name: "Midi Friezz", price: 189.0 },
        { name: "Maxi Friezz", price: 229.0 },
    ];

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    const handleItemClick = (item) => {
        const isSelected = selectedItems.find((selected) => selected.name === item.name);
        let newSelectedItems;
    
        if (isSelected) {
            // Increase quantity if item is already selected
            newSelectedItems = selectedItems.map((selected) =>
                selected.name === item.name
                    ? { ...selected, quantity: selected.quantity + 1 }
                    : selected
            );
        } else {
            // Add item with quantity 1 if not selected
            newSelectedItems = [...selectedItems, { ...item, quantity: 1 }];
        }
    
        setSelectedItems(newSelectedItems);
    
        // Update total price
        const newTotalPrice = newSelectedItems.reduce(
            (acc, selected) => acc + selected.price * selected.quantity,
            0
        );
        setTotalPrice(newTotalPrice.toFixed(2));
        setIsDropdownOpen(false);
    };
    
    const handleQuantityChange = (itemName, newQuantity) => {
        

        if (newQuantity < 1) return; // Prevent quantity less than 1
    
        const newSelectedItems = selectedItems.map((item) =>
            item.name === itemName ? { ...item, quantity: newQuantity } : item
        );
    
        setSelectedItems(newSelectedItems);
    
        // Update total price
        const newTotalPrice = newSelectedItems.reduce(
            (acc, selected) => acc + selected.price * selected.quantity,
            0
        );
        setTotalPrice(newTotalPrice.toFixed(2));
    };
    

    const handleRemoveItem = (itemName) => {
        const newSelectedItems = selectedItems.filter((item) => item.name !== itemName);
        setSelectedItems(newSelectedItems);

        const newTotalPrice = newSelectedItems.reduce(
            (acc, selected) => acc + selected.price * selected.quantity,
            0
        );
        setTotalPrice(newTotalPrice.toFixed(2));
    };

    const handleSave = async (e) => {
        e.preventDefault();
    
        if (!formData.firstName || !selectedItems.length || !formData.payment || !formData.salesperson) {
            setIsLoading(true);
            setShowModal(false);
    
            let failureMessage = "Transaction Failed: ";
            if (!formData.firstName) failureMessage += "First Name is required. ";
            if (!selectedItems.length) failureMessage += "At least one item must be selected. ";
            if (!formData.payment) failureMessage += "Payment Method is required. ";
            if (!formData.salesperson) failureMessage += "Salesperson is required. ";
    
            setTimeout(() => {
                setIsLoading(false);
                setShowConfirmation(true);
                setConfirmationMessage(failureMessage);
            }, 2000);
    
            return;
        }
    
        const totalQuantity = selectedItems.reduce((acc, item) => acc + item.quantity, 0);
    
        const payload = {
            firstName: formData.firstName,
            lastName: formData.lastName,
            items: totalQuantity,
            itemsqty: selectedItems.map((item) => ({
                name: item.name,
                quantity: item.quantity,
            })),
            totalPrice: totalPrice,
            payment: formData.payment,
            salesperson: formData.salesperson,
            promoCode: formData.promoCode,
        };
    
        try {
            setIsLoading(true);
            await axios.post("http://localhost:80/friseup_api/savetransaction", payload, {
                headers: {
                    "Content-Type": "application/json",
                },
            });
    
            setTimeout(() => {
                setIsLoading(false);
                setConfirmationMessage("Transaction Successful!");
                setShowConfirmation(true);
    
                // Reset form data and selected items
                setFormData({
                    firstName: "",
                    lastName: "",
                    items: [],
                    payment: "",
                    promoCode: "",
                    salesperson: "",
                    totalPrice: "",
                });
                setSelectedItems([]);
                setTotalPrice(0);
            }, 2000);
        } catch (error) {
            console.error("Transaction error:", error);
            setTimeout(() => {
                setIsLoading(false);
                setConfirmationMessage("Transaction Failed. Please try again.");
                setShowConfirmation(true);
            }, 2000);
        }
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
    <CSSTransition in={showModal} timeout={300} classNames="modal" unmountOnExit>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 dark:bg-black dark:bg-opacity-90">
            <div className="bg-white rounded-lg shadow-xl p-6 w-[800px] dark:bg-gray-800">
                <h2 className="text-2xl font-semibold text-center mb-4 text-black dark:text-white">
                    New Transaction
                </h2>
                <form className="space-y-4">
                    {/* Customer Name */}
                    <label htmlFor="" className="text-black dark:text-white">Customer Name</label>
                    <input
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    <input
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />

                    {/* Multi-select dropdown for Product Name */}
                    <div className="relative">
                        <div
                            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen cursor-pointer flex items-center justify-between dark:bg-gray-700 dark:border-gray-600"
                            onClick={toggleDropdown}
                        >
                            {selectedItems.length === 0 ? (
                                <span className="text-gray-500 dark:text-gray-400">Items</span>
                            ) : (
                                <div className="flex flex-wrap gap-2">
                                    {selectedItems.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full flex items-center gap-2 dark:bg-gray-600 dark:text-white"
                                        >
                                            <span>{item.name}</span>
                                            <div className="flex items-center">
                                                <button
                                                    className="px-1 bg-red-500 text-white rounded-md"
                                                    onClick={(e) => {
                                                        e.preventDefault(); // Prevent default form behavior
                                                        e.stopPropagation();
                                                        handleQuantityChange(item.name, item.quantity - 1);
                                                    }}
                                                >
                                                    -
                                                </button>
                                                <span className="px-2">{item.quantity}</span>
                                                <button
                                                    className="px-1 bg-green-500 text-white rounded-md"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        handleQuantityChange(item.name, item.quantity + 1);
                                                    }}
                                                >
                                                    +
                                                </button>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleRemoveItem(item.name);
                                                }}
                                                className="text-red-500"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            <span className="ml-2 text-gray-500">&#9662;</span>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 bg-white shadow-md rounded-lg z-10 dark:bg-gray-700 dark:text-white">
                                {items.map((item, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer dark:hover:bg-gray-600"
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
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Total Amount"
                        value={`₱${totalPrice}`}
                        readOnly
                    />

                    {/* Payment Method Dropdown */}
                    <select
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.payment}
                        onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
                    >
                        <option>Payment Method</option>
                        <option>Cash</option>
                        <option>Gcash</option>
                        <option>Paymaya</option>
                    </select>

                    {/* Salesperson Dropdown */}
                    <select
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        value={formData.salesperson}
                        onChange={(e) => setFormData({ ...formData, salesperson: e.target.value })}
                    >
                        <option>Salesperson</option>
                        {salespersons.map((person, index) => (
                            <option key={index} value={person}>
                                {person}
                            </option>
                        ))}
                    </select>

                    {/* Promo Code */}
                    <input
                        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-friezGreen dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        placeholder="Promo Code"
                        value={formData.promo}
                        onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                    />

                    <div className="flex gap-4 justify-end">
                        <button
                            onClick={handleCloseModal}
                            className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 dark:bg-gray-600 dark:hover:bg-gray-700"
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
            <CSSTransition in={isLoading} timeout={300} classNames="modal" unmountOnExit>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-[40%] flex flex-col items-center">
                        <div className="loader mb-4"></div>
                        <h2 className="text-2xl font-semibold text-center">Processing the transaction...</h2>
                    </div>
                </div>
            </CSSTransition>

            {/* Confirmation Modal */}
            <CSSTransition in={showConfirmation} timeout={300} classNames="modal" unmountOnExit>
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-[40%]">
                        <h2 className="text-2xl font-semibold text-center">{confirmationMessage}</h2>
                        <div className="flex justify-end">
                            <button
                                onClick={handleCloseConfirmation}
                                className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </CSSTransition>

            
        </div>
    );
};

export default AddTransaction;
