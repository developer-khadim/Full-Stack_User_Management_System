import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Check } from 'lucide-react';
import img_signup from '../assets/Sign-up.png';
import Modal from 'react-modal';
import axios from 'axios';
import gsap from 'gsap';


// Ensure Modal is properly attached to the app root
Modal.setAppElement('#root');

const SignUp = () => {
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [isOTPModalOpen, setOTPModalOpen] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [otp, setOTP] = useState('');

  const navigate = useNavigate();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);
  const openSuccessModal = () => setSuccessModalOpen(true);
  const closeSuccessModal = () => {
    setSuccessModalOpen(false);
    navigate("/signin");
  };
  const openOTPModal = () => setOTPModalOpen(true);
  const closeOTPModal = () => setOTPModalOpen(false);

  // Handle OTP sending
  const handleSendOTP = async () => {
    if (!email) {
      setMessage('Please enter an email address first');
      return;
    }
    try {
      // Replace with your actual OTP sending API endpoint
      const response = await axios.post(import.meta.env.VITE_SEND_OTP_API, { email });
      if (response) {
        openOTPModal();
        setMessage('OTP sent successfully!');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send OTP');
    }
  };

  // Handle OTP verification
  const handleVerifyOTP = async () => {
    try {
      // Replace with your actual OTP verification API endpoint
      const response = await axios.post(import.meta.env.VITE_VERIFY_OTP_API, { email, otp });
      if (response) {
        closeOTPModal();
        setMessage('Email verified successfully!');
      }
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid OTP');
    }
  };

  // OTP Modal Component
  const OTPVerificationModal = () => (
    <Modal
      isOpen={isOTPModalOpen}
      onRequestClose={closeOTPModal}
      contentLabel="OTP Verification"
      className="bg-white rounded-lg shadow-xl max-w-md mx-auto p-6 focus:outline-none"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOTP(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
          placeholder="Enter OTP"
        />
        <button
          onClick={handleVerifyOTP}
          className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Verify OTP
        </button>
      </div>
    </Modal>
  );

  // Handle Submit Event
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newUser = {
      firstName,
      lastName,
      email,
      contact,
      password,
      username,
    };

    try {
      const response = await axios.post(import.meta.env.VITE_REGISTER_USER_API, newUser);
      if(response) {
        setMessage(response.data.message);
        openSuccessModal();
      }
    } catch(error) {
      setMessage(error.response?.data?.message || 'Registration failed');
    }
  };
  
  return (
    <div className="min-h-[70vh] from-indigo-50 to-white py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Left Section - Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-2xl space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                Create Account
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Join us today and get started!
              </p>
            </div>

            {/* Form */}
            <form 
              className="mt-10 space-y-8"
              onSubmit={handleSubmit}
            >
              {/* Name Fields */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="relative">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-base"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-base"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="space-y-6">
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-base"
                      placeholder="example@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <button
                      type="button"
                      onClick={handleSendOTP}
                      className="mt-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                    >
                      Send OTP
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Contact Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-base"
                    placeholder="Contact Number"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                  />
                </div>
              </div>

              {/* Username & Password */}
              <div className="space-y-6">
                <div className="relative">
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-base"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="relative">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-base"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Terms & Conditions */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  required
                  className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-colors duration-200"
                />
                <label htmlFor="terms" className="ml-3 block text-base text-gray-700">
                  I accept the{' '}
                  <span
                    onClick={openModal}
                    className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200 cursor-pointer"
                  >
                    Terms and Conditions
                  </span>
                </label>
              </div>

              {/* Sign Up Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Create Account
                </button>
              </div>
              <div className='w-full text-center text-red-500 font-semibold'>{message}</div>

              {/* Login Link */}
              <div className="text-center">
                <p className="text-base text-gray-600">
                  Already have an account?{' '}
                  <Link
                    to="/signin"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>

        {/* Right Section - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-50 to-white items-center justify-center p-12">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-indigo-100 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <img
              src={img_signup}
              alt="Sign up illustration"
              className="relative w-full h-auto max-h-[800px] object-contain animate-float"
            />
          </div>
        </div>

        {/* Modals */}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Terms and Conditions"
          className="bg-white rounded-lg shadow-xl max-w-lg mx-auto p-6 focus:outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-2xl font-bold mb-4">Terms and Conditions</h2>
          <p className="text-gray-600">
            By using this application, you agree to the following terms and conditions: [Insert detailed terms here...].
          </p>
          <button
            onClick={closeModal}
            className="mt-4 py-2 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            Close
          </button>
        </Modal>

        <Modal
          isOpen={isSuccessModalOpen}
          onRequestClose={closeSuccessModal}
          contentLabel="Success Message"
          className="bg-white rounded-lg shadow-xl max-w-md mx-auto p-8 focus:outline-none"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
              <Check className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Account Created Successfully!</h2>
            <p className="text-gray-600 mb-6">
              Welcome to our platform! You can now login with your credentials.
            </p>
            <button
              onClick={closeSuccessModal}
              className="w-full py-3 px-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 cursor-pointer"
            >
              Continue to Login
            </button>
          </div>
        </Modal>

        <OTPVerificationModal />

        {/* CSS for animations */}
        <style>{`
          @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
          @keyframes pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.4; }
          }
          .animate-pulse {
            animation: pulse 4s ease-in-out infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SignUp;