import React, { useState } from "react";
import { FaArrowRight } from "react-icons/fa";
import TotalEarningsModal from './TotalEarningsModal';

const Card = ({ title, subTitle, linkText, showlinkText = true }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const handleLinkClick = (e) => {
    e.preventDefault();
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col justify-between bg-friezOrange-700 text-white p-6 rounded-lg shadow-xl flex-1 w-full">
      <div>
        <h1 className="font-bold text-xl uppercase">{title}</h1>
        <p className="font-bold text-2xl mt-4">{subTitle}</p>
      </div>

      {showlinkText && (
        <a
          href="#"
          className="flex items-center gap-3 hover:underline duration-500 mt-4"
          onClick={handleLinkClick}
        >
          {linkText} <FaArrowRight />
        </a>
      )}

      {/* Total Earnings Modal */}
      <TotalEarningsModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Card;
