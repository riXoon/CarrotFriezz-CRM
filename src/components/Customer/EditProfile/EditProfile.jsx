import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../../assets/default-profile.png";
import carrotBanner from "../../../assets/carrot-banner.png";
import avatar1 from '../../../assets/avatar1.png';
import avatar2 from '../../../assets/avatar2.png';
import avatar3 from '../../../assets/avatar3.png';
import NavBar from "../Customer/NavBar";

const EditProfile = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "johndoe@gmail.com",
    password: "********",
    contactNumber: "63+ 992754412",
  });

  const [profilePic, setProfilePic] = useState(defaultProfile);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Navigate or handle submission here
  };

  const handleProfilePicChange = (newPic) => {
    setProfilePic(newPic);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="relative w-full bg-gray-50 mt-6">
        {/* Banner */}
        <div className="relative h-[200px] sm:h-[300px] md:h-[350px]">
          <img src={carrotBanner} alt="Banner" className="w-full h-full object-cover" />
          {/* Profile icon */}
          <div className="absolute bottom-[-30px] sm:bottom-[-40px] left-1/2 transform -translate-x-1/2 rounded-full w-32 sm:w-40 h-32 sm:h-40 bg-white flex justify-center items-center shadow-md">
            <img
              src={profilePic}
              alt="Profile"
              className="rounded-full w-28 sm:w-36 h-28 sm:h-36 border-4 border-orange-400"
            />
            {/* Edit Icon */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute bottom-2 right-2 bg-orange-400 p-2 rounded-full text-white hover:bg-orange-500"
              title="Edit Profile Picture"
            >
              ✏️
            </button>
          </div>
        </div>

        {/* Edit Profile Form */}
        <div className="mt-16 px-6 py-8 max-w-3xl mx-auto bg-white shadow-md rounded-lg">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 text-center">
            Edit Profile
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  className="w-full p-3 border-2 border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <span className="absolute top-3 right-3 text-orange-400">✏️</span>
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="w-full p-3 border-2 border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <span className="absolute top-3 right-3 text-orange-400">✏️</span>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full p-3 border-2 border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <span className="absolute top-3 right-3 text-orange-400">✏️</span>
              </div>
              <div className="relative">
                <input
                  type="tel"
                  name="contactNumber"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  placeholder="Contact Number"
                  className="w-full p-3 border-2 border-orange-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
                />
                <span className="absolute top-3 right-3 text-orange-400">✏️</span>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 sm:w-96 shadow-lg relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
            >
              ✖️
            </button>
            <h3 className="text-lg font-bold text-center mb-4">Change Avatar</h3>
            <div className="flex justify-around">
              <button
                onClick={() => handleProfilePicChange(avatar1)}
                className="rounded-full bg-yellow-200 p-3 hover:scale-105 transform"
              >
                <img src={avatar1} alt="Avatar 1" />
              </button>
              <button
                onClick={() => handleProfilePicChange(avatar2)}
                className="rounded-full bg-pink-200 p-3 hover:scale-105 transform"
              >
                <img src={avatar2} alt="Avatar 2" />
              </button>
              <button
                onClick={() => handleProfilePicChange(avatar3)}
                className="rounded-full bg-blue-200 p-3 hover:scale-105 transform"
              >
                <img src={avatar3} alt="Avatar 3" />
              </button>
            </div>
            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
