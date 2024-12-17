import React from 'react';
import HeroCarrot from '../../assets/hero-carrot.png';

const Hero = ({ isDarkMode }) => {
  return (
    <div
      className={`${
        isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
      } min-h-screen w-full  flex items-center justify-center`}
    >
      <div
        className="flex flex-col ml-0 lg:ml-[10rem] lg:flex-row items-center justify-center text-center lg:text-left gap-12 px-6 lg:px-16 w-full"
        id="home"
      >
        {/* Left Section */}
        <div className="lg:w-1/2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold capitalize leading-snug">
            Your companion in building stronger business-customer relationships.
          </h1>
        </div>

        {/* Right Section */}
        <div className="flex flex-col items-center lg:items-start gap-3 lg:w-1/2">
          <img
            src={HeroCarrot}
            alt="Hero Carrot"
            className="w-[18rem] sm:w-[20rem] lg:w-[25rem] mb-6 object-contain"
          />
          <h1 className="text-md sm:text-lg lg:text-xl font-medium">
            Empowering teams for successful businesses.
          </h1>
        </div>
      </div>

      <h1 className="text-center opacity-30 text-sm sm:text-base absolute bottom-4 w-full">
        Copyright ⓒ FriseUp 2024. All rights reserved.
      </h1>
    </div>
  );
};

export default Hero;
