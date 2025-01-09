import React from 'react';
import Google from '../assets/google.png';
import Facebook from '../assets/facebook.png';
import Twitter from '../assets/twitter.png';

export const SocialLogin = () => {
  return (
    <div className="w-full flex justify-center">
      <div className="w-[30rem] flex items-center justify-center gap-4">
        {/* Google Button */}
        <button
          className="flex items-center justify-center w-24 h-12
            rounded-lg border border-gray-200 bg-white 
            hover:bg-gray-50 hover:border-gray-300 
            transition-all duration-200 shadow-sm 
            hover:shadow group"
        >
          <img
            src={Google}
            alt="Google"
            className="w-6 h-6 object-contain 
              group-hover:scale-110 transition-transform duration-200"
          />
        </button>

        {/* Facebook Button */}
        <button
          className="flex items-center justify-center w-24 h-12
            rounded-lg border border-[#1877F2] bg-[#1877F2] 
            hover:bg-[#1864F2] 
            transition-all duration-200 shadow-sm 
            hover:shadow group"
        >
          <img
            src={Facebook}
            alt="Facebook"
            className="w-6 h-6 object-contain brightness-0 invert
              group-hover:scale-110 transition-transform duration-200"
          />
        </button>

        {/* Twitter Button */}
        <button
          className="flex items-center justify-center w-24 h-12
            rounded-lg border border-[#1DA1F2] bg-[#1DA1F2] 
            hover:bg-[#1A8CD8] 
            transition-all duration-200 shadow-sm 
            hover:shadow group"
        >
          <img
            src={Twitter}
            alt="Twitter"
            className="w-6 h-6 object-contain brightness-0 invert
              group-hover:scale-110 transition-transform duration-200"
          />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;