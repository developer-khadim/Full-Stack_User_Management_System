import React from 'react';
import logo from '../assets/logo.png';
import Facebook from '../assets/facebook.png';
import Twitter from '../assets/twitter.png';
import Github from '../assets/github.png';
import Linkedin from '../assets/linkedin.png';
import heart from '../assets/heart.png';

const Footer = () => {
  return (
    <footer className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow  text-black py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
           <img src={logo} className='w-16' alt="" />
            <span className="ml-2 text-xl font-bold">UserManage</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-blue-400">Privacy Policy</a>
            <a href="#" className="hover:text-blue-400">Terms of Service</a>
            <a href="#" className="hover:text-blue-400">Contact</a>
          </div>
        </div>
        <div className="mt-4 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" > <img className='w-6 h-6 scale-100 hover:scale-150 duration-300  ' src={Facebook} alt="" /> </a>
            <a href="#"> <img className='w-6 h-6  scale-100 hover:scale-150 duration-300 ' src={Twitter} alt="" /> </a>
            <a href="#"> <img className='w-6 h-6  scale-100 hover:scale-150 duration-300 ' src={Linkedin} alt="" /></a>
            <a href="#"> <img src={Github} className='w-6 h-6 scale-100 hover:scale-150 duration-300  ' alt="" /> </a>
          </div>
          <p className="text-sm text-center">
  Made with <img src={heart} alt="Heart" className="inline-block w-5 h-5 mx-1" /> by YourTeam. <br />
  All rights reserved 2025.
</p>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
