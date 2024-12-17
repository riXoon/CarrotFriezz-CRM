import React from "react";

const Footer = () => {
  return (
    <footer className="bg-orange-700 text-white text-center py-6">
      <h2 className="text-lg font-bold mb-2">Contact Carrot Friez</h2>
      <p className="text-sm mb-2">
        Indulge in delicious and healthy carrot fries at Carrot Friezz!
      </p>
      <p className="text-sm mb-4">
        Located at 841 Quirino Highway, Novaliches, Quezon City, near SM
        Novaliches.
      </p>
      <div className="flex justify-center space-x-6 items-center">
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Phone" className="text-white">
            📞
          </span>
          <p className="text-sm">63+ 997182511</p>
        </div>
        <div className="flex items-center space-x-2">
          <span role="img" aria-label="Email" className="text-white">
            📧
          </span>
          <p className="text-sm">friseup@gmail.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
