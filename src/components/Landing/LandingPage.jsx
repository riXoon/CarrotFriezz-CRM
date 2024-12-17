import React, { useState } from 'react';
import NavBar from '../Landing/NavBar.jsx';
import Hero from '../Landing/Hero.jsx';
import Services from '../Landing/Services.jsx';
import AboutUs from './AboutUs.jsx';
import CarrotFriezz from './CarrotFriezz.jsx';
import ContactUs from './ContactUs.jsx';
import Footer from './Footer.jsx';

const LandingPage = () => {
  const [darkMode, setDarkMode] = useState(false); // State for dark mode

  // Dark mode toggle handler
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark'); // Add `dark` class to HTML
    } else {
      document.documentElement.classList.remove('dark'); // Remove `dark` class from HTML
    }
  };

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      
      <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Hero isDarkMode={darkMode} />
      <Services isDarkMode={darkMode} />
      <AboutUs isDarkMode={darkMode}/>
      <CarrotFriezz isDarkMode={darkMode}/>
      <ContactUs isDarkMode={darkMode}/>
      <Footer isDarkMode={darkMode}/>
    </div>
  );
};

export default LandingPage;
