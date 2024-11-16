import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Correct icons from react-icons
import carrot1 from "../../../assets/carrot1.png";
import carrot2 from "../../../assets/carrot2.png";
import { useNavigate } from "react-router-dom";

function LoginSignup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [email, setEmail] = useState(""); // State for email
  const [password, setPassword] = useState(""); // State for password
  const [confirmPassword, setConfirmPassword] = useState(""); // State for confirm password
  const [role, setRole] = useState("customer"); // State for user role
  const navigate = useNavigate(); // For redirecting to main page

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    // Save the user's data in localStorage
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    const userData = { email, password, role };
    localStorage.setItem("user", JSON.stringify(userData));
    alert("Sign-up successful! You can now log in.");
    setIsSignUp(false); // Switch to login form
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // Get the data from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!storedUser) {
      alert("No user found. Please sign up first.");
      return;
    }

    if (email === storedUser.email && password === storedUser.password) {
      alert("Login successful!");
      navigate("/main"); // Redirect to the main page if login is successful
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="relative h-screen w-full bg-gray-100 overflow-hidden">
      <div className="relative h-full w-full">
        {/* Left Section */}
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

        {/* Right Section */}
        <div
          className={`absolute h-full w-1/2 bg-orange-500 flex items-center justify-center right-0 transition-transform duration-700 ease-in-out ${
            isSignUp ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="relative z-10 w-3/4">
            {isSignUp ? (
              // Sign-Up Form
              <div className="border p-8 bg-white rounded-xl shadow-xl">
                <h2 className="text-orange-500 text-3xl font-bold text-center">
                  Sign Up
                </h2>
                <form onSubmit={handleSignUp}>
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
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full border rounded-lg px-3 py-2"
                        placeholder="Confirm your password"
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
              // Login Form
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
                  <button
                    type="submit"
                    className="w-full bg-green-500 text-white py-2 rounded-lg font-bold hover:bg-green-600 transition"
                  >
                    Log In
                  </button>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                  Don’t have an account?{" "}
                  <span
                    className="text-orange-500 font-bold cursor-pointer hover:underline"
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
