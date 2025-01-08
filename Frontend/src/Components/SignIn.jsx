import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import img_signin from '../assets/login.png';
import axios from 'axios';

const SignIn = () => {

   const [username_email, setUsername_Email] = useState('')
   const [password, setPassword] = useState('')
   const [message, setMessage] = useState('')

   const onSubmitHandler = async (e) => {
        e.preventDefault();

        try{ 
         const response = await axios.post(import.meta.env.VITE_LOGIN_USER_API, {username_email, password})

         if(response.status === 200 ){
            setMessage(response.data.message)
         }
        } catch(error){
          if (error.response.data) {
            setMessage(error.response.data.Error); 
        } else {
            setMessage("An unexpected error occurred."); 
        }
        }
   }

  return (
    <div className="min-h-[90vh] from-indigo-50 to-white flex items-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex rounded-2xl shadow-2xl overflow-hidden bg-white">
        {/* Left Section - Image */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-50 to-white items-center justify-center p-12">
          <div className="relative w-full">
            <div className="absolute inset-0 bg-indigo-100 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
            <img 
              src={img_signin} 
              alt="Sign in illustration" 
              className="relative w-full h-auto max-h-[800px] object-contain animate-float"
            />
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-2xl space-y-8">
            {/* Header */}
            <div className="text-center">
              <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
                Welcome Back
              </h2>
              <p className="mt-3 text-lg text-gray-600">
                Sign in to your account
              </p>
            </div>

            {/* Form */}
            <form 
            onSubmit={onSubmitHandler}
            className="mt-10 space-y-8">
              {/* Email/Username */}
              <div className="space-y-6">
                <div className="relative">
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email or Username
                  </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm transition-all duration-200 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-base"
                    placeholder="example@example.com"
                    value={username_email}
                    onChange={ (e) => setUsername_Email(e.target.value)}
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-6">
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
                    onChange={ (e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    name="remember"
                    className="h-5 w-5 text-indigo-600 rounded border-gray-300 focus:ring-indigo-500 transition-colors duration-200"
                  />
                  <label htmlFor="remember" className="ml-3 block text-base text-gray-700">
                    Remember me
                  </label>
                </div>
                <Link
                  to="/forgot-password"
                  className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Sign In Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-4 px-6 border border-transparent rounded-lg text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Sign In
                </button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <p className="text-base text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/signup"
                    className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                  >
                    Create one here <br />
                    {message}
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>

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
  );
};

export default SignIn;
