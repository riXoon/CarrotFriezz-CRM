import React, { useEffect, useRef, useState } from 'react';
import CustomerSupportIcon from '../../assets/customer-support.png'; // Replace with actual image path
import AnalyticsIcon from '../../assets/analytics.png';
import ReviewsIcon from '../../assets/reviews.png';
import NavigationIcon from '../../assets/navigation.png';

// Data for cards
const servicesData = [
  {
    title: 'Customer Support',
    description: 'Seamlessly assist your customers and improve satisfaction.',
    icon: CustomerSupportIcon,
  },
  {
    title: 'Analytics and Reporting',
    description: 'Gain insights to drive smarter business decisions.',
    icon: AnalyticsIcon,
  },
  {
    title: 'Customer Reviews and Ratings',
    description: 'Collect and showcase customer feedback effectively.',
    icon: ReviewsIcon,
  },
  {
    title: 'Easy Navigation',
    description: 'Simplify user experiences with intuitive navigation.',
    icon: NavigationIcon,
  },
];

const Services = ({ isDarkMode }) => {
  const [isVisible, setIsVisible] = useState(false); // Tracks visibility
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true); // Trigger animation when in view
        } else {
          setIsVisible(false); // Reset animation when out of view
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
      className={`px-8 lg:px-20 py-24 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}
      id="services"
    >
      {/* Title */}
      <h2 className={`text-4xl lg:text-5xl font-extrabold text-center mb-12 ${isDarkMode ? 'text-green-400' : 'text-green-900'} animate-fadeIn`}>
        Our Services
      </h2>

      {/* Cards Container */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-8 ${
          isVisible ? 'animate-fadeInUp' : ''
        }`}
      >
        {servicesData.map((service, index) => (
          <div
            key={index}
            className={`group service-card flex justify-between items-center p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out ${
              isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'
            } ${isVisible ? 'animate-fadeInUp' : ''}`}
          >
            <div className="text-left">
              <h3
                className={`text-2xl lg:text-3xl font-bold mb-2 ${
                  isDarkMode ? 'text-green-400' : 'text-green-900'
                }`}
              >
                {service.title}
              </h3>
              <p className={`text-sm lg:text-base ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                {service.description}
              </p>
            </div>
            {/* Icon with Animation on Card Hover */}
            <img
              src={service.icon}
              alt={service.title}
              className="w-16 lg:w-48 transform group-hover:animate-iconBounce"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
