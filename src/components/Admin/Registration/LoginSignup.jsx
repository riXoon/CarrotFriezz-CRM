import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import carrot1 from "../../../assets/carrot1.png";
import carrot2 from "../../../assets/carrot2.png";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
  
    // Check if fields are empty
    if (!fullName || !email || !password || !confirmPassword || !role) {
      setModalMessage("Please fill in all the fields.");
      setShowModal(true);
      return;
    }
  
    // Check if passwords match
    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match!");
      setShowModal(true);
      return;
    }
  
    const userData = { fullName, email, password, role };
    localStorage.setItem("user", JSON.stringify(userData));
    setModalMessage("Sign-up successful! You can now log in.");
    setShowModal(true);
    setIsSignUp(false);
  };
  
  const handleLogin = (e) => {
    e.preventDefault();
  
    // Check if email and password are provided
    if (!email || !password) {
      setModalMessage("Please enter both email and password.");
      setShowModal(true);
      return;
    }
  
    const storedUser = JSON.parse(localStorage.getItem("user"));
  
    if (!storedUser) {
      setModalMessage("No user found. Please sign up first.");
      setShowModal(true);
      return;
    }
  
    if (email === storedUser.email && password === storedUser.password) {
      if (role === storedUser.role) {
        setModalMessage("Login successful!");
        setShowModal(true);
        setTimeout(() => {
          if (role === "admin") {
            navigate("/AdminDashboard");
          } else if (role === "customer") {
            navigate("/Customer");
          }
        }, 1500);
      } else {
        setModalMessage("Invalid role selected. Please select the correct role for your account.");
        setShowModal(true);
      }
    } else {
      setModalMessage("Invalid email or password.");
      setShowModal(true);
    }
  };
  

  return (
    <div className="relative h-screen w-full bg-gray-100 overflow-hidden">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
          >
            <p className="text-gray-800 text-lg font-semibold">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

      <div className="relative h-full w-full">
        <div
          className={`absolute h-full w-1/2 bg-white flex items-center justify-center transition-transform duration-700 ease-in-out ${
            isSignUp ? "translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="text-center">
            <h1 className="text-orange-500 text-5xl font-bold mb-6">
              {isSignUp ? "Create an Account" : "Welcome Back!"}
            </h1>
            <img
              src={isSignUp ? carrot2 : carrot1}
              alt="Carrot Mascot"
              className="w-2/3 mx-auto"
            />
          </div>
        </div>

        <div
          className={`absolute h-full w-1/2 bg-orange-500 flex items-center justify-center right-0 transition-transform duration-700 ease-in-out ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="relative z-10 w-3/4">
            {isSignUp ? (
              <div className="border p-8 bg-white rounded-xl shadow-xl">
                <h2 className="text-orange-500 text-3xl font-bold text-center">
                  Sign Up
                </h2>
                <form onSubmit={handleSignUp}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-2 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">
                      Confirm Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Confirm your password"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">
                      Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="admin">Admin</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition"
                  >
                    Sign Up
                  </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <span
                    className="text-orange-500 font-bold cursor-pointer hover:underline"
                    onClick={toggleForm}
                  >
                    Log In
                  </span>
                </p>
              </div>
            ) : (
              <div className="border p-8 bg-white rounded-xl shadow-lg">
                <h2 className="text-orange-500 text-3xl font-bold text-center mb-6">
                  Log In
                </h2>
                <form onSubmit={handleLogin}>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Enter your password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-2 text-gray-500"
                      >
                        {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm mb-2">
                      Role
                    </label>
                    <select
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full border rounded-lg px-3 py-2"
                    >
                      <option value="admin">Admin</option>
                      <option value="customer">Customer</option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-orange-500 text-white py-2 rounded-lg font-bold hover:bg-orange-600 transition"
                  >
                    Log In
                  </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                  Don’t have an account yet?{" "}
                  <span
                    className="text-green-500 font-bold cursor-pointer hover:underline"
                    onClick={toggleForm}
                  >
                    Sign Up
                  </span>
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
