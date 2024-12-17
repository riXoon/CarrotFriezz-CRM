import React, { useEffect, useRef, useState } from "react";
import ContactImg from '../../assets/contactimg.png';
import Location from '../../assets/loc-icon.png';
import Phone from '../../assets/phone-icon.png';
import Mail from '../../assets/mail-icon.png';

const ContactUs = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Intersection Observer for Visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Trigger animation when in view
        }
      },
      { threshold: 0.2 } // Trigger when 20% of the section is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`min-h-screen grid md:grid-cols-2 bg-gray-50 dark:bg-gray-900 transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Left Section */}
      <div className="bg-orange-500 flex flex-col items-center justify-center text-center px-8 py-16">
        <h2 className="text-white text-4xl font-extrabold mb-4">
          Get in touch with us
        </h2>
        <p className="text-white text-lg mb-8">
          Reach out to us for inquiries.
        </p>
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md dark:bg-gray-800 dark:text-white">
          <h3 className="text-lg font-bold text-green-800 mb-4 dark:text-green-400">
            Contact FriseUp
          </h3>
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-3 border rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
              />
            </div>
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full p-3 border rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
            />
            <textarea
              placeholder="Message here..."
              className="w-full p-3 border rounded-md bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 h-24 resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full p-3 bg-green-500 text-white rounded-md font-bold hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Right Section */}
      <div className="bg-white flex flex-col items-center justify-center px-8 py-16 dark:bg-gray-800 dark:text-white">
        <h2
          className={`text-green-800 text-4xl font-extrabold mb-4 dark:text-green-400 transition-all duration-700 ${
            isVisible ? 'animate-slideUp' : ''
          }`}
        >
          Contact Us
        </h2>
        <p
          className={`text-gray-600 text-lg mb-8 text-center dark:text-gray-300 transition-opacity duration-700 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          Let's work together to achieve your goals. Contact us today.
        </p>
        <div className="mb-8">
          {/* Carrot Icon */}
          <img
            src={ContactImg}
            className={`w-[25rem] h-[25rem] dark:opacity-80 transition-opacity duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>
        <div className="flex justify-center items-center gap-6">
          <div className="flex items-center">
            <img
              src={Location}
              className="w-6 h-6 dark:opacity-80"
            />
            <p className="text-gray-700 dark:text-gray-300">123 Carrot St, Carrotville, CC 12345</p>
          </div>
          <div className="flex items-center">
            <img
              src={Phone}
              className="w-6 h-6 dark:opacity-80"
            />
            <p className="text-gray-700 dark:text-gray-300">+63 997182511</p>
          </div>
          <div className="flex items-center">
            <img
              src={Mail}
              className="w-6 h-6 dark:opacity-80"
            />
            <p className="text-gray-700 dark:text-gray-300">friseup@gmail.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
