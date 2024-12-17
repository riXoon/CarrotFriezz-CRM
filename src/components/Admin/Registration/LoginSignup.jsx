import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import carrot1 from "../../../assets/carrot1.png";
import carrot2 from "../../../assets/carrot2.png";
import logo2 from '../../../assets/logo2.png';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginSignup() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [contactNum, setcontactNum] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // For the loading spinner
  const [showLikeConfirmation, setShowLikeConfirmation] = useState(false); // For the animated checkmark modal
  const [showRedirectConfirmation, setShowRedirectConfirmation] = useState(false); // For login confirmation
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const toggleForm = () => setIsSignUp(!isSignUp);
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const closeModal = () => setShowModal(false);
  const closeLikeConfirmation = () => setShowLikeConfirmation(false);

  const handleSignUp = async (e) => {
    e.preventDefault();
  
    if (!firstName || !lastName || !email || !password || !confirmPassword || !contactNum) {
      setModalMessage("Please fill in all the fields.");
      setShowModal(true);
      return;
    }
  
    if (password !== confirmPassword) {
      setModalMessage("Passwords do not match.");
      setShowModal(true);
      return;
    }
  
    const payload = {
      firstName,
      lastName,
      email,
      password,
      contactNum,
      role,
    };
  
    try {
      setIsLoading(true);
      const response = await axios.post("http://localhost/friseup_api/signup", payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      const { status, message } = response.data;
      if (status === 1) {
        setSuccessMessage("Signup Successful!"); // Set success message
        setShowLikeConfirmation(true);
        setTimeout(() => {
          setShowLikeConfirmation(false);
          setIsSignUp(false);
        }, 2000);
      } else {
        setModalMessage(message);
        setShowModal(true);
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      setModalMessage("An error occurred during signup. Please try again.");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };
  
  

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!email || !password || !role) {
      setModalMessage("Please fill in all the fields.");
      setShowModal(true);
      return;
    }
  
    const loginData = {
      email,
      password,
      role,
    };
  
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:80/friseup_api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
      console.log("Login API Response:", data);
  
      if (data.status === 1) {
        if (data.role === role) {
          // Store user ID in localStorage
          if (data.id) {
            localStorage.setItem("id", data.id);
            console.log("User ID stored in localStorage:", data.id);
          } else {
            console.warn("No ID returned in the server response.");
          }
  
          setSuccessMessage("Login Successful!");
          setShowLikeConfirmation(true);
          setTimeout(() => {
            setShowLikeConfirmation(false);
            setShowRedirectConfirmation(true);
          }, 2000);
        } else {
          setModalMessage(
            role === "admin"
              ? "Admin, you are accessing a wrong role."
              : "You are unauthorized to access this role."
          );
          setShowModal(true);
        }
      } else {
        setModalMessage(data.message || "Invalid email or password.");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error during login:", error);
      setModalMessage("An error occurred during login.");
      setShowModal(true);
    } finally {
      setIsLoading(false);
    }
  };

  const confirmRedirect = () => {
    setShowRedirectConfirmation(false);
    navigate(role === "admin" ? "/AdminDashboard" : "/Customer");
  };
  

  return (
    <div className="relative h-screen w-full bg-gray-100 overflow-hidden">
    {/* Loading Spinner */}
    {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="loader border-t-4 border-orange-500 rounded-full w-12 h-12 animate-spin"></div>
        </div>
      )}

      {/* Error Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
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

       {/* Animated Checkmark Modal */}
       {showLikeConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center flex flex-col justify-center">
            <div className="relative left-12 text-green-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-16 h-16 animate-bounce"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <p className="text-green-500 text-lg font-bold">{successMessage}</p>
          </div>
        </div>
      )}

      {/* Redirection Confirmation Modal */}
      {showRedirectConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <p className="text-gray-800 text-lg font-semibold">
              You are successfully logged in! Click OK to proceed.
            </p>
            <button
              onClick={confirmRedirect}
              className="mt-4 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

  <div className="relative h-full w-full">
    <div
      className={`absolute left h-full w-1/2 bg-white flex items-center justify-center transition-transform duration-700 ease-in-out ${
        isSignUp ? "translate-x-full" : "translate-x-0"
      }`}
    >
      <div className="relative bottom-[17rem] flex justify-center items-center">
      <img src={logo2} />
      <h1 className="text-friezGreen text-2xl font-bold relative top-1">FriseUp</h1>
      </div>
      <div className="text-center flex flex-col mt-[10.8rem] gap-20 relative right-[5.3rem]">
        <div className="flex flex-col">
          <h1 className="text-orange-500 text-6xl font-bold">
            {isSignUp ? "Join our family!" : "Welcome Back!"}
          </h1>

          <p className="text-lg">
            {isSignUp ? "Join us now and let's build healthy relationships." : "We're happy to see you again."}
          </p>
        </div>
        <img
          src={isSignUp ? carrot2 : carrot1}
          alt="Carrot Mascot"
          className="w-3/3 mx-auto"
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
            <h2 className="text-orange-500 text-3xl font-bold text-center mb-5">
              Sign Up
            </h2>
            <form onSubmit={handleSignUp}>
              {/* First Name and Last Name */}
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter your first name"
                    required
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter your last name"
                    required
                  />
                </div>
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
                  required
                />
              </div>

              {/* Password and Confirm Password */}
              <div className="mb-4 flex gap-4">
                <div className="flex-1">
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
                      required
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute right-3 top-2 text-gray-500"
                    >
                      {showPassword ? (
                        <FaEyeSlash className="w-5 h-5" />
                      ) : (
                        <FaEye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex-1">
                  <label className="block text-gray-700 text-sm mb-2">
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Confirm your password"
                    required
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm mb-2">
                  Contact Number
                </label>
                <input
                  type="tel"
                  value={contactNum}
                  onChange={(e) => setcontactNum(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2"
                  placeholder="Enter your contact number"
                  required
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
                  disabled
                >
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
                      <option value="admin">admin</option>
                      <option value="customer">customer</option>
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
