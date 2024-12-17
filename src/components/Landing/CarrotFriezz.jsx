import React, { useEffect, useRef, useState } from 'react';
import friezz1 from '../../assets/friezz1.jpg';
import friezz2 from '../../assets/friezz2.jpg'; // Default (cover) image
import friezz3 from '../../assets/friezz3.jpg';
import friezz4 from '../../assets/friezz4.jpg';
import friezz5 from '../../assets/friezz5.jpg';

const CarrotFriezz = () => {
  const slideshowImages = [friezz1, friezz3, friezz4, friezz5]; // Slideshow images
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  // Slideshow Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true); // Trigger fade-out
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % slideshowImages.length); // Update index
        setIsFading(false); // Trigger fade-in
      }, 500); // Duration of fade-out effect
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [slideshowImages.length]);

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
      className={`relative min-h-screen bg-orange-50 dark:bg-gray-800 flex flex-col overflow-hidden transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      id="client"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-orange-200 to-orange-50 dark:from-gray-700 dark:to-gray-800 opacity-80 animate-pulse"></div>

      {/* Main Content */}
      <div
        className={`relative z-10 flex-1 flex flex-col items-center w-full text-center p-8 ${
          isVisible ? 'animate-slideUp' : ''
        }`}
      >
        {/* Title */}
        <h1 className="text-4xl lg:text-5xl font-extrabold text-green-900 dark:text-green-400 mt-10 animate-fadeInUp mb-10 animate-on-scroll">
          Get to know Carrot Friezz
        </h1>

        {/* Cover Photo Section */}
        <a
          href="https://fb.watch/wl5um_xRG1/"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-4xl mt-6 relative"
        >
          <img
            src={friezz2}
            alt="Cover Photo"
            className={`rounded-lg shadow-lg w-full h-auto transition-opacity duration-700 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            } animate-on-scroll`}
          />
        </a>

        {/* Founder Story */}
        <div className="flex flex-col md:flex-row items-center w-full max-w-7xl mt-10 md:space-x-8 px-4 md:px-0">
          {/* Slideshow */}
          <div className="w-full md:w-1/2 relative">
            <img
              src={slideshowImages[currentIndex]}
              alt="Slideshow"
              className={`rounded-lg shadow-lg w-full h-auto transform transition-opacity duration-500 ${
                isFading ? 'opacity-0' : 'opacity-100'
              } animate-on-scroll`}
            />
          </div>

          {/* Founder Story */}
          <div className="w-full md:w-1/2 text-left mt-6 md:mt-0">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4 animate-fadeIn animate-on-scroll">
              <span className="font-bold text-orange-600 dark:text-orange-500">Carrot Friezz</span> was founded by{' '}
              <span className="font-bold">Mr. Jasper Uson</span>, a 24-year-old entrepreneur who wanted to create a
              unique and marketable business idea. The business offers a creative spin on traditional french fries by
              making them from carrots, paired with various flavors and tomato ketchup dip.
            </p>
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed animate-fadeIn animate-on-scroll">
              <span className="font-bold">CarrotFriezz</span> is redefining the way you snack. We've taken the classic
              comfort food, fries, and given it a healthy, delicious twist. Our carrot-based fries are crispy,
              flavorful. With every bite, you're indulging in a guilt-free snack that's both satisfying and good for
              you.
            </p>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="w-full max-w-7xl mt-10 px-4 md:px-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {slideshowImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105 animate-on-scroll"
              >
                <img
                  src={image}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-48 object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarrotFriezz;
