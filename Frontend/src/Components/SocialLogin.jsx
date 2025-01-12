import React from 'react';
import Google from '../assets/google.png';
import Facebook from '../assets/facebook.png';
import Twitter from '../assets/twitter.png';

export const SocialLogin = () => {


    const googleWithLogin = () => {    
    window.open('http://localhost:4000/auth/google', '_self');
};
  
  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full max-w-[30rem] flex items-center justify-center gap-2 sm:gap-4">
        {/* Google Button */}
        <button
          className="flex items-center justify-center w-full sm:w-24 h-10 sm:h-12
            rounded-lg border border-gray-200 bg-white
            hover:bg-gray-50 hover:border-gray-300
            transition-all duration-200 shadow-sm
            hover:shadow group"

          onClick={googleWithLogin}

        >
          <img
            src={Google}
            alt="Google"
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain
              group-hover:scale-110 transition-transform duration-200"
          />
        </button>

        {/* Facebook Button */}
        <button
          className="flex items-center justify-center w-full sm:w-24 h-10 sm:h-12
            rounded-lg border border-[#1877F2] bg-[#1877F2]
            hover:bg-[#1864F2]
            transition-all duration-200 shadow-sm
            hover:shadow group"
        >
          <img
            src={Facebook}
            alt="Facebook"
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain brightness-0 invert
              group-hover:scale-110 transition-transform duration-200"
          />
        </button>

        {/* Twitter Button */}
        <button
          className="flex items-center justify-center w-full sm:w-24 h-10 sm:h-12
            rounded-lg border border-[black] bg-black/90
            hover:bg-black
            transition-all duration-200 shadow-sm
            hover:shadow group"
        >
          <img
            src={Twitter}
            alt="Twitter"
            className="w-5 h-5 sm:w-6 sm:h-6 object-contain brightness-0 invert
              group-hover:scale-110 transition-transform duration-200"
          />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;