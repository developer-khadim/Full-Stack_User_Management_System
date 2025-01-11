import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import img_signin from "../assets/login.png";
import { SocialLogin } from "../Components/SocialLogin";
import LoginSuccessModal from "../Components/LoginSuccess";
import axios from "axios";

const SignIn = () => {
  const [activeTab, setActiveTab] = useState("user");
  const [usernameEmail, setUsernameEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminCNIC, setAdminCNIC] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userType, setUserType] = useState(null); // 'user' or 'admin'
  const navigate = useNavigate();

  const handleDashboardNavigation = () => {
    setIsModalOpen(false);
    // Navigate based on user type
    if (userType === "user") {
      navigate("/user-dashboard");
    } else if (userType === "admin") {
      navigate("/admin-dashboard");
    }
  };

  const handleUserLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN_USER_API, {
        username_email: usernameEmail,
        password,
      });
      if (response.status === 200) {
        setMessage(response.data.message || "Login Successful!");
        setUserType("user"); // Set user type for navigation
        setIsModalOpen(true);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.Error || "An error occurred during login."
      );
    }
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(import.meta.env.VITE_LOGIN_ADMIN_API, {
        cnic: adminCNIC,
        password: adminPassword,
      });
      if (response.status === 200) {
        setMessage(response.data.message || "Admin Login Successful!");
        setUserType("admin"); // Set user type for navigation
        setIsModalOpen(true);
      }
    } catch (error) {
      setMessage(
        error.response?.data?.Error || "An error occurred during admin login."
      );
    }
  };

  useEffect(() => {
    document.title = 'Sign-in | User Management'; // Setting the title of the document
  }, []);

  return (
    <section className="min-h-[85vh] flex justify-center items-center bg-gray-50">
      <div className="w-full max-w-6xl mx-auto flex shadow-lg bg-white rounded-lg overflow-hidden">
        {/* Left Section - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-50 to-white items-center justify-center p-12">
          <img
            src={img_signin}
            alt="Sign In Illustration"
            className="max-w-full max-h-[500px] animate-float"
          />
        </div>

        {/* Right Section - Tabs and Forms */}
        <div className="flex-1 p-8 lg:p-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600">Sign in to your account</p>
          </div>

          {/* Tabs for User/Admin */}
          <div className="flex mb-6 border border-gray-200 rounded-lg overflow-hidden">
            <button
              onClick={() => setActiveTab("user")}
              className={`flex-1 py-3 text-lg font-semibold ${
                activeTab === "user"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              User Login
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex-1 py-3 text-lg font-semibold ${
                activeTab === "admin"
                  ? "bg-indigo-600 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-100"
              }`}
            >
              Admin Login
            </button>
          </div>

          {/* User Login Form */}
          {activeTab === "user" && (
            <>
              <SocialLogin />
              <div className="flex items-center py-4">
                <hr className="flex-1 border-gray-300" />
                <span className="px-4 text-sm text-gray-500">OR</span>
                <hr className="flex-1 border-gray-300" />
              </div>
              <form onSubmit={handleUserLogin} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email or Username
                  </label>
                  <input
                    type="text"
                    id="email"
                    required
                    value={usernameEmail}
                    onChange={(e) => setUsernameEmail(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="example@example.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="remember"
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label
                      htmlFor="remember"
                      className="ml-2 block text-sm text-gray-900"
                    >
                      Remember me
                    </label>
                  </div>
                  <Link
                    to="/forgot_password"
                    className="text-sm text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                >
                  Sign In
                </button>
              </form>
              <p className="text-sm text-gray-600 text-center mt-4">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-bold text-blue-600 hover:underline transition duration-200"
                >
                  Sign Up
                </Link>
              </p>
            </>
          )}

          {/* Admin Login Form */}
          {activeTab === "admin" && (
            <form onSubmit={handleAdminLogin} className="space-y-6">
              <div>
                <label
                  htmlFor="admin-cnic"
                  className="block text-sm font-medium text-gray-700"
                >
                  CNIC Number
                </label>
                <input
                  type="text"
                  id="admin-cnic"
                  required
                  value={adminCNIC}
                  onChange={(e) => setAdminCNIC(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="12345-6789012-3"
                />
              </div>
              <div>
                <label
                  htmlFor="admin-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="admin-password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Admin Login
              </button>
            </form>
          )}

          {/* Message Display */}
          {message && (
            <div className="mt-4 text-center text-sm text-gray-700">
              {message}
            </div>
          )}
          <LoginSuccessModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onNavigate={handleDashboardNavigation}
            userType={userType} // Pass userType to show appropriate message
          />
        </div>
      </div>
    </section>
  );
};

export default SignIn;
