import React from 'react';
import X from '../assets/close.png';
import ArrowRight from '../assets/arrowright.png';
import Done from '../assets/check.png';
import { useNavigate } from "react-router-dom";

const LoginSuccessModal = ({ isOpen, onClose, userType }) => {
  if (!isOpen) return null;
  
  const navigate = useNavigate();

  const handleDashboardNavigation = () => {
    onClose(); // Use onClose instead of setIsModalOpen
    if (userType === 'user') {
      navigate('/User_dashboard'); // Fixed typo in route
    } else if (userType === 'admin') {
      navigate('/Admin_dashboard');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"
        onClick={onClose}
      />
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all w-full max-w-md">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <img src={X} alt="Close" className="h-6 w-6" />
          </button>
          <div className="p-6 text-center">
            <div className="mx-auto flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-6">
              <img src={Done} alt="Success" className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Login Successful! 🎉
            </h3>
            <p className="text-gray-600 mb-8">
              {userType === 'admin'
                ? "Welcome back, Admin! You've successfully logged in to your admin account."
                : "Welcome back! You've successfully logged in to your account."}
            </p>
            <div className="space-y-3">
              <button
                onClick={handleDashboardNavigation} // Changed from onNavigate to handleDashboardNavigation
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-200"
              >
                Go to {userType === 'admin' ? 'Admin' : 'User'} Dashboard
                <img src={ArrowRight} alt="Arrow Right" className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="w-full px-6 py-3 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-100 font-medium transition-colors duration-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginSuccessModal;