import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
  ];

  const isActivePath = (path) => location.pathname === path;

  return (
    <nav className="bg-black text-white font-bold shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="w-24" />
            </Link>
          </div>

          {/* Center Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-[16px] font-bold transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white hover:text-black'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right-side Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/signin"
              className="px-4 py-3 bg-blue-500 text-white rounded-md text-sm font-bold hover:bg-blue-600 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-3 bg-green-500 text-white rounded-md text-sm font-bold hover:bg-green-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-label="Toggle navigation menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                  isActivePath(item.path)
                    ? 'bg-white text-black'
                    : 'text-white hover:bg-white hover:text-black'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/signin"
              className="block px-3 py-2 bg-blue-500 text-white rounded-md text-base font-medium hover:bg-blue-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block px-3 py-2 bg-green-500 text-white rounded-md text-base font-medium hover:bg-green-600 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
