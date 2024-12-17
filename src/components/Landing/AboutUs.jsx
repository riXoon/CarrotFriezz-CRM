import React, { useEffect } from 'react';
import member1 from '../../assets/member1.png';
import member2 from '../../assets/member2.png';
import member3 from '../../assets/member3.png';
import member4 from '../../assets/member4.png';
import member5 from '../../assets/member5.png';
import member6 from '../../assets/member6.png';
import member7 from '../../assets/member7.png';
import member8 from '../../assets/member8.png';
import member9 from '../../assets/member9.png';

// Data for Team Members
const teamData = [
  { name: 'Liezette Apparri', role: 'Project Manager', image: member1 },
  { name: 'Meryl Alcantra', role: 'Systems Analyst', image: member2 },
  { name: 'Stefani Vienne Carcer', role: 'User Interface Designer', image: member3 },
  { name: 'Erickson Guhilde', role: 'Programmer', image: member4 },
  { name: 'Cedric Paul Mendoza', role: 'Database Designer', image: member5 },
  { name: 'Dave Guion', role: 'Technical Writer', image: member6 },
  { name: 'Lawrence Savariz', role: 'Network Designer', image: member7 },
  { name: 'Kenneth Romo', role: 'Researcher I', image: member8 },
  { name: 'Jamille Roxas', role: 'Researcher II', image: member9 },
];

const AboutUs = ({ isDarkMode }) => {

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fadeInUp');
        } else {
          entry.target.classList.remove('animate-fadeInUp');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <div
      className={`px-8 lg:px-20 py-24 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}
      id="about-us"
    >
      {/* Text Block */}
      <div className="max-w-4xl mx-auto mb-16 text-center flex flex-col gap-10">
        <h2
          className={`text-4xl lg:text-5xl font-extrabold mb-4 animate-fadeIn ${
            isDarkMode ? 'text-green-400' : 'text-green-900'
          } animate-on-scroll`}
        >
          About FriseUp
        </h2>
        <p
          className={`text-lg lg:text-xl mb-8 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'} animate-on-scroll`}
        >
          FriseUp serves as the digital core of CarrotFriezz, a company dedicated to reimagining snacking. We've used technology to build a robust Customer Relationship Management system or CRM that enables our staff to provide great customer service. FriseUp is the driving force behind our ambition to bring healthier, more delicious snacks to everyone, from managing customer relations to optimizing operations.
        </p>
      </div>

      {/* Meet the Team Section */}
      <div className="text-center mb-12">
        <h3
          className={`text-4xl lg:text-5xl font-extrabold mb-4 animate-fadeInUp ${
            isDarkMode ? 'text-green-400' : 'text-green-900'
          } animate-on-scroll`}
        >
          Meet the FriseUp Team
        </h3>
      </div>

      {/* Team Members Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* First Card - Full width */}
        <div className="col-span-1 md:col-span-4 mb-8">
          <div
            className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 ease-in-out animate-on-scroll"
          >
            <img
              src={teamData[0].image}
              alt={teamData[0].name}
              className="w-40 h-40 rounded-full mx-auto mb-4"
            />
            <h4
              className={`text-2xl font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}
            >
              {teamData[0].name}
            </h4>
            <p
              className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {teamData[0].role}
            </p>
          </div>
        </div>

        {/* Other Team Cards in a row of 4 */}
        {teamData.slice(1).map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 text-center transform hover:scale-105 transition-transform duration-300 ease-in-out animate-on-scroll"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-40 h-40 rounded-full mx-auto mb-4"
            />
            <h4
              className={`text-2xl font-semibold ${isDarkMode ? 'text-green-400' : 'text-green-900'}`}
            >
              {member.name}
            </h4>
            <p
              className={`text-gray-600 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              {member.role}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
